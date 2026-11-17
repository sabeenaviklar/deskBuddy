import { useState, useEffect } from "react";

function CourseProgress({ course, goBack }) {
  const storageKey = `course_${course}`;

  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem(storageKey)) || []
  );

  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
  }, [tasks, storageKey]);

  const addTask = () => {
    if (!task || !deadline) return alert("Fill all fields");

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        task,
        deadline,
        progress,
        status: progress === 100 ? "Completed" : "In Progress"
      }
    ]);

    setTask("");
    setDeadline("");
    setProgress(0);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const getStatusClass = (status) => {
    if (status === "Completed") return "status-pill status-completed";
    if (status === "In Progress") return "status-pill status-in-progress";
    return "status-pill status-not-started";
  };

  return (
    <div className="panel course-progress-panel">
      <button
        type="button"
        onClick={goBack}
        className="back-btn"
        aria-label="Go back to courses"
      >
        ← Back
      </button>

      <h2>{course} – Progress Tracker</h2>

      {/* ADD TASK */}
      <div className="task-form">
        <input
          type="text"
          placeholder="Topic / Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          aria-label="Topic or Task"
        />

        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          aria-label="Deadline"
        />

        <select
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          aria-label="Task Status"
        >
          <option value={0}>In Progress</option>
          <option value={100}>Completed</option>
        </select>

        <button type="button" onClick={addTask} className="task-add-btn">
          Add
        </button>
      </div>

      {/* TABLE */}
      <div className="progress-table-container">
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
            {tasks.map(t => (
              <tr key={t.id}>
                <td className="task-name-cell">{t.task}</td>
                <td>
                  <span className={getStatusClass(t.status)}>
                    {t.status}
                  </span>
                </td>
                <td>{t.deadline}</td>
                <td>
                  <div className="progress-cell">
                    <div
                      className="table-progress-bar"
                      role="progressbar"
                      aria-valuenow={t.progress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      <div
                        className="table-progress-fill"
                        style={{ width: `${Math.min(Math.max(t.progress, 0), 100)}%` }}
                      />
                    </div>
                    <span className="table-progress-text">{t.progress}%</span>
                  </div>
                </td>
                <td>
                  <button
                    type="button"
                    className="danger"
                    onClick={() => deleteTask(t.id)}
                    aria-label={`Delete task ${t.task}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {tasks.length === 0 && (
              <tr>
                <td colSpan="5">
                  <div className="table-empty-state">
                    <div className="table-empty-icon" aria-hidden="true">
                      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="12" y1="18" x2="12" y2="12" />
                        <line x1="9" y1="15" x2="15" y2="15" />
                      </svg>
                    </div>
                    <p className="table-empty-title">No tasks added yet</p>
                    <p className="table-empty-hint">Add your first task above to track your course progress.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CourseProgress;
