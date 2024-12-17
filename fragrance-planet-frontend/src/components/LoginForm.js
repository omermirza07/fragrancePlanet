// import necessary dependencies for the component
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./SignUpForm.css"; // import custom css for styling
import axios from 'axios'; // import axios for making HTTP requests
import { Icon } from 'react-icons-kit'; // import Icon component for icons
import { eyeOff } from 'react-icons-kit/feather/eyeOff'; // import eyeOff icon for password visibility toggle
import { eye } from 'react-icons-kit/feather/eye'; // import eye icon for password visibility toggle

const LoginForm = () => {
    const [usernameInput, setUsernameInput] = useState(""); // state for storing username input
    const [passwordInput, setPasswordInput] = useState(""); // state for storing password input
    const [validText, setValidText] = useState(""); // state for validation message
    const [type, setType] = useState("password"); // state to track input type (password/text)
    const [icon, setIcon] = useState(eyeOff); // state to track the current icon for password visibility
    const navigate = useNavigate(); // useNavigate hook for navigation

    // function to toggle password visibility
    const handleToggle = () => {
        if (type === "password") { // if type is password, switch to text
            setIcon(eye); // change icon to eye
            setType("text"); // change input type to text
        } else {
            setIcon(eyeOff); // change icon back to eyeOff
            setType("password"); // change input type back to password
        }
    };

    // function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // prevent default form submission behavior
    
        // check if username is between 3 and 20 characters
        if (usernameInput.length < 3 || usernameInput.length > 20) {
            setValidText("Username must be 3-20 characters"); // set validation message
            return;
        } 
        // check if password is between 8 and 30 characters
        else if (passwordInput.length < 8 || passwordInput.length > 30) {
            setValidText("Password must be 8-30 characters"); // set validation message
            return;
        }
    
        try {
            // send login request to the backend with username and password
            const response = await axios.post("http://localhost:5000/api/users/login", {
                username: usernameInput,
                password: passwordInput
            });

            console.log(response); // log the response for debugging

            // store jwt token and user details in local storage
            window.localStorage.setItem("token", response.data.token); // store the jwt token
            window.localStorage.setItem("loggedIn", true); // set loggedIn status to true
            window.localStorage.setItem("user", response.data.user.username); // store the username
            window.localStorage.setItem("userID", response.data.user.id); // store the user id
            
            // navigate to the dashboard page after successful login
            navigate("/dashboard");
        } catch (error) {
            // handle errors and set appropriate validation messages
            if (error.response && error.response.status === 400) {
                setValidText("Invalid username or password"); // set error message for invalid credentials
            } else {
                console.error(error); // log the error for debugging
                setValidText("Server error. Please try again later."); // set error message for server issues
            }
        }
    };

    return (
        <>
            <div className="signup-container"> {/* container for the login form */}
                <form className="signup-form" onSubmit={handleSubmit}> {/* login form */}
                    <h3>Login</h3> {/* login form title */}
                    <div className="signup-input"> {/* input field for username */}
                        <h6>Username</h6>
                        <input 
                            name="username" 
                            value={usernameInput} 
                            onInput={(event) => setUsernameInput(event.target.value)} // update username input state
                        />
                    </div>
                    <div className="signup-input"> {/* input field for password */}
                        <h6>Password</h6>
                        <input 
                            type={type} // dynamically set input type (password/text)
                            name="password" 
                            value={passwordInput} 
                            onInput={(event) => setPasswordInput(event.target.value)} // update password input state
                        />
                        <span className="flex justify-around items-center" onClick={handleToggle}> {/* toggle password visibility */}
                            <Icon icon={icon} size={25} /> {/* display the appropriate icon */}
                        </span>
                    </div>
                    <br />
                    <button type="submit">Login</button> {/* login button */}
                </form>
            </div>
            <p className="valid-text">{validText}</p> {/* display validation messages */}
        </>
    );
};

export default LoginForm; // export the LoginForm component for use in other parts of the app
