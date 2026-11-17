import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "./Dashboard";

describe("Dashboard Navigation", () => {
  beforeEach(() => {
    localStorage.setItem("user", JSON.stringify({ name: "Alex" }));
  });

  afterEach(() => {
    localStorage.clear();
  });

  test("renders Dashboard and can navigate to Study Schedule", () => {
    render(<Dashboard setUser={() => {}} darkMode={false} setDarkMode={() => {}} />);

    expect(screen.getByText(/Welcome back, Alex/i)).toBeInTheDocument();

    const scheduleBtn = screen.getByRole("button", { name: /Study Schedule/i });
    fireEvent.click(scheduleBtn);

    expect(screen.getByText(/📅 Study Schedule/i)).toBeInTheDocument();
  });
});
