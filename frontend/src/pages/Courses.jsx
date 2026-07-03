import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { PROJECTS_CURRICULUM } from '../data/curriculumData';

function Courses() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { user, enrollInProject, isProjectLocked, addToast } = useContext(AuthContext);
  const [search, setSearch] = useState('');

  // Group projects dynamically by course category
  const courseMap = {};
  PROJECTS_CURRICULUM.forEach(proj => {
    if (!courseMap[proj.course]) {
      courseMap[proj.course] = [];
    }
    courseMap[proj.course].push(proj);
  });

  const coursesList = Object.keys(courseMap).map(courseName => ({
    name: courseName,
    projects: courseMap[courseName],
    icon: courseMap[courseName][0]?.icon || '🌐',
    difficulty: courseMap[courseName][0]?.difficulty || 'Beginner'
  }));

  const filteredCourses = coursesList.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleActionClick = (proj, isLocked, isEnrolled, isCompleted) => {
    if (!user) {
      addToast('Authentication required. Redirecting to login.', 'info');
      navigate('/login');
      return;
    }

    if (isLocked) {
      addToast('Prerequisite locked. Complete previous projects first!', 'warning');
      return;
    }

    if (isEnrolled || isCompleted) {
      navigate(`/workspace/${proj.technology}/${proj.id}/${proj.milestones[0].id}`);
      return;
    }

    const enrolled = enrollInProject(proj.id);
    if (enrolled) {
      navigate(`/workspace/${proj.technology}/${proj.id}/${proj.milestones[0].id}`);
    }
  };

  return (
    <div style={{
      padding: '40px 20px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'system-ui, sans-serif',
      color: theme === 'dark' ? '#fff' : '#000',
      minHeight: '80vh'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: '900',
          background: 'linear-gradient(135deg, #00d2ff, #af40ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '15px'
        }}>
          Course Catalogue
        </h1>
        <p style={{ color: theme === 'dark' ? '#ccc' : '#555', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Select a course module and build developer projects to progress.
        </p>

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
              placeholder="Search courses..."
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

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '40px'
      }}>
        {filteredCourses.map((c) => (
          <div 
            key={c.name} 
            style={{
              background: theme === 'dark' ? 'rgba(15, 15, 25, 0.7)' : 'rgba(255, 255, 255, 0.8)',
              border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0, 0, 0, 0.06)'}`,
              borderRadius: '20px',
              padding: '30px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)'
            }}
          >
            {/* Course Header */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '25px',
              borderBottom: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
              paddingBottom: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontSize: '2.5rem' }}>{c.icon}</span>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: '800' }}>{c.name}</h2>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', color: theme === 'dark' ? '#aaa' : '#666' }}>
                    Master {c.name} by completing {c.projects.length} real-world layout projects.
                  </p>
                </div>
              </div>
              <span style={{
                background: 'rgba(99, 102, 241, 0.15)',
                color: '#818cf8',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 'bold'
              }}>{c.difficulty}</span>
            </div>

            {/* Course Projects List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {c.projects.map((proj, idx) => {
                const isLocked = isProjectLocked(proj.id);
                const isEnrolled = user?.enrolledCourses?.includes(proj.id);
                const isCompleted = user?.completedProjects?.includes(proj.id);

                return (
                  <div 
                    key={proj.id}
                    style={{
                      background: theme === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.01)',
                      border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'}`,
                      borderRadius: '12px',
                      padding: '20px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '15px',
                      opacity: isLocked ? 0.5 : 1,
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{ flex: '1 1 500px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <span style={{ 
                          fontSize: '0.75rem', 
                          fontWeight: 'bold', 
                          color: '#818cf8',
                          textTransform: 'uppercase',
                          letterSpacing: '1px'
                        }}>Project {idx + 1}</span>
                        {isCompleted && <span style={{ color: '#10ac84', fontSize: '0.85rem' }}>✓ Completed</span>}
                        {isEnrolled && !isCompleted && <span style={{ color: '#00d2ff', fontSize: '0.85rem' }}>In Progress</span>}
                      </div>
                      <h3 style={{ margin: '0 0 6px 0', fontSize: '1.2rem', fontWeight: '700' }}>{proj.title}</h3>
                      <p style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: theme === 'dark' ? '#ccc' : '#555', lineHeight: '1.5' }}>
                        {proj.objective}
                      </p>
                      <div style={{ display: 'flex', gap: '15px', fontSize: '0.8rem', color: '#888' }}>
                        <span>⏱️ {proj.estTime}</span>
                        <span>•</span>
                        <span>{proj.difficulty}</span>
                      </div>
                    </div>

                    <div>
                      <button
                        onClick={() => handleActionClick(proj, isLocked, isEnrolled, isCompleted)}
                        style={{
                          backgroundImage: isCompleted 
                            ? 'linear-gradient(135deg, #10ac84, #0b8a67)' 
                            : isEnrolled 
                              ? 'linear-gradient(135deg, #00d2ff, #0097b5)' 
                              : isLocked 
                                ? 'none'
                                : 'linear-gradient(135deg, #6366f1, #4f46e5)',
                          backgroundColor: isLocked ? 'rgba(255,255,255,0.08)' : 'transparent',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '12px 24px',
                          color: isLocked ? '#666' : '#fff',
                          fontWeight: 'bold',
                          cursor: isLocked ? 'not-allowed' : 'pointer',
                          fontSize: '0.9rem',
                          boxShadow: isLocked ? 'none' : '0 4px 15px rgba(0, 0, 0, 0.15)',
                          transition: 'all 0.2s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        {isCompleted ? 'Review Code ✓' : isLocked ? 'Locked 🔒' : isEnrolled ? 'Resume Project' : 'Start Project'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;