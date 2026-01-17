

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import TimeTracker from "./TimeTracker";
import LeaveTracker from "./LeaveTracker";

function Dashboard({ setUser }) {
  const [view, setView] = useState("dashboard");
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="layout">
      <Sidebar
        setView={setView}
        logout={() => {
          localStorage.removeItem("user");
          setUser(null);
        }}
      />

      <main className="main">
        <Topbar user={user} />

        {view === "dashboard" && (
          <>
            <div className="welcome">
              <h1>Welcome back, {user.name} 👋</h1>
              <p>Always stay updated in your Desk Buddy</p>
            </div>

            <div className="cards">
              <div className="card">07h <span>Study</span></div>
              <div className="card">75% <span>Progress</span></div>
              <div className="card">10/15 <span>Mocks</span></div>
            </div>

            <h3>Subjects</h3>
            <div className="subjects">
              {["Maths", "Physics", "Chemistry", "Biology"].map(s => (
                <div key={s} className="subject">{s}</div>
              ))}
            </div>
          </>
        )}

        {view === "time" && <TimeTracker />}
        {view === "leave" && <LeaveTracker />}
      </main>
    </div>
  );
}

export default Dashboard;
