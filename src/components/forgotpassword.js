import React, { useState } from 'react';
import axios from 'axios'
const Forgotpassword = () => {
    const [Email, setEmail] = useState("");
    const [message, setMessage] = useState('');

    const [errors, setErrors] = useState({
        Email: '',
    });

    const handleChange = (e) => {
        setEmail(e.target.value); // Update the email state
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        let formIsValid = true;
        const newErrors = { ...errors };

        // Email validation
        if (!Email.trim()) {
            newErrors.Email = 'Email is required';
            formIsValid = false;
        } else if (!/\S+@\S+\.\S+/.test(Email)) {
            newErrors.Email = 'Email is invalid';
            formIsValid = false;
        } else {
            newErrors.Email = '';
        }
        if (!formIsValid) {
            setErrors(newErrors);
            return; // Stop form submission if validation fails
        }

        axios.post("https://localhost:7235/api/Authentication/ForgotPassword?email=" + encodeURIComponent(Email))
            .then((response) => {
                console.log(response);
                // Update message state to display success message
                setMessage('We have successfully sent a reset link to your email');
            })
            .catch((err) => {
                console.log("error is ", err);
            });
    };

    return (
        <div className='fpcontainer'>
            <div className='header'><div className='text'></div></div>
            <form onSubmit={handleSubmit}>
                <div className='inputs'>
                    <label>Enter your Email:</label>
                <input
                    type="email"
                    name="Email"
                    value={Email}
                    onChange={handleChange}
                    />
                    
                    <span style={{ color: 'red' }}>{errors.Email}</span>
                </div> 
                <div>
                    <button type="submit" className='registerbtn'>Send</button>
                </div>
            </form>
            {message && <div style={{ marginTop: '10px' }}>{message}</div>}
        </div>
    );

}

export default Forgotpassword
