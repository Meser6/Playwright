import { BasePageLogged } from "../basePageLogged";
import { expect } from "@playwright/test";

export type AvailablePayees =
  | "Jan Demobankowy"
  | "Chuck Demobankowy"
  | "Michael Scott";

export type AvailablePhoneNumbers =
  | "500 xxx xxx"
  | "502 xxx xxx"
  | "503 xxx xxx"
  | "504 xxx xxx";

export class PulpitPage extends BasePageLogged {
  /* locators */
  readonly accountDetailsContainer = {
    moneyValue: this.page.locator("#money_value"),
    decimalValue: this.page.locator("#decimal_value"),
  };

  readonly quickTransferContainer = {
    payee: {
      selector: this.page.locator('select[id*="transfer_receive"]'),
      choosedValue: this.page
        .locator('select[id*="transfer_receive"]')
        .locator(".."),
      errorMessage: this.page.getByTestId("error-widget-1-transfer-receiver"),
    },
    amount: {
      input: this.page.locator('[id*="transfer_amount"]'),
      errorMessage: this.page.getByTestId("error-widget-1-transfer-amount"),
    },
    title: {
      input: this.page.locator('[id*="transfer_title"]'),
      errorMessage: this.page.getByTestId("error-widget-1-transfer-title"),
    },
    submitButton: this.page.locator("button", { hasText: "wykonaj" }),
  };

  readonly phoneRecharge = {
    receiver: {
      selector: this.page.locator("#widget_1_topup_receiver"),
      choosedValue: this.page.locator("#widget_1_topup_receiver").locator(".."),
      errorMessage: this.page.getByTestId("error-widget-1-topup-receiver"),
    },
    amount: {
      input: this.page.locator("#widget_1_topup_amount"),
      errorMessage: this.page.getByTestId("error-widget-1-topup-receiver"),
    },
    confirmReulations: {
      checker: this.page.locator("#uniform-widget_1_topup_agreement"),
      errorMessage: this.page.getByTestId("error-widget-1-topup-agreement"),
    },
    submitButton: this.page.locator("#execute_phone_btn"),
  };

  readonly financeMenager = {
    timeSelector: this.page.locator(
      'select[data-classes*="widget-financial-manager-select"]'
    ),
    chart: this.page.locator(
      ".widget-financial-manager g:nth-child(1) path:nth-child(2)"
    ),
    lineCircles: this.page.locator(".widget-financial-manager circle"),
  };

  readonly confirmModalWindow = this.page.locator("div.ui-dialog");

  /* functions */
  async getCurrentAccountBalance() {
    return Promise.all([
      this.accountDetailsContainer.moneyValue.textContent(),
      this.accountDetailsContainer.decimalValue.textContent(),
    ]).then(([fullNumber, decimalNumber]) => {
      return Number(`${fullNumber}.${decimalNumber}`);
    });
  }

  async doQuickTransfer(peyee: AvailablePayees, amount: number, title: string) {
    await this.quickTransferContainer.payee.selector.selectOption({
      label: peyee,
    });
    await this.inputShouldNotHaveErrorMessage(
      this.quickTransferContainer.payee.choosedValue,
      this.quickTransferContainer.payee.errorMessage
    );
    await this.typeInInput(
      this.quickTransferContainer.amount.input,
      String(amount)
    );
    await this.inputShouldNotHaveErrorMessage(
      this.quickTransferContainer.amount.input,
      this.quickTransferContainer.amount.errorMessage
    );
    await this.typeInInput(this.quickTransferContainer.title.input, title);
    await this.inputShouldNotHaveErrorMessage(
      this.quickTransferContainer.title.input,
      this.quickTransferContainer.title.errorMessage
    );
    await this.quickTransferContainer.submitButton.click();
  }

  async rechargePhone(
    receiver: AvailablePhoneNumbers,
    amount: number,
    confirmReulations: boolean
  ) {
    await this.phoneRecharge.receiver.selector.selectOption({
      label: receiver,
    });
    await this.inputShouldNotHaveErrorMessage(
      this.phoneRecharge.receiver.choosedValue,
      this.phoneRecharge.receiver.errorMessage
    );
    await this.typeInInput(this.phoneRecharge.amount.input, String(amount));
    await this.inputShouldNotHaveErrorMessage(
      this.phoneRecharge.amount.input,
      this.phoneRecharge.amount.errorMessage
    );
    if (confirmReulations) {
      await this.phoneRecharge.confirmReulations.checker.check();
      await expect(
        this.phoneRecharge.confirmReulations.errorMessage
      ).not.toBeVisible();
      await this.phoneRecharge.submitButton.click();
    }
  }

  async chooseFinanceMenagerTime(monthAmount: 1 | 3 | 6 | 12) {
    const chart = await this.financeMenager.chart.elementHandle();
    await this.financeMenager.timeSelector.selectOption({
      value: String(monthAmount),
    });
    await this.page.waitForTimeout(1000);
    // await chart!.waitForElementState("stable");
    // await chart!.waitForElementState('stable')
  }

  /* asserations */
  async currentBalanceShouldBeSmallerThenBeforeTransfer(
    transferAmout: number,
    balanceBefore: number
  ) {
    const balanceAfter = await this.getCurrentAccountBalance();
    expect(balanceAfter).toEqual(balanceBefore - transferAmout);
  }

  async confirmModalWindowShouldBeVisible() {
    expect(this.confirmModalWindow).toBeVisible();
  }

  async confirmModalWindowShouldContainsTexts(...texts: string[]) {
    const textsAtModalWindow = await this.confirmModalWindow.allTextContents();
    for (const text of texts) {
      expect(textsAtModalWindow[0]).toContain(text);
    }
  }

  async atChartShouldBeXCircles(circlesAmount: number) {
    await this.financeMenager.chart.hover({ force: true });

    expect(this.financeMenager.lineCircles).toHaveCount(0);
  }
}
