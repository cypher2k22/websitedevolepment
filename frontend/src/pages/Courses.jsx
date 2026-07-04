import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { PROJECTS_CURRICULUM } from '../data/curriculumData';

const COURSE_CATEGORIES = {
  HTML: 'Frontend',
  CSS: 'Frontend',
  JavaScript: 'Frontend',
  React: 'Frontend',
  'React Native': 'Frontend',
  'Node.js': 'Backend',
  MongoDB: 'Backend',
  MySQL: 'Backend',
  FastAPI: 'Backend',
  TypeScript: 'Tools',
  Git: 'Tools',
  GitHub: 'Tools',
  Docker: 'Tools',
  Express: 'Backend',
  'Next.js': 'Backend',
  Python: 'Backend'
};

const MOCK_ENROLLED = {
  HTML: '12,450',
  CSS: '9,820',
  JavaScript: '15,640',
  React: '11,200',
  'Node.js': '8,430',
  MongoDB: '6,210',
  MySQL: '5,800',
  FastAPI: '4,120',
  'React Native': '3,950',
  TypeScript: '7,400',
  Git: '9,120',
  GitHub: '8,750',
  Docker: '6,900',
  Express: '7,150',
  'Next.js': '6,540',
  Python: '10,250'
};

function Courses() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useContext(ThemeContext);
  const { user, enrollInProject, isProjectLocked, addToast } = useContext(AuthContext);
  
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Load search term from URL query if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('search');
    if (query) {
      setSearch(query);
    }
  }, [location.search]);

  // Group projects dynamically by course category
  const courseMap = {};
  PROJECTS_CURRICULUM.forEach(proj => {
    if (!courseMap[proj.course]) {
      courseMap[proj.course] = [];
    }
    courseMap[proj.course].push(proj);
  });

  const coursesList = Object.keys(courseMap).map(courseName => {
    const projects = courseMap[courseName];
    const category = COURSE_CATEGORIES[courseName] || 'Other';
    const students = MOCK_ENROLLED[courseName] || '1,500';
    
    // Calculate course progress
    let enrolledCount = 0;
    let completedCount = 0;
    projects.forEach(p => {
      if (user?.enrolledCourses?.includes(p.id)) enrolledCount++;
      if (user?.completedProjects?.includes(p.id)) completedCount++;
    });

    const percent = projects.length > 0 ? Math.round((completedCount / projects.length) * 100) : 0;

    return {
      name: courseName,
      projects,
      category,
      students,
      percent,
      enrolledCount,
      completedCount,
      icon: projects[0]?.icon || '🌐',
      difficulty: projects[0]?.difficulty || 'Beginner',
      estTime: projects.reduce((acc, p) => acc + parseInt(p.estTime) || 2, 0) + ' hrs'
    };
  });

  const filteredCourses = coursesList.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                          c.projects.some(p => p.title.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = activeCategory === 'All' || c.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

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
      {/* 1. Header Title */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{
          fontSize: '3.2rem',
          fontWeight: '900',
          background: 'linear-gradient(135deg, #00d2ff, #af40ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '15px'
        }}>
          Roadmap Catalogue
        </h1>
        <p style={{ color: theme === 'dark' ? '#ccc' : '#555', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Explore professional curriculum modules and build production-grade web applications.
        </p>
      </div>

      {/* 2. Search & Category Filters Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px',
        flexWrap: 'wrap',
        marginBottom: '40px',
        background: theme === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
        padding: '16px 24px',
        borderRadius: '16px',
        border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`
      }}>
        {/* Category Tabs */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {['All', 'Frontend', 'Backend', 'Tools'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? 'linear-gradient(135deg, #00d2ff, #af40ff)' : 'none',
                border: activeCategory === cat ? 'none' : `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                borderRadius: '30px',
                padding: '8px 20px',
                color: activeCategory === cat ? '#fff' : (theme === 'dark' ? '#ccc' : '#555'),
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0,0,0,0.03)',
          border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0,0,0,0.1)',
          borderRadius: '50px',
          padding: '4px 20px',
          width: '320px',
          maxWidth: '100%'
        }}>
          <span style={{ marginRight: '10px' }}>🔍</span>
          <input 
            type="text" 
            placeholder="Filter roadmaps..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: 'none',
              border: 'none',
              color: theme === 'dark' ? '#fff' : '#000',
              outline: 'none',
              width: '100%',
              fontSize: '0.95rem',
              padding: '8px 0'
            }}
          />
        </div>
      </div>

      {/* 3. Roadmaps Display List */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '40px'
      }}>
        {filteredCourses.length > 0 ? (
          filteredCourses.map((c) => (
            <div 
              key={c.name} 
              style={{
                background: theme === 'dark' ? 'rgba(15, 15, 25, 0.7)' : 'rgba(255, 255, 255, 0.8)',
                border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0, 0, 0, 0.06)'}`,
                borderRadius: '20px',
                padding: '30px',
                boxShadow: 'var(--glass-shadow)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)'
              }}
            >
              {/* Course Module Header */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '25px',
                borderBottom: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                paddingBottom: '20px',
                flexWrap: 'wrap',
                gap: '15px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ fontSize: '2.5rem' }}>{c.icon}</span>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: '800' }}>{c.name}</h2>
                      <span style={{
                        fontSize: '0.75rem',
                        background: 'rgba(6, 182, 212, 0.1)',
                        color: '#06b6d4',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontWeight: 'bold'
                      }}>{c.category}</span>
                    </div>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', color: theme === 'dark' ? '#a1a1aa' : '#52525b' }}>
                      Master {c.name} dynamically by completing {c.projects.length} required milestone layouts.
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontSize: '0.85rem', color: '#888' }}>
                    <span>👥 {c.students} enrolled</span>
                    <span>⏱️ Total duration: {c.estTime}</span>
                  </div>
                  
                  {/* Circular/Linear Progress Bar */}
                  {c.enrolledCount > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#10ac84' }}>Progress: {c.percent}%</span>
                      <div style={{ width: '100px', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${c.percent}%`, height: '100%', background: '#10ac84' }} />
                      </div>
                    </div>
                  )}

                  <span style={{
                    background: 'rgba(99, 102, 241, 0.15)',
                    color: '#818cf8',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 'bold'
                  }}>{c.difficulty}</span>
                </div>
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
                          {isCompleted && (
                            <span style={{
                              background: 'rgba(16, 172, 132, 0.15)',
                              color: '#10ac84',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              fontSize: '0.75rem',
                              fontWeight: 'bold'
                            }}>Completed ✓</span>
                          )}
                          {isEnrolled && !isCompleted && (
                            <span style={{
                              background: 'rgba(0, 210, 255, 0.15)',
                              color: '#00d2ff',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              fontSize: '0.75rem',
                              fontWeight: 'bold'
                            }}>Active</span>
                          )}
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
                          {isCompleted ? 'Review Code' : isLocked ? 'Locked 🔒' : isEnrolled ? 'Resume Project' : 'Start Project'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '16px' }}>
            <span style={{ fontSize: '3rem' }}>🔍</span>
            <h3 style={{ marginTop: '15px' }}>No roadmaps found</h3>
            <p style={{ color: '#888', margin: '5px 0 20px' }}>Try searching or filtering for different technologies.</p>
            <button onClick={() => { setSearch(''); setActiveCategory('All'); }} className="uiverse-btn">Reset Filters</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Courses;