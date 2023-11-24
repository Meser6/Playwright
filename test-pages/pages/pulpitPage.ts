import { BasePageLogged } from "../basePageLogged";
import { expect } from "@playwright/test";

type Payees = "Jan Demobankowy" | "Chuck Demobankowy" | "Michael Scott";

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
    submitTransferButton: this.page.locator("button", { hasText: "wykonaj" }),
  };

  /* functions */
  async getCurrentAccountBalance() {
    return Promise.all([
      this.accountDetailsContainer.moneyValue.textContent(),
      this.accountDetailsContainer.decimalValue.textContent(),
    ]).then(([fullNumber, decimalNumber]) => {
      return Number(`${fullNumber}.${decimalNumber}`);
    });
  }

  async doTransfer(peyee: Payees, amount: number, title: string) {
    await this.quickTransferContainer.payee.selector.selectOption({
      label: peyee,
    }),
      await this.inputShouldNotHaveErrorMessage(
        this.quickTransferContainer.payee.choosedValue,
        this.quickTransferContainer.payee.errorMessage
      );
    await this.typeInInput(
      this.quickTransferContainer.amount.input,
      String(amount)
    ),
      await this.inputShouldNotHaveErrorMessage(
        this.quickTransferContainer.amount.input,
        this.quickTransferContainer.amount.errorMessage
      );
    await this.typeInInput(this.quickTransferContainer.title.input, title),
      await this.inputShouldNotHaveErrorMessage(
        this.quickTransferContainer.title.input,
        this.quickTransferContainer.title.errorMessage
      );
    await this.quickTransferContainer.submitTransferButton.click();
  }

  /* asserations */
  async currentBalanceShouldBeSmallerThenBeforeTransfer(
    transferAmout: number,
    balanceBefore: number
  ) {
    const balanceAfter = await this.getCurrentAccountBalance();
    expect(balanceAfter).toEqual(balanceBefore - transferAmout);
  }
}
