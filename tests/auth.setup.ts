import { test as setup } from "@playwright/test";
import { PageMenager } from "../test-pages/pagesMenager.setup";
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

setup("Logged as normal user", async ({ page }) => {
  await pm.setupLoginAs(process.env.ID!, process.env.PASSWORD!);
  await pm.pulpitPage.userShouldBeLogged();
  await page.context().storageState({ path: "./.auth/auth.session.json" });
});

setup("Not logged user", async ({ page }) => {
  await page.context().storageState({ path: "./.auth/notAuth.session.json" });
});
