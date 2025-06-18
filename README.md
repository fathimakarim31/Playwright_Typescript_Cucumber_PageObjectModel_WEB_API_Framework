# Playwright-Cucumber-TypeScript Automation Framework

## 📌 Overview

This is a **sample test automation framework** built using **[Playwright](https://playwright.dev/)** and **[Cucumber](https://cucumber.io/)** with **TypeScript**.

- **Playwright** is a powerful framework for web testing and automation. It supports Chromium, Firefox, and WebKit browsers with a single API and is designed for cross-browser automation that is evergreen, reliable, and fast.
- **Cucumber** enables Behavior Driven Development (BDD). Tests are written in plain language (Gherkin) so that everyone in the team—technical or non-technical—can read and understand them, improving collaboration and trust.

This framework demonstrates:
- **Web Automation tests** on (https://bookcart.azurewebsites.net/)
- **API tests** using:
  - REST Library Information System API

---

## ✨ Features

✅ BDD support with plain English scenarios (Gherkin)  
✅ Built-in support for **Web** and **API (REST)** automation  
✅ Cross-browser execution: Chromium, Firefox, WebKit, and Edge  
✅ Parallel scenario execution (default: 2 scenarios)  
✅ Flaky test retries until success or max attempts  
✅ Rerun for failed scenarios  
✅ Easily skip scenarios with `@ignore` tag  
✅ Dry run to detect undefined or ambiguous steps  
✅ Utilities for file downloads, PDF reading, etc.  
✅ Generates **Cucumber HTML** and **HTML Reports** (with screenshots & videos for failed tests)  
✅ Execution logs saved to a log file  
✅ Configuration via `.env` file and runtime environment variables  
✅ Easy CI/CD integration (e.g., Jenkins)

---

## 🌐 Supported Browsers

- ✅ **Chrome** (default)
- ✅ **Firefox**
- ✅ **WebKit** (Safari engine)

---

## 🚀 Getting Started

### 1️⃣ Installation

**Prerequisite:** Node.js **v14+**

Clone or download this repository:
```bash
git clone <repository-url>
cd <project-directory>
```

Install dependencies:
```bash
npm ci
```

---

### 2️⃣ Test Structure

- **Feature files:**  
  Located under the `features/` folder. Written in Gherkin syntax.
- **Step definitions:**  
  Located under the `steps/` folder. They map Gherkin steps to code actions.
- **Page objects (for UI tests):**  
  Located under the `pages/` folder.

---

### 3️⃣ Execution

| Command | Description |
|---------|--------------|
| `npm run test` | Run all scenarios |
| `npm run test:tags @sanity` | Run scenarios tagged with `@sanity` |
| `npm run test:tags "@calculator or @author"` | Run scenarios with multiple tags |
| `npm run test:tags "@rest and @author"` | Run scenarios matching multiple tags |
| `npm run dry:test` | Dry run to identify undefined/ambiguous steps |
| `npm run failed:test` | Rerun failed scenarios |
| `set BROWSER=firefox` | Change browser at runtime (Windows) |
| `npm run report` | Generate HTML and Cucumber reports |

---

### 4️⃣ Reports & Logs

- **Cucumber HTML Report:**  
  `test-results/reports/cucumber.html`
- **HTML Report:**  
  `test-results/reports/html/index.html`
- **Execution Log:**  
  `test-results/logs/execution.log`

---

## 📂 Configuration

All environment configurations are managed via the `.env` file. You can override them at runtime using environment variables:

Example:
```bash
set BROWSER=firefox
```

---

## ⚙️ CI/CD Integration

This framework is designed for easy integration with CI/CD tools like **Jenkins**, **GitHub Actions**, **GitLab CI**, etc.

---

## 📑 License

This project is open for demo and educational purposes. Use and adapt freely!

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📞 Support

For any issues or questions, feel free to raise an issue in this repository.
>>>>>>> 4093c5a (Initial commit on 18th June)
