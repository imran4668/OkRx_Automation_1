import { expect } from "@playwright/test";
import { executionAsyncId } from "async_hooks";
import  dotenv  from "dotenv";

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

    }
    async navigateToSignInPage(){
        await this.page.goto(process.env.BASE_URL);
    }
    async enterEmailId()
    {
        await expect.soft(this.email_textField).toBeEnabled();
        await this.email_textField.fill(process.env.USERNAME);
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
        await this.password_textFiled.fill(process.env.PASSWORD);
    }
    async clickSignInButton()
    {
        await expect.soft(this.siginButton).toBeEnabled();
        await this.siginButton.click();
        await expect.soft(this.page.locator("//div[@class='working']")).toBeVisible();
        // await this.page.pause();
        await expect.soft(this.page).toHaveTitle("OkRx Forms Portal");
        await this.page.waitForLoadState("networkidle");
        await this.page.waitForTimeout(5000)
        
    }

}
export default signin;