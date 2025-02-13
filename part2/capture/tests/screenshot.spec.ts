import { test } from "@playwright/test";

test("screenshot", async ({ page }) => {
    await page.goto("/");
    for (let i = 1; i <= 3; i++) {
        // capture
        await page.screenshot({ path: `quilt-${i}.png` });

        // redraw (by sending space)
        await page.keyboard.type(" ");
        await page.waitForTimeout(250);
    }
});
