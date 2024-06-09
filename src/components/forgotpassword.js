import React, { useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'
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
                setMessage('User does not exist')
                console.log("error is ", err);
            });
    };

    return (
        <div className='pagecontainer'>
            <form onSubmit={handleSubmit}>
                <div className=''>
                    <label>Enter your Email:</label>
                    <input
                        type="email"
                        name="Email"
                        value={Email}
                        onChange={handleChange}
                    />

                    <span style={{ color: 'red' }}>{errors.Email}</span>
                </div>
                <div className='msg'>
                    <span style={{ color: '#c23616' }}>{message}</span>
                    <button type="submit" className='registerbtn'>Send</button>
                </div>
                {message === 'User does not exist' && (
                    <div className="flex justify-between w-full">
                        <div >
                            <form method='POST' action={`https://localhost:7235/api/authentication/google-login`} >
                                <button
                                    name='provider'
                                    value='Google'>
                                    Google
                                </button>
                            </form>
                        </div>
                        <div >
                            <Link to="/register/User" className="primary hover:text-blue-700">
                                Register
                            </Link>
                        </div>
                    </div>
                )}
                
            </form>
            
        </div>
    );

}

export default Forgotpassword
