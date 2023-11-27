import { test } from "@playwright/test";
import { PageMenager } from "../test-pages/pagesMenager";
import { pages } from "../test-data/pages.data";
import {
  AvailablePayees,
  AvailablePhoneNumbers,
} from "../test-pages/pages/pulpitPage";

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

    await pm.pulpitPage.doQuickTransfer(payee, transferAmount, title);

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
  test("Phone Recharge", async () => {
    const reciver: AvailablePhoneNumbers = "500 xxx xxx";
    const amount = 21;
    const confirmReulations = true;

    await pm.pulpitPage.rechargePhone(reciver, amount, confirmReulations);

    await pm.pulpitPage.confirmModalWindowShouldBeVisible();
    await pm.pulpitPage.confirmModalWindowShouldContainsTexts(
      reciver,
      String(amount).replace(".", ","),
      "Doładowanie wykonane"
    );
  });

  test.skip("Finance manager", async () => {
    const monthAmount = 6;

    await pm.pulpitPage.chooseFinanceMenagerTime(monthAmount);

    await pm.pulpitPage.atChartShouldBeXCircles(monthAmount);
    //TODO .hover() does not make the line appear.
  });
});