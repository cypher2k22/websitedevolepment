import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { PROJECTS_CURRICULUM } from '../data/curriculumData';

function Courses() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
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

  return (
    <div style={{
      padding: '40px 20px',
      maxWidth: '1200px',
      margin: '0 auto',
      fontFamily: 'system-ui, sans-serif',
      color: theme === 'dark' ? '#fff' : '#000',
      minHeight: '80vh'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: '900',
          background: 'linear-gradient(135deg, #6366f1, #00d2ff)',
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
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '30px'
      }}>
        {filteredCourses.map((c) => (
          <div 
            key={c.name} 
            onClick={() => navigate(`/courses/${c.name.toLowerCase()}`)}
            style={{
              background: theme === 'dark' ? 'rgba(24, 24, 27, 0.95)' : '#fff',
              border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
              borderRadius: '16px',
              padding: '30px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
              transition: 'transform 0.2s, border-color 0.2s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#6366f1';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0, 0, 0, 0.08)';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ fontSize: '2rem' }}>{c.icon}</span>
                <span style={{
                  background: 'rgba(99, 102, 241, 0.1)',
                  color: '#6366f1',
                  padding: '4px 10px',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 'bold'
                }}>{c.difficulty}</span>
              </div>

              <h3 style={{ margin: '0 0 10px 0', fontSize: '1.35rem', fontWeight: '800' }}>{c.name}</h3>
              <p style={{ color: theme === 'dark' ? '#ccc' : '#666', fontSize: '0.9rem', lineHeight: '1.5', margin: '0 0 20px 0' }}>
                Master {c.name} by building {c.projects.length} real-world project layouts.
              </p>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
              paddingTop: '20px',
              marginTop: '10px'
            }}>
              <span style={{ fontSize: '0.85rem', color: '#888', fontWeight: '500' }}>📋 {c.projects.length} Projects</span>
              <button
                style={{
                  backgroundImage: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '10px 20px',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                View Projects
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;