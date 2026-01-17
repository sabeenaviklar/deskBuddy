function TaskCard({ task }) {
    return (
      <div className="task">
        <h4>{task.title}</h4>
        <span className={`badge ${task.type}`}>
          {task.type}
        </span>
      </div>
    );
  }
  
  export default TaskCard;
  