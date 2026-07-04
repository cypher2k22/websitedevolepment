import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { PROJECTS_CURRICULUM } from '../data/curriculumData';

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user, addToast } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const [bio, setBio] = useState('Fullstack developer building modern visual web experiences.');
  const [github, setGithub] = useState('https://github.com/developer');
  const [linkedin, setLinkedin] = useState('https://linkedin.com/in/developer');
  const [portfolio, setPortfolio] = useState('https://portfolio.io');
  const [isEditing, setIsEditing] = useState(false);

  const isOwner = user && user.name.toLowerCase() === username.toLowerCase();

  const handleProfileSave = (e) => {
    e.preventDefault();
    setIsEditing(false);
    addToast('Developer profile updated successfully!', 'success');
  };

  // Determine completed projects for profile
  const completedIds = user?.completedProjects || [];
  const completedProjects = PROJECTS_CURRICULUM.filter(p => completedIds.includes(p.id));

  return (
    <StyledProfile themeMode={theme}>
      <div className="profile-layout">
        
        {/* Left card */}
        <div className="left-panel glass-panel">
          <div className="avatar">👤</div>
          <h2>{username}</h2>
          <span className="role-badge">Student Developer</span>

          <div className="stats-box">
            <div className="stat-item">
              <strong>{user?.xp || 250}</strong>
              <span>Total XP</span>
            </div>
            <div className="stat-item">
              <strong>{user?.level || 2}</strong>
              <span>Level</span>
            </div>
            <div className="stat-item">
              <strong>{user?.streak || 5}</strong>
              <span>Streak</span>
            </div>
          </div>

          <div style={{ marginTop: '20px', width: '100%' }}>
            {isEditing ? (
              <form onSubmit={handleProfileSave} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div className="form-group">
                  <label>Bio</label>
                  <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>GitHub Link</label>
                  <input type="text" value={github} onChange={(e) => setGithub(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>LinkedIn Link</label>
                  <input type="text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Portfolio URL</label>
                  <input type="text" value={portfolio} onChange={(e) => setPortfolio(e.target.value)} />
                </div>
                <button type="submit" className="save-btn">Save Changes</button>
              </form>
            ) : (
              <div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '20px', textAlign: 'center' }}>"{bio}"</p>
                <div className="social-links">
                  <a href={github} target="_blank" rel="noreferrer">🐙 GitHub</a>
                  <a href={linkedin} target="_blank" rel="noreferrer">💼 LinkedIn</a>
                  <a href={portfolio} target="_blank" rel="noreferrer">🌐 Portfolio</a>
                </div>
                {isOwner && (
                  <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right card */}
        <div className="right-panel">
          
          {/* Skills tags */}
          <div className="section-card glass-panel">
            <h3>Skills & Technologies</h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '15px' }}>
              {['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'SQL', 'FastAPI'].map(skill => (
                <span key={skill} style={{ background: 'rgba(99, 102, 241, 0.12)', color: '#818cf8', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Earned Certifications */}
          <div className="section-card glass-panel">
            <h3>Claimed Certifications</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
              {user?.certificates && user.certificates.length > 0 ? (
                user.certificates.map(cert => (
                  <div key={cert} style={{ background: 'rgba(16, 172, 132, 0.05)', border: '1px solid rgba(16, 172, 132, 0.2)', padding: '15px 20px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span>🎓</span>
                    <div>
                      <strong>{cert} Development Certification</strong>
                      <p style={{ margin: '2px 0 0 0', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Verified completion of curriculum syllabus milestones.</p>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No certifications claimed yet. Complete curriculum paths to unlock.</p>
              )}
            </div>
          </div>

          {/* Completed Milestones */}
          <div className="section-card glass-panel">
            <h3>Completed Project Repositories</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
              {completedProjects.length > 0 ? (
                completedProjects.map(proj => (
                  <div key={proj.id} style={{ border: '1px solid var(--border-color)', borderRadius: '10px', padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <strong style={{ fontSize: '1.05rem', display: 'block', marginBottom: '4px' }}>{proj.title}</strong>
                      <span style={{ fontSize: '0.75rem', background: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>{proj.technology}</span>
                    </div>
                    <span style={{ color: '#10ac84', fontWeight: 'bold', fontSize: '0.9rem' }}>✓ Completed</span>
                  </div>
                ))
              ) : (
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No completed repositories found.</p>
              )}
            </div>
          </div>

        </div>

      </div>
    </StyledProfile>
  );
};

const StyledProfile = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 85vh;
  font-family: system-ui, sans-serif;
  
  --text-muted: ${props => props.themeMode === 'dark' ? '#a1a1aa' : '#71717a'};

  .profile-layout {
    display: grid;
    grid-template-columns: 340px 1fr;
    gap: 30px;
  }

  @media (max-width: 992px) {
    .profile-layout {
      grid-template-columns: 1fr;
    }
  }

  .left-panel {
    padding: 30px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: fit-content;
  }

  .avatar {
    font-size: 3.5rem;
    background: rgba(255,255,255,0.05);
    width: 90px;
    height: 90px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }

  .role-badge {
    background: rgba(99, 102, 241, 0.15);
    color: #818cf8;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: bold;
    margin: 8px 0 20px;
  }

  .stats-box {
    display: flex;
    justify-content: space-around;
    width: 100%;
    background: rgba(255,255,255,0.02);
    border: 1px solid var(--border-color);
    padding: 15px 10px;
    border-radius: 10px;
  }

  .stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .stat-item strong {
    font-size: 1.1rem;
  }

  .stat-item span {
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  .social-links {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
  }

  .social-links a {
    color: var(--primary);
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .edit-btn, .save-btn {
    width: 100%;
    background: var(--primary);
    border: none;
    color: #fff;
    font-weight: bold;
    padding: 10px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.85rem;
  }

  .right-panel {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .section-card {
    padding: 30px;
    border-radius: 16px;
  }

  .section-card h3 {
    font-size: 1.25rem;
    font-weight: 800;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
    font-size: 0.85rem;
  }

  .form-group label {
    font-weight: bold;
  }
`;

export default Profile;
