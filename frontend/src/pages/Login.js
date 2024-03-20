import React, {useState} from 'react';
import axios from "axios";
import {GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google';

const Login = () => {
    const [input, setInput] = useState({
        username: "",
        password: ""
    })

    const handleInput = (e) => {
        const {name, value} = e.target;
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

    const handleGoogleSuccess = (response) => {
        const token = response.credential;
        axios.post('http://localhost:8080/api/auth/verify-token', {token})
            .then((response) => {
                console.log(response.data);
                alert(`Welcome ${response.data.name}!`);
                window.location.href = "http://localhost:3000/";
            }, (error) => {
                alert("Failed to authenticate with Google!");
                console.error(error);
            });
    };

    const handleGoogleFailure = (error) => {
        console.log("Google Sign In was unsuccessful. Try again later.", error);
    };

    return (
        <GoogleOAuthProvider clientId="204165320624-ekp41fd3bba2qdig8omoekuuhtshue73.apps.googleusercontent.com">
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="Username" onChange={handleInput}/>
                    <input type="password" name="password" placeholder="Password" onChange={handleInput}/>
                    <button type="submit">Login</button>
                    <p className='registration'> Don't have an account?</p>
                    <a href="/register" type='registration_link'>Sign up here!</a>
                </form>
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleFailure}
                />
            </div>
        </GoogleOAuthProvider>
    );
};

export default Login;
