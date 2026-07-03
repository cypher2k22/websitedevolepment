import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../AppContext';
import { LEARNING_PATHS } from '../../curriculumData';

// Flatten projects out of all technologies for a purely project-based curriculum
const ALL_PROJECTS = [];
Object.keys(LEARNING_PATHS).forEach(tech => {
  const path = LEARNING_PATHS[tech];
  ['Beginner', 'Intermediate', 'Advanced'].forEach(level => {
    if (path.levels[level]) {
      path.levels[level].forEach(proj => {
        ALL_PROJECTS.push({
          ...proj,
          tech,
          level,
          icon: path.icon,
          estTime: level === 'Beginner' ? '2-4 hours' : level === 'Intermediate' ? '5-8 hours' : '10-15 hours'
        });
      });
    }
  });
});

function Courses() {
  const navigate = useNavigate();
  const { user, enrollInProject, theme, addToast } = useContext(AppContext);
  const [search, setSearch] = useState('');

  const handleEnrollClick = (proj) => {
    if (!user) {
      addToast('Please login to enroll in this project.', 'info');
      navigate('/login');
      return;
    }

    const enrolled = enrollInProject(proj.id);
    if (enrolled) {
      // Go to first milestone workspace
      navigate(`/workspace/${proj.tech}/${proj.id}/${proj.milestones[0].id}`);
    }
  };

  const filteredProjects = ALL_PROJECTS.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.tech.toLowerCase().includes(search.toLowerCase())
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
      
      {/* Header Info */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #00d2ff, #af40ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '15px'
        }}>
          Project-Based Courses
        </h1>
        <p style={{ color: theme === 'dark' ? '#ccc' : '#555', fontSize: '1.15rem', maxWidth: '600px', margin: '0 auto' }}>
          Select and build developer projects. Get job-ready by practicing real code layouts.
        </p>

        {/* Search Input */}
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
              placeholder="Search by project title or technology..."
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '30px'
      }}>
        {filteredProjects.map((proj) => {
          const isEnrolled = user?.enrolledCourses?.includes(proj.id);
          const isCompleted = user?.completedProjects?.includes(proj.id);

          return (
            <div key={proj.id} style={{
              background: theme === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)',
              border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.08)',
              borderRadius: '16px',
              padding: '30px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)'
            }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <span style={{ fontSize: '2rem' }}>{proj.icon}</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{
                      background: 'rgba(0, 210, 255, 0.1)',
                      color: '#00d2ff',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold'
                    }}>{proj.tech}</span>
                    <span style={{
                      background: 'rgba(175, 64, 255, 0.1)',
                      color: '#af40ff',
                      padding: '4px 10px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 'bold'
                    }}>{proj.level}</span>
                  </div>
                </div>

                <h3 style={{ margin: '0 0 10px 0', fontSize: '1.3rem', fontWeight: '800' }}>{proj.title}</h3>
                <p style={{ color: theme === 'dark' ? '#ccc' : '#666', fontSize: '0.9rem', lineHeight: '1.5', margin: '0 0 20px 0' }}>
                  {proj.description}
                </p>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: theme === 'dark' ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)',
                paddingTop: '20px',
                marginTop: '10px'
              }}>
                <span style={{ fontSize: '0.85rem', color: '#888', fontWeight: '500' }}>⏱️ {proj.estTime}</span>
                
                <button
                  onClick={() => handleEnrollClick(proj)}
                  style={{
                    position: 'static',
                    transform: 'none',
                    backgroundImage: isCompleted 
                      ? 'none' 
                      : isEnrolled 
                        ? 'linear-gradient(135deg, #10ac84, #00ddeb)' 
                        : 'linear-gradient(135deg, #00d2ff, #af40ff)',
                    backgroundColor: isCompleted ? 'rgba(255,255,255,0.1)' : 'transparent',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '8px 20px',
                    color: isCompleted ? '#888' : '#fff',
                    fontWeight: 'bold',
                    fontSize: '0.85rem',
                    cursor: isCompleted ? 'default' : 'pointer',
                    height: 'auto',
                    minWidth: '120px'
                  }}
                  disabled={isCompleted}
                >
                  <span style={{ background: 'transparent', padding: 0 }}>
                    {isCompleted ? 'Completed ✓' : isEnrolled ? 'Resume Learning' : 'Enroll & Start'}
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