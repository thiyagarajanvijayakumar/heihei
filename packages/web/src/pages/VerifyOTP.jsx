import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import api from '../api';
import Logo from '../components/Logo';


export default function VerifyOTP() {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const email = new URLSearchParams(location.search).get('email');

    useEffect(() => {
        if (!email) {
            navigate('/forgot-password');
        }
    }, [email, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await api.post('/auth/verify-otp', { email, otp });
            navigate(`/reset-password?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`);
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid OTP');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-bg">
            <div className="login-card">
                <Logo />
                <div className="login-title">Verify OTP</div>

                <p style={{ color: '#ccc', fontSize: '14px', textAlign: 'center', marginBottom: '24px' }}>
                    Please enter the 6-digit code sent to <br />
                    <strong style={{ color: '#fff' }}>{email}</strong>
                </p>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label className="form-label">OTP Code</label>
                        <input
                            className="login-input"
                            type="text"
                            maxLength="6"
                            placeholder="123456"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                    </div>

                    {error && <div className="error-msg">{error}</div>}

                    <button className="login-btn" type="submit" disabled={loading}>
                        {loading ? 'Verifying...' : 'Verify'}
                    </button>
                </form>

                <Link to="/forgot-password" style={{ color: '#aaa', fontSize: '12px', textAlign: 'center', display: 'block', marginTop: '20px', textDecoration: 'none' }}>
                    Resend OTP
                </Link>
            </div>
        </div>
    );
}
