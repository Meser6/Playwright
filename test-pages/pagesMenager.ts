import { Page } from "playwright-core";
import { LoginPage } from "./pages/loginPage";
import { PulpitPage } from "./pages/pulpitPage";
import { PrivateAccount } from "./pages/privateAccountPage";

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
