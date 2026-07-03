import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const { user, login, addToast } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const mockStudents = [
    { id: 1, name: 'Alice Dev', email: 'alice@gmail.com', enrolled: ['html-calculator'], completed: ['html-calculator'], xp: 5400 },
    { id: 2, name: 'Bob Stack', email: 'bob@gmail.com', enrolled: ['html-calculator'], completed: [], xp: 4800 }
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
        <div className="auth-card">
          <h2>Instructor Admin Login</h2>
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
      <h1 className="admin-title">Instructor Console</h1>

      <div className="admin-grid">
        <div className="left-pane">
          <div className="admin-card">
            <h3>System Statistics</h3>
            <div className="stats-row">
              <div className="stat-item">
                <span className="value">{mockStudents.length}</span>
                <span className="label">Registered Students</span>
              </div>
              <div className="stat-item">
                <span className="value">1</span>
                <span className="label">Certificates Claimed</span>
              </div>
              <div className="stat-item">
                <span className="value">10</span>
                <span className="label">Curriculum Projects</span>
              </div>
            </div>
          </div>

          <div className="admin-card">
            <h3>Registered Student Directory</h3>
            <div className="student-list">
              {mockStudents.map(student => (
                <div key={student.id} className="student-row">
                  <div>
                    <strong>{student.name}</strong>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#888' }}>{student.email}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className="xp-label">{student.xp} XP</span>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.75rem', color: '#aaa' }}>
                      Enrolled: {student.enrolled.length} | Completed: {student.completed.length}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="right-pane">
          <div className="admin-card">
            <h3>System Settings</h3>
            <p style={{ fontSize: '0.85rem', color: '#aaa', lineHeight: '1.4', marginBottom: '15px' }}>
              You are logged in with authority credentials. Manage courses, databases, and configuration settings.
            </p>
            <button 
              className="admin-btn"
              onClick={() => { addToast('Seeded databases updated successfully.', 'success'); }}
              style={{ width: '100%', marginBottom: '10px' }}
            >
              Force Seed Curriculum
            </button>
            <button 
              className="admin-btn secondary"
              onClick={() => navigate('/dashboard')}
              style={{ width: '100%' }}
            >
              Go to Student Dashboard
            </button>
          </div>
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
  background: ${props => props.themeMode === 'dark' ? '#09090c' : '#f9f9fb'};
  color: ${props => props.themeMode === 'dark' ? '#fff' : '#000'};

  .auth-card {
    width: 360px;
    background: ${props => props.themeMode === 'dark' ? 'rgba(255,255,255,0.03)' : '#fff'};
    border: 1px solid ${props => props.themeMode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'};
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }

  .auth-card h2 {
    margin-top: 0;
    font-size: 1.4rem;
    font-weight: 800;
  }

  .auth-card p {
    font-size: 0.85rem;
    color: #888;
    line-height: 1.4;
    margin-bottom: 20px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 0.85rem;
  }

  .form-group label {
    font-weight: 600;
  }

  .form-group input {
    background: ${props => props.themeMode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#fff'};
    border: 1px solid ${props => props.themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0,0,0,0.15)'};
    color: ${props => props.themeMode === 'dark' ? '#fff' : '#000'};
    padding: 10px;
    border-radius: 4px;
    outline: none;
  }

  .login-btn {
    width: 100%;
    margin-top: 20px;
    background-image: linear-gradient(135deg, #6366f1, #4f46e5);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 12px;
    font-weight: bold;
    cursor: pointer;
    font-size: 0.85rem;
    position: static;
    transform: none;
    height: auto;
    min-width: auto;
    box-shadow: none;
  }
`;

const StyledDashboard = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  color: ${props => props.themeMode === 'dark' ? '#fff' : '#000'};
  font-family: system-ui, sans-serif;
  min-height: 80vh;

  .admin-title {
    font-size: 2.2rem;
    font-weight: 800;
    background: linear-gradient(135deg, #6366f1, #00d2ff);
    WebkitBackgroundClip: text;
    WebkitTextFillColor: transparent;
    margin-bottom: 35px;
  }

  .admin-grid {
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 30px;
  }

  @media (max-width: 992px) {
    .admin-grid {
      grid-template-columns: 1fr;
    }
  }

  .admin-card {
    background: ${props => props.themeMode === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0,0,0,0.02)'};
    border: 1px solid ${props => props.themeMode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.08)'};
    border-radius: 12px;
    padding: 25px;
    margin-bottom: 30px;
  }

  .admin-card h3 {
    margin-top: 0;
    font-size: 1.25rem;
    border-bottom: 1px solid ${props => props.themeMode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0,0,0,0.08)'};
    padding-bottom: 12px;
    margin-bottom: 20px;
  }

  .stats-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
  }

  .stat-item {
    background: ${props => props.themeMode === 'dark' ? 'rgba(255, 255, 255, 0.01)' : 'rgba(0,0,0,0.01)'};
    border: 1px solid ${props => props.themeMode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0,0,0,0.05)'};
    border-radius: 8px;
    padding: 15px;
    text-align: center;
  }

  .stat-item .value {
    display: block;
    font-size: 1.75rem;
    font-weight: 800;
    color: #6366f1;
    margin-bottom: 5px;
  }

  .stat-item .label {
    font-size: 0.75rem;
    color: #aaa;
  }

  .student-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .student-row {
    background: ${props => props.themeMode === 'dark' ? 'rgba(255, 255, 255, 0.01)' : '#fff'};
    border: 1px solid ${props => props.themeMode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0,0,0,0.08)'};
    border-radius: 6px;
    padding: 12px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .xp-label {
    font-weight: bold;
    color: #6366f1;
  }

  .admin-btn {
    background-image: linear-gradient(135deg, #6366f1, #4f46e5);
    color: white;
    border: none;
    border-radius: 6px;
    padding: 12px;
    font-weight: bold;
    cursor: pointer;
    font-size: 0.85rem;
    position: static;
    transform: none;
    height: auto;
    min-width: auto;
    box-shadow: none;
  }

  .admin-btn.secondary {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: ${props => props.themeMode === 'dark' ? '#fff' : '#000'};
  }
`;

export default Admin;
