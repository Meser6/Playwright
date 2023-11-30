import { defineConfig, devices } from "@playwright/test";
require("dotenv").config();

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 2,

  reporter: "html",
  use: {
    baseURL: "https://demo-bank.vercel.app",
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "login",
      testMatch: "auth.setup.ts",
    },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "./.auth/auth.session.json",
      },
      dependencies: ["login"],
    },
  ],
});
