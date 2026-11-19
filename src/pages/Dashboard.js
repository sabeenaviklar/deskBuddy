import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import TimeTracker from "./TimeTracker";
import LeaveTracker from "./LeaveTracker";
import TodoBoard from "./TodoBoard";
import CourseCard from "../components/CourseCard";
import CourseProgress from "../components/CourseProgress";
import ContactPage from "./Contact";
import StudySchedule from "./StudySchedule";

const DASHBOARD_FALLBACKS = {
  study: "07h",
  progress: 75,
  mocks: "10 / 15"
};

const COURSES = [
  { name: "Mathematics", totalLessons: 20 },
  { name: "Physics", totalLessons: 18 },
  { name: "PPS", totalLessons: 6 },
  { name: "BEE", totalLessons: 22 }
];

const getStoredJSON = (key) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
};

const getStudyTime = () => {
  const sessions = getStoredJSON("sessions");
  if (!Array.isArray(sessions) || sessions.length === 0) {
    return DASHBOARD_FALLBACKS.study;
  }

  const totalSeconds = sessions.reduce((total, session) => {
    const duration = Number(session?.duration);
    return total + (Number.isFinite(duration) && duration > 0 ? duration : 0);
  }, 0);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  return hours > 0
    ? `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`
    : `${minutes}m`;
};

const getCourseProgressPercent = () => {
  const summaries = COURSES.map(({ name, totalLessons }) => {
    const summary = getStoredJSON(`course_${name}_summary`);
    return summary && typeof summary === "object"
      ? { ...summary, totalLessons: Number(summary.totalLessons) || totalLessons }
      : null;
  });

  if (!summaries.some(Boolean)) return DASHBOARD_FALLBACKS.progress;

  const completedLessons = summaries.reduce((total, summary) => {
    const completed = Number(summary?.completedLessons);
    return total + (Number.isFinite(completed) && completed > 0 ? completed : 0);
  }, 0);
  const totalLessons = COURSES.reduce((total, course, index) => {
    return total + (summaries[index]?.totalLessons || course.totalLessons);
  }, 0);

  return totalLessons > 0
    ? Math.round((completedLessons / totalLessons) * 100)
    : 0;
};

/**
 * Dashboard main component rendering application views and navigation layout.
 * @param {Object} props - Component properties.
 * @param {Function} props.setUser - Callback function to set user session.
 * @param {boolean} props.darkMode - Flag indicating if dark theme is active.
 * @param {Function} props.setDarkMode - Callback function to toggle dark theme.
 * @returns {JSX.Element} The rendered Dashboard component.
 */
function Dashboard({ setUser, darkMode, setDarkMode }) {
  const [view, setView] = useState("dashboard");
  const [, forceUpdate] = useState(0);
  const [activeCourse, setActiveCourse] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const getCourseProgress = (courseName, totalLessons) => {
    const data = JSON.parse(
      localStorage.getItem(`course_${courseName}_summary`)
    );

    return {
      completed: data?.completedLessons || 0,
      lessons: data?.totalLessons || totalLessons,
      progress: data?.progress || 0
    };
  };

  const openCourse = (course) => {
    setActiveCourse(course);
  };

  return (
    <div className="layout">
      <Sidebar
        currentView={view}
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
            goBack={() => {
              setActiveCourse(null);
              forceUpdate(n => n + 1);
            }}
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
                <h2>{getStudyTime()}</h2>
                <span>Study</span>
              </div>

              <div className="card">
                <h2>{getCourseProgressPercent()}%</h2>
                <span>Progress</span>
              </div>

              <div className="card">
                <h2>{DASHBOARD_FALLBACKS.mocks}</h2>
                <span>Mocks</span>
              </div>
            </div>

            <h2>My Courses</h2>

            <div className="courses-grid">
              <CourseCard
                title="Mathematics"
                {...getCourseProgress("Mathematics", 20)}
                image="https://images.unsplash.com/photo-1509228468518-180dd4864904"
                onContinue={openCourse}
              />

              <CourseCard
                title="Physics"
                {...getCourseProgress("Physics", 18)}
                image="https://t3.ftcdn.net/jpg/01/97/49/40/360_F_197494079_U9dM6IxEBzdUmrhe3DFxyi8L0aFGtQME.jpg"
                onContinue={openCourse}
              />

              <CourseCard
                title="PPS"
                {...getCourseProgress("PPS", 6)}
                image="https://images.unsplash.com/photo-1515879218367-8466d910aaa4"
                onContinue={openCourse}
              />

              <CourseCard
                title="BEE"
                {...getCourseProgress("BEE", 22)}
                image="https://play-lh.googleusercontent.com/Nw1chszQ6BOtLJYQEI8cySx3a6muFCb5yL1O49Btmxv7mfd_IWexKur4gkkrfdYKJDG_"
                onContinue={openCourse}
              />
            </div>
          </>
        )}

        {/* ================= OTHER VIEWS ================= */}
        {!activeCourse && view === "schedule" && <StudySchedule />}
        {!activeCourse && view === "time" && <TimeTracker />}
        {!activeCourse && view === "todo" && <TodoBoard />}
        {!activeCourse && view === "leave" && <LeaveTracker />}
        {!activeCourse && view === "Contact" && <ContactPage />}
      </main>
    </div>
  );
}

export default Dashboard;
