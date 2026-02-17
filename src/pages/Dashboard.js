import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import TimeTracker from "./TimeTracker";
import LeaveTracker from "./LeaveTracker";
import TodoBoard from "./TodoBoard";
import CourseCard from "../components/CourseCard";
import CourseProgress from "../components/CourseProgress";

function Dashboard({ setUser, darkMode, setDarkMode }) {
  const [view, setView] = useState("dashboard");
  const [activeCourse, setActiveCourse] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const openCourse = (course) => {
    setActiveCourse(course);
  };

  return (
    <div className="layout">
      <Sidebar
        setView={(v) => {
          setView(v);
          setActiveCourse(null);
        }}
        logout={() => {
          localStorage.removeItem("user");
          setUser(null);
        }}
      />

      <main className="main">
        {/* ✅ Pass darkMode props to Topbar */}
        <Topbar
          user={user}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* ================= COURSE PROGRESS PAGE ================= */}
        {activeCourse && (
          <CourseProgress
            course={activeCourse}
            goBack={() => setActiveCourse(null)}
          />
        )}

        {/* ================= DASHBOARD HOME ================= */}
        {!activeCourse && view === "dashboard" && (
          <>
            <div className="welcome">
              <h1>Welcome back, {user?.name} 👋</h1>
              <p>Always stay updated in your Desk Buddy</p>
            </div>

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

            <h2>My Courses</h2>

            <div className="courses-grid">
              <CourseCard
                title="Mathematics"
                lessons={20}
                completed={8}
                image="https://images.unsplash.com/photo-1509228468518-180dd4864904"
                onContinue={openCourse}
              />

              <CourseCard
                title="Physics"
                lessons={18}
                completed={12}
                image="https://t3.ftcdn.net/jpg/01/97/49/40/360_F_197494079_U9dM6IxEBzdUmrhe3DFxyi8L0aFGtQME.jpg"
                onContinue={openCourse}
              />

              <CourseCard
                title="PPS"
                lessons={15}
                completed={5}
                image="https://images.unsplash.com/photo-1515879218367-8466d910aaa4"
                onContinue={openCourse}
              />

              <CourseCard
                title="BEE"
                lessons={22}
                completed={10}
                image="https://play-lh.googleusercontent.com/Nw1chszQ6BOtLJYQEI8cySx3a6muFCb5yL1O49Btmxv7mfd_IWexKur4gkkrfdYKJDG_"
                onContinue={openCourse}
              />
            </div>
          </>
        )}

        {/* ================= OTHER VIEWS ================= */}
        {!activeCourse && view === "time" && <TimeTracker />}
        {!activeCourse && view === "todo" && <TodoBoard />}
        {!activeCourse && view === "leave" && <LeaveTracker />}
      </main>
    </div>
  );
}

export default Dashboard;
