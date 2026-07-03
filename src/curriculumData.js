// src/curriculumData.js

export const PROJECTS_CURRICULUM = [
  {
    id: 'fcc-rwd-portfolio',
    course: 'Responsive Web Design',
    title: 'Personal Portfolio Page',
    difficulty: 'Beginner',
    estTime: '3-4 hours',
    icon: '🌐',
    prereqId: null,
    fccReference: 'https://www.freecodecamp.org/learn/responsive-web-design/',
    objective: 'Build a fully responsive developer portfolio showcase containing bio links, feature galleries, contact forms, and custom flex designs.',
    requirements: [
      { id: 'rwd1', text: 'Define a profile landing viewport with nav bars' },
      { id: 'rwd2', text: 'Construct a responsive project grid with absolute tags' },
      { id: 'rwd3', text: 'Add media queries to restructure cards on mobile screens' }
    ],
    starterCode: {
      'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>FCC Responsive Portfolio</title>
  <style>
    body { background: #0f172a; color: #f8fafc; font-family: system-ui, sans-serif; margin: 0; padding: 20px; }
    header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #334155; padding-bottom: 10px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; padding: 40px 0; }
    .card { background: #1e293b; padding: 20px; border-radius: 8px; border: 1px solid #475569; }
  </style>
</head>
<body>
  <header>
    <h2>Developer Portfolio</h2>
    <nav>
      <a href="#projects" style="color: #38bdf8;">Projects</a>
    </nav>
  </header>
  <div className="grid" id="projects">
    <div className="card"><h3>Project 1</h3><p>FCC Landing Page.</p></div>
  </div>
</body>
</html>`,
      'styles.css': `/* CSS Custom Overrides */`,
      'script.js': `console.log("Portfolio online.");`
    }
  },
  {
    id: 'fcc-js-calculator',
    course: 'JavaScript Algorithms and Data Structures',
    title: 'JavaScript Calculator',
    difficulty: 'Intermediate',
    estTime: '6-8 hours',
    icon: '⚡',
    prereqId: 'fcc-rwd-portfolio',
    fccReference: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/',
    objective: 'Create a math expression evaluator displaying calculations, supporting clear resets, and validation limits.',
    requirements: [
      { id: 'js1', text: 'Create event listeners binding buttons to values' },
      { id: 'js2', text: 'Process calculation evaluation safely in script.js' },
      { id: 'js3', text: 'Add decimal limits check logic' }
    ],
    starterCode: {
      'index.html': `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: #09090b; color: #fff; text-align: center; font-family: monospace; }
  </style>
</head>
<body>
  <h2>JS Calculator</h2>
  <div id="display">0</div>
</body>
</html>`,
      'styles.css': ``,
      'script.js': `console.log("Calculator loaded.");`
    }
  },
  {
    id: 'fcc-react-quotes',
    course: 'Front End Development Libraries (React)',
    title: 'Random Quote Machine',
    difficulty: 'Intermediate',
    estTime: '5-6 hours',
    icon: '⚛️',
    prereqId: 'fcc-js-calculator',
    fccReference: 'https://www.freecodecamp.org/learn/front-end-development-libraries/',
    objective: 'Build quote generators pulling quotes from arrays, rendering animations, and providing Twitter sharing tools.',
    requirements: [
      { id: 'react1', text: 'Render a quote box containing random quotes text' },
      { id: 'react2', text: 'Implement a new-quote trigger button' }
    ],
    starterCode: {
      'index.html': `<!DOCTYPE html>
<html>
<body>
  <div id="quote-box">
    <p id="text">Quotes loading...</p>
    <button id="new-quote">New Quote</button>
  </div>
</body>
</html>`,
      'styles.css': ``,
      'script.js': `console.log("Quotes active.");`
    }
  },
  {
    id: 'fcc-backend-timestamp',
    course: 'Backend Development and APIs (Node/Express)',
    title: 'Timestamp Microservice API',
    difficulty: 'Advanced',
    estTime: '8-10 hours',
    icon: '⚙️',
    prereqId: 'fcc-react-quotes',
    fccReference: 'https://www.freecodecamp.org/learn/back-end-development-and-apis/',
    objective: 'Deploy a server microservice parsing dates into unix and UTC formats returning JSON strings.',
    requirements: [
      { id: 'api1', text: 'Accept dates parameters in API routing paths' },
      { id: 'api2', text: 'Format timestamps returning Unix integer values' }
    ],
    starterCode: {
      'index.html': `<h2>Timestamp API</h2><p>Call /api/:date</p>`,
      'styles.css': ``,
      'script.js': `console.log("API active.");`
    }
  },
  {
    id: 'fcc-db-celestial',
    course: 'Relational Database / SQL',
    title: 'Celestial Database Schema',
    difficulty: 'Advanced',
    estTime: '10-12 hours',
    icon: '🐬',
    prereqId: 'fcc-backend-timestamp',
    fccReference: 'https://www.freecodecamp.org/learn/relational-database/',
    objective: 'Design a celestial relational map containing stars, planets, and moons utilizing SQL tables.',
    requirements: [
      { id: 'sql1', text: 'Design Primary Keys mapping structures' },
      { id: 'sql2', text: 'Define foreign key configurations' }
    ],
    starterCode: {
      'index.html': `<h2>Relational Schema</h2>`,
      'styles.css': ``,
      'script.js': `console.log("SQL Schema setup.");`
    }
  },
  {
    id: 'fcc-python-arithmetic',
    course: 'Python / Scientific Computing',
    title: 'Arithmetic Formatter',
    difficulty: 'Advanced',
    estTime: '6-8 hours',
    icon: '🐍',
    prereqId: 'fcc-db-celestial',
    fccReference: 'https://www.freecodecamp.org/learn/scientific-computing-with-python/',
    objective: 'Implement terminal formatters arranging math operations vertically in lines.',
    requirements: [
      { id: 'py1', text: 'Construct string formatter layouts' },
      { id: 'py2', text: 'Add limits check checks for operations count' }
    ],
    starterCode: {
      'index.html': `<h2>Formatter Studio</h2>`,
      'styles.css': ``,
      'script.js': `console.log("Python formatter ready.");`
    }
  }
];
