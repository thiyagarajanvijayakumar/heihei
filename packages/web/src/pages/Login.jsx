import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import Logo from '../components/Logo';


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // Assuming login function still works with username/email
      await login(username, password);
      navigate('/');
    } catch (e) {
      setError(e.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>
          <Logo size="medium" />
        </div>
        <div className="login-title">Login</div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label className="form-label" style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px' }}>User Name</label>
            <input
              className="login-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ borderRadius: '4px', height: '40px' }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label className="form-label" style={{ fontSize: '12px', fontWeight: '600', marginBottom: '8px' }}>Password</label>
            <input
              className="login-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ borderRadius: '4px', height: '40px' }}
            />
          </div>

          {error && <div className="error-msg" style={{ fontSize: '12px', color: '#ff4444', marginBottom: '16px' }}>{error}</div>}

          <button className="login-btn" type="submit" style={{
            background: '#444444',
            color: '#ffffff',
            border: 'none',
            height: '42px',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: 'pointer',
            marginBottom: '20px'
          }}>Login</button>
        </form>

        <div style={{ textAlign: 'center' }}>
          <Link to="/reset-password" title="Forgot password" style={{
            color: '#ffffff',
            textDecoration: 'none',
            fontSize: '12px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            opacity: 0.9
          }}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            Forget password
          </Link>
        </div>
      </div>
    </div>
  );
}
