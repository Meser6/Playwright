import { defineConfig, devices } from "@playwright/test";
require("dotenv").config();

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "https://demo-bank.vercel.app",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "login",
      testMatch: "login.setup.ts",
    },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "./.auth/authSession.json",
      },
      dependencies: ["login"],
    },
  ],
});
