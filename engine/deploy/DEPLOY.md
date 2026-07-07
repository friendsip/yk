# Deploying the yourkids.com editorial engine

A precise runbook for putting the Python engine onto a VPS and running it
unattended. It assumes a fresh Debian/Ubuntu box and that you (Mark) run these
steps by hand — nothing here provisions or SSHes anywhere for you.

The engine scans RSS hourly, triages continuously, and runs the weekly
plan → write → publish pipeline on Sunday morning (Europe/London). It publishes
by pushing to git / opening a PR, so **the box needs an authenticated `gh` CLI
and git access to the repo**. Content lives in git; pipeline state lives in the
SQLite DB at `engine/data/yourkids.db`.

---

## 0. What you need before you start

- A VPS with **Python 3.11+**, `git`, `sqlite3`, and `curl`.
- The GitHub repo cloneable from the box (deploy key or `gh`).
- An **Anthropic API key** and a **GitHub token** with repo + PR + issue scope.
- (Optional but recommended) an alerting channel: either SMTP credentials or a
  Slack/Discord/generic webhook URL.

Conventions below assume the clone lives at `/opt/yourkids` (so the engine is
`/opt/yourkids/engine`) and runs as a dedicated `yourkids` user. Adjust paths in
`yourkids-engine.service` if you choose differently.

---

## 1. Provision

```bash
sudo adduser --system --group --home /opt/yourkids yourkids
sudo apt-get update && sudo apt-get install -y python3 python3-venv git sqlite3 curl

# Clone the repo to /opt/yourkids (the repo root, with engine/ and site/ inside)
sudo -u yourkids git clone https://github.com/<owner>/<repo>.git /opt/yourkids
```

Install the GitHub CLI and authenticate **as the `yourkids` user** (the engine
shells out to `gh` for content PRs and data-review issues):

```bash
# install gh per https://github.com/cli/cli#installation, then:
sudo -u yourkids gh auth login          # choose HTTPS + the token scope above
sudo -u yourkids gh auth status         # must say "Logged in"
```

Configure git identity for the commits the engine makes:

```bash
sudo -u yourkids git -C /opt/yourkids config user.name  "yourkids engine"
sudo -u yourkids git -C /opt/yourkids config user.email "engine@yourkids.com"
```

---

## 2. Install the engine

```bash
cd /opt/yourkids/engine
sudo -u yourkids python3 -m venv .venv
sudo -u yourkids .venv/bin/pip install --upgrade pip
sudo -u yourkids .venv/bin/pip install -e .
```

Create `engine/.env` (readable only by the service user). **Plain `KEY=value`
lines, no `export`, no inline comments** — systemd's `EnvironmentFile` parses
it too, and python-dotenv loads it at startup:

```bash
sudo -u yourkids tee /opt/yourkids/engine/.env >/dev/null <<'EOF'
ANTHROPIC_API_KEY=sk-ant-...
GITHUB_TOKEN=ghp_...
# Alerting secrets (only the ones your channel uses):
ALERT_SMTP_USER=alerts@yourkids.com
ALERT_SMTP_PASSWORD=...
ALERT_WEBHOOK_URL=https://hooks.slack.com/services/...
EOF
sudo chmod 600 /opt/yourkids/engine/.env
```

Initialise the database and seed sources:

```bash
cd /opt/yourkids/engine
sudo -u yourkids .venv/bin/python -m src.main --init
```

(Migrations also run automatically on every invocation, so this is safe to
repeat.)

---

## 3. Configure alerting (recommended before going unattended)

Edit `engine/config/settings.yaml`, `alerting:` block. It is **off by default**.
Turn it on and pick one channel; secrets stay in `.env`, referenced by the
`*_env` names.

Email:

```yaml
alerting:
  enabled: true
  channel: "email"
  min_level: "warning"
  smtp_host: "smtp.your-provider.com"
  smtp_port: 587
  smtp_starttls: true
  smtp_user_env: "ALERT_SMTP_USER"
  smtp_password_env: "ALERT_SMTP_PASSWORD"
  from: "alerts@yourkids.com"
  to: "mark@clouddev.group"
```

Webhook (Slack/Discord/generic — the payload carries both `text` and `content`
so either works):

