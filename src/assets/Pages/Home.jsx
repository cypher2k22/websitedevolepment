import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../AppContext';

function Home() {
  const navigate = useNavigate();
  const { theme } = useContext(AppContext);

  const popularProjects = [
    { title: 'Personal Profile Page', tech: 'HTML', desc: 'Build a semantic page detailing your bio and favorite hobbies.', icon: '🌐' },
    { title: 'Glassmorphic Card', tech: 'CSS', desc: 'Design an elegant blurred card with gradients.', icon: '🎨' },
    { title: 'Interactive Calculator', tech: 'JavaScript', desc: 'Implement calculations, input registers, and key validations.', icon: '⚡' }
  ];

  return (
    <div style={{
      padding: '60px 20px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'system-ui, sans-serif',
      color: theme === 'dark' ? '#fff' : '#000',
      transition: 'color 0.3s'
    }}>
      {/* Hero section */}
      <div style={{ textAlign: 'center', margin: '80px 0 100px' }}>
        <h1 style={{
          fontSize: '4.2rem',
          fontWeight: '900',
          background: 'linear-gradient(135deg, #00d2ff, #af40ff, #00ddeb)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: '0 0 20px 0',
          letterSpacing: '-2px',
          textTransform: 'uppercase'
        }}>
          Learn by Building
        </h1>
        <p style={{
          fontSize: '1.4rem',
          color: theme === 'dark' ? '#ccc' : '#555',
          maxWidth: '700px',
          margin: '0 auto 45px',
          lineHeight: '1.6'
        }}>
          CodeJourney is a project-based dev platform. No boring lectures or slides. Start coding real-world projects inside a workspace with an AI mentor today.
        </p>

        <button 
          onClick={() => navigate('/courses')}
          style={{
            position: 'static',
            transform: 'none',
            backgroundImage: 'linear-gradient(135deg, #00d2ff, #af40ff)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '16px 36px',
            fontSize: '1.15rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 8px 30px rgba(0, 210, 255, 0.3)',
            height: 'auto',
            minWidth: 'auto'
          }}
        >
          Start Learning Now
        </button>
      </div>

      {/* Grid of features */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
        margin: '60px 0 100px'
      }}>
        <div style={{
          background: theme === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
          border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.05)',
          borderRadius: '16px',
          padding: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
        }}>
          <span style={{ fontSize: '2.5rem' }}>💻</span>
          <h3 style={{ margin: '15px 0 10px 0', fontSize: '1.3rem' }}>VS Code Clone Workspace</h3>
          <p style={{ margin: 0, color: theme === 'dark' ? '#aaa' : '#666', lineHeight: '1.5' }}>
            Code directly in a split browser environment with a file tree, dynamic HTML render frame, and system compiler terminal.
          </p>
        </div>

        <div style={{
          background: theme === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
          border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.05)',
          borderRadius: '16px',
          padding: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
        }}>
          <span style={{ fontSize: '2.5rem' }}>🤖</span>
          <h3 style={{ margin: '15px 0 10px 0', fontSize: '1.3rem' }}>AI Mentor Integrations</h3>
          <p style={{ margin: 0, color: theme === 'dark' ? '#aaa' : '#666', lineHeight: '1.5' }}>
            Get helpful hints, concepts clarifications, and debugging suggestions instead of answers revealed directly.
          </p>
        </div>

        <div style={{
          background: theme === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
          border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.05)',
          borderRadius: '16px',
          padding: '30px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
        }}>
          <span style={{ fontSize: '2.5rem' }}>🏅</span>
          <h3 style={{ margin: '15px 0 10px 0', fontSize: '1.3rem' }}>Auto Portfolio Output</h3>
          <p style={{ margin: 0, color: theme === 'dark' ? '#aaa' : '#666', lineHeight: '1.5' }}>
            Every finished project generates a downloadable card detailing the features, learned skills, and code outputs.
          </p>
        </div>
      </div>

      {/* Popular Projects */}
      <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '40px' }}>Popular Projects</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
        marginBottom: '60px'
      }}>
        {popularProjects.map((p, idx) => (
          <div key={idx} style={{
            background: theme === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
            border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.05)',
            borderRadius: '16px',
            padding: '30px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <span style={{ fontSize: '2.2rem' }}>{p.icon}</span>
              <span style={{
                background: 'rgba(0, 210, 255, 0.1)',
                color: '#00d2ff',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}>{p.tech}</span>
            </div>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem' }}>{p.title}</h3>
            <p style={{ margin: 0, color: theme === 'dark' ? '#aaa' : '#666', fontSize: '0.9rem', lineHeight: '1.5' }}>{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
