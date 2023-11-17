import { expect, test } from "@playwright/test";
import { PageMenager } from "../test-pages/pagesMenager";

test.describe("Login mechanism", () => {
  let pm: PageMenager;

  test.beforeEach(async ({ page }) => {
    pm = new PageMenager(page);
    await page.goto("/");
  });

  test("Correct Login", async ({ page }) => {
    await pm.loginPage.loginAs(process.env.ID!, process.env.PASSWORD!);

    await expect(pm.pulpitPage.header.logoutButton).toBeVisible();
  });
  test("Empty inputs", async ({ page }) => {
    await pm.loginPage.getEmptyInput("idInput");
    await pm.loginPage.getEmptyInput("passwordInput");

    await pm.loginPage.atInputShouldBeValidationError("id", "pole wymagane");
    await pm.loginPage.atInputShouldBeValidationError(
      "password",
      "pole wymagane"
    );
    await pm.loginPage.submitButtonShouldBeDisabled();
  });
});
