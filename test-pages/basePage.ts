import { Page } from "playwright-core";

export class BasePage {
  constructor(readonly page: Page) {}

  header = {
    logoutButton: this.page.locator('[data-testid="logout-button"]'),
  };
}
