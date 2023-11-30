import { Page } from "playwright-core";
import { Locator, expect } from "@playwright/test";
import { FormValidationColors } from "../test-data/colors.data";

export class BasePage {
  constructor(readonly page: Page) {}
  /* functions */

  /** Enters the input, sends the value, and exits the input */
  async typeInInput(inputElement: Locator, value: string) {
    await inputElement.click();
    if (value) await inputElement.fill(value);
    await inputElement.blur();
  }

  /* asserations */

  /** Will check the message and its color */
  async inputShouldHaveErrorMessage(
    errorMessageElement: Locator,
    message: string
  ) {
    await expect(errorMessageElement).toBeVisible();
    await this.errorMessageShouldHaveColor(
      errorMessageElement,
      FormValidationColors.RED
    );
    await expect.soft(errorMessageElement).toHaveText(message);
  }

  /** Will check if the message is invisible and inputs border color */
  async inputShouldNotHaveErrorMessage(
    input: Locator,
    errorMessageElement: Locator
  ) {
    await expect(errorMessageElement).not.toBeVisible();
    await this.inputBorderShouldHaveColor(input, FormValidationColors.GREEN);
  }

  private async errorMessageShouldHaveColor(
    errorMessageElement: Locator,
    color: FormValidationColors
  ) {
    await expect.soft(errorMessageElement).toHaveCSS("border-color", color);
  }

  private async inputBorderShouldHaveColor(
    input: Locator,
    color: FormValidationColors
  ) {
    await expect.soft(input).toHaveCSS("border-color", color);
  }

  async atCookiesShouldBeCookieAboutCorrectLogin(shouldBe: boolean) {
    const cookies = await this.page.context().cookies();
    const atCookiesIsCookieAboutCorrectLogin = cookies.some(
      (cookie) => cookie.name === "isLogged" && cookie.value === "true"
    );

    expect(atCookiesIsCookieAboutCorrectLogin).toBe(shouldBe);
  }
}
