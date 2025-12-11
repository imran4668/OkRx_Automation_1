const { chromium } = require('playwright');
require('dotenv').config();
const fs = require('fs');

function isValidAuthFile(path) {
  if (!fs.existsSync(path)) return false;

  const stats = fs.statSync(path);
  if (stats.size < 10) return false; 

  try {
    const data = JSON.parse(fs.readFileSync(path, 'utf-8'));
    return data.cookies && data.cookies.length > 0;
  } catch {
    return false;
  }
}

async function saveStorageState() {
  console.log('Starting Authentication Script...');
 if (isValidAuthFile('auth.json')) {
    console.log("auth.json exists & is valid → reusing saved session, skipping login.");
    return;
  }
  // Launch browser (Headless: false so you can debug/see the process)
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // 1. Navigate to Base URL
    console.log(`🌐 Navigating to: ${process.env.BASE_URL_MICROSOFT}`);
    await page.goto(process.env.BASE_URL_MICROSOFT);

    // 2. Handle Initial Login Page (OkRx / B2C)
    // Based on your signinPage.js selectors
    console.log('Entering Email on Initial Page...');
    const emailInput = page.locator('//*[@id="i0116"]');


    await emailInput.fill(process.env.USERNAMEMICROSOFT);
    await page.locator('//input[@id="idSIButton9"]').click();



    console.log('Waiting for Microsoft Password field...');

    await page.waitForSelector('input[name="passwd"]', { timeout: 15000 });
    await page.fill('input[name="passwd"]', process.env.PASSWORDMICROSOFT);

    console.log('   Clicking Sign In...');
    // Microsoft "Sign in" button is usually an input with type="submit"
    await page.click('input[type="submit"]');

    // 4. Handle "Stay signed in?" Prompt
    try {
      console.log('Checking for "Stay signed in?" prompt...');
      // Short timeout because this screen might not appear
      await page.waitForSelector('text=Stay signed in?', { timeout: 5000 });
      await page.click('input[value="Yes"]'); // Click Yes to persist session longer
      console.log('   Selected "Yes" to stay signed in.');
    } catch (e) {
      console.log('   "Stay signed in?" prompt did not appear or was skipped.');
    }

    // 5. Wait for successful login (Navigation to Portal)
    console.log('Waiting for redirection to application...');

    // Wait for the title to contain "OkRx" or the URL to stop changing
    await page.waitForFunction(() => document.title.includes('OkRx'), null, { timeout: 20000 })
      .catch(() => console.log('   Warning: Title check timed out, but proceeding with state save...'));

    await page.waitForLoadState('networkidle');

    // 6. Save Storage State
    console.log('Saving storage state to auth.json...');
    await context.storageState({ path: 'auth.json' });
    console.log('SUCCESS: auth.json created successfully!');

  } catch (error) {
    console.error('ERROR: Authentication failed.');
    console.error(error);
    // Take a screenshot for debugging if it fails
    await page.screenshot({ path: 'auth-failure.png', fullPage: true });
    console.log('Saved screenshot to auth-failure.png');
  } finally {
    await browser.close();
  }
}

saveStorageState();