const LoginPage = require("../pageobjects/login.page");
const HomePage = require("../pageobjects/home.page");

describe("login", () => {
  it("should login successfully", async () => {
    await LoginPage.open();
    await LoginPage.login("alincode", "12345678");
    await expect(HomePage.navLogout).toBeExisting();
    await expect(HomePage.navLogout).toHaveTextContaining("Sign Out");
    await HomePage.logout();
    await expect(HomePage.navLogin).toHaveTextContaining("Login");
  });
});
