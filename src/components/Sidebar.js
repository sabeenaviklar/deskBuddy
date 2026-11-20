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
        type="button"
        className={currentView === "dashboard" ? "active" : ""}
        onClick={() => setView("dashboard")}
      >
        Dashboard
      </button>
      <button
        type="button"
        className={currentView === "schedule" ? "active" : ""}
        onClick={() => setView("schedule")}
      >
        Study Schedule
      </button>
      <button
        type="button"
        className={currentView === "time" ? "active" : ""}
        onClick={() => setView("time")}
      >
        Time Tracker
      </button>
      <button
        type="button"
        className={currentView === "todo" ? "active" : ""}
        onClick={() => setView("todo")}
      >
        To Do
      </button>
      <button
        type="button"
        className={currentView === "leave" ? "active" : ""}
        onClick={() => setView("leave")}
      >
        Leave Tracker
      </button>
      <button
        type="button"
        className={currentView === "Contact" ? "active" : ""}
        onClick={() => setView("Contact")}
      >
        Contact
      </button>

      <button type="button" className="logout" onClick={logout}>
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
