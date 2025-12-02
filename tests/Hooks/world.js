// tests/Hooks/world.js
import { setWorldConstructor, World, setDefaultTimeout } from '@cucumber/cucumber';

setDefaultTimeout(60 * 1000);

export class CustomWorld extends World {
  constructor(options) {
    super(options);

    // We only store Playwright objects because steps need them
    this.browser = null;
    this.context = null;
    this.page = null;
  }
}

setWorldConstructor(CustomWorld);