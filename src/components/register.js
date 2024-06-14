import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formIsValid = true;
        const newErrors = {};

        if (!formData.Username.trim()) {
            newErrors.Username = 'Username is required';
            toast.error('Username is required')
            formIsValid = false;
        } else if (formIsValid && formData.Username.includes(' ')) {
            newErrors.Username = 'Username should not contain spaces';
            toast.error('Username should not contain spaces');
            formIsValid = false;
        } else {
            newErrors.Username = '';
        }

        if (formIsValid && !formData.Email.trim()) {
            newErrors.Email = 'Email is required';
            toast.error('Email is required');
            formIsValid = false;
        } else {
            newErrors.Email = '';
        }

        if (formIsValid && !formData.Password.trim()) {
            newErrors.Password = 'Password is required';
            toast.error('Password is required');
            formIsValid = false;
        } else {
            newErrors.Password = '';
        }

        setErrors(newErrors);

        if (!formIsValid) {
            return;
        }

        try {
            const response = await axios.post(`https://localhost:7235/api/Authentication/Register`, formData);
            console.log('Form submitted:', formData);
            setMessage(`Registration Successful`);
            toast.success(`Registration Successful for ${formData.Username}`);
            navigate(`/Profile/${formData.Username}`);
        } catch (error) {
            console.log(error)
            if (error.response.status === 409) {
                toast.error(`UserName already exists! Try another`);
                setMessage('UserName already exists! Try another');
            } else if (error.response.status === 403) {
                toast.error(`User already exists! Try logging in`);
                setMessage('User already exists! Login');
            } else {
                console.error('Error occurred:', error);
                toast.error('An error occurred in password \n Please check the requirements.');
            }
        }
    };

    const handleLoginClick = () => {
        navigate('/');
    };

    return (
        <div className='flex py-20 px-40 gap-4' style={{ fontFamily: 'Gill Sans' }}>
            <div className='w-600 p-20 mx-auto mt-50 font-sans text-xl rounded-lg bg-gray-200 bg-opacity-50'>
                <p>Password should have at least</p>
                <ul className="list-disc pl-6">
                    <li>8 characters</li>
                    <li>one uppercase letter [A - Z]</li>
                    <li>one lowercase letter [a - z]</li>
                    <li>one digit [0 - 9]</li>
                    <li>one character which isn't a digit or a letter</li>
                </ul>
            </div>

            <div className='container mx-auto my-5 p-8 border border-gray-300 shadow-md rounded-lg bg-white'>
                <div className='header'>
                    <div className='text'>Create Account</div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            name="Username"
                            value={formData.Username}
                            onChange={handleChange}
                        />
                        
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="Email"
                            value={formData.Email}
                            onChange={handleChange}
                        />
                        
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="Password"
                            value={formData.Password}
                            onChange={handleChange}
                        />
                       
                    </div>
                    {message && (
                        <>
                            <div className='msg'>
                                {message === 'User already exists! Login' && (
                                    
                                    <div className='flex justify-between w-full'>
                                        <button type="submit">SignIn</button>
                                        <div className="ml-auto flex items-center">
                                            <Link to="/" className="primary hover:text-blue-700 flex items-center py-2 px-4 rounded-md">
                                                Login here
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
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
    );
}

export default Register;
