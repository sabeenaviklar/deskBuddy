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
function Sidebar({ setView, currentView, logout }) {
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
        className={currentView === "schedule" ? "active" : ""}
        onClick={() => setView("schedule")}
      >
        Study Schedule
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

  