import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    testDir: "./tests",
    fullyParallel: true,
    forbidOnly: false,
    retries: 0,
    workers: undefined,
    reporter: "html",
    use: {
        baseURL: "http://localhost:8010/",
        trace: "on-first-retry",
    },
    projects: [
        {
            name: "firefox",
            use: {
                ...devices["Desktop Firefox"],
                headless: true,
                viewport: { width: 1600, height: 900 },
            },
        },
    ],
    webServer: {
        command: "npm run start",
        url: "http://localhost:8010/",
        reuseExistingServer: true,
    },
});
