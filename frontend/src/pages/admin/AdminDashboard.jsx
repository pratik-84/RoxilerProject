import { useEffect, useState } from "react";

import API from "../../api/axios";


function AdminDashboard() {

  const [dashboard, setDashboard] =
    useState({});

  const handleLogout = () => {

    localStorage.clear();

    window.location.href = "/login";

  };


  useEffect(() => {

    fetchDashboard();

  }, []);


  const fetchDashboard = async () => {

    try {

      const res = await API.get(
        "/admin/dashboard"
      );

      setDashboard(res.data.dashboard);

    } catch (error) {

      console.log(error);

    }

  };


  return (

    <div>

      <h1>Admin Dashboard</h1>

      <h3>
        Total Users:
        {dashboard.totalUsers}
      </h3>

      <h3>
        Total Stores:
        {dashboard.totalStores}
      </h3>

      <h3>
        Total Ratings:
        {dashboard.totalRatings}
      </h3>

      <button onClick={handleLogout}>
        Logout
      </button>

    </div>

  );
}

export default AdminDashboard;