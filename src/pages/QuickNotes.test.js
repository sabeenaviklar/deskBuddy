import { render, screen, fireEvent } from "@testing-library/react";
import QuickNotes, {
  isValidNote,
  isValidNotesList,
  generateUniqueNoteId,
  formatNoteDate,
  NOTE_CATEGORIES,
  NOTE_COLORS,
} from "./QuickNotes";

describe("QuickNotes Component", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  test("helper functions validate notes correctly", () => {
    expect(isValidNote(null)).toBe(false);
    expect(isValidNote({})).toBe(false);
    expect(
      isValidNote({
        id: 1,
        title: "Test Note",
        category: "General",
        color: "yellow",
        content: "Test content",
        pinned: false,
      })
    ).toBe(true);

    expect(isValidNotesList({})).toBe(false);
    expect(isValidNotesList("not an array")).toBe(false);
    expect(isValidNotesList([{}])).toBe(false);
    expect(
      isValidNotesList([
        {
          id: 1,
          title: "Math",
          category: "Formulas",
          color: "blue",
          content: "a^2 + b^2 = c^2",
          pinned: true,
        },
      ])
    ).toBe(true);
  });

  test("generateUniqueNoteId prevents collisions", () => {
    const fixedTime = 1700000000000;
    jest.spyOn(Date, "now").mockReturnValue(fixedTime);

    const existingNotes = [{ id: fixedTime }, { id: fixedTime + 1 }];
    const uniqueId = generateUniqueNoteId(existingNotes);

    expect(uniqueId).toBe(fixedTime + 2);
  });

  test("formatNoteDate handles valid and invalid inputs gracefully", () => {
    expect(formatNoteDate("")).toBe("");
    expect(formatNoteDate("invalid-date")).toBe("");
    const formatted = formatNoteDate("2026-11-17T10:00:00.000Z");
    expect(formatted.length).toBeGreaterThan(0);
  });

  test("renders header, default notes, and metrics", () => {
    render(<QuickNotes />);

    expect(
      screen.getByText(/📝 Quick Notes & Scratchpad/i)
    ).toBeInTheDocument();
    expect(screen.getByText("Total Notes")).toBeInTheDocument();
    expect(screen.getByText("📌 Pinned Notes")).toBeInTheDocument();
    expect(screen.getByText("Categories Used")).toBeInTheDocument();

    // Default notes
    expect(screen.getByText(/Euler's Formula & Identity/i)).toBeInTheDocument();
    expect(screen.getByText(/Physics Lab Viva Pointers/i)).toBeInTheDocument();
  });

  test("can open form and create a new note with category and color", () => {
    render(<QuickNotes />);

    const addBtn = screen.getByRole("button", { name: /New Note/i });
    fireEvent.click(addBtn);

    expect(screen.getByText("📝 Create New Note")).toBeInTheDocument();

    const titleInput = screen.getByLabelText(/Note Title \*/i);
    const contentInput = screen.getByLabelText(/Note Content \*/i);
    const categorySelect = screen.getByLabelText(/Category \*/i);

    fireEvent.change(titleInput, { target: { value: "Chemistry Redox Reactions" } });
    fireEvent.change(contentInput, { target: { value: "OIL RIG: Oxidation is loss, Reduction is gain." } });
    fireEvent.change(categorySelect, { target: { value: "Formulas" } });

    // Pick green color
    const greenSwatch = screen.getByLabelText("Mint Green");
    fireEvent.click(greenSwatch);

    const saveBtn = screen.getByRole("button", { name: /Save Note/i });
    fireEvent.click(saveBtn);

    expect(screen.getByText("Chemistry Redox Reactions")).toBeInTheDocument();
    expect(screen.getByText(/OIL RIG: Oxidation is loss/i)).toBeInTheDocument();
  });

  test("validates required title and content before saving", () => {
    render(<QuickNotes />);

    const addBtn = screen.getByRole("button", { name: /New Note/i });
    fireEvent.click(addBtn);

    const saveBtn = screen.getByRole("button", { name: /Save Note/i });
    fireEvent.click(saveBtn);

    expect(screen.getByText(/Please enter a note title/i)).toBeInTheDocument();
  });

  test("can edit an existing note", () => {
    render(<QuickNotes />);

    const editButtons = screen.getAllByRole("button", { name: /Edit/i });
    fireEvent.click(editButtons[0]);

    expect(screen.getByText("✏️ Edit Note")).toBeInTheDocument();

    const titleInput = screen.getByLabelText(/Note Title \*/i);
    fireEvent.change(titleInput, { target: { value: "Euler's Formula (Updated)" } });

    const updateBtn = screen.getByRole("button", { name: /Update Note/i });
    fireEvent.click(updateBtn);

    expect(screen.getByText("Euler's Formula (Updated)")).toBeInTheDocument();
  });

  test("can toggle pinned status and delete a note", () => {
    render(<QuickNotes />);

    const initialDeleteButtons = screen.getAllByRole("button", { name: "Delete note" });
    const initialCount = initialDeleteButtons.length;

    // Toggle pin on the first note
    const pinBtn = screen.getAllByLabelText(/Pin note to top|Unpin note/i)[0];
    fireEvent.click(pinBtn);

    // Delete first note
    fireEvent.click(initialDeleteButtons[0]);

    const remainingDeleteButtons = screen.getAllByRole("button", { name: "Delete note" });
    expect(remainingDeleteButtons.length).toBe(initialCount - 1);
  });

  test("filters notes by search query and category chips", () => {
    render(<QuickNotes />);

    // Search query
    const searchInput = screen.getByPlaceholderText(/Search notes by title/i);
    fireEvent.change(searchInput, { target: { value: "Euler" } });

    expect(screen.getByText(/Euler's Formula/i)).toBeInTheDocument();
    expect(screen.queryByText(/Physics Lab Viva Pointers/i)).not.toBeInTheDocument();

    // Clear search
    const clearBtn = screen.getByTitle("Clear search");
    fireEvent.click(clearBtn);

    // Filter by category chip
    const formulasChip = screen.getByRole("button", { name: /^Formulas/i });
    fireEvent.click(formulasChip);

    expect(screen.getByText(/Euler's Formula/i)).toBeInTheDocument();
    expect(screen.queryByText(/Physics Lab Viva Pointers/i)).not.toBeInTheDocument();
  });

  test("copies note text to clipboard with user feedback", async () => {
    const writeTextMock = jest.fn().mockResolvedValue();
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    render(<QuickNotes />);

    const copyBtns = screen.getAllByRole("button", { name: /Copy/i });
    fireEvent.click(copyBtns[0]);

    expect(writeTextMock).toHaveBeenCalled();
    expect(await screen.findByText(/✓ Copied/i)).toBeInTheDocument();
  });

  test("recovers safely from invalid localStorage data", () => {
    localStorage.setItem("deskbuddy_quick_notes", JSON.stringify({ invalid: true }));
    render(<QuickNotes />);

    expect(screen.getByText(/📝 Quick Notes & Scratchpad/i)).toBeInTheDocument();
    expect(screen.getByText(/Euler's Formula & Identity/i)).toBeInTheDocument();
  });

  test("handles storage quota errors gracefully", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });

    render(<QuickNotes />);

    expect(
      screen.getByText(/Storage quota reached or unavailable/i)
    ).toBeInTheDocument();
  });
});
