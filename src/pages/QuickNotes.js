import React, { useState, useEffect, useRef } from "react";

export const NOTE_CATEGORIES = [
  "General",
  "Formulas",
  "Lectures",
  "Reminders",
  "Ideas",
  "Exam Prep",
];

export const NOTE_COLORS = [
  { id: "yellow", name: "Sunny Yellow", lightBg: "#fef9c3", lightBorder: "#fde047", darkBg: "#3a341c", darkBorder: "#854d0e" },
  { id: "green", name: "Mint Green", lightBg: "#dcfce7", lightBorder: "#86efac", darkBg: "#163828", darkBorder: "#166534" },
  { id: "blue", name: "Sky Blue", lightBg: "#e0f2fe", lightBorder: "#7dd3fc", darkBg: "#17344f", darkBorder: "#075985" },
  { id: "purple", name: "Lavender", lightBg: "#f3e8ff", lightBorder: "#d8b4fe", darkBg: "#331f4a", darkBorder: "#6b21a8" },
  { id: "pink", name: "Rose Peach", lightBg: "#ffe4e6", lightBorder: "#fda4af", darkBg: "#3f1a24", darkBorder: "#9f1239" },
];

export const DEFAULT_NOTES = [
  {
    id: 1,
    title: "Euler's Formula & Identity",
    category: "Formulas",
    color: "blue",
    content: "e^(i * π) + 1 = 0\nRelates complex exponential functions to trigonometric functions: e^(iθ) = cos(θ) + i*sin(θ).",
    pinned: true,
    updatedAt: "2026-11-16T10:00:00.000Z",
  },
  {
    id: 2,
    title: "Physics Lab Viva Pointers",
    category: "Lectures",
    color: "green",
    content: "Key topics to review before Thursday's viva:\n1. Maxwell's displacement current\n2. Poynting theorem & energy flow\n3. Wave propagation in dielectric mediums",
    pinned: true,
    updatedAt: "2026-11-15T14:30:00.000Z",
  },
  {
    id: 3,
    title: "Midterm Study Checklist",
    category: "Exam Prep",
    color: "yellow",
    content: "• Solve 2025 past questions paper\n• Review Chapters 3 & 4 summary cheatsheet\n• Practice 10 pointer questions in C/C++",
    pinned: false,
    updatedAt: "2026-11-14T09:15:00.000Z",
  },
  {
    id: 4,
    title: "Project Idea: Spaced Repetition Flashcards",
    category: "Ideas",
    color: "purple",
    content: "Build a flashcard deck feature for Desk Buddy that uses Leitner's 3-box spaced repetition algorithm for engineering formulas.",
    pinned: false,
    updatedAt: "2026-11-13T16:45:00.000Z",
  },
];

/**
 * Validates whether an object represents a valid quick note item.
 * @param {any} note - Candidate note object.
 * @returns {boolean} True if the item is a valid note.
 */
export const isValidNote = (note) => {
  return (
    Boolean(note) &&
    typeof note === "object" &&
    (typeof note.id === "string" || typeof note.id === "number") &&
    typeof note.title === "string" &&
    typeof note.content === "string" &&
    typeof note.category === "string" &&
    typeof note.color === "string" &&
    typeof note.pinned === "boolean"
  );
};

/**
 * Validates whether the parsed data is an array of valid notes.
 * @param {any} data - Parsed data from local storage.
 * @returns {boolean} True if data is a non-empty or valid array of notes.
 */
export const isValidNotesList = (data) => {
  return Array.isArray(data) && data.every(isValidNote);
};

/**
 * Generates an ID guaranteed to be unique across all existing notes.
 * @param {Array<{id: number|string}>} existingNotes - List of existing notes.
 * @returns {number} Unique numeric identifier.
 */
export const generateUniqueNoteId = (existingNotes = []) => {
  const existingIds = new Set(existingNotes.map((n) => n.id));
  let candidateId = Date.now();
  while (existingIds.has(candidateId)) {
    candidateId += 1;
  }
  return candidateId;
};

