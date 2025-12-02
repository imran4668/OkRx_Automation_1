
import  signin  from "../Pages/signinPage.js"
import { Given, Then, When } from "@cucumber/cucumber";


let signIn ;
Given('the user navigate to okrx sigin page', async ({page}) => {
  // signIn = new signin(page);
  // console.log("application opened");
  console.log("inside signin stepdef");
});

When('the user enter the valid emailid', async ({}) => {
//  await signIn.enterEmailId();
console.log("inside enter emailid step");
});

When('the user user click continue button', async ({}) => {
  // await signIn.clickContinueButton();
  // await signIn.waitUntilSimpleModalDataLoaderToBeHidden();
  console.log("inside click continue button step");
});

Then('the user validate the already signin context is coming or not', async ({}) => {
 await signIn.validateTheAlreadySigninContext();
});

When('the user enter the valid password', async ({}) => {
  // await signIn.enterPassword();
  console.log("inside enter password step");
});

When('the user user click the signin button', async ({}) => {
  // await signIn.clickSignInButton();
  console.log("inside click signin button step");
});
