import { defineConfig } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  retries: 1,
  expect: {
    timeout: 60000,
  },
  outputDir: 'test-artifacts',
  reporter: [
    ['list'],
    ['html', { outputFolder: 'html-report', open: 'never' }],
  ],
  use: {
    baseURL: 'https://pethouse.ua',
    headless: true,
    screenshot: 'only-on-failure',
    trace: 'on',
    video: 'on',
    viewport: { width: 1280, height: 800 },
  },
  projects: [
    {
      name: 'SafariLocal',
      use: {
        browserName: 'webkit',
        headless: false,
      },
    },
    {
      name: 'ChromeLocal',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        headless: false,
      },
    },
  ],
});