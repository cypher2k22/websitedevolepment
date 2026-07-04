import React, { useState, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

const Signup = () => {
  const navigate = useNavigate();
  const { signup, socialLogin } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const result = await signup(name, email, password);
      if (result && result.success) {
        navigate('/dashboard');
      } else {
        setError(result?.msg || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = async (provider) => {
    setLoading(true);
    try {
      // Pass provider name (e.g., 'Google' or 'GitHub')
      await socialLogin(provider);
      navigate('/dashboard');
    } catch (err) {
      setError(`Failed to sign up with ${provider}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledWrapper themeMode={theme}>
      <div className="signup-page-container">
        <div className="form-container">
          <div className="logo-section">
            <span className="logo-icon">🚀</span>
            <p className="title">Join CodeJourney</p>
            <p className="subtitle">Start your developer journey today</p>
          </div>
          
          {error && <div className="error-banner">{error}</div>}

          <form className="form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input 
                type="text" 
                name="name" 
                id="name" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
              />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                name="email" 
                id="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                name="password" 
                id="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input 
                type="password" 
                name="confirmPassword" 
                id="confirmPassword" 
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="sign" disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign up'}
            </button>
          </form>
          
          <div className="social-message">
            <div className="line" />
            <p className="message">Or sign up with</p>
            <div className="line" />
          </div>
          
          <div className="social-icons">
            <button aria-label="Sign up with Google" className="social-btn google" onClick={() => handleSocialSignup('Google')} disabled={loading}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z" />
              </svg>
              Google (Gmail)
            </button>
            <button aria-label="Sign up with GitHub" className="social-btn github" onClick={() => handleSocialSignup('GitHub')} disabled={loading}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z" />
              </svg>
              GitHub
            </button>
          </div>
          
          <p className="login-link">
            Already have an account?{' '}
            <Link to="/login" className="link-action">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </StyledWrapper>
  );
};

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-6px); }
  100% { transform: translateY(0px); }
`;

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 85vh;
  padding: 40px 20px;
  background: ${props => props.themeMode === 'dark' ? '#09090c' : '#f9f9fb'};
  transition: background 0.3s;

  .signup-page-container {
    background: ${props => props.themeMode === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)'};
    backdrop-filter: blur(20px);
    border: 1px solid ${props => props.themeMode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)'};
    border-radius: 2rem;
    padding: 8px;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.25);
  }

  .form-container {
    width: 360px;
    border-radius: 1.75rem;
    background-color: ${props => props.themeMode === 'dark' ? 'rgba(13, 17, 28, 0.95)' : 'rgba(255, 255, 255, 0.98)'};
    padding: 3rem 2.5rem;
    color: ${props => props.themeMode === 'dark' ? '#fff' : '#000'};
    border: 1px solid ${props => props.themeMode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)'};
  }

  .logo-section {
    text-align: center;
    margin-bottom: 2rem;
  }

  .logo-icon {
    font-size: 2.2rem;
    display: inline-block;
    margin-bottom: 0.5rem;
    animation: ${float} 3s ease-in-out infinite;
  }

  .title {
    font-size: 1.75rem;
    line-height: 2.2rem;
    font-weight: 800;
    margin: 0;
    background: linear-gradient(135deg, #00d2ff, #af40ff);
    WebkitBackgroundClip: text;
    WebkitTextFillColor: transparent;
  }

  .subtitle {
    font-size: 0.85rem;
    color: #888;
    margin: 0.4rem 0 0 0;
  }

  .error-banner {
    background-color: rgba(239, 68, 68, 0.15);
    border: 1px solid rgba(239, 68, 68, 0.3);
    color: #f87171;
    border-radius: 0.5rem;
    padding: 0.75rem;
    font-size: 0.8rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    font-size: 0.85rem;
  }

  .input-group label {
    display: block;
    color: ${props => props.themeMode === 'dark' ? '#9ca3af' : '#555'};
    margin-bottom: 6px;
    font-weight: 600;
  }

  .input-group input {
    width: 100%;
    border-radius: 0.5rem;
    border: 1px solid ${props => props.themeMode === 'dark' ? 'rgba(55, 65, 81, 1)' : 'rgba(210, 210, 210, 1)'};
    outline: 0;
    background-color: ${props => props.themeMode === 'dark' ? 'rgba(20, 25, 40, 1)' : '#fff'};
    padding: 0.8rem 1rem;
    color: ${props => props.themeMode === 'dark' ? '#fff' : '#000'};
    box-sizing: border-box;
    transition: all 0.25s ease;
  }

  .input-group input:focus {
    border-color: #00d2ff;
    box-shadow: 0 0 0 2px rgba(0, 210, 255, 0.15);
    background-color: ${props => props.themeMode === 'dark' ? 'rgba(25, 30, 50, 1)' : '#fff'};
  }

  .sign {
    display: block;
    width: 100%;
    background-image: linear-gradient(135deg, #00d2ff, #af40ff);
    padding: 0.85rem;
    text-align: center;
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
    box-sizing: border-box;
    transition: all 0.25s ease;
    box-shadow: 0 4px 15px rgba(0, 210, 255, 0.3);
    margin-top: 0.5rem;
  }

  .sign:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(0, 210, 255, 0.4);
    opacity: 0.95;
  }

  .sign:active:not(:disabled) {
    transform: translateY(0);
  }

  .sign:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .social-message {
    display: flex;
    align-items: center;
    padding-top: 1.5rem;
    margin-bottom: 1rem;
  }

  .line {
    height: 1px;
    flex: 1;
    background-color: ${props => props.themeMode === 'dark' ? 'rgba(55, 65, 81, 1)' : 'rgba(210, 210, 210, 1)'};
  }

  .social-message .message {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    font-size: 0.75rem;
    color: #888;
    white-space: nowrap;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .social-icons {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }

  .social-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    width: 100%;
    padding: 0.75rem;
    border-radius: 0.5rem;
    border: 1px solid ${props => props.themeMode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.1)'};
    background-color: ${props => props.themeMode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'};
    color: ${props => props.themeMode === 'dark' ? '#fff' : '#333'};
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .social-btn svg {
    height: 1.1rem;
    width: 1.1rem;
    fill: currentColor;
  }

  .social-btn:hover:not(:disabled) {
    background-color: ${props => props.themeMode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)'};
    border-color: ${props => props.themeMode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.2)'};
  }

  .social-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .login-link {
    text-align: center;
    font-size: 0.8rem;
    color: #888;
    margin-top: 1.5rem;
    margin-bottom: 0;
  }

  .link-action {
    color: #00d2ff;
    text-decoration: none;
    font-weight: 700;
    margin-left: 4px;
    transition: color 0.2s;
  }

  .link-action:hover {
    color: #af40ff;
    text-decoration: underline;
  }
`;

export default Signup;
