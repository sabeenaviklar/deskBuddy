import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  if (user) {
    return (
      <Dashboard
        setUser={setUser}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    );
  }

  return page === "login" ? (
    <Login setPage={setPage} setUser={setUser} />
  ) : (
    <Signup setPage={setPage} />
  );
}

export default App;
