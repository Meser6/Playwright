import { test as setup } from "@playwright/test";
import { PageMenager } from "../test-pages/pagesMenager";
import { pages } from "../test-data/pages.data";

let pm: PageMenager;

setup.beforeEach(async ({ page }) => {
  pm = new PageMenager(page);
  await page.goto(pages.main);
});

/**
 * This file is responsible for creating user sessions.
 * The default user at each tests is 'normal user'.
 * To login as other user use - test.use({ storageState: "./.auth/*.json" }); - before test.
 */

setup("Login as normal user", async ({ page }) => {
  await pm.loginPage.setupLoginAs(process.env.ID!, process.env.PASSWORD!);
  await pm.pulpitPage.logoutButtonShouldBeVisible();
  await page.context().storageState({ path: "./.auth/authSession.json" });
});

setup("Not logged user", async ({ page }) => {
  await page.context().storageState({ path: "./.auth/notAuthSession.json" });
});
