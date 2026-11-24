# 📚 Desk Buddy
<h3 align="center">Your Personal Student Productivity Dashboard</h3>

<p align="center">
  Organize your academic life, manage study sessions, track progress, and stay productive — all from one place.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React.js-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React.js" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/LocalStorage-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white" alt="LocalStorage" />
</p>

---

## 📖 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Application Preview](#-application-preview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [How Data Is Stored](#-how-data-is-stored)
- [Troubleshooting](#-troubleshooting)
- [Authors](#-authors)

---

## 🌟 About the Project

**Desk Buddy** is a student-focused productivity dashboard built with React.js to make academic life easier to organize and manage.

Students often have to switch between different tools to manage their assignments, study schedules, academic progress, and daily tasks. Desk Buddy brings these essential activities together in one convenient workspace.

Whether you want to track your courses, manage a study session, organize your daily tasks, or monitor your leaves, Desk Buddy helps you keep everything organized.

### 🎯 Why Desk Buddy?

- **Stay Organized:** Keep your academic tasks and schedules in one place.
- **Track Progress:** Get a visual overview of your course progress.
- **Build Better Habits:** Monitor your study sessions and manage your time.
- **Simplify Planning:** Organize your daily routine without switching between multiple tools.

---

## ✨ Features

Desk Buddy comes with several tools designed to support your everyday academic workflow.

### 🔐 1. Authentication

- Functional Sign Up and Login system.
- Access the productivity dashboard through the authentication interface.

### 📊 2. Course Tracking

- Monitor your academic progress.
- Visualize course completion through dynamic progress bars.
- Keep track of your learning journey.

### ⏱️ 3. Study Time Tracker

- Start, stop, and reset your study timer.
- Monitor dedicated study sessions.
- Keep your study time organized.

### ⚡ 4. Harry Potter-Themed To-Do Board

- Manage daily tasks through a themed interface.
- Organize your pending and completed activities.
- Add a little magic to your productivity routine!

### 📅 5. Study Schedule

- Create your daily study timetable.
- Organize subjects using custom tags.
- Set personalized time slots.
- View your schedule day by day.
- Track schedule completion.

### 🗓️ 6. Leave Tracker

- Record and manage absences.
- View leave information through a calendar interface.
- Visualize leave statistics using donut charts.

### 💾 7. Persistent Data Storage

- Store application data using the browser's `localStorage` API.
- Retain saved information even after refreshing the page.
- No separate database setup is required for the described local storage functionality.

### 📱 8. Responsive Interface

- Clean and user-friendly interface.
- Designed to work across different screen sizes.

---

## 🖥️ Application Preview

Take a look at the different sections of Desk Buddy.

### 1. Dashboard

Your central workspace for getting an overview of your academic productivity.

<p align="center">
  <img src="./src/assets/homepage.png" alt="Desk Buddy Dashboard" width="90%" />
</p>

### 2. Study Time Tracker

Manage your study sessions using the integrated timer.

<p align="center">
  <img src="./src/assets/timetracker.png" alt="Study Time Tracker" width="90%" />
</p>

### 3. To-Do Board

Organize your everyday tasks with a Harry Potter-inspired theme.

<p align="center">
  <img src="./src/assets/todo.png" alt="Harry Potter Themed To-Do Board" width="90%" />
</p>

### 4. Leave Tracker

Keep track of your absences with a calendar view and visual statistics.

<p align="center">
  <img src="./src/assets/leavetracker.png" alt="Leave Tracker" width="90%" />
</p>

---

## 🧰 Tech Stack

The project uses the following technologies:

| Technology | Purpose |
|:---|:---|
| React.js | Building the user interface with reusable components |
| JavaScript | Application logic and interactivity |
| CSS3 | Styling and responsive layouts |
| localStorage API | Persisting data in the browser |
| FontAwesome / Lucide React | Icons (optional) |

---

## 📂 Project Structure

Understanding the folder structure will help beginners navigate the codebase.

```text
desk-buddy/
│
├── public/                  # Static files
│
├── src/
│   │
│   ├── assets/              # Images and project screenshots
│   │   ├── homepage.png
│   │   ├── leavetracker.png
│   │   ├── timetracker.png
│   │   └── todo.png
│   │
│   ├── components/          # Reusable React components
│   │
│   ├── pages/               # Main application pages
│   │
│   ├── App.js               # Main application component
│   ├── App.css              # Application-level styles
│   ├── App.test.js          # Testing file
│   ├── index.js             # Application entry point
│   └── index.css            # Global styles
│
├── .gitignore               # Files excluded from Git
├── package.json             # Dependencies and project scripts
└── README.md                # Project documentation
```

### 📌 Important Files

- **`App.js`** – Main React component that brings the application together.
- **`App.css`** – Contains application-level styling.
- **`index.js`** – Entry point of the React application.
- **`index.css`** – Contains global CSS styles.
- **`package.json`** – Defines project dependencies and available npm scripts.

---

## ⚙️ Getting Started

Want to run Desk Buddy on your own computer? Follow this beginner-friendly setup guide.

### 📋 Prerequisites

Before getting started, make sure you have installed:

| Requirement | Description | Download |
|:---|:---|:---|
| Node.js | JavaScript runtime required to run the project | [Download](https://nodejs.org/) |
| npm | Package manager used to install dependencies | Included with Node.js |
| Git | Version control tool used to clone the repository | [Download](https://git-scm.com/) |

**Not sure whether they are installed?**

Open your terminal or command prompt and run:

```bash
node -v
npm -v
git --version
```

If the commands return version numbers, you're ready to continue.

### Step 1: Clone the Repository

First, download the project to your computer using Git.

```bash
git clone https://github.com/sabeenaviklar/deskBuddy.git
```

### Step 2: Navigate to the Project

Move into the downloaded project directory.

```bash
cd deskBuddy
```

### Step 3: Install Dependencies

Install all the packages required by the project.

```bash
npm install
```

Wait for npm to finish installing the dependencies.

### Step 4: Start the Development Server

Run the following command:

```bash
npm start
```

### Step 5: Open the Application

Once the development server starts, open your browser and visit:

**http://localhost:3000**

🎉 That's it! Desk Buddy should now be running locally on your computer.

---

## 💾 How Data Is Stored

Desk Buddy uses the browser's built-in `localStorage` API to persist application data.

This means:

- Data saved in localStorage can remain available after a page refresh.
- You do not need to configure a separate database for the described storage setup.
- Stored data belongs to the browser and origin being used.

**Note:** Clearing browser storage or using a different browser can affect access to previously saved data.

---

## 🛠️ Troubleshooting

Running into issues while setting up the project? Here are a few things to check.

| Problem | Possible Solution |
|:---|:---|
| `npm` is not recognized | Install Node.js and restart your terminal. |
| Dependencies are missing | Run `npm install` inside the project directory. |
| Port 3000 is already in use | Stop the other development server or use another available port. |
| Application is not starting | Check the terminal for error messages and verify your Node.js installation. |

If the problem persists, consider opening an issue in the repository with details about the error.

---

## 👩‍🎓 Authors

**Sabeena Viklar**

Created with ❤️ to bridge the gap between UI design and frontend logic, especially for engineering students.

---

<p align="center">
  <b>Made with ❤️ for a more organized and productive student life.</b>
  <br />
  If you find Desk Buddy useful, consider giving the repository a ⭐!
</p>