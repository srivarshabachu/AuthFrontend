import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/register';
import Forgotpassword from './components/forgotpassword';
import Login from './components/Login';
import Otp from './components/Otpsent';
import ResetPassword from './components/resetpassword';
import Emailverified from './components/Emailverified';
import Profile from './components/Profile';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register/:role" element={<Register />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/Reset-Password" element={< ResetPassword />} />
        <Route path="/otp/:username" element={<Otp />} />
        <Route path="/Emailverified" element={<Emailverified />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App

