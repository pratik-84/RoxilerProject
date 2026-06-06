import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../../api/axios";


function Login() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        "/auth/login",
        {
          email,
          password
        }
      );

      // save token
      localStorage.setItem(
        "token",
        res.data.token
      );

      // save user
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );


      // role based redirect
      const role = res.data.user.role;

      if (role === "admin") {

        navigate("/admin");

      }

      else if (role === "owner") {

        navigate("/owner");

      }

      else {

        navigate("/user");

      }

    } catch (error) {

      alert(error.response.data.message);

    }

  };



  return (

    <div>

      <h1>Login</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <br /><br />

        <button type="submit">
          Login
        </button>

      </form>

    </div>

  );
}

export default Login;