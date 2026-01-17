//pages/Signup.js
import signImg from "./login.png"; 

function Signup({ setPage }) {
    const handleSignup = () => {
      const name = document.getElementById("name").value;
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
  
      if (!name || !username || !password) {
        alert("Please fill all fields");
        return;
      }
  
      localStorage.setItem(
        "user",
        JSON.stringify({ name, username, password })
      );
  
      alert("Account created successfully!");
      setPage("login");
    };
  
    return (
      <div className="auth-wrapper">
        <div className="auth-left">
          <h2>Sign Up</h2>
          <p className="subtitle">Enter your account details</p>
  
          <input id="name" placeholder="Full Name" />
          <input id="username" placeholder="Username" />
          <input id="password" type="password" placeholder="Password" />
  
          <button className="primary-btn" onClick={handleSignup}>
            Create Account
          </button>
  
          <div className="switch-row">
            <span>Already have an account?</span>
            <button className="switch-btn" onClick={() => setPage("login")}>
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
  