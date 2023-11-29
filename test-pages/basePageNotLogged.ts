import { BasePage } from "./basePage";

export abstract class BasePageNotLogged extends BasePage {
  abstract userShouldBeNotLogged(): Promise<void>;
  abstract setupLoginAs(id: string, password: string): Promise<void>;
}
