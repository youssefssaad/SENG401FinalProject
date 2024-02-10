import React , {useState} from 'react';

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: ""
  })

  const handleSubmit = () => {
    if (input.username !== "" && input.password !== "") {         // placeholder. databse authentication would be here
    alert(`What's good ${input.username}?!`);
    } else {
      alert("Lock in bro");
  };
  }

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
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