// import { useState, useEffect } from "react";

// const initialData = {
//   todo: [],
//   progress: [],
//   done: []
// };

// function TodoBoard() {
//   const [tasks, setTasks] = useState(
//     JSON.parse(localStorage.getItem("tasks")) || initialData
//   );
//   const [newTask, setNewTask] = useState("");

//   useEffect(() => {
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//   }, [tasks]);

//   const addTask = () => {
//     if (!newTask.trim()) return;
//     setTasks({
//       ...tasks,
//       todo: [...tasks.todo, { id: Date.now(), text: newTask }]
//     });
//     setNewTask("");
//   };

//   const onDragStart = (e, task, from) => {
//     e.dataTransfer.setData(
//       "task",
//       JSON.stringify({ task, from })
//     );
//   };

//   const onDrop = (e, to) => {
//     const { task, from } = JSON.parse(
//       e.dataTransfer.getData("task")
//     );

//     if (from === to) return;

//     setTasks({
//       ...tasks,
//       [from]: tasks[from].filter(t => t.id !== task.id),
//       [to]: [...tasks[to], task]
//     });
//   };

//   const allowDrop = (e) => e.preventDefault();

//   const renderColumn = (title, key, color) => (
//     <div
//       className="kanban-column"
//       onDrop={(e) => onDrop(e, key)}
//       onDragOver={allowDrop}
//     >
//       <div className="kanban-header" style={{ background: color }}>
//         {title}
//       </div>

//       {tasks[key].map(task => (
//         <div
//           key={task.id}
//           className="kanban-task"
//           draggable
//           onDragStart={(e) => onDragStart(e, task, key)}
//         >
//           {task.text}
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <div className="todo-wrapper">
//       <h2>Task Board</h2>

//       <div className="todo-input">
//         <input
//           placeholder="Add new task..."
//           value={newTask}
//           onChange={(e) => setNewTask(e.target.value)}
//         />
//         <button onClick={addTask}>Add</button>
//       </div>

//       <div className="kanban-board">
//         {renderColumn("To Do", "todo", "#64748b")}
//         {renderColumn("In Progress", "progress", "#3b82f6")}
//         {renderColumn("Done", "done", "#22c55e")}
//       </div>
//     </div>
//   );
// }

// export default TodoBoard;


import { useState, useEffect } from "react";

const houses = ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"];

const houseColors = {
  Gryffindor: "#7f1d1d",
  Slytherin: "#14532d",
  Ravenclaw: "#1e3a8a",
  Hufflepuff: "#92400e",
};

function TodoBoard() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("hp_tasks")) || []
  );
  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem("hp_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!text.trim()) return;

    const randomHouse =
      houses[Math.floor(Math.random() * houses.length)];

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text,
        status: "todo",
        house: randomHouse,
      },
    ]);
    setText("");
  };

  const moveTask = (id, status) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, status } : t)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const renderColumn = (title, status) => (
    <div className="hp-column">
      <h3>{title}</h3>

      {tasks
        .filter(t => t.status === status)
        .map(task => (
          <div
            key={task.id}
            className="hp-card"
            style={{ borderLeft: `6px solid ${houseColors[task.house]}` }}
          >
            <p>{task.text}</p>
            <span className="house">{task.house}</span>

            <div className="actions">
              {status !== "todo" && (
                <button onClick={() => moveTask(task.id, "todo")}>⬅</button>
              )}
              {status !== "progress" && (
                <button onClick={() => moveTask(task.id, "progress")}>🪄</button>
              )}
              {status !== "done" && (
                <button onClick={() => moveTask(task.id, "done")}>✔</button>
              )}
              <button className="delete" onClick={() => deleteTask(task.id)}>
                ✖
              </button>
            </div>
          </div>
        ))}
    </div>
  );

  return (
    <div className="hp-board">
      <h2>🪄 Wizard Tasks Board</h2>

      <div className="add-task">
        <input
          placeholder="Write your magical task..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button onClick={addTask}>Cast Spell ✨</button>
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
