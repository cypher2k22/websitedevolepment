import React, { useState } from 'react';
import styled from 'styled-components';

const AdminPanel = () => {
  const [courses, setCourses] = useState([
    { id: 1, title: 'HTML Boilerplates', lessons: 5, status: 'Published' },
    { id: 2, title: 'CSS Grid layouts', lessons: 8, status: 'Draft' }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [aiSystemPrompt, setAiSystemPrompt] = useState(
    'You are an expert fullstack mentor. Give hints. Never reveal code answers directly.'
  );

  const handleCreateCourse = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setCourses([...courses, { id: courses.length + 1, title: newTitle, lessons: 0, status: 'Draft' }]);
    setNewTitle('');
  };

  return (
    <StyledAdmin>
      <h1 className="admin-title">Instructor Console & Management</h1>
      
      <div className="admin-grid">
        {/* Left Column: Analytics and Course Editor */}
        <div className="left-panel">
          
          {/* Analytics Card */}
          <div className="admin-card">
            <h3>Analytics Overview</h3>
            <div className="stats-row">
              <div className="stat-item">
                <span className="value">1,420</span>
                <span className="label">Enrolled Students</span>
              </div>
              <div className="stat-item">
                <span className="value">345</span>
                <span className="label">Certificates Issued</span>
              </div>
              <div className="stat-item">
                <span className="value">98.4%</span>
                <span className="label">Completion Rate</span>
              </div>
            </div>
          </div>

          {/* Curriculum Builder Form */}
          <div className="admin-card">
            <h3>Create New Course Pathway</h3>
            <form onSubmit={handleCreateCourse} className="create-form">
              <div className="form-group">
                <label>Course Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Advanced Docker Orchestrations"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>
              <button type="submit" className="admin-btn">Add Course</button>
            </form>

            <h4 style={{ marginTop: '20px', marginBottom: '10px' }}>Active Courses</h4>
            <div className="courses-table">
              {courses.map(c => (
                <div key={c.id} className="course-row">
                  <span>{c.title}</span>
                  <span className="badge">{c.lessons} Lessons</span>
                  <span className={`status ${c.status.toLowerCase()}`}>{c.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI prompt management */}
        <div className="right-panel">
          <div className="admin-card">
            <h3>AI Mentor Prompt Configuration</h3>
            <p style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '15px' }}>
              Configure the default System Instructions that influence how the AI chatbot interacts with students in the Workspace panel.
            </p>
            <div className="form-group">
              <label>System Prompt Instruction</label>
              <textarea 
                value={aiSystemPrompt}
                onChange={(e) => setAiSystemPrompt(e.target.value)}
                style={{
                  height: '140px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '4px',
                  padding: '12px',
                  color: 'white',
                  outline: 'none',
                  fontSize: '0.9rem',
                  resize: 'none',
                  fontFamily: 'monospace'
                }}
              />
            </div>
            <button 
              className="admin-btn"
              onClick={() => alert('AI System Instructions updated successfully!')}
              style={{ marginTop: '15px' }}
            >
              Update AI Mentor Prompt
            </button>
          </div>
        </div>
      </div>
    </StyledAdmin>
  );
};

const StyledAdmin = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  color: #fff;
  font-family: system-ui, sans-serif;

  .admin-title {
    font-size: 2.2rem;
    font-weight: 800;
    background: linear-gradient(135deg, #00d2ff, #af40ff);
    WebkitBackgroundClip: text;
    WebkitTextFillColor: transparent;
    margin-bottom: 35px;
  }

  .admin-grid {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 30px;
  }

  @media (max-width: 992px) {
    .admin-grid {
      grid-template-columns: 1fr;
    }
  }

  .admin-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 25px;
    margin-bottom: 30px;
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
  }

  .admin-card h3 {
    margin-top: 0;
    font-size: 1.25rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding-bottom: 12px;
    margin-bottom: 20px;
  }

  .stats-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
  }

  .stat-item {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    padding: 15px;
    text-align: center;
  }

  .stat-item .value {
    display: block;
    font-size: 1.75rem;
    font-weight: 800;
    color: #00d2ff;
    margin-bottom: 5px;
  }

  .stat-item .label {
    font-size: 0.75rem;
    color: #aaa;
  }

  /* Form & Table */
  .create-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .form-group label {
    font-size: 0.85rem;
    color: #aaa;
  }

  .form-group input {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    padding: 10px;
    color: white;
    outline: none;
    font-size: 0.95rem;
  }

  .admin-btn {
    background-image: linear-gradient(135deg, #00d2ff, #00ddeb);
    color: #000;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    font-weight: bold;
    cursor: pointer;
    width: fit-content;
    height: auto;
    position: static;
    transform: none;
    box-shadow: none;
  }

  .courses-table {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .course-row {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 6px;
    padding: 12px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
  }

  .badge {
    background: rgba(255, 255, 255, 0.08);
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
  }

  .status {
    font-size: 0.75rem;
    font-weight: bold;
    text-transform: uppercase;
  }

  .status.published { color: #10ac84; }
  .status.draft { color: #ff9f43; }
`;

export default AdminPanel;
