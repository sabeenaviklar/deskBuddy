function CourseCard({ title, lessons, completed, image }) {
    const progress = Math.round((completed / lessons) * 100);
  
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
  
          <button className="course-btn">Continue</button>
        </div>
      </div>
    );
  }
  
  export default CourseCard;
  