import { Given, Then, When } from "@cucumber/cucumber";
import formInstance from "../Pages/formInstancePage.js";
/** @type {formInstance} */

let form_instance;

When('the user click new request button', async function () {

  form_instance = new formInstance(this.newTab);
  await form_instance.clickOnNewRequestButton();
  console.log("user cilck on new request button");
});

When('the user click on start a new form button', async function () {
  await form_instance.clickOnStartNewFormButton();
  console.log("user cilck on start a new form button");
});

When('the user search test form inside search box', async function () {
  await form_instance.enterFormNameToSearch("test");
  console.log("user search test form inside search box");
});

When('the user click kim test form', async function () {
  await form_instance.selectKimTestForm();
  console.log("user selected the kim test form");
});

When('the user click next button', async function () {
  await form_instance.clickOnNextButton();
  console.log("user clicked on next button");
});

When('the user click search patient list button', async function () {
  await form_instance.clickOnPatientFormButton();
  console.log("user clicked on search patient list button");
});

When('the user select the patient from dropdown', async function () {
  await form_instance.selectPatient();
  console.log("user selected patient");
});

When('the user select the drugs from dropdown', async function () {
  await form_instance.selectDrug();
  console.log("user selected drug");
});

When('the user select the prescribers from dropdown', async function () {
  await form_instance.selectPrescriber();
  console.log("user selected prescriber");
});

When('the user click the start form button', async function () {
  await form_instance.clickOnStartFormButton();
  console.log("user clicked startForm Button");
});

When('the user check form generated or not', async function () {
  await form_instance.validatePdfFormGeneratedOrNot();
  console.log("form generated successfully..");
});


//test 


When('the user clicks the Send to Recipient button', async function () {
  await form_instance.clickSendToRecipient();
  console.log("Send to Recipient");


});


When('the user selects a patient from the list', async function () {
  await form_instance.selectPatientFromList();
  console.log("selects a patient from the list")

});


When('the user clicks the Send a Text Link button', async function () {
  await form_instance.selectTextLinkButton();
  console.log("Send a Text Link");

});


When('the user enables the {string} checkbox', async function (msg) {
  await form_instance.HandleSelectEmailCheckBox();
  console.log(msg);
});


When('the user enters a valid email address', async function () {
  console.log("the user enters a valid email address")
  await form_instance.EntervalidEMail();
});


When('the user clicks the first Next button', async function () {
  console.log("first  next");
  await form_instance.clickNextButtonAfterEmail();
});

//
When('the user selects a field in the form', async function () {
  await form_instance.handleclickOnFeildForm();
  console.log("the user selects a field in the form");

});


When('an action is displayed on the right side', async function () {
  await form_instance.validateConatinerForm();
  console.log("an action is displayed on the right side");

});


When('the user click last next button', async function () {
  await form_instance.clickNextAfterCheckContainer();
  console.log("next");
});





When( 'the user clicks the Proceed button', async function () {
  await form_instance.handleProceedButton();
  console.log("proceed");
});




When('the user selects a Prescriber from the list', async function () {
  await form_instance.handlePrescriber();
  console.log("select Prescriber")

});



When('the user clicks the Email Link button', async function () {
  await form_instance.handleEmailButton();
  console.log("Select Email..")
});

// mail handle 


         When('the user navigates to Mailinator', async function () {
          // form_instance = new formInstance(this.page);
          await form_instance.MailinatorOPen();
         });

         When('the user should be able to view the latest email received', async function () {
          await form_instance.HandleRequestFromMail();
          console.log("try to open new mail ")
         });


         When('the user clicks the Continue button', async function () {
            //form_instance = new formInstance(this.newTab);
           
          await form_instance.HandleContinueButton();

          console.log("click continue button");
         });


         When('the user clicks the Finish button', async function () {
          await form_instance.HandleFinishButton();
           console.log("clixk finish button");
         });


         When('the user clicks the Submit Anyway button', async function () {
           await form_instance.handleSubmitAnywayButton();
            console.log("clixk submit button");
         });

          When('User open mailinator and create a Mail', async function () {
            form_instance = new formInstance(this.page);
          await form_instance.MailinatorOPenFirstTime();
          console.log("open first tiime")
         });

         When('Validate the Mail sent Successfully', async function () {
           await form_instance.VerifytheMessage();
           console.log("validate  Mail sent Successfully")
         });

          When('the user verify the Successfull message after Submit', async function () {
          await form_instance.VerifyTheMessageAFterSubmit();
          console.log("verify te msg after submit")
         });



         When('the user add the mail to receive', async function () {
          await form_instance.validatePrescriberEmailIsThereNot();
          console.log("Added Email")
        });



         When('the user select Access code in Authentication Option', async function () {
          await form_instance.HandleAccessCode();
          console.log("Added Access code")
        });


         When('the user Adding the AccessCode', async function () {
           await form_instance.HandleAccessCodeAuthorizationPage();
          console.log("Added Access code in Authorization page")
});


         When('the user clicks the Continue button in Authorization Page', async function () {
await form_instance.HandleContinueButttonInAuthorizationPage();
          console.log("Click COntinue ")
        });
