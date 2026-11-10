import { useState, useEffect } from "react";

const houses = ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"];


const houseColors = {
  Gryffindor: "#7f1d1d",
  Slytherin: "#14532d",
  Ravenclaw: "#1e3a8a",
  Hufflepuff: "#92400e",
};

const initialTasks = () => {
  try {
    const saved = JSON.parse(localStorage.getItem("hp_tasks")) || [];
    return saved.map(task => ({
      ...task,
      priority: task.priority || "Medium",
      dueDate: task.dueDate || "",
    }));
  } catch {
    return [];
  }
};
const getLocalDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function TodoBoard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("All");
  const [remindersEnabled, setRemindersEnabled] = useState(
    typeof Notification !== "undefined" &&
    Notification.permission === "granted"
  );

  useEffect(() => {
    localStorage.setItem("hp_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!text.trim()) return;

    const randomHouse =
      houses[Math.floor(Math.random() * houses.length)];

    setTasks(prev => [
      ...prev,
      {
        id: Date.now(),
        text: text.trim(),
        status: "todo",
        house: randomHouse,
        priority,
        dueDate,
      },
    ]);

    setText("");
    setPriority("Medium");
    setDueDate("");
  };

  const moveTask = (id, status) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, status } : task
      )
    );
  };

  const deleteTask = id => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const enableReminders = async () => {
    if (!("Notification" in window)) {
      alert("Your browser does not support notifications.");
      return;
    }

    const permission = await Notification.requestPermission();
    setRemindersEnabled(permission === "granted");

    if (permission !== "granted") {
      alert("Please allow notifications in your browser settings.");
    }
  };

  // Notify once per task per day when its deadline is today or overdue.
  useEffect(() => {
    if (
  !remindersEnabled ||
  !("Notification" in window) ||
  Notification.permission !== "granted"
) {
  return;
}

    const checkDeadlines = () => {
      const today = getLocalDate();

      tasks.forEach(task => {
        if (!task.dueDate || task.status === "done") return;
        if (task.dueDate > today) return;

        const reminderKey = `hp_reminder_${task.id}_${today}`;

        if (localStorage.getItem(reminderKey)) return;

        new Notification(
          task.dueDate < today ? "Task overdue!" : "Task deadline today!",
          {
            body: `${task.text} (${task.priority} priority)`,
          }
        );

        localStorage.setItem(reminderKey, "sent");
      });
    };

    checkDeadlines();
    const interval = setInterval(checkDeadlines, 60000);

    return () => clearInterval(interval);
  }, [tasks, remindersEnabled]);

  const getDeadlineStatus = task => {
    if (!task.dueDate || task.status === "done") return "";

    const today = getLocalDate()

    if (task.dueDate < today) return "Overdue";
    if (task.dueDate === today) return "Due today";

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = getLocalDate(tomorrow);

    if (task.dueDate === tomorrowString) return "Due tomorrow";

    return "Upcoming";
  };

  const renderColumn = (title, status) => (
    <div className="hp-column" key={status}>
      <h3>{title}</h3>

      {tasks
        .filter(task => task.status === status)
        .filter(task => filter === "All" || task.priority === filter)
        .map(task => {
          const deadlineStatus = getDeadlineStatus(task);

          return (
            <div
              key={task.id}
              className="hp-card"
              style={{
                borderLeft: `6px solid ${
                  houseColors[task.house] || "#64748b"
                }`,
              }}
            >
              <p className="hp-task-title">{task.text}</p>

              <div className="hp-task-details">
                <span className={`priority-badge ${task.priority.toLowerCase()}`}>
                  {task.priority} Priority
                </span>

                {task.dueDate && (
                  <span className="hp-deadline">
                    📅 {task.dueDate}
                  </span>
                )}

                {deadlineStatus && (
                  <span
                    className={`deadline-status ${
                      deadlineStatus === "Overdue"
                        ? "overdue"
                        : deadlineStatus === "Due today"
                        ? "due-today"
                        : "upcoming"
                    }`}
                  >
                    {deadlineStatus}
                  </span>
                )}
              </div>

              <span className="house">{task.house}</span>

              <div className="actions">
                {status !== "todo" && (
                  <button
                    title="Move to To Do"
                    onClick={() => moveTask(task.id, "todo")}
                  >
                    ←
                  </button>
                )}

                {status !== "progress" && (
                  <button
                    title="Move to In Progress"
                    onClick={() => moveTask(task.id, "progress")}
                  >
                    ↗
                  </button>
                )}

                {status !== "done" && (
                  <button
                    title="Mark as Done"
                    onClick={() => moveTask(task.id, "done")}
                  >
                    ✓
                  </button>
                )}

                <button
                  className="delete"
                  title="Delete task"
                  onClick={() => deleteTask(task.id)}
                >
                  ✕
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );

 const overdueCount = tasks.filter(
  task =>
    task.dueDate &&
    task.dueDate < getLocalDate() &&
    task.status !== "done"
).length;

  return (
    <div className="hp-board">
      <h2>🪄 Wizard Tasks Board</h2>

      <div className="task-summary">
        <span>Total tasks: <strong>{tasks.length}</strong></span>
        <span>Overdue: <strong className="overdue-text">{overdueCount}</strong></span>
      </div>

      <div className="add-task hp-add-task">
        <input
          type="text"
          placeholder="Write your magical task..."
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addTask()}
        />

        <select
          value={priority}
          onChange={e => setPriority(e.target.value)}
          aria-label="Task priority"
        >
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          aria-label="Task deadline"
        />

        <button onClick={addTask}>Add Task ✨</button>
      </div>

      <div className="task-toolbar">
        <label htmlFor="priority-filter">Filter by priority:</label>

        <select
          id="priority-filter"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option value="All">All priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <button
          className="reminder-button"
          onClick={enableReminders}
          disabled={remindersEnabled}
        >
          {remindersEnabled ? "✓ Reminders enabled" : "Enable reminders 🔔"}
        </button>
      </div>

      <div className="hp-grid">
        {renderColumn("📜 To Do", "todo")}
        {renderColumn("⚡ In Progress", "progress")}
        {renderColumn("🏆 Done", "done")}
      </div>
    </div>
  );
}

export default TodoBoard;