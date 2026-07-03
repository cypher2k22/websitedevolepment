// src/curriculumData.js

export const PROJECTS_CURRICULUM = [
  {
    id: 'calculator-ui',
    title: 'JavaScript Calculator UI',
    course: 'Frontend Development',
    technology: 'JavaScript',
    difficulty: 'Beginner',
    estTime: '3-4 hours',
    icon: '⚡',
    prereqId: null, // First project is unlocked
    objective: 'Create a fully functional mathematical calculator with support for keyboard entry, fluid animations, and overflow boundaries.',
    requirements: [
      { id: 'req1', text: 'Implement key event listeners for digit pads' },
      { id: 'req2', text: 'Construct safe parsing evaluation of equations' },
      { id: 'req3', text: 'Establish keyboard keys binding handlers' },
      { id: 'req4', text: 'Configure warning state on division by zero' }
    ],
    starterCode: {
      'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Calculator Project</title>
  <style>
    body { background: #09090b; color: #fff; font-family: system-ui; display: flex; justify-content: center; align-items: center; min-height: 80vh; margin: 0; }
    .calc { background: #18181b; border: 1px solid #27272a; padding: 20px; border-radius: 12px; width: 280px; }
    .display { background: #09090b; padding: 15px; border-radius: 6px; text-align: right; font-size: 1.5rem; margin-bottom: 15px; border: 1px solid #27272a; min-height: 35px; }
    .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
    button { background: #27272a; border: 1px solid #3f3f46; color: #fff; padding: 15px; font-size: 1.1rem; border-radius: 6px; cursor: pointer; transition: all 0.15s; }
    button:hover { background: #3f3f46; border-color: #6366f1; }
    button.op { background: #6366f1; border-color: #4f46e5; }
    button.op:hover { background: #4f46e5; }
  </style>
</head>
<body>
  <div className="calc">
    <div className="display" id="screen">0</div>
    <div className="grid">
      <button onclick="press('7')">7</button>
      <button onclick="press('8')">8</button>
      <button onclick="press('9')">9</button>
      <button onclick="press('/')" className="op">/</button>
      <button onclick="press('4')">4</button>
      <button onclick="press('5')">5</button>
      <button onclick="press('6')">6</button>
      <button onclick="press('*')" className="op">*</button>
      <button onclick="press('1')">1</button>
      <button onclick="press('2')">2</button>
      <button onclick="press('3')">3</button>
      <button onclick="press('-')" className="op">-</button>
      <button onclick="press('0')">0</button>
      <button onclick="clearDisplay()">C</button>
      <button onclick="calculate()" className="op">=</button>
      <button onclick="press('+')" className="op">+</button>
    </div>
  </div>
</body>
</html>`,
      'styles.css': `/* Custom overrides for the Calculator */`,
      'script.js': `// Input state tracker
let expression = '';

function press(val) {
  expression += val;
  document.getElementById('screen').innerText = expression;
}

function clearDisplay() {
  expression = '';
  document.getElementById('screen').innerText = '0';
}

function calculate() {
  try {
    const result = eval(expression);
    document.getElementById('screen').innerText = result;
    expression = result.toString();
  } catch (err) {
    document.getElementById('screen').innerText = 'Error';
    expression = '';
  }
}`
    }
  },
  {
    id: 'supabase-landing',
    title: 'Supabase SaaS Landing Page',
    course: 'Frontend Development',
    technology: 'React',
    difficulty: 'Intermediate',
    estTime: '6-8 hours',
    icon: '⚡',
    prereqId: 'calculator-ui', // Locked until calculator is complete
    objective: 'Build an ultra-modern, interactive marketing landing page with glassmorphic cards, testimonial grids, and dark-theme configurations.',
    requirements: [
      { id: 'req1', text: 'Create responsive navbar with hamburger controls' },
      { id: 'req2', text: 'Design glassmorphic feature panels using CSS filters' },
      { id: 'req3', text: 'Implement pricing tier cards with switchable billing cycles' },
      { id: 'req4', text: 'Configure email newsletter form verification logic' }
    ],
    starterCode: {
      'index.html': `<!DOCTYPE html>
<html>
<head>
  <title>Supabase SaaS</title>
  <style>
    body { background: #0f0f12; color: #fff; font-family: sans-serif; margin: 0; }
    .hero { text-align: center; padding: 80px 20px; }
    .features { display: flex; justify-content: center; gap: 20px; padding: 40px; }
    .card { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 25px; width: 280px; }
  </style>
</head>
<body>
  <div className="hero">
    <h1>Database for Modern SaaS</h1>
    <p>Scale without configuration bottlenecks.</p>
  </div>
  <div className="features">
    <div className="card"><h3>⚡ Realtime</h3><p>Sync database keys live.</p></div>
    <div className="card"><h3>🛡️ Auth</h3><p>JWT verification out of the box.</p></div>
  </div>
</body>
</html>`,
      'styles.css': `/* SaaS styling directives */`,
      'script.js': `console.log("SaaS Page Script Loaded.");`
    }
  },
  {
    id: 'ai-prompt-studio',
    title: 'AI Prompt Studio Interface',
    course: 'AI & Data Integration',
    technology: 'FastAPI',
    difficulty: 'Advanced',
    estTime: '12-15 hours',
    icon: '🤖',
    prereqId: 'supabase-landing', // Locked until landing page is complete
    objective: 'Design an AI Prompt compiler where developers can run prompt templates, save presets, and inspect latency outputs.',
    requirements: [
      { id: 'req1', text: 'Build three-column prompt testing panels' },
      { id: 'req2', text: 'Integrate prompt latency metric badges' },
      { id: 'req3', text: 'Implement API key storage in localized memory' },
      { id: 'req4', text: 'Configure parameter slider controls (temperature, top-p)' }
    ],
    starterCode: {
      'index.html': `<!DOCTYPE html>
<html>
<head>
  <title>AI Prompt Studio</title>
  <style>
    body { background: #09090b; color: #fff; font-family: system-ui; padding: 30px; }
    .studio-container { display: grid; grid-template-columns: 280px 1fr; gap: 20px; }
  </style>
</head>
<body>
  <div className="studio-container">
    <div><h3>Controls</h3></div>
    <div><h3>Prompt Workspace</h3></div>
  </div>
</body>
</html>`,
      'styles.css': `/* AI controls override definitions */`,
      'script.js': `console.log("Prompt studio ready.");`
    }
  }
];
