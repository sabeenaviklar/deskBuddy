import { useState, useEffect } from "react";

function CourseProgress({ course, goBack }) {
  const storageKey = `course_${course}`;

  /*  COURSE TOTAL LESSONS */
  const COURSE_TOTALS = {
    Mathematics: 20,
    Physics: 18,
    PPS: 6,
    BEE: 22
  };

  const TOTAL_LESSONS = COURSE_TOTALS[course] || 0;

  /* ================= LOAD TASKS ================= */
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  });

  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [progress, setProgress] = useState(0);

  /* ================= SAVE TASK LIST ================= */
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
  }, [tasks, storageKey]);

  /* ================= SAVE COURSE SUMMARY ================= */
  useEffect(() => {
    const completed = tasks.filter(
      (t) => t.progress === 100
    ).length;

    const percent =
      TOTAL_LESSONS === 0
        ? 0
        : Math.round((completed / TOTAL_LESSONS) * 100);

    localStorage.setItem(
      `${storageKey}_summary`,
      JSON.stringify({
        completedLessons: completed,
        totalLessons: TOTAL_LESSONS,
        progress: percent
      })
    );
  }, [tasks, storageKey, TOTAL_LESSONS]);

  /* ================= ADD TASK ================= */
  const addTask = () => {
    if (!task || !deadline) {
      alert("Fill all fields");
      return;
    }

    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        task,
        deadline,
        progress,
        status:
          progress === 100 ? "Completed" : "In Progress"
      }
    ]);

    setTask("");
    setDeadline("");
    setProgress(0);
  };

  /* ================= DELETE TASK ================= */
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="panel">
      <button onClick={goBack} className="back-btn">
        ← Back
      </button>

      <h2>{course} – Progress Tracker</h2>

      {/* ADD TASK */}
      <div className="task-form">
        <input
          placeholder="Topic / Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        {/* safer progress selector */}
        <select
          value={progress}
          onChange={(e) =>
            setProgress(Number(e.target.value))
          }
        >
          <option value={0}>In Progress</option>
          <option value={100}>Completed</option>
        </select>

        <button onClick={addTask}>Add</button>
      </div>

      {/* TABLE */}
      <table className="progress-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Status</th>
            <th>Deadline</th>
            <th>Progress</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((t) => (
            <tr key={t.id}>
              <td>{t.task}</td>
              <td>{t.status}</td>
              <td>{t.deadline}</td>
              <td>{t.progress}%</td>
              <td>
                <button
                  className="danger"
                  onClick={() => deleteTask(t.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {tasks.length === 0 && (
            <tr>
              <td
                colSpan="5"
                style={{ textAlign: "center" }}
              >
                No tasks added yet
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CourseProgress;