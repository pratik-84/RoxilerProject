import { useState } from "react";

import API from "../../api/axios";


function AddStore() {

  const [formData, setFormData] =
    useState({

      name: "",
      email: "",
      address: "",
      owner_id: ""

    });


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/stores",
        formData
      );

      alert("Store created");

    } catch (error) {

        console.log(error.response.data);

    }

  };


  return (

    <div>

      <h1>Add Store</h1>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Store Name"
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="address"
          placeholder="Address"
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="owner_id"
          placeholder="Owner ID"
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Create Store
        </button>

      </form>

    </div>

  );
}

export default AddStore;