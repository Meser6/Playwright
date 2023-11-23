import { test as setup } from "@playwright/test";
import { PageMenager } from "../test-pages/pagesMenager";

let pm: PageMenager;

setup.beforeEach(async ({ page }) => {
  pm = new PageMenager(page);
  await page.goto("/");
});

/**
 * This file is responsible for creating user sessions.
 * The default user at each tests is 'normal user'.
 * To login as other user use - test.use({ storageState: "./.auth/*.json" }); - before test.
 */

setup("Login as normal user", async ({ page }) => {
  await pm.loginPage.loginAs(process.env.ID!, process.env.PASSWORD!);
  await pm.pulpitPage.logoutButtonShouldBeVisible();
  await page.context().storageState({ path: "./.auth/authSession.json" });
});

setup("Not logged user", async ({ page }) => {
  await page.context().storageState({ path: "./.auth/notAuthSession.json" });
});
