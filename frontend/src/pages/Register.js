import React, { useState } from "react";
import closeEye from "../assets/eye-close.png";
import openEye from "../assets/eye-open.png"

const Register = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    passwordCheck: "",
  });

  let eyeicon = document.getElementById('eyeicon');
  let password = document.getElementById('password');

  eyeicon.onclick = function() {
    if (password.type === 'password') {
      password.type = 'text';
      eyeicon.src = openEye;
    } else {
      password.type = 'password';
      eyeicon.src = closeEye;
    }
  }

  const [showPassword, setShowPassword] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const passwordMatch = () => input.passwordCheck === input.password;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      input.username !== "" &&
      input.password !== "" &&
      input.email !== "" &&
      input.passwordCheck !== "" &&
      passwordMatch()
    ) {
      try {
        const formData = {
          email: input.email,
          username: input.username,
          password: input.password,
        };
        const response = await fetch("http://localhost:3000/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Server responded with an error!");
        }
        const data = await response.json();
        alert(`What's good ${input.username}?!`);
      } catch (error) {
        alert("There was an error processing your registration.");
      }
    } else {
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
