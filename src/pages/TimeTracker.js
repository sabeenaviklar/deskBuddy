import { useState, useRef, useEffect } from "react";

function TimeTracker() {
  /* ================= USER ================= */
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userName = storedUser?.name || "User";

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning";
    if (h < 18) return "Good Afternoon";
    return "Good Evening";
  };

  /* ================= STATE ================= */
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [sessions, setSessions] = useState(
    JSON.parse(localStorage.getItem("sessions")) || []
  );

  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  /* ================= LOAD SAVED TIMER ================= */
  useEffect(() => {
    const savedStart = localStorage.getItem("runningStart");

    if (savedStart) {
      const diff = Math.floor((Date.now() - Number(savedStart)) / 1000);
      setSeconds(diff);
      start(); // auto resume
    }
  }, []);

  /* ================= SAVE SESSIONS ================= */
  useEffect(() => {
    localStorage.setItem("sessions", JSON.stringify(sessions));
  }, [sessions]);

  /* ================= FORMAT TIME ================= */
  const formatTime = (total) => {
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;

    return `${String(h).padStart(2, "0")} : ${String(m).padStart(
      2,
      "0"
    )} : ${String(s).padStart(2, "0")}`;
  };

  /* ================= TIMER ================= */

  const start = () => {
    if (timerRef.current) return;

    setIsRunning(true);
    startTimeRef.current = Date.now();
    localStorage.setItem("runningStart", startTimeRef.current);

    timerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const stop = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setIsRunning(false);

    localStorage.removeItem("runningStart");

    const end = new Date();
    const startTime = new Date(startTimeRef.current);

    const duration = Math.floor(
      (end.getTime() - startTime.getTime()) / 1000
    );

    if (duration > 0) {
      const newSession = {
        id: Date.now(),
        duration,
        start: startTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        end: end.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setSessions((prev) => [newSession, ...prev]);
    }
  };

  const reset = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setSeconds(0);
    setIsRunning(false);
    localStorage.removeItem("runningStart");
  };

  /* ================= DAILY TOTAL ================= */

  const totalToday = sessions.reduce((acc, s) => acc + s.duration, 0);

  /* ================= CLOCK ANGLES ================= */
  const secondAngle = (seconds % 60) * 6;
  const minuteAngle = ((seconds / 60) % 60) * 6;
  const hourAngle = ((seconds / 3600) % 12) * 30;

  /* ================= UI ================= */

  return (
    <div className="tracker-container">
      {/* MAIN CARD */}
      <div className="tracker-card">
        <h3 className="greeting">
          {getGreeting()}, {userName} 👋
        </h3>

        <h2 className="tracker-title">Track Your Time</h2>

        <div className={`status ${isRunning ? "running" : "stopped"}`}>
          {isRunning ? "● Tracking Time" : "● Stopped"}
        </div>

        {/* CLOCK */}
        <svg width="220" height="220" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" fill="white" stroke="#296374" strokeWidth="8" />

          <line x1="100" y1="100" x2="100" y2="55"
            stroke="#296374" strokeWidth="6"
            transform={`rotate(${hourAngle},100,100)`} />

          <line x1="100" y1="100" x2="100" y2="40"
            stroke="#629FAD" strokeWidth="4"
            transform={`rotate(${minuteAngle},100,100)`} />

          <line x1="100" y1="105" x2="100" y2="30"
            stroke="#e11d48" strokeWidth="2"
            transform={`rotate(${secondAngle},100,100)`} />
        </svg>

        <h1 className="time-display">{formatTime(seconds)}</h1>

        <div className="controls">
          {!isRunning ? (
            <button className="primary-btn" onClick={start}>
              ▶ Start
            </button>
          ) : (
            <button className="primary-btn" onClick={stop}>
              ⏸ Pause
            </button>
          )}

          <button className="secondary-btn" onClick={reset}>
            Reset
          </button>
        </div>
      </div>

      {/* SESSION PANEL */}
      <div className="session-card">
        <h3>Today's Sessions</h3>

        <div className="daily-total">
          Total Today: <strong>{formatTime(totalToday)}</strong>
        </div>

        {sessions.length === 0 ? (
          <p className="empty">
            Start tracking to record your first session 🚀
          </p>
        ) : (
          sessions.map((s) => (
            <div key={s.id} className="session-item">
              ⏱ {s.start} — {s.end}
              <span>{formatTime(s.duration)}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TimeTracker;