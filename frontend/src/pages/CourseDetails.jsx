import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { PROJECTS_CURRICULUM } from '../data/curriculumData';

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user, enrollInProject, isProjectLocked, addToast } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const courseProjects = PROJECTS_CURRICULUM.filter(p => p.course.toLowerCase() === courseId.toLowerCase());

  if (courseProjects.length === 0) {
    return (
      <div style={{ padding: '60px 20px', textAlign: 'center', color: theme === 'dark' ? '#fff' : '#000' }}>
        <h3>Course not found</h3>
        <button onClick={() => navigate('/courses')} style={{ background: '#6366f1', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', marginTop: '15px' }}>
          Back to Courses
        </button>
      </div>
    );
  }

  const handleActionClick = (proj, isLocked, isEnrolled) => {
    if (!user) {
      addToast('Authentication required. Redirecting to login.', 'info');
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

  return (
    <div style={{
      padding: '40px 20px',
      maxWidth: '900px',
      margin: '0 auto',
      fontFamily: 'system-ui, sans-serif',
      color: theme === 'dark' ? '#fff' : '#000',
      minHeight: '80vh'
    }}>
      <button onClick={() => navigate('/courses')} style={{ background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold', marginBottom: '20px' }}>
        ← Back to Catalogue
      </button>

      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', margin: '0 0 10px 0' }}>{courseProjects[0].course} Projects</h1>
        <p style={{ color: '#888', margin: 0 }}>Progress through these projects to master this topic.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {courseProjects.map((proj, index) => {
          const isLocked = isProjectLocked(proj.id);
          const isEnrolled = user?.enrolledCourses?.includes(proj.id);
          const isCompleted = user?.completedProjects?.includes(proj.id);

          return (
            <div key={proj.id} style={{
              background: theme === 'dark' ? 'rgba(24, 24, 27, 0.95)' : '#fff',
              border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
              borderRadius: '12px',
              padding: '25px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '20px',
              opacity: isLocked ? 0.6 : 1
            }}>
              <div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '1.25rem' }}>
                  Project {index + 1}: {proj.title}
                </h3>
                <p style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#aaa', maxWidth: '500px' }}>
                  {proj.description}
                </p>
                <div style={{ display: 'flex', gap: '10px', fontSize: '0.8rem', color: '#888' }}>
                  <span>⏱️ {proj.estTime}</span>
                  <span>•</span>
                  <span>{proj.difficulty}</span>
                </div>
              </div>

              <div>
                <button
                  onClick={() => handleActionClick(proj, isLocked, isEnrolled)}
                  style={{
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
                    cursor: isCompleted ? 'default' : 'pointer',
                    fontSize: '0.85rem'
                  }}
                  disabled={isCompleted}
                >
                  {isCompleted ? 'Completed ✓' : isLocked ? 'Locked 🔒' : isEnrolled ? 'Resume Project' : 'Start Project'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CourseDetails;
