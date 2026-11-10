import { useState, useEffect } from "react";

/* ======================
   MAIN COMPONENT
====================== */
function LeaveTracker() {
  const today = new Date();

  const [workingDays, setWorkingDays] = useState(
    Number(localStorage.getItem("workingDays")) || 200
  );

  const [leaves, setLeaves] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("leaveData")) || [];
    } catch {
      return [];
    }
  });

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const [selectedDate, setSelectedDate] = useState(null);
  const [reason, setReason] = useState("");

  useEffect(() => {
    localStorage.setItem("leaveData", JSON.stringify(leaves));
    localStorage.setItem("workingDays", workingDays);
  }, [leaves, workingDays]);

  const addLeave = () => {
    if (!reason.trim()) return alert("Please enter reason");

    setLeaves([...leaves, { date: selectedDate, reason: reason.trim() }]);
    setSelectedDate(null);
    setReason("");
  };

  const removeLeave = (dateToRemove) => {
    setLeaves(leaves.filter((l) => l.date !== dateToRemove));
    setSelectedDate(null);
    setReason("");
  };

  const leaveCount = leaves.length;
  const leavePercent = workingDays
    ? Math.round((leaveCount / workingDays) * 100)
    : 0;

  const existingLeave = selectedDate ? leaves.find((l) => l.date === selectedDate) : null;

  return (
    <div className="panel">
      <h2>Leave Tracker</h2>

      {/* WORKING DAYS */}
      <div className="leave-input">
        <label>Total Working Days</label>
        <input
          type="number"
          value={workingDays}
          onChange={(e) => setWorkingDays(Math.max(1, Number(e.target.value)))}
        />
      </div>

      {/* DONUT */}
      <DonutChart percent={leavePercent} />
      <p className="leave-count">
        Leaves Taken: <b>{leaveCount}</b> / {workingDays}
      </p>

      {/* CALENDAR */}
      <Calendar
        month={month}
        year={year}
        setMonth={setMonth}
        setYear={setYear}
        leaves={leaves}
        onSelectDate={setSelectedDate}
      />

      {/* MODAL */}
      {selectedDate && (
        <div className="leave-modal">
          {existingLeave ? (
            <>
              <h4>Leave Details</h4>
              <p><strong>Date:</strong> {selectedDate}</p>
              <p><strong>Reason:</strong> {existingLeave.reason}</p>
              <div className="modal-actions">
                <button
                  type="button"
                  style={{ background: "#ef4444", color: "#fff" }}
                  onClick={() => removeLeave(selectedDate)}
                >
                  Remove Leave
                </button>
                <button type="button" onClick={() => setSelectedDate(null)}>
                  Close
                </button>
              </div>
            </>
          ) : (
            <>
              <h4>Add Leave</h4>
              <p>{selectedDate}</p>

              <input
                placeholder="Reason (e.g., Sick, Personal, Family Event)"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />

              <div className="modal-actions">
                <button type="button" onClick={addLeave}>
                  Save
                </button>
                <button type="button" onClick={() => setSelectedDate(null)}>
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default LeaveTracker;

/* ======================
   CALENDAR
====================== */
function Calendar({ month, year, setMonth, setYear, leaves, onSelectDate }) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const leaveDates = leaves.map((l) => l.date);

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else setMonth(month - 1);
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else setMonth(month + 1);
  };

  return (
    <div className="calendar-wrapper">
      {/* HEADER */}
      <div className="calendar-header">
        <button type="button" onClick={prevMonth}>◀</button>
        <h4>
          {new Date(year, month).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h4>
        <button type="button" onClick={nextMonth}>▶</button>
      </div>

      {/* DAYS */}
      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="day-label">{d}</div>
        ))}

        {Array(firstDay).fill("").map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {[...Array(daysInMonth)].map((_, i) => {
          const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(i + 1).padStart(2, "0")}`;
          const isLeave = leaveDates.includes(dateStr);

          return (
            <div
              key={i}
              className={`day ${isLeave ? "leave" : ""}`}
              onClick={() => onSelectDate(dateStr)}
              title={isLeave ? "Click to view or remove leave" : "Click to mark leave"}
            >
              {i + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ======================
   DONUT CHART
====================== */
function DonutChart({ percent }) {
  const safePercent = Math.min(100, Math.max(0, percent));
  const dash = safePercent * 3.77;

  return (
    <div className="donut">
      <svg width="160" height="160">
        <circle
          cx="80"
          cy="80"
          r="60"
          stroke="#e5e7eb"
          strokeWidth="14"
          fill="none"
        />
        <circle
          cx="80"
          cy="80"
          r="60"
          stroke="#ef4444"
          strokeWidth="14"
          fill="none"
          strokeDasharray={`${dash} 999`}
          transform="rotate(-90 80 80)"
        />
        <text
          x="50%"
          y="50%"
          dy="8"
          textAnchor="middle"
          fontSize="22"
          fontWeight="700"
        >
          {safePercent}%
        </text>
      </svg>
      <p>Leave %</p>
    </div>
  );
}
