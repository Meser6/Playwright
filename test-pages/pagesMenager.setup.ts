import { Page } from "playwright-core";
import { LoginPage } from "./pages/login.page";
import { PulpitPage } from "./pages/pulpit.page";
import { PrivateAccount } from "./pages/privateAccount.page";
import { ReportsPage } from "./pages/reports.page";

export class PageMenager {
  readonly page: Page;
  readonly loginPage: LoginPage;
  readonly pulpitPage: PulpitPage;
  readonly privateAccount: PrivateAccount;
  readonly reportsPage: ReportsPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.pulpitPage = new PulpitPage(this.page);
    this.privateAccount = new PrivateAccount(this.page);
    this.reportsPage = new ReportsPage(this.page);
  }

  /**
   * Function to login in auth.setup. Use data from .env
   * @param id - proscess.env.ID
   * @param password - proscess.env.PASSWORD
   */
  async setupLoginAs(id: string, password: string) {
    await this.loginPage.login.id.input.fill(id);
    await this.loginPage.login.password.input.fill(password);
    await this.loginPage.login.submitButton.click();
  }
}
