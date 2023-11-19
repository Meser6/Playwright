import { Page } from "playwright-core";

export class BasePage {
  constructor(readonly page: Page) {}
}
