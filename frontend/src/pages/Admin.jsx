import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { PROJECTS_CURRICULUM } from '../data/curriculumData';

const Admin = () => {
  const { user, login, addToast } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('users');

  const mockStudents = [
    { id: 1, name: 'Alice Dev', email: 'alice@gmail.com', enrolled: ['html-calculator', 'css-styling'], completed: ['html-calculator'], xp: 5400 },
    { id: 2, name: 'Bob Coder', email: 'bob@gmail.com', enrolled: ['html-calculator'], completed: [], xp: 4800 },
    { id: 3, name: 'Dave Stack', email: 'dave@gmail.com', enrolled: [], completed: [], xp: 2100 }
  ];

  const mockClaims = [
    { id: 1, name: 'Alice Dev', course: 'HTML', date: '2026-07-01', status: 'Approved' },
    { id: 2, name: 'Bob Coder', course: 'CSS', date: '2026-07-02', status: 'Pending' }
  ];

  const handleAdminSignIn = (e) => {
    e.preventDefault();
    const result = login(email, password);
    if (result.success && result.isAdmin) {
      addToast('Admin dashboard unlocked.', 'success');
    } else {
      addToast('Invalid admin credentials. Access Denied.', 'warning');
    }
  };

  const isAdminAuthenticated = user && user.role === 'admin';

  if (!isAdminAuthenticated) {
    return (
      <StyledAuth themeMode={theme}>
        <div className="auth-card glass-panel">
          <h2>Instructor Admin Console</h2>
          <p>Please enter your instructor credentials to view system analytics.</p>
          <form onSubmit={handleAdminSignIn}>
            <div className="form-group">
              <label>Admin Email</label>
              <input 
                type="email" 
                required 
                placeholder="mailadmin@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group" style={{ marginTop: '15px' }}>
              <label>Password</label>
              <input 
                type="password" 
                required 
                placeholder="•••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="login-btn">Unlock Console</button>
          </form>
        </div>
      </StyledAuth>
    );
  }

  return (
    <StyledDashboard themeMode={theme}>
      <h1 className="admin-title">Instructor Admin Console</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Configure learning tracks, manage credentials, and view system metrics.</p>

      {/* Stats Cards */}
      <div className="stats-row">
        <div className="stat-item glass-panel">
          <span className="value">{mockStudents.length}</span>
          <span className="label">Registered Students</span>
        </div>
        <div className="stat-item glass-panel">
          <span className="value">16</span>
          <span className="label">Curriculum Tracks</span>
        </div>
        <div className="stat-item glass-panel">
          <span className="value">{PROJECTS_CURRICULUM.length}</span>
          <span className="label">Milestone Projects</span>
        </div>
        <div className="stat-item glass-panel">
          <span className="value">2</span>
          <span className="label">Certificates Issued</span>
        </div>
      </div>

      {/* Main split view */}
      <div className="admin-layout">
        
        {/* Left tabs menu */}
        <div className="sidebar glass-panel">
          <button className={`tab-link ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
            👥 Students Directory
          </button>
          <button className={`tab-link ${activeTab === 'curriculum' ? 'active' : ''}`} onClick={() => setActiveTab('curriculum')}>
            📚 Curriculum roadmaps
          </button>
          <button className={`tab-link ${activeTab === 'certificates' ? 'active' : ''}`} onClick={() => setActiveTab('certificates')}>
            🎓 Certificates claims
          </button>
        </div>

        {/* Center content panel */}
        <div className="content-panel glass-panel">
          
          {activeTab === 'users' && (
            <div>
              <h3>Student Directory</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>Manage user access levels and view student progress details.</p>
              
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '12px' }}>Name</th>
                    <th style={{ padding: '12px' }}>Email</th>
                    <th style={{ padding: '12px' }}>XP Level</th>
                    <th style={{ padding: '12px' }}>Enrollments</th>
                    <th style={{ padding: '12px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockStudents.map(student => (
                    <tr key={student.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px', fontWeight: 'bold' }}>{student.name}</td>
                      <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{student.email}</td>
                      <td style={{ padding: '12px', color: 'var(--primary)', fontWeight: 'bold' }}>{student.xp} XP</td>
                      <td style={{ padding: '12px' }}>{student.enrolled.length} active</td>
                      <td style={{ padding: '12px' }}>
                        <button 
                          onClick={() => addToast(`Simulated resetting password for ${student.name}`, 'info')}
                          style={{ background: 'none', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '4px', padding: '4px 10px', fontSize: '0.8rem', cursor: 'pointer' }}
                        >
                          Reset Pass
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'curriculum' && (
            <div>
              <h3>Curriculum roadmaps</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>Configure syllabus structures, instructions starter code, and milestones.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {PROJECTS_CURRICULUM.map(proj => (
                  <div key={proj.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-color)', padding: '15px 20px', borderRadius: '8px' }}>
                    <div>
                      <strong>{proj.title}</strong>
                      <span style={{ fontSize: '0.75rem', background: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4', padding: '2px 8px', borderRadius: '4px', marginLeft: '10px', fontWeight: 'bold' }}>{proj.technology}</span>
                    </div>
                    <button 
                      onClick={() => addToast(`Editing is locked in simulation mode.`, 'warning')}
                      style={{ background: 'none', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '4px', padding: '6px 12px', fontSize: '0.8rem', cursor: 'pointer' }}
                    >
                      Configure
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'certificates' && (
            <div>
              <h3>Certificate Claims</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>Approve or reject verified syllabus completion certificate requests.</p>
              
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '12px' }}>Student</th>
                    <th style={{ padding: '12px' }}>Curriculum Path</th>
                    <th style={{ padding: '12px' }}>Request Date</th>
                    <th style={{ padding: '12px' }}>Status</th>
                    <th style={{ padding: '12px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockClaims.map(claim => (
                    <tr key={claim.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '12px', fontWeight: 'bold' }}>{claim.name}</td>
                      <td style={{ padding: '12px' }}>{claim.course}</td>
                      <td style={{ padding: '12px', color: 'var(--text-muted)' }}>{claim.date}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{ color: claim.status === 'Approved' ? '#10ac84' : '#f59e0b', fontWeight: 'bold' }}>
                          ● {claim.status}
                        </span>
                      </td>
                      <td style={{ padding: '12px' }}>
                        {claim.status === 'Pending' ? (
                          <button 
                            onClick={() => addToast(`Certificate request approved.`, 'success')}
                            style={{ background: '#10ac84', border: 'none', color: '#fff', borderRadius: '4px', padding: '4px 10px', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 'bold' }}
                          >
                            Approve
                          </button>
                        ) : (
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>No action required</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </StyledDashboard>
  );
};

const StyledAuth = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  color: ${props => props.themeMode === 'dark' ? '#fff' : '#000'};

  .auth-card {
    width: 380px;
    padding: 40px 30px;
    border-radius: 16px;
    box-shadow: var(--glass-shadow);
  }

  .auth-card h2 {
    font-size: 1.6rem;
    font-weight: 800;
    margin-bottom: 8px;
    text-align: center;
  }

  .auth-card p {
    font-size: 0.85rem;
    color: var(--text-muted);
    text-align: center;
    line-height: 1.5;
    margin-bottom: 25px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 0.85rem;
  }

  .form-group label {
    font-weight: bold;
  }

  .login-btn {
    width: 100%;
    margin-top: 20px;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 8px;
    padding: 12px;
    font-weight: bold;
    cursor: pointer;
    font-size: 0.9rem;
    box-shadow: 0 4px 12px var(--primary-glow);
  }
`;

const StyledDashboard = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 85vh;
  
  --text-muted: ${props => props.themeMode === 'dark' ? '#a1a1aa' : '#71717a'};

  .admin-title {
    font-size: 2.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, #00d2ff, #af40ff);
    WebkitBackgroundClip: text;
    WebkitTextFillColor: transparent;
    margin-bottom: 8px;
  }

  .stats-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
  }

  .stat-item {
    padding: 24px;
    border-radius: 12px;
    text-align: center;
  }

  .stat-item .value {
    display: block;
    font-size: 2.2rem;
    font-weight: 900;
    color: var(--primary);
    margin-bottom: 4px;
  }

  .stat-item .label {
    font-size: 0.85rem;
    color: var(--text-muted);
    font-weight: 600;
  }

  .admin-layout {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 30px;
  }

  @media (max-width: 992px) {
    .admin-layout {
      grid-template-columns: 1fr;
    }
  }

  .sidebar {
    padding: 20px;
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: fit-content;
  }

  .tab-link {
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    padding: 12px 16px;
    border-radius: 8px;
    color: var(--text-muted);
    font-weight: bold;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s ease;
    outline: none;
  }

  .tab-link.active {
    background: rgba(99, 102, 241, 0.1);
    color: #fff;
    border-left: 3px solid var(--primary);
  }

  .tab-link:hover:not(.active) {
    background: rgba(255,255,255,0.02);
  }

  .content-panel {
    padding: 30px;
    border-radius: 16px;
  }

  .content-panel h3 {
    font-size: 1.4rem;
    font-weight: 800;
    margin-bottom: 6px;
  }
`;

export default Admin;
