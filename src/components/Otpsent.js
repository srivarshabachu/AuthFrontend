import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './styles.css';

const Otp = () => {
    const { username } = useParams();
    const [formData, setFormData] = useState({
        Username: username,
        Otp: ''
    });
    const navigate = useNavigate();

    const [errors, setErrors] = useState({
        Username: '',
        Otp: ''
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

        // OTP validation
        if (!formData.Otp.trim()) {
            newErrors.Otp = 'OTP is required';
            formIsValid = false;
        } else {
            newErrors.Otp = '';
        }

        if (!formIsValid) {
            setErrors(newErrors);
        } else {
            axios.post(`https://localhost:7235/api/Authentication/Login-2FA?code=${formData.Otp}&username=${formData.Username}`)
                .then((response) => {
                    console.log(response);
                    console.log('Form submitted:', formData);
                })
                .catch((err) => {
                    console.log("error is ", err);
                });
        }
    };

    return (
        <div className='container'>
            <div className='header'><div className='text'>Otp sent successfully to your account</div></div>
            <form onSubmit={handleSubmit}>
                <div className='inputs'>
                    <label>Enter the OTP</label>
                    <input
                        type="text"
                        name="Otp"
                        value={formData.Otp}
                        onChange={handleChange}
                    />
                    <span style={{ color: 'red' }}>{errors.Otp}</span>
                </div>
                <div className='bottom'>
                    <button type="submit" className='registerbtn'>Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Otp;
