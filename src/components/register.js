import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        Username: '',
        Email: '',
        Password: '',
        roles: ['User']
    });

    const [errors, setErrors] = useState({
        Email: '',
        Username: '',
        Password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let formIsValid = true;
        const newErrors = { ...errors };

        // Your validation logic goes here...

        if (!formIsValid) {
            setErrors(newErrors);
            return; // Stop form submission if validation fails
        }

        axios.post(`https://localhost:7235/api/Authentication/Register`, formData)
            .then((response) => {
                console.log(response);
                console.log('Form submitted:', formData);
                setMessage(`Registration Successful for ${formData.Username}`);
                navigate(`/Profile/${formData.Username}`); // Navigate to profile with username appended
            })
            .catch((error) => {
                if (error.response.status === 403) {
                    setMessage('User already exists!');
                } else {
                    console.error('Error occurred:', error);
                    setMessage('Verify the details again');
                }
            });
    };

    const handleLoginClick = () => {
        navigate('/');
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
                <div className='header'><div className='text'>Registration Form</div></div>
                <form onSubmit={handleSubmit}>
                    <div className='inputs'>
                        <label>Username:</label>
                        <input
                            type="text"
                            name="Username"
                            value={formData.Username}
                            onChange={handleChange}
                        />
                        <span style={{ color: 'red' }}>{errors.Username}</span>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="Email"
                            value={formData.Email}
                            onChange={handleChange}
                        />
                        <span style={{ color: 'red' }}>{errors.Email}</span>

                        <label>Password:</label>
                        <input
                            type="password"
                            name="Password"
                            value={formData.Password}
                            onChange={handleChange}
                        />
                        <span style={{ color: 'red' }}>{errors.Password}</span>
                    </div>
                    {message && (
                        <div className='msg'>
                            <p style={{ marginTop: '0px' }}>{message}</p>
                            {message === 'User already exists!' && (
                                <button onClick={handleLoginClick} className='loginbtn'>Login</button>
                            )}
                        </div>
                    )}
                    <div className='msg'>
                        {!message && <button type="submit" className='registerbtn'>Register</button>}
                        {message === 'Verify the details again' && <button type="submit" className='registerbtn'>Register</button>}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;
