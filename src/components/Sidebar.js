// function Navbar({ setSection, logout }) {
//     return (
//       <div className="navbar">
//         <h3>Desk Buddy</h3>
//         <div>
//           <button onClick={() => setSection("dashboard")}>Dashboard</button>
//           <button onClick={() => setSection("time")}>Time</button>
//           <button onClick={() => setSection("leave")}>Leave</button>
//           <button onClick={logout}>Logout</button>
//         </div>
//       </div>
//     );
//   }
  
//   export default Navbar;

//pages/Sidebar.js
/**
 * Sidebar navigation component providing access to views and logout.
 * @param {Object} props - Component properties.
 * @param {Function} props.setView - Callback function to change current active view.
 * @param {string} props.currentView - Currently selected view name.
 * @param {Function} props.logout - Callback function to log out user.
 * @returns {JSX.Element} The rendered Sidebar component.
 */
function Sidebar({ setView, currentView, logout }) {
  return (
    <aside className="sidebar">
      <h2>🎓 Desk Buddy</h2>

      <button
        className={currentView === "dashboard" ? "active" : ""}
        aria-current={currentView === "dashboard" ? "page" : undefined}
        onClick={() => setView("dashboard")}
      >
        Dashboard
      </button>
      <button
        className={currentView === "schedule" ? "active" : ""}
        aria-current={currentView === "schedule" ? "page" : undefined}
        onClick={() => setView("schedule")}
      >
        Study Schedule
      </button>
      <button
        className={currentView === "time" ? "active" : ""}
        aria-current={currentView === "time" ? "page" : undefined}
        onClick={() => setView("time")}
      >
        Time Tracker
      </button>
      <button
        className={currentView === "todo" ? "active" : ""}
        aria-current={currentView === "todo" ? "page" : undefined}
        onClick={() => setView("todo")}
      >
        To Do
      </button>
      <button
        className={currentView === "leave" ? "active" : ""}
        aria-current={currentView === "leave" ? "page" : undefined}
        onClick={() => setView("leave")}
      >
        Leave Tracker
      </button>
      <button
        className={currentView === "Contact" ? "active" : ""}
        aria-current={currentView === "Contact" ? "page" : undefined}
        onClick={() => setView("Contact")}
      >
        Contact
      </button>

      <button className="logout" onClick={logout}>
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;

  