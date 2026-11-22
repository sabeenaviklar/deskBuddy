# Contributing to Desk Buddy 📚

Thank you for your interest in contributing to **Desk Buddy**! We welcome and appreciate contributions of all kinds—from reporting bugs and improving documentation to submitting feature requests and writing code.

This guide provides everything you need to know to get started with contributing to Desk Buddy smoothly and effectively.

---

## Table of Contents

- [About Desk Buddy](#about-desk-buddy)
- [Code of Conduct & Community Values](#code-of-conduct--community-values)
- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Installation and Running Instructions](#installation-and-running-instructions)
- [Available Scripts](#available-scripts)
- [Repository Structure](#repository-structure)
- [Finding or Reporting Bugs](#finding-or-reporting-bugs)
- [Suggesting Features](#suggesting-features)
- [Git Branching and Commit Guidelines](#git-branching-and-commit-guidelines)
- [Pull Request Submission Process](#pull-request-submission-process)
- [Code Formatting & Coding Standards](#code-formatting--coding-standards)
- [Communication & Coordination with Maintainers](#communication--coordination-with-maintainers)

---

## About Desk Buddy

**Desk Buddy** is a student productivity dashboard built with **React.js**. It helps students organize and streamline their academic life through:

- 📊 **Course Tracking**: Visualize academic progress with interactive progress cards.
- ⏱️ **Study Time Tracker**: Integrated timer for focused study sessions.
- ⚡ **Harry Potter–Themed To-Do Board**: Manage and prioritize daily study tasks.
- 📅 **Study Schedule**: Timetable planner with custom slots, subject tags, and day views.
- 📅 **Leave Tracker**: Track absences with calendar views and chart visualizations.
- 🔐 **Authentication**: Functional mock sign up and login system.
- 💾 **Persistent Storage**: Client-side persistence using the browser's `localStorage` API.
- 🌓 **Theme Support**: Persistent Dark and Light mode toggle.

---

## Code of Conduct & Community Values

We strive to maintain an open, inclusive, and welcoming environment for everyone:
- Treat all contributors and maintainers with respect, empathy, and kindness.
- Be constructive and open when giving or receiving feedback.
- Help beginners—many contributors are working on their first open-source project.

---

## Prerequisites

Before setting up the project locally, ensure you have the following installed on your machine:

1. **Node.js**: Version 18.x or higher (LTS recommended).
   - Check version: `node -v`
2. **npm**: Version 9.x or higher (bundled with Node.js).
   - Check version: `npm -v`
3. **Git**: Installed and configured on your machine.
   - Check version: `git --version`
4. **Code Editor**: [Visual Studio Code](https://code.visualstudio.com/) (recommended) or your preferred editor.
5. **Modern Web Browser**: Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari.

---

## Local Development Setup

Follow these steps to set up the repository for development:

### 1. Fork the Repository
Visit the [sabeenaviklar/deskBuddy](https://github.com/sabeenaviklar/deskBuddy) repository on GitHub and click the **Fork** button in the upper right corner to create your own copy under your GitHub account.

### 2. Clone Your Fork
Clone your forked repository to your local machine:

```bash
git clone https://github.com/<your-username>/deskBuddy.git
cd deskBuddy
```

> **Note**: Replace `<your-username>` with your actual GitHub username.

### 3. Configure Remote Upstream
Keep your fork synced with the upstream repository by adding the original repository as an upstream remote:

```bash
git remote add upstream https://github.com/sabeenaviklar/deskBuddy.git
```

Verify your remotes:
```bash
git remote -v
```
You should see `origin` pointing to your fork and `upstream` pointing to `sabeenaviklar/deskBuddy`.

---

## Installation and Running Instructions

### 1. Install Dependencies
Install the required packages using `npm`:

```bash
npm install
```

### 2. Start the Local Development Server
Launch the React development server:

```bash
npm start
```

Once compiled, your browser should automatically open:
```text
http://localhost:3000
```
If it does not open automatically, open your browser and navigate to `http://localhost:3000`.

### 3. Verify Local Changes
The development server features hot-reloading. Any changes you make to files in `src/` will update automatically in the browser.

---

## Available Scripts

In the project root, you can run the following npm commands:

| Command | Description |
| :--- | :--- |
| `npm start` | Runs the app in development mode on `http://localhost:3000`. |
| `npm test` | Launches the interactive test runner (Jest / React Testing Library). |
| `npm test -- --watchAll=false` | Runs all existing tests once and exits (useful before submitting a PR). |
| `npm run build` | Builds the static assets for production in the `build/` directory. |

---

## Repository Structure

Familiarize yourself with the folder organization before writing code:

```text
deskBuddy/
├── public/                 # Static files served directly (index.html, manifest.json, icons)
├── src/
│   ├── assets/             # Screenshots, icons, and illustration images
│   ├── components/         # Modular, reusable UI components
│   │   ├── CourseCard.js
│   │   ├── CourseProgress.js
│   │   ├── ProgressCard.js
│   │   ├── Sidebar.js
│   │   ├── SubjectCard.js
│   │   ├── TaskCard.js
│   │   ├── TodoBoard.js
│   │   └── Topbar.js
│   ├── pages/              # Primary view components and layouts
│   │   ├── Auth.js
│   │   ├── Contact.js
│   │   ├── CourseProgress.js
│   │   ├── Dashboard.js
│   │   ├── Dashboard.test.js
│   │   ├── LeaveTracker.js
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   ├── StudySchedule.js
│   │   ├── StudySchedule.test.js
│   │   ├── TimeTracker.js
│   │   └── TodoBoard.js
│   ├── App.css             # Main application and layout stylesheets
│   ├── App.js              # Root component: manages auth state, dark/light theme
│   ├── App.test.js         # Basic root application tests
│   ├── index.css           # Global typography, color variables, and base CSS
│   ├── index.js            # React application entry point (React DOM root)
│   ├── reportWebVitals.js  # Performance metric reporting
│   └── setupTests.js       # Jest DOM testing setup
├── .gitignore              # Files and patterns ignored by Git
├── package.json            # Project dependencies, scripts, and ESLint config
├── package-lock.json       # Exact lockfile for dependencies
├── README.md               # Overview documentation
└── CONTRIBUTORS.md         # Contribution guidelines (this document)
```

---

## Finding or Reporting Bugs

If you find a bug:

1. **Check Existing Issues**: Search the [GitHub Issues](https://github.com/sabeenaviklar/deskBuddy/issues) page to verify whether the bug has already been reported.
2. **Open a New Issue**: If it has not been reported, click **New Issue** and include:
   - **Title**: A concise and descriptive summary of the problem.
   - **Description**: What went wrong and under what conditions.
   - **Steps to Reproduce**: Detailed numerical steps explaining how to trigger the bug.
   - **Expected Behavior**: What you expected to happen.
   - **Actual Behavior**: What actually happened (include screenshots or browser console errors if relevant).
   - **Environment**: Your operating system, browser name/version, and Node.js version.

---

## Suggesting Features

We welcome ideas that make Desk Buddy even more useful for students:

1. **Search Issues**: Check [open issues](https://github.com/sabeenaviklar/deskBuddy/issues) and discussions to see if your idea is already proposed.
2. **Submit a Feature Request**: Create an issue detailing:
   - The user problem or academic productivity need the feature solves.
   - A clear description of the proposed solution or UI/UX behavior.
   - Any wireframes, screenshots, or sample data structures.
3. **Wait for Discussion**: Please wait for feedback and approval from maintainers before opening a PR implementing large new features.

---

## Git Branching and Commit Guidelines

### 1. Synchronize Your Local Main Branch
Always ensure your local `main` branch is up-to-date with upstream before creating a new branch:

```bash
git checkout main
git fetch upstream
git merge upstream/main
```

### 2. Create a Topic Branch
Create a descriptive branch for your work:

```bash
# For a new feature:
git checkout -b feat/add-task-deadline

# For a bug fix:
git checkout -b fix/timer-reset-issue

# For documentation updates:
git checkout -b docs/add-contributors-guide
```

Branch naming conventions:
- `feat/<feature-name>` – New features
- `fix/<bug-name>` – Bug fixes
- `docs/<topic>` – Documentation updates
- `refactor/<scope>` – Code refactoring without changing functionality
- `issue-<number>` – Direct fix or implementation matching an issue number (e.g. `issue-33`)

### 3. Commit Message Guidelines
Write clear, meaningful, and concise commit messages. Follow the [Conventional Commits](https://www.conventionalcommits.org/) convention:

- `feat: add export schedule to PDF option`
- `fix: prevent duplicate tasks in TodoBoard`
- `docs: create CONTRIBUTORS.md guidelines`
- `refactor: extract timer utility into helper function`

**Tips**:
- Use imperative mood in the summary line ("add feature", not "added feature" or "adds feature").
- Keep the first line under 72 characters.
- Reference the issue number when appropriate (e.g., `fix: correct study timer display (#15)`).

---

## Pull Request Submission Process

Ready to submit your changes? Follow this checklist:

### Pre-PR Checklist
1. **Application Runs Cleanly**: Run `npm start` and verify there are no console errors or broken layouts.
2. **Tests Pass**: Run the test suite:
   ```bash
   npm test -- --watchAll=false
   ```
3. **Build Succeeds**: Ensure the project compiles cleanly without errors:
   ```bash
   npm run build
   ```
4. **Clean Commits**: Review your commit history (`git log`) and files changed (`git status`). Avoid committing `.DS_Store`, temporary files, or debugging statements (`console.log`).

### Submitting the PR
1. Push your branch to your forked repository:
   ```bash
   git push -u origin <your-branch-name>
   ```
2. Navigate to [sabeenaviklar/deskBuddy](https://github.com/sabeenaviklar/deskBuddy) on GitHub.
3. You will see a banner prompting you to **Compare & pull request**. Click it.
4. Fill in the Pull Request template / description:
   - **Title**: Clear summary prefixed with type (e.g., `docs: add CONTRIBUTORS.md documentation (#33)`).
   - **Issue Reference**: Link the issue being addressed using GitHub keywords (e.g., `Closes #33`, `Resolves #33`, or `Fixes #33`).
   - **Summary of Changes**: Bulleted list of what was changed and why.
   - **Screenshots / Recordings**: For any UI or styling changes, attach before/after screenshots.
   - **Testing Performed**: Detail the manual or automated tests you ran.
5. Submit the Pull Request against the `main` branch of `sabeenaviklar/deskBuddy`.

### Addressing Review Feedback
- Maintainers or peer contributors may request changes or provide suggestions.
- Make the requested adjustments on your local branch.
- Commit and push your changes:
  ```bash
  git add .
  git commit -m "fix: address PR review comments"
  git push origin <your-branch-name>
  ```
- The pull request will automatically update with your new commits.

---

## Code Formatting & Coding Standards

To keep the codebase maintainable, readable, and consistent, please follow these conventions:

### React & JavaScript
- **Functional Components**: Use functional components with React Hooks (`useState`, `useEffect`, etc.).
- **Component File Names**: Use PascalCase for React component files (e.g., `StudySchedule.js`, `TodoBoard.js`).
- **Variable & Function Names**: Use camelCase for variables, objects, and functions (e.g., `getCourseProgress`, `darkMode`).
- **Modularity**: Place reusable widgets in `src/components/` and full page layouts in `src/pages/`.
- **Linting**: Follow the standard ESLint rules configured via `react-scripts` (`react-app`). Run `npm start` or `npm run build` to view any lint warnings.
- **Data Persistence**: Use `localStorage` consistently, parsing with `JSON.parse()` and serializing with `JSON.stringify()`. Always provide fallback default values when reading stored data.
- **Automated Tests**: When adding a new view or complex logic, write corresponding tests in a `.test.js` file using `@testing-library/react`.

### CSS & Styling
- **Custom CSS Variables**: Respect existing design tokens and variables defined in `src/index.css` and `src/App.css`.
- **Dark Mode Support**: Ensure any new UI components support both light and dark themes using the global `.dark` class.
- **Responsiveness**: Verify that new UI elements display cleanly on both mobile/tablet screens and desktop resolutions.

---

## Communication & Coordination with Maintainers

- **Project Maintainer**: Sabeena ([@sabeenaviklar](https://github.com/sabeenaviklar))
- **Issue Assignment**: Before working on any issue, **comment on the issue** asking to be assigned. This prevents duplicate efforts and ensures coordination with maintainers.
- **Discussions**: Use GitHub Issues for project discussions, clarifying requirements, and getting maintainer feedback before implementing large architecture changes.
- **Patience & Respect**: Maintainers review pull requests in their free time. Please allow a reasonable amount of time for reviews and feedback.

---

Thank you for contributing to Desk Buddy and helping make student life more productive! Happy coding! 🚀
