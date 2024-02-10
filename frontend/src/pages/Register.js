import React, { useState } from 'react';

const Register = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    passwordCheck: ""
  })

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const passwordMatch = () => input.passwordCheck === input.password;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.username !== "" && input.password !== "" && input.email !== "" && input.passwordCheck !== "" && passwordMatch()) {  
      const formData = {
        email: input.email,
        username: input.username,
        password: input.password,
        passwordCheck: input.passwordCheck
      };
      fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      .then(response => response.json())
      .then(data => {
        alert(`What's good ${input.username}?!`);
      })
      .catch(() => {
        alert("There was an error processing your registration.");
      });
    } else {
      alert("Lock in bro");
    }
  };
  
  return (
    <form onSubmit={handleSubmit} method="post">
        <input type="email" name="email" placeholder="Email" onInput={handleInput}/>
        <input type="name" name="username" placeholder="Username" onInput={handleInput}/>
        <input type="password" name="password" placeholder="Password" onInput={handleInput}/>
        <input type="password" name="passwordCheck" placeholder="Retype Password" onInput={handleInput}/>
        <button type="submit">Register</button>
    </form>
  );
};

export default Register;