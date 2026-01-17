import { useState, useEffect } from "react";

const initialData = {
  todo: [],
  progress: [],
  done: []
};

function TodoBoard() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || initialData
  );
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks({
      ...tasks,
      todo: [...tasks.todo, { id: Date.now(), text: newTask }]
    });
    setNewTask("");
  };

  const onDragStart = (e, task, from) => {
    e.dataTransfer.setData(
      "task",
      JSON.stringify({ task, from })
    );
  };

  const onDrop = (e, to) => {
    const { task, from } = JSON.parse(
      e.dataTransfer.getData("task")
    );

    if (from === to) return;

    setTasks({
      ...tasks,
      [from]: tasks[from].filter(t => t.id !== task.id),
      [to]: [...tasks[to], task]
    });
  };

  const allowDrop = (e) => e.preventDefault();

  const renderColumn = (title, key, color) => (
    <div
      className="kanban-column"
      onDrop={(e) => onDrop(e, key)}
      onDragOver={allowDrop}
    >
      <div className="kanban-header" style={{ background: color }}>
        {title}
      </div>

      {tasks[key].map(task => (
        <div
          key={task.id}
          className="kanban-task"
          draggable
          onDragStart={(e) => onDragStart(e, task, key)}
        >
          {task.text}
        </div>
      ))}
    </div>
  );

  return (
    <div className="todo-wrapper">
      <h2>Task Board</h2>

      <div className="todo-input">
        <input
          placeholder="Add new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <div className="kanban-board">
        {renderColumn("To Do", "todo", "#64748b")}
        {renderColumn("In Progress", "progress", "#3b82f6")}
        {renderColumn("Done", "done", "#22c55e")}
      </div>
    </div>
  );
}

export default TodoBoard;
