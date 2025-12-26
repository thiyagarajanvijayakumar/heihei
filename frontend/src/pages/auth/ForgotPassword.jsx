import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from "../../api/api";
import "./Login.css"; // Reusing the login styles as the design is identical

export default function ForgotPassword() {
    const [email, setEmail] = useState("yuvaraji_infowar@yahoo.in");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (!email) return;
        setIsLoading(true);
        try {
            await api.post("/auth/forgot-password", { email });
            setIsSubmitted(true);
        } catch (error) {
            console.error("Error sending email", error);
            // Optional: show error state
        } finally {
            setIsLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="login-container">
                <div className="login-card" style={{ textAlign: 'center' }}>
                    <div className="brand-header">
                        <div className="brand-logo" style={{ justifyContent: 'center' }}>
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
                                <circle cx="7" cy="16" r="3" stroke="#3b82f6" strokeWidth="2" />
                                <circle cx="17" cy="16" r="3" stroke="#4ade80" strokeWidth="2" />
                                <path d="M10 16H14" stroke="white" strokeWidth="2" />
                            </svg>
                            Heihei
                        </div>
                        <h3 style={{ color: '#fff', marginTop: '1rem' }}>Check your mail</h3>
                    </div>
                    <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>
                        We have sent a password recover instructions to your email.
                    </p>
                    {/* For demo purposes, allow navigation to reset password */}
                    <div style={{ fontSize: '0.8rem', color: '#4ade80', cursor: 'pointer' }} onClick={() => window.location.href = "/reset-password"}>
                        (Dev Only: Click here to simulate clicking the email link)
                    </div>
                    <Link to="/" style={{ color: '#fff', textDecoration: 'none', marginTop: '2rem', display: 'block' }}>Back to Login</Link>
                </div>
            </div>
        )
    }

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
                        Forget password
                    </div>
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        className="form-input"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <button className="login-button" onClick={handleSubmit} disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send Email"}
                </button>
            </div>
        </div>
    );
}
