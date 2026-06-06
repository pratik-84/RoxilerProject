import {
    useEffect,
    useState
  } from "react";
  
  import API from "../../api/axios";
  
  
  function StoreList() {
  
    const [stores, setStores] =
      useState([]);
  
    const [search, setSearch] =
      useState("");
  
  
    // FETCH STORES
    useEffect(() => {
  
      fetchStores();
  
    }, []);
  
  
    const fetchStores = async (
      order = "ASC"
    ) => {
  
      try {
  
        const res = await API.get(
          `/stores?search=${search}&sort=name&order=${order}`
        );
  
        console.log(res.data);
  
        setStores(res.data.stores);
  
      } catch (error) {
  
        console.log(error);
  
      }
  
    };
  
  
    // SUBMIT RATING FUNCTION
    const submitRating = async (
      storeId,
      rating
    ) => {
  
      try {
  
        await API.post(
          "/ratings",
          {
            store_id: storeId,
            rating
          }
        );
  
        alert("Rating submitted");
  
      } catch (error) {
  
        console.log(error);
  
      }
  
    };
  
  
  
    return (
  
      <div>
  
        <h1>Stores</h1>
  
        <button
          onClick={() =>
            fetchStores("ASC")
          }
        >
          Sort A-Z
        </button>
  
        <button
          onClick={() =>
            fetchStores("DESC")
          }
        >
          Sort Z-A
        </button>
  
  
        {/* SEARCH INPUT */}
  
        <input
          type="text"
          placeholder="Search stores"
  
          value={search}
  
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
  
        <button onClick={fetchStores}>
          Search
        </button>
  
  
        <table border="1">
  
          <thead>
  
            <tr>
  
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Rating</th>
  
            </tr>
  
          </thead>
  
  
          {/* TBODY STARTS HERE */}
          <tbody>
  
            {
              stores.map((store) => (
  
                <tr key={store.id}>
  
                  <td>{store.name}</td>
  
                  <td>{store.email}</td>
  
                  <td>{store.address}</td>
  
                  <td>
  
                    <input
                      type="number"
                      min="1"
                      max="5"
  
                      onChange={(e) => {
  
                        store.rating =
                          e.target.value;
  
                      }}
                    />
  
                    <button
                      onClick={() =>
                        submitRating(
                          store.id,
                          store.rating
                        )
                      }
                    >
                      Submit
                    </button>
  
                  </td>
  
                </tr>
  
              ))
            }
  
          </tbody>
          {/* TBODY ENDS HERE */}
  
        </table>
  
      </div>
  
    );
  }
  
  export default StoreList;