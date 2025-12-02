// tests/Hooks/Hooks.js
import { After, AfterAll, Before, BeforeAll, Status } from '@cucumber/cucumber';
import { chromium, firefox, webkit } from 'playwright';
import dotenv from 'dotenv';

dotenv.config();

let browser;

// ----------------- BeforeAll -----------------
// Launches the browser once before all tests
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
  // 1. Assign browser to World so it's accessible in steps (optional but recommended)
  this.browser = browser;

  // 2. Define Context Options
  const contextOptions = {
    viewport: null,
    acceptDownloads: true,
    recordVideo: process.env.RECORD_VIDEO === 'true' ? { dir: 'reports/videos/' } : undefined,
  };

//   // 3. Handle Storage State (Login session)
//   if (pickle.tags.some(tag => tag.name === '@loggedIn')) {
//     contextOptions.storageState = 'auth.json';
//   }

  // 4. Create Context & Page
  this.context = await browser.newContext(contextOptions);
  
  // Start Tracing (Recommended for debugging)
  await this.context.tracing.start({ screenshots: true, snapshots: true });

  this.page = await this.context.newPage();
});

// ----------------- After Each Scenario -----------------
After(async function ({ result, pickle }) {
  // 1. Screenshot on Failure
  // We use 'result' and 'pickle' here directly without storing them in 'this'
  if (result?.status === Status.FAILED) {
    const safeName = pickle.name.replace(/[^a-zA-Z0-9]/g, '_');

    if (this.page) {
      const screenshot = await this.page.screenshot({
        path: `reports/screenshots/${safeName}.png`,
        fullPage: true,
      });
      // Attach screenshot to the report
      if (this.attach) {
        await this.attach(screenshot, 'image/png');
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

  // 2. Cleanup
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