function Sidebar({ setView, logout }) {
  return (
    <aside className="sidebar">
      <h2>🎓 Desk Buddy</h2>

      <button type="button" onClick={() => setView("dashboard")}>
        Dashboard
      </button>
      <button type="button" onClick={() => setView("time")}>
        Time Tracker
      </button>
      <button type="button" onClick={() => setView("todo")}>
        To Do
      </button>
      <button type="button" onClick={() => setView("leave")}>
        Leave Tracker
      </button>
      <button type="button" onClick={() => setView("Contact")}>
        Contact
      </button>

      <button type="button" className="logout" onClick={logout}>
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;
