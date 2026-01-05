import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import api from '../api';
import Logo from '../components/Logo';


export default function ResetPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const email = query.get('email');
    const otp = query.get('otp');

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!email || !otp) {
            navigate('/forgot-password');
        }
    }, [email, otp, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            await api.post('/auth/reset-password', { email, otp, password: newPassword });
            setSuccess(true);
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to reset password');
        }
    };

    return (
        <div className="login-bg">
            <div className="login-card">
                <Logo />
                <div className="login-title">Password reset</div>

                {success ? (
                    <div style={{ textAlign: 'center', color: '#76ff03' }}>
                        Password resetted successfully! Redirecting to login...
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label className="form-label">New Password</label>
                            <input
                                className="login-input"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Confirm Password</label>
                            <input
                                className="login-input"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && <div className="error-msg">{error}</div>}

                        <button className="login-btn" type="submit">Save</button>
                    </form>
                )}

                {!success && (
                    <Link to="/login" className="forgot-password-link" style={{ textDecoration: 'none' }}>
                        Back to login
                    </Link>
                )}
            </div>
        </div>
    );
}
