const Page = require("./page");

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
  /**
   * define selectors using getter methods
   */
  get navLogout() {
    return $("[data-test='nav-logout']");
  }

  get navLogin() {
    return $("[data-test='nav-login']");
  }

  get navSignup() {
    return $("[data-test='nav-signup']");
  }

  async logout() {
    await this.navLogout.click();
  }
}

module.exports = new HomePage();
