import { test } from "@playwright/test";
import { PageMenager } from "../test-pages/pagesMenager.setup";
import { pages } from "../test-data/pages.data";
import {
  AvailablePayees,
  AvailablePhoneNumbers,
} from "../test-pages/pages/pulpit.page";

let pm: PageMenager;

test.beforeEach(async ({ page }) => {
  pm = new PageMenager(page);
  await page.goto(pages.pulpit);
});

test.describe("Pulpit page", () => {
  test.describe("Quick transfer", () => {
    test("Doing quick transfer", async () => {
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
    test("Tooltip", async () => {
      await pm.pulpitPage.showQuickTransferTooltip();

      await pm.pulpitPage.tooltipWindowShouldBeVisible();
    });
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

  test("Finance manager", async () => {
    const monthAmount = 6;

    await pm.pulpitPage.chooseFinanceMenagerTime(monthAmount);

    await pm.pulpitPage.atChartShouldBeXCircles(monthAmount);
  });
});
