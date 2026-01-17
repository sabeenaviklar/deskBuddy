function Topbar({ user }) {
    return (
      <div className="topbar">
        
        <div className="profile">
          {user.name}
        </div>
      </div>
    );
  }
  
  export default Topbar;
  