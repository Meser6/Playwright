import { test } from "@playwright/test";
import { PageMenager } from "../test-pages/pagesMenager.setup";
import { pages } from "../test-data/pages.data";

let pm: PageMenager;

test.use({ storageState: "./.auth/notAuth.session.json" });
test.beforeEach(async ({ page }) => {
  pm = new PageMenager(page);
  await page.goto(pages.main);
});

test.describe("Login page", () => {
  test("Correct Login", async () => {
    await pm.loginPage.typeInInput(
      pm.loginPage.login.id.input,
      process.env.ID!
    );
    await pm.loginPage.typeInInput(
      pm.loginPage.login.password.input,
      process.env.PASSWORD!
    );

    await pm.loginPage.inputShouldNotHaveErrorMessage(
      pm.loginPage.login.id.input,
      pm.loginPage.login.id.errorMessage
    );
    await pm.loginPage.inputShouldNotHaveErrorMessage(
      pm.loginPage.login.password.input,
      pm.loginPage.login.password.errorMessage
    );
    await pm.loginPage.submitButtonShouldNotBeDisabled();
    await pm.loginPage.clickSubmitButton();

    await pm.pulpitPage.userShouldBeLogged();
  });

  test("Empty inputs", async () => {
    const errorMessage = "pole wymagane";

    await pm.loginPage.typeInInput(pm.loginPage.login.id.input, "");
    await pm.loginPage.typeInInput(pm.loginPage.login.password.input, "");

    await pm.loginPage.inputShouldHaveErrorMessage(
      pm.loginPage.login.id.errorMessage,
      errorMessage
    );
    await pm.loginPage.inputShouldHaveErrorMessage(
      pm.loginPage.login.password.errorMessage,
      errorMessage
    );
    await pm.loginPage.submitButtonShouldBeDisabled();
  });

  test("Too short inputs", async () => {
    const idErrorMessage = "identyfikator ma min. 8 znaków";
    const passwordErrorMessage = "hasło ma min. 8 znaków";

    await pm.loginPage.typeInInput(pm.loginPage.login.id.input, "12");
    await pm.loginPage.typeInInput(pm.loginPage.login.password.input, "12");

    await pm.loginPage.inputShouldHaveErrorMessage(
      pm.loginPage.login.id.errorMessage,
      idErrorMessage
    );
    await pm.loginPage.inputShouldHaveErrorMessage(
      pm.loginPage.login.password.errorMessage,
      passwordErrorMessage
    );
    await pm.loginPage.submitButtonShouldBeDisabled();
  });

  test("Empty password", async () => {
    const errorMessage = "pole wymagane";
    await pm.loginPage.typeInInput(pm.loginPage.login.id.input, "12345678");
    await pm.loginPage.typeInInput(pm.loginPage.login.password.input, "");

    await pm.loginPage.inputShouldNotHaveErrorMessage(
      pm.loginPage.login.id.input,
      pm.loginPage.login.id.errorMessage
    );
    await pm.loginPage.inputShouldHaveErrorMessage(
      pm.loginPage.login.password.errorMessage,
      errorMessage
    );
    await pm.loginPage.submitButtonShouldBeDisabled();
  });
});
