function Topbar({ user }) {
    return (
      <div className="topbar">
        <input placeholder="Search..." />
        <div className="profile">
          {user.name}
        </div>
      </div>
    );
  }
  
  export default Topbar;
  