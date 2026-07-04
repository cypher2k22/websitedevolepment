import React, { useState, useEffect, useContext } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { PROJECTS_CURRICULUM } from '../data/curriculumData';

const Workspace = () => {
  const { tech, projectId, milestoneId } = useParams();
  const navigate = useNavigate();
  const { user, updateProjectProgress, addToast } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (!user) {
      addToast('Authentication required. Redirecting to login.', 'info');
      navigate('/login');
    }
  }, [user, navigate, addToast]);

  const project = PROJECTS_CURRICULUM.find(p => p.id === projectId) || PROJECTS_CURRICULUM[0];
  const milestoneIndex = project?.milestones?.findIndex(m => m.id === milestoneId) ?? 0;
  const milestone = project?.milestones?.[milestoneIndex] || { title: 'Workspace Setup', desc: 'Environment initialization.' };

  const [files, setFiles] = useState({
    'index.html': '',
    'styles.css': '',
    'script.js': ''
  });

  const [activeFile, setActiveFile] = useState('index.html');
  const [codeValue, setCodeValue] = useState('');
  const [consoleLogs, setConsoleLogs] = useState(['Container virtual thread spinning up...', 'Local file host bound to port 3000.', 'Vite Dev Server started.']);
  const [previewSrc, setPreviewSrc] = useState('');
  const [aiInput, setAiInput] = useState('');
  const [aiChat, setAiChat] = useState([]);
  const [showSolution, setShowSolution] = useState(false);
  const [checklistState, setChecklistState] = useState({});
  const [autosaveText, setAutosaveText] = useState('All changes saved');

  // Layout states
  const [leftWidth, setLeftWidth] = useState(320);
  const [rightWidth, setRightWidth] = useState(420);
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
  const [rightSubTab, setRightSubTab] = useState('preview');
  
  // Custom Execution State for neon ambient glow pulse
  const [executionStatus, setExecutionStatus] = useState('idle'); // 'idle', 'success', 'error'

  useEffect(() => {
    if (project) {
      const initialFiles = project.starterCode || {
        'index.html': '<h1>Starter Files</h1>',
        'styles.css': '',
        'script.js': ''
      };
      setFiles(initialFiles);
      setActiveFile('index.html');
      setCodeValue(initialFiles['index.html'] || '');
      setPreviewSrc(initialFiles['index.html'] || '');
      
      setAiChat([
        { sender: 'mentor', text: `Greetings! I am your AI Mentor. We are currently constructing the "${project.title}". Reach out if you get stuck on the requirements list!` }
      ]);

      const initialChecklist = {};
      if (project.requirements) {
        project.requirements.forEach(req => {
          initialChecklist[req.id] = false;
        });
      }
      setChecklistState(initialChecklist);
    }
  }, [project]);

  useEffect(() => {
    setCodeValue(files[activeFile] || '');
  }, [activeFile, files]);

  const handleEditorChange = (val) => {
    setCodeValue(val);
    setAutosaveText('Saving...');
    setFiles(prev => ({ ...prev, [activeFile]: val }));
    setTimeout(() => {
      setAutosaveText('All changes saved');
    }, 800);
  };

  const handleRunCode = () => {
    setExecutionStatus('success');
    const updatedFiles = { ...files, [activeFile]: codeValue };
    setFiles(updatedFiles);
    
    let htmlContent = updatedFiles['index.html'] || '';
    if (updatedFiles['styles.css']) {
      htmlContent = htmlContent.replace('</head>', `<style>${updatedFiles['styles.css']}</style></head>`);
    }
    if (updatedFiles['script.js']) {
      htmlContent = htmlContent.replace('</body>', `<script>
        try {
          ${updatedFiles['script.js']}
        } catch(err) {
          console.error(err.message);
        }
      </script></body>`);
    }

    setPreviewSrc(htmlContent);
    setConsoleLogs(prev => [...prev, `[Vite] Reloading page viewport...`, `[System] Compiled successfully at ${new Date().toLocaleTimeString()}`]);
    addToast('Compilation successful.', 'success');
    
    setTimeout(() => setExecutionStatus('idle'), 4000);
  };

  const handleAskMentor = (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    const userMsg = aiInput;
    setAiChat(prev => [...prev, { sender: 'student', text: userMsg }]);
    setAiInput('');

    setTimeout(() => {
      let mentorResponse = `That's a good step. Check if your selectors inside styles.css match your HTML structures.`;
      if (userMsg.toLowerCase().includes('hint')) {
        mentorResponse = `AI Mentor Hint: To clear this requirement, verify that your inputs hold unique ID selectors so that script.js binds to them smoothly.`;
      } else if (userMsg.toLowerCase().includes('solution') || userMsg.toLowerCase().includes('code')) {
        mentorResponse = `I won't write out the code for you directly. But you can check the "Solution" reference at the header as a guidance reference.`;
      }
      setAiChat(prev => [...prev, { sender: 'mentor', text: mentorResponse }]);
    }, 600);
  };

  const triggerHint = () => {
    setAiChat(prev => [...prev, { sender: 'student', text: 'Please offer me a hint for this objective.' }]);
    setTimeout(() => {
      setAiChat(prev => [...prev, { sender: 'mentor', text: `AI Mentor Hint: For this project, wrap your buttons inside a flex box layout to align them cleanly.` }]);
    }, 500);
  };

  const handleReset = () => {
    setExecutionStatus('error');
    if (window.confirm('Are you sure you want to discard your edits and reset the starter files?')) {
      const initialFiles = project.starterCode || {};
      setFiles(initialFiles);
      setCodeValue(initialFiles[activeFile] || '');
      setPreviewSrc(initialFiles['index.html'] || '');
      setConsoleLogs(prev => [...prev, '[System] Reset workspace environment.']);
    }
    setTimeout(() => setExecutionStatus('idle'), 4000);
  };

  const submitFinalProject = () => {
    const completedAll = Object.values(checklistState).some(val => val === true);
    if (!completedAll) {
      addToast('Please complete at least one requirement check before submission.', 'warning');
      return;
    }

    updateProjectProgress(project.id, 100);
    navigate('/dashboard');
  };

  const handleChecklistToggle = (reqId) => {
    setChecklistState(prev => ({
      ...prev,
      [reqId]: !prev[reqId]
    }));
  };

  // Resize Handlers
  const startResizeLeft = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = leftWidth;

    const doDrag = (moveEvent) => {
      const newWidth = startWidth + (moveEvent.clientX - startX);
      if (newWidth > 180 && newWidth < 500) {
        setLeftWidth(newWidth);
      }
    };

    const stopDrag = () => {
      document.removeEventListener('mousemove', doDrag);
      document.removeEventListener('mouseup', stopDrag);
    };

    document.addEventListener('mousemove', doDrag);
    document.addEventListener('mouseup', stopDrag);
  };

  const startResizeRight = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = rightWidth;

    const doDrag = (moveEvent) => {
      const newWidth = startWidth - (moveEvent.clientX - startX);
      if (newWidth > 200 && newWidth < 650) {
        setRightWidth(newWidth);
      }
    };

    const stopDrag = () => {
      document.removeEventListener('mousemove', doDrag);
      document.removeEventListener('mouseup', stopDrag);
    };

    document.addEventListener('mousemove', doDrag);
    document.addEventListener('mouseup', stopDrag);
  };

  if (!user) return null;

  return (
    <StyledWorkspace themeMode={theme} executionStatus={executionStatus}>
      {/* Dynamic Ambient Neon Glows */}
      <div className="ambient-background-glow glow-1" />
      <div className="ambient-background-glow glow-2" />

      {/* 1. Global Header Bar (Floating Glassmorphic Capsule) */}
      <header className="workspace-header-bar">
        <button className="nav-back-btn" onClick={() => navigate('/dashboard')}>
          <span className="icon">←</span> Dashboard
        </button>
        
        <div className="workspace-breadcrumbs">
          <span className="crumb">{project?.course}</span>
          <span className="divider">/</span>
          <span className="crumb active">{project?.title}</span>
        </div>

        <div className="autosave-indicator">{autosaveText}</div>

        <div className="header-actions">
          <button className="action-capsule-btn run" onClick={handleRunCode} title="Compile and run code">
            Run Code
          </button>
          <button className="action-capsule-btn reset" onClick={handleReset} title="Reset starter code">
            Reset
          </button>
          <button className="action-capsule-btn solution" onClick={() => setShowSolution(!showSolution)} title="Toggle solution overlay">
            Solution
          </button>
          <button className="action-capsule-btn submit" onClick={submitFinalProject} title="Submit final project">
            Submit
          </button>
        </div>
      </header>

      {/* 2. Resizable Panels Content Area */}
      <div className="workspace-panes-wrapper">
        
        {/* LEFT PANEL: Instructions */}
        <div 
          className={`pane-panel instructions-panel ${isLeftCollapsed ? 'collapsed' : ''}`}
          style={{ width: isLeftCollapsed ? 0 : `${leftWidth}px` }}
        >
          <div className="panel-header-toolbar">
            <span className="panel-label">📖 Instructions</span>
            <button 
              className="chevron-collapse-btn" 
              onClick={() => setIsLeftCollapsed(true)}
              title="Collapse Panel"
            >
              ◀
            </button>
          </div>

          <div className="panel-scroll-content">
            <div className="instructions-body">
              <h3 className="project-title">{project?.title}</h3>
              <span className="difficulty-badge">{project?.difficulty}</span>
              <p className="objective-text">{project?.objective}</p>

              <div className="requirements-section">
                <h4 className="section-title">Requirements Check-list</h4>
                <div className="requirements-list">
                  {project?.requirements?.map(req => (
                    <label key={req.id} className="requirement-checkbox-item">
                      <input 
                        type="checkbox" 
                        checked={!!checklistState[req.id]}
                        onChange={() => handleChecklistToggle(req.id)}
                      />
                      <span className="checkbox-label">{req.text}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="milestones-section">
                <h4 className="section-title">Target Milestone</h4>
                <div className="milestone-detail-card">
                  <strong className="milestone-title">{milestone.title}</strong>
                  <p className="milestone-desc">{milestone.desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Collapsed Left Trigger */}
        {isLeftCollapsed && (
          <button 
            className="collapsed-left-trigger" 
            onClick={() => setIsLeftCollapsed(false)}
            title="Expand Instructions Panel"
          >
            ▶
          </button>
        )}

        {/* Left Resizer Drag Handle */}
        {!isLeftCollapsed && (
          <div className="drag-resize-handle" onMouseDown={startResizeLeft} />
        )}

        {/* CENTER PANE: Code Editor Area */}
        <div className="pane-panel code-editor-panel">
          <div className="editor-tab-row">
            {Object.keys(files).map(name => (
              <button 
                key={name}
                className={`editor-tab-item ${activeFile === name ? 'active' : ''}`}
                onClick={() => setActiveFile(name)}
              >
                <span className="file-icon">{name.endsWith('.html') ? '📄' : name.endsWith('.css') ? '🎨' : '⚡'}</span>
                {name}
                {activeFile === name && <span className="tab-neon-accent" />}
              </button>
            ))}
          </div>

          <div className="editor-viewport-container">
            <div className="line-gutter">
              {Array.from({ length: Math.max(codeValue.split('\n').length, 25) }).map((_, i) => (
                <div key={i} className="gutter-num">{i + 1}</div>
              ))}
            </div>

            <textarea 
              value={codeValue}
              onChange={(e) => handleEditorChange(e.target.value)}
              className="ide-code-textarea"
              spellCheck="false"
            />

            {showSolution && (
              <div className="editor-solution-overlay">
                <div className="overlay-header">
                  <span className="overlay-badge">💡 Solution Guide</span>
                  <button className="close-overlay-btn" onClick={() => setShowSolution(false)}>×</button>
                </div>
                <pre className="overlay-pre">
                  {activeFile === 'index.html' && `<!-- Solution index.html -->
<!DOCTYPE html>
<html>
<body>
  <h1>Completed Layout</h1>
</body>
</html>`}
                  {activeFile === 'styles.css' && `/* Solution styles.css */
body { background: #09090b; color: #fff; }`}
                  {activeFile === 'script.js' && `// Solution script.js
console.log("Calculated successfully!");`}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Right Resizer Drag Handle */}
        <div className="drag-resize-handle" onMouseDown={startResizeRight} />

        {/* RIGHT PANE: Preview & Mentor */}
        <div className="pane-panel right-viewport-panel" style={{ width: `${rightWidth}px` }}>
          <div className="right-panel-tabs">
            <button 
              className={`right-tab-btn ${rightSubTab === 'preview' ? 'active' : ''}`} 
              onClick={() => setRightSubTab('preview')}
            >
              👀 Viewport
            </button>
            <button 
              className={`right-tab-btn ${rightSubTab === 'mentor' ? 'active' : ''}`} 
              onClick={() => setRightSubTab('mentor')}
            >
              🤖 AI Mentor
            </button>
          </div>

          <div className="right-panel-body">
            {rightSubTab === 'preview' ? (
              <div className="live-preview-container">
                <div className="iframe-viewport-wrapper">
                  {previewSrc ? (
                    <iframe 
                      title="IDE Live Preview"
                      srcDoc={previewSrc}
                      sandbox="allow-scripts"
                      className="live-preview-iframe"
                    />
                  ) : (
                    <div className="empty-viewport-placeholder">
                      <span className="icon">⚡</span>
                      <p>Click "Run Code" above to load viewport preview.</p>
                    </div>
                  )}
                </div>

                {/* Console logger with dynamic ambient aura */}
                <div className="virtual-console-panel">
                  <div className="console-header-bar">DEVELOPMENT LOGS</div>
                  <div className="console-log-lines">
                    {consoleLogs.map((log, idx) => (
                      <div key={idx} className="log-line-item">{log}</div>
                    ))}
                  </div>
                  {/* Status Indicator glows */}
                  <div className="console-aura-glow" />
                </div>
              </div>
            ) : (
              <div className="ai-mentor-container">
                <div className="mentor-chat-header">
                  <span className="mentor-status">● MENTOR ACTIVE</span>
                  <button className="get-hint-action" onClick={triggerHint}>Get Hint</button>
                </div>
                
                <div className="chat-dialog-history">
                  {aiChat.map((msg, idx) => (
                    <div key={idx} className={`dialog-bubble ${msg.sender}`}>
                      <span className="bubble-sender">{msg.sender === 'mentor' ? 'AI Mentor' : 'You'}</span>
                      <p className="bubble-text">{msg.text}</p>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAskMentor} className="chat-input-form-bar">
                  <input 
                    type="text" 
                    placeholder="Ask AI Mentor a question..."
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    className="chat-bar-input"
                  />
                </form>
              </div>
            )}
          </div>
        </div>

      </div>
    </StyledWorkspace>
  );
};

// Pulse keyframes for ambient console states
const pulseGreen = keyframes`
  0% { box-shadow: 0 0 15px rgba(16, 185, 129, 0.1); }
  50% { box-shadow: 0 0 35px rgba(16, 185, 129, 0.35); }
  100% { box-shadow: 0 0 15px rgba(16, 185, 129, 0.1); }
`;

const pulseRed = keyframes`
  0% { box-shadow: 0 0 15px rgba(239, 68, 68, 0.15); }
  50% { box-shadow: 0 0 35px rgba(239, 68, 68, 0.45); }
  100% { box-shadow: 0 0 15px rgba(239, 68, 68, 0.15); }
`;

const StyledWorkspace = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #07080B;
  color: #E2E8F0;
  overflow: hidden;
  position: relative;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  letter-spacing: -0.01em;

  /* Global Color & Layout Variables */
  --bg-obsidian: #07080B;
  --bg-panel-tint: rgba(15, 17, 26, 0.7);
  --border-glass: rgba(34, 38, 56, 0.5);
  --text-dim: #707E94;
  --color-neon-purple: #818CF8;
  --color-neon-magenta: #C084FC;
  --color-emerald: #10B981;
  --color-crimson: #EF4444;

  /* Ambient radial glows behind dashboard panels */
  .ambient-background-glow {
    position: absolute;
    width: 350px;
    height: 350px;
    border-radius: 50%;
    filter: blur(120px);
    opacity: 0.12;
    pointer-events: none;
    z-index: 1;
  }

  .ambient-background-glow.glow-1 {
    background: radial-gradient(circle, var(--color-neon-purple), transparent 70%);
    top: 10%;
    left: 20%;
  }

  .ambient-background-glow.glow-2 {
    background: radial-gradient(circle, var(--color-neon-magenta), transparent 70%);
    bottom: 15%;
    right: 15%;
  }

  /* ========================================== */
  /* 1. Global Floating Capsule Header         */
  /* ========================================== */
  .workspace-header-bar {
    height: 56px;
    display: flex;
    align-items: center;
    background: var(--bg-panel-tint);
    backdrop-filter: blur(16px);
    border: 1px solid var(--border-glass);
    margin: 12px 16px;
    padding: 0 16px;
    border-radius: 12px;
    gap: 16px;
    z-index: 10;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  }

  .nav-back-btn {
    background: none;
    border: 1px solid var(--border-glass);
    color: #E2E8F0;
    padding: 6px 12px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.25s cubic-bezier(0.25, 1, 0.5, 1);
  }

  .nav-back-btn:hover {
    background-color: var(--border-glass);
    color: #FFF;
    transform: translateX(-2px);
  }

  .workspace-breadcrumbs {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .workspace-breadcrumbs .crumb {
    color: var(--text-dim);
  }

  .workspace-breadcrumbs .crumb.active {
    color: #FFF;
  }

  .workspace-breadcrumbs .divider {
    color: var(--border-glass);
  }

  .autosave-indicator {
    font-size: 0.75rem;
    color: var(--text-dim);
    background-color: rgba(34, 38, 56, 0.4);
    padding: 4px 10px;
    border-radius: 20px;
    margin-left: auto;
    border: 1px solid rgba(255, 255, 255, 0.03);
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  /* High contrast action capsules */
  .action-capsule-btn {
    border: none;
    color: white;
    font-weight: 700;
    padding: 8px 16px;
    border-radius: 30px;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.25, 1, 0.5, 1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .action-capsule-btn.run {
    background: linear-gradient(135deg, #818CF8, #C084FC);
    box-shadow: 0 2px 10px rgba(129, 140, 248, 0.3);
  }

  .action-capsule-btn.run:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(129, 140, 248, 0.5);
  }

  .action-capsule-btn.reset {
    background-color: rgba(34, 38, 56, 0.6);
    border: 1px solid var(--border-glass);
  }

  .action-capsule-btn.reset:hover {
    background-color: var(--border-glass);
    transform: translateY(-1px);
  }

  .action-capsule-btn.solution {
    background-color: rgba(34, 38, 56, 0.6);
    border: 1px solid var(--border-glass);
  }

  .action-capsule-btn.solution:hover {
    background-color: var(--border-glass);
    transform: translateY(-1px);
  }

  .action-capsule-btn.submit {
    background: linear-gradient(135deg, #38BDF8, #818CF8);
    box-shadow: 0 2px 10px rgba(56, 189, 248, 0.3);
  }

  .action-capsule-btn.submit:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(56, 189, 248, 0.5);
  }

  /* ========================================== */
  /* 2. Bento Panel grid layout                  */
  /* ========================================== */
  .workspace-panes-wrapper {
    flex: 1;
    display: flex;
    height: calc(100% - 80px);
    background-color: transparent;
    position: relative;
    overflow: hidden;
    padding: 0 16px 16px 16px;
    gap: 8px;
    z-index: 2;
  }

  .pane-panel {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: var(--bg-panel-tint);
    backdrop-filter: blur(16px);
    border: 1px solid var(--border-glass);
    border-radius: 16px;
    overflow: hidden;
    transition: box-shadow 0.3s ease;
  }

  /* Split dragging resizers */
  .drag-resize-handle {
    width: 6px;
    height: 100%;
    cursor: col-resize;
    background-color: transparent;
    transition: background-color 0.25s ease;
    z-index: 5;
    margin: 0 -3px;
  }

  .drag-resize-handle:hover {
    background-color: rgba(129, 140, 248, 0.2);
  }

  /* Collapsed trigger styling */
  .collapsed-left-trigger {
    width: 18px;
    height: 100%;
    background: var(--bg-panel-tint);
    border: 1px solid var(--border-glass);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-dim);
    font-size: 0.7rem;
    cursor: pointer;
    outline: none;
    transition: all 0.2s ease;
  }

  .collapsed-left-trigger:hover {
    color: #FFF;
    background-color: var(--border-glass);
    box-shadow: 0 0 10px rgba(129, 140, 248, 0.25);
  }

  /* ========================================== */
  /* Instructions Panel COLLAPSE slide transition*/
  /* ========================================== */
  .instructions-panel {
    flex-shrink: 0;
    transition: width 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease;
  }

  .instructions-panel.collapsed {
    width: 0 !important;
    opacity: 0;
    pointer-events: none;
    border: none;
  }

  .panel-header-toolbar {
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    border-bottom: 1px solid var(--border-glass);
    background-color: rgba(34, 38, 56, 0.2);
  }

  .panel-label {
    font-size: 0.75rem;
    font-weight: 750;
    text-transform: uppercase;
    color: var(--text-dim);
    letter-spacing: 1px;
  }

  .chevron-collapse-btn {
    background: none;
    border: none;
    color: var(--text-dim);
    cursor: pointer;
    font-size: 0.7rem;
    padding: 6px 10px;
    border-radius: 6px;
    transition: all 0.2s ease;
  }

  .chevron-collapse-btn:hover {
    color: #FFF;
    background-color: var(--border-glass);
  }

  .panel-scroll-content {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
  }

  .instructions-body {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .project-title {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 800;
    color: #FFF;
    letter-spacing: -0.02em;
  }

  .difficulty-badge {
    font-size: 0.65rem;
    background-color: rgba(129, 140, 248, 0.15);
    color: #A5B4FC;
    border: 1px solid rgba(129, 140, 248, 0.3);
    padding: 3px 10px;
    border-radius: 20px;
    font-weight: 700;
    width: fit-content;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .objective-text {
    margin: 0;
    font-size: 0.85rem;
    line-height: 1.6;
    color: #CBD5E1;
  }

  .requirements-section {
    border-top: 1px solid var(--border-glass);
    padding-top: 20px;
  }

  .section-title {
    margin: 0 0 12px 0;
    font-size: 0.8rem;
    font-weight: 750;
    color: #F1F5F9;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .requirements-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .requirement-checkbox-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    cursor: pointer;
    font-size: 0.85rem;
    line-height: 1.5;
    color: #94A3B8;
    transition: color 0.2s;
  }

  .requirement-checkbox-item:hover {
    color: #F1F5F9;
  }

  .requirement-checkbox-item input {
    margin-top: 4px;
  }

  .milestones-section {
    border-top: 1px solid var(--border-glass);
    padding-top: 20px;
  }

  .milestone-detail-card {
    background-color: rgba(34, 38, 56, 0.15);
    border: 1px solid var(--border-glass);
    padding: 14px;
    border-radius: 12px;
  }

  .milestone-title {
    font-size: 0.85rem;
    color: #FFF;
  }

  .milestone-desc {
    margin: 6px 0 0 0;
    font-size: 0.8rem;
    color: var(--text-dim);
  }

  /* ========================================== */
  /* Center Panel - Premium Code Editor         */
  /* ========================================== */
  .code-editor-panel {
    flex: 1;
    background: var(--bg-obsidian) !important;
  }

  .editor-tab-row {
    height: 48px;
    display: flex;
    background-color: var(--bg-panel-tint);
    border-bottom: 1px solid var(--border-glass);
    padding: 0 12px;
    align-items: flex-end;
  }

  .editor-tab-item {
    background: none;
    border: none;
    color: var(--text-dim);
    padding: 10px 18px;
    font-size: 0.8rem;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    position: relative;
    transition: color 0.25s ease;
  }

  .editor-tab-item:hover {
    color: #FFF;
  }

  .editor-tab-item.active {
    color: #FFF;
  }

  /* Neon underline sliding tab accent */
  .tab-neon-accent {
    position: absolute;
    bottom: -1px;
    left: 12%;
    right: 12%;
    height: 2px;
    background: var(--color-neon-purple);
    box-shadow: 0 0 12px var(--color-neon-purple);
    border-radius: 20px;
  }

  .editor-viewport-container {
    flex: 1;
    display: flex;
    position: relative;
    overflow: hidden;
  }

  .line-gutter {
    width: 52px;
    padding-top: 20px;
    font-family: 'Fira Code', 'Geist Mono', Consolas, monospace;
    font-size: 0.8rem;
    color: #4A5568;
    text-align: right;
    padding-right: 16px;
    border-right: 1px solid var(--border-glass);
    background-color: var(--bg-obsidian);
    user-select: none;
  }

  .gutter-num {
    height: 22px;
  }

  .ide-code-textarea {
    flex: 1;
    background: none;
    border: none;
    color: #F8FAFC;
    font-family: 'Fira Code', 'Geist Mono', Consolas, monospace;
    font-size: 0.85rem;
    line-height: 22px;
    padding: 20px;
    resize: none;
    outline: none;
    height: 100%;
    width: 100%;
    white-space: pre;
    overflow-x: auto;
  }

  .editor-solution-overlay {
    position: absolute;
    top: 0;
    left: 52px;
    right: 0;
    bottom: 0;
    background-color: rgba(7, 8, 11, 0.98);
    padding: 20px;
    overflow-y: auto;
    z-index: 8;
  }

  .overlay-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .overlay-badge {
    color: var(--color-emerald);
    font-size: 0.8rem;
    font-weight: 750;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .close-overlay-btn {
    background: none;
    border: none;
    color: var(--text-dim);
    font-size: 1.5rem;
    cursor: pointer;
    transition: color 0.2s;
  }

  .close-overlay-btn:hover {
    color: #FFF;
  }

  .overlay-pre {
    font-family: 'Fira Code', 'Geist Mono', monospace;
    font-size: 0.8rem;
    background-color: rgba(0, 0, 0, 0.4);
    padding: 20px;
    border-radius: 12px;
    color: #CBD5E1;
    white-space: pre-wrap;
    border: 1px solid var(--border-glass);
  }

  /* ========================================== */
  /* Right Panel - Viewport & AI Chat           */
  /* ========================================== */
  .right-viewport-panel {
    border-left: 1px solid var(--border-glass);
    flex-shrink: 0;
  }

  .right-panel-tabs {
    height: 48px;
    display: flex;
    background-color: var(--bg-panel-tint);
    border-bottom: 1px solid var(--border-glass);
  }

  .right-tab-btn {
    flex: 1;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    color: var(--text-dim);
    font-weight: 700;
    cursor: pointer;
    font-size: 0.8rem;
    outline: none;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: color 0.2s ease;
  }

  .right-tab-btn:hover {
    color: #FFF;
  }

  .right-tab-btn.active {
    color: #FFF;
    border-bottom-color: var(--color-neon-purple);
    background-color: rgba(34, 38, 56, 0.2);
  }

  .right-panel-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .live-preview-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    position: relative;
  }

  .iframe-viewport-wrapper {
    flex: 1;
    background-color: #FFF;
    min-height: 200px;
    position: relative;
    border-radius: 8px;
    margin: 12px;
    overflow: hidden;
    border: 1px solid var(--border-glass);
  }

  .live-preview-iframe {
    width: 100%;
    height: 100%;
    border: none;
    background-color: #FFF;
  }

  .empty-viewport-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: var(--text-dim);
    background-color: #0E0F13;
    font-size: 0.85rem;
    padding: 20px;
    text-align: center;
  }

  .empty-viewport-placeholder .icon {
    font-size: 2.2rem;
    color: var(--color-neon-purple);
    margin-bottom: 12px;
  }

  /* Console Panel with state-driven pulsing glow auras */
  .virtual-console-panel {
    height: 150px;
    background-color: #08090C;
    display: flex;
    flex-direction: column;
    position: relative;
    border-top: 1px solid var(--border-glass);
  }

  .console-header-bar {
    background-color: rgba(34, 38, 56, 0.2);
    border-bottom: 1px solid var(--border-glass);
    padding: 8px 16px;
    font-size: 0.7rem;
    font-weight: 750;
    color: var(--text-dim);
    letter-spacing: 1px;
  }

  .console-log-lines {
    flex: 1;
    padding: 12px 16px;
    overflow-y: auto;
    font-family: 'Fira Code', 'Geist Mono', monospace;
    font-size: 0.8rem;
    display: flex;
    flex-direction: column;
    gap: 4px;
    z-index: 2;
  }

  .log-line-item {
    color: #A5B4FC;
  }

  /* Neon pulsing ambient element backing the console log */
  .console-aura-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    border-radius: 0 0 16px 16px;
    z-index: 1;
    
    ${props => props.executionStatus === 'success' && css`
      animation: ${pulseGreen} 3s infinite ease-in-out;
      border: 1px solid var(--color-emerald);
    `}

    ${props => props.executionStatus === 'error' && css`
      animation: ${pulseRed} 3s infinite ease-in-out;
      border: 1px solid var(--color-crimson);
    `}
  }

  /* AI Mentor Container */
  .ai-mentor-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #08090C;
  }

  .mentor-chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 16px;
    border-bottom: 1px solid var(--border-glass);
    background-color: var(--bg-panel-tint);
  }

  .mentor-status {
    font-size: 0.7rem;
    color: var(--color-emerald);
    font-weight: 800;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .get-hint-action {
    background-color: rgba(129, 140, 248, 0.15);
    color: #A5B4FC;
    border: 1px solid rgba(129, 140, 248, 0.3);
    border-radius: 6px;
    padding: 6px 12px;
    cursor: pointer;
    font-size: 0.75rem;
    font-weight: 700;
    transition: all 0.2s;
  }

  .get-hint-action:hover {
    background-color: rgba(129, 140, 248, 0.25);
    transform: translateY(-1px);
  }

  .chat-dialog-history {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .dialog-bubble {
    display: flex;
    flex-direction: column;
    max-width: 80%;
    padding: 12px 14px;
    border-radius: 12px;
    font-size: 0.85rem;
    line-height: 1.5;
  }

  .dialog-bubble.mentor {
    align-self: flex-start;
    background-color: var(--bg-panel-tint);
    border: 1px solid var(--border-glass);
    color: #E2E8F0;
  }

  .dialog-bubble.student {
    align-self: flex-end;
    background: linear-gradient(135deg, var(--color-neon-purple), var(--color-neon-magenta));
    color: #FFF;
    font-weight: 600;
    box-shadow: 0 4px 14px rgba(129, 140, 248, 0.25);
  }

  .bubble-sender {
    font-size: 0.65rem;
    font-weight: 800;
    color: var(--text-dim);
    margin-bottom: 6px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .dialog-bubble.student .bubble-sender {
    color: rgba(255, 255, 255, 0.75);
  }

  .bubble-text {
    margin: 0;
  }

  .chat-input-form-bar {
    padding: 16px;
    border-top: 1px solid var(--border-glass);
    background-color: var(--bg-panel-tint);
  }

  .chat-bar-input {
    width: 100%;
    background-color: #08090C !important;
    border: 1px solid var(--border-glass) !important;
    border-radius: 20px !important;
    padding: 10px 18px !important;
    font-size: 0.85rem !important;
    color: #FFF !important;
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.2s;
  }

  .chat-bar-input:focus {
    border-color: var(--color-neon-purple) !important;
  }
`;

export default Workspace;
