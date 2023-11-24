import { test } from "@playwright/test";
import { PageMenager } from "../test-pages/pagesMenager";
import { pages } from "../test-data/pages.data";
import { AvailablePayees } from "../test-pages/pages/pulpitPage";

let pm: PageMenager;

test.beforeEach(async ({ page }) => {
  pm = new PageMenager(page);
  await page.goto(pages.pulpit);
  await pm.pulpitPage.chooseCategoryAtMenu("pulpit");
});

test.describe("Pulpit page", () => {
  test("Fast transfer", async () => {
    const payee: AvailablePayees = "Jan Demobankowy";
    const transferAmount = 159.2;
    const title = "TITLE";
    const balanceBefore = await pm.pulpitPage.getCurrentAccountBalance();

    await pm.pulpitPage.doTransfer(payee, transferAmount, title);

    await pm.pulpitPage.currentBalanceShouldBeSmallerThenBeforeTransfer(
      transferAmount,
      balanceBefore
    );
    await pm.pulpitPage.confirmModalWindowShouldBeVisible();
    await pm.pulpitPage.confirmModalWindowShouldContainsTexts(
      payee,
      String(transferAmount).replace(".", ","),
      title,
      "Przelew wykonany"
    );
  });
});
