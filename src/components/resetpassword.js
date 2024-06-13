import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './styles.css'
import queryString from 'query-string';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
function ResetPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [message, setMessage] = useState('');
    const tokenRef = useRef(null);
    const [errors, setErrors] = useState({});
    useEffect(() => {
        const { email } = queryString.parse(location.search);
        setEmail(email)
    }, [location.search]);
    useEffect(() => {
        axios.get(`https://localhost:7235/api/Authentication/Get-Username?email=${email}`)
            .then(response => {
                
                setUserName(response.data)
                console.log(userName)
            })
            .catch(error => {
                console.error('There was an error fetching the profile data!', error);
            });
    });
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
        const newErrors = {};
        if (!email) {
            newErrors.email = 'Email is required';

        }
        if (!password) {
            newErrors.password = 'Password is required';

        }
        if (!confirmPassword) {
            newErrors.confirmPassword = 'Password is required';

        }
        if (password !== confirmPassword) {
            newErrors.passwordMatch = 'Passwords do not match';

        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        await axios.post('https://localhost:7235/api/Authentication/Reset-Password', { email, password, confirmPassword, token: tokenRef.current })
            .then(() => {
                setMessage('Password Reset Successfulll');
                toast.success(`Password Reset Successfulll`);
                
                navigate('/Profile/' + userName);
            }).catch((err) => {
                console.log("error is ", err);
                toast.error(err.response.data.message);
                setMessage(err.response.data.message);
            });


    };

    return (
        <div className='flex py-20 px-40 gap-4' style={{ fontFamily: 'Gill Sans' }}>
            <div className='w-600 p-20 mx-auto mt-50 font-sans text-xl rounded-lg bg-gray-200 bg-opacity-50'>
                Password should have at least
                <ul>
                    <li>8 characters</li>
                    <li>one uppercase letter [A - Z]</li>
                    <li>one lowercase letter [a - z]</li>
                    <li>one digit [0 - 9]</li>
                    <li>one character which isn't a digit or a letter</li>
                </ul>

            </div>
            <div className='container mx-auto my-5 p-8 border border-gray-300 shadow-md rounded-lg bg-white'>
                <div className='header'><div className='text'>Reset Password</div></div>
                <form onSubmit={handleSubmit}>
                    <div>

                        <label>
                            Email:
                        </label>
                        <input type="email" value={email} placeholder='Enter your Email' onChange={(e) => setEmail(e.target.value)} />
                        {errors.email && <span style={{ color: '#c23616' }}>{errors.email}</span>}
                    </div>
                    <div>
                        <label>
                            New Password:
                        </label>
                        <input type="password" value={password} placeholder='Enter new password' onChange={(e) => setPassword(e.target.value)} />
                        {errors.password && <span style={{ color: '#c23616' }}>{errors.password}</span>}

                    </div>
                    <div>
                        <label>

                            Confirm Password:
                        </label>
                        <input type="password" value={confirmPassword} placeholder='Confirm your password' onChange={(e) => setConfirmPassword(e.target.value)} />
                        {errors.confirmPassword && <span style={{ color: '#c23616' }}>{errors.confirmPassword}</span>}
                        {errors.passwordMatch && <span style={{ color: '#c23616' }}>{errors.passwordMatch}</span>}
                    </div>
                    <div className='msg'>
                        <button type="submit" className='registerbtn'>Save</button>
                    </div>

                </form>
                {message && <div style={{ left: '5px', marginTop: '10px' }}>{message}</div>}
            </div></div>
    );
}

export default ResetPassword;
