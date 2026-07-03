import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { LEARNING_PATHS } from '../../curriculumData';

const Workspace = () => {
  const { tech, projectId, milestoneId } = useParams();
  const navigate = useNavigate();

  // Find curriculum details
  const currentTech = LEARNING_PATHS[tech] || LEARNING_PATHS.HTML;
  const allProjects = [...(currentTech.levels.Beginner || []), ...(currentTech.levels.Intermediate || []), ...(currentTech.levels.Advanced || [])];
  const project = allProjects.find(p => p.id === projectId) || allProjects[0];
  const milestoneIndex = project?.milestones.findIndex(m => m.id === milestoneId) ?? 0;
  const milestone = project?.milestones[milestoneIndex] || { title: 'Introductory Milestone', desc: 'Environment Configuration' };

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
  <h1>Hello Fullstack</h1>
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
  const [consoleLogs, setConsoleLogs] = useState(['System container online.', 'Ready to execute.']);
  const [previewSrc, setPreviewSrc] = useState('');
  const [aiInput, setAiInput] = useState('');
  const [aiChat, setAiChat] = useState([
    { sender: 'mentor', text: `Hi there! I am your AI Mentor. Let me help you complete the "${milestone.title}" milestone. Ask me questions, request debugging, or tap for a hint!` }
  ]);
  const [showSolution, setShowSolution] = useState(false);

  // Sync editor value when active file changes
  useEffect(() => {
    setCodeValue(files[activeFile]);
  }, [activeFile]);

  // Run the code into simulated preview
  const handleRunCode = () => {
    const updatedFiles = { ...files, [activeFile]: codeValue };
    setFiles(updatedFiles);
    
    // Simple HTML parsing for preview rendering
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
    setConsoleLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Executed active environment.`]);
  };

  const handleAskMentor = (e) => {
    e?.preventDefault();
    if (!aiInput.trim()) return;

    const userMsg = aiInput;
    setAiChat(prev => [...prev, { sender: 'student', text: userMsg }]);
    setAiInput('');

    // Simulate AI Mentor response
    setTimeout(() => {
      let mentorResponse = `That is a great question! For "${milestone.title}", let's consider checking if your tags are closed properly. Remember, every structural HTML element requires clear entry and exit markers.`;
      if (userMsg.toLowerCase().includes('hint')) {
        mentorResponse = `Hint: Try structuring your elements inside a main wrapper tag. To support accessibility, use semantic elements like <header>, <nav> or <footer>.`;
      } else if (userMsg.toLowerCase().includes('solution') || userMsg.toLowerCase().includes('code')) {
        mentorResponse = `I cannot reveal the exact solution directly! However, if you look at the elements list, you should wrap your bio paragraphs with <p> tags and titles with <h1>. Check the "Solution" button if you get stuck.`;
      }
      setAiChat(prev => [...prev, { sender: 'mentor', text: mentorResponse }]);
    }, 1000);
  };

  const triggerHint = () => {
    setAiChat(prev => [...prev, { sender: 'student', text: 'Please give me a hint for this task!' }]);
    setTimeout(() => {
      setAiChat(prev => [...prev, { sender: 'mentor', text: `Hint: Make sure the file contains your core wrapper. In index.html, check that you have added the main structure before nesting content.` }]);
    }, 600);
  };

  const formatCode = () => {
    // Basic indentation beautifier
    const lines = codeValue.split('\n');
    let indent = 0;
    const formatted = lines.map(line => {
      let trimmed = line.trim();
      if (trimmed.startsWith('</') || trimmed.startsWith('}')) indent = Math.max(0, indent - 2);
      const output = ' '.repeat(indent) + trimmed;
      if ((trimmed.startsWith('<') && !trimmed.startsWith('</') && !trimmed.endsWith('/>') && !trimmed.includes('</')) || trimmed.endsWith('{')) {
        indent += 2;
      }
      return output;
    }).join('\n');
    setCodeValue(formatted);
    setConsoleLogs(prev => [...prev, 'Formatted active file content.']);
  };

  const submitMilestone = () => {
    alert('Congratulations! Milestone completed successfully. +150 XP awarded!');
    navigate('/dashboard');
  };

  return (
    <StyledWorkspace>
      {/* Workspace Header */}
      <div className="workspace-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>← Dashboard</button>
        <span className="project-title">{tech} / {project?.title} - {milestone.title}</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '10px' }}>
          <button className="action-btn format" onClick={formatCode}>Beautify</button>
          <button className="action-btn run" onClick={handleRunCode}>Run Code</button>
          <button className="action-btn solution-btn" onClick={() => setShowSolution(!showSolution)}>
            {showSolution ? 'Hide Solution' : 'View Solution'}
          </button>
          <button className="action-btn submit" onClick={submitMilestone}>Submit Milestone</button>
        </div>
      </div>

      {/* Workspace Main Panels */}
      <div className="panels-container">
        
        {/* Left Column: Lesson Instructions */}
        <div className="panel instruction-panel">
          <div className="panel-header">📝 Instructions & Objectives</div>
          <div className="panel-body">
            <h3>{milestone.title}</h3>
            <p>{milestone.desc}</p>
            <div className="objectives-box">
              <strong>Objectives:</strong>
              <ul>
                <li>Create container semantic structural tags.</li>
                <li>Add profile card elements or styles.</li>
                <li>Link styles.css cleanly inside index.html.</li>
              </ul>
            </div>
            <div className="practice-box">
              <strong>Practice Task:</strong>
              <p style={{ fontSize: '0.85rem', margin: '5px 0' }}>Write an inline header that says welcome and style it with color variables.</p>
            </div>
          </div>
        </div>

        {/* Center Column: Files & Code Editor */}
        <div className="panel editor-panel">
          <div className="panel-header flex-header">
            <span>💻 Code Editor</span>
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
                <h4>Solution Reference Code:</h4>
                <pre>
                  {activeFile === 'index.html' && `<!-- Solution index.html -->
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <h1>Welcome to Fullstack Learning</h1>
  </header>
  <main>
    <p>Success starts here.</p>
  </main>
</body>
</html>`}
                  {activeFile === 'styles.css' && `/* Solution styles.css */
body {
  background-color: #0f172a;
  color: #f8fafc;
}`}
                  {activeFile === 'script.js' && `// Solution script.js
console.log("Solution code loaded successfully.");`}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Preview & AI Mentor Chat */}
        <div className="panel preview-ai-panel">
          <div className="preview-split">
            {/* Live Preview */}
            <div className="sub-panel preview-sub">
              <div className="panel-header">👀 Live Preview & Console</div>
              <div className="preview-viewport">
                {previewSrc ? (
                  <iframe 
                    title="Live Preview Output"
                    srcDoc={previewSrc}
                    sandbox="allow-scripts"
                    className="preview-iframe"
                  />
                ) : (
                  <div className="empty-preview">Click "Run Code" to view interactive rendering outputs.</div>
                )}
              </div>
              <div className="terminal-logs">
                {consoleLogs.map((log, idx) => (
                  <div key={idx} className="log-line">{log}</div>
                ))}
              </div>
            </div>

            {/* AI Mentor chatbot */}
            <div className="sub-panel ai-sub">
              <div className="panel-header flex-header">
                <span>🤖 AI Mentor</span>
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
                  placeholder="Ask the AI mentor for advice or debugging help..."
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  className="chat-input"
                />
                <button type="submit" className="chat-submit-btn">Ask</button>
              </form>
            </div>
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
  background: #09090c;
  color: #fff;
  font-family: system-ui, sans-serif;

  .workspace-header {
    background: #111116;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding: 10px 20px;
    display: flex;
    align-items: center;
    gap: 15px;
    z-index: 10;
  }

  .back-btn {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #fff;
    padding: 6px 14px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.85rem;
    height: auto;
    position: static;
    transform: none;
    box-shadow: none;
  }

  .project-title {
    font-weight: 600;
    font-size: 0.95rem;
    color: #ccc;
  }

  .action-btn {
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    color: white;
    cursor: pointer;
    font-weight: bold;
    font-size: 0.85rem;
    height: auto;
    min-width: 0;
    position: static;
    transform: none;
    box-shadow: none;
  }

  .action-btn.format { background: rgba(255, 255, 255, 0.1); }
  .action-btn.run { background: #00d2ff; color: #000; }
  .action-btn.solution-btn { background: #af40ff; }
  .action-btn.submit { background: #10ac84; }

  .panels-container {
    display: grid;
    grid-template-columns: 300px 1fr 400px;
    flex: 1;
    overflow: hidden;
  }

  @media (max-width: 1200px) {
    .panels-container {
      grid-template-columns: 240px 1fr 320px;
    }
  }

  .panel {
    display: flex;
    flex-direction: column;
    border-right: 1px solid rgba(255, 255, 255, 0.08);
    overflow: hidden;
  }

  .panel-header {
    background: rgba(255, 255, 255, 0.02);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding: 10px 15px;
    font-size: 0.8rem;
    font-weight: bold;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .flex-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .panel-body {
    padding: 20px;
    overflow-y: auto;
    flex: 1;
  }

  .panel-body h3 {
    margin-top: 0;
    font-size: 1.25rem;
  }

  .panel-body p {
    color: #ccc;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .objectives-box, .practice-box {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 6px;
    padding: 15px;
    margin-top: 20px;
  }

  .objectives-box ul {
    margin: 10px 0 0 0;
    padding-left: 20px;
    font-size: 0.85rem;
    line-height: 1.6;
    color: #ccc;
  }

  /* Editor Panel */
  .editor-panel {
    background: #0d0d11;
  }

  .file-tabs {
    display: flex;
    gap: 5px;
  }

  .file-tab {
    background: none;
    border: none;
    color: #aaa;
    font-size: 0.75rem;
    cursor: pointer;
    padding: 4px 10px;
    border-radius: 3px;
    position: static;
    transform: none;
    height: auto;
    min-width: 0;
    box-shadow: none;
    font-weight: 500;
  }

  .file-tab.active {
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
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
    color: #f8fafc;
    font-family: 'Courier New', Courier, monospace;
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
    border-left: 3px solid #af40ff;
  }

  .solution-overlay h4 {
    margin-top: 0;
    color: #af40ff;
  }

  .solution-overlay pre {
    color: #ccc;
    font-family: monospace;
    font-size: 0.85rem;
    line-height: 1.4;
  }

  /* Right column: Split Preview / AI Mentor */
  .preview-ai-panel {
    border-right: none;
  }

  .preview-split {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .sub-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .preview-sub {
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .preview-viewport {
    flex: 1;
    background: #1e1e24;
    position: relative;
  }

  .preview-iframe {
    width: 100%;
    height: 100%;
    border: none;
    background: #fff;
  }

  .empty-preview {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    text-align: center;
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
    color: #10ac84;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .log-line {
    margin-bottom: 4px;
  }

  /* AI Chat Area */
  .chat-history {
    flex: 1;
    overflow-y: auto;
    padding: 15px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    background: #111116;
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
    border: 1px solid rgba(255, 255, 255, 0.08);
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
    color: #666;
    display: block;
    margin-bottom: 4px;
  }

  .chat-bubble p {
    margin: 0;
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
    background: #00d2ff;
    color: #000;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    font-weight: bold;
    cursor: pointer;
    font-size: 0.85rem;
    height: auto;
    position: static;
    transform: none;
    box-shadow: none;
  }

  .hint-btn {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    color: #fff;
    border-radius: 3px;
    font-size: 0.75rem;
    padding: 4px 8px;
    cursor: pointer;
    font-weight: bold;
    height: auto;
    position: static;
    transform: none;
    box-shadow: none;
  }
`;

export default Workspace;
