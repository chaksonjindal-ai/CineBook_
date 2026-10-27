import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }
    // Mock user login
    const namePart = email.split('@')[0];
    const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
    login({
      name: formattedName || 'Alex Johnson',
      email: email,
      phone: '9876543210',
    });
    navigate(-1); // Return to previous page or home
  };

  const handleDemoEvaluatorLogin = () => {
    login({
      name: 'Professor / Evaluator',
      email: 'evaluator@college.edu',
      phone: '9876543210',
    });
    navigate('/movies');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-logo-icon">🎬</span>
          <h1>Welcome Back to CineBook</h1>
          <p>Sign in to manage your tickets, bookings, and watchlists.</p>
        </div>

        {/* Demo One-Click Login for College Viva/Evaluation */}
        <div className="evaluator-demo-box">
          <p className="demo-notice">
            🎓 <strong>College Evaluation Demo Mode</strong>
          </p>
          <button
            type="button"
            className="demo-evaluator-btn"
            onClick={handleDemoEvaluatorLogin}
          >
            One-Click Evaluator Sign-In
          </button>
        </div>

        <div className="divider-line">
          <span>or sign in manually</span>
        </div>

        {error && <div className="auth-error-banner">{error}</div>}

        <form onSubmit={handleLogin} className="auth-form">
          <div className="auth-group">
            <label htmlFor="login-email">Email Address</label>
            <input
              id="login-email"
              type="email"
              placeholder="e.g. alex@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              required
            />
          </div>

          <div className="auth-group">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              required
            />
          </div>

          <button type="submit" className="auth-submit-btn">
            Sign In
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/signup">Create an Account</Link>
          </p>
          <Link to="/" className="back-home-link">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
