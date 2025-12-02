import signin from "../Pages/signinPage.js";
import { Given, Then, When } from "@cucumber/cucumber";

/** @type {signin} */
let signIn;

// Use 'async function ()' instead of arrow functions to access 'this.page'
Given('the user navigate to okrx sigin page', async function () {
  // Initialize the page object using the World's page instance
  signIn = new signin(this.page); 
  await signIn.navigateToSignInPage();
  
  console.log("inside signin stepdef");
});

When('the user enter the valid emailid', async function () {
  await signIn.enterEmailId();
  console.log("inside enter emailid step");
});

When('the user user click continue button', async function () {
  await signIn.clickContinueButton();
  await signIn.waitUntilSimpleModalDataLoaderToBeHidden();
  console.log("inside click continue button step");
});

Then('the user validate the already signin context is coming or not', async function () {
  await signIn.validateTheAlreadySigninContext();
});

When('the user enter the valid password', async function () {
  await signIn.enterPassword();
  console.log("inside enter password step");
});

When('the user user click the signin button', async function () {
  await signIn.clickSignInButton();
  console.log("inside click signin button step");
});