import { useState } from "react";
import loginImg from "./login.png";

function Login({ setPage, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setError("");

    if (!username.trim() || !password) {
      setError("Please enter both username and password");
      return;
    }

    try {
      const savedUser = JSON.parse(localStorage.getItem("user"));

      if (
        savedUser &&
        savedUser.username === username.trim() &&
        savedUser.password === password
      ) {
        setUser(savedUser);
      } else {
        setError("Invalid credentials. Please check your username and password.");
      }
    } catch {
      setError("Error accessing account data.");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-left">
        <h2>Login</h2>
        <p className="subtitle">Enter your account details</p>

        {error && <p className="error" style={{ marginBottom: "12px" }}>{error}</p>}

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            id="login-username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />
          <input
            id="login-password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          <span className="forgot">Forgot Password?</span>

          <button type="submit" className="primary-btn">
            Login
          </button>
        </form>

        <div className="switch-row" style={{ marginTop: "16px" }}>
          <span>Don’t have an account?</span>
          <button
            type="button"
            className="switch-btn"
            onClick={() => setPage("signup")}
          >
            Sign up
          </button>
        </div>
      </div>

      <div className="auth-right">
        <div className="welcome-card">
          <h1>
            Welcome to <br />
            <span>Desk Buddy</span>
          </h1>
          <p>Login to access your account</p>

          <img
            src={loginImg}
            alt="Illustration"
            className="welcome-img"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
