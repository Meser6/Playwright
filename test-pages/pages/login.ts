import { expect } from "playwright/test";
import { BasePageNotLogged } from "../basePageNotLogged";

export enum LoginInputType {
  PASSWORD = "password",
  ID = "id",
}

enum LoginValidationColors {
  RED = "rgb(212, 32, 39)",
  GREEN = "rgb(4, 180, 62)",
}

export class LoginPage extends BasePageNotLogged {
  /* locators */
  protected readonly loginContainer = {
    idInput: this.page.locator('[data-testid="login-input"]'),
    passwordInput: this.page.locator('[data-testid="password-input"]'),
    submitButton: this.page.locator('[data-testid="login-button"]'),
    idErrorMessage: this.page.locator('[data-testid="error-login-id"]'),
    passwordErrorMessage: this.page.locator(
      '[data-testid="error-login-password"]'
    ),
  };

  /* functions */
  async typeInInput(type: LoginInputType, value: string) {
    await this.loginContainer[`${type}Input`].click();
    if (value) await this.loginContainer[`${type}Input`].fill(value);
    await this.loginContainer[`${type}Input`].blur();
  }

  async clickSubmitButton() {
    await this.loginContainer.submitButton.click();
  }

  async loginAs(id: string, password: string) {
    await this.typeInInput(LoginInputType.ID, id);
    await this.typeInInput(LoginInputType.PASSWORD, password);
    await this.loginContainer.submitButton.click();
  }

  /* asserations */
  async inputShouldHaveErrorMessage(type: LoginInputType, message: string) {
    await expect(this.loginContainer[`${type}ErrorMessage`]).toBeVisible();
    await this.inputsBorderShouldHaveColor(type, LoginValidationColors.RED);
    await this.errorMessageShouldHaveColor(type, LoginValidationColors.RED);
    await expect
      .soft(this.loginContainer[`${type}ErrorMessage`])
      .toHaveText(message);
  }

  async inputShouldNotHaveErrorMessage(type: LoginInputType) {
    await expect(this.loginContainer[`${type}ErrorMessage`]).not.toBeVisible();
    await this.inputsBorderShouldHaveColor(type, LoginValidationColors.GREEN);
  }

  private async errorMessageShouldHaveColor(
    type: LoginInputType,
    color: LoginValidationColors
  ) {
    await expect
      .soft(this.loginContainer[`${type}ErrorMessage`])
      .toHaveCSS("border-color", color);
  }

  private async inputsBorderShouldHaveColor(
    type: LoginInputType,
    color: LoginValidationColors
  ) {
    await expect
      .soft(this.loginContainer[`${type}Input`])
      .toHaveCSS("border-color", color);
  }

  async submitButtonShouldBeDisabled() {
    await expect(this.loginContainer.submitButton).toBeDisabled();
  }

  async submitButtonShouldNotBeDisabled() {
    await expect(this.loginContainer.submitButton).not.toBeDisabled();
  }
}
