import { test } from "@playwright/test";
import { PageMenager } from "../test-pages/pagesMenager.setup";
import { pages } from "../test-data/pages.data";
import { beforeEach } from "node:test";

let pm: PageMenager;

test.beforeEach(async ({ page }) => {
  pm = new PageMenager(page);
});

test.describe("Login page", () => {
  test.use({ storageState: "./.auth/notAuth.session.json" });

  test.beforeEach(async () => {
    await pm.page.goto(pages.main);
  });

  test("Correct Login", async () => {
    await pm.loginPage.fillLoginForm(process.env.ID!, process.env.PASSWORD!);

    await pm.loginPage.formShouldHaveCorrectValidationLook("id");
    await pm.loginPage.formShouldHaveCorrectValidationLook("password");

    await pm.loginPage.submitButtonShouldNotBeDisabled();
    await pm.loginPage.clickSubmitButton();

    await pm.pulpitPage.userShouldBeLogged();
  });

  test("Incorect id and password", async () => {
    const idErrorMessage = "identyfikator ma min. 8 znaków";
    const passwordErrorMessage = "hasło ma min. 8 znaków";

    await pm.loginPage.fillLoginForm("12", "12");

    await pm.loginPage.formShouldHaveNotCorrectValidationLook(
      "id",
      idErrorMessage
    );
    await pm.loginPage.formShouldHaveNotCorrectValidationLook(
      "password",
      passwordErrorMessage
    );
    await pm.loginPage.submitButtonShouldBeDisabled();
  });

  test("Correct id and empty password", async () => {
    const errorMessage = "pole wymagane";
    await pm.loginPage.fillLoginForm("12345678", "");

    await pm.loginPage.formShouldHaveCorrectValidationLook("id");
    await pm.loginPage.formShouldHaveNotCorrectValidationLook(
      "password",
      errorMessage
    );
    await pm.loginPage.submitButtonShouldBeDisabled();
  });
});

test.describe("Logout", () => {
  test.beforeEach(async () => {
    await pm.page.goto(pages.pulpit);
  });

  test("Logout mechanism", async () => {
    await pm.pulpitPage.logout();

    await pm.loginPage.userShouldBeNotLogged();
  });
});
