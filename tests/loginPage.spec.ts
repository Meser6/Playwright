import { test } from "@playwright/test";
import { PageMenager } from "../test-pages/pagesMenager";
import { LoginInputType } from "../test-pages/pages/login";

let pm: PageMenager;

test.use({ storageState: "./.auth/notAuthSession.json" });
test.beforeEach(async ({ page }) => {
  pm = new PageMenager(page);
  await page.goto("/");
});

test.describe("Correct login", () => {
  test("Correct Login", async () => {
    await pm.loginPage.typeInInput(LoginInputType.ID, process.env.ID!);
    await pm.loginPage.inputShouldNotHaveErrorMessage(LoginInputType.ID);
    await pm.loginPage.typeInInput(
      LoginInputType.PASSWORD,
      process.env.PASSWORD!
    );
    await pm.loginPage.inputShouldNotHaveErrorMessage(LoginInputType.PASSWORD);
    await pm.loginPage.submitButtonShouldNotBeDisabled();
    await pm.loginPage.clickSubmitButton();
    await pm.pulpitPage.logoutButtonShouldBeVisible();
  });

  test("Empty inputs", async () => {
    const errorMessage = "pole wymagane";

    await pm.loginPage.typeInInput(LoginInputType.ID, "");
    await pm.loginPage.inputShouldHaveErrorMessage(
      LoginInputType.ID,
      errorMessage
    );
    await pm.loginPage.typeInInput(LoginInputType.PASSWORD, "");
    await pm.loginPage.inputShouldHaveErrorMessage(
      LoginInputType.PASSWORD,
      errorMessage
    );
    await pm.loginPage.submitButtonShouldBeDisabled();
  });

  test("Too short inputs", async () => {
    const idErrorMessage = "identyfikator ma min. 8 znaków";
    const passwordErrorMessage = "hasło ma min. 8 znaków";

    await pm.loginPage.typeInInput(LoginInputType.ID, "12");
    await pm.loginPage.inputShouldHaveErrorMessage(
      LoginInputType.ID,
      idErrorMessage
    );
    await pm.loginPage.typeInInput(LoginInputType.PASSWORD, "12");
    await pm.loginPage.inputShouldHaveErrorMessage(
      LoginInputType.PASSWORD,
      passwordErrorMessage
    );
    await pm.loginPage.submitButtonShouldBeDisabled();
  });

  test("Empty password", async () => {
    const errorMessage = "pole wymagane";

    await pm.loginPage.typeInInput(LoginInputType.ID, "123456789");
    await pm.loginPage.inputShouldNotHaveErrorMessage(LoginInputType.ID);
    await pm.loginPage.typeInInput(LoginInputType.PASSWORD, "");
    await pm.loginPage.inputShouldHaveErrorMessage(
      LoginInputType.PASSWORD,
      errorMessage
    );
    await pm.loginPage.submitButtonShouldBeDisabled();
  });
});
