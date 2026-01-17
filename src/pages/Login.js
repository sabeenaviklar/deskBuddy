//pages/Login.js
// import loginImg from "./login.png"; 

// function Login({ setPage, setLoggedIn }) {
//     const handleLogin = () => {
//       const username = document.getElementById("login-username").value;
//       const password = document.getElementById("login-password").value;
  
//       const savedUser = JSON.parse(localStorage.getItem("user"));
  
//       if (
//         savedUser &&
//         savedUser.username === username &&
//         savedUser.password === password
//       ) {
//         setLoggedIn(true);
//       } else {
//         alert("Invalid credentials");
//       }
//     };
  
//     return (
//       <div className="auth-wrapper">
//         <div className="auth-left">
//           <h2>Login</h2>
//           <p className="subtitle">Enter your account details</p>
  
//           <input id="login-username" placeholder="Username" />
//           <input
//             id="login-password"
//             type="password"
//             placeholder="Password"
//           />
  
//           <span className="forgot">Forgot Password?</span>
  
//           <button className="primary-btn" onClick={handleLogin}>
//             Login
//           </button>
  
//           <div className="switch-row">
//             <span>Don’t have an account?</span>
//             <button className="switch-btn" onClick={() => setPage("signup")}>
//               Sign up
//             </button>
//           </div>
//         </div>
  
//         <div className="auth-right">
//           <div className="welcome-card">
//             <h1>
//               Welcome to <br />
//               <span>Desk Buddy </span>
//             </h1>
//             <p>Login to access your account</p>
  
//             <img
//               src={loginImg}
//               alt="Illustration"
//               className="welcome-img"
//             />
//           </div>
//         </div>
//       </div>
//     );
//   }
  
//   export default Login;
  
// import loginImg from "./login.jpg"; // or "./login.png"

// function Login({ setPage, setUser }) {
//   const handleLogin = () => {
//     const username = document.getElementById("login-username").value;
//     const password = document.getElementById("login-password").value;

//     const savedUser = JSON.parse(localStorage.getItem("user"));

//     if (
//       savedUser &&
//       savedUser.username === username &&
//       savedUser.password === password
//     ) {
//       // ✅ FIX: set user instead of setLoggedIn
//       setUser(savedUser);
//     } else {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <div className="auth-wrapper">
//       {/* LEFT PANEL */}
//       <div className="auth-left">
//         <h2>Login</h2>
//         <p className="subtitle">Enter your account details</p>

//         <input
//           id="login-username"
//           placeholder="Username"
//         />

//         <input
//           id="login-password"
//           type="password"
//           placeholder="Password"
//         />

//         <span className="forgot">Forgot Password?</span>

//         <button className="primary-btn" onClick={handleLogin}>
//           Login
//         </button>

//         <div className="switch-row">
//           <span>Don’t have an account?</span>
//           <button
//             className="switch-btn"
//             onClick={() => setPage("signup")}
//           >
//             Sign up
//           </button>
//         </div>
//       </div>

//       {/* RIGHT PANEL */}
//       <div className="auth-right">
//         <div className="welcome-card">
//           <h1>
//             Welcome to <br />
//             <span>Desk Buddy</span>
//           </h1>
//           <p>Login to access your account</p>

//           <img
//             src={loginImg}
//             alt="Login Illustration"
//             className="welcome-img"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;


// pages/Login.js
import loginImg from "./login.png";

function Login({ setPage, setUser }) {
  const handleLogin = () => {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (
      savedUser &&
      savedUser.username === username &&
      savedUser.password === password
    ) {
      // ✅ THIS is the correct login
      setUser(savedUser);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-left">
        <h2>Login</h2>
        <p className="subtitle">Enter your account details</p>

        <input id="login-username" placeholder="Username" />
        <input
          id="login-password"
          type="password"
          placeholder="Password"
        />

        <span className="forgot">Forgot Password?</span>

        <button className="primary-btn" onClick={handleLogin}>
          Login
        </button>

        <div className="switch-row">
          <span>Don’t have an account?</span>
          <button
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
