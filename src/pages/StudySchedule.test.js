import { render, screen, fireEvent } from "@testing-library/react";
import StudySchedule, {
  formatTime12,
  calculateDuration,
} from "./StudySchedule";

describe("StudySchedule Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("helper functions format time and duration correctly", () => {
    expect(formatTime12("09:00")).toBe("9:00 AM");
    expect(formatTime12("13:45")).toBe("1:45 PM");
    expect(formatTime12("00:30")).toBe("12:30 AM");
    expect(formatTime12("12:00")).toBe("12:00 PM");

    expect(calculateDuration("09:00", "10:30")).toBe("1h 30m");
    expect(calculateDuration("10:00", "11:00")).toBe("1h");
    expect(calculateDuration("14:00", "14:45")).toBe("45m");
  });

  test("renders study schedule title and metrics", () => {
    render(<StudySchedule />);
    expect(screen.getByText(/Study Schedule/i)).toBeInTheDocument();
    expect(screen.getByText(/Planned Sessions/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Completed/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Progress/i)).toBeInTheDocument();
  });

  test("can switch to All Days tab and view sessions", () => {
    render(<StudySchedule />);
    const allDaysTab = screen.getByText(/All Days/i);
    fireEvent.click(allDaysTab);

    // Initial default items should be present
    expect(screen.getByText("Mathematics")).toBeInTheDocument();
    expect(screen.getByText("Physics")).toBeInTheDocument();
  });

  test("can open the form and add a new study session", () => {
    render(<StudySchedule />);

    // Open add session form
    const addToggleBtn = screen.getByRole("button", {
      name: /Add Study Session/i,
    });
    fireEvent.click(addToggleBtn);

    expect(screen.getByText("Add New Study Session")).toBeInTheDocument();

    // Fill in form
    const subjectInput = screen.getByPlaceholderText(/e\.g\. Mathematics/i);
    fireEvent.change(subjectInput, { target: { value: "Chemistry Lab" } });

    const topicInput = screen.getByPlaceholderText(/e\.g\. Chapter 4/i);
    fireEvent.change(topicInput, { target: { value: "Organic compounds" } });

    // Submit form
    const submitBtn = screen.getByRole("button", {
      name: /Save to Schedule/i,
    });
    fireEvent.click(submitBtn);

    // Should now display Chemistry Lab
    expect(screen.getByText("Chemistry Lab")).toBeInTheDocument();
    expect(screen.getByText("Organic compounds")).toBeInTheDocument();
  });

  test("validates that end time is after start time", () => {
    render(<StudySchedule />);

    const addToggleBtn = screen.getByRole("button", {
      name: /Add Study Session/i,
    });
    fireEvent.click(addToggleBtn);

    const subjectInput = screen.getByPlaceholderText(/e\.g\. Mathematics/i);
    fireEvent.change(subjectInput, { target: { value: "Biology" } });

    // Set invalid times (endTime before startTime)
    const startTimeInput = screen.getByLabelText(/Start Time/i);
    const endTimeInput = screen.getByLabelText(/End Time/i);

    fireEvent.change(startTimeInput, { target: { value: "14:00" } });
    fireEvent.change(endTimeInput, { target: { value: "13:00" } });

    const submitBtn = screen.getByRole("button", {
      name: /Save to Schedule/i,
    });
    fireEvent.click(submitBtn);

    expect(
      screen.getByText(/End time must be later than start time/i)
    ).toBeInTheDocument();
  });

  test("toggles completion and deletes a session", () => {
    render(<StudySchedule />);
    const allDaysTab = screen.getByText(/All Days/i);
    fireEvent.click(allDaysTab);

    // Find a completion button
    const completeButtons = screen.getAllByRole("button", {
      name: /Mark Done|Completed/i,
    });
    expect(completeButtons.length).toBeGreaterThan(0);

    // Find delete buttons
    const deleteButtons = screen.getAllByRole("button", {
      name: "✖",
    });
    const initialCount = deleteButtons.length;
    fireEvent.click(deleteButtons[0]);

    const remainingDeleteButtons = screen.getAllByRole("button", {
      name: "✖",
    });
    expect(remainingDeleteButtons.length).toBe(initialCount - 1);
  });

  test("clicking a preset chip fills the subject field", () => {
    render(<StudySchedule />);

    const addToggleBtn = screen.getByRole("button", {
      name: /Add Study Session/i,
    });
    fireEvent.click(addToggleBtn);

    const mathChip = screen.getByRole("button", { name: "Mathematics" });
    fireEvent.click(mathChip);

    const subjectInput = screen.getByPlaceholderText(/e\.g\. Mathematics/i);
    expect(subjectInput.value).toBe("Mathematics");
  });

  test("shows empty state when a day has no sessions", () => {
    render(<StudySchedule />);

    // Switch to Sunday
    const sundayTab = screen.getByRole("button", { name: /^Sunday/i });
    fireEvent.click(sundayTab);

    expect(
      screen.getByText(/No sessions scheduled for Sunday/i)
    ).toBeInTheDocument();
  });
});
