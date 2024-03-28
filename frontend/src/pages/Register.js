import React, { useState } from "react";
import closeEye from "../assets/eye-close.png";
import axios from "axios";
import userImage from "../assets/person.png";
import passwordImage from "../assets/password.png";
import emailImage from "../assets/email.png";
import { REACT_APP_API_BASE_URL, APP_BASE_URL } from '../config';

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
            axios.post(`${REACT_APP_API_BASE_URL}/users/create`, {
                email: input.email,
                username: input.username,
                password: input.password,
            })
                .then((response) => {
                    alert(`What's good ${input.username}?!`);
                    window.location.href = `${APP_BASE_URL}/login`;
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
            <div>
                <form className="accessContainer" onSubmit={handleSubmit}>

                    <div className="accessHeader">
                        <div className="accessHeaderText">
                            Register
                        </div>
                    </div>

                    <div className="accessInputsContainer">
                        <div className="accessInputs">
                            <img className="accessInputImages" src={emailImage} alt=""/>
                            <input className="accessInputFields" type="email" name="email" placeholder="Email"
                                   onChange={handleInput}/>
                        </div>
                        <div className="accessInputs">
                            <img className="accessInputImages" src={userImage} alt=""/>
                            <input className="accessInputFields" type="text" name="username" placeholder="Username"
                                   onChange={handleInput}/>
                        </div>
                        <div className="accessInputs">
                            <img className="accessInputImages" src={passwordImage} alt=""/>
                            <input className="accessInputFields" type="password" name="password" placeholder="Password"
                                   onChange={handleInput}/>
                        </div>
                        <div className="accessInputs">
                            <img className="accessInputImages" src={passwordImage} alt=""/>
                            <input className="accessInputFields" type={showPassword ? "text" : "password"}
                                   name="passwordCheck" placeholder="Retype Password" onChange={handleInput}/>
                        </div>
                    </div>

                    <div className="accessSubmitContainer">
                        <div className="accessSubmit">
                            <button type="submit">Register </button>
                        </div>
                    </div>

                </form>
            </div>
        </>
    );
};

export default Register;