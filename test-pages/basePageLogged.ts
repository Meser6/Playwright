import { BasePage } from "./basePage";
import { expect } from "@playwright/test";

type MenuCategory = keyof typeof BasePageLogged.prototype.menu;
type PulpitSubcategory = keyof typeof BasePageLogged.prototype.menu.pulpit;

export class BasePageLogged extends BasePage {
  /* locators */
  readonly header = {
    logoutButton: this.page.getByTestId("logout-button"),
  };

  readonly bodyHeader = {
    userName: this.page.getByTestId("user-name"),
    messages: this.page.getByTestId("message-text"),
    timer: this.page.locator("#session_time"),
  };

  readonly menu = {
    pulpit: {
      pulpit: this.page.locator("#pulpit_btn"),
      quick: this.page.locator("#quick_btn"),
      phone: this.page.locator("#phone_btn"),
    },
    privaccounts: this.page.locator("#privaccounts_btn"),
    payments: this.page.locator("#payments_btn"),
    reports: this.page.locator("#reports_btn"),
    reportsIframe: this.page.locator("#reports_iframe_btn"),
    charts: this.page.locator("#charts_btn"),
    tables: this.page.locator("#tables_btn"),
    settings: this.page.locator("#settings_btn"),
  };

  /* functions */
  /**
   * Fuction will open category (and subcategory if you choose pulpit) at menu
   * @param category - main categories
   * @optinal @param subCategory - available only if category is 'pulpit'
   */
  async chooseCategoryAtMenu(
    category: MenuCategory,
    subCategory?: PulpitSubcategory
  ) {
    category !== "pulpit"
      ? await this.menu[category].click()
      : await this.menu.pulpit.pulpit.click();

    subCategory && (await this.menu.pulpit[subCategory ?? "pulpit"].click());
  }

  /* asserations */
  async logoutButtonShouldBeVisible() {
    await expect(this.header.logoutButton).toBeVisible();
  }
}
