import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../../AppContext';

function Header() {
  const navigate = useNavigate();
  const { user, theme, toggleTheme, logout } = useContext(AppContext);

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
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '20px' }}>
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
            justifyContent: 'center',
            position: 'static',
            transform: 'none',
            height: 'auto',
            minWidth: 'auto',
            boxShadow: 'none'
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
                position: 'static',
                transform: 'none',
                height: '2rem',
                minWidth: '90px',
                fontSize: '0.8rem',
                borderRadius: '6px',
                backgroundImage: 'none',
                backgroundColor: 'rgba(255, 0, 0, 0.1)',
                border: '1px solid rgba(255, 0, 0, 0.3)',
                color: '#ff4d4d',
                cursor: 'pointer'
              }}
            >
              Log Out
            </button>
          </div>
        ) : (
          <button 
            className="menu-btn" 
            onClick={() => navigate('/login')}
            style={{
              position: 'static',
              transform: 'none',
              height: '2.2rem',
              minWidth: '100px',
              fontSize: '0.85rem',
              backgroundImage: 'linear-gradient(135deg, #00d2ff, #af40ff)',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              color: '#fff'
            }}
          >
            <span style={{ background: 'transparent', padding: 0 }}>Login</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;
