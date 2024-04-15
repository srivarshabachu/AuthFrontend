import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to extract URL parameters
import axios from 'axios';

const ResetPassword = () => {
    const { token } = useParams(); // Extract token from URL params
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'password') {
            setPassword(value);
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }
        setErrors({}); // Clear errors when user starts typing
        setSuccessMessage(''); // Clear success message if exists
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Password validation
        if (!password) {
            setErrors({ password: 'Password is required' });
            return;
        } else if (password !== confirmPassword) {
            setErrors({ confirmPassword: 'Passwords do not match' });
            return;
        }

        axios.put(`https://localhost:7235/api/Authentication/ResetPassword?token=${token}`, {
            password,
        })
            .then((response) => {
                setSuccessMessage('Password reset successful. You can now login with your new password.');
            })
            .catch((error) => {
                if (error.response && error.response.data && error.response.data.message) {
                    setErrors({ password: error.response.data.message });
                } else {
                    setErrors({ password: 'An error occurred. Please try again later.' });
                }
            });
    };

    return (
        <div className='container'>
            <div className='header'><div className='text'>Reset Password</div></div>
            <form onSubmit={handleSubmit}>
                <div className='inputs'>
                    <label>New Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleChange}
                    />
                    <span style={{ color: 'red' }}>{errors.password}</span>
                </div>
                <div className='inputs'>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleChange}
                    />
                    <span style={{ color: 'red' }}>{errors.confirmPassword}</span>
                </div>
                <div>
                    <button type="submit" className='submitBtn'>Reset Password</button>
                </div>
                {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
            </form>
        </div>
    )
}

export default ResetPassword;
