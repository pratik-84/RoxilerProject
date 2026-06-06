function UserDashboard() {

    const handleLogout = () => {
  
      localStorage.clear();
  
      window.location.href = "/login";
  
    };
  
    return (
  
      <div>
  
        <h1>User Dashboard</h1>
  
        <button onClick={handleLogout}>
          Logout
        </button>
  
      </div>
  
    );
  }
  
  export default UserDashboard;