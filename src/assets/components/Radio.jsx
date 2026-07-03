import React, { useState } from 'react';
import styled from 'styled-components';

const Radio = () => {
  const [activeTab, setActiveTab] = useState('Home');

  // Logs simulation data
  const logs = [
    { time: '14:59:17', event: 'SYSTEM', msg: 'System check complete. Backend API reachable.' },
    { time: '14:59:20', event: 'DATABASE', msg: 'Connected successfully to dev database instance.' },
    { time: '15:00:01', event: 'GATEWAY', msg: 'Gate controller successfully handshaked with route /gate/status.' },
    { time: '15:00:15', event: 'USER', msg: 'Student John Doe requested dashboard load.' },
    { time: '15:00:26', event: 'INFO', msg: 'Vite React development server hot reloading active.' }
  ];

  return (
    <StyledWrapper>
      <div className="cs2-printstream-ui">
        <div className="dashboard-container">
          {/* Sidebar Tabs */}
          <div className="sidebar">
            <button 
              className={`vtab ${activeTab === 'Home' ? 'active' : ''}`}
              onClick={() => setActiveTab('Home')}
            >
              Home
              <span className="debris" />
              <span className="debris" />
              <span className="debris" />
            </button>
            <button 
              className={`vtab ${activeTab === 'Settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('Settings')}
            >
              Settings
              <span className="debris" />
              <span className="debris" />
            </button>
            <button 
              className={`vtab ${activeTab === 'Profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('Profile')}
            >
              Profile
              <span className="debris" />
              <span className="debris" />
              <span className="debris" />
            </button>
            <button 
              className={`vtab ${activeTab === 'Logs' ? 'active' : ''}`}
              onClick={() => setActiveTab('Logs')}
            >
              Logs
              <span className="debris" />
            </button>
          </div>

          {/* Main Content Area */}
          <div className="content-panel">
            {activeTab === 'Home' && (
              <div className="tab-content fade-in">
                <h2>System Dashboard</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', margin: '20px 0' }}>
                  <div className="info-card">
                    <span className="card-label">Backend API Status</span>
                    <span className="card-value status-online">● ONLINE</span>
                  </div>
                  <div className="info-card">
                    <span className="card-label">Gate Controller</span>
                    <span className="card-value status-online">● ACTIVE</span>
                  </div>
                  <div className="info-card">
                    <span className="card-label">Curriculum Version</span>
                    <span className="card-value">v2.4.1</span>
                  </div>
                </div>
                <h3>Welcome back, Admin</h3>
                <p style={{ color: '#aaa', lineHeight: '1.6' }}>
                  You have full administrative control over the Intelligate-System backend and educational curricula. Use the sidebar tabs to view server outputs or configure parameters.
                </p>
              </div>
            )}

            {activeTab === 'Settings' && (
              <div className="tab-content fade-in">
                <h2>System Settings</h2>
                <form onSubmit={(e) => { e.preventDefault(); alert('Settings saved successfully!'); }} className="settings-form">
                  <div className="form-group">
                    <label>Base API Endpoint</label>
                    <input type="text" defaultValue="http://localhost:8000/api/v1" />
                  </div>
                  <div className="form-group">
                    <label>Gate Keep-Alive Timeout (seconds)</label>
                    <input type="number" defaultValue="30" />
                  </div>
                  <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                    <input type="checkbox" id="logging-enabled" defaultChecked />
                    <label htmlFor="logging-enabled">Enable verbose system logs output</label>
                  </div>
                  <button type="submit" className="save-btn">Save Configurations</button>
                </form>
              </div>
            )}

            {activeTab === 'Profile' && (
              <div className="tab-content fade-in">
                <h2>Administrative Profile</h2>
                <div className="profile-details">
                  <div className="profile-avatar">👨‍💻</div>
                  <div>
                    <h3 style={{ margin: '0 0 5px 0' }}>Senior Admin Engineer</h3>
                    <p style={{ color: '#00d2ff', margin: '0 0 15px 0', fontSize: '0.9rem', fontWeight: '600' }}>Superuser Authority</p>
                    <p style={{ color: '#aaa', margin: 0, fontSize: '0.85rem' }}>Registered Email: admin@fullstack.io</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'Logs' && (
              <div className="tab-content fade-in">
                <h2>System Logs Terminal</h2>
                <div className="logs-terminal">
                  {logs.map((log, idx) => (
                    <div key={idx} className="log-line">
                      <span className="log-time">[{log.time}]</span>{' '}
                      <span className={`log-event type-${log.event.toLowerCase()}`}>{log.event}</span>:{' '}
                      <span className="log-msg">{log.msg}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* ========================= */
  /* ROOT SCOPE               */
  /* ========================= */

  .cs2-printstream-ui {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    max-width: 1000px;
    margin: 40px auto;
    padding: 0 20px;
  }

  .dashboard-container {
    display: flex;
    gap: 20px;
    background: rgba(15, 15, 20, 0.7);
    backdrop-filter: blur(12px);
    border: 1px solid rgb(28, 28, 28);
    border-radius: 12px;
    overflow: hidden;
    min-height: 500px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  }

  /* ========================= */
  /* SIDEBAR                  */
  /* ========================= */

  .cs2-printstream-ui .sidebar {
    width: 200px;
    background: rgba(12, 12, 12, 0.9);
    padding: 15px;

    display: flex;
    flex-direction: column;
    gap: 8px;
    border-right: 1px solid rgb(28, 28, 28);
  }

  /* ========================= */
  /* BASE TAB                 */
  /* ========================= */

  .cs2-printstream-ui .vtab {
    position: relative;
    overflow: hidden;

    background: rgb(20, 20, 20);
    color: rgb(170, 170, 170);

    border: 1px solid rgb(35, 35, 35);
    padding: 12px 16px;
    text-align: left;

    border-radius: 4px;
    cursor: pointer;

    transition:
      transform 0.15s ease,
      border-color 0.25s ease,
      background 0.25s ease,
      color 0.25s ease;

    will-change: transform;
    width: 100%;
    height: auto;
    min-width: 0;
    right: auto;
    top: auto;
    transform: none;
    position: relative;
    box-shadow: none;
  }

  /* subtle sheen */
  .cs2-printstream-ui .vtab::before {
    content: "";
    position: absolute;
    inset: 0;

    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.04),
      transparent 55%
    );

    pointer-events: none;
  }

  /* ========================= */
  /* ACTIVE STATE             */
  /* ========================= */

  .cs2-printstream-ui .vtab.active {
    background: rgb(26, 26, 26);
    color: white;
    border-color: rgb(90, 90, 90);
  }

  /* active bar */
  .cs2-printstream-ui .vtab.active::after {
    content: "";
    position: absolute;
    left: 0;
    top: 6px;
    bottom: 6px;
    width: 3px;
    background: rgb(180, 180, 180);
  }

  /* ========================= */
  /* PRINTSTREAM HOVER        */
  /* ========================= */

  .cs2-printstream-ui .vtab::after {
    content: "";
    position: absolute;
    inset: -70%;

    background: conic-gradient(
      from 180deg,
      rgba(0, 255, 255, 0),
      rgba(0, 255, 255, 0.25),
      rgba(255, 0, 255, 0.25),
      rgba(0, 255, 128, 0.25),
      rgba(255, 255, 255, 0.12),
      rgba(0, 255, 255, 0)
    );

    filter: blur(16px);
    opacity: 0;
    transform: translateX(-70%) rotate(20deg);
  }

  .cs2-printstream-ui .vtab:hover::after {
    opacity: 1;
    animation: cs2-sweep 3.2s ease-in-out infinite;
  }

  @keyframes cs2-sweep {
    0% {
      transform: translateX(-70%) rotate(20deg);
    }
    50% {
      transform: translateX(0%) rotate(20deg);
    }
    100% {
      transform: translateX(70%) rotate(20deg);
    }
  }

  .cs2-printstream-ui .vtab:hover {
    color: white;
    border-color: rgb(110, 110, 110);
    background: rgb(22, 22, 22);
    transform: translateX(2px);
  }

  .cs2-printstream-ui .vtab:active {
    transform: translateX(1px) scale(0.99);
  }

  /* ========================= */
  /* DEBRIS SYSTEM            */
  /* ========================= */

  .cs2-printstream-ui .debris {
    position: absolute;
    width: 3px;
    height: 3px;

    background: rgba(220, 220, 220, 0.22);
    border-radius: 1px;

    top: 50%;
    left: -20px;

    opacity: 0;
    filter: blur(0.3px);

    animation: cs2-drift 6s linear infinite;
  }

  .cs2-printstream-ui .debris:nth-of-type(1) {
    top: 25%;
    animation-duration: 5s;
  }
  .cs2-printstream-ui .debris:nth-of-type(2) {
    top: 60%;
    animation-duration: 7s;
    opacity: 0.18;
  }
  .cs2-printstream-ui .debris:nth-of-type(3) {
    top: 80%;
    animation-duration: 6.5s;
    opacity: 0.12;
  }

  @keyframes cs2-drift {
    0% {
      transform: translateX(-20px);
      opacity: 0;
    }
    10% {
      opacity: 0.25;
    }
    50% {
      opacity: 0.2;
    }
    90% {
      opacity: 0.25;
    }
    100% {
      transform: translateX(240px);
      opacity: 0;
    }
  }

  .cs2-printstream-ui .vtab:hover .debris {
    animation-play-state: paused;
    opacity: 0;
  }

  /* ========================= */
  /* CONTENT PANEL            */
  /* ========================= */

  .content-panel {
    flex: 1;
    padding: 30px;
    color: #fff;
  }

  .tab-content h2 {
    margin-top: 0;
    font-size: 1.8rem;
    font-weight: 700;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding-bottom: 15px;
    margin-bottom: 25px;
  }

  .fade-in {
    animation: fadeIn 0.4s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Info Cards */
  .info-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .card-label {
    font-size: 0.8rem;
    color: #888;
    text-transform: uppercase;
  }

  .card-value {
    font-size: 1.1rem;
    font-weight: bold;
  }

  .status-online {
    color: #10ac84;
  }

  /* Settings Form */
  .settings-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 450px;
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

  .form-group input[type="text"],
  .form-group input[type="number"] {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.10);
    border-radius: 4px;
    padding: 10px;
    color: white;
    outline: none;
  }

  .save-btn {
    position: static;
    transform: none;
    background-image: linear-gradient(135deg, #00d2ff, #00ddeb);
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    color: white;
    cursor: pointer;
    font-weight: bold;
    width: fit-content;
    height: auto;
  }

  /* Profile Details */
  .profile-details {
    display: flex;
    align-items: center;
    gap: 25px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    padding: 25px;
  }

  .profile-avatar {
    font-size: 3.5rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Logs Terminal */
  .logs-terminal {
    background: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 6px;
    padding: 20px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.85rem;
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: 350px;
    overflow-y: auto;
  }

  .log-line {
    line-height: 1.4;
  }

  .log-time {
    color: #888;
  }

  .log-event {
    font-weight: bold;
    padding: 2px 6px;
    border-radius: 3px;
    font-size: 0.75rem;
  }

  .type-system { background: rgba(0, 210, 255, 0.2); color: #00d2ff; }
  .type-database { background: rgba(255, 159, 67, 0.2); color: #ff9f43; }
  .type-gateway { background: rgba(175, 64, 255, 0.2); color: #af40ff; }
  .type-user { background: rgba(16, 172, 132, 0.2); color: #10ac84; }
  .type-info { background: rgba(255, 255, 255, 0.15); color: #fff; }
`;

export default Radio;
