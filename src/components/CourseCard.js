function CourseCard({ title, lessons, completed, image, onContinue }) {
  // calculate progress safely
  const progress =
    lessons > 0 ? Math.round((completed / lessons) * 100) : 0;

  //  check if course finished
  const isCompleted = completed >= lessons;

  return (
    <div className="course-card">
      <div
        className="course-image"
        style={{ backgroundImage: `url(${image})` }}
      >
        <span className="course-title">{title}</span>
      </div>

      <div className="course-body">
        <p className="course-lessons">
          {completed}/{lessons} lessons
        </p>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <button
          className="course-btn"
          onClick={() => !isCompleted && onContinue(title)}
          disabled={isCompleted}
        >
          {isCompleted ? "Completed ✅" : "Continue"}
        </button>
      </div>
    </div>
  );
}

export default CourseCard;