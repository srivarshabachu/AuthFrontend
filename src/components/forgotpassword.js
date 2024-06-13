import React, { useState } from 'react';
import axios from 'axios'
import logo from './googlelogo.png'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
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
                toast.success(`We have successfully sent a reset link to your email`);
                setMessage('We have successfully sent a reset link to your email');
            })
            .catch((err) => {
                toast.error(`User does not exist`);
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

                    <button type="submit" className='registerbtn'>Send</button>
                </div>
                {message === 'User does not exist' && (
                    <div className="flex justify-between w-full">
                        <div >
                            <form method='POST' action={`https://localhost:7235/api/authentication/google-login`} className="flex flex-col items-center border-2 border-gray rounded-lg">
                                <button
                                    className="flex items-center text-black py-2 px-4 rounded-md"
                                    name='provider'
                                    value='Google'>
                                    <img src={logo} width={25} height={20} alt="Google Logo" className="mr-2" />
                                    Login with Google
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
