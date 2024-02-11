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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.username !== "" && input.password !== "" && input.email !== "" && input.passwordCheck !== "" && passwordMatch()) {
      try {
        const formData = {
          email: input.email,
          username: input.username,
          password: input.password,
        };
        const response = await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (!response.ok) {
          throw new Error('Server responded with an error!');
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
    <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleInput}/>
        <input type="text" name="username" placeholder="Username" onChange={handleInput}/>
        <input type="password" name="password" placeholder="Password" onChange={handleInput}/>
        <input type="password" name="passwordCheck" placeholder="Retype Password" onChange={handleInput}/>
        <button type="submit">Register</button>
    </form>
  );
};

export default Register;