function Sidebar({ setView, logout, currentView = "dashboard" }) {
  return (
    <aside className="sidebar">
      <h2>🎓 Desk Buddy</h2>

      <button
        className={currentView === "dashboard" ? "active" : ""}
        onClick={() => setView("dashboard")}
      >
        Dashboard
      </button>

      <button
        className={currentView === "timetable" ? "active" : ""}
        onClick={() => setView("timetable")}
      >
        Study Timetable
      </button>

      <button
        className={currentView === "time" ? "active" : ""}
        onClick={() => setView("time")}
      >
        Time Tracker
      </button>

      <button
        className={currentView === "todo" ? "active" : ""}
        onClick={() => setView("todo")}
      >
        To Do
      </button>

      <button
        className={currentView === "leave" ? "active" : ""}
        onClick={() => setView("leave")}
      >
        Leave Tracker
      </button>

      <button
        className={currentView === "Contact" ? "active" : ""}
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
