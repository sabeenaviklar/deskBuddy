import { useState, useRef, useEffect, useCallback } from "react";

const POMO_PRESETS = {
  focus: { label: "🍅 Focus (25m)", duration: 25 * 60, title: "Focus Time" },
  shortBreak: { label: "☕ Short Break (5m)", duration: 5 * 60, title: "Short Break" },
  longBreak: { label: "🌴 Long Break (15m)", duration: 15 * 60, title: "Long Break" },
};

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

  /* ================= MODE STATE ================= */
  const [mode, setMode] = useState(localStorage.getItem("tracker_mode") || "stopwatch");

  /* ================= STOPWATCH STATE ================= */
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const stopwatchTimerRef = useRef(null);
  const stopwatchStartRef = useRef(null);

  /* ================= POMODORO STATE ================= */
  const [pomoType, setPomoType] = useState("focus");
  const [pomoSeconds, setPomoSeconds] = useState(POMO_PRESETS.focus.duration);
  const [pomoRunning, setPomoRunning] = useState(false);
  const [pomoAlert, setPomoAlert] = useState("");
  const pomoTimerRef = useRef(null);
  const pomoStartRef = useRef(null);

  /* ================= SESSIONS ================= */
  const [sessions, setSessions] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("sessions")) || [];
    } catch {
      return [];
    }
  });

  /* ================= SAVE SESSIONS & MODE ================= */
  useEffect(() => {
    localStorage.setItem("sessions", JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem("tracker_mode", mode);
  }, [mode]);

  /* ================= FORMAT TIME HELPER ================= */
  const formatTime = (total) => {
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;

    if (h > 0) {
      return `${String(h).padStart(2, "0")} : ${String(m).padStart(
        2,
        "0"
      )} : ${String(s).padStart(2, "0")}`;
    }
    return `${String(m).padStart(2, "0")} : ${String(s).padStart(2, "0")}`;
  };

  /* ================= STOPWATCH LOGIC ================= */

  // Resume running stopwatch on mount
  useEffect(() => {
    const savedStart = localStorage.getItem("stopwatch_running_start");
    const savedAccumulated = Number(localStorage.getItem("stopwatch_accumulated") || 0);

    if (savedStart) {
      const elapsed = Math.floor((Date.now() - Number(savedStart)) / 1000) + savedAccumulated;
      setSeconds(elapsed);
      setIsRunning(true);
      setIsPaused(false);
      stopwatchStartRef.current = Number(savedStart);

      stopwatchTimerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (savedAccumulated > 0) {
      setSeconds(savedAccumulated);
      setIsPaused(true);
    }

    return () => {
      if (stopwatchTimerRef.current) clearInterval(stopwatchTimerRef.current);
    };
  }, []);

  const startStopwatch = () => {
    if (stopwatchTimerRef.current) return;

    const startTimestamp = Date.now();
    stopwatchStartRef.current = startTimestamp;
    localStorage.setItem("stopwatch_running_start", startTimestamp);
    localStorage.setItem("stopwatch_accumulated", seconds);

    setIsRunning(true);
    setIsPaused(false);

    stopwatchTimerRef.current = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
  };

  const pauseStopwatch = () => {
    if (stopwatchTimerRef.current) {
      clearInterval(stopwatchTimerRef.current);
      stopwatchTimerRef.current = null;
    }
    setIsRunning(false);
    setIsPaused(true);
    localStorage.removeItem("stopwatch_running_start");
    localStorage.setItem("stopwatch_accumulated", seconds);
  };

  const stopAndSaveStopwatch = () => {
    if (stopwatchTimerRef.current) {
      clearInterval(stopwatchTimerRef.current);
      stopwatchTimerRef.current = null;
    }

    setIsRunning(false);
    setIsPaused(false);

    localStorage.removeItem("stopwatch_running_start");
    localStorage.removeItem("stopwatch_accumulated");

    if (seconds > 0) {
      const end = new Date();
      const start = new Date(end.getTime() - seconds * 1000);

      const newSession = {
        id: Date.now(),
        type: "Stopwatch",
        duration: seconds,
        start: start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        end: end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setSessions((prev) => [newSession, ...prev]);
      setSeconds(0);
    }
  };

  const resetStopwatch = () => {
    if (stopwatchTimerRef.current) {
      clearInterval(stopwatchTimerRef.current);
      stopwatchTimerRef.current = null;
    }
    setIsRunning(false);
    setIsPaused(false);
    setSeconds(0);
    localStorage.removeItem("stopwatch_running_start");
    localStorage.removeItem("stopwatch_accumulated");
  };

  /* ================= POMODORO LOGIC ================= */

  const completePomodoro = useCallback(() => {
    if (pomoTimerRef.current) {
      clearInterval(pomoTimerRef.current);
      pomoTimerRef.current = null;
    }
    setPomoRunning(false);

    const preset = POMO_PRESETS[pomoType];
    const alertMsg =
      pomoType === "focus"
        ? "🎉 Great work! You completed your Focus session. Take a break!"
        : "⏰ Break time is over! Ready to focus again?";
    setPomoAlert(alertMsg);

    if (pomoType === "focus") {
      const end = new Date();
      const start = new Date(end.getTime() - preset.duration * 1000);

      const newSession = {
        id: Date.now(),
        type: "🍅 Pomodoro",
        duration: preset.duration,
        start: start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        end: end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setSessions((prev) => [newSession, ...prev]);
    }

    // Reset to current preset duration
    setPomoSeconds(preset.duration);
  }, [pomoType]);

  useEffect(() => {
    if (pomoRunning) {
      pomoTimerRef.current = setInterval(() => {
        setPomoSeconds((prev) => {
          if (prev <= 1) {
            completePomodoro();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (pomoTimerRef.current) clearInterval(pomoTimerRef.current);
    }

    return () => {
      if (pomoTimerRef.current) clearInterval(pomoTimerRef.current);
    };
  }, [pomoRunning, completePomodoro]);

  const selectPomoPreset = (key) => {
    if (pomoTimerRef.current) {
      clearInterval(pomoTimerRef.current);
      pomoTimerRef.current = null;
    }
    setPomoRunning(false);
    setPomoType(key);
    setPomoSeconds(POMO_PRESETS[key].duration);
    setPomoAlert("");
  };

  const togglePomo = () => {
    setPomoAlert("");
    setPomoRunning((prev) => !prev);
  };

  const resetPomo = () => {
    if (pomoTimerRef.current) {
      clearInterval(pomoTimerRef.current);
      pomoTimerRef.current = null;
    }
    setPomoRunning(false);
    setPomoSeconds(POMO_PRESETS[pomoType].duration);
    setPomoAlert("");
  };

  /* ================= SESSION MANAGEMENT ================= */
  const deleteSession = (id) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  const clearAllSessions = () => {
    if (window.confirm("Are you sure you want to clear today's study sessions?")) {
      setSessions([]);
    }
  };

  const totalToday = sessions.reduce((acc, s) => acc + s.duration, 0);

  /* ================= CLOCK ANGLES (STOPWATCH) ================= */
  const secondAngle = (seconds % 60) * 6;
  const minuteAngle = ((seconds / 60) % 60) * 6;
  const hourAngle = ((seconds / 3600) % 12) * 30;

  /* ================= POMODORO PROGRESS RING ================= */
  const pomoTotal = POMO_PRESETS[pomoType].duration;
  const pomoProgress = Math.max(0, Math.min(1, pomoSeconds / pomoTotal));
  const ringCircumference = 2 * Math.PI * 80;
  const ringOffset = ringCircumference * (1 - pomoProgress);

  return (
    <div className="tracker-container">
      {/* MAIN TRACKER CARD */}
      <div className="tracker-card">
        <h3 className="greeting">
          {getGreeting()}, {userName} 👋
        </h3>

        {/* MODE TABS */}
        <div className="tracker-tabs">
          <button
            type="button"
            className={`tracker-tab-btn ${mode === "stopwatch" ? "active" : ""}`}
            onClick={() => setMode("stopwatch")}
          >
            ⏱ Stopwatch
          </button>
          <button
            type="button"
            className={`tracker-tab-btn ${mode === "pomodoro" ? "active" : ""}`}
            onClick={() => setMode("pomodoro")}
          >
            🍅 Pomodoro
          </button>
        </div>

        {/* ================= STOPWATCH VIEW ================= */}
        {mode === "stopwatch" && (
          <>
            <h2 className="tracker-title">Study Stopwatch</h2>

            <div
              className={`status ${
                isRunning ? "running" : isPaused ? "paused" : "stopped"
              }`}
            >
              {isRunning
                ? "● Tracking Time"
                : isPaused
                ? "● Paused"
                : "● Stopped"}
            </div>

            {/* ANALOG CLOCK */}
            <svg width="220" height="220" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="white"
                stroke="#296374"
                strokeWidth="8"
              />
              <line
                x1="100"
                y1="100"
                x2="100"
                y2="55"
                stroke="#296374"
                strokeWidth="6"
                transform={`rotate(${hourAngle},100,100)`}
              />
              <line
                x1="100"
                y1="100"
                x2="100"
                y2="40"
                stroke="#629FAD"
                strokeWidth="4"
                transform={`rotate(${minuteAngle},100,100)`}
              />
              <line
                x1="100"
                y1="105"
                x2="100"
                y2="30"
                stroke="#e11d48"
                strokeWidth="2"
                transform={`rotate(${secondAngle},100,100)`}
              />
            </svg>

            <h1 className="time-display">{formatTime(seconds)}</h1>

            <div className="controls">
              {!isRunning ? (
                <button
                  type="button"
                  className="primary-btn"
                  onClick={startStopwatch}
                >
                  {isPaused ? "▶ Resume" : "▶ Start"}
                </button>
              ) : (
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={pauseStopwatch}
                >
                  ⏸ Pause
                </button>
              )}

              {(isRunning || isPaused || seconds > 0) && (
                <button
                  type="button"
                  className="primary-btn"
                  onClick={stopAndSaveStopwatch}
                >
                  💾 Save Session
                </button>
              )}

              <button
                type="button"
                className="secondary-btn"
                onClick={resetStopwatch}
              >
                Reset
              </button>
            </div>
          </>
        )}

        {/* ================= POMODORO VIEW ================= */}
        {mode === "pomodoro" && (
          <>
            <h2 className="tracker-title">{POMO_PRESETS[pomoType].title}</h2>

            <div className="pomodoro-presets">
              {Object.keys(POMO_PRESETS).map((key) => (
                <button
                  key={key}
                  type="button"
                  className={`preset-btn ${pomoType === key ? "active" : ""}`}
                  onClick={() => selectPomoPreset(key)}
                >
                  {POMO_PRESETS[key].label}
                </button>
              ))}
            </div>

            <div className={`status ${pomoRunning ? "running" : "stopped"}`}>
              {pomoRunning ? "● Active Interval" : "● Ready"}
            </div>

            {pomoAlert && <div className="pomodoro-alert">{pomoAlert}</div>}

            {/* CIRCULAR PROGRESS COUNTDOWN */}
            <svg width="220" height="220" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="10"
              />
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke={pomoType === "focus" ? "#e11d48" : "#22c55e"}
                strokeWidth="10"
                strokeDasharray={ringCircumference}
                strokeDashoffset={ringOffset}
                strokeLinecap="round"
                transform="rotate(-90 100 100)"
                style={{ transition: "stroke-dashoffset 0.8s ease" }}
              />
            </svg>

            <h1 className="time-display">{formatTime(pomoSeconds)}</h1>

            <div className="controls">
              <button
                type="button"
                className="primary-btn"
                onClick={togglePomo}
              >
                {pomoRunning ? "⏸ Pause" : "▶ Start Focus"}
              </button>

              <button
                type="button"
                className="secondary-btn"
                onClick={resetPomo}
              >
                ↺ Reset
              </button>
            </div>
          </>
        )}
      </div>

      {/* SESSION HISTORY CARD */}
      <div className="session-card">
        <div className="session-header-row">
          <h3>Today's Sessions</h3>
          {sessions.length > 0 && (
            <button
              type="button"
              className="clear-btn"
              onClick={clearAllSessions}
              title="Clear all sessions"
            >
              Clear All
            </button>
          )}
        </div>

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
              <div>
                <span>{s.type ? `${s.type}: ` : "⏱ "}</span>
                {s.start} — {s.end}
              </div>
              <div className="session-actions">
                <span>{formatTime(s.duration)}</span>
                <button
                  type="button"
                  className="session-delete-btn"
                  onClick={() => deleteSession(s.id)}
                  title="Delete session"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TimeTracker;
