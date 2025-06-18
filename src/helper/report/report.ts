import * as path from "path";
import * as fs from "fs-extra";
const report = require("multiple-cucumber-html-reporter");

// Read duration JSON
const metaPath = path.join(
  __dirname,
  "../../test-execution-details/execution-meta.json"
);
let executionDuration = "N/A";
let BrowserVersion = "";
let BrowserName = "";
let BrowserIconName = "";
let TestCycle = "";
let ReleaseVersion = "";

if (fs.existsSync(metaPath)) {
  const meta = fs.readJsonSync(metaPath);
  const minutes = Math.floor(meta.durationInSeconds / 60);
  const seconds = Math.floor(meta.durationInSeconds % 60);
  executionDuration = `${minutes}m ${seconds}s`;
  BrowserVersion = meta.version;
  BrowserName = meta.browserName;
  TestCycle = meta.testCycle;
  ReleaseVersion = meta.releaseVersion;

  if (BrowserName == "webkit") {
    BrowserIconName = "safari";
  } else {
    BrowserIconName = meta.browserName;
  }
}

const localTime = new Date().toLocaleTimeString();

report.generate({
  jsonDir: "test-results",
  reportPath: "test-results/reports/",
  reportName: "Playwright Automation Report",
  pageTitle: "Library information system",
  displayDuration: false,
  metadata: {
    browser: {
      name: BrowserIconName,
      version: BrowserVersion,
    },
    device: "Fathima - PC",
    platform: {
      name: "Windows",
      version: "11",
    },
  },
  customData: {
    title: "Test Info",
    data: [
      { label: "Project", value: "Library information system" },
      { label: "Release", value: ReleaseVersion },
      { label: "Cycle", value: TestCycle },
      { label: "Last Run", value: localTime },
      { label: "Duration", value: executionDuration },
      { label: "Bwowser Name", value: BrowserName },
    ],
  },
});
