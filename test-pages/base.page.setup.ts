import { Page } from "playwright-core";
import { Locator, expect } from "@playwright/test";
import { FormValidationColors } from "../test-data/colors.data";
import * as am from "../test-utils/asserationMessages";

export class BasePage {
  constructor(readonly page: Page) {}
  /* functions */

  /** Enters the input, sends the value, and exits the input */
  protected async typeInInput(inputElement: Locator, value: string) {
    await inputElement.click();
    if (value) await inputElement.fill(value);
    await inputElement.blur();
  }

  /* asserations */

  /** Will check the message and its color */
  protected async inputShouldHaveErrorMessage(
    errorMessageElement: Locator,
    message: string
  ) {
    await expect(
      errorMessageElement,
      am.form.errorMessageIsNotVisible
    ).toBeVisible();
    await this.errorMessageShouldHaveColor(
      errorMessageElement,
      FormValidationColors.RED
    );
    await expect
      .soft(errorMessageElement, am.form.errorMessageHaveWrongText)
      .toHaveText(message);
  }

  /** Will check if the message is invisible and inputs border color */
  protected async inputShouldNotHaveErrorMessage(
    input: Locator,
    errorMessageElement: Locator
  ) {
    await expect(
      errorMessageElement,
      am.form.errorMessageIsVisible
    ).not.toBeVisible();
    await this.inputBorderShouldHaveColor(input, FormValidationColors.GREEN);
  }

  private async errorMessageShouldHaveColor(
    errorMessageElement: Locator,
    color: FormValidationColors
  ) {
    await expect
      .soft(errorMessageElement, am.form.errorMessageHaveWrongColor)
      .toHaveCSS("border-color", color);
  }

  private async inputBorderShouldHaveColor(
    input: Locator,
    color: FormValidationColors
  ) {
    await expect
      .soft(input, am.form.inpitBorderHaveWrongColor)
      .toHaveCSS("border-color", color);
  }

  /* It will be try to find cookie with isLogged name and true value
   * If that cookie exist - user is still logged */
  async atCookiesShouldBeCookieAboutCorrectLogin(shouldBe: boolean) {
    const cookies = await this.page.context().cookies();
    const atCookiesIsCookieAboutCorrectLogin = cookies.some(
      (cookie) => cookie.name === "isLogged" && cookie.value === "true"
    );

    expect(
      atCookiesIsCookieAboutCorrectLogin,
      shouldBe
        ? am.cookie.atCookiesIsNotCookieAboutCorrectLogin
        : am.cookie.atCookiesIsCookieAboutCorrectLogin
    ).toBe(shouldBe);
  }
}
