
//pages/LeaveTracker.js
// import { useState } from "react";

// function LeaveTracker() {
//   const [leaves, setLeaves] = useState(
//     Number(localStorage.getItem("leaves")) || 0
//   );

//   const apply = () => {
//     const l = leaves + 1;
//     setLeaves(l);
//     localStorage.setItem("leaves", l);
//   };

//   return (
//     <div className="panel">
//       <h2>Leave Tracker</h2>
//       <p>Leaves taken: {leaves}</p>
//       <button onClick={apply}>Apply Leave</button>
//     </div>
//   );
// }

// export default LeaveTracker;

// //pages/LeaveTracker.js
// import { useState, useEffect } from "react";

// function LeaveTracker() {
//   const [workingDays, setWorkingDays] = useState(
//     Number(localStorage.getItem("workingDays")) || 200
//   );

//   const [leaves, setLeaves] = useState(
//     JSON.parse(localStorage.getItem("leaveData")) || []
//   );

//   const [selectedDate, setSelectedDate] = useState(null);
//   const [reason, setReason] = useState("");

//   useEffect(() => {
//     localStorage.setItem("leaveData", JSON.stringify(leaves));
//     localStorage.setItem("workingDays", workingDays);
//   }, [leaves, workingDays]);

//   const addLeave = () => {
//     if (!reason) return alert("Please enter reason");

//     setLeaves([...leaves, { date: selectedDate, reason }]);
//     setSelectedDate(null);
//     setReason("");
//   };

//   const leaveCount = leaves.length;
//   const presentDays = Math.max(workingDays - leaveCount, 0);

//   const leavePercent = workingDays
//     ? Math.round((leaveCount / workingDays) * 100)
//     : 0;

//   return (
//     <div className="panel">
//       <h2>Leave Tracker</h2>

//       {/* WORKING DAYS INPUT */}
//       <div style={{ marginBottom: 20 }}>
//         <label>Total Working Days</label>
//         <input
//           type="number"
//           value={workingDays}
//           onChange={(e) => setWorkingDays(Number(e.target.value))}
//           style={{ marginLeft: 10, width: 80 }}
//         />
//       </div>

//       {/* DONUT */}
//       <DonutChart percent={leavePercent} />

//       <p>
//         Leaves Taken: <b>{leaveCount}</b> / {workingDays}
//       </p>

//       {/* CALENDAR */}
//       <Calendar
//         leaves={leaves}
//         onSelectDate={(d) => setSelectedDate(d)}
//       />

//       {/* ADD LEAVE MODAL */}
//       {selectedDate && (
//         <div className="leave-modal">
//           <h4>Add Leave</h4>
//           <p>{selectedDate}</p>
//           <input
//             placeholder="Reason"
//             value={reason}
//             onChange={(e) => setReason(e.target.value)}
//           />
//           <button onClick={addLeave}>Save</button>
//           <button onClick={() => setSelectedDate(null)}>Cancel</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default LeaveTracker;

// function Calendar({ leaves, onSelectDate }) {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = today.getMonth();
  
//     const daysInMonth = new Date(year, month + 1, 0).getDate();
  
//     const leaveDates = leaves.map((l) => l.date);
  
//     return (
//       <div className="calendar">
//         {[...Array(daysInMonth)].map((_, i) => {
//           const date = `${year}-${month + 1}-${i + 1}`;
//           const isLeave = leaveDates.includes(date);
  
//           return (
//             <div
//               key={i}
//               className={`day ${isLeave ? "leave" : ""}`}
//               onClick={() => onSelectDate(date)}
//             >
//               {i + 1}
//             </div>
//           );
//         })}
//       </div>
//     );
//   }

//   function DonutChart({ percent }) {
//     return (
//       <div className="donut">
//         <svg width="160" height="160">
//           <circle
//             cx="80"
//             cy="80"
//             r="60"
//             stroke="#e5e7eb"
//             strokeWidth="14"
//             fill="none"
//           />
//           <circle
//             cx="80"
//             cy="80"
//             r="60"
//             stroke="#ef4444"
//             strokeWidth="14"
//             fill="none"
//             strokeDasharray={`${percent * 3.77} 999`}
//             transform="rotate(-90 80 80)"
//           />
//           <text
//             x="50%"
//             y="50%"
//             textAnchor="middle"
//             dy="8"
//             fontSize="22"
//             fontWeight="700"
//           >
//             {percent}%
//           </text>
//         </svg>
//         <p>Leave %</p>
//       </div>
//     );
//   }
  
  
import { useState, useEffect } from "react";

