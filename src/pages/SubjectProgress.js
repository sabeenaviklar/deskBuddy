import { useState, useEffect } from "react";

function SubjectProgress({ subject, goBack }) {
  const key = `progress_${subject}`;

  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem(key)) || []
  );

  const [taskName, setTaskName] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!taskName || !deadline) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        taskName,
        deadline,
        status: "Pending",
      },
    ]);

    setTaskName("");
    setDeadline("");
  };

  const updateStatus = (id, status) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, status } : t
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="panel">
      <div className="table-header">
        <h2>{subject} – Progress Tracker</h2>
        <button onClick={goBack}>⬅ Back</button>
      </div>

      {/* ADD TASK */}
      <div className="add-task">
        <input
          placeholder="Task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      {/* TABLE */}
      <table className="progress-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No tasks added
              </td>
            </tr>
          )}

          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.taskName}</td>
              <td>{task.deadline}</td>
              <td>
                <select
                  value={task.status}
                  onChange={(e) =>
                    updateStatus(task.id, e.target.value)
                  }
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </td>
              <td>
                <button
                  className="danger"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SubjectProgress;
