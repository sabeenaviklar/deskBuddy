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

  return (
    <div className="panel">
      <button onClick={goBack} className="back-btn">← Back</button>

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

        <input
          type="number"
          placeholder="% Progress"
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
        />

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
          {tasks.map(t => (
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
              <td colSpan="5" style={{ textAlign: "center" }}>
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
