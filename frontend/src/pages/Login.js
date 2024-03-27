import React, {useEffect, useState} from 'react';
import axios from "axios";
import userImage from "../assets/person.png";
import passwordImage from "../assets/password.png";
import {GoogleLogin, GoogleOAuthProvider} from '@react-oauth/google';
import {useAuth} from "../components/AuthContext";

const Login = () => {
    const [input, setInput] = useState({
        username: "",
        password: ""
    })
    const { user, signIn, signOut } = useAuth();

    // Redirect the user to the main page if they're already logged in
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            window.location.href = "/budget"; // Redirect to the main page
        }
    }, []);

    const handleInput = (e) => {
        const {name, value} = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (input.username !== "" && input.password !== "") {
            try {
                const response = await axios.post('http://localhost:8080/users/login', {
                    username: input.username,
                    password: input.password
                });
                const data = response.data;

                console.log("What is the data here from the server here? ?" + data.id);

                if (data.token) {
                    console.log("what is the jwt token here?:", data.token);
                    localStorage.setItem('jwtToken', data.token);
                    localStorage.setItem('userId', data.id);
                    signIn({ name: data.name, id: data.id }, data.token);
                } else {
                    alert("Login failed: No token received.");
                }
            } catch (error) {
                console.error("Login failed:", error);
                alert("Invalid Login Credentials!");
            }
        } else {
            alert("Please fill in user credentials.");
        }
    };

    const handleGoogleSuccess = async (response) => {
        try {

        const token = response.credential;
        const backendResponse = await axios.post('http://localhost:8080/api/auth/verify-token', {token})
        const data = backendResponse.data;

        console.log("Response from server:", data);

            const jwtToken = data.sessionToken;
            console.log("Is this the correct one?:", jwtToken);
            localStorage.setItem('jwtToken', jwtToken);
            localStorage.setItem('userId', data.id);
            alert(`Welcome ${data.name}!`);
            localStorage.setItem('userId', data.id);
            signIn({ name: data.name, id: data.id }, data.sessionToken);
            console.log("JWT Token:", jwtToken);

        } catch (error) {
        console.error("Failed to authenticate with Google:", error);
        alert("Failed to authenticate with Google!");
    }
};

    const handleGoogleFailure = (error) => {
        console.log("Google Sign In was unsuccessful. Try again later.", error);
    };

    return (
        <GoogleOAuthProvider clientId="204165320624-ekp41fd3bba2qdig8omoekuuhtshue73.apps.googleusercontent.com">
            {user ? (
                <div className="loggedInContainer">
                    <p>Welcome, {user.username || user.name}!</p>
                    <button onClick={signOut}>Sign Out</button>
                </div>
            ) : (
                <div>
                    <form className="accessContainer" onSubmit={handleSubmit}>

                        <div className="accessHeader">
                            <div className="accessHeaderText">Login</div>
                        </div>

                        <div className="accessInputsContainer">
                            <div className="accessInputs">
                                <img className="accessInputImages" src={userImage} alt=""/>
                                <input className="accessInputFields" type="text" name="username" placeholder="Username" onChange={handleInput}/>
                            </div>
                            <div className="accessInputs">
                                <img className="accessInputImages" src={passwordImage} alt=""/>
                                <input className="accessInputFields" type="password" name="password" placeholder="Password" onChange={handleInput}/>
                            </div>
                        </div>

                        <a className="accessSignUpRedirect" href="/register">No account? Sign up here!</a>

                        <div className="accessSubmitContainer">
                            <div className="accessSubmit">
                                <button type="submit">Login</button>
                            </div>
                        </div>

                        <div className="accessGoogle">
                            <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={handleGoogleFailure}
                            />
                        </div>
                    </form>
                </div>
            )}
        </GoogleOAuthProvider>
    );
};

export default Login;
