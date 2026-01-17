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
function Sidebar({ setView, logout }) {
  return (
    <aside className="sidebar">
      <h2>🎓 Desk Buddy</h2>

      <button onClick={() => setView("dashboard")}>Dashboard</button>
      <button onClick={() => setView("time")}>Time Tracker</button>
      <button onClick={() => setView("todo")}>To Do</button>
      <button onClick={() => setView("leave")}>Leave Tracker</button>

      <button className="logout" onClick={logout}>
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;

  