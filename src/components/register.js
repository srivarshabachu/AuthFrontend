import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
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
        if (!formData.Username.trim()) {
            newErrors.Username = 'Username is required';
            formIsValid = false;
        } else {
            newErrors.Username = '';
            if (!formData.Email.trim()) {
                newErrors.Email = 'Email is required';
                formIsValid = false;
            }
            else {
                newErrors.Email = '';
                // Password validation
                if (!formData.Password.trim()) {
                    newErrors.Password = 'Password is required';
                    formIsValid = false;
                } else {
                    newErrors.Password = '';
                }
            }
        }
        if (!formIsValid) {
            setErrors(newErrors);
            // Stop form submission if validation fails
        }

        axios.post(`https://localhost:7235/api/Authentication/Register`, formData)
            .then((response) => {
                console.log(response);
                console.log('Form submitted:', formData);
                setMessage(`Registration Successful`);
                toast.success(`Registration Successful for ${formData.Username}`);
                navigate(`/Profile/${formData.Username}`); // Navigate to profile with username appended
            })
            .catch((error) => {
                if (error.response.status === 409) {
                    toast.error(`UserName already exists! Try another`);
                    setMessage('UserName already exists! Try another');
                }
                else if (error.response.status === 403) {
                    toast.error(`User already Exits \n Try logging in `);
                    setMessage('User already exists! Login');
                } else {
                    console.error('Error occurred:', error);

                }
            });
    };

    const handleLoginClick = () => {
        navigate('/');
    };

    return (
        <div className='flex py-20 px-40 gap-4' >
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
                        <span style={{ color: '#c23616' }}>{errors.Username}</span>
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="Email"
                            value={formData.Email}
                            onChange={handleChange}
                        />
                        <span style={{ color: '#c23616' }}>{errors.Email}</span>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="Password"
                            value={formData.Password}
                            onChange={handleChange}
                        />
                        <span style={{ color: '#c23616' }}>{errors.Password}</span>

                    </div>
                    {message && (
                        <>

                            <div className='msg'>

                                {message === 'User already exists! Login' && (<div className='flex justify-between w-full'>
                                    <button type="submit" >SignIn</button>
                                    <button type="submit" onClick={handleLoginClick} >Login</button></div>
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
