import { useState } from "react";
import signImg from "./login.png";

function Signup({ setPage }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setError("");

    if (!name.trim() || !username.trim() || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      localStorage.setItem(
        "user",
        JSON.stringify({ name: name.trim(), username: username.trim(), password })
      );

      alert("Account created successfully!");
      setPage("login");
    } catch {
      setError("Failed to save account. Please try again.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-left">
        <h2>Sign Up</h2>
        <p className="subtitle">Enter your account details</p>

        {error && <p className="error" style={{ marginBottom: "12px" }}>{error}</p>}

        <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            id="name"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
          <input
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />

          <button type="submit" className="primary-btn">
            Create Account
          </button>
        </form>

        <div className="switch-row" style={{ marginTop: "16px" }}>
          <span>Already have an account?</span>
          <button
            type="button"
            className="switch-btn"
            onClick={() => setPage("login")}
          >
            Login
          </button>
        </div>
      </div>

      <div className="auth-right">
        <div className="welcome-card">
          <h1>
            Welcome to <br />
            <span>Desk Buddy</span>
          </h1>
          <p>Create your account to get started</p>

          <img
            src={signImg}
            alt="Illustration"
            className="welcome-img"
          />
        </div>
      </div>
    </div>
  );
}

export default Signup;
