import { useState } from "react";
import illustration from "../assets/illustration.png";

function Auth() {
  const [mode, setMode] = useState("login");

  return (
    <div className="auth-wrapper">
      {/* LEFT LOGIN PANEL */}
      <div className="auth-left">
        <h2>{mode === "login" ? "Login" : "Sign Up"}</h2>
        <p className="subtitle">Enter your account details</p>

        {mode === "signup" && (
          <input type="text" placeholder="Full Name" />
        )}

        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />

        {mode === "login" && (
          <span className="forgot">Forgot Password?</span>
        )}

        <button className="primary-btn">
          {mode === "login" ? "Login" : "Create Account"}
        </button>

        <div className="switch-row">
          <span>
            {mode === "login"
              ? "Don’t have an account?"
              : "Already have an account?"}
          </span>
          <button
            className="switch-btn"
            onClick={() =>
              setMode(mode === "login" ? "signup" : "login")
            }
          >
            {mode === "login" ? "Sign up" : "Login"}
          </button>
        </div>
      </div>

      {/* RIGHT ILLUSTRATION PANEL */}
      {/* <div className="auth-right">
        <div className="illustration-card">
          <h1>
            Welcome to <br />
            <span>student portal</span>
          </h1>
          <p>Login to access your account</p>

          <img
            src={illustration}
            alt="Student Illustration"
            className="illustration-img"
          />
        </div>
      </div> */}

<div className="auth-right">
  <div className="illustration-card">
    <div className="illustration-text">
      <h1>
        Welcome to <br />
        <span>Study desk</span>
      </h1>
      <p>Login to access your account</p>
    </div>

    <img
      src={illustration}
      alt="Student Illustration"
      className="illustration-img"
    />
  </div>
</div>

    </div>
  );
}

export default Auth;
