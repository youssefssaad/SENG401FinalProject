import React, { useState } from "react";
import closeEye from "../assets/eye-close.png";
import axios from "axios";

const Register = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    passwordCheck: "",
  });


  // let password = document.getElementById('password');

  const [showPassword, setShowPassword] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // const togglePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // };

  const passwordMatch = () => input.passwordCheck === input.password;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      input.username !== "" &&
      input.password !== "" &&
      input.email !== "" &&
      input.passwordCheck !== "" &&
      passwordMatch()
    )
    {
      axios.post('http://localhost:8080/users/create', {
        email: input.email,
        username: input.username,
        password: input.password,
      })
          .then((response) => {
            alert(`What's good ${input.username}?!`);
            window.location.href = "http://localhost:3000/";
          }, (error) => {
            alert(error.response.data);
          });
    }
    else
    {
      alert("Lock in bro");
    }
  };

  return (
    <>
      <div classname="title">
        <h1 classname="title">Register</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleInput}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleInput}
        />
        <div
          style={{
            backgroundColor: "#fff",
            width: "100%",
            display: "flex",
            alignItems: "center",
            borderRadius: '5px',
            // padding: '0px 0px',
            margin: '0px 0px 20px 0px',
          }}
        >
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Password"
            onChange={handleInput}
            style={{ width: "100%", marginBottom:'10px', border:0, outline: 0 }}
          />
          <img src={closeEye} id="eyeicon"
          style={{
            backgroundColor: "#fff",
            width: "20px",
            cursor: 'pointer',
            marginRight: '10px',
          }}/>
        </div>
        <input
          type={showPassword ? "text" : "password"}
          name="passwordCheck"
          placeholder="Retype Password"
          onChange={handleInput}
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
