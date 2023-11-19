import { test } from "@playwright/test";
import { PageMenager } from "../test-pages/pagesMenager";
import { LoginInputType } from "../test-pages/pages/login";

let pm: PageMenager;

test.beforeEach(async ({ page }) => {
  pm = new PageMenager(page);
  await page.goto("/");
});

test.describe("Login mechanism", () => {
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
    await pm.loginPage.typeInInput(LoginInputType.ID, "");
    await pm.loginPage.inputShouldHaveErrorMessage(
      LoginInputType.ID,
      "pole wymagane"
    );
    await pm.loginPage.typeInInput(LoginInputType.PASSWORD, "");
    await pm.loginPage.inputShouldHaveErrorMessage(
      LoginInputType.PASSWORD,
      "pole wymagane"
    );

    await pm.loginPage.submitButtonShouldBeDisabled();
  });

  test("Too short inputs", async () => {
    await pm.loginPage.typeInInput(LoginInputType.ID, "12");
    await pm.loginPage.inputShouldHaveErrorMessage(
      LoginInputType.ID,
      "identyfikator ma min. 8 znaków"
    );
    await pm.loginPage.typeInInput(LoginInputType.PASSWORD, "12");
    await pm.loginPage.inputShouldHaveErrorMessage(
      LoginInputType.PASSWORD,
      "hasło ma min. 8 znaków"
    );

    await pm.loginPage.submitButtonShouldBeDisabled();
  });

  test("Empty password", async () => {
    await pm.loginPage.typeInInput(LoginInputType.ID, "123456789");
    await pm.loginPage.inputShouldNotHaveErrorMessage(LoginInputType.ID);
    await pm.loginPage.typeInInput(LoginInputType.PASSWORD, "");
    await pm.loginPage.inputShouldHaveErrorMessage(
      LoginInputType.PASSWORD,
      "pole wymagane"
    );

    await pm.loginPage.submitButtonShouldBeDisabled();
  });
});
