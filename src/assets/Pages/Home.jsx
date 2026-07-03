import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Pages.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      {/* Hero Section */}
      <div style={{ textAlign: 'center', margin: '60px 0 80px' }}>
        <h1 style={{ 
          fontSize: '3.5rem',
          fontWeight: '900',
          background: 'linear-gradient(135deg, #00d2ff, #af40ff, #00ddeb)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0px 10px 30px rgba(0, 210, 255, 0.2)',
          margin: '0 0 20px 0',
          letterSpacing: '-1px',
          textTransform: 'uppercase'
        }}>
          Study of Fullstack
        </h1>
        <p style={{
          fontSize: '1.25rem',
          color: '#ccc',
          maxWidth: '650px',
          margin: '0 auto 40px',
          lineHeight: '1.6',
          textShadow: '0 2px 4px rgba(0,0,0,0.5)'
        }}>
          Master modern web architecture, design complex systems, and deploy production-grade applications from scratch.
        </p>

        {/* Action Button */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <button onClick={() => navigate('/courses')} style={{
            position: 'static',
            transform: 'none',
            backgroundImage: 'linear-gradient(144deg, #af40ff, #5b42f3 50%, #00ddeb)',
            height: '3rem',
            fontSize: '1.1rem',
            padding: '4px',
            borderRadius: '8px',
            minWidth: '180px'
          }}>
            <span style={{ background: 'transparent', padding: '0 30px' }}>EXPLORE COURSES</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Cards */}
      <div className="home" style={{ display: 'flex', justifyContent: 'center', gap: '30px', margin: '40px 0 80px' }}>
        <div className="card" onClick={() => navigate('/courses')} style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(0, 210, 255, 0.2)',
          boxShadow: '0 8px 32px 0 rgba(0, 210, 255, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px'
        }}>
          <span style={{ fontSize: '2.5rem' }}>📚</span>
          <span style={{ color: '#00d2ff', fontSize: '1.25rem', fontWeight: 'bold', letterSpacing: '1px' }}>COURSES</span>
          <span style={{ fontSize: '0.85rem', color: '#aaa', fontWeight: 'normal' }}>Interactive curricula and projects</span>
        </div>

        <div className="card" onClick={() => navigate('/login')} style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(175, 64, 255, 0.2)',
          boxShadow: '0 8px 32px 0 rgba(175, 64, 255, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px'
        }}>
          <span style={{ fontSize: '2.5rem' }}>🔑</span>
          <span style={{ color: '#af40ff', fontSize: '1.25rem', fontWeight: 'bold', letterSpacing: '1px' }}>PORTAL LOGIN</span>
          <span style={{ fontSize: '0.85rem', color: '#aaa', fontWeight: 'normal' }}>Access gradebook and classrooms</span>
        </div>

        <div className="card" onClick={() => navigate('/donate')} style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(0, 221, 235, 0.2)',
          boxShadow: '0 8px 32px 0 rgba(0, 221, 235, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px'
        }}>
          <span style={{ fontSize: '2.5rem' }}>❤️</span>
          <span style={{ color: '#00ddeb', fontSize: '1.25rem', fontWeight: 'bold', letterSpacing: '1px' }}>DONATE</span>
          <span style={{ fontSize: '0.85rem', color: '#aaa', fontWeight: 'normal' }}>Support open educational resources</span>
        </div>
      </div>

      {/* Feature Grid / Stats Section */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        padding: '40px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '30px',
        marginTop: '40px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '2.5rem', color: '#00d2ff', margin: '0 0 10px 0', fontWeight: '800' }}>15+</h3>
          <p style={{ margin: 0, color: '#aaa', fontSize: '0.95rem' }}>Industry-ready project modules</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '2.5rem', color: '#af40ff', margin: '0 0 10px 0', fontWeight: '800' }}>12,000+</h3>
          <p style={{ margin: 0, color: '#aaa', fontSize: '0.95rem' }}>Active students graduated</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '2.5rem', color: '#00ddeb', margin: '0 0 10px 0', fontWeight: '800' }}>98%</h3>
          <p style={{ margin: 0, color: '#aaa', fontSize: '0.95rem' }}>Alumni job placement rate</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
