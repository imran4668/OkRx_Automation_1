import { expect } from "@playwright/test";
import { executionAsyncId } from "async_hooks";
import dotenv from "dotenv";
import {CustomWorld} from '../Hooks/world.js'
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const testdata = require("../TestData/appCreds.json");
const validation = require("../TestData/Validation.json");


dotenv.config();
/**
 *  * @typedef {import('@playwright/test').Page} Page 
 */

class formInstance {
    /**
    * @param {Page} page 
    */
    constructor(page) {
        this.page = page;
        this.newTab=null;
        this.newRequestButton = page.locator("//a[@data-test='newRequestBtn']");
        this.overLayLoader = page.locator("//div[@class='overlay__content']");
        this.startNewFormButton = page.locator("//div[@class='card-body']//button").first();
        this.loader = page.locator("//div[@class='loaderContainer']/div[2]").first();
        this.searchFormTextField = page.locator("//div[@id='searchbox']//input");
        this.kimTestForm = page.locator("//h5[@data-original-title='Kim Test Form']//ancestor::li");
        this.nextButton = page.locator("//button[contains(text(),'Next')]/parent::div").first();
        this.patientFormButton = page.locator("//div[@id='selectPatientOption']//button").first();
        this.formDropDown = page.locator("//span[@class='selection']");
        this.searchLoader = page.locator("//li[contains(text(),'Searching')]");
        this.patientList = page.locator("//ul[@id='select2-patientSelect-results']/li").first();
        this.drugList = page.locator("//ul[@class='select2-results__options']/li").first();
        this.prescriberList = page.locator("//ul[@class='select2-results__options']/li").first();
        this.startFormButton = page.locator("//button[contains(text(),'Start Form')]/parent::div");
        this.pdfForm = page.locator("//div[@id='pspdfkit']");
        //test
        this.sendToRecipient = page.locator('//*[@id="main-container"]/div[1]/div[1]/div[4]/nav/ul/li[4]/a');
        this.selectThePatient = page.locator('//*[@id="main-providers"]/div/div/div[2]/div[1]/div/div[2]/a');
        this.sentATextButton = page.locator('//*[@id="request-signature-form"]/div/div/div/div[2]/div[2]/div/div[2]/div/div[3]/div[1]/div[1]/a');
        this.selectEmailCheckBox = page.locator('//*[@id="sendEmail"]');
        this.EnterEmail = page.locator('//*[@id="multi-recipient-email-input-replacement"]');
        this.ClickNextButton = page.locator("//button[contains(text(),'Next')]/parent::div/button").first();
        this.selectTextField = page.locator('//*[@id="manualFormsOutbound-FormPreviewStep"]/div[3]/div[1]/div[1]/div[2]/div[2]/div[1]');
        this.selectFeildInForm = page.locator('.PSPDFKit-Container >> shadow=[data-annotation-id="628"]');
        this.checkContainer = page.locator("//div[@id='selectedFormFieldsContents']/div[contains(@class,'selectedFormFieldTemplate')]");
        this.clickNextButton1 = page.locator("//button[contains(text(),'Next')]/parent::div").nth(1);
        this.clickProceedButton = page.locator("//div[contains(@class,'text-left')]/button[contains(text(),'Proceed')]")
        this.prescriberButton = page.locator('//*[@id="main-providers"]/div/div/div[3]/div[1]/div/div[2]/a');
        this.EmailButton = page.locator('//*[@id="request-signature-form"]/div/div/div/div/div/div[3]/div/div[3]/div[1]/div[1]/a');
        this.noAuthorization =page.locator('//*[@id="request-signature-form"]/div/div/div[2]/div/div[3]/div[1]/div/div[2]/label');
        //Pom
        // this.closePopup=page.locator('//*[@id="requestTrial"]/div/div/div[1]/button')
        this.recentMail=page.locator('//div[@class="os-content"]/table/tbody/tr[1]');
        this.linkTab=page.locator('//li[@class="nav-item"]/a[@id="pills-links-tab"]');
        this.viewRequestLink=page.locator("//div[@id='clicklinks']/following-sibling::table//tr[2]/td[2]");
        // this.link=
        this.iframe=page.frameLocator("#html_msg_body").locator("//a[contains(text(),'View Request')]");
        this.conitnueInVerification=page.locator("//span[contains(text(),'Continue')]/parent::button");
        this.FinishButton=page.locator('//*[@id="main-container"]/div[1]/div[2]/div[2]/div[2]/div[2]');
        this.submitAnywayButton=page.locator('//*[@id="OnFinishMissingRequiredFieldsModal"]/div/div/div[3]/div/div[3]');
        this.validateSuccessMsg=page.locator('//*[@id="main-container"]/div[1]/div[1]/div/div/div[2]/h4');
        this.validateSuccessMsgAfterSubmit=page.locator("//h4[@data-test='successMessage']")
        //prescriber
        this.previousPrecriberEmail=page.locator("//div[@id='selected-badges']/div");
        this.previousPrecriberEmailClose=page.locator("//div[@id='selected-badges']/div/span");
        this.PrecriberEmail=page.locator("//input[@id='multi-recipient-email-input-replacement']");
        this.authorizationAccessCode=page.locator("//label[@for='AccessCodeAuth']")
        this.authorizationAccessCodeInput=page.locator("//input[@id='AccessCode']");
        //authorization page in mail
        this.authorizationContinueButton=page.locator("//button[contains(text(),'Continue')]");

    


    }
    async waitForPageChange(page, timeout = 20000) {
        return await page.waitForFunction(() => {
            return document.readyState === "complete" ||
                document.readyState === "interactive";
        }, { timeout });
    }