/* ======================
   MAIN COMPONENT
====================== */
function LeaveTracker() {
  const today = new Date();

  const [workingDays, setWorkingDays] = useState(
    Number(localStorage.getItem("workingDays")) || 200
  );

  const [leaves, setLeaves] = useState(
    JSON.parse(localStorage.getItem("leaveData")) || []
  );

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const [selectedDate, setSelectedDate] = useState(null);
  const [reason, setReason] = useState("");

  useEffect(() => {
    localStorage.setItem("leaveData", JSON.stringify(leaves));
    localStorage.setItem("workingDays", workingDays);
  }, [leaves, workingDays]);

  /* ================= MODAL ESCAPE & SCROLL LOCK ================= */
  useEffect(() => {
    if (selectedDate) {
      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          setSelectedDate(null);
          setReason("");
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [selectedDate]);

  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return "";
    const parts = dateStr.split("-").map(Number);
    if (parts.length === 3) {
      const [y, m, d] = parts;
      const dObj = new Date(y, m - 1, d);
      return dObj.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
    return dateStr;
  };

  const addLeave = () => {
    if (!reason) return alert("Please enter reason");

    setLeaves([...leaves, { date: selectedDate, reason }]);
    setSelectedDate(null);
    setReason("");
  };

  const leaveCount = leaves.length;
  const remainingDays = Math.max(workingDays - leaveCount, 0);
  const leavePercent = workingDays
    ? Math.min(Math.round((leaveCount / workingDays) * 100), 100)
    : 0;

  return (
    <div className="panel">
      <h2>Leave Tracker</h2>

      {/* HEADER: DONUT & STAT CARDS */}
      <div className="leave-header">
        <div className="leave-donut-section">
          <DonutChart percent={leavePercent} />
        </div>

        <div className="leave-stats-grid">
          <div className="leave-stat-card">
            <span className="leave-stat-label">Leaves Taken</span>
            <span className="leave-stat-value leave-stat-danger">{leaveCount}</span>
          </div>

          <div className="leave-stat-card">
            <label htmlFor="working-days-input" className="leave-stat-label">
              Working Days
            </label>
            <div className="leave-input-wrapper">
              <input
                id="working-days-input"
                type="number"
                min="0"
                className="leave-number-input"
                value={workingDays}
                onChange={(e) => setWorkingDays(Number(e.target.value))}
                aria-label="Total Working Days"
              />
            </div>
          </div>

          <div className="leave-stat-card">
            <span className="leave-stat-label">Remaining</span>
            <span className="leave-stat-value leave-stat-primary">{remainingDays}</span>
          </div>
        </div>
      </div>

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
        <div
          className="modal-overlay"
          onClick={() => {
            setSelectedDate(null);
            setReason("");
          }}
        >
          <div
            className="leave-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-leave-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="add-leave-title" className="modal-title">
              Add Leave
            </h3>

            <div className="modal-date-chip">
              <span className="modal-date-icon" aria-hidden="true">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </span>
              <span className="modal-date-text">
                {formatDisplayDate(selectedDate)}
              </span>
            </div>

            <div className="modal-field">
              <label htmlFor="leave-reason-input" className="modal-label">
                Reason
              </label>
              <input
                id="leave-reason-input"
                type="text"
                className="modal-input"
                placeholder="Enter reason for leave..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addLeave();
                }}
                autoFocus
              />
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="modal-btn-cancel"
                onClick={() => {
                  setSelectedDate(null);
                  setReason("");
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="modal-btn-save"
                onClick={addLeave}
              >
                Save
              </button>
            </div>
          </div>
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
  const now = new Date();

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
        <button
          type="button"
          className="calendar-nav-btn"
          onClick={prevMonth}
          aria-label="Previous month"
        >
          ◀
        </button>
        <h4>
          {new Date(year, month).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h4>
        <button
          type="button"
          className="calendar-nav-btn"
          onClick={nextMonth}
          aria-label="Next month"
        >
          ▶
        </button>
      </div>

      {/* DAYS */}
      <div className="calendar-grid" role="grid" aria-label="Leave calendar">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="day-label" role="columnheader">
            {d}
          </div>
        ))}

        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} className="calendar-empty" aria-hidden="true" />
        ))}

        {[...Array(daysInMonth)].map((_, i) => {
          const dayNum = i + 1;
          const dateStr = `${year}-${month + 1}-${dayNum}`;
          const leaveEntry = leaves.find((l) => l.date === dateStr);
          const isLeave = Boolean(leaveEntry);
          const leaveReason = leaveEntry?.reason;
          const isToday =
            now.getFullYear() === year &&
            now.getMonth() === month &&
            now.getDate() === dayNum;

          return (
            <button
              type="button"
              key={dayNum}
              className={`day ${isLeave ? "leave" : ""} ${isToday ? "today" : ""}`}
              onClick={() => onSelectDate(dateStr)}
              aria-pressed={isLeave}
              title={leaveReason ? `Leave: ${leaveReason}` : (isLeave ? "Leave" : undefined)}
              aria-label={`${new Date(year, month, dayNum).toLocaleDateString("default", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}${isToday ? ", today" : ""}${isLeave ? `, leave${leaveReason ? `: ${leaveReason}` : ""}` : ""}`}
            >
              <span>{dayNum}</span>
              {isLeave && <span className="leave-dot" aria-hidden="true" />}
            </button>
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
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const clampedPercent = Math.min(Math.max(percent, 0), 100);
  const strokeDashoffset = circumference - (circumference * clampedPercent) / 100;

  return (
    <div className="donut">
      <svg
        width="160"
        height="160"
        viewBox="0 0 160 160"
        role="img"
        aria-label={`Leave percentage: ${clampedPercent}%`}
      >
        {/* Track Ring */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="var(--donut-track)"
          strokeWidth="16"
          fill="none"
        />
        {/* Progress Ring */}
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="var(--danger)"
          strokeWidth="16"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeOpacity={clampedPercent === 0 ? 0 : 1}
          transform="rotate(-90 80 80)"
          className="donut-progress"
        />
        {/* Center Percentage */}
        <text
          x="50%"
          y="50%"
          dy="0.35em"
          textAnchor="middle"
          className="donut-percent"
        >
          {clampedPercent}%
        </text>
      </svg>
      <span className="donut-label">Leave %</span>
    </div>
  );
}

