import { expect } from "playwright/test";
import { BasePageNotLogged } from "../baseNotLogged.page.setup";
import * as am from "../../test-utils/asserationMessages";

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

  async userShouldBeNotLogged() {
    await expect(
      this.login.id.input,
      am.login.loginFormIsNotVisible
    ).toBeVisible();
    await expect(
      this.login.password.input,
      am.login.passwordFormIsNotVisible
    ).toBeVisible();

    await this.atCookiesShouldBeCookieAboutCorrectLogin(false);
  }

  /* asserations */
  async submitButtonShouldBeDisabled() {
    await expect(
      this.login.submitButton,
      am.login.submitButtonIsNotDisabled
    ).toBeDisabled();
  }

  async submitButtonShouldNotBeDisabled() {
    await expect(
      this.login.submitButton,
      am.login.submitButtonIsDisabled
    ).not.toBeDisabled();
  }
}
