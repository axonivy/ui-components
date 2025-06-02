import { expect, test } from '@playwright/test';

test('open', async ({ page }) => {
  await page.goto('/iframe.html?id=common-accordion--default');
  const item1 = page.getByRole('button', { name: 'Is it accessible?' });
  await expect(item1).toHaveAttribute('data-state', 'closed');
  await expect(page.getByRole('region')).toBeHidden();

  await item1.click();
  await expect(item1).toHaveAttribute('data-state', 'open');
  await expect(page.getByRole('region')).toContainText('WAI-ARIA design pattern');

  const item2 = page.getByRole('button', { name: 'Is it styled?' });
  await item2.click();
  await expect(item1).toHaveAttribute('data-state', 'closed');
  await expect(item2).toHaveAttribute('data-state', 'open');
  await expect(page.getByRole('region').last()).toContainText('default styles');
});
