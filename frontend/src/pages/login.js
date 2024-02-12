import React , {useState} from 'react';
// import GoogleSignIn from './GoogleSignIn';

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: ""
  })

  // const handleSignInSuccess = (googleUser) => {
  //   const idToken = googleUser.getAuthResponse().id_token;
  //   console.log("User signed in successfully with token:", idToken);
  // };
  
  // const handleSignInFailure = (error) => {
  //   console.error("Sign in failed", error);
  // };

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
      const formData = {
        username: input.username,
        password: input.password,
      };
      fetch('http://localhost:3000/login', {
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
    <form onSubmit = {handleSubmit}>
      <input type="text" name="username" placeholder="Username" onChange={handleInput}/>
      <input type="password" name="password" placeholder="Password" onChange={handleInput}/>
      <button type="submit">Login</button>
      <p className='registeration'> Don't got an account?</p> 
      <a href="/register" type='registration_link'>Sign up here!</a>
      {/* <GoogleSignIn 
        onSignInSuccess={handleSignInSuccess} 
        onSignInFailure={handleSignInFailure} 
      /> */}
    </form>
  );
};

export default Login;