import { useState, useEffect } from "react";
import "../App.css";

export const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

export const SUBJECT_PRESETS = [
  "Mathematics",
  "Physics",
  "PPS",
  "BEE",
  "Computer Networks",
  "Data Structures",
  "English",
  "Chemistry"
];

export const COLOR_PALETTE = [
  { label: "Ocean Blue", hex: "#3b82f6" },
  { label: "Emerald Green", hex: "#10b981" },
  { label: "Sunset Amber", hex: "#f59e0b" },
  { label: "Royal Purple", hex: "#8b5cf6" },
  { label: "Coral Red", hex: "#f43f5e" },
  { label: "Teal Cyan", hex: "#06b6d4" },
  { label: "Indigo", hex: "#6366f1" }
];

export const SESSION_TYPES = [
  "Deep Study",
  "Lecture",
  "Revision",
  "Practice",
  "Exam Prep",
  "Assignment"
];

export const DEFAULT_TIMETABLE = [
  {
    id: "sample_1",
    subject: "Mathematics",
    day: "Monday",
    startTime: "09:00",
    endTime: "10:30",
    topic: "Calculus & Differential Equations",
    color: "#3b82f6",
    sessionType: "Lecture",
    completed: true
  },
  {
    id: "sample_2",
    subject: "Physics",
    day: "Monday",
    startTime: "11:00",
    endTime: "12:30",
    topic: "Electromagnetism & Wave Optics",
    color: "#10b981",
    sessionType: "Deep Study",
    completed: false
  },
  {
    id: "sample_3",
    subject: "PPS",
    day: "Monday",
    startTime: "14:00",
    endTime: "15:30",
    topic: "Programming in C - Pointers & Memory",
    color: "#f59e0b",
    sessionType: "Practice",
    completed: false
  },
  {
    id: "sample_4",
    subject: "BEE",
    day: "Tuesday",
    startTime: "09:30",
    endTime: "11:00",
    topic: "Circuit Theorems & AC Analysis",
    color: "#8b5cf6",
    sessionType: "Lecture",
    completed: false
  },
  {
    id: "sample_5",
    subject: "Mathematics",
    day: "Tuesday",
    startTime: "11:30",
    endTime: "13:00",
    topic: "Linear Algebra & Eigenvalues",
    color: "#3b82f6",
    sessionType: "Deep Study",
    completed: false
  },
  {
    id: "sample_6",
    subject: "Physics",
    day: "Tuesday",
    startTime: "15:00",
    endTime: "16:30",
    topic: "Quantum Physics Chapter 2",
    color: "#10b981",
    sessionType: "Revision",
    completed: false
  },
  {
    id: "sample_7",
    subject: "PPS",
    day: "Wednesday",
    startTime: "09:00",
    endTime: "10:30",
    topic: "Data Structures - Stacks and Queues",
    color: "#f59e0b",
    sessionType: "Lecture",
    completed: false
  },
  {
    id: "sample_8",
    subject: "BEE",
    day: "Wednesday",
    startTime: "11:00",
    endTime: "12:30",
    topic: "Transformers & Induction Machines",
    color: "#8b5cf6",
    sessionType: "Practice",
    completed: false
  },
  {
    id: "sample_9",
    subject: "Mathematics",
    day: "Wednesday",
    startTime: "14:00",
    endTime: "15:30",
    topic: "Vector Calculus Quiz Preparation",
    color: "#3b82f6",
    sessionType: "Exam Prep",
    completed: false
  },
  {
    id: "sample_10",
    subject: "Physics",
    day: "Thursday",
    startTime: "10:00",
    endTime: "11:30",
    topic: "Thermodynamics & Carnot Cycle",
    color: "#10b981",
    sessionType: "Lecture",
    completed: false
  },
  {
    id: "sample_11",
    subject: "PPS",
    day: "Thursday",
    startTime: "13:30",
    endTime: "15:00",
    topic: "Lab Problem Set 4 Solutions",
    color: "#f59e0b",
    sessionType: "Practice",
    completed: false
  },
  {
    id: "sample_12",
    subject: "Mathematics",
    day: "Friday",
    startTime: "09:00",
    endTime: "10:30",
    topic: "Differential Equations Workshop",
    color: "#3b82f6",
    sessionType: "Deep Study",
    completed: false
  },
  {
    id: "sample_13",
    subject: "BEE",
    day: "Friday",
    startTime: "11:00",
    endTime: "12:30",
    topic: "Weekly Review & Lab Summary",
    color: "#8b5cf6",
    sessionType: "Revision",
    completed: false
  },
  {
    id: "sample_14",
    subject: "PPS",
    day: "Saturday",
    startTime: "10:30",
    endTime: "12:30",
    topic: "Desk Buddy Project Implementation",
    color: "#f59e0b",
    sessionType: "Deep Study",
    completed: false
  },
  {
    id: "sample_15",
    subject: "Weekly Review",
    day: "Sunday",
    startTime: "11:00",
    endTime: "12:30",
    topic: "Review Week's Goals & Plan Ahead",
    color: "#06b6d4",
    sessionType: "Revision",
    completed: false
  }
];