    async clickOnNewRequestButton() {
        await this.page.waitForTimeout(3000)
        await expect.soft(this.newRequestButton).toBeEnabled();
        await this.newRequestButton.click();
        await expect.soft(this.overLayLoader).toBeVisible();
        await expect.soft(this.overLayLoader).toBeHidden();
    }
    async clickOnStartNewFormButton() {
        await expect.soft(this.startNewFormButton).toBeEnabled();
        await this.startNewFormButton.click();
        await expect.soft(this.loader).toBeVisible();
        await expect.soft(this.loader).toBeHidden();

    }
    async enterFormNameToSearch(formname) {
        await expect.soft(this.searchFormTextField).toBeEnabled();
        await this.searchFormTextField.fill(formname);
        await this.page.waitForTimeout(2000);
    }
    async selectKimTestForm() {
        await expect.soft(this.kimTestForm).toBeVisible();
        await this.kimTestForm.click();
        await expect.soft(this.loader).toBeVisible();
        await expect.soft(this.loader).toBeHidden();
    }
    async clickOnNextButton() {
        try {
            await this.page.waitForTimeout(3000);
            await expect.soft(this.nextButton).toBeEnabled();
            await this.nextButton.click();
            await expect.soft(this.loader).toBeVisible();
            await expect.soft(this.loader).toBeHidden();
        }
        catch (e) {
            await this.page.waitForTimeout(4000);
            await expect.soft(this.nextButton).toBeEnabled();
            await this.nextButton.click();
            await expect.soft(this.loader).toBeVisible();
            await expect.soft(this.loader).toBeHidden();
        }
    }
    async clickOnPatientFormButton() {
        await expect.soft(this.patientFormButton).toBeEnabled();
        await this.patientFormButton.click();
    }
    async selectPatient() {
        await expect.soft(this.formDropDown).toBeVisible();
        await this.formDropDown.click();
        await expect.soft(this.searchLoader).toBeVisible();
        await expect.soft(this.searchLoader).toBeHidden();
        await this.patientList.click();
        await this.page.waitForTimeout(5000);
    }
    async selectDrug() {
        await expect.soft(this.formDropDown).toBeVisible();
        await this.formDropDown.click();
        await this.drugList.click();
        await expect.soft(this.loader).toBeVisible();
        await expect.soft(this.loader).toBeHidden();
    }
    async selectPrescriber() {
        await expect.soft(this.formDropDown).toBeVisible();
        await this.formDropDown.click();
        await expect.soft(this.searchLoader).toBeVisible();
        await expect.soft(this.searchLoader).toBeHidden();
        await this.prescriberList.click();
        await expect.soft(this.loader).toBeVisible();
        await expect.soft(this.loader).toBeHidden();

    }
    async clickOnStartFormButton() {
        await this.page.waitForTimeout(2000);
        await expect.soft(this.startFormButton).toBeEnabled();
        await this.startFormButton.click();
        try {
            await this.page.waitForTimeout(15000);
        }
        catch (error) {
            await this.page.waitForTimeout(5000);
        }
    }

    async validatePdfFormGeneratedOrNot() {
        await this.page.waitForLoadState('networkidle');
        await this.overLayLoader.waitFor({ state: "visible", timeout: 50000 });
        await expect.soft(this.overLayLoader).toBeHidden();
        await expect.soft(this.pdfForm).toBeVisible();
    }



