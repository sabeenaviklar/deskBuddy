// // // import { useState } from "react";
// // // import Login from "./pages/Login";
// // // import Dashboard from "./pages/Dashboard";
// // // import TimeTracker from "./pages/TimeTracker";
// // // import LeaveTracker from "./pages/LeaveTracker";
// // // import Navbar from "./components/Navbar";
// // // import "./App.css";

// // // function App() {
// // //   const [user, setUser] = useState(
// // //     JSON.parse(localStorage.getItem("user"))
// // //   );
// // //   const [page, setPage] = useState("dashboard");

// // //   if (!user) {
// // //     return <Login setUser={setUser} />;
// // //   }

// // //   return (
// // //     <>
// // //       <Navbar setPage={setPage} setUser={setUser} />
// // //       {page === "dashboard" && <Dashboard />}
// // //       {page === "time" && <TimeTracker />}
// // //       {page === "leave" && <LeaveTracker />}
// // //     </>
// // //   );
// // // }

// // // export default App;

// // // import Auth from "./pages/Auth";
// // // import "./App.css";

// // // function App() {
// // //   return <Auth />;
// // // }

// // // export default App;

// // import { useState } from "react";
// // import Login from "./pages/Login";
// // import Signup from "./pages/Signup";
// // import "./App.css";

// // function App() {
// //   const [page, setPage] = useState("login");
// //   const [loggedIn, setLoggedIn] = useState(false);

// //   if (loggedIn) {
// //     return (
// //       <div className="dashboard">
// //         <h1>🎉 Logged in successfully</h1>
// //         <p>This is your dashboard</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <>
// //       {page === "login" && (
// //         <Login setPage={setPage} setLoggedIn={setLoggedIn} />
// //       )}
// //       {page === "signup" && <Signup setPage={setPage} />}
// //     </>
// //   );
// // }

// // export default App;

// import { useState } from "react";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Dashboard from "./pages/Dashboard";
// import "./App.css";

// function App() {
//   const [page, setPage] = useState("login");
//   const [user, setUser] = useState(
//     JSON.parse(localStorage.getItem("user"))
//   );

//   if (!user) {
//     return page === "login" ? (
//       <Login setPage={setPage} setUser={setUser} />
//     ) : (
//       <Signup setPage={setPage} />
//     );
//   }

//   return <Dashboard setUser={setUser} />;
// }

// export default App;


import { useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  // If user is logged in → show dashboard
  if (user) {
    return <Dashboard setUser={setUser} />;
  }

  // Else → auth pages
  return page === "login" ? (
    <Login setPage={setPage} setUser={setUser} />
  ) : (
    <Signup setPage={setPage} />
  );
}

export default App;
