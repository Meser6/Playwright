import { Page } from "playwright-core";
import { LoginPage } from "./pages/login";
import { PulpitPage } from "./pages/pulpit";

export class PageMenager {
  readonly page: Page;
  readonly loginPage: LoginPage;
  readonly pulpitPage: PulpitPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.pulpitPage = new PulpitPage(this.page);
  }
}
