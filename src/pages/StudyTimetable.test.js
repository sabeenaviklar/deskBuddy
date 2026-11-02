import { render, screen, fireEvent } from "@testing-library/react";
import StudyTimetable, {
  formatTime12h,
  calculateDurationMinutes,
  formatDuration,
  isSessionActiveNow
} from "./StudyTimetable";

describe("StudyTimetable Helper Functions", () => {
  test("formats 24h time to 12h AM/PM correctly", () => {
    expect(formatTime12h("09:00")).toBe("9:00 AM");
    expect(formatTime12h("12:00")).toBe("12:00 PM");
    expect(formatTime12h("14:30")).toBe("2:30 PM");
    expect(formatTime12h("00:15")).toBe("12:15 AM");
  });

  test("calculates duration minutes correctly", () => {
    expect(calculateDurationMinutes("09:00", "10:30")).toBe(90);
    expect(calculateDurationMinutes("14:00", "16:15")).toBe(135);
    expect(calculateDurationMinutes("10:00", "09:00")).toBe(0);
  });

  test("formats duration in hours and minutes", () => {
    expect(formatDuration(90)).toBe("1h 30m");
    expect(formatDuration(60)).toBe("1h");
    expect(formatDuration(45)).toBe("45m");
    expect(formatDuration(0)).toBe("0m");
  });
});

describe("StudyTimetable Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders timetable title and default schedule", () => {
    render(<StudyTimetable />);
    expect(screen.getByText(/Study Timetable/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Plan your study sessions/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/\+ Add Subject & Time/i)).toBeInTheDocument();
  });

  test("renders day of week tabs and allows switching days", () => {
    render(<StudyTimetable />);
    const monTab = screen.getByRole("button", { name: /Mon/i });
    const tueTab = screen.getByRole("button", { name: /Tue/i });
    expect(monTab).toBeInTheDocument();
    expect(tueTab).toBeInTheDocument();

    fireEvent.click(monTab);
    expect(screen.getByText(/Monday’s Schedule/i)).toBeInTheDocument();
    // Monday default has Mathematics
    expect(screen.getByText("Mathematics")).toBeInTheDocument();

    fireEvent.click(tueTab);
    expect(screen.getByText(/Tuesday’s Schedule/i)).toBeInTheDocument();
    // Tuesday default has BEE
    expect(screen.getByText("BEE")).toBeInTheDocument();
  });

  test("opens modal to add subject and time, and adds session to daily schedule", () => {
    render(<StudyTimetable />);

    // Switch to Sunday
    const sunTab = screen.getByRole("button", { name: /Sun/i });
    fireEvent.click(sunTab);

    // Click Add Subject & Time
    const addBtn = screen.getByRole("button", {
      name: /\+ Add Subject & Time/i
    });
    fireEvent.click(addBtn);

    // Modal should be open
    expect(screen.getByText(/➕ Add Study Session/i)).toBeInTheDocument();

    // Type a new subject
    const subjectInput = screen.getByPlaceholderText(
      /e\.g\. Mathematics, Physics, PPS, BEE/i
    );
    fireEvent.change(subjectInput, {
      target: { value: "Algorithms & AI" }
    });

    // Select start and end time
    const startTimeInput = screen.getByLabelText(/Start Time/i);
    const endTimeInput = screen.getByLabelText(/End Time/i);
    fireEvent.change(startTimeInput, { target: { value: "15:00" } });
    fireEvent.change(endTimeInput, { target: { value: "17:00" } });

    // Fill optional topic
    const topicInput = screen.getByPlaceholderText(
      /e\.g\. Chapter 4 Integrals practice/i
    );
    fireEvent.change(topicInput, {
      target: { value: "Graph traversal & Search" }
    });

    // Submit form
    const submitBtn = screen.getByRole("button", {
      name: /Add to Timetable/i
    });
    fireEvent.click(submitBtn);

    // Session should now appear in Sunday schedule
    expect(screen.getByText("Algorithms & AI")).toBeInTheDocument();
    expect(
      screen.getByText(/Graph traversal & Search/i)
    ).toBeInTheDocument();
  });

  test("validates form inputs before adding", () => {
    render(<StudyTimetable />);

    const addBtn = screen.getByRole("button", {
      name: /\+ Add Subject & Time/i
    });
    fireEvent.click(addBtn);

    // Empty subject submit
    const submitBtn = screen.getByRole("button", {
      name: /Add to Timetable/i
    });
    fireEvent.click(submitBtn);

    expect(
      screen.getByText(/Please enter or select a subject name\./i)
    ).toBeInTheDocument();

    // Invalid time range (end before start)
    const subjectInput = screen.getByPlaceholderText(
      /e\.g\. Mathematics, Physics, PPS, BEE/i
    );
    fireEvent.change(subjectInput, { target: { value: "Data Science" } });

    const startTimeInput = screen.getByLabelText(/Start Time/i);
    const endTimeInput = screen.getByLabelText(/End Time/i);
    fireEvent.change(startTimeInput, { target: { value: "14:00" } });
    fireEvent.change(endTimeInput, { target: { value: "13:00" } });

    fireEvent.click(submitBtn);
    expect(
      screen.getByText(/End time must be after start time\./i)
    ).toBeInTheDocument();
  });

  test("toggles completion checkbox of a session", () => {
    render(<StudyTimetable />);

    const monTab = screen.getByRole("button", { name: /Mon/i });
    fireEvent.click(monTab);

    // Physics in Monday is initially not completed
    const physicsHeading = screen.getByText("Physics");
    expect(physicsHeading).toBeInTheDocument();

    const checkboxes = screen.getAllByRole("checkbox");
    // Toggle the second checkbox (Physics)
    fireEvent.click(checkboxes[1]);

    // Check localStorage was updated
    const saved = JSON.parse(localStorage.getItem("study_timetable"));
    const physics = saved.find(
      (s) => s.day === "Monday" && s.subject === "Physics"
    );
    expect(physics.completed).toBe(true);
  });

  test("switches between Daily Schedule and Weekly Overview modes", () => {
    render(<StudyTimetable />);

    const weeklyBtn = screen.getByRole("button", {
      name: /Weekly Overview/i
    });
    fireEvent.click(weeklyBtn);

    // Weekly grid should show all days of week
    expect(screen.getByRole("heading", { name: "Monday" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Friday" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Sunday" })).toBeInTheDocument();

    const dailyBtn = screen.getByRole("button", {
      name: /Daily Schedule/i
    });
    fireEvent.click(dailyBtn);
    expect(dailyBtn).toHaveClass("active");
    expect(screen.getByText(/’s Schedule/i)).toBeInTheDocument();
  });
});
