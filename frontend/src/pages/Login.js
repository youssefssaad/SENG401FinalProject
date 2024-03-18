import React , {useState} from 'react';
import axios from "axios";
// import GoogleSignIn from './GoogleSignIn';

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: ""
  })

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.username !== "" && input.password !== "") {
      axios.post('http://localhost:8080/users/login', {
        username: input.username,
        password: input.password
      })
          .then((response) => {
              alert(`What's good ${input.username}?!`);
              window.location.href = "http://localhost:3000/";
          }, (error) => {
              alert("Invalid Login Credentials!");
          });
    } else {
      alert("Please fill in user credentials.");
    }
  };

  return (
    <form onSubmit = {handleSubmit}>
      <input type="text" name="username" placeholder="Username" onChange={handleInput}/>
      <input type="password" name="password" placeholder="Password" onChange={handleInput}/>
      <button type="submit">Login</button>
      <p className='registeration'> Don't got an account?</p> 
      <a href="/register" type='registration_link'>Sign up here!</a>
    </form>
  );
};

export default Login;
