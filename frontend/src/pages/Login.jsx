import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

const Login = () => {
  const navigate = useNavigate();
  const { login, signup } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      signup(name, email, password);
      navigate('/dashboard');
    } else {
      const result = login(email, password);
      if (result.success) {
        if (result.isAdmin) {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }
    }
  };

  const handleSocialMock = () => {
    login('social_developer@gmail.com', 'social');
    navigate('/dashboard');
  };

  return (
    <StyledWrapper themeMode={theme}>
      <div className="login-page-container">
        <div className="form-container">
          <p className="title">{isSignUp ? 'Create Account' : 'Login'}</p>
          
          <form className="form" onSubmit={handleSubmit}>
            {isSignUp && (
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
            )}

            <div className="input-group" style={{ marginTop: isSignUp ? '1rem' : '0' }}>
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
            
            <div className="input-group" style={{ marginTop: '1rem' }}>
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
              {!isSignUp && (
                <div className="forgot">
                  <a rel="noopener noreferrer" href="#" onClick={(e) => e.preventDefault()}>Forgot Password ?</a>
                </div>
              )}
            </div>

            <button type="submit" className="sign" style={{ marginTop: isSignUp ? '1.5rem' : '0.5rem' }}>
              {isSignUp ? 'Sign up' : 'Sign in'}
            </button>
          </form>
          
          <div className="social-message">
            <div className="line" />
            <p className="message">Login with social accounts</p>
            <div className="line" />
          </div>
          
          <div className="social-icons">
            <button aria-label="Log in with Google" className="icon" onClick={handleSocialMock}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z" />
              </svg>
            </button>
            <button aria-label="Log in with GitHub" className="icon" onClick={handleSocialMock}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z" />
              </svg>
            </button>
          </div>
          
          <p className="signup">
            {isSignUp ? 'Already have an account?' : "Don't have an account? "}
            <a 
              rel="noopener noreferrer" 
              href="#" 
              onClick={(e) => { e.preventDefault(); setIsSignUp(!isSignUp); }}
              style={{ color: isSignUp ? '#af40ff' : '#00d2ff', marginLeft: '5px', fontWeight: 'bold' }}
            >
              {isSignUp ? 'Sign in' : 'Sign up'}
            </a>
          </p>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 40px 20px;
  background: ${props => props.themeMode === 'dark' ? '#09090c' : '#f9f9fb'};
  transition: background 0.3s;

  .login-page-container {
    background: ${props => props.themeMode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'};
    backdrop-filter: blur(16px);
    border: 1px solid ${props => props.themeMode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'};
    border-radius: 1.5rem;
    padding: 10px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  }

  .form-container {
    width: 340px;
    border-radius: 1.25rem;
    background-color: ${props => props.themeMode === 'dark' ? 'rgba(17, 24, 39, 0.95)' : 'rgba(255, 255, 255, 0.98)'};
    padding: 2.5rem 2rem;
    color: ${props => props.themeMode === 'dark' ? '#fff' : '#000'};
    border: 1px solid ${props => props.themeMode === 'dark' ? 'transparent' : 'rgba(0, 0, 0, 0.05)'};
  }

  .title {
    text-align: center;
    font-size: 1.6rem;
    line-height: 2rem;
    font-weight: 800;
    margin: 0;
    background: linear-gradient(135deg, #00d2ff, #af40ff);
    WebkitBackgroundClip: text;
    WebkitTextFillColor: transparent;
  }

  .form {
    margin-top: 1.5rem;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .input-group label {
    display: block;
    color: ${props => props.themeMode === 'dark' ? 'rgba(156, 163, 175, 1)' : '#555'};
    margin-bottom: 6px;
    font-weight: 600;
  }

  .input-group input {
    width: 100%;
    border-radius: 0.375rem;
    border: 1px solid ${props => props.themeMode === 'dark' ? 'rgba(55, 65, 81, 1)' : 'rgba(200, 200, 200, 1)'};
    outline: 0;
    background-color: ${props => props.themeMode === 'dark' ? 'rgba(17, 24, 39, 1)' : '#fff'};
    padding: 0.75rem 1rem;
    color: ${props => props.themeMode === 'dark' ? '#fff' : '#000'};
    box-sizing: border-box;
    transition: border-color 0.2s;
  }

  .input-group input:focus {
    border-color: rgba(0, 210, 255, 0.8);
  }

  .forgot {
    display: flex;
    justify-content: flex-end;
    font-size: 0.75rem;
    line-height: 1rem;
    color: #888;
    margin: 8px 0 14px 0;
  }

  .forgot a, .signup a {
    color: ${props => props.themeMode === 'dark' ? '#fff' : '#555'};
    text-decoration: none;
    font-size: 13px;
  }

  .forgot a:hover, .signup a:hover {
    text-decoration: underline;
  }

  .sign {
    display: block;
    width: 100%;
    background-image: linear-gradient(135deg, #00d2ff, #af40ff);
    padding: 0.75rem;
    text-align: center;
    color: white;
    border: none;
    border-radius: 0.375rem;
    font-weight: 700;
    cursor: pointer;
    box-sizing: border-box;
    transition: opacity 0.2s;
  }

  .sign:hover {
    opacity: 0.9;
  }

  .social-message {
    display: flex;
    align-items: center;
    padding-top: 1.5rem;
  }

  .line {
    height: 1px;
    flex: 1 1 0%;
    background-color: ${props => props.themeMode === 'dark' ? 'rgba(55, 65, 81, 1)' : 'rgba(200, 200, 200, 1)'};
  }

  .social-message .message {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    font-size: 0.8rem;
    line-height: 1.25rem;
    color: #888;
    white-space: nowrap;
  }

  .social-icons {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }

  .social-icons .icon {
    border-radius: 50%;
    padding: 10px;
    border: 1px solid ${props => props.themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
    background-color: ${props => props.themeMode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)'};
    margin: 0 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
  }

  .social-icons .icon:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }

  .social-icons .icon svg {
    height: 1.2rem;
    width: 1.2rem;
    fill: ${props => props.themeMode === 'dark' ? '#fff' : '#000'};
  }

  .signup {
    text-align: center;
    font-size: 0.8rem;
    line-height: 1rem;
    color: #888;
    margin-top: 25px;
    margin-bottom: 0;
  }
`;

export default Login;
