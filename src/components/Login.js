import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './styles.css'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import logo from './googlelogo.png'
const Login = () => {
    const navigate = useNavigate();
    const { role } = useParams();
    const [twoFactor, setTwoFactor] = useState(false);
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        Username: '',
        Password: ''
    });

    const [errors, setErrors] = useState({
        Username: "",
        Password: ""
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

        // Username validation
        if (!formData.Username.trim()) {
            newErrors.Username = 'Username is required';
            formIsValid = false;
        } else {
            newErrors.Username = '';
            // Password validation
            if (!formData.Password.trim()) {
                newErrors.Password = 'Password is required';
                formIsValid = false;
            } else {
                newErrors.Password = '';
            }
        }



        if (!formIsValid) {
            setErrors(newErrors);
        }
        var token = null;

        axios.post("https://localhost:7235/api/Authentication/Login", formData)
            .then((response) => {
                console.log(response.data.message);

                if (response.data.message.includes('OTP')) {
                    setTwoFactor(true);
                    navigate('/Otp/' + formData.Username);
                } else {
                    navigate('/Profile/' + formData.Username);
                }
            })
            .catch((err) => {
                console.log("error is ", err);
            });

    };
    return (
        <div className='pagecontainer' style={{ fontFamily: 'Gill Sans' }}>

            <form onSubmit={handleSubmit}>
                <div className=''>

                    <label>Username:</label>
                    <input
                        type="text"
                        name="Username"
                        value={formData.Username}
                        onChange={handleChange}
                        placeholder='Enter your UserName'
                    />
                    <span style={{ color: '#c23616' }}>{errors.Username}</span>
</div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="Password"
                        value={formData.Password}
                        onChange={handleChange}
                        placeholder='Enter your Password'
                    />
                    <span style={{ color: '#c23616' }}>{errors.Password}</span>

                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div className="flex flex-col items-center">
                        <div className="mb-4">
                            <button type="submit" className="">
                                Login
                            </button>
                        </div>
                        <div className="flex justify-between w-full">
                            <div >
                                <Link to="/forgotpassword" className="primary  hover:text-blue-700">
                                    Forgot Password!!
                                </Link>
                            </div>
                            <div >
                                <Link to="/register/User" className="primary hover:text-blue-700">
                                    Register
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="flex flex-col items-center py-10 px-10">
                    <form method="POST" action="https://localhost:7235/api/authentication/google-login" className="flex flex-col items-center border-2 border-gray rounded-lg">
                        <button
                            
                            name="provider"
                            value="Google"
                            className="flex items-center text-black py-2 px-4 rounded-md"
                        >
                            <img src={logo} width={25} height={20} alt="Google Logo" className="mr-2" />
                            Login with Google
                        </button>
                    </form>
                </div>
            </form>
        </div>
    )
}

export default Login
