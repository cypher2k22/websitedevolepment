import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../../AppContext';
import { LEARNING_PATHS } from '../../curriculumData';

const Workspace = () => {
  const { tech, projectId, milestoneId } = useParams();
  const navigate = useNavigate();
  const { user, theme, updateProjectProgress, addToast } = useContext(AppContext);

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!user) {
      addToast('Please login to access the workspace.', 'info');
      navigate('/login');
    }
  }, [user, navigate, addToast]);

  const currentTech = LEARNING_PATHS[tech] || LEARNING_PATHS.HTML;
  const allProjects = [...(currentTech.levels.Beginner || []), ...(currentTech.levels.Intermediate || []), ...(currentTech.levels.Advanced || [])];
  const project = allProjects.find(p => p.id === projectId) || allProjects[0];
  const milestoneIndex = project?.milestones.findIndex(m => m.id === milestoneId) ?? 0;
  const milestone = project?.milestones[milestoneIndex] || { title: 'Workspace Milestone', desc: 'Active lesson environment.' };

  // File system state
  const [files, setFiles] = useState({
    'index.html': `<!DOCTYPE html>
<html>
<head>
  <title>My Project</title>
  <style>
    body { background: #0f172a; color: #f8fafc; font-family: sans-serif; text-align: center; padding: 40px; }
    h1 { color: #38bdf8; }
  </style>
</head>
<body>
  <h1>Hello CodeJourney</h1>
  <p>Modify index.html or styles.css to see live rendering updates!</p>
</body>
</html>`,
    'styles.css': `/* CSS Rules */
h1 {
  text-shadow: 0 4px 10px rgba(56, 189, 248, 0.4);
}`,
    'script.js': `// JavaScript Logic
console.log("Workspace initialized successfully!");`
  });

  const [activeFile, setActiveFile] = useState('index.html');
  const [codeValue, setCodeValue] = useState(files['index.html']);
  const [consoleLogs, setConsoleLogs] = useState(['System containers started.', 'Workspace online.']);
  const [previewSrc, setPreviewSrc] = useState('');
  const [aiInput, setAiInput] = useState('');
  const [aiChat, setAiChat] = useState([
    { sender: 'mentor', text: `Welcome to the IDE clone! Let's get started on "${milestone.title}". I am your AI Mentor. Let me know if you need any hints!` }
  ]);
  const [showSolution, setShowSolution] = useState(false);

  // Sync state values on active file change
  useEffect(() => {
    setCodeValue(files[activeFile]);
  }, [activeFile]);

  const handleRunCode = () => {
    const updatedFiles = { ...files, [activeFile]: codeValue };
    setFiles(updatedFiles);
    
    // Parse combined preview content
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
    setConsoleLogs(prev => [...prev, `[Console] Executed files at ${new Date().toLocaleTimeString()}`]);
  };

  const handleAskMentor = (e) => {
    e.preventDefault();
    if (!aiInput.trim()) return;

    const userMsg = aiInput;
    setAiChat(prev => [...prev, { sender: 'student', text: userMsg }]);
    setAiInput('');

    setTimeout(() => {
      let mentorResponse = `Good approach. Keep checking your syntax variables. For this step, let's verify if your HTML selectors match the CSS targets.`;
      if (userMsg.toLowerCase().includes('hint')) {
        mentorResponse = `AI Mentor Hint: Use semantic tags like <section> or <article> to group body contents. Avoid overloading generic <div> wrappers.`;
      } else if (userMsg.toLowerCase().includes('solution') || userMsg.toLowerCase().includes('code')) {
        mentorResponse = `To maintain the learning journey, I can't write out the final code blocks for you. However, you can toggle the "View Solution" reference code overlay to check your structural setup.`;
      }
      setAiChat(prev => [...prev, { sender: 'mentor', text: mentorResponse }]);
    }, 800);
  };

  const triggerHint = () => {
    setAiChat(prev => [...prev, { sender: 'student', text: 'Give me a quick hint!' }]);
    setTimeout(() => {
      setAiChat(prev => [...prev, { sender: 'mentor', text: 'AI Mentor Hint: Ensure your styles.css includes the body backdrop properties correctly.' }]);
    }, 500);
  };

  const handleReset = () => {
    if (window.confirm('Reset this file to starter defaults? All unsaved edits will be lost.')) {
      if (activeFile === 'index.html') {
        setCodeValue(`<!DOCTYPE html><html><body><h1>Starter</h1></body></html>`);
      } else {
        setCodeValue('');
      }
      setConsoleLogs(prev => [...prev, `[Console] Reset active file.`]);
    }
  };

  const submitMilestone = () => {
    updateProjectProgress(projectId, 100);
    addToast('Project completed successfully! +250 XP awarded.', 'success');
    navigate('/dashboard');
  };

  if (!user) return null;

  return (
    <StyledWorkspace themeMode={theme}>
      {/* Workspace Header */}
      <div className="workspace-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>← Dashboard</button>
        <span className="project-title">{tech} / {project?.title} - {milestone.title}</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
          <button className="action-btn run" onClick={handleRunCode}>Run Page</button>
          <button className="action-btn reset" onClick={handleReset}>Reset</button>
          <button className="action-btn solution" onClick={() => setShowSolution(!showSolution)}>
            {showSolution ? 'Hide Solution' : 'Solution'}
          </button>
          <button className="action-btn submit" onClick={submitMilestone}>Complete Project</button>
        </div>
      </div>

      <div className="panels-container">
        {/* Left: Explorer & Milestones */}
        <div className="panel left-explorer">
          <div className="panel-header">📂 VS Code Explorer</div>
          <div className="file-tree">
            {Object.keys(files).map(name => (
              <div 
                key={name}
                className={`file-item ${activeFile === name ? 'active' : ''}`}
                onClick={() => {
                  setFiles(prev => ({ ...prev, [activeFile]: codeValue }));
                  setActiveFile(name);
                }}
              >
                <span className="icon">{name.endsWith('html') ? '📄' : name.endsWith('css') ? '🎨' : '⚡'}</span>
                {name}
              </div>
            ))}
          </div>

          <div className="panel-header" style={{ marginTop: '20px' }}>🎯 Milestone Steps</div>
          <div className="milestones-sidebar">
            <div className="milestone-details">
              <h4>{milestone.title}</h4>
              <p>{milestone.desc}</p>
            </div>
          </div>
        </div>

        {/* Center: Simulated Code Editor */}
        <div className="panel editor-pane">
          <div className="panel-header flex-header">
            <span>💻 Code Editor - {activeFile}</span>
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
<head>
  <style>
    body { background-color: #0f172a; text-align: center; }
  </style>
</head>
<body>
  <h1>Completed Milestone</h1>
</body>
</html>`}
                  {activeFile === 'styles.css' && `/* Solution styles.css */
h1 { color: #38bdf8; }`}
                  {activeFile === 'script.js' && `// Solution script.js
console.log("Milestone code validated!");`}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Right: Live Preview & AI Chat */}
        <div className="panel right-split">
          <div className="split-half preview-sub">
            <div className="panel-header">👀 Live Browser View</div>
            <div className="preview-viewport">
              {previewSrc ? (
                <iframe 
                  title="Render preview Frame"
                  srcDoc={previewSrc}
                  sandbox="allow-scripts"
                  className="preview-iframe"
                />
              ) : (
                <div className="empty-preview">Click "Run Page" to compile code.</div>
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
              <button className="hint-btn" onClick={triggerHint}>Hint</button>
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
                placeholder="Ask developer mentor a question..."
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                className="chat-input"
              />
              <button type="submit" className="chat-submit-btn">Ask</button>
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
    border: 1px solid rgba(255, 255, 255, 0.10);
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

  .action-btn.run { background: #00d2ff; color: #000; }
  .action-btn.reset { background: rgba(255, 0, 0, 0.2); border: 1px solid rgba(255, 0, 0, 0.3); color: #ff4d4d; }
  .action-btn.solution { background: #af40ff; }
  .action-btn.submit { background: #10ac84; }

  .panels-container {
    display: grid;
    grid-template-columns: 240px 1fr 400px;
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
  }

  /* File Tree style */
  .file-tree {
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .file-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.85rem;
    color: #aaa;
  }

  .file-item.active, .file-item:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
  }

  .milestones-sidebar {
    padding: 15px;
  }

  .milestone-details h4 {
    margin: 0 0 5px 0;
  }

  .milestone-details p {
    font-size: 0.85rem;
    color: #888;
    line-height: 1.4;
    margin: 0;
  }

  /* Code Editor */
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
    background: ${props => props.themeMode === 'dark' ? 'rgba(13, 13, 17, 0.95)' : 'rgba(255, 255, 255, 0.95)'};
    padding: 20px;
    box-sizing: border-box;
    overflow-y: auto;
    border-left: 3px solid #af40ff;
  }

  /* Right column split preview & AI chat */
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
    color: #888;
    background: ${props => props.themeMode === 'dark' ? '#1c1c24' : '#eee'};
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
    color: #10ac84;
  }

  /* AI Chat style */
  .chat-history {
    flex: 1;
    overflow-y: auto;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    background: ${props => props.themeMode === 'dark' ? '#111116' : '#f1f1f5'};
  }

  .chat-bubble {
    padding: 10px 14px;
    border-radius: 8px;
    max-width: 85%;
    font-size: 0.85rem;
  }

  .chat-bubble.mentor {
    background: ${props => props.themeMode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#fff'};
    border: 1px solid rgba(0, 0, 0, 0.05);
    align-self: flex-start;
  }

  .chat-bubble.student {
    background: rgba(0, 210, 255, 0.15);
    border: 1px solid rgba(0, 210, 255, 0.2);
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
    border-top: 1px solid ${props => props.themeMode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'};
    gap: 8px;
  }

  .chat-input {
    flex: 1;
    background: ${props => props.themeMode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : '#fff'};
    border: 1px solid ${props => props.themeMode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
    border-radius: 4px;
    padding: 8px 12px;
    color: ${props => props.themeMode === 'dark' ? '#fff' : '#000'};
    outline: none;
    font-size: 0.85rem;
  }

  .chat-submit-btn {
    background: #00d2ff;
    color: #000;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    font-weight: bold;
    cursor: pointer;
    position: static;
    transform: none;
    height: auto;
    min-width: auto;
    box-shadow: none;
  }

  .hint-btn {
    background: rgba(0, 210, 255, 0.1);
    border: 1px solid rgba(0, 210, 255, 0.2);
    color: #00d2ff;
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
