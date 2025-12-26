import React, { useState } from 'react';
import "./Login.css";

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = () => {
        // Handle password update logic here
        console.log("Update password");
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="brand-header">
                    <div className="brand-logo">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
                            <circle cx="7" cy="16" r="3" stroke="#3b82f6" strokeWidth="2" />
                            <circle cx="17" cy="16" r="3" stroke="#4ade80" strokeWidth="2" />
                            <path d="M10 16H14" stroke="white" strokeWidth="2" />
                        </svg>
                        Heihei
                    </div>
                    <div className="login-title" style={{ color: '#4ade80', fontSize: '1rem', fontWeight: '400' }}>
                        Password reset
                    </div>
                </div>

                <div className="form-group">
                    <label>New Password</label>
                    <input
                        className="form-input"
                        type="password"
                        placeholder="*************"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Confirm Password</label>
                    <input
                        className="form-input"
                        type="password"
                        placeholder="*************"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <button className="login-button" onClick={handleSubmit}>Save</button>
            </div>
        </div>
    );
}
