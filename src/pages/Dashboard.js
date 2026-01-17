

// import { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import Topbar from "../components/Topbar";
// import TimeTracker from "./TimeTracker";
// import LeaveTracker from "./LeaveTracker";
// import TodoBoard from "./TodoBoard";  

// function Dashboard({ setUser }) {
//   const [view, setView] = useState("dashboard");
//   const user = JSON.parse(localStorage.getItem("user"));

//   return (
//     <div className="layout">
//       <Sidebar
//         setView={setView}
//         logout={() => {
//           localStorage.removeItem("user");
//           setUser(null);
//         }}
//       />

//       <main className="main">
//         <Topbar user={user} />

//         {view === "dashboard" && (
//           <>
//             <div className="welcome">
//               <h1>Welcome back, {user.name} 👋</h1>
//               <p>Always stay updated in your Desk Buddy</p>
//             </div>

//             <div className="cards">
//               <div className="card">07h <span>Study</span></div>
//               <div className="card">75% <span>Progress</span></div>
//               <div className="card">10/15 <span>Mocks</span></div>
//             </div>

//             <h3>My Courses</h3>
//             <div className="subjects">
//               {["Maths", "Physics", "PPS", "BEE"].map(s => (
//                 <div key={s} className="subject">{s}</div>
//               ))}
//             </div>
//           </>
//         )}

//         {view === "time" && <TimeTracker />}
//         {view === "todo" && <TodoBoard />}
//         {view === "leave" && <LeaveTracker />}
//       </main>
//     </div>
//   );
// }

// export default Dashboard;


import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import TimeTracker from "./TimeTracker";
import LeaveTracker from "./LeaveTracker";
import TodoBoard from "./TodoBoard";
import CourseCard from "../components/CourseCard";


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

        {/* ================= DASHBOARD HOME ================= */}
        {view === "dashboard" && (
          <>
            {/* WELCOME CARD */}
            <div className="welcome">
              <h1>Welcome back, {user?.name} 👋</h1>
              <p>Always stay updated in your Desk Buddy</p>
            </div>

            {/* STATS */}
            <div className="cards">
              <div className="card">
                <h2>07h</h2>
                <span>Study</span>
              </div>

              <div className="card">
                <h2>75%</h2>
                <span>Progress</span>
              </div>

              <div className="card">
                <h2>10 / 15</h2>
                <span>Mocks</span>
              </div>
            </div>

            {/* COURSES */}
            <div className="courses-section">
              <h2>My Courses</h2>

              <div className="courses-grid">
                <CourseCard
                  title="Mathematics"
                  lessons={20}
                  completed={8}
                  image="https://images.unsplash.com/photo-1509228468518-180dd4864904"
                />

                <CourseCard
                  title="Physics"
                  lessons={18}
                  completed={12}
                  image="https://t3.ftcdn.net/jpg/01/97/49/40/360_F_197494079_U9dM6IxEBzdUmrhe3DFxyi8L0aFGtQME.jpg"
                />

                <CourseCard
                  title="PPS"
                  lessons={15}
                  completed={5}
                  image="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29tcHV0ZXIlMjBjb2RlfGVufDB8fDB8fHww"
                />

                <CourseCard
                  title="BEE"
                  lessons={22}
                  completed={10}
                  image="https://play-lh.googleusercontent.com/Nw1chszQ6BOtLJYQEI8cySx3a6muFCb5yL1O49Btmxv7mfd_IWexKur4gkkrfdYKJDG_"
                />
              </div>
            </div>
          </>
        )}

        {/* ================= OTHER SECTIONS ================= */}
        {view === "time" && <TimeTracker />}
        {view === "todo" && <TodoBoard />}
        {view === "leave" && <LeaveTracker />}
      </main>
    </div>
  );
}

export default Dashboard;
