function Topbar({ user, darkMode, setDarkMode }) {
  return (
    <div className="topbar">
      <input
        type="search"
        placeholder="Search..."
        aria-label="Search"
      />

      <button
        type="button"
        className="theme-toggle"
        onClick={() => setDarkMode((current) => !current)}
        aria-pressed={darkMode}
        aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </div>
  );
}

export default Topbar;