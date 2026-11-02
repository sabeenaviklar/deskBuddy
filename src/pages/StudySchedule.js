import React, { useState, useEffect } from "react";

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const PRESET_SUBJECTS = [
  "Mathematics",
  "Physics",
  "PPS",
  "BEE",
  "Chemistry",
  "Data Structures",
  "English",
];

const DEFAULT_SCHEDULE = [
  {
    id: 1,
    subject: "Mathematics",
    topic: "Calculus & Linear Algebra revision",
    day: "Monday",
    startTime: "09:00",
    endTime: "10:30",
    priority: "High",
    completed: false,
  },
  {
    id: 2,
    subject: "Physics",
    topic: "Electromagnetism problems",
    day: "Monday",
    startTime: "11:00",
    endTime: "12:30",
    priority: "Medium",
    completed: true,
  },
  {
    id: 3,
    subject: "PPS",
    topic: "Array & Pointer operations",
    day: "Tuesday",
    startTime: "14:00",
    endTime: "15:30",
    priority: "High",
    completed: false,
  },
  {
    id: 4,
    subject: "BEE",
    topic: "AC circuits & mesh analysis",
    day: "Wednesday",
    startTime: "10:00",
    endTime: "11:30",
    priority: "Medium",
    completed: false,
  },
];

// Helper: Get today's day name matching DAYS_OF_WEEK
const getTodayDayName = () => {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return dayNames[new Date().getDay()];
};

// Helper: Format 24-hour time "09:00" to "9:00 AM"
export const formatTime12 = (time24) => {
  if (!time24) return "";
  const [hourStr, minStr] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const minute = minStr || "00";
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
};

// Helper: Calculate duration in minutes and return friendly string
export const calculateDuration = (startTime, endTime) => {
  if (!startTime || !endTime) return "";
  const [startH, startM] = startTime.split(":").map(Number);
  const [endH, endM] = endTime.split(":").map(Number);
  let totalMinutes = endH * 60 + endM - (startH * 60 + startM);
  if (totalMinutes <= 0) return "";
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  if (hours > 0 && mins > 0) return `${hours}h ${mins}m`;
  if (hours > 0) return `${hours}h`;
  return `${mins}m`;
};

// Helper: Check if slot is active right now
const isSlotActiveNow = (day, startTime, endTime) => {
  const today = getTodayDayName();
  if (today !== day) return false;

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const [startH, startM] = startTime.split(":").map(Number);
  const [endH, endM] = endTime.split(":").map(Number);
  const startMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;

  return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
};

