const { test, expect } = require('@playwright/test');

test('Example test @ui', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle('Example Domain');
});

test('Simple API test @api', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/todos/1');
  expect(response.status()).toBe(200);
});