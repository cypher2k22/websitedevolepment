import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../AppContext';
import { LEARNING_PATHS } from '../../curriculumData';

// Flatten projects list for matching progress keys
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
          icon: path.icon
        });
      });
    }
  });
});

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, theme, logout } = useContext(AppContext);

  // Redirect to login if user is not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  // Find user's active enrolled projects
  const enrolledProjects = ALL_PROJECTS.filter(p => user.enrolledCourses?.includes(p.id));

  // Simulated leaderboard data
  const leaderboard = [
    { rank: 1, name: 'Alice Dev', xp: 5400, level: 25 },
    { rank: 2, name: 'Bob Coder', xp: 4800, level: 21 },
    { rank: 3, name: `${user.name} (You)`, xp: user.xp, level: user.level },
    { rank: 4, name: 'Dave Stack', xp: 2100, level: 10 },
    { rank: 5, name: 'Emma Script', xp: 1950, level: 9 }
  ].sort((a, b) => b.xp - a.xp);

  return (
    <StyledDashboard themeMode={theme}>
      {/* Top Banner stats */}
      <div className="stats-banner" aria-label="Student progress statistics">
        <div className="stat-card">
          <span className="emoji" role="img" aria-label="streak icon">🔥</span>
          <div className="stat-text">
            <h4>{user.streak} Days</h4>
            <p>Daily Streak</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="emoji" role="img" aria-label="XP icon">⭐</span>
          <div className="stat-text">
            <h4>{user.xp} XP</h4>
            <p>Level {user.level} Developer</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="emoji" role="img" aria-label="projects completed icon">🏆</span>
          <div className="stat-text">
            <h4>{user.completedProjects?.length || 0} Completed</h4>
            <p>Milestone Projects</p>
          </div>
        </div>
      </div>

      <div className="main-layout">
        {/* Left Column: Enrolled Projects & Curricula */}
        <div className="pathway-section">
          <h2>Your Enrolled Projects</h2>
          
          {enrolledProjects.length > 0 ? (
            <div className="projects-grid">
              {enrolledProjects.map(proj => {
                const progressPercent = user.progress?.[proj.id] || 0;
                return (
                  <div key={proj.id} className="project-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                      <span className="tech-badge">{proj.tech}</span>
                      <span style={{ fontSize: '0.8rem', color: '#888', fontWeight: 'bold' }}>{proj.level}</span>
                    </div>
                    
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '1.25rem' }}>{proj.title}</h3>
                    <p style={{ margin: '0 0 20px 0', fontSize: '0.85rem', color: '#aaa', lineHeight: '1.5' }}>
                      {proj.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="progress-container" style={{ marginBottom: '20px' }}>
                      <div className="progress-labels" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#888', marginBottom: '4px' }}>
                        <span>Progress</span>
                        <span>{progressPercent}%</span>
                      </div>
                      <div className="progress-track" style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div className="progress-fill" style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #00d2ff, #af40ff)', borderRadius: '3px' }} />
                      </div>
                    </div>

                    <button 
                      className="resume-btn"
                      onClick={() => navigate(`/workspace/${proj.tech}/${proj.id}/${proj.milestones[0].id}`)}
                      style={{
                        width: '100%',
                        backgroundImage: 'linear-gradient(135deg, #00d2ff, #af40ff)',
                        border: 'none',
                        color: '#fff',
                        fontWeight: 'bold',
                        padding: '10px',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      {progressPercent === 100 ? 'Review Project' : 'Resume Project'}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-projects-state">
              <span style={{ fontSize: '3rem' }}>🚀</span>
              <h3>No enrolled projects yet</h3>
              <p>Explore the project catalogue to choose your first milestone!</p>
              <button 
                onClick={() => navigate('/courses')}
                style={{
                  backgroundImage: 'linear-gradient(135deg, #00d2ff, #af40ff)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '10px 24px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginTop: '15px'
                }}
              >
                Browse Projects
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Gamification & Profile */}
        <div className="gamification-sidebar">
          {/* Leaderboard Card */}
          <div className="sidebar-card">
            <h3>Leaderboard Rank</h3>
            <div className="leaderboard-list">
              {leaderboard.map((item, idx) => (
                <div key={idx} className={`leaderboard-item ${item.name.includes('You') ? 'highlighted' : ''}`}>
                  <span className="rank">#{idx + 1}</span>
                  <span className="name">{item.name}</span>
                  <span className="xp">{item.xp} XP</span>
                </div>
              ))}
            </div>
          </div>

          {/* Downloadable Portfolio Generation */}
          <div className="sidebar-card portfolio-generator">
            <h3>Downloadable Portfolio</h3>
            {user.completedProjects?.length > 0 ? (
              <div>
                <p style={{ fontSize: '0.85rem', color: '#ccc', marginBottom: '15px' }}>
                  Generate your professional portfolio based on your completed CodeJourney projects.
                </p>
                <button 
                  className="export-btn"
                  onClick={() => {
                    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(user.completedProjects, null, 2));
                    const downloadAnchor = document.createElement('a');
                    downloadAnchor.setAttribute("href", dataStr);
                    downloadAnchor.setAttribute("download", "codejourney_portfolio.json");
                    document.body.appendChild(downloadAnchor);
                    downloadAnchor.click();
                    downloadAnchor.remove();
                  }}
                  style={{
                    width: '100%',
                    backgroundImage: 'linear-gradient(135deg, #00d2ff, #af40ff)',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '12px',
                    color: '#fff',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  Download JSON Portfolio
                </button>
              </div>
            ) : (
              <div className="empty-portfolio-state" style={{ textAlign: 'center', padding: '20px 0', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                <p style={{ fontSize: '0.85rem', color: '#888', margin: 0 }}>
                  Your completed projects will appear here for portfolio export!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </StyledDashboard>
  );
};

const StyledDashboard = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'system-ui', sans-serif;
  color: ${props => props.themeMode === 'dark' ? '#fff' : '#000'};
  min-height: 80vh;

  .stats-banner {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 25px;
    margin-bottom: 50px;
  }

  .stat-card {
    background: ${props => props.themeMode === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)'};
    border: 1px solid ${props => props.themeMode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.08)'};
    border-radius: 12px;
    padding: 20px 24px;
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .stat-card .emoji {
    font-size: 2.2rem;
  }

  .stat-text h4 {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 800;
  }

  .stat-text p {
    margin: 4px 0 0 0;
    font-size: 0.85rem;
    color: #888;
  }

  .main-layout {
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 35px;
  }

  @media (max-width: 992px) {
    .main-layout {
      grid-template-columns: 1fr;
    }
  }

  .pathway-section {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 25px;
  }

  .project-card {
    background: ${props => props.themeMode === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.01)'};
    border: 1px solid ${props => props.themeMode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.06)'};
    border-radius: 12px;
    padding: 20px;
  }

  .tech-badge {
    background: rgba(0, 210, 255, 0.1);
    color: #00d2ff;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: bold;
  }

  .empty-projects-state {
    text-align: center;
    padding: 60px 20px;
    background: ${props => props.themeMode === 'dark' ? 'rgba(255, 255, 255, 0.01)' : 'rgba(0,0,0,0.01)'};
    border: 1px dashed ${props => props.themeMode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
    border-radius: 16px;
  }

  .empty-projects-state h3 {
    margin: 15px 0 5px 0;
  }

  .empty-projects-state p {
    color: #888;
    margin: 0;
    font-size: 0.95rem;
  }

  .gamification-sidebar {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .sidebar-card {
    background: ${props => props.themeMode === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.02)'};
    border: 1px solid ${props => props.themeMode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.08)'};
    border-radius: 16px;
    padding: 25px;
  }

  .sidebar-card h3 {
    margin-top: 0;
    font-size: 1.15rem;
    border-bottom: 1px solid ${props => props.themeMode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'};
    padding-bottom: 12px;
    margin-bottom: 15px;
    font-weight: 700;
  }

  .leaderboard-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .leaderboard-item {
    display: flex;
    justify-content: space-between;
    padding: 10px 12px;
    border-radius: 6px;
    font-size: 0.9rem;
    background: ${props => props.themeMode === 'dark' ? 'rgba(255, 255, 255, 0.01)' : 'rgba(0, 0, 0, 0.01)'};
  }

  .leaderboard-item.highlighted {
    background: rgba(0, 210, 255, 0.1);
    border: 1.5px solid #00d2ff;
    font-weight: bold;
  }

  .leaderboard-item .xp {
    color: #00d2ff;
  }
`;

export default Dashboard;
