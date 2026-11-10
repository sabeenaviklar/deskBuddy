
import { useEffect, useMemo, useRef, useState } from "react";

const STORAGE_KEY = "deskbuddy_pomodoro";

const DEFAULT_DURATIONS = {
  focus: 25,
  short: 5,
  long: 15,
};

const MODE_LABELS = {
  focus: "Focus Session",
  short: "Short Break",
  long: "Long Break",
};

function readSavedState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (!saved) return null;

    const durations = {
      ...DEFAULT_DURATIONS,
      ...saved.durations,
    };

    const running = Boolean(saved.running && saved.endsAt);

    const remaining = running
      ? Math.max(0, Math.ceil((saved.endsAt - Date.now()) / 1000))
      : Math.max(0, Number(saved.remaining) || durations.focus * 60);

    return {
      mode: MODE_LABELS[saved.mode] ? saved.mode : "focus",
      durations,
      remaining,
      running: running && remaining > 0,
      endsAt: running && remaining > 0 ? saved.endsAt : null,
      completed: Math.max(0, Number(saved.completed) || 0),
    };
  } catch {
    return null;
  }
}

const initialState = readSavedState();

function PomodoroTimer() {
  const [mode, setMode] = useState(initialState?.mode || "focus");

  const [durations, setDurations] = useState(
    initialState?.durations || DEFAULT_DURATIONS
  );

  const [remaining, setRemaining] = useState(
    initialState?.remaining ?? DEFAULT_DURATIONS.focus * 60
  );

  const [isRunning, setIsRunning] = useState(
    initialState?.running || false
  );

  const [endsAt, setEndsAt] = useState(
    initialState?.endsAt || null
  );

  const [completed, setCompleted] = useState(
    initialState?.completed || 0
  );

  const [showSettings, setShowSettings] = useState(false);

  const [draftDurations, setDraftDurations] = useState(durations);

  const completionHandled = useRef(false);

  const totalSeconds = durations[mode] * 60;

  const progress =
    totalSeconds > 0
      ? ((totalSeconds - remaining) / totalSeconds) * 100
      : 0;

  const formattedTime = useMemo(() => {
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;

    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }, [remaining]);

  // Save timer state
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        mode,
        durations,
        remaining,
        running: isRunning,
        endsAt,
        completed,
      })
    );
  }, [mode, durations, remaining, isRunning, endsAt, completed]);

  // Countdown logic
  useEffect(() => {
    if (!isRunning || !endsAt) return undefined;

    const updateCountdown = () => {
      const nextRemaining = Math.max(
        0,
        Math.ceil((endsAt - Date.now()) / 1000)
      );

      setRemaining(nextRemaining);

      if (nextRemaining === 0 && !completionHandled.current) {
        completionHandled.current = true;
        setIsRunning(false);
        setEndsAt(null);

        if (mode === "focus") {
          setCompleted((count) => count + 1);
        }

        if (
          typeof window !== "undefined" &&
          "Notification" in window &&
          Notification.permission === "granted"
        ) {
          new Notification(`${MODE_LABELS[mode]} complete`, {
            body:
              mode === "focus"
                ? "Great work! Time for a break."
                : "Break is over. Ready to focus again?",
          });
        }
      }
    };

    updateCountdown();

    const intervalId = window.setInterval(updateCountdown, 250);

    return () => window.clearInterval(intervalId);
  }, [isRunning, endsAt, mode]);

  // Change timer mode
  const selectMode = (nextMode) => {
    if (isRunning) return;

    setMode(nextMode);
    setRemaining(durations[nextMode] * 60);
    setEndsAt(null);
    completionHandled.current = false;
  };

  // Start timer
  const startTimer = async () => {
    if (remaining <= 0) {
      setRemaining(durations[mode] * 60);
    }

    if (
      typeof window !== "undefined" &&
      "Notification" in window &&
      Notification.permission === "default"
    ) {
      try {
        await Notification.requestPermission();
      } catch {
        // Timer works without notification permission.
      }
    }

    const nextEnd =
      Date.now() +
      Math.max(1, remaining || durations[mode] * 60) * 1000;

    completionHandled.current = false;
    setEndsAt(nextEnd);
    setIsRunning(true);
  };

  // Pause timer
  const pauseTimer = () => {
    const nextRemaining = endsAt
      ? Math.max(0, Math.ceil((endsAt - Date.now()) / 1000))
      : remaining;

    setRemaining(nextRemaining);
    setIsRunning(false);
    setEndsAt(null);
  };

  // Reset timer
  const resetTimer = () => {
    setIsRunning(false);
    setEndsAt(null);
    setRemaining(durations[mode] * 60);
    completionHandled.current = false;
  };

  // Save custom durations
  const saveDurations = (event) => {
    event.preventDefault();

    const nextDurations = {
      focus: Math.min(
        180,
        Math.max(1, Number(draftDurations.focus) || 25)
      ),
      short: Math.min(
        60,
        Math.max(1, Number(draftDurations.short) || 5)
      ),
      long: Math.min(
        120,
        Math.max(1, Number(draftDurations.long) || 15)
      ),
    };

    setDurations(nextDurations);
    setDraftDurations(nextDurations);
    setRemaining(nextDurations[mode] * 60);
    setIsRunning(false);
    setEndsAt(null);
    setShowSettings(false);
  };

  // Enable browser notifications
  const requestNotificationPermission = async () => {
    if (
      "Notification" in window &&
      Notification.permission === "default"
    ) {
      await Notification.requestPermission();
    }
  };

  return (
    <section
      className="pomodoro-section"
      aria-labelledby="pomodoro-heading"
    >
      <div className="pomodoro-header">
        <div>
          <p className="pomodoro-eyebrow">STUDY SMARTER</p>
          <h2 id="pomodoro-heading">Pomodoro Timer</h2>
          <p className="pomodoro-subtitle">
            Focus on one task at a time, then take a well-earned break.
          </p>
        </div>

        <button
          type="button"
          className="pomodoro-settings-btn"
          onClick={() => {
            setDraftDurations(durations);
            setShowSettings((open) => !open);
          }}
          disabled={isRunning}
        >
          ⚙ {showSettings ? "Close settings" : "Customize"}
        </button>
      </div>

      <div className="pomodoro-layout">
        <div className="pomodoro-card">
          <div
            className="pomodoro-mode-tabs"
            role="group"
            aria-label="Timer mode"
          >
            {Object.entries(MODE_LABELS).map(([key, label]) => (
              <button
                type="button"
                key={key}
                className={`pomodoro-mode-btn ${
                  mode === key ? "active" : ""
                }`}
                onClick={() => selectMode(key)}
                disabled={isRunning}
              >
                {label}
              </button>
            ))}
          </div>

          <div
            className="pomodoro-progress"
            role="progressbar"
            aria-label="Pomodoro timer progress"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={Math.round(progress)}
            style={{
              "--pomodoro-progress": `${progress}%`,
            }}
          >
            <div className="pomodoro-progress-inner">
              <span className="pomodoro-mode-label">
                {MODE_LABELS[mode]}
              </span>

              <strong className="pomodoro-time">
                {formattedTime}
              </strong>

              <span className="pomodoro-status">
                {isRunning
                  ? "Stay focused"
                  : remaining === 0
                    ? "Session complete"
                    : "Ready when you are"}
              </span>
            </div>
          </div>

          <div className="pomodoro-controls">
            {isRunning ? (
              <button
                type="button"
                className="pomodoro-primary-btn"
                onClick={pauseTimer}
              >
                Pause
              </button>
            ) : (
              <button
                type="button"
                className="pomodoro-primary-btn"
                onClick={startTimer}
              >
                {remaining === 0 ? "Start again" : "Start focus"}
              </button>
            )}

            <button
              type="button"
              className="pomodoro-reset-btn"
              onClick={resetTimer}
            >
              Reset
            </button>
          </div>

          <p className="pomodoro-hint">
            {isRunning
              ? "You can pause at any time."
              : "Choose a session, then press start."}
          </p>
        </div>

        <aside className="pomodoro-stats-card">
          <div className="pomodoro-stat-icon" aria-hidden="true">
            ✓
          </div>

          <p className="pomodoro-stat-label">
            Completed focus sessions
          </p>

          <strong className="pomodoro-stat-number">
            {completed}
          </strong>

          <p className="pomodoro-stat-caption">
            Every completed focus session counts. Keep going!
          </p>

          <div className="pomodoro-session-summary">
            <div>
              <span>Focus</span>
              <strong>{durations.focus} min</strong>
            </div>

            <div>
              <span>Short break</span>
              <strong>{durations.short} min</strong>
            </div>

            <div>
              <span>Long break</span>
              <strong>{durations.long} min</strong>
            </div>
          </div>

          <button
            type="button"
            className="pomodoro-notification-btn"
            onClick={requestNotificationPermission}
          >
            Enable browser notifications
          </button>
        </aside>
      </div>

      {showSettings && (
        <form
          className="pomodoro-settings-panel"
          onSubmit={saveDurations}
        >
          <h3>Customize timer durations</h3>

          <div className="pomodoro-settings-fields">
            <label>
              Focus (1–180 min)
              <input
                type="number"
                min="1"
                max="180"
                value={draftDurations.focus}
                onChange={(event) =>
                  setDraftDurations((prev) => ({
                    ...prev,
                    focus: event.target.value,
                  }))
                }
              />
            </label>

            <label>
              Short break (1–60 min)
              <input
                type="number"
                min="1"
                max="60"
                value={draftDurations.short}
                onChange={(event) =>
                  setDraftDurations((prev) => ({
                    ...prev,
                    short: event.target.value,
                  }))
                }
              />
            </label>

            <label>
              Long break (1–120 min)
              <input
                type="number"
                min="1"
                max="120"
                value={draftDurations.long}
                onChange={(event) =>
                  setDraftDurations((prev) => ({
                    ...prev,
                    long: event.target.value,
                  }))
                }
              />
            </label>
          </div>

          <div className="pomodoro-settings-actions">
            <button
              type="submit"
              className="pomodoro-primary-btn"
            >
              Save durations
            </button>

            <button
              type="button"
              className="pomodoro-reset-btn"
              onClick={() => setShowSettings(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

export default PomodoroTimer;
