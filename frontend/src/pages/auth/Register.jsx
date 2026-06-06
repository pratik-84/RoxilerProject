import { useState } from "react";
import API from "../../api/axios";

function Register() {

  const [formData, setFormData] =
    useState({

      name: "",
      email: "",
      password: "",
      address: ""

    });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/auth/register",
        formData
      );

      alert("Registration successful");

    } catch (error) {

      alert(error.response.data.message);

    }

  };

  return (

    <div>

      <h1>Register</h1>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Name"
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
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="address"
          placeholder="Address"
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Register
        </button>

      </form>

    </div>

  );
}

export default Register;