import { devices, defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 1000 * (process.env.CI ? 60 : 30),
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['./tests/custom-reporter.ts'], ['junit', { outputFile: 'report.xml' }], ['list']] : 'html',
  use: {
    actionTimeout: 0,
    baseURL: process.env.CI ? 'http://localhost:4173' : 'http://localhost:6006',
    trace: 'retain-on-failure',
    headless: process.env.CI ? true : false
  },
  webServer: {
    command: `npm run ${process.env.CI ? 'serve ./storybook-static' : 'dev'}`,
    url: process.env.CI ? 'http://localhost:4173' : 'http://localhost:6006',
    reuseExistingServer: !process.env.CI
  },
  testMatch: 'packages/*/src/**/*.spec.ts?(x)',
  projects: [{ name: 'chrome', use: { ...devices['Desktop Chrome'] }, testDir: '.' }]
});
