import { type ChildProcess, spawn } from "child_process";
import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";

const PORT = 3456;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:${PORT}`;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function isServerRunning(url: string): Promise<boolean> {
  try {
    const res = await fetch(`${url}/api/og-routes`);
    return res.ok || res.status < 500;
  } catch (e) {
    return false;
  }
}

async function getRoutes(): Promise<string[]> {
  const url = `${BASE_URL}/api/og-routes`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const text = await response.text();
      console.error(
        `Fetch failed: ${response.status} ${response.statusText}`,
        text
      );
      throw new Error(
        `Failed to fetch routes: ${response.status} ${response.statusText}`
      );
    }
    return response.json();
  } catch (e) {
    console.error(`Error fetching routes from ${url}:`, e);
    // Fallback if API fails
    return ["/"];
  }
}

async function startServer(): Promise<ChildProcess> {
  console.log(
    `Starting local production server for OG generation on port ${PORT}...`
  );
  const server = spawn("bun", ["start", "--", "-p", String(PORT)], {
    stdio: "inherit",
    shell: true,
    env: {
      ...process.env,
      NODE_ENV: "production",
      PORT: String(PORT),
      OG_BUILD_INCLUDE_UNPUBLISHED: "true",
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
    console.warn(
      "Existing server may not include unpublished posts unless OG_BUILD_INCLUDE_UNPUBLISHED=true is set."
    );
  } else {
    serverProcess = await startServer();
  }

  try {
    // 1. Gather paths from API endpoint (requires Next.js server context for unstable_cache)
    console.log("Fetching routes...");
    const routes = await getRoutes();
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
      const fileName =
        route === "/" ? "index" : route.replace(/^\//, "").replace(/\//g, "-");

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
