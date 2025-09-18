
// @ts-check
import { test, expect } from '@playwright/test';

test('has title @ui', async ({ page }) => {  // Добавил @ui
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link @ui', async ({ page }) => {  // Добавил @ui
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

// Добавил API тест с тегом @api
test('API test example @api', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/todos/1');
  expect(response.status()).toBe(200);
  
  const data = await response.json();
  expect(data).toHaveProperty('id');
  expect(data).toHaveProperty('title');
});