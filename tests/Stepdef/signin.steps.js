import signin from "../Pages/signinPage.js";
import { Given, Then, When } from "@cucumber/cucumber";

/** @type {signin} */
let signIn;

// Use 'async function ()' instead of arrow functions to access 'this.page'
Given('the user navigate to okrx sigin page', async function () {
  // Initialize the page object using the World's page instance
    this.newTab = await this.page.context().newPage();
  signIn = new signin(this.newTab); 
  await signIn.navigateToSignInPage();
 
  
  console.log("inside signin page");
});

When('the user enter the valid emailid', async function () {
  await signIn.enterEmailId();
  console.log("inside enter emailid ");
});

When('the user user click continue button', async function () {
  await signIn.clickContinueButton();
  await signIn.waitUntilSimpleModalDataLoaderToBeHidden();
  console.log("inside click continue button ");
});

When('the user validate the already signin context is coming or not', async function () {
  await signIn.validateTheAlreadySigninContext();
});

When('the user enter the valid password', async function () {
  await signIn.enterPassword();
  console.log("inside enter password ");
});

When('the user user click the signin button', async function () {
  await signIn.clickSignInButton();
  console.log("inside click signin button ");
});

When('the user enters an email address with an invalid format',async function () {
  await signIn.enterEmailIdInvalidFormate();
  console.log("user entered an email address with an invalid format");
});

Then('the user should see an appropriate error message displayed for as email address with an invalid format',async function()
{
  await signIn.validateErrorMesageForInvalidEmailFormate();
 console.log("the user validate the error message displayed for email address with an invalid format");
});

When ('the user enter the invalid emailid', async function()
{
 await signIn.enterInvalidEmailId();
 console.log("user entered an invalid emailId");
});

Then('the user should see an appropriate error message displayed for entering the invalid emailid',async function()
{
await signIn.validateErrorMesageForInvalidEmailId();
 console.log("the user validate the error message displayed for Invalid email id");
});

Then('the user validate the welcome context in dashboard', async function() {
  await signIn.validateTheUserWelcomeText();
  console.log("user validate the welcome text in dashboard");
})
