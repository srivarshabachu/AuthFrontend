import React, { useState } from 'react';
import axios from 'axios'
import './styles.css'
import { useParams } from 'react-router-dom';
const Register = () => {
    const { role } = useParams();
    console.log({ role })
    const [formData, setFormData] = useState({
        Username: '',
        Email: '',
        Password: ''
    });

    const [errors, setErrors] = useState({
        Email: "",
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
        }

        // Email validation
        if (!formData.Email.trim()) {
            newErrors.Email = 'Email is required';
            formIsValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.Email)) {
            newErrors.Email = 'Email is invalid';
            formIsValid = false;
        } else {
            newErrors.Email = '';
        }

        // Password validation
        if (!formData.Password.trim()) {
            newErrors.Password = 'Password is required';
            formIsValid = false;
        } else {
            newErrors.Password = '';
        }
        if (!formIsValid) {
            setErrors(newErrors);
        }

        if (role === "Admin") {
            axios.post("https://localhost:7235/api/Authentication/Register?role=Admin", formData)
                .then((response) => {
                    console.log(response)
                    console.log('Form submitted:', formData);
                })
                .catch((err) => {
                    console.log("error is ", err);
                })
        }
        else if (role === "User") {
            axios.post("https://localhost:7235/api/Authentication/Register?role=User", formData)
                .then((response) => {
                    console.log(response)
                    console.log('Form submitted:', formData);
                    
                })
                .catch((err) => {
                    console.log("error is ", err);
                })
        }
        else {
            console.log("Select a valid role")
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
                <div>
                    <button type="submit" className='registerbtn'>Register</button>
                </div>
            </form>
            </div>
        </div>
    )
}
export default Register
