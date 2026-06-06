import {
    useEffect,
    useState
  } from "react";
  
  import API from "../../api/axios";
  
  
  function OwnerDashboard() {
  
    const [data, setData] =
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
          "/owner/dashboard"
        );
  
        setData(res.data);
  
      } catch (error) {
  
        console.log(error);
  
      }
  
    };
  
  
    return (
  
      <div>
  
        <h1>Owner Dashboard</h1>
  
        <h3>
          Average Rating:
        </h3>
  
        <p>
          {
            data.averageRating?.averageRating
          }
        </p>
  
        <h2>Users Who Rated</h2>
  
        <table border="1">
  
          <thead>
  
            <tr>
  
              <th>Name</th>
              <th>Email</th>
              <th>Rating</th>
  
            </tr>
  
          </thead>
  
          <tbody>
  
            {
              data.ratings?.map((item) => (
  
                <tr key={item.id}>
  
                  <td>
                    {item.User?.name}
                  </td>
  
                  <td>
                    {item.User?.email}
                  </td>
  
                  <td>
                    {item.rating}
                  </td>
  
                </tr>
  
              ))
            }
  
          </tbody>
  
        </table>
  
        <button onClick={handleLogout}>
          Logout
        </button>
  
      </div>
  
    );
  }
  
  export default OwnerDashboard;