/**
 * Formats an ISO date string or timestamp into a readable date string.
 * @param {string|number} dateInput - ISO timestamp or epoch number.
 * @returns {string} Formatted human-readable date.
 */
export const formatNoteDate = (dateInput) => {
  if (!dateInput) return "";
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * QuickNotes component providing a colorful sticky-note board with search,
 * tags, pinning, and persistent storage.
 * @returns {JSX.Element} The rendered QuickNotes view.
 */
function QuickNotes() {
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem("deskbuddy_quick_notes");
      if (!saved) return DEFAULT_NOTES;
      const parsed = JSON.parse(saved);
      return isValidNotesList(parsed) ? parsed : DEFAULT_NOTES;
    } catch {
      return DEFAULT_NOTES;
    }
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [copiedNoteId, setCopiedNoteId] = useState(null);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [storageError, setStorageError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    category: "General",
    color: "yellow",
    content: "",
    pinned: false,
  });

  const successTimeoutRef = useRef(null);
  const copiedTimeoutRef = useRef(null);

  // Clear pending timers on unmount
  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
      }
      if (copiedTimeoutRef.current) {
        clearTimeout(copiedTimeoutRef.current);
      }
    };
  }, []);

  // Save to localStorage with error handling
  useEffect(() => {
    try {
      localStorage.setItem("deskbuddy_quick_notes", JSON.stringify(notes));
      setStorageError("");
    } catch (err) {
      console.error("Failed to save quick notes to localStorage:", err);
      setStorageError(
        "Storage quota reached or unavailable. Your note changes could not be saved."
      );
    }
  }, [notes]);

  /**
   * Handles input changes in the note form.
   * @param {React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>} e
   */
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setFormError("");
  };

  /**
   * Submits new note or updates existing note.
   * @param {React.FormEvent} e - Form submission event.
   */
  const handleSaveNote = (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setFormError("Please enter a note title.");
      return;
    }
    if (!formData.content.trim()) {
      setFormError("Please enter note content.");
      return;
    }

    if (editingNoteId !== null) {
      // Update existing note
      setNotes((prev) =>
        prev.map((n) =>
          n.id === editingNoteId
            ? {
                ...n,
                title: formData.title.trim(),
                category: formData.category,
                color: formData.color,
                content: formData.content.trim(),
                pinned: formData.pinned,
                updatedAt: new Date().toISOString(),
              }
            : n
        )
      );
      setFormSuccess(`Updated note "${formData.title.trim()}"!`);
    } else {
      // Add new note
      const newNote = {
        id: generateUniqueNoteId(notes),
        title: formData.title.trim(),
        category: formData.category,
        color: formData.color,
        content: formData.content.trim(),
        pinned: formData.pinned,
        updatedAt: new Date().toISOString(),
      };
      setNotes((prev) => [newNote, ...prev]);
      setFormSuccess(`Created note "${formData.title.trim()}"!`);
    }

    if (successTimeoutRef.current) {
      clearTimeout(successTimeoutRef.current);
    }
    successTimeoutRef.current = setTimeout(() => {
      setFormSuccess("");
      successTimeoutRef.current = null;
    }, 3000);

    // Reset form
    setFormData({
      title: "",
      category: "General",
      color: "yellow",
      content: "",
      pinned: false,
    });
    setEditingNoteId(null);
    setShowAddForm(false);
  };

  /**
   * Opens the form populated with an existing note for editing.
   * @param {Object} note - The note to edit.
   */
  const handleStartEdit = (note) => {
    setFormData({
      title: note.title,
      category: note.category,
      color: note.color,
      content: note.content,
      pinned: note.pinned,
    });
    setEditingNoteId(note.id);
    setShowAddForm(true);
    setFormError("");
  };

  /**
   * Cancels the add/edit form and resets form state.
   */
  const handleCancelForm = () => {
    setShowAddForm(false);
    setEditingNoteId(null);
    setFormData({
      title: "",
      category: "General",
      color: "yellow",
      content: "",
      pinned: false,
    });
    setFormError("");
  };

  /**
   * Toggles the pinned state of a note.
   * @param {number|string} id - Target note id.
   */
  const handleTogglePin = (id) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n))
    );
  };

  /**
   * Deletes a note by id.
   * @param {number|string} id - Target note id.
   */
  const handleDeleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  /**
   * Copies note title and content to user clipboard.
   * @param {Object} note - Target note.
   */
  const handleCopyNote = (note) => {
    const textToCopy = `${note.title}\n[${note.category}]\n\n${note.content}`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(textToCopy).catch(() => {});
    }
    setCopiedNoteId(note.id);
    if (copiedTimeoutRef.current) {
      clearTimeout(copiedTimeoutRef.current);
    }
    copiedTimeoutRef.current = setTimeout(() => {
      setCopiedNoteId(null);
      copiedTimeoutRef.current = null;
    }, 2000);
  };

  // Filter notes by search query and category
  const filteredNotes = notes
    .filter((note) => {
      const matchesCategory =
        selectedCategory === "All" || note.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        note.title.toLowerCase().includes(q) ||
        note.content.toLowerCase().includes(q) ||
        note.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      // Pinned notes always come first
      if (a.pinned !== b.pinned) {
        return a.pinned ? -1 : 1;
      }
      // Then newest first
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

  // Calculate metrics
  const totalNotesCount = notes.length;
  const pinnedNotesCount = notes.filter((n) => n.pinned).length;
  const categoriesCount = new Set(notes.map((n) => n.category)).size;

  return (
    <div className="notes-container">
      {/* Header */}
      <div className="notes-header">
        <div>
          <h2>📝 Quick Notes & Scratchpad</h2>
          <p className="notes-subtitle">
            Jot down formulas, lecture thoughts, and quick study reminders
          </p>
        </div>
        <button
          className="primary-btn notes-add-toggle-btn"
          onClick={() => {
            if (showAddForm) {
              handleCancelForm();
            } else {
              setShowAddForm(true);
            }
          }}
        >
          {showAddForm ? "✖ Close Form" : "➕ New Note"}
        </button>
      </div>

      {/* Metrics Row */}
      <div className="notes-metrics-row">
        <div className="metric-card">
          <span className="metric-label">Total Notes</span>
          <span className="metric-value">{totalNotesCount}</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">📌 Pinned Notes</span>
          <span className="metric-value">{pinnedNotesCount}</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Categories Used</span>
          <span className="metric-value">{categoriesCount}</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Showing</span>
          <span className="metric-value">{filteredNotes.length} notes</span>
        </div>
      </div>

      {/* Storage & Success Feedback */}
      {storageError && <div className="schedule-error">{storageError}</div>}
      {formSuccess && <div className="schedule-success">{formSuccess}</div>}

      {/* Add / Edit Note Form */}
      {showAddForm && (
        <div className="notes-form-card">
          <h3>{editingNoteId !== null ? "✏️ Edit Note" : "📝 Create New Note"}</h3>
          {formError && <div className="schedule-error">{formError}</div>}

          <form onSubmit={handleSaveNote}>
            <div className="notes-form-grid">
              <div className="form-group">
                <label htmlFor="note-title">Note Title *</label>
                <input
                  id="note-title"
                  type="text"
                  name="title"
                  placeholder="e.g. Maxwell Equations, Calculus Shortcut..."
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="note-category">Category *</label>
                <select
                  id="note-category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  {NOTE_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group notes-color-picker-group">
                <label>Color Theme</label>
                <div className="notes-color-swatches">
                  {NOTE_COLORS.map((c) => (
                    <button
                      type="button"
                      key={c.id}
                      className={`color-swatch-btn ${
                        formData.color === c.id ? "active" : ""
                      }`}
                      style={{ backgroundColor: c.lightBg, borderColor: c.lightBorder }}
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, color: c.id }))
                      }
                      title={c.name}
                      aria-label={c.name}
                    >
                      {formData.color === c.id && "✓"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group notes-checkbox-group">
                <label className="notes-checkbox-label">
                  <input
                    type="checkbox"
                    name="pinned"
                    checked={formData.pinned}
                    onChange={handleInputChange}
                  />
                  <span>📌 Pin to top of board</span>
                </label>
              </div>

              <div className="form-group notes-content-fullwidth">
                <label htmlFor="note-content">Note Content *</label>
                <textarea
                  id="note-content"
                  name="content"
                  rows={4}
                  placeholder="Write formulas, shortcuts, or study reminders here..."
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-actions-row">
              <button type="submit" className="primary-btn">
                {editingNoteId !== null ? "Update Note" : "Save Note"}
              </button>
              <button
                type="button"
                className="secondary-btn"
                onClick={handleCancelForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="notes-controls-bar">
        <div className="notes-search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="notes-search-input"
            placeholder="Search notes by title, topic, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="notes-search-clear-btn"
              onClick={() => setSearchQuery("")}
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Category Filter Chips */}
        <div className="notes-category-chips">
          <button
            className={`category-chip ${
              selectedCategory === "All" ? "active" : ""
            }`}
            onClick={() => setSelectedCategory("All")}
          >
            All ({notes.length})
          </button>
          {NOTE_CATEGORIES.map((cat) => {
            const count = notes.filter((n) => n.category === cat).length;
            return (
              <button
                key={cat}
                className={`category-chip ${
                  selectedCategory === cat ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
                {count > 0 && <span className="category-chip-count">{count}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Notes Grid */}
      {filteredNotes.length === 0 ? (
        <div className="notes-empty-state">
          <div className="empty-icon">📝</div>
          <h4>No notes found</h4>
          <p>
            {searchQuery || selectedCategory !== "All"
              ? "Try adjusting your search query or category filter."
              : "Keep your study ideas and formulas handy by adding your first note!"}
          </p>
          <button
            className="primary-btn"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
              setShowAddForm(true);
            }}
          >
            ➕ Create a Note
          </button>
        </div>
      ) : (
        <div className="notes-cards-grid">
          {filteredNotes.map((note) => {
            const colorDef =
              NOTE_COLORS.find((c) => c.id === note.color) || NOTE_COLORS[0];
            const isCopied = copiedNoteId === note.id;

            return (
              <div
                key={note.id}
                className={`note-card note-theme-${note.color} ${
                  note.pinned ? "is-pinned" : ""
                }`}
                style={{
                  "--note-light-bg": colorDef.lightBg,
                  "--note-light-border": colorDef.lightBorder,
                  "--note-dark-bg": colorDef.darkBg,
                  "--note-dark-border": colorDef.darkBorder,
                }}
              >
                <div className="note-card-topbar">
                  <span className="note-category-tag">{note.category}</span>
                  <button
                    type="button"
                    className={`note-pin-btn ${note.pinned ? "active" : ""}`}
                    onClick={() => handleTogglePin(note.id)}
                    title={note.pinned ? "Unpin note" : "Pin note to top"}
                    aria-label={note.pinned ? "Unpin note" : "Pin note to top"}
                  >
                    {note.pinned ? "📌 Pinned" : "📍 Pin"}
                  </button>
                </div>

                <h4 className="note-card-title">{note.title}</h4>
                <p className="note-card-content">{note.content}</p>

                <div className="note-card-footer">
                  <span className="note-date">
                    {formatNoteDate(note.updatedAt)}
                  </span>
                  <div className="note-card-actions">
                    <button
                      type="button"
                      className={`note-action-btn ${isCopied ? "btn-copied" : ""}`}
                      onClick={() => handleCopyNote(note)}
                      title="Copy note text"
                      aria-label="Copy note text"
                    >
                      {isCopied ? "✓ Copied" : "📋 Copy"}
                    </button>
                    <button
                      type="button"
                      className="note-action-btn"
                      onClick={() => handleStartEdit(note)}
                      title="Edit note"
                      aria-label="Edit note"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      type="button"
                      className="note-action-btn btn-delete"
                      onClick={() => handleDeleteNote(note.id)}
                      title="Delete note"
                      aria-label="Delete note"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default QuickNotes;
