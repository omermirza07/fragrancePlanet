import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./SignUpForm.css";
import axios from 'axios';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';

const LoginForm = () => {
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
    
        if (usernameInput.length < 3 || usernameInput.length > 20) {
            setValidText("Username must be 3-20 characters");
            return;
        } else if (passwordInput.length < 8 || passwordInput.length > 30) {
            setValidText("Password must be 8-30 characters");
            return;
        }
    
        try {
            const response = await axios.post("http://localhost:5000/api/users/login", {
                username: usernameInput,
                password: passwordInput
            });

            console.log(response);

            // Store JWT token and user details in local storage
            window.localStorage.setItem("token", response.data.token); // Store the JWT token
            window.localStorage.setItem("loggedIn", true);
            window.localStorage.setItem("user", response.data.user.username);
            window.localStorage.setItem("userID", response.data.user.id);
            
            // Navigate to the dashboard or home page after login
            navigate("/dashboard");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setValidText("Invalid username or password");
            } else {
                console.error(error);
                setValidText("Server error. Please try again later.");
            }
        }
    };

    return (
        <>
            <div className="signup-container">
                <form className="signup-form" onSubmit={handleSubmit}>
                    <h3>Login</h3>
                    <div className="signup-input">
                        <h6>Username</h6>
                        <input 
                            name="username" 
                            value={usernameInput} 
                            onInput={(event) => setUsernameInput(event.target.value)} 
                        />
                    </div>
                    <div className="signup-input">
                        <h6>Password</h6>
                        <input 
                            type={type} 
                            name="password" 
                            value={passwordInput} 
                            onInput={(event) => setPasswordInput(event.target.value)} 
                        />
                        <span className="flex justify-around items-center" onClick={handleToggle}>
                            <Icon icon={icon} size={25} />
                        </span>
                    </div>
                    <br />
                    <button type="submit">Login</button>
                </form>
            </div>
            <p className="valid-text">{validText}</p>
        </>
    );
};

export default LoginForm;