```yaml
alerting:
  enabled: true
  channel: "webhook"
  min_level: "warning"
  webhook_url_env: "ALERT_WEBHOOK_URL"
```

Smoke-test it:

```bash
cd /opt/yourkids/engine
sudo -u yourkids .venv/bin/python -c \
  "from src.utils.notify import notify; notify('Test alert','Deployment smoke test',level='warning')"
```

You should receive it (or see a log line explaining why not). If sending fails,
the engine only logs — alerting never crashes the pipeline.

---

## 4. Run as a systemd service

```bash
sudo cp /opt/yourkids/engine/deploy/yourkids-engine.service /etc/systemd/system/
# adjust User/paths in that file first if you deviated from the defaults
sudo systemctl daemon-reload
sudo systemctl enable --now yourkids-engine
sudo systemctl status yourkids-engine
journalctl -u yourkids-engine -f
```

The engine takes a single-instance file lock at `engine/data/engine.lock` on
startup; a second instance logs and exits, so systemd restarts are safe.

---

## 5. Health check + backup crons

Install as the `yourkids` user's crontab (`sudo -u yourkids crontab -e`):

```cron
# Health check every 15 minutes — non-zero exit + alert if the scanner or the
# weekly pipeline has gone quiet.
*/15 * * * * /opt/yourkids/engine/.venv/bin/python /opt/yourkids/engine/deploy/healthcheck.py

# Daily SQLite backup at 04:00 with 14-day retention.
0 4 * * * /opt/yourkids/engine/deploy/backup.sh >> /opt/yourkids/engine/data/backup.log 2>&1
```

Verify each once by hand:

```bash
sudo -u yourkids /opt/yourkids/engine/.venv/bin/python /opt/yourkids/engine/deploy/healthcheck.py; echo "exit=$?"
sudo -u yourkids /opt/yourkids/engine/deploy/backup.sh
ls -l /opt/yourkids/engine/data/backups/
```

---

## 6. First run / smoke test

Run one full pipeline by hand before trusting the schedule (this will scan,
triage, plan, write and attempt to publish — expect a content PR if anything
scores highly enough):

```bash
cd /opt/yourkids/engine
sudo -u yourkids .venv/bin/python -m src.main --run-once -v
```

Or exercise a single stage:

```bash
sudo -u yourkids .venv/bin/python -m src.main --run-once --stage scanner -v
sudo -u yourkids .venv/bin/python -m src.main --run-once --stage triage  -v
```

Checklist for "it's working":

- `journalctl -u yourkids-engine` shows the scanner running on its interval.
- `sqlite3 engine/data/yourkids.db "SELECT COUNT(*) FROM discovered_items;"` grows.
- A test alert arrived (step 3).
- `healthcheck.py` exits 0.
- After the first Sunday, a content PR/commit appears and the health check
  still passes.

---

## 7. Rollback

- **Stop the engine:** `sudo systemctl stop yourkids-engine`. The advisory lock
  at `engine/data/engine.lock` releases on shutdown, and the OS drops it even on
  a crash, so the leftover file is harmless — no manual cleanup needed.
- **Restore the DB:** stop the service, then
  `gunzip -c data/backups/yourkids-<stamp>.db.gz > data/yourkids.db` and start
  it again. Content itself is in git, so a bad content commit/PR is reverted the
  normal git way, independent of the DB.
- **Disable auto-publish quickly:** `publishing.mode: pr` in `settings.yaml`
  keeps a human gate on every content change (this is the default). Setting it
  to `auto` removes that gate — only do so deliberately.
- **Silence alerts:** set `alerting.enabled: false` and restart.

---

## Notes / gotchas

- `gh` **must** stay authenticated as the service user, or content PRs and
  data-review issues silently fail to open (the engine logs it).
- `settings.yaml` `publishing.mode` defaults to `pr` (human-gated). The batch is
  capped at `max_publishes_per_day`.
- The daily LLM spend cap (`limits.daily_cost_usd_cap`, default $20) skips
  further LLM work and alerts if a run goes runaway. Raise it only if a normal
  week legitimately approaches it.
- Timezone for the weekly run is `scheduling.planner.timezone` (Europe/London).
- Everything writes UTC timestamps; the health check and backups assume the box
  clock is sane (run `timedatectl` to confirm NTP is on).
