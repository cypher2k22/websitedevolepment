import React from 'react';

function Footer() {
  return (
    <footer style={{
      background: 'rgba(10, 10, 15, 0.85)',
      backdropFilter: 'blur(12px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '40px 20px 20px',
      color: '#aaa',
      fontFamily: 'system-ui, sans-serif',
      marginTop: '100px',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '40px',
        marginBottom: '40px'
      }}>
        <div>
          <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '15px', fontWeight: '700' }}>FULLSTACK.IO</h3>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
            Elevate your engineering skills with industry-grade courses, live labs, and a community of passionate developers.
          </p>
        </div>
        <div>
          <h4 style={{ color: '#00d2ff', fontSize: '1rem', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>Curriculum</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
            <li><a href="/courses" style={{ color: '#aaa', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = '#aaa'}>Frontend Engineering</a></li>
            <li><a href="/courses" style={{ color: '#aaa', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = '#aaa'}>Backend Architecture</a></li>
            <li><a href="/courses" style={{ color: '#aaa', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = '#aaa'}>DevOps & Cloud</a></li>
          </ul>
        </div>
        <div>
          <h4 style={{ color: '#af40ff', fontSize: '1rem', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>Community</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
            <li><a href="/donate" style={{ color: '#aaa', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = '#aaa'}>Support Us</a></li>
            <li><a href="/Radio" style={{ color: '#aaa', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = '#aaa'}>System Logs</a></li>
            <li><a href="#" style={{ color: '#aaa', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#fff'} onMouseOut={(e) => e.target.style.color = '#aaa'}>Discord Channel</a></li>
          </ul>
        </div>
        <div>
          <h4 style={{ color: '#00ddeb', fontSize: '1rem', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px' }}>Newsletter</h4>
          <p style={{ fontSize: '0.9rem', marginBottom: '15px' }}>Stay updated with the latest in fullstack tech.</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input type="email" placeholder="you@domain.com" style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '4px',
              padding: '8px 12px',
              color: '#fff',
              outline: 'none',
              width: '100%',
              fontSize: '0.9rem'
            }} />
            <button style={{
              position: 'static',
              transform: 'none',
              minWidth: 'auto',
              height: 'auto',
              padding: '8px 16px',
              fontSize: '0.9rem',
              backgroundImage: 'linear-gradient(135deg, #00d2ff, #00ddeb)'
            }}><span style={{ background: 'transparent', padding: 0 }}>Join</span></button>
          </div>
        </div>
      </div>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        paddingTop: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        fontSize: '0.85rem'
      }}>
        <span>© {new Date().getFullYear()} FULLSTACK.IO. All rights reserved.</span>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="#" style={{ color: '#aaa', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#" style={{ color: '#aaa', textDecoration: 'none' }}>Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;