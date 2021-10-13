const Page = require("./page");

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SignupPage extends Page {
  /**
   * define selectors using getter methods
   */
  get inputUsername() {
    return $("input[name='username']");
  }
  get inputPassword() {
    return $("input[name='password']");
  }
  get inputConfirmPassword() {
    return $("input[name='confirmPassword']");
  }
  get btnSubmit() {
    return $('button[type="submit"]');
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */
  async signup(username, password) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.inputConfirmPassword.setValue(password);
    await this.btnSubmit.click();
  }

  /**
   * overwrite specifc options to adapt it to page object
   */
  open() {
    return super.open("register");
  }
}

module.exports = new SignupPage();
