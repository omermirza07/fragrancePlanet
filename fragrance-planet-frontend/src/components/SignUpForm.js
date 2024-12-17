// import necessary dependencies for the sign-up form component
import React, { useState } from 'react'; // react and state management hooks
import { useNavigate } from 'react-router-dom'; // hook for navigation
import "./SignUpForm.css"; // import custom css for styling the form
import axios from 'axios'; // library for making http requests
import { Icon } from 'react-icons-kit'; // library for using icons
import { eyeOff } from 'react-icons-kit/feather/eyeOff'; // icon for hiding password
import { eye } from 'react-icons-kit/feather/eye'; // icon for showing password

const SignUpForm = () => {
    // state for storing email input value
    const [emailInput, setEmailInput] = useState("");
    // state for storing confirm email input value
    const [confirmEmailInput, setConfirmEmailInput] = useState("");
    // state for storing username input value
    const [usernameInput, setUsernameInput] = useState("");
    // state for storing password input value
    const [passwordInput, setPasswordInput] = useState("");
    // state for storing confirm password input value
    const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
    // state for storing validation message
    const [validText, setValidText] = useState("");
    // state for controlling password input type (text or password)
    const [type, setType] = useState("password");
    // state for controlling password visibility icon
    const [icon, setIcon] = useState(eyeOff);
    const navigate = useNavigate(); // function for handling navigation

    // function to toggle password visibility
    const handleToggle = () => {
        if (type === "password") {
            setIcon(eye); // change icon to eye
            setType("text"); // change input type to text
        } else {
            setIcon(eyeOff); // change icon to eyeOff
            setType("password"); // change input type back to password
        }
    };

    // function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // prevent the default form submission behavior

        // check if email inputs match
        if (emailInput !== confirmEmailInput) {
            setValidText("Emails do not match"); // set validation message for email mismatch
            return;
        } 
        // check if password inputs match
        else if (passwordInput !== confirmPasswordInput) {
            setValidText("Passwords do not match"); // set validation message for password mismatch
            return;
        } 
        // validate email length
        else if (emailInput.length < 7 || emailInput.length > 100) {
            setValidText("Invalid email"); // set validation message for invalid email
            return;
        } 
        // validate username length
        else if (usernameInput.length < 3 || usernameInput.length > 20) {
            setValidText("Username must be 3-20 characters"); // set validation message for username length
            return;
        } 
        // validate password length
        else if (passwordInput.length < 8 || passwordInput.length > 30) {
            setValidText("Password must be 8-30 characters"); // set validation message for password length
            return;
        }

        try {
            // make a post request to register the user
            const response = await axios.post("http://localhost:5000/api/users/register", {
                email: emailInput, // email input value
                username: usernameInput, // username input value
                password: passwordInput // password input value
            });
            console.log(response); // log the response for debugging

            // set success message after successful registration
            setValidText("You have successfully signed up. Please go to the login page to continue.");
            
            // clear all input fields
            setEmailInput("");
            setConfirmEmailInput("");
            setUsernameInput("");
            setPasswordInput("");
            setConfirmPasswordInput("");
        } catch (error) {
            // handle error response for duplicate user
            if (error.response && error.response.status === 400) {
                if (error.response.data.error === "User already exists") {
                    setValidText("Account already exists"); // set message for existing account
                } else {
                    setValidText("Invalid email or other registration error."); // set generic error message
                }
            } else {
                console.error(error); // log other errors
                setValidText("Server error. Please try again later."); // set server error message
            }
        }
    };

    return (
        <div className="signup-container"> {/* container for the sign-up form */}
            <form className="signup-form" onSubmit={handleSubmit}> {/* form element with submit handler */}
                <h3>Sign Up</h3> {/* form title */}
                
                {/* email input field */}
                <div className="signup-input">
                    <h6>Email</h6>
                    <input 
                        name="email" 
                        value={emailInput} 
                        onInput={(event) => setEmailInput(event.target.value)} // update email state on input
                    />
                </div>

                {/* confirm email input field */}
                <div className="signup-input">
                    <h6>Confirm Email</h6>
                    <input 
                        name="confirmEmail" 
                        value={confirmEmailInput} 
                        onInput={(event) => setConfirmEmailInput(event.target.value)} // update confirm email state on input
                    />
                </div>

                {/* username input field */}
                <div className="signup-input">
                    <h6>Username</h6>
                    <input 
                        name="username" 
                        value={usernameInput} 
                        onInput={(event) => setUsernameInput(event.target.value)} // update username state on input
                    />
                </div>

                {/* password input field with toggle visibility */}
                <div className="signup-input">
                    <h6>Password</h6>
                    <input 
                        type={type} 
                        name="password" 
                        value={passwordInput} 
                        onInput={(event) => setPasswordInput(event.target.value)} // update password state on input
                    />
                    <span className="flex justify-around items-center" onClick={handleToggle}>
                        <Icon icon={icon} size={25} /> {/* toggle icon for password visibility */}
                    </span>
                </div>

                {/* confirm password input field */}
                <div className="signup-input">
                    <h6>Confirm Password</h6>
                    <input 
                        type={type} 
                        name="confirmPassword" 
                        value={confirmPasswordInput} 
                        onInput={(event) => setConfirmPasswordInput(event.target.value)} // update confirm password state on input
                    />
                </div>

                <br />
                <button type="submit">Sign Up</button> {/* submit button */}
            </form>

            {/* display validation message */}
            <p className="valid-text">{validText}</p>

            {/* link to login page after successful sign-up */}
            {validText.includes("successfully signed up") && (
                <a href="/login" style={{ color: 'blue', textDecoration: 'underline' }}>Go to Login Page</a>
            )}
        </div>
    );
};

export default SignUpForm; // export the sign-up form component