function StudySchedule() {
  const todayName = getTodayDayName();
  const [selectedDay, setSelectedDay] = useState(todayName);

  const [schedule, setSchedule] = useState(() => {
    try {
      const saved = localStorage.getItem("deskbuddy_study_schedule");
      return saved ? JSON.parse(saved) : DEFAULT_SCHEDULE;
    } catch {
      return DEFAULT_SCHEDULE;
    }
  });

  const [formData, setFormData] = useState({
    subject: "",
    topic: "",
    day: todayName,
    startTime: "09:00",
    endTime: "10:30",
    priority: "Medium",
  });

  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("deskbuddy_study_schedule", JSON.stringify(schedule));
  }, [schedule]);

  // Form input handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFormError("");
  };

  // Add new session
  const handleAddSession = (e) => {
    e.preventDefault();

    if (!formData.subject.trim()) {
      setFormError("Please enter or select a subject name.");
      return;
    }
    if (!formData.startTime || !formData.endTime) {
      setFormError("Please set both start and end times.");
      return;
    }

    const [startH, startM] = formData.startTime.split(":").map(Number);
    const [endH, endM] = formData.endTime.split(":").map(Number);
    if (startH * 60 + startM >= endH * 60 + endM) {
      setFormError("End time must be later than start time.");
      return;
    }

    const newSession = {
      id: Date.now(),
      subject: formData.subject.trim(),
      topic: formData.topic.trim(),
      day: formData.day,
      startTime: formData.startTime,
      endTime: formData.endTime,
      priority: formData.priority,
      completed: false,
    };

    setSchedule((prev) => [...prev, newSession]);
    setFormSuccess(`Scheduled "${formData.subject.trim()}" successfully!`);
    setTimeout(() => setFormSuccess(""), 3000);

    // Switch view to the day added
    setSelectedDay(formData.day);

    // Reset subject and topic
    setFormData((prev) => ({
      ...prev,
      subject: "",
      topic: "",
      day: prev.day,
    }));
    setShowAddForm(false);
  };

  // Toggle completion
  const toggleCompleted = (id) => {
    setSchedule((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // Delete session
  const handleDeleteSession = (id) => {
    setSchedule((prev) => prev.filter((item) => item.id !== id));
  };

  // Filter schedule based on selected day
  const filteredSchedule =
    selectedDay === "All"
      ? [...schedule].sort((a, b) => {
          const dayDiff =
            DAYS_OF_WEEK.indexOf(a.day) - DAYS_OF_WEEK.indexOf(b.day);
          if (dayDiff !== 0) return dayDiff;
          return a.startTime.localeCompare(b.startTime);
        })
      : schedule
          .filter((item) => item.day === selectedDay)
          .sort((a, b) => a.startTime.localeCompare(b.startTime));

  // Compute daily stats for the currently selected day (or today if All)
  const statsDay = selectedDay === "All" ? todayName : selectedDay;
  const dayItems = schedule.filter((item) => item.day === statsDay);
  const totalSessions = dayItems.length;
  const completedSessions = dayItems.filter((i) => i.completed).length;

  const totalMinutes = dayItems.reduce((acc, item) => {
    const [startH, startM] = item.startTime.split(":").map(Number);
    const [endH, endM] = item.endTime.split(":").map(Number);
    return acc + Math.max(0, endH * 60 + endM - (startH * 60 + startM));
  }, 0);

  const totalStudyHoursFormatted =
    totalMinutes > 0
      ? `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`
      : "0h";

  return (
    <div className="schedule-container">
      {/* Top Header */}
      <div className="schedule-header">
        <div>
          <h2>📅 Study Schedule</h2>
          <p className="schedule-subtitle">
            Organize your daily study timetable and stay ahead of your goals
          </p>
        </div>
        <button
          className="primary-btn schedule-add-toggle-btn"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "✖ Close Form" : "➕ Add Study Session"}
        </button>
      </div>

      {/* Metrics Row */}
      <div className="schedule-metrics-row">
        <div className="metric-card">
          <span className="metric-label">{statsDay}'s Study Time</span>
          <span className="metric-value">{totalStudyHoursFormatted}</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Planned Sessions</span>
          <span className="metric-value">{totalSessions}</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Completed</span>
          <span className="metric-value">
            {completedSessions} / {totalSessions}
          </span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Progress</span>
          <span className="metric-value">
            {totalSessions > 0
              ? `${Math.round((completedSessions / totalSessions) * 100)}%`
              : "0%"}
          </span>
        </div>
      </div>

      {/* Form Feedback Messages */}
      {formSuccess && <div className="schedule-success">{formSuccess}</div>}

      {/* Add Study Session Form */}
      {showAddForm && (
        <div className="schedule-form-card">
          <h3>Add New Study Session</h3>
          {formError && <div className="schedule-error">{formError}</div>}

          <form onSubmit={handleAddSession}>
            <div className="schedule-form-grid">
              <div className="form-group">
                <label htmlFor="schedule-subject">Subject *</label>
                <input
                  id="schedule-subject"
                  type="text"
                  name="subject"
                  placeholder="e.g. Mathematics, Physics..."
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
                {/* Preset Chips */}
                <div className="preset-chips">
                  {PRESET_SUBJECTS.map((sub) => (
                    <button
                      type="button"
                      key={sub}
                      className="preset-chip"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, subject: sub }))
                      }
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="schedule-topic">Topic / Notes (Optional)</label>
                <input
                  id="schedule-topic"
                  type="text"
                  name="topic"
                  placeholder="e.g. Chapter 4 Exercises, Past Papers"
                  value={formData.topic}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="schedule-day">Day of Week *</label>
                <select
                  id="schedule-day"
                  name="day"
                  value={formData.day}
                  onChange={handleInputChange}
                >
                  {DAYS_OF_WEEK.map((d) => (
                    <option key={d} value={d}>
                      {d} {d === todayName ? "(Today)" : ""}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="schedule-priority">Priority</label>
                <select
                  id="schedule-priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                >
                  <option value="High">🔴 High Priority</option>
                  <option value="Medium">🟡 Medium Priority</option>
                  <option value="Low">🟢 Low Priority</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="schedule-start-time">Start Time *</label>
                <input
                  id="schedule-start-time"
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="schedule-end-time">End Time *</label>
                <input
                  id="schedule-end-time"
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-actions-row">
              <button type="submit" className="primary-btn">
                Save to Schedule
              </button>
              <button
                type="button"
                className="secondary-btn"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Day Selector Navigation */}
      <div className="schedule-day-tabs">
        <button
          className={`day-tab ${selectedDay === todayName ? "today-tab" : ""} ${
            selectedDay === todayName ? "active" : ""
          }`}
          onClick={() => setSelectedDay(todayName)}
        >
          Today ({todayName.slice(0, 3)})
        </button>

        {DAYS_OF_WEEK.map((day) => {
          const count = schedule.filter((s) => s.day === day).length;
          return (
            <button
              key={day}
              className={`day-tab ${selectedDay === day ? "active" : ""}`}
              onClick={() => setSelectedDay(day)}
            >
              {day}
              {count > 0 && <span className="day-count-badge">{count}</span>}
            </button>
          );
        })}

        <button
          className={`day-tab ${selectedDay === "All" ? "active" : ""}`}
          onClick={() => setSelectedDay("All")}
        >
          All Days ({schedule.length})
        </button>
      </div>

      {/* Schedule Items List */}
      <div className="schedule-list-section">
        <div className="schedule-list-header">
          <h3>
            {selectedDay === "All"
              ? "All Scheduled Sessions"
              : `${selectedDay}'s Timetable`}
          </h3>
          <span className="schedule-items-count">
            {filteredSchedule.length} session
            {filteredSchedule.length === 1 ? "" : "s"}
          </span>
        </div>

        {filteredSchedule.length === 0 ? (
          <div className="schedule-empty-state">
            <div className="empty-icon">📖</div>
            <h4>No sessions scheduled for {selectedDay}</h4>
            <p>Plan your study timetable by adding your subject and time slot.</p>
            <button
              className="primary-btn"
              onClick={() => {
                setFormData((prev) => ({
                  ...prev,
                  day: selectedDay === "All" ? todayName : selectedDay,
                }));
                setShowAddForm(true);
              }}
            >
              ➕ Add Session for {selectedDay === "All" ? todayName : selectedDay}
            </button>
          </div>
        ) : (
          <div className="schedule-items-grid">
            {filteredSchedule.map((session) => {
              const activeNow = isSlotActiveNow(
                session.day,
                session.startTime,
                session.endTime
              );
              const duration = calculateDuration(
                session.startTime,
                session.endTime
              );

              return (
                <div
                  key={session.id}
                  className={`schedule-card ${
                    session.completed ? "is-completed" : ""
                  } ${activeNow ? "is-active-now" : ""}`}
                >
                  <div className="schedule-card-left">
                    <div className="schedule-time-box">
                      <span className="time-start">
                        {formatTime12(session.startTime)}
                      </span>
                      <span className="time-divider">↓</span>
                      <span className="time-end">
                        {formatTime12(session.endTime)}
                      </span>
                      {duration && (
                        <span className="time-duration">{duration}</span>
                      )}
                    </div>
                  </div>

                  <div className="schedule-card-middle">
                    <div className="schedule-card-topline">
                      <span className="schedule-subject-name">
                        {session.subject}
                      </span>
                      {session.day && selectedDay === "All" && (
                        <span className="schedule-day-badge">
                          {session.day}
                        </span>
                      )}
                      <span
                        className={`schedule-priority-pill priority-${(
                          session.priority || "Medium"
                        ).toLowerCase()}`}
                      >
                        {session.priority || "Medium"}
                      </span>
                      {activeNow && (
                        <span className="schedule-now-badge">
                          🟢 Active Now
                        </span>
                      )}
                    </div>

                    {session.topic ? (
                      <p className="schedule-topic">{session.topic}</p>
                    ) : (
                      <p className="schedule-topic-empty">No notes added</p>
                    )}
                  </div>

                  <div className="schedule-card-right">
                    <button
                      className={`schedule-complete-btn ${
                        session.completed ? "btn-done" : ""
                      }`}
                      onClick={() => toggleCompleted(session.id)}
                      title={
                        session.completed
                          ? "Mark as uncompleted"
                          : "Mark as completed"
                      }
                    >
                      {session.completed ? "✅ Completed" : "Mark Done"}
                    </button>
                    <button
                      className="schedule-delete-btn"
                      onClick={() => handleDeleteSession(session.id)}
                      title="Delete session"
                    >
                      ✖
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudySchedule;
