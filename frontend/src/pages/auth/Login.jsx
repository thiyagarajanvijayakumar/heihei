import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from "../../api/api";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("admin@test.com");
  const [password, setPassword] = useState("123456");

  const login = async () => {
    try {
      await api.post("/auth/login", { email, password });
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Login failed", error);
      // Ideally show error message to user
    }
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
          <div className="login-title">Login</div>
        </div>

        <div className="form-group">
          <label>User Name</label>
          <input
            className="form-input"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            className="form-input"
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="login-button" onClick={login}>Login</button>

        <div className="login-footer">
          <Link to="/forgot-password" style={{ textDecoration: 'none' }}>
            <div className="forgot-password">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              Forget password
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
