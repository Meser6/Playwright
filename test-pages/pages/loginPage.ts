import { expect } from "playwright/test";
import { BasePageNotLogged } from "../basePageNotLogged";

export class LoginPage extends BasePageNotLogged {
  /* locators */
  readonly loginContainer = {
    id: {
      input: this.page.getByTestId("login-input"),
      errorMessage: this.page.getByTestId("error-login-id"),
    },
    password: {
      input: this.page.getByTestId("password-input"),
      errorMessage: this.page.getByTestId("error-login-password"),
    },
    submitButton: this.page.getByTestId("login-button"),
  };

  /* functions */
  async clickSubmitButton() {
    await this.loginContainer.submitButton.click();
  }
  /**
   * Function to login in auth.setup. Use data from .env
   * @param id - proscess.env.ID
   * @param password - proscess.env.PASSWORD
   */
  async setupLoginAs(id: string, password: string) {
    await this.loginContainer.id.input.fill(id);
    await this.loginContainer.password.input.fill(password);
    await this.loginContainer.submitButton.click();
  }

  /* asserations */
  async submitButtonShouldBeDisabled() {
    await expect(this.loginContainer.submitButton).toBeDisabled();
  }

  async submitButtonShouldNotBeDisabled() {
    await expect(this.loginContainer.submitButton).not.toBeDisabled();
  }
}
