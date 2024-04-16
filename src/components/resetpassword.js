import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function ResetPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const tokenRef = useRef(null);

    useEffect(() => {
        // Function to extract token from URL
        const getTokenFromURL = () => {
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');
            // Store the token in the ref
            tokenRef.current = token;
            // Do something with the token if needed
            console.log('Token from URL:', tokenRef.current);
        };

        // Call the function when the component mounts
        getTokenFromURL();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:7235/api/Authentication/Reset-Password', { email, password, confirmPassword, token: tokenRef.current });
            console.log(confirmPassword);
            setMessage(response.data.message);

        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    New Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <label>
                    Confirm Password:
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <button type="submit">Reset Password</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default ResetPassword;
