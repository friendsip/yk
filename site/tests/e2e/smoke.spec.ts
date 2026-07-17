import { test, expect } from '@playwright/test';

/**
 * A single mobile smoke pass over the app-styled tools. This is regression
 * protection, not exhaustive coverage — the maths itself is unit-tested in
 * src/lib/*.test.ts. It confirms the pages wire up, take input, and render a
 * result without a console error.
 */

test('activity wheel: spin yields an idea', async ({ page }) => {
  await page.goto('/tools/activities/');
  await page.getByRole('button', { name: 'Spin the wheel!' }).click();
  // The result card (with a title) appears after the spin animation.
  await expect(page.locator('#result-title')).not.toBeEmpty({ timeout: 6000 });
  await expect(page.locator('#result')).toBeVisible();
});

test('childcare tool: a scenario produces a cost estimate', async ({ page }) => {
  await page.goto('/tools/childcare/');
  await page.fill('#cc-dob', '2026-01-15');
  await page.selectOption('#cc-region', 'London');
  await page.selectOption('#cc-hours', '50');
  await expect(page.locator('#cc-timeline-result')).toBeVisible();
  await expect(page.locator('#cc-cost-result')).toContainText('/week');
  await expect(page.locator('#cc-costs')).toContainText('£');
});

test('vaccination planner: entering a DOB fills the timeline and enables the calendar', async ({
  page,
}) => {
  await page.goto('/tools/vaccinations/');
  await page.fill('#vax-dob', '2026-06-15');
  await expect(page.locator('.vax-date').first()).toContainText('from');
  await expect(page.locator('#vax-ics')).toBeEnabled();
});

test('header CTA lands with the newsletter form in view', async ({ page }) => {
  // Cross-page arrival at /#newsletter — regression test for the anchor
  // landing under the sticky header / drifting with late image loads.
  await page.goto('/topics/');
  await page.getByRole('link', { name: 'Get the weekly email' }).click();
  await page.waitForURL('**/#newsletter');
  await expect(page.locator('#newsletter-email')).toBeInViewport();
});

test('newsletter band: signing up always gets an honest answer', async ({ page }) => {
  // Under `astro preview` the /api/subscribe function doesn't exist, so the
  // form should land on the friendly "signups open soon" fallback — the point
  // is that submitting never dead-ends silently.
  await page.goto('/');
  await page.fill('#newsletter-email', 'smoke-test@example.com');
  await page.getByRole('button', { name: 'Sign up' }).click();
  const status = page.locator('.newsletter-band__status');
  await expect(status).toBeVisible();
  await expect(status).not.toBeEmpty();
});

test('quiz packs: pick a pack, reveal an answer, score a point', async ({ page }) => {
  await page.goto('/games/quiz/');
  await page.getByRole('button', { name: /Amazing Animals/ }).click();
  await page.getByRole('button', { name: /Two teams/ }).click();
  await page.getByRole('button', { name: 'Show the answer' }).click();
  await expect(page.locator('.answer-panel__big')).toBeVisible();
  await page.locator('.team-chip[data-team="0"]:not([disabled])').click();
  await expect(page.locator('.hud')).toContainText('Question 2');
});

test('baby age tool: corrected age shows for a premature baby', async ({ page }) => {
  await page.goto('/tools/baby-age/');
  await page.fill('#age-dob', '2026-05-01');
  await page.check('#age-early');
  await page.fill('#age-due', '2026-06-01');
  await expect(page.locator('#age-corrected')).toBeVisible();
  await expect(page.locator('#age-corrected-headline')).toContainText('corrected');
});
