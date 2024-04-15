import React, { useState } from 'react';

// Mock function to simulate sending reset link via API
const sendResetLink = async (email) => {
    // Simulate sending reset link via API
    const response = await fetch('/api/reset-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        // Reset link sent successfully
        return true;
    } else {
        // Handle error
        console.error('Failed to send reset link');
        return false;
    }
};

// Mock function to simulate resetting password via API
const resetPassword = async (token, newPassword) => {
    // Simulate resetting password via API
    const response = await fetch('/api/reset-password', {
        method: 'POST',
        body: JSON.stringify({ token, newPassword }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        // Password reset successfully
        return true;
    } else {
        // Handle error
        console.error('Failed to reset password');
        return false;
    }
};

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [resetSent, setResetSent] = useState(false);
    const [resetToken, setResetToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [resetSuccess, setResetSuccess] = useState(false);

    const handleSendResetLink = async () => {
        const sent = await sendResetLink(email);
        if (sent) {
            setResetSent(true);
        }
    };

    const handleResetPassword = async () => {
        const reset = await resetPassword(resetToken, newPassword);
        if (reset) {
            setResetSuccess(true);
        }
    };

    return (
        <div>
            {!resetSent && (
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <button onClick={handleSendResetLink}>Send Reset Link</button>
                </div>
            )}

            {resetSent && !resetSuccess && (
                <div>
                    <label>New Password:</label>
                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    <button onClick={handleResetPassword}>Reset Password</button>
                </div>
            )}

            {resetSuccess && (
                <div>
                    <p>Password reset successfully!</p>
                </div>
            )}
        </div>
    );
};

export default ForgotPassword;