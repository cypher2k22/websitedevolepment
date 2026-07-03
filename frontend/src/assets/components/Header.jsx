import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`header ${theme}`} style={{
      display: 'flex',
      alignItems: 'center',
      padding: '0 25px',
      height: '4rem',
      background: theme === 'dark' ? 'rgba(10, 10, 15, 0.85)' : 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      color: theme === 'dark' ? '#fff' : '#000',
      transition: 'background 0.3s, border-color 0.3s, color 0.3s'
    }}>
      {/* Brand logo */}
      <div className="header-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
        <span style={{
          background: 'linear-gradient(135deg, #00d2ff, #af40ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: '900',
          fontSize: '1.4rem',
          letterSpacing: '1px'
        }}>
          CodeJourney
        </span>
      </div>

      {/* Navigation routes */}
      <nav className="header-nav" style={{ display: 'flex', gap: '20px', marginLeft: '40px' }}>
        <Link to="/" style={{ color: theme === 'dark' ? '#aaa' : '#555', textDecoration: 'none', fontWeight: '600', transition: 'color 0.2s' }}>Home</Link>
        <Link to="/courses" style={{ color: theme === 'dark' ? '#aaa' : '#555', textDecoration: 'none', fontWeight: '600', transition: 'color 0.2s' }}>Projects</Link>
        {user && (
          <Link to="/dashboard" style={{ color: theme === 'dark' ? '#aaa' : '#555', textDecoration: 'none', fontWeight: '600', transition: 'color 0.2s' }}>Dashboard</Link>
        )}
        <Link to="/admin" style={{ color: theme === 'dark' ? '#aaa' : '#555', textDecoration: 'none', fontWeight: '600', transition: 'color 0.2s' }}>Instructor</Link>
      </nav>

      {/* Theme Switch & Login / Profile widgets */}
      <div className="header-widgets" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* Dark/Light mode toggle */}
        <button 
          onClick={toggleTheme}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.25rem',
            cursor: 'pointer',
            padding: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          aria-label="Toggle Dark/Light Mode"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: '600', color: theme === 'dark' ? '#00d2ff' : '#0097b5' }}>
              Hi, {user.name}
            </span>
            <button 
              onClick={() => { logout(); navigate('/'); }}
              style={{
                height: '2rem',
                minWidth: '90px',
                fontSize: '0.85rem',
                borderRadius: '6px',
                backgroundColor: 'rgba(255, 77, 77, 0.15)',
                border: '1px solid rgba(255, 77, 77, 0.4)',
                color: '#ff4d4d',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ff4d4d';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 77, 77, 0.15)';
                e.currentTarget.style.color = '#ff4d4d';
              }}
            >
              Log Out
            </button>
          </div>
        ) : (
          <button 
            className="header-btn" 
            onClick={() => navigate('/login')}
          >
            <span>Login</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
