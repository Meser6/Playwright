import { test } from "@playwright/test";
import { PageMenager } from "../test-pages/pagesMenager";
import { pages } from "../test-data/pages.data";

let pm: PageMenager;

test.beforeEach(async ({ page }) => {
  pm = new PageMenager(page);
  await page.goto(pages.pulpit);
  await pm.pulpitPage.chooseCategoryAtMenu("pulpit");
});

test.describe("Pulpit page", () => {
  test("Fast transfer", async () => {
    const transferAmount = 159.2;
    const balanceBefore = await pm.pulpitPage.getCurrentAccountBalance();

    await pm.pulpitPage.doTransfer("Jan Demobankowy", transferAmount, "TITLE");

    await pm.pulpitPage.currentBalanceShouldBeSmallerThenBeforeTransfer(
      transferAmount,
      balanceBefore
    );
  });
});
