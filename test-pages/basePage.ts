import { Page } from "playwright-core";
import { Locator, expect } from "@playwright/test";
import { FormValidationColors } from "../test-data/colors.data";

export class BasePage {
  constructor(readonly page: Page) {}
  /* functions */
  async typeInInput(inputElement: Locator, value: string) {
    await inputElement.click();
    if (value) await inputElement.fill(value);
    await inputElement.blur();
  }

  /* asserations */
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
}
