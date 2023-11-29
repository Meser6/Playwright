import { test } from "@playwright/test";
import { PageMenager } from "../test-pages/pagesMenager";
import { pages } from "../test-data/pages.data";

let pm: PageMenager;

test.beforeEach(async ({ page }) => {
  pm = new PageMenager(page);
  await page.goto(pages.pulpit);
  await pm.pulpitPage.chooseCategoryAtMenu("pulpit");
});

test.describe.only("Session timer", () => {
  test("Time passing in the timer", async () => {
    const timeBefore = await pm.pulpitPage.getCurrentTimeToSessnionEnd();
    const waitingTime = 2;

    await pm.page.waitForTimeout(waitingTime * 1000);

    await pm.pulpitPage.currentTimeToSessionEndShuldBeLessThenBefore(
      timeBefore,
      true,
      waitingTime
    );
  });
  test("Reseting time after visiting another tab at menu", async () => {
    await pm.page.waitForTimeout(2000);

    await pm.pulpitPage.chooseCategoryAtMenu("privaccounts");

    await pm.privateAccount.currentTimeToSessionEndShuldBe(10, 0);
  });
});
