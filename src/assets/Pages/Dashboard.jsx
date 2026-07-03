import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { LEARNING_PATHS } from '../../curriculumData';

// Technology Path Groups
const PATH_GROUPS = {
  'Frontend Path': ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Next.js'],
  'Backend Path': ['Node.js', 'Express.js', 'FastAPI', 'Python', 'REST APIs'],
  'Mobile Path': ['React Native'],
  'Database Specialist': ['MongoDB', 'MySQL', 'PostgreSQL', 'Firebase'],
  'DevOps & Cloud': ['Docker', 'Deployment'],
  'AI & Computer Science': ['AI APIs', 'Machine Learning Basics', 'System Design Basics'],
  'Basics & Tools': ['Git', 'GitHub']
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedTech, setSelectedTech] = useState('HTML');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPath, setSelectedPath] = useState('Frontend Path');

  // State-driven gamification stats
  const [userStats, setUserStats] = useState({
    xp: 2450,
    level: 12,
    streak: 5,
    coins: 120,
    completedLessons: 18,
    completedProjects: 2,
    badges: ['HTML Beginner', 'CSS Wizard', 'Code Rookie', '5-Day Streak']
  });

  React.useEffect(() => {
    const fetchUserStats = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const res = await fetch('http://localhost:5000/api/auth/user', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setUserStats(prev => ({
            ...prev,
            xp: data.xp ?? prev.xp,
            level: data.level ?? prev.level,
            streak: data.streak ?? prev.streak,
            coins: data.coins ?? prev.coins,
            badges: data.badges?.length ? data.badges : prev.badges,
            completedProjects: data.completedProjects?.length ? data.completedProjects.length : prev.completedProjects
          }));
        }
      } catch (err) {
        console.warn('Backend server offline. Keeping simulated dashboard data.');
      }
    };
    fetchUserStats();
  }, []);

  // Simulated project progress (percentage complete)
  const projectProgress = {
    'html-p1': 66, // 2 out of 3 milestones
    'css-p1': 100, // 2 out of 2 milestones
    'html-p2': 0
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

  // Instant filtering of tech options based on search query
  const filteredTechs = Object.keys(LEARNING_PATHS).filter(tech =>
    tech.toLowerCase().includes(searchQuery.toLowerCase()) ||
    LEARNING_PATHS[tech].description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <StyledDashboard>
      {/* Top Banner stats with enhanced spacing & visual hierarchy */}
      <div className="stats-banner" aria-label="Your Learning Statistics">
        <div className="stat-card" aria-label="Current Daily Streak">
          <span className="emoji" role="img" aria-label="Fire emoji">🔥</span>
          <div className="stat-text">
            <h4>{userStats.streak} Days</h4>
            <p>Daily Streak</p>
          </div>
        </div>
        <div className="stat-card" aria-label="Current Experience Points">
          <span className="emoji" role="img" aria-label="Star emoji">⭐</span>
          <div className="stat-text">
            <h4>{userStats.xp} XP</h4>
            <p>Level {userStats.level} Developer</p>
          </div>
        </div>
        <div className="stat-card" aria-label="Current Coins Balance">
          <span className="emoji" role="img" aria-label="Coin emoji">🪙</span>
          <div className="stat-text">
            <h4>{userStats.coins} Coins</h4>
            <p>Available Balance</p>
          </div>
        </div>
        <div className="stat-card" aria-label="Projects Completed">
          <span className="emoji" role="img" aria-label="Trophy emoji">🏆</span>
          <div className="stat-text">
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
            <div className="search-wrapper">
              <span className="search-icon">🔍</span>
              <input 
                type="text" 
                placeholder="Search technologies (e.g. Node, React, Docker)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                aria-label="Search technologies input"
              />
            </div>
          </div>

          {/* Group Path Selectors */}
          <div className="path-groups-tabs">
            {Object.keys(PATH_GROUPS).map(group => (
              <button
                key={group}
                className={`path-group-tab ${selectedPath === group ? 'active' : ''}`}
                onClick={() => { setSelectedPath(group); setSearchQuery(''); }}
              >
                {group}
              </button>
            ))}
          </div>

          {/* Tech selectors grid within the chosen path */}
          <div className="tech-selectors-grid" aria-label="Select Technology">
            {filteredTechs
              .filter(tech => searchQuery ? true : PATH_GROUPS[selectedPath].includes(tech))
              .map(tech => (
                <button 
                  key={tech} 
                  className={`tech-btn ${selectedTech === tech ? 'active' : ''}`}
                  onClick={() => setSelectedTech(tech)}
                  aria-label={`Select ${tech} Learning Path`}
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
                <span className="tech-title-icon" role="img" aria-label={`${selectedTech} icon`}>{LEARNING_PATHS[selectedTech].icon}</span>
                <div>
                  <h3>{LEARNING_PATHS[selectedTech].title}</h3>
                  <p className="description-text">{LEARNING_PATHS[selectedTech].description}</p>
                </div>
              </div>

              {/* Levels Container */}
              <div className="levels-container">
                {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                  <div key={level} className="level-column">
                    <h4>{level} Path</h4>
                    <div className="projects-list">
                      {LEARNING_PATHS[selectedTech].levels[level]?.map(proj => {
                        const progress = projectProgress[proj.id] || 0;
                        return (
                          <div key={proj.id} className="project-card">
                            <h5>{proj.title}</h5>
                            <p>{proj.description}</p>
                            
                            {/* Project Progress Meter */}
                            <div className="progress-meter-container">
                              <div className="progress-labels">
                                <span>Progress</span>
                                <span>{progress}%</span>
                              </div>
                              <div className="progress-track-bg">
                                <div className="progress-fill-bar" style={{ width: `${progress}%` }} />
                              </div>
                            </div>

                            <div className="milestones-progress">
                              <span className="milestones-label">Milestones:</span>
                              <div className="milestones-steps">
                                {proj.milestones.map((m, i) => (
                                  <button 
                                    key={m.id}
                                    className={`milestone-dot ${i === 0 || progress > 0 ? 'unlocked' : 'locked'}`}
                                    onClick={() => handleProjectSelect(selectedTech, proj.id, m.id)}
                                    title={`${m.title}: ${m.desc}`}
                                    aria-label={`Go to milestone ${i + 1}`}
                                  >
                                    {i + 1}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <button 
                              className="start-project-btn"
                              onClick={() => handleProjectSelect(selectedTech, proj.id, proj.milestones[0].id)}
                            >
                              {progress === 100 ? 'Review Project' : progress > 0 ? 'Resume Project' : 'Start Project'}
                            </button>
                          </div>
                        );
                      })}
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
          <div className="sidebar-card leaderboard-card">
            <h3>Global Leaderboard</h3>
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
          <div className="sidebar-card achievements-card">
            <h3>Badges & Achievements</h3>
            <div className="badges-grid">
              {userStats.badges.map((badge, idx) => (
                <div key={idx} className="badge-item">
                  <span className="badge-icon" role="img" aria-label="badge icon">🏅</span>
                  <span className="badge-name">{badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Downloadable Portfolio Generation */}
          <div className="sidebar-card portfolio-generator">
            <h3>Generated Portfolios</h3>
            <p style={{ fontSize: '0.85rem', color: '#ccc', margin: '0 0 15px', lineHeight: '1.5' }}>
              Your completed milestones can be exported directly as JSON resumes.
            </p>
            {completedProjects.length > 0 ? (
              <div className="portfolio-list">
                {completedProjects.map((p, idx) => (
                  <div key={idx} className="portfolio-item-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ color: '#fff' }}>{p.title}</strong>
                      <span className="tech-badge">{p.tech}</span>
                    </div>
                    <p style={{ margin: '8px 0', fontSize: '0.8rem', color: '#aaa', lineHeight: '1.4' }}>{p.description}</p>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                      <a href={p.demoLink} target="_blank" rel="noreferrer" className="action-link">Live Demo</a>
                      <a href={p.repoLink} target="_blank" rel="noreferrer" className="action-link">GitHub</a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-portfolio-state">
                <span className="empty-icon" role="img" aria-label="Encouraging icon">🚀</span>
                <p>Your first project will appear here once completed!</p>
              </div>
            )}
            {completedProjects.length > 0 && (
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
            )}
          </div>
        </div>
      </div>
    </StyledDashboard>
  );
};

const StyledDashboard = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'system-ui', sans-serif;
  color: #fff;

  .stats-banner {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 25px;
    margin-bottom: 50px; /* Added more padding between stats banner and educational paths */
  }

  .stat-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(12px);
    border-radius: 12px;
    padding: 24px 20px;
    display: flex;
    align-items: center;
    gap: 18px;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.25);
    transition: transform 0.2s ease;
  }

  .stat-card:hover {
    transform: translateY(-2px);
  }

  .stat-card .emoji {
    font-size: 2.4rem;
  }

  .stat-text h4 {
    margin: 0 0 4px 0;
    font-size: 1.35rem;
    font-weight: 800;
    color: #fff; /* High contrast text */
  }

  .stat-text p {
    margin: 0;
    font-size: 0.85rem;
    color: #ccc; /* High contrast label */
    font-weight: 500;
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

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 15px;
  }

  .search-wrapper {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 2px 15px;
    width: 320px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .search-icon {
    margin-right: 8px;
    font-size: 0.9rem;
    color: #888;
  }

  .search-input {
    background: none;
    border: none;
    color: white;
    outline: none;
    width: 100%;
    font-size: 0.9rem;
    padding: 10px 0;
  }

  .path-groups-tabs {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding-bottom: 5px;
  }

  .path-group-tab {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: #ccc;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s ease;
  }

  .path-group-tab:hover, .path-group-tab.active {
    background: linear-gradient(135deg, #00d2ff, #af40ff);
    color: #000;
    border-color: transparent;
  }

  .tech-selectors-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 12px;
    background: rgba(0, 0, 0, 0.3);
    padding: 20px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  .tech-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
    color: #fff;
    padding: 12px;
    border-radius: 8px;
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
    box-shadow: 0 4px 15px rgba(0, 210, 255, 0.15);
  }

  .tech-details-card {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 30px;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
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
    font-size: 3.2rem;
  }

  .tech-meta h3 {
    margin: 0 0 6px 0;
    font-size: 1.85rem;
    font-weight: 800;
  }

  .description-text {
    margin: 0;
    color: #ccc;
    font-size: 1rem;
    line-height: 1.5;
  }

  .levels-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    gap: 24px;
  }

  .level-column h4 {
    border-bottom: 2px solid rgba(255, 255, 255, 0.08);
    padding-bottom: 12px;
    margin-top: 0;
    font-size: 1.15rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: #00d2ff;
  }

  .projects-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .project-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 12px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .project-card h5 {
    margin: 0 0 10px 0;
    font-size: 1.1rem;
    color: #fff;
    font-weight: 700;
  }

  .project-card p {
    margin: 0 0 15px 0;
    font-size: 0.85rem;
    color: #aaa;
    line-height: 1.5;
  }

  /* Progress Bar styling */
  .progress-meter-container {
    margin-bottom: 15px;
  }

  .progress-labels {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    color: #888;
    margin-bottom: 4px;
    font-weight: 600;
  }

  .progress-track-bg {
    width: 100%;
    height: 6px;
    background: rgba(255, 255, 255, 0.06);
    border-radius: 3px;
    overflow: hidden;
  }

  .progress-fill-bar {
    height: 100%;
    background: linear-gradient(90deg, #00d2ff, #af40ff);
    border-radius: 3px;
  }

  .milestones-progress {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    font-size: 0.8rem;
    margin-bottom: 15px;
  }

  .milestones-label {
    color: #888;
    font-weight: 500;
  }

  .milestones-steps {
    display: flex;
    gap: 6px;
  }

  .milestone-dot {
    width: 26px;
    height: 26px;
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
    background: rgba(0, 210, 255, 0.15);
    border: 1px solid #00d2ff;
    color: #00d2ff;
  }

  .milestone-dot.locked {
    background: rgba(255, 255, 255, 0.05);
    color: #555;
    cursor: not-allowed;
  }

  .start-project-btn {
    width: 100%;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #fff;
    padding: 10px;
    border-radius: 6px;
    font-weight: 700;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s ease;
    height: auto;
    position: static;
    transform: none;
    box-shadow: none;
  }

  .start-project-btn:hover {
    background: linear-gradient(135deg, #00d2ff, #af40ff);
    color: #000;
    border-color: transparent;
  }

  /* Unifying sidebar containers with same styling as main pathway blocks */
  .gamification-sidebar {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .sidebar-card {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 16px; /* Unified border radius */
    padding: 25px;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35); /* Unified shadows */
  }

  .sidebar-card h3 {
    margin-top: 0;
    font-size: 1.2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding-bottom: 12px;
    margin-bottom: 18px;
    font-weight: 700;
    letter-spacing: 0.5px;
  }

  .leaderboard-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .leaderboard-item {
    display: flex;
    justify-content: space-between;
    padding: 10px 14px;
    border-radius: 8px;
    font-size: 0.9rem;
    background: rgba(255, 255, 255, 0.01);
    border: 1px solid rgba(255, 255, 255, 0.03);
  }

  /* Highlight Admin Row Row visual glow */
  .leaderboard-item.highlighted {
    background: rgba(0, 210, 255, 0.1);
    border: 1.5px solid #00d2ff;
    box-shadow: 0 0 15px rgba(0, 210, 255, 0.25);
    font-weight: bold;
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
    gap: 12px;
  }

  .badge-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    padding: 12px;
    text-align: center;
  }

  .badge-icon {
    font-size: 1.85rem;
    margin-bottom: 6px;
  }

  .badge-name {
    font-size: 0.75rem;
    color: #ccc;
    font-weight: 500;
  }

  /* Empty state */
  .empty-portfolio-state {
    padding: 30px 10px;
    text-align: center;
    border: 1px dashed rgba(255, 255, 255, 0.15);
    border-radius: 8px;
    margin-bottom: 15px;
  }

  .empty-portfolio-state .empty-icon {
    font-size: 2.2rem;
    display: block;
    margin-bottom: 10px;
  }

  .empty-portfolio-state p {
    margin: 0;
    font-size: 0.85rem;
    color: #aaa;
    line-height: 1.4;
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
    font-weight: 600;
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
