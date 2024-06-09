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
                if (error.response.status === 409) {
                    setMessage('UserName already exists! Try another');
                }
                else if (error.response.status === 403) {
                    setMessage('User already exists! Login');
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
        <div className='flex py-20 px-40' >
            <div className='w-600 h-auto p-20 mx-auto mt-50 font-sans text-xl rounded-lg bg-gray-200 bg-opacity-50'>
                <p>Password should have at least</p>
                <ul className="list-disc pl-6">
                    <li>8 characters</li>
                    <li>one uppercase letter [A - Z]</li>
                    <li>one lowercase letter [a - z]</li>
                    <li>one digit [0 - 9]</li>
                    <li>one character which isn't a digit or a letter</li>
                </ul>
            </div>


            <div className='container'>
                <div className='header'><div className='text'>Create Account</div></div>
                <form onSubmit={handleSubmit}>
                    <div>
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
                        <>
                            <p className='primary'>{message}</p>
                            <div className='msg'>
                               
                                
                                {message === 'User already exists! Login' && (
                                    <button type="submit" onClick={handleLoginClick} className='loginbtn'>Login</button>
                                )}
                            </div>
                            <div className='msg'>
                               

                                {message === 'UserName already exists! Try another' && (
                                    <button type="submit" className='registerbtn'>SignIn</button>
                                )}
                            </div>
                           </>
                    )}
                    <div className='msg'>
                        {!message && <button type="submit" className='registerbtn'>SignIn</button>}
                        {message === 'Verify the details again' && <button type="submit" className='registerbtn'>Register</button>}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;
