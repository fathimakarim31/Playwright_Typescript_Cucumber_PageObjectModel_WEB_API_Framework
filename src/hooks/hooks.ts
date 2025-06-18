import { BeforeAll, AfterAll, Before, After, Status } from "@cucumber/cucumber";
import { Browser, BrowserContext } from "@playwright/test";
import { fixture } from "./pageFixture";
import { invokeBrowser } from "../helper/browsers/browserManager";
import { getEnv } from "../helper/env/env";
import { createLogger } from "winston";
import { options } from "../helper/util/logger";
// const fs = require("fs-extra");
import Log from "../helper/logger/Log";
import * as fs from "fs-extra";
import UIActions from "../helper/playwright/actions/UIActions";
import RESTRequest from "../helper/playwright/API/RESTRequest";
import * as path from "path";

let browser: Browser;
let context: BrowserContext;
const now = new Date();
let startTime: number;

BeforeAll(async function () {
  startTime = Date.now();
  getEnv();
  browser = await invokeBrowser();
  Log.info(`BROWSER NAME ============= ${process.env.BROWSER}`);
});
// It will trigger for not auth scenarios
Before({ tags: "not @auth" }, async function ({ pickle }) {
  const scenarioName = pickle.name + pickle.id;
  this.context = await browser.newContext({
    recordVideo: {
      dir: "test-results/videos",
    },
  });
  await this.context.tracing.start({
    name: scenarioName,
    title: pickle.name,
    sources: true,
    screenshots: true,
    snapshots: true,
  });
  this.page = await this.context?.newPage();
  fixture.page = this.page;
  fixture.logger = createLogger(options(scenarioName));

  // this.context = await browser.newContext({
  //   viewport: null,
  //   ignoreHTTPSErrors: true,
  //   acceptDownloads: true,
  //   recordVideo:
  //     process.env.RECORD_VIDEO === "true"
  //       ? { dir: "./test-results/videos" }
  //       : undefined,
  // });
  // this.page = await this.context?.newPage();
  this.web = new UIActions(this.page);
  this.rest = new RESTRequest(this.page);
});

// It will trigger for auth scenarios
Before({ tags: "@auth" }, async function ({ pickle }) {
  const scenarioName = pickle.name + pickle.id;
  context = await browser.newContext({
    storageState: getStorageState(pickle.name),
    recordVideo: {
      dir: "test-results/videos",
    },
  });
  await context.tracing.start({
    name: scenarioName,
    title: pickle.name,
    sources: true,
    screenshots: true,
    snapshots: true,
  });
  const page = await context.newPage();
  fixture.page = page;
  fixture.logger = createLogger(options(scenarioName));
});

After(async function ({ pickle, result }) {
  let videoPath: string;
  let img: Buffer;
  const path = `./test-results/trace/${pickle.id}.zip`;
  if (result?.status == Status.PASSED) {
    img = await fixture.page.screenshot({
      path: `./test-results/screenshots/${pickle.name}.png`,
      type: "png",
    });
    videoPath = await fixture.page.video().path();
  }
  await this.context.tracing.stop({ path: path });
  await fixture.page.close();
  await this.context.close();
  if (result?.status == Status.PASSED) {
    await this.attach(img, "image/png");
    await this.attach(fs.readFileSync(videoPath), "video/webm");
    const traceFileLink = `<a href="https://trace.playwright.dev/">Open ${path}</a>`;
    await this.attach(`Trace file: ${traceFileLink}`, "text/html");
  }
});

AfterAll(async function () {
  await browser.close();
  const endTime = Date.now();
  const duration = (endTime - startTime) / 1000;
  const version = browser.version();
  const browserName = process.env.BROWSER;
  const testCycle = process.env.TEST_CYCLE;
  const releaseVersion = process.env.RELEASE_VERSION;

  // Save duration to a temp JSON file
  const resultPath = path.join(
    __dirname,
    "..",
    "test-execution-details",
    "execution-meta.json"
  );
  fs.ensureFileSync(resultPath);
  fs.writeJsonSync(resultPath, {
    startTime,
    endTime,
    durationInSeconds: duration,
    version,
    browserName,
    testCycle,
    releaseVersion,
  });
});

function getStorageState(user: string):
  | string
  | {
      cookies: {
        name: string;
        value: string;
        domain: string;
        path: string;
        expires: number;
        httpOnly: boolean;
        secure: boolean;
        sameSite: "Strict" | "Lax" | "None";
      }[];
      origins: {
        origin: string;
        localStorage: { name: string; value: string }[];
      }[];
    } {
  if (user.endsWith("admin")) return "src/helper/auth/admin.json";
  else if (user.endsWith("lead")) return "src/helper/auth/lead.json";
}
