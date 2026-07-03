import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../../AppContext';
import { PROJECTS_CURRICULUM } from '../../curriculumData';

const Workspace = () => {
  const { tech, projectId, milestoneId } = useParams();
  const navigate = useNavigate();
  const { user, theme, updateProjectProgress, addToast } = useContext(AppContext);

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!user) {
      addToast('Authentication required. Redirecting to login.', 'info');
      navigate('/login');
    }
  }, [user, navigate, addToast]);

  const project = PROJECTS_CURRICULUM.find(p => p.id === projectId) || PROJECTS_CURRICULUM[0];
  const milestoneIndex = project?.milestones?.findIndex(m => m.id === milestoneId) ?? 0;
  const milestone = project?.milestones?.[milestoneIndex] || { title: 'Workspace Setup', desc: 'Environment initialization.' };

  // Load starter files dynamically from the project curriculum configuration
  const [files, setFiles] = useState({
    'index.html': '',
    'styles.css': '',
    'script.js': ''
  });

  const [activeFile, setActiveFile] = useState('index.html');
  const [codeValue, setCodeValue] = useState('');
  const [consoleLogs, setConsoleLogs] = useState(['Docker container spinning up...', 'Filesystem ready.']);
  const [previewSrc, setPreviewSrc] = useState('');
  const [aiInput, setAiInput] = useState('');
  const [aiChat, setAiChat] = useState([]);
  const [showSolution, setShowSolution] = useState(false);
  const [checklistState, setChecklistState] = useState({});

  // Initialize workspace files and AI conversation once project loads
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

      // Initialize req checklists
      const initialChecklist = {};
      project.requirements.forEach(req => {
        initialChecklist[req.id] = false;
      });
      setChecklistState(initialChecklist);
    }
  }, [project]);

  // Sync textarea updates on active file transitions
  useEffect(() => {
    setCodeValue(files[activeFile] || '');
  }, [activeFile, files]);

  const handleRunCode = () => {
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
    setConsoleLogs(prev => [...prev, `[System] Compiled and rendered active viewport at ${new Date().toLocaleTimeString()}`]);
    addToast('Code compilation successful.', 'success');
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
        mentorResponse = `I won't write out the code for you directly. But you can check the "Solution" overlay at the header as a guidance reference.`;
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
    if (window.confirm('Are you sure you want to discard your edits and reset the starter files?')) {
      const initialFiles = project.starterCode || {};
      setFiles(initialFiles);
      setCodeValue(initialFiles[activeFile] || '');
      setPreviewSrc(initialFiles['index.html'] || '');
      setConsoleLogs(prev => [...prev, '[System] Reset workspace environment.']);
    }
  };

  const submitFinalProject = () => {
    // Check if at least one checkbox is selected (simulate user validation)
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

  if (!user) return null;

  return (
    <StyledWorkspace themeMode={theme}>
      {/* Header */}
      <div className="workspace-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>← Dashboard</button>
        <span className="project-title">{project?.technology} / {project?.title}</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
          <button className="action-btn run" onClick={handleRunCode}>Run Page</button>
          <button className="action-btn reset" onClick={handleReset}>Reset</button>
          <button className="action-btn solution" onClick={() => setShowSolution(!showSolution)}>
            {showSolution ? 'Hide Solution' : 'Solution'}
          </button>
          <button className="action-btn submit" onClick={submitFinalProject}>Submit Project</button>
        </div>
      </div>

      <div className="panels-container">
        {/* Left Panel: Goals Checklist */}
        <div className="panel left-explorer">
          <div className="panel-header">📝 Instructions & Goals</div>
          <div className="instructions-body">
            <h3>{project?.title}</h3>
            <p className="goal-desc">{project?.objective}</p>

            <div className="checklist-box">
              <h4>Requirements Checklist</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
                {project?.requirements.map(req => (
                  <label key={req.id} className="checklist-item">
                    <input 
                      type="checkbox" 
                      checked={!!checklistState[req.id]}
                      onChange={() => handleChecklistToggle(req.id)}
                    />
                    <span style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>{req.text}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Center Panel: Editor Switcher */}
        <div className="panel editor-pane">
          <div className="panel-header flex-header">
            <span>💻 File Editor</span>
            <div className="file-tabs">
              {Object.keys(files).map(name => (
                <button 
                  key={name}
                  className={`file-tab ${activeFile === name ? 'active' : ''}`}
                  onClick={() => {
                    setFiles(prev => ({ ...prev, [activeFile]: codeValue }));
                    setActiveFile(name);
                  }}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
          <div className="editor-container">
            <textarea 
              value={codeValue}
              onChange={(e) => setCodeValue(e.target.value)}
              className="code-textarea"
              spellCheck="false"
            />
            {showSolution && (
              <div className="solution-overlay">
                <h4>Solution reference code:</h4>
                <pre>
                  {activeFile === 'index.html' && `<!-- Solution index.html -->
<!DOCTYPE html>
<html>
<body>
  <h1>Completed Milestone</h1>
</body>
</html>`}
                  {activeFile === 'styles.css' && `/* Solution styles.css */
body { background: #000; }`}
                  {activeFile === 'script.js' && `// Solution script.js
console.log("Calculated!");`}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Split Preview & Terminal */}
        <div className="panel right-split">
          <div className="split-half preview-sub">
            <div className="panel-header">👀 Live Browser View</div>
            <div className="preview-viewport">
              {previewSrc ? (
                <iframe 
                  title="Live preview viewport frame"
                  srcDoc={previewSrc}
                  sandbox="allow-scripts"
                  className="preview-iframe"
                />
              ) : (
                <div className="empty-preview">No active viewport render. Click Run Page.</div>
              )}
            </div>
            <div className="terminal-logs">
              {consoleLogs.map((log, idx) => (
                <div key={idx} className="log-line">{log}</div>
              ))}
            </div>
          </div>

          <div className="split-half ai-sub">
            <div className="panel-header flex-header">
              <span>🤖 AI Mentor Assistant</span>
              <button className="hint-btn" onClick={triggerHint}>Get Hint</button>
            </div>
            <div className="chat-history">
              {aiChat.map((msg, idx) => (
                <div key={idx} className={`chat-bubble ${msg.sender}`}>
                  <span className="bubble-author">{msg.sender === 'mentor' ? 'AI Mentor' : 'You'}</span>
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>
            <form onSubmit={handleAskMentor} className="chat-input-form">
              <input 
                type="text" 
                placeholder="Ask prompt mentor..."
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                className="chat-input"
              />
              <button type="submit" className="chat-submit-btn">Send</button>
            </form>
          </div>
        </div>
      </div>
    </StyledWorkspace>
  );
};

const StyledWorkspace = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 4rem);
  background: ${props => props.themeMode === 'dark' ? '#09090c' : '#f9f9fb'};
  color: ${props => props.themeMode === 'dark' ? '#fff' : '#000'};

  .workspace-header {
    background: ${props => props.themeMode === 'dark' ? '#111116' : '#fff'};
    border-bottom: 1px solid ${props => props.themeMode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'};
    padding: 10px 20px;
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .back-btn {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: ${props => props.themeMode === 'dark' ? '#fff' : '#333'};
    padding: 6px 14px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.85rem;
    position: static;
    transform: none;
    height: auto;
    min-width: auto;
    box-shadow: none;
  }

  .action-btn {
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    color: white;
    cursor: pointer;
    font-weight: bold;
    font-size: 0.85rem;
    position: static;
    transform: none;
    height: auto;
    min-width: auto;
    box-shadow: none;
  }

  .action-btn.run { background: #6366f1; }
  .action-btn.reset { background: rgba(255, 0, 0, 0.15); border: 1px solid rgba(255, 0, 0, 0.3); color: #ff4d4d; }
  .action-btn.solution { background: #27272a; border: 1px solid #3f3f46; }
  .action-btn.submit { background: #10b981; color: #000; }

  .panels-container {
    display: grid;
    grid-template-columns: 320px 1fr 420px;
    flex: 1;
    overflow: hidden;
  }

  .panel {
    display: flex;
    flex-direction: column;
    border-right: 1px solid ${props => props.themeMode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'};
    overflow: hidden;
  }

  .panel-header {
    background: ${props => props.themeMode === 'dark' ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0,0,0,0.02)'};
    border-bottom: 1px solid ${props => props.themeMode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0,0,0,0.08)'};
    padding: 10px 15px;
    font-size: 0.8rem;
    font-weight: bold;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .flex-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .instructions-body {
    padding: 20px;
    overflow-y: auto;
    flex: 1;
  }

  .instructions-body h3 {
    margin-top: 0;
    font-size: 1.25rem;
    color: #fff;
  }

  .goal-desc {
    font-size: 0.85rem;
    color: #ccc;
    line-height: 1.5;
  }

  .checklist-box {
    margin-top: 25px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    padding: 15px;
    border-radius: 8px;
  }

  .checklist-box h4 {
    margin: 0;
    font-size: 0.9rem;
    color: #6366f1;
  }

  .checklist-item {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    color: #ccc;
    cursor: pointer;
  }

  .checklist-item input {
    margin-top: 3px;
  }

  /* File tabs inside editor header */
  .file-tabs {
    display: flex;
    gap: 5px;
  }

  .file-tab {
    background: none;
    border: none;
    color: #888;
    font-size: 0.75rem;
    cursor: pointer;
    padding: 4px 8px;
    border-radius: 3px;
    font-weight: bold;
    position: static;
    transform: none;
    height: auto;
    min-width: auto;
    box-shadow: none;
  }

  .file-tab.active {
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
  }

  /* Textarea Editor */
  .editor-pane {
    background: ${props => props.themeMode === 'dark' ? '#0d0d11' : '#fff'};
  }

  .editor-container {
    flex: 1;
    position: relative;
    overflow: hidden;
  }

  .code-textarea {
    width: 100%;
    height: 100%;
    background: none;
    border: none;
    color: ${props => props.themeMode === 'dark' ? '#f8fafc' : '#333'};
    font-family: monospace;
    font-size: 0.95rem;
    padding: 20px;
    box-sizing: border-box;
    resize: none;
    outline: none;
    line-height: 1.5;
  }

  .solution-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(13, 13, 17, 0.95);
    padding: 20px;
    box-sizing: border-box;
    overflow-y: auto;
    border-left: 3px solid #6366f1;
  }

  .solution-overlay pre {
    color: #ccc;
    font-family: monospace;
    font-size: 0.85rem;
  }

  /* Right Split Panel */
  .right-split {
    border-right: none;
  }

  .split-half {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .preview-sub {
    border-bottom: 1px solid ${props => props.themeMode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'};
  }

  .preview-viewport {
    flex: 1;
    background: #fff;
    position: relative;
  }

  .preview-iframe {
    width: 100%;
    height: 100%;
    border: none;
  }

  .empty-preview {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #1e1e24;
    color: #666;
    font-size: 0.85rem;
  }

  .terminal-logs {
    background: #000;
    height: 80px;
    overflow-y: auto;
    font-family: monospace;
    font-size: 0.75rem;
    padding: 10px;
    box-sizing: border-box;
    color: #10b981;
  }

  /* Chat history */
  .chat-history {
    flex: 1;
    overflow-y: auto;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    background: ${props => props.themeMode === 'dark' ? '#111116' : '#f4f4f7'};
  }

  .chat-bubble {
    padding: 10px 14px;
    border-radius: 8px;
    max-width: 85%;
    font-size: 0.85rem;
    line-height: 1.4;
  }

  .chat-bubble.mentor {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255,255,255,0.08);
    align-self: flex-start;
  }

  .chat-bubble.student {
    background: rgba(99, 102, 241, 0.15);
    border: 1px solid rgba(99, 102, 241, 0.2);
    align-self: flex-end;
  }

  .bubble-author {
    font-size: 0.7rem;
    font-weight: bold;
    color: #888;
    display: block;
    margin-bottom: 4px;
  }

  .chat-input-form {
    display: flex;
    padding: 10px;
    background: rgba(255, 255, 255, 0.02);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    gap: 8px;
  }

  .chat-input {
    flex: 1;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    padding: 8px 12px;
    color: #fff;
    outline: none;
    font-size: 0.85rem;
  }

  .chat-submit-btn {
    background: #6366f1;
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    font-weight: bold;
    cursor: pointer;
    font-size: 0.85rem;
    position: static;
    transform: none;
    height: auto;
    min-width: auto;
    box-shadow: none;
  }

  .hint-btn {
    background: rgba(99, 102, 241, 0.1);
    border: 1px solid rgba(99, 102, 241, 0.2);
    color: #6366f1;
    border-radius: 3px;
    font-size: 0.75rem;
    padding: 4px 8px;
    cursor: pointer;
    font-weight: bold;
    position: static;
    transform: none;
    height: auto;
    min-width: auto;
    box-shadow: none;
  }
`;

export default Workspace;
