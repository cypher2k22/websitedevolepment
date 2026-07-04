import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';

function Header() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [searchVal, setSearchVal] = useState('');

  const handleGlobalSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchVal.trim())}`);
    }
  };

  return (
    <div className={`header ${theme}`} style={{
      display: 'flex',
      alignItems: 'center',
      padding: '0 25px',
      height: '4.5rem',
      background: theme === 'dark' ? 'rgba(9, 9, 11, 0.85)' : 'rgba(244, 244, 247, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      color: theme === 'dark' ? '#fff' : '#000',
      transition: 'background 0.3s, border-color 0.3s, color 0.3s'
    }}>
      {/* Brand Logo */}
      <div className="header-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', marginRight: '30px' }}>
        <span style={{
          background: 'linear-gradient(135deg, #00d2ff, #af40ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: '900',
          fontSize: '1.5rem',
          letterSpacing: '1px'
        }}>
          CodeJourney
        </span>
      </div>

      {/* Navigation Routes */}
      <nav className="header-nav" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
        <Link to="/" style={{ color: theme === 'dark' ? '#a1a1aa' : '#52525b', textDecoration: 'none', fontWeight: '600', fontSize: '0.95rem', transition: 'color 0.2s' }}>Home</Link>
        <Link to="/courses" style={{ color: theme === 'dark' ? '#a1a1aa' : '#52525b', textDecoration: 'none', fontWeight: '600', fontSize: '0.95rem', transition: 'color 0.2s' }}>Catalogue</Link>
        {user && (
          <Link to="/dashboard" style={{ color: theme === 'dark' ? '#a1a1aa' : '#52525b', textDecoration: 'none', fontWeight: '600', fontSize: '0.95rem', transition: 'color 0.2s' }}>Dashboard</Link>
        )}
        <Link to="/admin" style={{ color: theme === 'dark' ? '#a1a1aa' : '#52525b', textDecoration: 'none', fontWeight: '600', fontSize: '0.95rem', transition: 'color 0.2s' }}>Console</Link>
      </nav>

      {/* Global Search Bar */}
      <form onSubmit={handleGlobalSearch} style={{ display: 'flex', alignItems: 'center', marginLeft: '40px', flex: '1', maxWidth: '300px' }}>
        <div style={{
          position: 'relative',
          width: '100%'
        }}>
          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#71717a' }}>🔍</span>
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            style={{
              padding: '8px 12px 8px 36px',
              fontSize: '0.85rem',
              borderRadius: '20px',
              background: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
              border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
              width: '100%',
              outline: 'none',
              color: theme === 'dark' ? '#fff' : '#000'
            }}
          />
        </div>
      </form>

      {/* Theme Switch & User Stats */}
      <div className="header-widgets" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '20px' }}>
        
        {/* Gamification stats inside header */}
        {user && user.role !== 'admin' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '0.9rem', fontWeight: 'bold' }}>
            <span title="Daily Streak" style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'default' }}>
              🔥 {user.streak || 1}
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }} title="XP Level Progress">
              <span style={{ fontSize: '0.8rem', color: '#818cf8' }}>Lvl {user.level || 1}</span>
              <div style={{ width: '80px', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: `${(user.xp % 500) / 5}%`, height: '100%', background: 'linear-gradient(90deg, #00d2ff, #af40ff)' }} />
              </div>
            </div>
          </div>
        )}

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
            outline: 'none'
          }}
          aria-label="Toggle Dark/Light Mode"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span 
              onClick={() => navigate(`/profile/${user.name}`)}
              style={{ fontSize: '0.9rem', fontWeight: '600', color: '#00d2ff', cursor: 'pointer', hover: { textDecoration: 'underline' } }}
              title="View Public Profile"
            >
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
