import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../AppContext';
import { PROJECTS_CURRICULUM } from '../../curriculumData';

function Courses() {
  const navigate = useNavigate();
  const { user, enrollInProject, isProjectLocked, theme, addToast } = useContext(AppContext);
  const [search, setSearch] = useState('');
  const [expandedProjId, setExpandedProjId] = useState(null);

  const handleActionClick = (proj, isLocked, isEnrolled) => {
    if (!user) {
      addToast('Authentication required. Redirecting to login...', 'info');
      navigate('/login');
      return;
    }

    if (isLocked) {
      addToast('Prerequisite locked. Complete previous projects first!', 'warning');
      return;
    }

    if (isEnrolled) {
      navigate(`/workspace/${proj.technology}/${proj.id}/${proj.milestones[0].id}`);
      return;
    }

    const enrolled = enrollInProject(proj.id);
    if (enrolled) {
      navigate(`/workspace/${proj.technology}/${proj.id}/${proj.milestones[0].id}`);
    }
  };

  const filteredProjects = PROJECTS_CURRICULUM.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.technology.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      padding: '40px 20px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'system-ui, sans-serif',
      color: theme === 'dark' ? '#fff' : '#000',
      minHeight: '80vh'
    }}>
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: '900',
          background: 'linear-gradient(135deg, #00d2ff, #af40ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '15px'
        }}>
          Project Curriculum
        </h1>
        <p style={{ color: theme === 'dark' ? '#ccc' : '#555', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Select and construct developer projects. Get job-ready by practicing real code layouts.
        </p>

        {/* Search */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0,0,0,0.03)',
            border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0,0,0,0.1)',
            borderRadius: '50px',
            padding: '4px 20px',
            width: '400px'
          }}>
            <span style={{ marginRight: '10px' }}>🔍</span>
            <input 
              type="text" 
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                background: 'none',
                border: 'none',
                color: theme === 'dark' ? '#fff' : '#000',
                outline: 'none',
                width: '100%',
                fontSize: '1rem',
                padding: '10px 0'
              }}
            />
          </div>
        </div>
      </div>

      {/* Grid of Projects */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '30px'
      }}>
        {filteredProjects.map((proj) => {
          const isLocked = isProjectLocked(proj.id);
          const isEnrolled = user?.enrolledCourses?.includes(proj.id);
          const isCompleted = user?.completedProjects?.includes(proj.id);
          const isExpanded = expandedProjId === proj.id;

          return (
            <div 
              key={proj.id} 
              style={{
                background: theme === 'dark' ? 'rgba(24, 24, 27, 0.95)' : '#fff',
                border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                borderRadius: '16px',
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
                opacity: isLocked ? 0.6 : 1,
                transition: 'transform 0.2s, border-color 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                if (!isLocked) e.currentTarget.style.borderColor = '#6366f1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)';
              }}
              onClick={() => setExpandedProjId(isExpanded ? null : proj.id)}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <span style={{ fontSize: '2rem' }}>{proj.icon}</span>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{
                      background: 'rgba(99, 102, 241, 0.1)',
                      color: '#6366f1',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold'
                    }}>{proj.course}</span>
                    <span style={{
                      background: 'rgba(0, 210, 255, 0.1)',
                      color: '#00d2ff',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold'
                    }}>{proj.technology}</span>
                    <span style={{
                      background: isCompleted ? 'rgba(16, 172, 132, 0.1)' : 'rgba(255,255,255,0.05)',
                      color: isCompleted ? '#10ac84' : '#aaa',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold'
                    }}>
                      {isCompleted ? 'Completed ✓' : isLocked ? 'Locked 🔒' : 'Unlocked'}
                    </span>
                  </div>
                </div>

                <h3 style={{ margin: '0 0 10px 0', fontSize: '1.35rem', fontWeight: '800' }}>{proj.title}</h3>
                <p style={{ color: theme === 'dark' ? '#ccc' : '#666', fontSize: '0.9rem', lineHeight: '1.5', margin: '0 0 20px 0' }}>
                  {proj.description}
                </p>

                {/* Requirements Checklist if expanded */}
                {isExpanded && (
                  <div style={{
                    background: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
                    border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                    borderRadius: '8px',
                    padding: '20px',
                    marginBottom: '20px'
                  }}
                  onClick={(e) => e.stopPropagation()} // Stop accordion toggling when checking requirements
                  >
                    <h4 style={{ margin: '0 0 10px 0', fontSize: '0.95rem', color: '#6366f1' }}>Project Objectives:</h4>
                    <p style={{ margin: '0 0 15px 0', fontSize: '0.85rem', lineHeight: '1.4', color: '#aaa' }}>{proj.objective}</p>
                    <h4 style={{ margin: '0 0 10px 0', fontSize: '0.95rem', color: '#6366f1' }}>Requirements Checklist:</h4>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
                      {proj.requirements.map(req => (
                        <li key={req.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ color: isCompleted ? '#10ac84' : '#888' }}>{isCompleted ? '✓' : '○'}</span>
                          <span>{req.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div 
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                  paddingTop: '20px',
                  marginTop: '10px'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <span style={{ fontSize: '0.85rem', color: '#888', fontWeight: '500' }}>⏱️ {proj.estTime}</span>
                
                <button
                  onClick={() => handleActionClick(proj, isLocked, isEnrolled)}
                  style={{
                    position: 'static',
                    transform: 'none',
                    backgroundImage: isCompleted 
                      ? 'none' 
                      : isEnrolled 
                        ? 'linear-gradient(135deg, #10ac84, #00ddeb)' 
                        : 'linear-gradient(135deg, #6366f1, #4f46e5)',
                    backgroundColor: isCompleted ? 'rgba(255,255,255,0.1)' : 'transparent',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '10px 24px',
                    color: isCompleted ? '#888' : '#fff',
                    fontWeight: 'bold',
                    fontSize: '0.85rem',
                    cursor: isCompleted ? 'default' : 'pointer',
                    height: 'auto',
                    minWidth: '130px',
                    transition: 'opacity 0.2s'
                  }}
                  disabled={isCompleted}
                >
                  <span style={{ background: 'transparent', padding: 0 }}>
                    {isCompleted ? 'Completed ✓' : isLocked ? 'Locked 🔒' : isEnrolled ? 'Resume Project' : 'Start Project'}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Courses;