import { expect } from "playwright/test";
import { BasePageNotLogged } from "../basePageNotLogged";

export class LoginPage extends BasePageNotLogged {
  /* locators */
  readonly login = {
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
    await this.login.submitButton.click();
  }
  /**
   * Function to login in auth.setup. Use data from .env
   * @param id - proscess.env.ID
   * @param password - proscess.env.PASSWORD
   */
  async setupLoginAs(id: string, password: string) {
    await this.login.id.input.fill(id);
    await this.login.password.input.fill(password);
    await this.login.submitButton.click();
  }

  async userShouldBeNotLogged() {
    await expect(this.login.id.input).toBeVisible();
    await expect(this.login.password.input).toBeVisible();
  }

  /* asserations */
  async submitButtonShouldBeDisabled() {
    await expect(this.login.submitButton).toBeDisabled();
  }

  async submitButtonShouldNotBeDisabled() {
    await expect(this.login.submitButton).not.toBeDisabled();
  }
}
