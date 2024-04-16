import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './styles.css'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();
    const { role } = useParams();
    console.log({ role })
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
        axios.post("https://localhost:7235/api/Authentication/Login", formData)
            .then((response) => {
                console.log(response)
                console.log('Form submitted:', formData);
                if (true) {
                    navigate('/otp/' + formData.Username);
                }
            })
            .catch((err) => {
                console.log("error is ", err);
            })
    };
    return (
        <div className='pagecontainer'>
            <div className='header'><div className='text'>Login</div></div>
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
                    <label>Password:</label>
                    <input
                        type="password"
                        name="Password"
                        value={formData.Password}
                        onChange={handleChange}
                    />
                    <span style={{ color: 'red' }}>{errors.Password}</span>

                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px" }}>
                    <div>New to our app?? ---&gt;</div>
                    <div>
                        <Link to="/register/User">Register</Link>
                    </div>
                </div>
                <div className='bottom' style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ marginBottom: "10px" }}>
                        <button type="submit" className='loginbtn'>Login</button>
                    </div>
                    <div style={{ paddingBottom: "20px" }}>
                        <Link to="/forgotpassword">Forgot Password!!</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Login
