import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { exec } from "child_process";
import path from "path";

const app = new Hono();

app.post("/webhook", async (c) => {
    try {
        const dir = path.resolve(__dirname, ".");

        // Execute git pull
        exec("git pull origin main", { cwd: dir }, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return c.json({ resp: "error running git pull" }, 500);
            }
            console.log(`git pull stdout: ${stdout}`);
            console.error(`git pull stderr: ${stderr}`);
        });
        return c.json({ resp: "ok" }, 200);
    } catch (error) {
        console.error("Error in webhook handler:", error);
        return c.json({ resp: "error" }, 500);
    }
});

const port = 3000;
console.log(`Puller is running on port ${port}`);
serve({ fetch: app.fetch, port });