export const getTodayName = () => {
  const dayIndex = new Date().getDay();
  // In JS getDay() returns 0 for Sunday, 1 for Monday... 6 for Saturday
  const mapping = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  return mapping[dayIndex];
};

export const formatTime12h = (time24) => {
  if (!time24) return "";
  const parts = time24.split(":");
  let hours = parseInt(parts[0], 10);
  const minutes = parts[1] || "00";
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${hours}:${minutes} ${ampm}`;
};

export const calculateDurationMinutes = (startTime, endTime) => {
  if (!startTime || !endTime) return 0;
  const [h1, m1] = startTime.split(":").map(Number);
  const [h2, m2] = endTime.split(":").map(Number);
  const total1 = h1 * 60 + m1;
  const total2 = h2 * 60 + m2;
  return Math.max(0, total2 - total1);
};

export const formatDuration = (minutes) => {
  if (minutes <= 0) return "0m";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h > 0 && m > 0) return `${h}h ${m}m`;
  if (h > 0) return `${h}h`;
  return `${m}m`;
};

export const isSessionActiveNow = (day, startTime, endTime) => {
  if (day !== getTodayName()) return false;
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const [h1, m1] = startTime.split(":").map(Number);
  const [h2, m2] = endTime.split(":").map(Number);
  const start = h1 * 60 + m1;
  const end = h2 * 60 + m2;
  return currentMinutes >= start && currentMinutes < end;
};

export const isSessionUpcomingToday = (day, startTime) => {
  if (day !== getTodayName()) return false;
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const [h1, m1] = startTime.split(":").map(Number);
  const start = h1 * 60 + m1;
  return start > currentMinutes;
};

function StudyTimetable({ onNavigate }) {
  const today = getTodayName();

  const [timetable, setTimetable] = useState(() => {
    const saved = localStorage.getItem("study_timetable");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse study_timetable from localStorage", e);
      }
    }
    return DEFAULT_TIMETABLE;
  });

  const [selectedDay, setSelectedDay] = useState(today);
  const [viewMode, setViewMode] = useState("daily"); // "daily" or "weekly"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filterQuery, setFilterQuery] = useState("");

  const initialFormState = {
    subject: "",
    day: selectedDay,
    startTime: "09:00",
    endTime: "10:30",
    topic: "",
    color: COLOR_PALETTE[0].hex,
    sessionType: "Deep Study",
    applyToAllWeekdays: false
  };

  const [formData, setFormData] = useState(initialFormState);
  const [formError, setFormError] = useState("");

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("study_timetable", JSON.stringify(timetable));
  }, [timetable]);

  // Keep modal day synced with selected day when opening
  const handleOpenAddModal = (targetDay = selectedDay) => {
    setEditingId(null);
    setFormData({
      ...initialFormState,
      day: targetDay
    });
    setFormError("");
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (session) => {
    setEditingId(session.id);
    setFormData({
      subject: session.subject,
      day: session.day,
      startTime: session.startTime,
      endTime: session.endTime,
      topic: session.topic || "",
      color: session.color || COLOR_PALETTE[0].hex,
      sessionType: session.sessionType || "Deep Study",
      applyToAllWeekdays: false
    });
    setFormError("");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormError("");
  };

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
    if (formError) setFormError("");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!formData.subject.trim()) {
      setFormError("Please enter or select a subject name.");
      return;
    }

    if (!formData.startTime || !formData.endTime) {
      setFormError("Please select both a start and end time.");
      return;
    }

    const duration = calculateDurationMinutes(formData.startTime, formData.endTime);
    if (duration <= 0) {
      setFormError("End time must be after start time.");
      return;
    }

    if (editingId) {
      // Update existing
      setTimetable((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                subject: formData.subject.trim(),
                day: formData.day,
                startTime: formData.startTime,
                endTime: formData.endTime,
                topic: formData.topic.trim(),
                color: formData.color,
                sessionType: formData.sessionType
              }
            : item
        )
      );
    } else {
      // Add new
      if (formData.applyToAllWeekdays) {
        // Create 5 entries: Monday to Friday
        const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
        const newSessions = weekdays.map((weekday, idx) => ({
          id: `slot_${Date.now()}_${idx}`,
          subject: formData.subject.trim(),
          day: weekday,
          startTime: formData.startTime,
          endTime: formData.endTime,
          topic: formData.topic.trim(),
          color: formData.color,
          sessionType: formData.sessionType,
          completed: false
        }));

        setTimetable((prev) => [...prev, ...newSessions]);
      } else {
        const newSession = {
          id: `slot_${Date.now()}`,
          subject: formData.subject.trim(),
          day: formData.day,
          startTime: formData.startTime,
          endTime: formData.endTime,
          topic: formData.topic.trim(),
          color: formData.color,
          sessionType: formData.sessionType,
          completed: false
        };

        setTimetable((prev) => [...prev, newSession]);
      }
    }

    handleCloseModal();
  };

  const handleDeleteSession = (id) => {
    setTimetable((prev) => prev.filter((item) => item.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTimetable((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleResetDefaults = () => {
    if (window.confirm("Reset timetable back to the recommended schedule?")) {
      setTimetable(DEFAULT_TIMETABLE);
    }
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all timetable entries?")) {
      setTimetable([]);
    }
  };

  // Filter sessions for selected day
  const daySessions = timetable
    .filter((item) => item.day === selectedDay)
    .filter((item) => {
      if (!filterQuery) return true;
      const q = filterQuery.toLowerCase();
      return (
        item.subject.toLowerCase().includes(q) ||
        (item.topic && item.topic.toLowerCase().includes(q)) ||
        (item.sessionType && item.sessionType.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  // Compute daily metrics
  const totalDayMinutes = daySessions.reduce(
    (acc, curr) => acc + calculateDurationMinutes(curr.startTime, curr.endTime),
    0
  );
  const completedSessionsCount = daySessions.filter((s) => s.completed).length;
  const completionPercentage =
    daySessions.length > 0
      ? Math.round((completedSessionsCount / daySessions.length) * 100)
      : 0;

  return (
    <div className="timetable-container">
      {/* ================= HEADER ================= */}
      <div className="timetable-header">
        <div>
          <h1 className="timetable-title">📅 Study Timetable</h1>
          <p className="timetable-subtitle">
            Plan your study sessions, organize time slots, and keep your daily routine on track.
          </p>
        </div>

        <div className="timetable-header-actions">
          <div className="view-mode-toggle">
            <button
              className={`toggle-btn ${viewMode === "daily" ? "active" : ""}`}
              onClick={() => setViewMode("daily")}
              title="Daily Schedule View"
            >
              📋 Daily Schedule
            </button>
            <button
              className={`toggle-btn ${viewMode === "weekly" ? "active" : ""}`}
              onClick={() => setViewMode("weekly")}
              title="Weekly Overview"
            >
              🗓️ Weekly Overview
            </button>
          </div>

          <button
            className="primary-btn add-session-btn"
            onClick={() => handleOpenAddModal(selectedDay)}
          >
            + Add Subject & Time
          </button>
        </div>
      </div>

      {/* ================= CONTROLS & DAY TABS ================= */}
      <div className="timetable-nav-bar">
        <div className="day-tabs">
          {DAYS_OF_WEEK.map((day) => {
            const count = timetable.filter((s) => s.day === day).length;
            const isToday = day === today;
            const isSelected = day === selectedDay;

            return (
              <button
                key={day}
                className={`day-tab ${isSelected ? "selected" : ""} ${
                  isToday ? "is-today" : ""
                }`}
                onClick={() => setSelectedDay(day)}
              >
                <div className="day-tab-content">
                  <span className="day-name">{day.slice(0, 3)}</span>
                  {isToday && <span className="today-badge">Today</span>}
                  <span className="session-count-badge">{count}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="timetable-sub-actions">
          {selectedDay !== today && (
            <button
              className="quick-today-btn"
              onClick={() => setSelectedDay(today)}
            >
              📍 Go to Today ({today})
            </button>
          )}

          <div className="search-filter-box">
            <input
              type="text"
              placeholder="Filter subjects or topics..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
            />
            {filterQuery && (
              <button
                className="clear-search-btn"
                onClick={() => setFilterQuery("")}
              >
                ✖
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ================= DAILY VIEW ================= */}
      {viewMode === "daily" && (
        <div className="daily-view-layout">
          {/* Daily Stats Card */}
          <div className="daily-summary-card">
            <div className="summary-info">
              <div>
                <h2>
                  {selectedDay}’s Schedule
                  {selectedDay === today && (
                    <span className="live-today-tag">⚡ Current Day</span>
                  )}
                </h2>
                <p className="summary-caption">
                  {daySessions.length} {daySessions.length === 1 ? "session" : "sessions"} planned • Total time:{" "}
                  <strong>{formatDuration(totalDayMinutes)}</strong>
                </p>
              </div>

              <div className="progress-stat">
                <span className="progress-number">
                  {completedSessionsCount} / {daySessions.length} Completed
                </span>
                <span className="progress-percent">{completionPercentage}%</span>
              </div>
            </div>

            <div className="progress-bar-track">
              <div
                className="progress-bar-fill"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          {/* Daily Schedule List */}
          <div className="schedule-timeline">
            {daySessions.length === 0 ? (
              <div className="empty-timetable-card">
                <div className="empty-icon">📖</div>
                <h3>No study sessions scheduled for {selectedDay}</h3>
                <p>
                  {filterQuery
                    ? `No sessions matching "${filterQuery}" found for this day.`
                    : "Plan your day! Add your subjects and allocate time slots to build a productive study rhythm."}
                </p>
                <button
                  className="primary-btn"
                  onClick={() => handleOpenAddModal(selectedDay)}
                >
                  + Add Study Session for {selectedDay}
                </button>
              </div>
            ) : (
              daySessions.map((session) => {
                const isActive = isSessionActiveNow(
                  session.day,
                  session.startTime,
                  session.endTime
                );
                const isUpcoming = isSessionUpcomingToday(
                  session.day,
                  session.startTime
                );
                const duration = calculateDurationMinutes(
                  session.startTime,
                  session.endTime
                );

                return (
                  <div
                    key={session.id}
                    className={`session-card-item ${
                      session.completed ? "completed-session" : ""
                    } ${isActive ? "active-now-session" : ""}`}
                    style={{ borderLeftColor: session.color || "#3b82f6" }}
                  >
                    {/* Checkbox */}
                    <div className="session-check-col">
                      <input
                        type="checkbox"
                        checked={session.completed}
                        onChange={() => handleToggleComplete(session.id)}
                        title={
                          session.completed
                            ? "Mark as incomplete"
                            : "Mark as completed"
                        }
                      />
                    </div>

                    {/* Time Column */}
                    <div className="session-time-col">
                      <div className="time-range">
                        <span className="time-start">
                          {formatTime12h(session.startTime)}
                        </span>
                        <span className="time-divider">→</span>
                        <span className="time-end">
                          {formatTime12h(session.endTime)}
                        </span>
                      </div>
                      <span className="duration-tag">
                        ⏱️ {formatDuration(duration)}
                      </span>
                    </div>

                    {/* Main Details Column */}
                    <div className="session-details-col">
                      <div className="session-title-row">
                        <h3 className="subject-heading">{session.subject}</h3>
                        <span
                          className="session-type-badge"
                          style={{
                            backgroundColor: `${session.color}22`,
                            color: session.color,
                            borderColor: `${session.color}44`
                          }}
                        >
                          {session.sessionType || "Study"}
                        </span>

                        {isActive && (
                          <span className="active-glow-badge">
                            🟢 In Progress
                          </span>
                        )}

                        {isUpcoming && !session.completed && (
                          <span className="upcoming-badge">⏳ Upcoming</span>
                        )}

                        {session.completed && (
                          <span className="done-badge">✓ Done</span>
                        )}
                      </div>

                      {session.topic && (
                        <p className="session-topic-text">
                          📝 {session.topic}
                        </p>
                      )}
                    </div>

                    {/* Actions Column */}
                    <div className="session-actions-col">
                      {onNavigate && (
                        <button
                          className="action-icon-btn timer-btn"
                          onClick={() => onNavigate("time")}
                          title="Open Time Tracker"
                        >
                          ⏱️ Track
                        </button>
                      )}
                      <button
                        className="action-icon-btn edit-btn"
                        onClick={() => handleOpenEditModal(session)}
                        title="Edit Session"
                      >
                        ✏️
                      </button>
                      <button
                        className="action-icon-btn delete-btn"
                        onClick={() => handleDeleteSession(session.id)}
                        title="Delete Session"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ================= WEEKLY GRID VIEW ================= */}
      {viewMode === "weekly" && (
        <div className="weekly-grid-layout">
          <div className="weekly-grid">
            {DAYS_OF_WEEK.map((day) => {
              const slots = timetable
                .filter((item) => item.day === day)
                .sort((a, b) => a.startTime.localeCompare(b.startTime));
              const isToday = day === today;

              return (
                <div
                  key={day}
                  className={`weekly-col ${isToday ? "weekly-today" : ""}`}
                >
                  <div className="weekly-col-header">
                    <div className="header-text">
                      <h4>{day}</h4>
                      {isToday && <span className="today-chip">Today</span>}
                    </div>
                    <button
                      className="add-small-btn"
                      onClick={() => handleOpenAddModal(day)}
                      title={`Add session to ${day}`}
                    >
                      +
                    </button>
                  </div>

                  <div className="weekly-col-cards">
                    {slots.length === 0 ? (
                      <div className="weekly-empty-slot">No study sessions</div>
                    ) : (
                      slots.map((s) => (
                        <div
                          key={s.id}
                          className={`weekly-slot-card ${
                            s.completed ? "completed-slot" : ""
                          }`}
                          style={{ borderLeftColor: s.color || "#3b82f6" }}
                          onClick={() => handleOpenEditModal(s)}
                          title="Click to edit"
                        >
                          <div className="slot-time">
                            {formatTime12h(s.startTime)} - {formatTime12h(s.endTime)}
                          </div>
                          <div className="slot-subject">{s.subject}</div>
                          {s.topic && (
                            <div className="slot-topic-preview">{s.topic}</div>
                          )}
                          <div className="slot-type-chip">{s.sessionType}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= FOOTER UTILITIES ================= */}
      <div className="timetable-footer">
        <div className="footer-legend">
          <span>💡 Tip: Click any checkbox to mark a session completed. Time slots are saved automatically.</span>
        </div>
        <div className="footer-actions">
          <button className="text-link-btn" onClick={handleResetDefaults}>
            🔄 Reset to Default Schedule
          </button>
          <button className="text-link-btn danger-link" onClick={handleClearAll}>
            🗑️ Clear All Sessions
          </button>
        </div>
      </div>

      {/* ================= ADD / EDIT MODAL ================= */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={handleCloseModal}>
          <div
            className="timetable-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>
                {editingId ? "✏️ Edit Study Session" : "➕ Add Study Session"}
              </h3>
              <button className="close-btn" onClick={handleCloseModal}>
                ✖
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="timetable-form">
              {formError && <div className="modal-error-alert">{formError}</div>}

              {/* Subject Input & Presets */}
              <div className="form-group">
                <label htmlFor="subject-input">
                  Subject Name <span className="req">*</span>
                </label>
                <input
                  id="subject-input"
                  type="text"
                  placeholder="e.g. Mathematics, Physics, PPS, BEE..."
                  value={formData.subject}
                  onChange={(e) => handleFormChange("subject", e.target.value)}
                  autoFocus
                />

                {/* Quick Subject Chips */}
                <div className="preset-chips">
                  <span className="chips-label">Quick select:</span>
                  {SUBJECT_PRESETS.map((preset) => (
                    <button
                      type="button"
                      key={preset}
                      className={`chip-btn ${
                        formData.subject.toLowerCase() === preset.toLowerCase()
                          ? "chip-active"
                          : ""
                      }`}
                      onClick={() => handleFormChange("subject", preset)}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Day & Session Type */}
              <div className="form-row">
                <div className="form-group flex-1">
                  <label htmlFor="day-select">
                    Day of Week <span className="req">*</span>
                  </label>
                  <select
                    id="day-select"
                    value={formData.day}
                    onChange={(e) => handleFormChange("day", e.target.value)}
                  >
                    {DAYS_OF_WEEK.map((day) => (
                      <option key={day} value={day}>
                        {day} {day === today ? "(Today)" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group flex-1">
                  <label htmlFor="type-select">Session Type</label>
                  <select
                    id="type-select"
                    value={formData.sessionType}
                    onChange={(e) =>
                      handleFormChange("sessionType", e.target.value)
                    }
                  >
                    {SESSION_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Time Slot: Start and End */}
              <div className="form-row">
                <div className="form-group flex-1">
                  <label htmlFor="start-time-input">
                    Start Time <span className="req">*</span>
                  </label>
                  <input
                    id="start-time-input"
                    type="time"
                    value={formData.startTime}
                    onChange={(e) =>
                      handleFormChange("startTime", e.target.value)
                    }
                  />
                </div>

                <div className="form-group flex-1">
                  <label htmlFor="end-time-input">
                    End Time <span className="req">*</span>
                  </label>
                  <input
                    id="end-time-input"
                    type="time"
                    value={formData.endTime}
                    onChange={(e) =>
                      handleFormChange("endTime", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Duration Preview */}
              <div className="duration-preview-box">
                <span>Calculated Duration:</span>
                <strong>
                  {calculateDurationMinutes(formData.startTime, formData.endTime) > 0
                    ? formatDuration(
                        calculateDurationMinutes(
                          formData.startTime,
                          formData.endTime
                        )
                      )
                    : "Invalid (End time must be after start time)"}
                </strong>
              </div>

              {/* Topic / Notes */}
              <div className="form-group">
                <label htmlFor="topic-input">
                  Topic / Goal / Notes <span className="opt">(Optional)</span>
                </label>
                <input
                  id="topic-input"
                  type="text"
                  placeholder="e.g. Chapter 4 Integrals practice, Revise lecture notes..."
                  value={formData.topic}
                  onChange={(e) => handleFormChange("topic", e.target.value)}
                />
              </div>

              {/* Color Tag Selection */}
              <div className="form-group">
                <label>Subject Color Tag</label>
                <div className="color-picker-row">
                  {COLOR_PALETTE.map((c) => (
                    <button
                      type="button"
                      key={c.hex}
                      className={`color-swatch-btn ${
                        formData.color === c.hex ? "selected-swatch" : ""
                      }`}
                      style={{ backgroundColor: c.hex }}
                      onClick={() => handleFormChange("color", c.hex)}
                      title={c.label}
                    />
                  ))}
                </div>
              </div>

              {/* Repeat on Weekdays option (only for new slots) */}
              {!editingId && (
                <div className="checkbox-row">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.applyToAllWeekdays}
                      onChange={(e) =>
                        handleFormChange("applyToAllWeekdays", e.target.checked)
                      }
                    />
                    <span>Repeat this session every weekday (Monday – Friday)</span>
                  </label>
                </div>
              )}

              {/* Actions */}
              <div className="modal-actions-row">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button type="submit" className="primary-btn submit-btn">
                  {editingId ? "Save Changes" : "Add to Timetable"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudyTimetable;

