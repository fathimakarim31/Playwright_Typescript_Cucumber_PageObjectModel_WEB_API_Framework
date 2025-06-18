module.exports = {
  default: {
    tags: process.env.npm_config_TAGS || "",
    formatOptions: {
      snippetInterface: "async-await",
    },
    paths: ["src/test/api/features/", "src/test/web/features/"],
    publishQuiet: true,
    dryRun: false,
    require: [
      "src/test/api/steps/*.ts",
      "src/test/web/steps/*.ts",
      "src/hooks/hooks.ts",
      "src/helper/config/hooks.ts",
    ],
    requireModule: ["ts-node/register"],
    format: [
      "progress-bar",
      "html:test-results/cucumber-report.html",
      "json:test-results/cucumber-report.json",
      "rerun:@rerun.txt",
    ],
    parallel: 1,
  },
  rerun: {
    formatOptions: {
      snippetInterface: "async-await",
    },
    publishQuiet: true,
    dryRun: false,
    require: [
      "src/test/api/steps/*.ts",
      "src/test/web/steps/*.ts",
      "src/hooks/hooks.ts",
      "src/helper/config/hooks.ts",
    ],
    requireModule: ["ts-node/register"],
    format: [
      "progress-bar",
      "html:test-results/cucumber-report.html",
      "json:test-results/cucumber-report.json",
      "rerun:@rerun.txt",
    ],
    parallel: 2,
  },
};
