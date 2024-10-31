import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./SignUpForm.css";
import axios from 'axios'; // Replace with axiosInstance if you've set it up
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';

const SignUpForm = () => {
    const [emailInput, setEmailInput] = useState("");
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const [validText, setValidText] = useState("");
    const [type, setType] = useState("password");
    const [icon, setIcon] = useState(eyeOff);
    const navigate = useNavigate();

    const handleToggle = () => {
        if (type === "password") {
            setIcon(eye);
            setType("text");
        } else {
            setIcon(eyeOff);
            setType("password");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (emailInput.length < 7 || emailInput.length > 100) {
            setValidText("Invalid email");
            return;
        } else if (usernameInput.length < 3 || usernameInput.length > 20) {
            setValidText("Username must be 3-20 characters");
            return;
        } else if (passwordInput.length < 8 || passwordInput.length > 30) {
            setValidText("Password must be 8-30 characters");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/users/register", {
                email: emailInput,
                username: usernameInput,
                password: passwordInput
            });
            console.log(response);
            
            // Display a success message
            setValidText("You have successfully signed up. Please go to the login page to continue.");
            
            // Optionally, clear the form inputs
            setEmailInput("");
            setUsernameInput("");
            setPasswordInput("");
            
        } catch (error) {
            if (error.response && error.response.status === 400) {
                if (error.response.data.error === "User already exists") {
                    setValidText("Account already exists");
                } else {
                    setValidText("Invalid email or other registration error.");
                }
            } else {
                console.error(error);
                setValidText("Server error. Please try again later.");
            }
        }
    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h3>Sign Up</h3>
                <div className="signup-input">
                    <h6>Email</h6>
                    <input name="email" value={emailInput} onInput={(event) => setEmailInput(event.target.value)} />
                </div>
                <div className="signup-input">
                    <h6>Username</h6>
                    <input name="username" value={usernameInput} onInput={(event) => setUsernameInput(event.target.value)} />
                </div>
                <div className="signup-input">
                    <h6>Password</h6>
                    <input type={type} name="password" value={passwordInput} onInput={(event) => setPasswordInput(event.target.value)} />
                    <span className="flex justify-around items-center" onClick={handleToggle}>
                        <Icon icon={icon} size={25} />
                    </span>
                </div>
                <br />
                <button type="submit">Sign Up</button>
            </form>
            <p className="valid-text">{validText}</p>
            {validText.includes("successfully signed up") && (
                <a href="/login" style={{ color: 'blue', textDecoration: 'underline' }}>Go to Login Page</a>
            )}
        </div>
    );
};

export default SignUpForm;
