import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './styles.css'
import { useNavigate } from 'react-router-dom';
function ResetPassword() {
    const navigate = useNavigate();
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
            console.log(response);
            setMessage('Password Reset Successfulll');
            navigate('/');

        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div className='body'>
         <div className='content'>
                Password should have at least
                <ul>
                    <li>8 characters</li>
                    <li>one uppercase letter [A - Z]</li>
                    <li>one lowercase letter [a - z]</li>
                    <li>one digit [0 - 9]</li>
                    <li>one character which isn't a digit or a letter</li>
                </ul>
                
            </div>
        <div className='container'>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <div className='inputs'>
                    <label>
                        Email:
                    </label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label>
                    New Password:
                    </label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <label>
                    Confirm Password:
                    </label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
 
                </div>
                    <button className='loginbtn' type="submit">Reset Password</button>
               
            </form>
                {message && <div style={{ left: '5px', marginTop: '10px' }}>{message}</div>}
        </div></div>
    );
}

export default ResetPassword;
