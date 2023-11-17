import { Page } from "playwright-core";
import { expect } from "playwright/test";

export class BasePage {
  constructor(readonly page: Page) {}

  header = {
    logoutButton: this.page.locator('[data-testid="logout-button"]'),
  };

  /* asserations */

  async logoutButtonShouldBeVisible() {
    await expect(this.header.logoutButton).toBeVisible();
  }
}
