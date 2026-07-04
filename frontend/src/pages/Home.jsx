import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

function Home() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const stats = [
    { value: '50K+', label: 'Active Students' },
    { value: '15+', label: 'Learning Roadmaps' },
    { value: '100+', label: 'Milestone Projects' },
    { value: '98%', label: 'Success Rate' }
  ];

  const features = [
    {
      icon: '💻',
      title: 'VS Code Clone Workspace',
      desc: 'An authentic development panel directly in your browser. Complete with file explorers, text tabs, live iframe viewer, and run consoles.'
    },
    {
      icon: '🤖',
      title: 'AI Mentor System',
      desc: 'Stuck on requirements? Chat with your AI Mentor who guides you with helpful concept tips instead of handing over code directly.'
    },
    {
      icon: '🎓',
      title: 'Claimable Certifications',
      desc: 'Complete all milestone projects in any curriculum and unlock verified PDF certificates to showcase your programming credentials.'
    },
    {
      icon: '📁',
      title: 'Portfolio Exports',
      desc: 'Turn your achievements and written milestone repositories into a downloadable JSON developer resume to share with employers.'
    }
  ];

  const roadmaps = [
    { step: '01', title: 'Foundations', desc: 'Semantic HTML, CSS variables, and layout systems.', tag: 'HTML & CSS' },
    { step: '02', title: 'Dynamic Logic', desc: 'Variables, event loops, arrays, and API calling.', tag: 'JavaScript' },
    { step: '03', title: 'Single Page Apps', desc: 'State managers, hooks, contexts, and component hierarchies.', tag: 'React' },
    { step: '04', title: 'Backend Servers', desc: 'Express middlewares, Restful APIs, and MongoDB schemas.', tag: 'Node & DBs' },
    { step: '05', title: 'DevOps & SSR', desc: 'Containerizing builds and serving hybrid render systems.', tag: 'Docker & Next.js' }
  ];

  const testimonials = [
    {
      quote: "The interactive editor and AI mentor helped me finally break through JavaScript loops. I'm now a Frontend engineer!",
      user: "Sarah K.",
      role: "Graduate at TechCorp"
    },
    {
      quote: "CodeJourney doesn't hold your hand. Building real pocket calculators and REST API gateways forced me to learn actual debugging.",
      user: "Alex M.",
      role: "Self-taught Developer"
    }
  ];

  const faqs = [
    {
      q: "Is CodeJourney completely project-based?",
      a: "Yes. There are no long theory lectures or slides. You learn how to write real-world projects directly inside an interactive IDE with step-by-step goals."
    },
    {
      q: "How do I claim a certificate?",
      a: "Each course module has a list of required milestone projects. Once you complete and submit 100% progress on each project, a Claim Certificate button appears on your dashboard."
    },
    {
      q: "How does the AI Mentor work?",
      a: "The AI Mentor is integrated into your workspace panel. It reads your code files and requirements to provide hints, structural review, and concept explanations."
    }
  ];

  const [activeFaq, setActiveFaq] = useState(null);

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
      fontFamily: 'system-ui, sans-serif',
      color: theme === 'dark' ? '#fff' : '#000',
      transition: 'color 0.3s'
    }}>
      {/* 1. Hero Section */}
      <section style={{ textAlign: 'center', margin: '80px 0 100px' }}>
        <span style={{
          background: 'rgba(99, 102, 241, 0.1)',
          color: '#818cf8',
          padding: '6px 16px',
          borderRadius: '50px',
          fontSize: '0.9rem',
          fontWeight: 'bold',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          border: '1px solid rgba(99, 102, 241, 0.2)'
        }}>
          🚀 THE PROJECT-BASED CODING PLATFORM
        </span>
        <h1 style={{
          fontSize: '4.5rem',
          fontWeight: '900',
          background: 'linear-gradient(135deg, #00d2ff, #af40ff, #00ddeb)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: '25px 0 20px',
          letterSpacing: '-2px',
          lineHeight: '1.1',
          textTransform: 'uppercase'
        }}>
          Learn by Building,<br />Not by Watching.
        </h1>
        <p style={{
          fontSize: '1.35rem',
          color: theme === 'dark' ? '#a1a1aa' : '#52525b',
          maxWidth: '750px',
          margin: '0 auto 45px',
          lineHeight: '1.6'
        }}>
          Skip boring lectures and slides. Write code directly inside a VS Code-inspired browser environment with a live preview viewport, run terminal, and an AI mentor checking your milestones.
        </p>

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={() => navigate('/courses')}
            className="uiverse-btn"
            style={{ padding: '16px 36px', fontSize: '1.1rem' }}
          >
            Start Coding Now
          </button>
          <button 
            onClick={() => navigate('/login')}
            style={{
              padding: '16px 36px',
              fontSize: '1.1rem',
              borderRadius: '8px',
              border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
              background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
              color: theme === 'dark' ? '#fff' : '#000',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'}
          >
            Create Free Account
          </button>
        </div>
      </section>

      {/* 2. Platform Statistics */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '30px',
        padding: '40px',
        borderRadius: '20px',
        background: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0, 0, 0, 0.02)',
        border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0, 0, 0, 0.05)'}`,
        textAlign: 'center',
        marginBottom: '100px'
      }}>
        {stats.map((s, idx) => (
          <div key={idx}>
            <div style={{ fontSize: '2.5rem', fontWeight: '900', color: '#00d2ff', marginBottom: '8px' }}>{s.value}</div>
            <div style={{ fontSize: '0.95rem', color: theme === 'dark' ? '#a1a1aa' : '#52525b', fontWeight: '600' }}>{s.label}</div>
          </div>
        ))}
      </section>

      {/* 3. Platform Features */}
      <section style={{ marginBottom: '100px' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', textAlign: 'center', marginBottom: '50px' }}>
          Interactive Features Built For Developers
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '30px'
        }}>
          {features.map((f, idx) => (
            <div 
              key={idx} 
              style={{
                background: theme === 'dark' ? 'rgba(15, 15, 25, 0.7)' : 'rgba(255,255,255,0.8)',
                border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0, 0, 0, 0.06)'}`,
                borderRadius: '16px',
                padding: '30px',
                boxShadow: 'var(--card-shadow)',
                backdropFilter: 'blur(12px)'
              }}
            >
              <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '20px' }}>{f.icon}</span>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '1.25rem', fontWeight: '700' }}>{f.title}</h3>
              <p style={{ margin: 0, color: theme === 'dark' ? '#a1a1aa' : '#52525b', fontSize: '0.9rem', lineHeight: '1.6' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Learning Roadmaps */}
      <section style={{ marginBottom: '100px' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', textAlign: 'center', marginBottom: '15px' }}>
          Your Path to Senior Engineer
        </h2>
        <p style={{ textAlign: 'center', color: '#888', maxWidth: '600px', margin: '0 auto 60px', fontSize: '1.05rem' }}>
          Progress through our curated, step-by-step milestones map to build production-grade architectures.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {roadmaps.map((r, idx) => (
            <div 
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '30px',
                padding: '24px 30px',
                borderRadius: '12px',
                background: theme === 'dark' ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)',
                border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
                flexWrap: 'wrap'
              }}
            >
              <span style={{ fontSize: '1.8rem', fontWeight: '900', color: '#af40ff' }}>{r.step}</span>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '1.15rem', fontWeight: '700' }}>{r.title}</h4>
                <p style={{ margin: 0, color: '#888', fontSize: '0.9rem' }}>{r.desc}</p>
              </div>
              <span style={{
                background: 'rgba(99, 102, 241, 0.12)',
                color: '#818cf8',
                padding: '6px 14px',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}>{r.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Testimonials */}
      <section style={{ marginBottom: '100px' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', textAlign: 'center', marginBottom: '50px' }}>
          Loved by Self-Taught Devs
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {testimonials.map((t, idx) => (
            <div 
              key={idx}
              style={{
                padding: '30px',
                borderRadius: '16px',
                background: theme === 'dark' ? 'rgba(255,255,255,0.01)' : '#fff',
                border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.08)'}`,
                boxShadow: 'var(--card-shadow)'
              }}
            >
              <p style={{ fontStyle: 'italic', margin: '0 0 20px 0', color: theme === 'dark' ? '#d4d4d8' : '#3f3f46', lineHeight: '1.6' }}>
                "{t.quote}"
              </p>
              <div>
                <strong style={{ display: 'block', fontSize: '0.95rem' }}>{t.user}</strong>
                <span style={{ fontSize: '0.8rem', color: '#888' }}>{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FAQ Block */}
      <section style={{ marginBottom: '100px', maxWidth: '800px', margin: '0 auto 100px' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', textAlign: 'center', marginBottom: '50px' }}>
          Frequently Asked Questions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {faqs.map((f, idx) => (
            <div 
              key={idx}
              style={{
                borderRadius: '8px',
                background: theme === 'dark' ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)',
                border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
                overflow: 'hidden'
              }}
            >
              <button 
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  padding: '20px',
                  color: theme === 'dark' ? '#fff' : '#000',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  outline: 'none'
                }}
              >
                <span>{f.q}</span>
                <span>{activeFaq === idx ? '−' : '+'}</span>
              </button>
              {activeFaq === idx && (
                <div style={{ padding: '0 20px 20px', color: '#888', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 7. Call To Action Banner */}
      <section style={{
        textAlign: 'center',
        padding: '60px 40px',
        borderRadius: '24px',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(6, 182, 212, 0.15))',
        border: '1px solid rgba(99, 102, 241, 0.25)',
        marginBottom: '60px'
      }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '15px' }}>Ready to launch your portfolio?</h2>
        <p style={{ color: '#ccc', maxWidth: '500px', margin: '0 auto 30px', fontSize: '1.05rem' }}>
          Create a free profile, enroll in a curriculum path, and build your developer future.
        </p>
        <button 
          onClick={() => navigate('/courses')}
          className="uiverse-btn"
          style={{ padding: '14px 36px', fontSize: '1rem' }}
        >
          Explore the Catalogue
        </button>
      </section>
    </div>
  );
}

export default Home;
