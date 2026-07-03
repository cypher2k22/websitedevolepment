import React from 'react';
import Tooltip from './Tooltip';
import { useNavigate, Link } from 'react-router-dom';

function Header() {
  const navigate = useNavigate(); 

  return (
    <div className="header">
      <div className="header-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{
          background: 'linear-gradient(135deg, #00d2ff, #af40ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: '900',
          fontSize: '1.5rem',
          letterSpacing: '1px'
        }}>
          FULLSTACK.IO
        </span>
      </div>

      <nav className="header-nav" style={{ display: 'flex', gap: '20px', marginLeft: '40px' }}>
        <Link to="/" style={{ color: '#aaa', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = '#aaa'}>Home</Link>
        <Link to="/courses" style={{ color: '#aaa', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = '#aaa'}>Courses</Link>
        <Link to="/dashboard" style={{ color: '#aaa', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = '#aaa'}>Learning Paths</Link>
        <Link to="/donate" style={{ color: '#aaa', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = '#aaa'}>Donate</Link>
        <Link to="/admin" style={{ color: '#aaa', textDecoration: 'none', fontWeight: '500', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = '#aaa'}>Instructor</Link>
      </nav>
      
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '15px' }}>
        <button className="menu-btn" onClick={() => navigate('/login')} style={{ position: 'static', transform: 'none' }}>
          <span className="text">LOGIN</span>
        </button>
        <Tooltip />
      </div>
    </div>
  );
}

export default Header;

