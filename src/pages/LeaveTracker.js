
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

  const addLeave = () => {
    if (!reason) return alert("Please enter reason");

    setLeaves([...leaves, { date: selectedDate, reason }]);
    setSelectedDate(null);
    setReason("");
  };

  const leaveCount = leaves.length;
  const leavePercent = workingDays
    ? Math.round((leaveCount / workingDays) * 100)
    : 0;

  return (
    <div className="panel">
      <h2>Leave Tracker</h2>

      {/* WORKING DAYS */}
      <div className="leave-input">
        <label>Total Working Days</label>
        <input
          type="number"
          value={workingDays}
          onChange={(e) => setWorkingDays(Number(e.target.value))}
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
          <h4>Add Leave</h4>
          <p>{selectedDate}</p>

          <input
            placeholder="Reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />

          <div className="modal-actions">
            <button onClick={addLeave}>Save</button>
            <button onClick={() => setSelectedDate(null)}>Cancel</button>
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
        <button onClick={prevMonth}>◀</button>
        <h4>
          {new Date(year, month).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h4>
        <button onClick={nextMonth}>▶</button>
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
          const dateStr = `${year}-${month + 1}-${i + 1}`;
          const isLeave = leaveDates.includes(dateStr);

          return (
            <div
              key={i}
              className={`day ${isLeave ? "leave" : ""}`}
              onClick={() => onSelectDate(dateStr)}
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
  const dash = percent * 3.77;

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
          {percent}%
        </text>
      </svg>
      <p>Leave %</p>
    </div>
  );
}

