// import { useState, useRef } from "react";

// function TimeTracker() {
//   const [seconds, setSeconds] = useState(0);
//   const timerRef = useRef(null);

//   const start = () => {
//     if (timerRef.current) return;
//     timerRef.current = setInterval(() => {
//       setSeconds((s) => s + 1);
//     }, 1000);
//   };

//   const stop = () => {
//     clearInterval(timerRef.current);
//     timerRef.current = null;
//   };

//   return (
//     <div className="tracker">
//       <h2>Study Time Tracker</h2>
//       <h1>{seconds}s</h1>
//       <button onClick={start}>Start</button>
//       <button onClick={stop}>Stop</button>
//     </div>
//   );
// }

// export default TimeTracker;

import { useState, useRef } from "react";

function TimeTracker() {
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);

  // ▶ Start timer
  const start = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
  };

  // ⏹ Stop timer
  const stop = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  // 🔄 Reset timer
  const reset = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setSeconds(0);
  };

  // ⏱ Format seconds → HH:MM:SS
  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    return `${String(hrs).padStart(2, "0")} : ${String(mins).padStart(
      2,
      "0"
    )} : ${String(secs).padStart(2, "0")}`;
  };

  // 🕒 Clock hand angles
  const secondAngle = (seconds % 60) * 6;
  const minuteAngle = ((seconds / 60) % 60) * 6;
  const hourAngle = ((seconds / 3600) % 12) * 30;

  return (
    <div className="panel" style={{ textAlign: "center" }}>
      <h2>Time Tracker</h2>

      {/* 🕒 ANALOG CLOCK */}
      <svg width="200" height="200" viewBox="0 0 200 200">
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
          strokeLinecap="round"
          transform={`rotate(${hourAngle}, 100, 100)`}
        />

        <line
          x1="100"
          y1="100"
          x2="100"
          y2="40"
          stroke="#629FAD"
          strokeWidth="4"
          strokeLinecap="round"
          transform={`rotate(${minuteAngle}, 100, 100)`}
        />

        <line
          x1="100"
          y1="105"
          x2="100"
          y2="30"
          stroke="#e11d48"
          strokeWidth="2"
          strokeLinecap="round"
          transform={`rotate(${secondAngle}, 100, 100)`}
        />

        <circle cx="100" cy="100" r="4" fill="#e11d48" />
      </svg>

      {/* DIGITAL TIMER */}
      <h1 style={{ margin: "20px 0" }}>
        {formatTime(seconds)}
      </h1>

      {/* CONTROLS */}
      <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
        <button onClick={start}>Start</button>
        <button onClick={stop}>Stop</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default TimeTracker;
