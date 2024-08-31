import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './styles.css';

const Otp = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    console.log(username)
    const [formData, setFormData] = useState({
        Username: username,
        Otp: ''
    });

    const [errors, setErrors] = useState({
        Otp: ''
    });

    const [message, setMessage] = useState('');

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
            console.log(formData)
            axios.post(`https://localhost:7235/api/Authentication/Login-2FA?code=${formData.Otp}&username=${formData.Username}`)
                .then((response) => {
                    console.log(response);
                    console.log('Form submitted:', formData);
                    navigate('/Profile/' + username);
                })
                .catch((error) => {
                    if (error.response.status === 404) {
                        setMessage('Invalid OTP!');
                    }
                    console.log("error is ", error);
                });
        }

    };

    return (
        <div className='pagecontainer' style={{ fontFamily: 'Gill Sans' }}>
            <div className='header'>
                <div className='text'>Otp sent to your account</div>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Enter the OTP :</label>
                    <input
                        type="text"
                        name="Otp"
                        value={formData.Otp}
                        onChange={handleChange}
                    />
                    <span className='primary'>{errors.Otp}</span>
                </div>
                <p className='primary'>{message}</p>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div className="flex flex-col items-center">
                        <div className="mb-4">
                            <button type="submit">
                                Submit
                            </button>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    );
};

export default Otp;
