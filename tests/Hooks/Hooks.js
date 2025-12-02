// tests/Hooks/hooks.js
import { After, AfterAll, Before, BeforeAll, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { chromium, firefox, webkit } from 'playwright';
import dotenv from 'dotenv';

dotenv.config();
setDefaultTimeout(60 * 1000);

let browser;

// ----------------- BeforeAll -----------------
BeforeAll(async function () {
  const launcher =
    process.env.BROWSER === 'firefox'
      ? firefox
      : process.env.BROWSER === 'webkit'
      ? webkit
      : chromium;

  browser = await launcher.launch({
    headless: process.env.HEADLESS === 'true',
    args: ['--start-maximized'],
  });
});

// ----------------- Before Each Scenario -----------------
Before(async function ({ pickle }) {
  const tags = pickle.tags.map(tag => tag.name);

  let storageState;
  if (tags.includes('@loggedIn')) storageState = 'auth.json';

  this.context = await browser.newContext({
    storageState,
    viewport: null,
    acceptDownloads: true,
  });

  this.page = await this.context.newPage();
});

After(async function ({ pickle, result }) {
  console.log(`Scenario "${pickle.name}" finished with status: ${result?.status}`);

  if (result?.status === Status.FAILED && this.page) {
    try {
      const safeName = pickle.name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '');
      const screenshot = await this.page.screenshot({
        path: `reports/screenshots/${safeName}.png`,
        fullPage: true,
      });

      if (this.attach) this.attach(screenshot, 'image/png');
    } catch (err) {
      console.error('Failed to take screenshot:', err);
    }
  }

  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
});

// ----------------- AfterAll -----------------
AfterAll(async function () {
  if (browser) await browser.close();
});
