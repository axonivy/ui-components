import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';

export class AccordionPO {
  readonly trigger: Locator;
  readonly item: Locator;
  readonly content: Locator;

  constructor(
    readonly page: Page,
    readonly parent: Locator,
    readonly label: string
  ) {
    this.trigger = parent.locator(`.ui-accordion-trigger:has-text("${label}")`);
    this.item = page.locator(`.ui-accordion-item`, { has: this.trigger });
    this.content = this.item.locator('.ui-accordion-content');
  }

  async open() {
    await expect(this.trigger).toBeVisible();
    if ((await this.trigger.getAttribute('data-state')) === 'closed') {
      await this.trigger.click();
    }
    await this.expectOpen();
  }

  async close() {
    await expect(this.trigger).toBeVisible();
    if ((await this.trigger.getAttribute('data-state')) === 'open') {
      await this.trigger.click();
    }
    await this.expectClosed();
  }

  async expectOpen() {
    await expect(this.trigger).toHaveAttribute('data-state', 'open');
  }

  async expectClosed() {
    await expect(this.trigger).toHaveAttribute('data-state', 'closed');
  }
}
