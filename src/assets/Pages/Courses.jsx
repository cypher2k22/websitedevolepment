import React, { useState } from 'react';
import './Pages.css';

const COURSE_DATA = [
  {
    id: 1,
    title: 'Modern Frontend Architecture',
    category: 'Frontend',
    description: 'Master React, hooks, state management (Zustand, Redux), custom build pipelines, and performance optimization techniques.',
    duration: '10 weeks',
    level: 'Advanced',
    color: '#00d2ff',
    icon: '⚛️'
  },
  {
    id: 2,
    title: 'Scalable Backend Architectures',
    category: 'Backend',
    description: 'Build secure APIs with Express, FastAPI, and Go. Understand microservices, pub/sub, caching layers, and high-performance routing.',
    duration: '12 weeks',
    level: 'Advanced',
    color: '#af40ff',
    icon: '⚙️'
  },
  {
    id: 3,
    title: 'Cloud Systems & DevOps CI/CD',
    category: 'DevOps',
    description: 'Deploy real-world scale applications using Docker, Kubernetes, AWS, and automated GitHub Actions pipelines.',
    duration: '8 weeks',
    level: 'Intermediate',
    color: '#00ddeb',
    icon: '☁️'
  },
  {
    id: 4,
    title: 'Distributed Database Systems',
    category: 'Databases',
    description: 'Learn PostgreSQL optimization, MongoDB aggregation, Redis caching strategies, and database sharding patterns.',
    duration: '8 weeks',
    level: 'Advanced',
    color: '#ff9f43',
    icon: '💾'
  },
  {
    id: 5,
    title: 'System Design Interview Boot Camp',
    category: 'Systems',
    description: 'Crack senior engineering interviews. Learn load balancing, rate limiters, CDN architectures, and globally replicated servers.',
    duration: '6 weeks',
    level: 'Expert',
    color: '#10ac84',
    icon: '🏛️'
  }
];

function Courses() {
  const [search, setSearch] = useState('');
  const [enrolled, setEnrolled] = useState({});

  const handleEnroll = (id) => {
    setEnrolled(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredCourses = COURSE_DATA.filter(course => 
    course.title.toLowerCase().includes(search.toLowerCase()) ||
    course.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Header Info */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{
          fontSize: '2.8rem',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #00d2ff, #af40ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '15px'
        }}>
          Explore Fullstack Curriculum
        </h1>
        <p style={{ color: '#ccc', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          Kickstart your journey. Select modules designed by production engineering leads.
        </p>

        {/* Search Bar */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '50px',
            padding: '4px 20px',
            width: '400px',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)'
          }}>
            <span style={{ marginRight: '10px' }}>🔍</span>
            <input 
              type="text" 
              placeholder="Search courses or categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                outline: 'none',
                width: '100%',
                fontSize: '1rem',
                padding: '10px 0'
              }}
            />
          </div>
        </div>
      </div>

      {/* Grid of Courses */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '30px'
      }}>
        {filteredCourses.map((course) => (
          <div key={course.id} style={{
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(16px)',
            border: `1px solid rgba(255, 255, 255, 0.08)`,
            borderRadius: '16px',
            padding: '30px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
            transition: 'transform 0.3s ease, border 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.borderColor = course.color;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
          }}>
            {/* Top Row */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ fontSize: '2rem' }}>{course.icon}</span>
                <span style={{
                  background: `rgba(${parseInt(course.color.slice(1,3), 16) || 0}, ${parseInt(course.color.slice(3,5), 16) || 210}, ${parseInt(course.color.slice(5,7), 16) || 255}, 0.15)`,
                  color: course.color,
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  border: `1px solid ${course.color}`
                }}>{course.level}</span>
              </div>

              <h3 style={{ color: '#fff', fontSize: '1.3rem', margin: '0 0 10px 0', fontWeight: '700' }}>{course.title}</h3>
              <p style={{ color: '#aaa', fontSize: '0.9rem', lineHeight: '1.6', margin: '0 0 20px 0' }}>{course.description}</p>
            </div>

            {/* Bottom Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '20px', marginTop: '10px' }}>
              <span style={{ fontSize: '0.85rem', color: '#888' }}>⏱️ {course.duration}</span>
              <button 
                onClick={() => handleEnroll(course.id)}
                style={{
                  position: 'static',
                  transform: 'none',
                  backgroundImage: enrolled[course.id] ? 'none' : `linear-gradient(135deg, ${course.color}, #000)`,
                  backgroundColor: enrolled[course.id] ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  color: enrolled[course.id] ? '#aaa' : '#fff',
                  border: enrolled[course.id] ? '1px solid rgba(255,255,255,0.2)' : 'none',
                  minWidth: '100px',
                  height: '2rem',
                  fontSize: '0.85rem',
                  borderRadius: '6px'
                }}>
                <span style={{ background: 'transparent', padding: '0 12px' }}>
                  {enrolled[course.id] ? 'Enrolled ✓' : 'Enroll Now'}
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;