#!/usr/bin/env bash
#
# Timestamped SQLite backup of the engine database, with retention pruning.
# Intended for a daily cron. Uses sqlite3's `.backup`, which takes a consistent
# snapshot even while the engine is running (WAL-safe) — do NOT just `cp` the
# .db while the engine holds it open.
#
#   0 4 * * * /opt/yourkids/engine/deploy/backup.sh >> /var/log/yourkids-backup.log 2>&1
#
# Overridable via environment:
#   YOURKIDS_DB_PATH                path to the live database
#   YOURKIDS_BACKUP_DIR             where snapshots are written
#   YOURKIDS_BACKUP_RETENTION_DAYS  how long to keep them (default 14)

set -euo pipefail

ENGINE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DB="${YOURKIDS_DB_PATH:-${ENGINE_DIR}/data/yourkids.db}"
BACKUP_DIR="${YOURKIDS_BACKUP_DIR:-${ENGINE_DIR}/data/backups}"
RETENTION_DAYS="${YOURKIDS_BACKUP_RETENTION_DAYS:-14}"

if [ ! -f "$DB" ]; then
  echo "Database not found at $DB" >&2
  exit 1
fi

mkdir -p "$BACKUP_DIR"
STAMP="$(date -u +%Y%m%dT%H%M%SZ)"
DEST="${BACKUP_DIR}/yourkids-${STAMP}.db"

# Consistent snapshot, then compress.
sqlite3 "$DB" ".backup '${DEST}'"
gzip -f "$DEST"
echo "Backup written: ${DEST}.gz"

# Prune snapshots older than the retention window.
find "$BACKUP_DIR" -name 'yourkids-*.db.gz' -type f -mtime +"${RETENTION_DAYS}" -print -delete
echo "Pruned backups older than ${RETENTION_DAYS} days"
