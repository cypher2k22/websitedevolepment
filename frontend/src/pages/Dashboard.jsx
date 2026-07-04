import React, { useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { PROJECTS_CURRICULUM } from '../data/curriculumData';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout, toggleBookmark, claimCertificate } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const enrolledProjects = PROJECTS_CURRICULUM.filter(p => user.enrolledCourses?.includes(p.id));
  const completedProjects = PROJECTS_CURRICULUM.filter(p => user.completedProjects?.includes(p.id));
  const bookmarkedProjects = PROJECTS_CURRICULUM.filter(p => user.bookmarks?.includes(p.id));

  // Determine course-wise completion for Certificate eligibility
  const courseGroups = {};
  PROJECTS_CURRICULUM.forEach(p => {
    if (!courseGroups[p.course]) courseGroups[p.course] = { total: 0, completed: 0 };
    courseGroups[p.course].total++;
    if (user.completedProjects?.includes(p.id)) {
      courseGroups[p.course].completed++;
    }
  });

  const eligibleCertificates = Object.keys(courseGroups).filter(courseName => {
    const stats = courseGroups[courseName];
    return stats.completed === stats.total && stats.total > 0;
  });

  const leaderboard = [
    { rank: 1, name: 'Alice Dev', xp: 5400, level: 11 },
    { rank: 2, name: 'Bob Coder', xp: 4800, level: 10 },
    { rank: 3, name: `${user.name} (You)`, xp: user.xp, level: user.level },
    { rank: 4, name: 'Dave Stack', xp: 2100, level: 5 },
    { rank: 5, name: 'Emma Script', xp: 1950, level: 4 }
  ].sort((a, b) => b.xp - a.xp);

  return (
    <StyledDashboard themeMode={theme}>
      {/* 1. Welcome Header Widget */}
      <div className="welcome-banner glass-panel">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div className="avatar">👤</div>
          <div>
            <h1 style={{ margin: 0, fontSize: '2rem', fontWeight: '800' }}>Welcome back, {user.name}!</h1>
            <p style={{ margin: '4px 0 0 0', color: 'var(--text-muted)' }}>
              Role: <span style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>{user.role}</span> | Level {user.level} Developer
            </p>
          </div>
        </div>

        <div className="stats-row">
          <div className="stat-box">
            <span className="emoji">🔥</span>
            <div>
              <strong>{user.streak || 1} Days</strong>
              <span>Daily Streak</span>
            </div>
          </div>
          <div className="stat-box">
            <span className="emoji">⭐</span>
            <div>
              <strong>{user.xp} XP</strong>
              <span>Level Progress</span>
            </div>
          </div>
          <div className="stat-box">
            <span className="emoji">🏆</span>
            <div>
              <strong>{completedProjects.length} Done</strong>
              <span>Milestones</span>
            </div>
          </div>
        </div>
      </div>

      <div className="main-layout">
        {/* Left main content columns */}
        <div className="left-content">
          
          {/* 2. Continue Learning Row */}
          <div className="section-card glass-panel">
            <h2>Continue Learning</h2>
            {enrolledProjects.length > 0 ? (
              <div className="projects-grid">
                {enrolledProjects.map(proj => {
                  const progressPercent = user.progress?.[proj.id] || 0;
                  const isCompleted = user.completedProjects?.includes(proj.id);
                  return (
                    <div key={proj.id} className="project-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                        <span className="tech-badge">{proj.technology}</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 'bold' }}>{proj.difficulty}</span>
                      </div>
                      <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem' }}>{proj.title}</h3>
                      <p style={{ margin: '0 0 20px 0', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                        {proj.objective}
                      </p>
                      
                      <div className="progress-container" style={{ marginBottom: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '6px' }}>
                          <span>Progress</span>
                          <span>{progressPercent}%</span>
                        </div>
                        <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #00d2ff, #af40ff)' }} />
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button 
                          className="action-btn"
                          onClick={() => navigate(`/workspace/${proj.technology}/${proj.id}/${proj.milestones[0].id}`)}
                          style={{ flex: 1 }}
                        >
                          {isCompleted ? 'Review Code' : 'Resume Workspace'}
                        </button>
                        <button 
                          onClick={() => toggleBookmark(proj.id)}
                          style={{ background: 'none', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '6px', padding: '0 12px', cursor: 'pointer' }}
                        >
                          🏷️
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>No active projects. Enroll in a learning module to begin!</p>
                <button onClick={() => navigate('/courses')} className="action-btn" style={{ padding: '10px 24px' }}>Browse Roadmaps</button>
              </div>
            )}
          </div>

          {/* 3. Certificate Eligibility Panel */}
          {eligibleCertificates.length > 0 && (
            <div className="section-card glass-panel" style={{ border: '1px solid var(--success)' }}>
              <h2 style={{ color: 'var(--success)' }}>🎓 Claimable Certifications</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
                {eligibleCertificates.map(courseName => {
                  const claimed = user.certificates?.includes(courseName);
                  return (
                    <div key={courseName} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.01)', padding: '15px 20px', borderRadius: '8px' }}>
                      <div>
                        <strong style={{ fontSize: '1.1rem' }}>{courseName} Completion Certificate</strong>
                        <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>All milestones completed inside the curriculum path.</p>
                      </div>
                      <button 
                        onClick={() => claimCertificate(courseName)}
                        disabled={claimed}
                        style={{
                          background: claimed ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #10ac84, #00ddeb)',
                          border: 'none',
                          color: claimed ? '#888' : '#fff',
                          fontWeight: 'bold',
                          padding: '10px 20px',
                          borderRadius: '6px',
                          cursor: claimed ? 'default' : 'pointer'
                        }}
                      >
                        {claimed ? 'Claimed ✓' : 'Claim Certificate'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. Bookmarks Panel */}
          {bookmarkedProjects.length > 0 && (
            <div className="section-card glass-panel">
              <h2>Bookmarked Projects</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px', marginTop: '15px' }}>
                {bookmarkedProjects.map(proj => (
                  <div key={proj.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '15px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <strong style={{ fontSize: '1rem', display: 'block', marginBottom: '6px' }}>{proj.title}</strong>
                      <span style={{ fontSize: '0.75rem', background: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>{proj.technology}</span>
                    </div>
                    <button 
                      onClick={() => navigate(`/workspace/${proj.technology}/${proj.id}/${proj.milestones[0].id}`)}
                      style={{ marginTop: '15px', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: '6px', padding: '8px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                      Start Project
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. Completed Registry */}
          <div className="section-card glass-panel">
            <h2>Completed Milestones</h2>
            {completedProjects.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
                {completedProjects.map(proj => (
                  <div key={proj.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(16, 172, 132, 0.05)', border: '1px solid rgba(16, 172, 132, 0.2)', padding: '12px 20px', borderRadius: '8px' }}>
                    <span>{proj.title} ({proj.technology})</span>
                    <span style={{ color: '#10ac84', fontWeight: 'bold' }}>✓ Done</span>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '15px' }}>No completed projects yet. Finish a workspace module to unlock certifications.</p>
            )}
          </div>

        </div>

        {/* Right sidebar elements */}
        <div className="right-sidebar">
          
          {/* Achievements / Badges */}
          <div className="sidebar-widget glass-panel">
            <h3>Badges & Achievements</h3>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
              {(user.achievements || []).map((badge, idx) => (
                <span 
                  key={idx} 
                  title={badge} 
                  style={{
                    background: 'linear-gradient(135deg, #af40ff, #5b42f3)',
                    color: '#fff',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    cursor: 'default'
                  }}
                >
                  🏅 {badge}
                </span>
              ))}
              {(!user.achievements || user.achievements.length === 0) && (
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Complete projects to earn developer badges.</span>
              )}
            </div>
          </div>

          {/* Leaderboard Panel */}
          <div className="sidebar-widget glass-panel">
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

          {/* Weekly Goals Widget */}
          <div className="sidebar-widget glass-panel">
            <h3>Weekly Goals</h3>
            <div style={{ marginTop: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span>Complete 2 projects</span>
                <span>{completedProjects.length >= 2 ? '100%' : `${completedProjects.length * 50}%`}</span>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: completedProjects.length >= 2 ? '100%' : `${completedProjects.length * 50}%`, height: '100%', background: 'var(--secondary)' }} />
              </div>
              <p style={{ margin: '8px 0 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Reward: +150 XP & "Speed Demon" badge.</p>
            </div>
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
  min-height: 85vh;
  
  --bg-surface: ${props => props.themeMode === 'dark' ? 'rgba(17, 17, 27, 0.85)' : 'rgba(255, 255, 255, 0.9)'};
  --text-muted: ${props => props.themeMode === 'dark' ? '#a1a1aa' : '#71717a'};

  .welcome-banner {
    padding: 30px;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 30px;
    margin-bottom: 40px;
  }

  .avatar {
    font-size: 3.2rem;
    background: rgba(255,255,255,0.05);
    width: 70px;
    height: 70px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .stats-row {
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
  }

  .stat-box {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .stat-box .emoji {
    font-size: 2rem;
  }

  .stat-box strong {
    display: block;
    font-size: 1.1rem;
  }

  .stat-box span {
    font-size: 0.8rem;
    color: var(--text-muted);
  }

  .main-layout {
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 30px;
  }

  @media (max-width: 992px) {
    .main-layout {
      grid-template-columns: 1fr;
    }
  }

  .left-content {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .section-card {
    padding: 30px;
    border-radius: 16px;
  }

  .section-card h2 {
    font-size: 1.4rem;
    font-weight: 800;
    margin-bottom: 20px;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    gap: 20px;
  }

  .project-card {
    background: rgba(255, 255, 255, 0.01);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .tech-badge {
    background: rgba(6, 182, 212, 0.15);
    color: #06b6d4;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: bold;
  }

  .action-btn {
    background: var(--primary);
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 10px;
    font-weight: bold;
    cursor: pointer;
    font-size: 0.85rem;
    transition: opacity 0.2s;
  }

  .action-btn:hover {
    opacity: 0.9;
  }

  .right-sidebar {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .sidebar-widget {
    padding: 25px;
    border-radius: 16px;
  }

  .sidebar-widget h3 {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 15px;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 10px;
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
    border-radius: 8px;
    font-size: 0.85rem;
    background: rgba(255,255,255,0.01);
    border: 1px solid var(--border-color);
  }

  .leaderboard-item.highlighted {
    background: rgba(99, 102, 241, 0.1);
    border: 1.5px solid var(--primary);
    font-weight: bold;
  }

  .leaderboard-item .xp {
    color: var(--primary);
  }
`;

export default Dashboard;
