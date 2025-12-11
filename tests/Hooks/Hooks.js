// tests/Hooks/Hooks.js
import { After, AfterAll, Before, BeforeAll, Status } from '@cucumber/cucumber';
import { chromium, firefox, webkit } from 'playwright';
import dotenv from 'dotenv';

dotenv.config();

let browser;

// ----------------- BeforeAll -----------------
BeforeAll(async function () {
  const browserType = process.env.BROWSER || 'chromium';
  const launchOptions = {
    headless: process.env.HEADLESS === 'true',
    args: ['--start-maximized'],
  };

  switch (browserType) {
    case 'firefox':
      browser = await firefox.launch(launchOptions);
      break;
    case 'webkit':
      browser = await webkit.launch(launchOptions);
      break;
    default:
      browser = await chromium.launch(launchOptions);
      break;
  }
  console.log(`Browser launched: ${browserType}`);
});

// ----------------- Before Each Scenario -----------------
Before(async function ({ pickle }) {
  // 1. Assign browser to World
  this.browser = browser;

  // 2. Determine Storage State from tags + world parameters
  const tags = pickle.tags.map(tag => tag.name);
  let storageStatePath;

  // Ensure 'this.parameters' exists before accessing it to avoid crashes
//   if (tags.includes('@loggedIn') && this.parameters) {
//     storageStatePath = this.parameters.storageState; 
//   }


storageStatePath = this.parameters.storageState; 


  // 3. Define Context Options
  const contextOptions = {
    storageState: storageStatePath,
    viewport: null,
    acceptDownloads: true,
    recordVideo: process.env.RECORD_VIDEO === 'true' ? { dir: 'reports/videos/' } : undefined,
  };

  // 4. Create Context & Page
  this.context = await browser.newContext(contextOptions);
  
  // Start Tracing (Recommended for debugging)
  await this.context.tracing.start({ screenshots: true, snapshots: true });

  this.page = await this.context.newPage();
});

// ----------------- After Each Scenario -----------------
After(async function ({ result, pickle }) {
  if (result?.status === Status.FAILED) {
    const safeName = pickle.name.replace(/[^a-zA-Z0-9]/g, '_');

    if (this.page) {
      const screenshot = await this.page.screenshot({
        path: `reports/screenshots/${safeName}.png`,
        fullPage: true,
      });
      
      if (this.attach) {
        this.attach(screenshot, 'image/png');
      }
    }

    // Save Trace on failure
    if (this.context) {
      const tracePath = `reports/traces/${safeName}-trace.zip`;
      await this.context.tracing.stop({ path: tracePath });
      console.log(`Trace saved to: ${tracePath}`);
    } 
  } else {
    // Stop tracing without saving if passed
    if (this.context) {
      await this.context.tracing.stop();
    }
  }

  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
});

// ----------------- AfterAll -----------------
AfterAll(async function () {
  if (browser) {
    await browser.close();
    console.log('Browser closed');
  }
});