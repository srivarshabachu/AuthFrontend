import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/main';
import Register from './components/register';
import Forgotpassword from './components/forgotpassword';
import Login from './components/Login';
import Otp from './components/Otpsent';
import ResetPassword from './components/resetpassword';
import Emailverified from './components/Emailverified';
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
      </Routes>
    </Router>
  );
}

export default App

