import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import * as LOGIN_PAGE_XPATH from "../helper/util/Locators/loginPageLoc.json";

export default class LoginPage {
  private base: PlaywrightWrapper;
  constructor(private page: Page) {
    this.base = new PlaywrightWrapper(page);
  }

  async navigateToLoginPage() {
    await this.base.goto("/login");
    await expect(this.page).toHaveTitle("BookCart");
  }
  async enterUserName(user: string) {
    await this.page.locator(LOGIN_PAGE_XPATH.UserNameTextBox).fill(user);
  }
  async enterPassword(Password: string) {
    await this.page.locator(LOGIN_PAGE_XPATH.PasswordTextBox).fill(Password);
  }

  async clickLoginButton() {
    await this.base.waitAndClick(LOGIN_PAGE_XPATH.LoginBtn);
  }

  getErrorMessage() {
    return this.page.getByRole("alert");
  }

  async loginUser(user: string, password: string) {
    await this.enterUserName(user);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }
}
