import { Page } from "playwright-core";
import { LoginPage } from "./pages/login.page";
import { PulpitPage } from "./pages/pulpit.page";
import { PrivateAccount } from "./pages/privateAccount.page";

export class PageMenager {
  readonly page: Page;
  readonly loginPage: LoginPage;
  readonly pulpitPage: PulpitPage;
  readonly privateAccount: PrivateAccount;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.pulpitPage = new PulpitPage(this.page);
    this.privateAccount = new PrivateAccount(this.page);
  }
}
