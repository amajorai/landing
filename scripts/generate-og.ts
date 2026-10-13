import { type ChildProcess, spawn } from "child_process";
import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import { ogFileName } from "@/lib/og-path";

const PORT = 3459;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:${PORT}`;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function isServerRunning(url: string): Promise<boolean> {
  try {
    const res = await fetch(url);
    return res.ok || res.status < 500;
  } catch (e) {
    return false;
  }
}

async function startServer(): Promise<ChildProcess> {
  console.log(
    `Starting local reproduction server for OG generation on port ${PORT}...`
  );
  const server = spawn("bun", ["start", "--", "-p", String(PORT)], {
    stdio: "inherit",
    shell: true,
    env: {
      ...process.env,
      NODE_ENV: "production",
      PORT: String(PORT),
    },
  });

  // Wait for server to be ready
  let attempts = 0;
  while (attempts < 60) {
    if (await isServerRunning(BASE_URL)) {
      console.log("Server is ready!");
      return server;
    }
    await wait(1000);
    attempts++;
  }

  throw new Error("Server failed to start in time.");
}

async function main() {
  console.log("Starting OG generation...");

  let serverProcess: ChildProcess | null = null;
  const isRunning = await isServerRunning(BASE_URL);

  if (isRunning) {
    console.log("Using existing server instance.");
  } else {
    serverProcess = await startServer();
  }

  try {
    // 1. Gather paths
    console.log("Fetching routes...");
    // Content lives in Fumadocs collections that only load inside Next, so
    // ask the running server for the route list.
    const routesRes = await fetch(`${BASE_URL}/api/og-routes`);
    if (!routesRes.ok)
      throw new Error(`Failed to fetch routes: ${routesRes.status}`);
    const routes = (await routesRes.json()) as string[];

    console.log(`Found ${routes.length} routes to screenshot.`);

    // 2. Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630 });

    const ogDir = path.join(process.cwd(), "public", "og");
    if (!fs.existsSync(ogDir)) {
      fs.mkdirSync(ogDir, { recursive: true });
    }

    const skipExisting =
      process.argv.includes("--skip-existing") ||
      process.argv.includes("--skip");
    if (skipExisting) console.log("Skipping routes with existing OG images.");

    // 3. Screenshot
    for (const route of routes) {
      const url = `${BASE_URL}${route}`;
      // Clean filename: remove leading slash, replace others with dash
      const fileName = ogFileName(route); // e.g. "projects/foo" -> "projects-foo"

      const filePath = path.join(ogDir, `${fileName}.png`);

      if (skipExisting && fs.existsSync(filePath)) {
        console.log(`Skipping ${route} (already exists)`);
        continue;
      }

      console.log(`Screenshotting ${route} -> ${fileName}.png`);
      let success = false;
      for (const waitUntil of ["networkidle2", "domcontentloaded"] as const) {
        try {
          await page.goto(url, { waitUntil, timeout: 60_000 });
          await page.screenshot({ path: filePath });
          success = true;
          break;
        } catch (e) {
          if (waitUntil === "domcontentloaded") {
            console.error(`Failed to screenshot ${route}:`, e);
          } else {
            console.warn(`Retrying ${route} with looser wait strategy...`);
          }
        }
      }
    }

    await browser.close();
    console.log("OG generation complete.");
  } catch (error) {
    console.error("Error generating OG images:", error);
    process.exit(1);
  } finally {
    if (serverProcess) {
      console.log("Stopping local server...");
      serverProcess.kill();
      // Force exit if needed
      process.exit(0);
    }
  }
}

main();
