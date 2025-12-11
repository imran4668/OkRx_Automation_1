import { expect } from "@playwright/test";
import { executionAsyncId } from "async_hooks";
import  dotenv  from "dotenv";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const testdata = require("../TestData/appCreds.json");
const validation = require("../TestData/Validation.json");

dotenv.config();
/**
 *  * @typedef {import('@playwright/test').Page} Page 
 */


class signin{
    /**
     * @param {Page} page 
     */
    constructor(page)
    {
        this.page=page;
        this.email_textField=page.getByPlaceholder("Email Address");
        this.continueButton=page.getByLabel("Continue");
        this.siginLoader=page.locator("//div[@id='simplemodal-data']");
        this.alreadySigninContext=page.locator("//form[@id='localAccountForm']/div").first();
        this.password_textFiled=page.locator('//input[@id="password"]')
        this.siginButton=page.locator("//button[text()='Sign in']");
        this.errorMessageForInvalidEmailFormate=page.locator("//div[@class='error itemLevel show']");
        this.errorMessageForInvalidEmailId=page.locator("//div[@class='error pageLevel']");
        this.userWelcomeText=page.locator("//div[@class='content']//nav//li[2]/div");
    }
    async navigateToSignInPage(){
        await this.page.goto(process.env.BASE_URL);
    }
    async enterEmailId()
    {
        await expect.soft(this.email_textField).toBeEnabled();
        await this.email_textField.fill(testdata.username);
    }
    async clickContinueButton()
    {
        await expect.soft(this.continueButton).toBeEnabled();
        await this.continueButton.click();
    }
    async waitUntilSimpleModalDataLoaderToBeHidden()
    {
        await expect.soft(this.siginLoader).toBeHidden();
    }
    async validateTheAlreadySigninContext()
    
    {
      await expect.soft(this.alreadySigninContext).toHaveText(process.env.SIHNIINALREADYCONTEXT);
    }
    async enterPassword()
    {
        await expect.soft(this.password_textFiled).toBeEnabled();
        await this.password_textFiled.fill(testdata.password);
    }
    async clickSignInButton()
    {
        await expect.soft(this.siginButton).toBeEnabled();
        await this.siginButton.click();
        await expect.soft(this.page.locator("//div[@class='working']")).toBeVisible();
    }
    async enterEmailIdInvalidFormate()
    {
         await expect.soft(this.email_textField).toBeEnabled();
        await this.email_textField.fill(testdata.invalidEmailFormate);
    }
    async validateErrorMesageForInvalidEmailFormate()
    {
        await expect.soft(this.errorMessageForInvalidEmailFormate).toBeVisible();
      await expect.soft(this.errorMessageForInvalidEmailFormate).toHaveText(validation.errorMessageForInvalidEmailFormate);
    }
    async enterInvalidEmailId()
    {
        await expect.soft(this.email_textField).toBeEnabled();
        await this.email_textField.fill(testdata.invalidEmailId);
    }

     async validateErrorMesageForInvalidEmailId()
    {
        await expect.soft(this.errorMessageForInvalidEmailId).toBeVisible();
      await expect.soft(this.errorMessageForInvalidEmailId).toHaveText(validation.errorMessageForInvalidEmailId);
    }
    async validateTheUserWelcomeText()
    {
        await this.page.waitForLoadState('networkidle');
        await expect.soft(this.userWelcomeText).toContainText("Welcome");
    } 
}
export default signin;