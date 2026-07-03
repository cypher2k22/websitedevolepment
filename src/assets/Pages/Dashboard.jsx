import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { LEARNING_PATHS } from '../../curriculumData';

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedTech, setSelectedTech] = useState('HTML');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Simulated gamification state
  const userStats = {
    xp: 2450,
    level: 12,
    streak: 5,
    coins: 120,
    completedLessons: 18,
    completedProjects: 4,
    badges: ['HTML Beginner', 'CSS Wizard', 'Code Rookie', '5-Day Streak']
  };

  // Simulated leaderboard data
  const leaderboard = [
    { rank: 1, name: 'Alice Dev', xp: 5400, level: 25 },
    { rank: 2, name: 'Bob Coder', xp: 4800, level: 21 },
    { rank: 3, name: 'You (Admin)', xp: 2450, level: 12 },
    { rank: 4, name: 'Dave Stack', xp: 2100, level: 10 },
    { rank: 5, name: 'Emma Script', xp: 1950, level: 9 }
  ];

  // Completed projects (for Portfolio generation)
  const completedProjects = [
    {
      title: 'Glassmorphic Card',
      tech: 'CSS',
      date: '2026-06-30',
      description: 'An elegant glassmorphic profile card with vivid gradients and backdrop filters.',
      features: 'Backdrop-filter blur, CSS linear gradients, responsive flex layout',
      demoLink: 'https://codepen.io/demo/glass',
      repoLink: 'https://github.com/demo/glass-card'
    },
    {
      title: 'Personal Profile Page',
      tech: 'HTML',
      date: '2026-06-28',
      description: 'A semantic page showcasing personal details, bio, and visual media tags.',
      features: 'Semantic tags, responsive structure, schema markup',
      demoLink: 'https://codepen.io/demo/profile',
      repoLink: 'https://github.com/demo/profile-page'
    }
  ];

  const handleProjectSelect = (tech, projectId, milestoneId) => {
    navigate(`/workspace/${tech}/${projectId}/${milestoneId}`);
  };

  const filteredTechs = Object.keys(LEARNING_PATHS).filter(tech =>
    tech.toLowerCase().includes(searchQuery.toLowerCase()) ||
    LEARNING_PATHS[tech].description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <StyledDashboard>
      {/* Top Banner stats */}
      <div className="stats-banner">
        <div className="stat-card">
          <span className="emoji">🔥</span>
          <div>
            <h4>{userStats.streak} Days</h4>
            <p>Daily Streak</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="emoji">⭐</span>
          <div>
            <h4>{userStats.xp} XP</h4>
            <p>Level {userStats.level} Developer</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="emoji">🪙</span>
          <div>
            <h4>{userStats.coins} Coins</h4>
            <p>Available Balance</p>
          </div>
        </div>
        <div className="stat-card">
          <span className="emoji">🏆</span>
          <div>
            <h4>{userStats.completedProjects} Completed</h4>
            <p>Milestone Projects</p>
          </div>
        </div>
      </div>

      <div className="main-layout">
        {/* Left Column: Learning Pathways */}
        <div className="pathway-section">
          <div className="section-header">
            <h2>Educational Learning Paths</h2>
            <input 
              type="text" 
              placeholder="Search technologies (e.g. Node, React, Docker)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="tech-selectors-grid">
            {filteredTechs.map(tech => (
              <button 
                key={tech} 
                className={`tech-btn ${selectedTech === tech ? 'active' : ''}`}
                onClick={() => setSelectedTech(tech)}
              >
                <span className="tech-icon">{LEARNING_PATHS[tech].icon}</span>
                <span className="tech-name">{tech}</span>
              </button>
            ))}
          </div>

          {/* Selected Tech Detail View */}
          {selectedTech && LEARNING_PATHS[selectedTech] && (
            <div className="tech-details-card">
              <div className="tech-meta">
                <span className="tech-title-icon">{LEARNING_PATHS[selectedTech].icon}</span>
                <div>
                  <h3>{LEARNING_PATHS[selectedTech].title}</h3>
                  <p>{LEARNING_PATHS[selectedTech].description}</p>
                </div>
              </div>

              {/* Levels Container */}
              <div className="levels-container">
                {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                  <div key={level} className="level-column">
                    <h4>{level} Path</h4>
                    <div className="projects-list">
                      {LEARNING_PATHS[selectedTech].levels[level]?.map(proj => (
                        <div key={proj.id} className="project-card">
                          <h5>{proj.title}</h5>
                          <p>{proj.description}</p>
                          <div className="milestones-progress">
                            <span className="milestones-label">Milestones:</span>
                            <div className="milestones-steps">
                              {proj.milestones.map((m, i) => (
                                <button 
                                  key={m.id}
                                  className={`milestone-dot ${i === 0 ? 'unlocked' : 'locked'}`}
                                  onClick={() => handleProjectSelect(selectedTech, proj.id, m.id)}
                                  title={`${m.title}: ${m.desc}`}
                                >
                                  {i + 1}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Gamification & Portfolio */}
        <div className="gamification-sidebar">
          {/* Leaderboard Card */}
          <div className="sidebar-card">
            <h3>Leaderboard</h3>
            <div className="leaderboard-list">
              {leaderboard.map(user => (
                <div key={user.rank} className={`leaderboard-item ${user.name.includes('You') ? 'highlighted' : ''}`}>
                  <span className="rank">#{user.rank}</span>
                  <span className="name">{user.name}</span>
                  <span className="xp">{user.xp} XP</span>
                </div>
              ))}
            </div>
          </div>

          {/* Badges Earned */}
          <div className="sidebar-card">
            <h3>Badges & Achievements</h3>
            <div className="badges-grid">
              {userStats.badges.map((badge, idx) => (
                <div key={idx} className="badge-item">
                  <span className="badge-icon">🏅</span>
                  <span className="badge-name">{badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Downloadable Portfolio Generation */}
          <div className="sidebar-card portfolio-generator">
            <h3>Generated Portfolios</h3>
            <p style={{ fontSize: '0.85rem', color: '#aaa', margin: '0 0 15px' }}>
              Your completed milestones can be exported directly as JSON resumes.
            </p>
            <div className="portfolio-list">
              {completedProjects.map((p, idx) => (
                <div key={idx} className="portfolio-item-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong>{p.title}</strong>
                    <span className="tech-badge">{p.tech}</span>
                  </div>
                  <p style={{ margin: '8px 0', fontSize: '0.8rem', color: '#ccc' }}>{p.description}</p>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <a href={p.demoLink} target="_blank" rel="noreferrer" className="action-link">Live Demo</a>
                    <a href={p.repoLink} target="_blank" rel="noreferrer" className="action-link">GitHub</a>
                  </div>
                </div>
              ))}
            </div>
            <button 
              className="export-btn"
              onClick={() => {
                const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(completedProjects, null, 2));
                const downloadAnchor = document.createElement('a');
                downloadAnchor.setAttribute("href", dataStr);
                downloadAnchor.setAttribute("download", "developer_portfolio.json");
                document.body.appendChild(downloadAnchor);
                downloadAnchor.click();
                downloadAnchor.remove();
              }}
            >
              Export JSON Portfolio
            </button>
          </div>
        </div>
      </div>
    </StyledDashboard>
  );
};

const StyledDashboard = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 30px 20px;
  font-family: 'system-ui', sans-serif;
  color: #fff;

  .stats-banner {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
  }

  .stat-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 15px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }

  .stat-card .emoji {
    font-size: 2.2rem;
  }

  .stat-card h4 {
    margin: 0 0 4px 0;
    font-size: 1.25rem;
    font-weight: 800;
  }

  .stat-card p {
    margin: 0;
    font-size: 0.85rem;
    color: #aaa;
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

  .pathway-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 15px;
  }

  .search-input {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 10px 20px;
    color: white;
    outline: none;
    width: 320px;
    font-size: 0.9rem;
  }

  .tech-selectors-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 10px;
    max-height: 220px;
    overflow-y: auto;
    background: rgba(0,0,0,0.2);
    padding: 15px;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.05);
  }

  .tech-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
    color: #fff;
    padding: 10px;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
    height: auto;
    width: auto;
    position: static;
    transform: none;
    box-shadow: none;
  }

  .tech-btn:hover, .tech-btn.active {
    background: rgba(255, 255, 255, 0.1);
    border-color: #00d2ff;
  }

  .tech-details-card {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }

  .tech-meta {
    display: flex;
    align-items: center;
    gap: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding-bottom: 20px;
    margin-bottom: 25px;
  }

  .tech-title-icon {
    font-size: 3rem;
  }

  .tech-meta h3 {
    margin: 0 0 5px 0;
    font-size: 1.75rem;
  }

  .tech-meta p {
    margin: 0;
    color: #aaa;
    font-size: 0.95rem;
  }

  .levels-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: 20px;
  }

  .level-column h4 {
    border-bottom: 2px solid rgba(255, 255, 255, 0.08);
    padding-bottom: 10px;
    margin-top: 0;
    font-size: 1.1rem;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .projects-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .project-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 8px;
    padding: 15px;
  }

  .project-card h5 {
    margin: 0 0 8px 0;
    font-size: 1rem;
    color: #00d2ff;
  }

  .project-card p {
    margin: 0 0 15px 0;
    font-size: 0.85rem;
    color: #aaa;
    line-height: 1.4;
  }

  .milestones-progress {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    font-size: 0.8rem;
  }

  .milestones-label {
    color: #888;
  }

  .milestones-steps {
    display: flex;
    gap: 6px;
  }

  .milestone-dot {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.2s;
    position: static;
    transform: none;
    box-shadow: none;
    padding: 0;
    border: none;
  }

  .milestone-dot.unlocked {
    background: #00d2ff;
    color: #000;
  }

  .milestone-dot.locked {
    background: rgba(255, 255, 255, 0.08);
    color: #666;
    cursor: not-allowed;
  }

  .gamification-sidebar {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .sidebar-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 20px;
  }

  .sidebar-card h3 {
    margin-top: 0;
    font-size: 1.1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding-bottom: 10px;
    margin-bottom: 15px;
  }

  .leaderboard-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .leaderboard-item {
    display: flex;
    justify-content: space-between;
    padding: 8px;
    border-radius: 6px;
    font-size: 0.9rem;
  }

  .leaderboard-item.highlighted {
    background: rgba(0, 210, 255, 0.15);
    border: 1px solid #00d2ff;
  }

  .leaderboard-item .rank {
    font-weight: bold;
    color: #888;
  }

  .leaderboard-item .xp {
    font-weight: bold;
    color: #00d2ff;
  }

  .badges-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }

  .badge-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    padding: 10px;
    text-align: center;
  }

  .badge-icon {
    font-size: 1.75rem;
    margin-bottom: 5px;
  }

  .badge-name {
    font-size: 0.75rem;
    color: #ccc;
  }

  .portfolio-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px;
  }

  .portfolio-item-card {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    padding: 15px;
  }

  .tech-badge {
    background: rgba(0, 210, 255, 0.1);
    color: #00d2ff;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: bold;
  }

  .action-link {
    font-size: 0.8rem;
    color: #00d2ff;
    text-decoration: none;
  }

  .action-link:hover {
    text-decoration: underline;
  }

  .export-btn {
    position: static;
    transform: none;
    width: 100%;
    background-image: linear-gradient(135deg, #00d2ff, #af40ff);
    border: none;
    border-radius: 6px;
    padding: 12px;
    color: white;
    cursor: pointer;
    font-weight: bold;
    height: auto;
  }
`;

export default Dashboard;
