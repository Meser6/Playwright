import { expect, test } from "@playwright/test";
import { PageMenager } from "../test-pages/pagesMenager";

let pm: PageMenager;

test.beforeEach(async ({ page }) => {
  pm = new PageMenager(page);
  await page.goto("/");
});

test.describe("Login mechanism", () => {
  test("Correct Login", async () => {
    await pm.loginPage.typeInInput("id", process.env.ID!);
    await pm.loginPage.inputShouldNotHaveErrorMessage("id");
    await pm.loginPage.typeInInput("password", process.env.PASSWORD!);
    await pm.loginPage.inputShouldNotHaveErrorMessage("password");
    await pm.loginPage.submitButtonShouldNotBeDisabled();
    await pm.loginPage.clickSubmitButton();

    await pm.pulpitPage.logoutButtonShouldBeVisible();
  });

  test("Empty inputs", async () => {
    await pm.loginPage.typeInInput("id", "");
    await pm.loginPage.inputShouldHaveErrorMessage("id", "pole wymagane");
    await pm.loginPage.typeInInput("password", "");
    await pm.loginPage.inputShouldHaveErrorMessage("password", "pole wymagane");

    await pm.loginPage.submitButtonShouldBeDisabled();
  });

  test("Too short inputs", async () => {
    await pm.loginPage.typeInInput("id", "12");
    await pm.loginPage.inputShouldHaveErrorMessage(
      "id",
      "identyfikator ma min. 8 znaków"
    );
    await pm.loginPage.typeInInput("password", "12");
    await pm.loginPage.inputShouldHaveErrorMessage(
      "password",
      "hasło ma min. 8 znaków"
    );

    await pm.loginPage.submitButtonShouldBeDisabled();
  });

  test("Empty password", async () => {
    await pm.loginPage.typeInInput("id", "123456789");
    await pm.loginPage.inputShouldNotHaveErrorMessage("id");
    await pm.loginPage.typeInInput("password", "");
    await pm.loginPage.inputShouldHaveErrorMessage("password", "pole wymagane");

    await pm.loginPage.submitButtonShouldBeDisabled();
  });
});