    //test


    async clickSendToRecipient() {
        await this.page.waitForLoadState('networkidle');
        await expect(this.sendToRecipient).toBeVisible();
        await this.sendToRecipient.waitFor({ state: "visible", timeout: 50000 });
        await this.sendToRecipient.click();
    }

    async selectPatientFromList() {
        await this.page.waitForLoadState('networkidle');
        await expect(this.selectThePatient).toBeVisible();
        await this.selectThePatient.waitFor({ state: "visible", timeout: 50000 });
        await this.selectThePatient.click();
    }
    async selectTextLinkButton() {
        await this.page.waitForLoadState('networkidle');
        await expect(this.sentATextButton).toBeVisible();
        await this.sentATextButton.waitFor({ state: "visible", timeout: 50000 });
        await this.sentATextButton.click();
    }

    async HandleSelectEmailCheckBox() {
        await this.page.waitForLoadState('networkidle');
        await expect(this.selectEmailCheckBox).toBeVisible();
        await this.selectEmailCheckBox.waitFor({ state: "visible", timeout: 50000 });
        await this.selectEmailCheckBox.click();
    }

    async EntervalidEMail() {

        console.log(process.env.MAILINATORMAIL);
        await this.page.waitForLoadState('networkidle');
        await expect(this.EnterEmail).toBeVisible();
        await this.EnterEmail.waitFor({ state: "visible", timeout: 50000 });
        await this.EnterEmail.fill(process.env.MAILINATORMAIL);
        await this.page.keyboard.press("Enter");
        await this.page.keyboard.press("Tab");
        await expect(this.noAuthorization).toBeVisible();
        await this.noAuthorization.waitFor({ state: "visible", timeout: 50000 });
        await this.noAuthorization.click();
    }
    //
    async clickNextButtonAfterEmail() {
        await this.page.waitForLoadState('networkidle');
        await this.page.evaluate(() => {
            const toast = document.querySelector('#cookie-notice');
            if (toast) toast.remove();
        });
        await this.ClickNextButton.scrollIntoViewIfNeeded();
        await expect(this.ClickNextButton).toBeVisible();
        await this.ClickNextButton.waitFor({ state: "visible", timeout: 50000 });
        await this.ClickNextButton.click();

    }
    //
    async handleclickOnFeildForm() {
        await expect(this.selectTextField).toBeVisible();
        await this.selectTextField.waitFor({ state: "visible", timeout: 50000 });
        await this.selectTextField.click();
        await this.page.waitForTimeout(3000);
        const box = await this.selectTextField.boundingBox();
        if (!box) {
            throw new Error(`Element with locator “${selectTextField}” not found or not visible.`);
        }
        const startX = box.x + box.width / 2;
        const startY = box.y + box.height / 2;
        await this.page.mouse.move(startX, startY);
        await this.page.mouse.down();
        await this.page.mouse.move(startX + 300, startY + 0, { steps: 10 });
        await this.page.mouse.up();
    }
    async validateConatinerForm() {
        await this.page.waitForLoadState('networkidle');
        await expect(this.checkContainer).toBeVisible();
        await this.checkContainer.waitFor({ state: "visible", timeout: 50000 });
        await expect(this.checkContainer).toBeVisible();
    }
    async clickNextAfterCheckContainer() {
        await expect.soft(this.clickNextButton1).toBeEnabled();
        await this.clickNextButton1.waitFor({ state: "visible", timeout: 50000 });
        await this.clickNextButton1.click();
    }
    async handleProceedButton() {
        await this.page.waitForLoadState('networkidle');
        await expect(this.clickProceedButton).toBeVisible();
        await this.clickProceedButton.waitFor({ state: "visible", timeout: 50000 });
        await this.clickProceedButton.scrollIntoViewIfNeeded();
        await this.clickProceedButton.click();
    }
    async handlePrescriber() {
        await expect(this.prescriberButton).toBeVisible();
        await this.prescriberButton.waitFor({ state: "visible", timeout: 50000 });
        await this.prescriberButton.scrollIntoViewIfNeeded();
        await this.prescriberButton.click();
    }
    async handleEmailButton() {
        await expect(this.EmailButton).toBeVisible();
        await this.EmailButton.waitFor({ state: "visible", timeout: 50000 });
        await this.EmailButton.scrollIntoViewIfNeeded();
        await this.EmailButton.click();
    }
  
