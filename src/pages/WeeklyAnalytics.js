
import { useMemo } from "react";

const getLocalDate = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatHours = (seconds) => `${(seconds / 3600).toFixed(1)}h`;

const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
};

function WeeklyAnalytics() {
  const sessions = JSON.parse(localStorage.getItem("sessions") || "[]");
  const tasks = JSON.parse(localStorage.getItem("hp_tasks") || "[]");

  const days = useMemo(() => {
    const today = new Date();
    const monday = new Date(today);
    const offset = (today.getDay() + 6) % 7;

    monday.setDate(today.getDate() - offset);
    monday.setHours(0, 0, 0, 0);

    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);

      const key = getLocalDate(date);
      const seconds = sessions
        .filter((session) => session.date === key)
        .reduce((total, session) => total + Number(session.duration || 0), 0);

      return {
        key,
        label: date.toLocaleDateString(undefined, { weekday: "short" }),
        dateLabel: date.toLocaleDateString(undefined, {
          day: "numeric",
          month: "short",
        }),
        seconds,
      };
    });
  }, [sessions]);

  const totalSeconds = days.reduce((sum, day) => sum + day.seconds, 0);
  const activeDays = days.filter((day) => day.seconds > 0).length;
  const maxSeconds = Math.max(...days.map((day) => day.seconds), 1);

  const completed = tasks.filter((task) => task.status === "done").length;
  const pending = tasks.filter((task) => task.status !== "done").length;

  const legacySessions = sessions.filter((session) => !session.date).length;

  return (
    <section className="analytics-page">
      <div className="analytics-heading">
        <div>
          <p className="analytics-eyebrow">YOUR PROGRESS AT A GLANCE</p>
          <h1>Weekly Productivity</h1>
          <p>Track your study consistency and task progress.</p>
        </div>

        <span className="analytics-week">
          {days[0].dateLabel} – {days[6].dateLabel}
        </span>
      </div>

      <div className="analytics-stats">
        <article className="analytics-stat">
          <span>Study time this week</span>
          <strong>{formatHours(totalSeconds)}</strong>
          <small>{formatDuration(totalSeconds)} tracked</small>
        </article>

        <article className="analytics-stat">
          <span>Active study days</span>
          <strong>{activeDays}/7</strong>
          <small>Days with recorded study time</small>
        </article>

        <article className="analytics-stat">
          <span>Tasks completed</span>
          <strong>{completed}</strong>
          <small>Current task board total</small>
        </article>

        <article className="analytics-stat">
          <span>Tasks pending</span>
          <strong>{pending}</strong>
          <small>To do and in progress</small>
        </article>
      </div>

      <div className="analytics-panel">
        <div className="analytics-panel-title">
          <div>
            <h2>Daily study activity</h2>
            <p>Study time recorded from Monday to Sunday</p>
          </div>
          <strong>{formatHours(totalSeconds)} total</strong>
        </div>

        <div
          className="weekly-chart"
          role="img"
          aria-label="Bar chart showing daily study time this week"
        >
          {days.map((day) => (
            <div className="weekly-chart-column" key={day.key}>
              <span className="weekly-chart-value">
                {day.seconds ? formatHours(day.seconds) : "—"}
              </span>

              <div className="weekly-chart-track">
                <div
                  className="weekly-chart-bar"
                  style={{
                    height: day.seconds
                      ? `${Math.max((day.seconds / maxSeconds) * 100, 4)}%`
                      : "0%",
                  }}
                />
              </div>

              <strong>{day.label}</strong>
              <small>{day.dateLabel}</small>
            </div>
          ))}
        </div>
      </div>

      <div className="analytics-panel analytics-breakdown">
        <h2>Daily breakdown</h2>
        <p>Your recorded study time for each day this week.</p>

        {days.map((day) => (
          <div className="analytics-day-row" key={day.key}>
            <span>
              <strong>{day.label}</strong>
              <small>{day.dateLabel}</small>
            </span>

            <div className="analytics-day-progress">
              <i
                style={{
                  width: `${(day.seconds / maxSeconds) * 100}%`,
                }}
              />
            </div>

            <strong>{formatDuration(day.seconds)}</strong>
          </div>
        ))}
      </div>

      {legacySessions > 0 && (
        <p className="analytics-note">
          {legacySessions} older session(s) have no saved date and are
          excluded from the weekly chart.
        </p>
      )}

      <p className="analytics-note">
        Task counts show current board status, not tasks completed during
        this week.
      </p>
    </section>
  );
}

export default WeeklyAnalytics;
