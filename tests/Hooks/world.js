// tests/Support/world.js
import { setWorldConstructor, World } from '@cucumber/cucumber';

export class CustomWorld extends World {
  constructor(options) {
    super(options);

    /** Playwright browser instance */
    this.browser = undefined;

    /** Playwright browser context */
    this.context = undefined;

    /** Playwright page */
    this.page = undefined;

    /** Store scenario result */
    this.result = undefined;

    /** Store scenario pickle */
    this.pickle = undefined;
  }
}

setWorldConstructor(CustomWorld);