    async MailinatorOPen() {
        await this.page.goto(process.env.MAILINATOR);
        await this.page.waitForTimeout(3000)
        await this.page.keyboard.press("Escape");

        
    }
      async MailinatorOPenFirstTime() {
        await this.page.goto(process.env.MAILINATOR);
        await this.page.waitForTimeout(2000);
        

        
    }
   async checkMethod(retry = 5) {

    await this.page.waitForTimeout(3000);

    try {
        await expect(this.iframe).toBeEnabled({ timeout: 5000 });
        console.log("Iframe is enabled");
        return true;

    } catch (err) {
        console.log(`Iframe not enabled → Reloading... Retries left: ${retry}`);

        if (retry === 0) {
            throw new Error("Iframe still not enabled after maximum retries");
        }

        await this.page.reload();
        await this.page.waitForLoadState("load");

        return await this.checkMethod(retry - 1);
    }
}

    async HandleRequestFromMail() {
    await this.recentMail.waitFor({ state: "visible", timeout: 50000 });
    await this.recentMail.click();
     const [newTab]= await Promise.all([
        this.page.context().waitForEvent("page"),   // waits for new page
        this.iframe.click()    
                             // your actual click
    ]);

    console.log("New tab opened!");
  //await this.newTab.pause();
   // await this.newTab.waitForLoadState("load");
    console.log("New tab loaded successfully!");
       this.newTab = newTab;
       
    // return newTab1;
}


    async HandleContinueButton() {
        console.log("new TAB --- >"+this.newTab);
   await this.newTab.waitForLoadState("networkidle", { timeout: 50000 });
        //await this.page.waitForEvent('domcontentloaded');
        await expect(this.newTab.locator("//span[contains(text(),'Continue')]/parent::button")).toBeEnabled();
      await this.newTab.waitForTimeout(10000);
        await this.newTab.locator("//span[contains(text(),'Continue')]/parent::button").click();
    }
    async HandleFinishButton() {
        await this.newTab.locator("//span[text()='Finish']/parent::button").waitFor({ state: "visible", timeout: 50000 });
        await this.newTab.locator("//span[text()='Finish']/parent::button").click();
    }
    async handleSubmitAnywayButton() {
        await this.newTab.locator("//button[normalize-space()='No, Submit Anyway']").waitFor({ state: "visible", timeout: 50000 });
        await this.newTab.locator("//button[normalize-space()='No, Submit Anyway']").click();
    }
    async VerifytheMessage(){
        //  await expect.soft(this.overLayLoader).toBeVisible();
         await this.overLayLoader.waitFor({ state: "visible", timeout: 50000 });
        await expect.soft(this.overLayLoader).toBeHidden();
        await expect(this.validateSuccessMsg).toContainText("Kim Test Form has been successfully sent.");
    }
    async VerifyTheMessageAFterSubmit(){
          await this.newTab.locator("//h4[@data-test='successMessage']").waitFor({ state: "visible", timeout: 50000 });
        await expect(this.newTab.locator("//h4[@data-test='successMessage']")).toContainText("We have successfully recorded your entries.")
        
    }
    async validatePrescriberEmailIsThereNot(){
        try {
            await expect.soft(this.previousPrecriberEmail).toBeVisible();
        } catch (err) {
            console.log("Email is not present")
        }
        finally {
            console.log(" we adding the mail")
            await this.previousPrecriberEmailClose.waitFor({ state: "visible", timeout: 50000 });
            await this.previousPrecriberEmailClose.click();
            // await this.PrecriberEmail.waitFor({ state: "visible", timeout: 50000 });\
            await expect.soft(this.PrecriberEmail).toBeEnabled();
            await this.PrecriberEmail.fill(process.env.MAILINATORMAIL);
            await this.page.keyboard.press("Enter");
        }
    }

    async HandleAccessCode(){
         await this.authorizationAccessCode.waitFor({ state: "visible", timeout: 50000 });
         await this.authorizationAccessCode.click();
         await expect.soft(this.authorizationAccessCodeInput).toBeEnabled();
         await this.authorizationAccessCodeInput.fill(process.env.ACCESSCODE);
    }

    async HandleAccessCodeAuthorizationPage(){
         await expect.soft(this.newTab.locator("//input[@id='AccessCode']")).toBeEnabled();
         await this.newTab.locator("//input[@id='AccessCode']").fill(process.env.ACCESSCODE);
    }
     async HandleContinueButttonInAuthorizationPage(){
       await expect.soft(this.newTab.locator("//button[contains(text(),'Continue')]")).toBeEnabled();
        await this.newTab.locator("//button[contains(text(),'Continue')]").click();
    
     }


    



















}
export default formInstance;