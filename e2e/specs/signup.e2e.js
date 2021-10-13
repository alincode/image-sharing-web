const SignupPage = require("../pageobjects/signup.page");
const HomePage = require("../pageobjects/home.page");

describe("signup", () => {
  it("should signup successfully", async () => {
    await SignupPage.open();
    let username = "e2e" + new Date().getTime();
    let password = "12345678";
    await SignupPage.signup(username, password);
    await expect(HomePage.navLogout).toBeExisting();
    await expect(HomePage.navLogout).toHaveTextContaining("Sign Out");
    await HomePage.logout();
    await expect(HomePage.navLogin).toHaveTextContaining("Login");
  });
});
