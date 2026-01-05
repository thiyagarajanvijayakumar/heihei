import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import Logo from '../components/Logo';


export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(''); // 'idle', 'sending', 'sent', 'error'
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            await api.post('/auth/forgot-password', { email });
            setStatus('sent');
            // Brief delay to show success then redirect to OTP page
            setTimeout(() => {
                navigate(`/verify-otp?email=${encodeURIComponent(email)}`);
            }, 1000);
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    return (
        <div className="login-bg">
            <div className="login-card">
                <Logo />
                <div className="login-title">Forget password</div>

                {status === 'sent' ? (
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ color: '#76ff03', marginBottom: '20px' }}>OTP sent successfully!</p>
                        <p style={{ fontSize: '14px', color: '#ccc', marginBottom: '24px' }}>
                            We've sent an OTP code to <strong style={{ color: '#fff' }}>{email}</strong>
                        </p>
                        <button className="login-btn" onClick={() => navigate('/login')}>Back to login</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input
                                className="login-input"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="yuvaraji_infowar@yahoo.in"
                                required
                            />
                        </div>

                        {status === 'error' && <div className="error-msg">Failed to send email. Please try again.</div>}

                        <button className="login-btn" type="submit" disabled={status === 'sending'}>
                            {status === 'sending' ? 'Sending...' : 'Send Email'}
                        </button>
                    </form>
                )}

                {status !== 'sent' && (
                    <Link to="/login" className="forgot-password-link" style={{ textDecoration: 'none' }}>
                        Back to login
                    </Link>
                )}
            </div>
        </div>
    );
}
