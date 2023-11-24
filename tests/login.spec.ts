import { test } from "@playwright/test";
import { PageMenager } from "../test-pages/pagesMenager";
// import { LoginInputTypes } from "../test-pages/pages/login";
import { pages } from "../test-data/pages.data";

let pm: PageMenager;

test.use({ storageState: "./.auth/notAuthSession.json" });
test.beforeEach(async ({ page }) => {
  pm = new PageMenager(page);
  await page.goto(pages.main);
});

test.describe("Login page", () => {
  test("Correct Login", async () => {
    await pm.loginPage.typeInInput(
      pm.loginPage.loginContainer.id.input,
      process.env.ID!
    );
    await pm.loginPage.typeInInput(
      pm.loginPage.loginContainer.password.input,
      process.env.PASSWORD!
    );

    await pm.loginPage.inputShouldNotHaveErrorMessage(
      pm.loginPage.loginContainer.id.input,
      pm.loginPage.loginContainer.id.errorMessage
    );
    await pm.loginPage.inputShouldNotHaveErrorMessage(
      pm.loginPage.loginContainer.password.input,
      pm.loginPage.loginContainer.password.errorMessage
    );
    await pm.loginPage.submitButtonShouldNotBeDisabled();
    await pm.loginPage.clickSubmitButton();

    await pm.pulpitPage.logoutButtonShouldBeVisible();
  });

  test("Empty inputs", async () => {
    const errorMessage = "pole wymagane";

    await pm.loginPage.typeInInput(pm.loginPage.loginContainer.id.input, "");
    await pm.loginPage.typeInInput(
      pm.loginPage.loginContainer.password.input,
      ""
    );

    await pm.loginPage.inputShouldHaveErrorMessage(
      pm.loginPage.loginContainer.id.errorMessage,
      errorMessage
    );
    await pm.loginPage.inputShouldHaveErrorMessage(
      pm.loginPage.loginContainer.password.errorMessage,
      errorMessage
    );
    await pm.loginPage.submitButtonShouldBeDisabled();
  });

  test("Too short inputs", async () => {
    const idErrorMessage = "identyfikator ma min. 8 znaków";
    const passwordErrorMessage = "hasło ma min. 8 znaków";

    await pm.loginPage.typeInInput(pm.loginPage.loginContainer.id.input, "12");
    await pm.loginPage.typeInInput(
      pm.loginPage.loginContainer.password.input,
      "12"
    );

    await pm.loginPage.inputShouldHaveErrorMessage(
      pm.loginPage.loginContainer.id.errorMessage,
      idErrorMessage
    );
    await pm.loginPage.inputShouldHaveErrorMessage(
      pm.loginPage.loginContainer.password.errorMessage,
      passwordErrorMessage
    );
    await pm.loginPage.submitButtonShouldBeDisabled();
  });

  test("Empty password", async () => {
    const errorMessage = "pole wymagane";
    await pm.loginPage.typeInInput(
      pm.loginPage.loginContainer.id.input,
      "12345678"
    );
    await pm.loginPage.typeInInput(
      pm.loginPage.loginContainer.password.input,
      ""
    );

    await pm.loginPage.inputShouldNotHaveErrorMessage(
      pm.loginPage.loginContainer.id.input,
      pm.loginPage.loginContainer.id.errorMessage
    );
    await pm.loginPage.inputShouldHaveErrorMessage(
      pm.loginPage.loginContainer.password.errorMessage,
      errorMessage
    );

    await pm.loginPage.submitButtonShouldBeDisabled();
  });
});
