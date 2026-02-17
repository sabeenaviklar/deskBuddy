function Topbar({ user, darkMode, setDarkMode }) {
  return (
    <div className="topbar">
      <input placeholder="Search..." />

      <button
        className="theme-toggle"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>
    </div>
  );
}

export default Topbar;
