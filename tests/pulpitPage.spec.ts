import { test } from "@playwright/test";
import { PageMenager } from "../test-pages/pagesMenager";

let pm: PageMenager;

test.beforeEach(async ({ page }) => {
  pm = new PageMenager(page);
  await page.goto("/");
  await pm.loginPage.loginAs(process.env.ID!, process.env.PASSWORD!);
  await pm.pulpitPage.chooseCategoryAtMenu("charts");
  await pm.pulpitPage.chooseCategoryAtMenu("pulpit");
});

test.describe("Pulpit page", () => {
  test("test", async () => {
    await pm.page.waitForTimeout(100);
    console.log("dupas");
  });
});
