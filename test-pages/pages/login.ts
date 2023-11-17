import { BasePage } from "../basePage";
import { expect } from "playwright/test";

export class LoginPage extends BasePage {
  /* locators */
  loginContainer = {
    idInput: this.page.locator('[data-testid="login-input"]'),
    passwordInput: this.page.locator('[data-testid="password-input"]'),
    submitButton: this.page.locator('[data-testid="login-button"]'),
    errorAtInput: (inputType: "id" | "password") =>
      this.page.locator(`[data-testid="error-login-${inputType}"]`),
  };

  /* functions */
  async loginAs(id: string, password: string) {
    await this.loginContainer.idInput.fill(id);
    await this.atInputsShouldNotBeValidationError("id");
    await this.loginContainer.passwordInput.fill(password);
    await this.atInputsShouldNotBeValidationError("password");
    await this.loginContainer.submitButton.click();
  }

  async getEmptyInput(inputType: "passwordInput" | "idInput") {
    await this.loginContainer[inputType].click();
    await this.loginContainer[inputType].blur();
  }

  /* asserations */
  async atInputsShouldNotBeValidationError(inputType: "id" | "password") {
    await expect(this.loginContainer.errorAtInput(inputType)).not.toBeVisible();
  }

  async atInputShouldBeValidationError(
    inputType: "id" | "password",
    message: string
  ) {
    await expect(this.loginContainer.errorAtInput(inputType)).toBeVisible();
    await expect
      .soft(this.loginContainer.errorAtInput(inputType))
      .toHaveCSS("border-color", "rgb(212, 32, 39)");
    await expect
      .soft(this.loginContainer.errorAtInput(inputType))
      .toHaveText(message);
  }

  async submitButtonShouldBeDisabled() {
    await expect(this.loginContainer.submitButton).toBeDisabled();
  }
}
