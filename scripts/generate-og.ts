import { type ChildProcess, spawn } from "child_process";
import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";

const PORT = 3000;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:${PORT}`;
const OG_DIR = path.join(process.cwd(), "public", "og");

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function isServerRunning(url: string): Promise<boolean> {
  try {
    const res = await fetch(`${url}/api/og-routes`);
    return res.ok;
  } catch {
    return false;
  }
}

async function buildProject() {
  console.log("Building project...");
  return new Promise<void>((resolve, reject) => {
    const build = spawn("bun", ["run", "build"], {
      stdio: "inherit",
      shell: true,
      env: { ...process.env, NODE_ENV: "production" },
    });

    build.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Build failed with code ${code}`));
      }
    });
  });
}

async function startServer(): Promise<ChildProcess> {
  console.log("Starting local production server...");
  const server = spawn("bun", ["start"], {
    stdio: "inherit",
    shell: true,
    env: { ...process.env, NODE_ENV: "production" },
  });

  // Wait for server to be ready
  let attempts = 0;
  while (attempts < 60) {
    if (await isServerRunning(BASE_URL)) {
      console.log("Server is running!");
      // Give it a little more time to stabilize
      await wait(3000);
      return server;
    }
    await wait(1000);
    attempts++;
  }

  throw new Error("Server failed to start within 60 seconds");
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

    // Fallback if API fails (e.g. strict cache issues), though API is preferred
    return ["/"];
  }
}

async function generateImages() {
  let serverProcess: ChildProcess | null = null;

  try {
    // Build the project first
    await buildProject();

    if (!fs.existsSync(OG_DIR)) {
      fs.mkdirSync(OG_DIR, { recursive: true });
    }

    if (await isServerRunning(BASE_URL)) {
      console.log("Using existing server instance.");
    } else {
      serverProcess = await startServer();
    }

    console.log("Fetching routes...");
    const routes = await getRoutes();
    console.log(`Found ${routes.length} routes to process.`);

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 630 });

    for (const route of routes) {
      const url = `${BASE_URL}${route}`;
      // Clean filename: remove leading slash, replace others with dash
      // e.g. "/" -> "index.png"
      // e.g. "/projects/foo" -> "projects-foo.png"
      const fileName =
        route === "/"
          ? "index.png"
          : `${route.replace(/^\//, "").replace(/\//g, "-")}.png`;

      const filePath = path.join(OG_DIR, fileName);

      console.log(`Generating: ${route} -> ${fileName}`);

      try {
        await page.goto(url, {
          waitUntil: "networkidle0",
          timeout: 60_000,
        });

        await page.screenshot({ path: filePath });
      } catch (error) {
        console.error(`Failed to generate OG for ${route}:`, error);
      }
    }

    await browser.close();
    console.log("OG generation complete.");
  } catch (error) {
    console.error("Error generating OG images:", error);
    process.exit(1);
  } finally {
    if (serverProcess) {
      console.log("Stopping server...");
      if (process.platform === "win32" && serverProcess.pid) {
        spawn("taskkill", ["/pid", serverProcess.pid.toString(), "/f", "/t"]);
      } else {
        serverProcess.kill();
      }
    }
  }
}

generateImages();
