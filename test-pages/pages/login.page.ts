import { expect } from "playwright/test";
import { BasePageNotLogged } from "../baseNotLogged.page.setup";
import * as am from "../../test-utils/asserationMessages";

export class LoginPage extends BasePageNotLogged {
  /* locators */
  protected readonly login = {
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

  async fillLoginForm(id: string, password: string) {
    await this.typeInInput(this.login.id.input, id);
    await this.typeInInput(this.login.password.input, password);
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

  async formShouldHaveCorrectValidationLook(formType: "id" | "password") {
    await this.inputShouldNotHaveErrorMessage(
      this.login[formType].input,
      this.login[formType].errorMessage
    );
  }

  async formShouldHaveNotCorrectValidationLook(
    formType: "id" | "password",
    errorMessage: string
  ) {
    await this.inputShouldHaveErrorMessage(
      this.login[formType].errorMessage,
      errorMessage
    );
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
}
