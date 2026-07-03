// src/curriculumData.js

export const PROJECTS_CURRICULUM = [
  // HTML Course
  {
    id: 'html-calculator',
    course: 'HTML',
    title: 'Calculator UI Layout',
    difficulty: 'Beginner',
    estTime: '2 hours',
    icon: '🌐',
    prereqId: null,
    objective: 'Build the semantic HTML structure of a pocket calculator with grid areas and accessible input tags.',
    requirements: [
      { id: 'h1', text: 'Use semantic structure tags' },
      { id: 'h2', text: 'Implement key pads buttons' }
    ],
    milestones: [
      { id: 'm1', title: 'Layout Setup', desc: 'Initialize semantic HTML structure and buttons grid.' }
    ],
    starterCode: {
      'index.html': '<h2>Calculator Layout</h2>',
      'styles.css': '',
      'script.js': ''
    }
  },
  {
    id: 'html-portfolio',
    course: 'HTML',
    title: 'Personal Portfolio Page',
    difficulty: 'Beginner',
    estTime: '3 hours',
    icon: '🌐',
    prereqId: 'html-calculator',
    objective: 'Create a developer portfolio landing page with links to bio details.',
    requirements: [
      { id: 'h3', text: 'Map navigation anchor links' }
    ],
    milestones: [
      { id: 'm1', title: 'Setup Portfolio', desc: 'Create bio sections and project list tags.' }
    ],
    starterCode: {
      'index.html': '<h2>My Portfolio</h2>',
      'styles.css': '',
      'script.js': ''
    }
  },

  // CSS Course
  {
    id: 'css-styling',
    course: 'CSS',
    title: 'Card Grid Styling',
    difficulty: 'Beginner',
    estTime: '3 hours',
    icon: '🎨',
    prereqId: null,
    objective: 'Create glowing glassmorphic panels and fluid flex boxes.',
    requirements: [
      { id: 'c1', text: 'Add custom border-radius properties' }
    ],
    milestones: [
      { id: 'm1', title: 'Interactive Grids', desc: 'Build flex alignment and border shadows.' }
    ],
    starterCode: {
      'index.html': '<h2>Visual Cards</h2>',
      'styles.css': '',
      'script.js': ''
    }
  },

  // JavaScript Course
  {
    id: 'js-todo',
    course: 'JavaScript',
    title: 'Interactive Todo App',
    difficulty: 'Intermediate',
    estTime: '4 hours',
    icon: '⚡',
    prereqId: null,
    objective: 'Build list items filters and persistent browser local storage.',
    requirements: [
      { id: 'j1', text: 'Add event listener registers' }
    ],
    milestones: [
      { id: 'm1', title: 'State tracking', desc: 'Map dynamic array list rendering.' }
    ],
    starterCode: {
      'index.html': '<h2>Todo List</h2>',
      'styles.css': '',
      'script.js': ''
    }
  },

  // React Course
  {
    id: 'react-dashboard',
    course: 'React',
    title: 'SaaS Metrics Dashboard',
    difficulty: 'Intermediate',
    estTime: '6 hours',
    icon: '⚛️',
    prereqId: null,
    objective: 'Create user metrics boards with hooks and state managers.',
    requirements: [
      { id: 'r1', text: 'Implement context state mappings' }
    ],
    milestones: [
      { id: 'm1', title: 'State Hooks', desc: 'Map progress stats.' }
    ],
    starterCode: {
      'index.html': '<h2>Metrics Board</h2>',
      'styles.css': '',
      'script.js': ''
    }
  },

  // Node.js Course
  {
    id: 'node-api',
    course: 'Node.js',
    title: 'REST API Microservice',
    difficulty: 'Advanced',
    estTime: '8 hours',
    icon: '🟢',
    prereqId: null,
    objective: 'Configure Express endpoints routing requests to databases.',
    requirements: [
      { id: 'n1', text: 'Implement route endpoint handlers' }
    ],
    milestones: [
      { id: 'm1', title: 'API Setup', desc: 'Connect Express server controllers.' }
    ],
    starterCode: {
      'index.html': '<h2>Express Server</h2>',
      'styles.css': '',
      'script.js': ''
    }
  },

  // MongoDB Course
  {
    id: 'mongo-crud',
    course: 'MongoDB',
    title: 'Document Storage DB',
    difficulty: 'Advanced',
    estTime: '8 hours',
    icon: '🍃',
    prereqId: null,
    objective: 'Define Mongoose schemas and run filters operations.',
    requirements: [
      { id: 'm1', text: 'Write database models' }
    ],
    milestones: [
      { id: 'm1', title: 'Mongoose Connect', desc: 'Perform aggregation checks.' }
    ],
    starterCode: {
      'index.html': '<h2>Database Console</h2>',
      'styles.css': '',
      'script.js': ''
    }
  },

  // MySQL Course
  {
    id: 'mysql-relational',
    course: 'MySQL',
    title: 'Relational Schema Design',
    difficulty: 'Advanced',
    estTime: '10 hours',
    icon: '🐬',
    prereqId: null,
    objective: 'Write relational tables, foreign key bindings, and joins.',
    requirements: [
      { id: 'q1', text: 'Configure database tables' }
    ],
    milestones: [
      { id: 'm1', title: 'SQL Queries', desc: 'Execute select parameters joins.' }
    ],
    starterCode: {
      'index.html': '<h2>SQL CLI Terminal</h2>',
      'styles.css': '',
      'script.js': ''
    }
  },

  // FastAPI Course
  {
    id: 'fastapi-backend',
    course: 'FastAPI',
    title: 'Asynchronous API Studio',
    difficulty: 'Advanced',
    estTime: '10 hours',
    icon: '🚀',
    prereqId: null,
    objective: 'Deploy async Python endpoints and auto-generate Swagger.',
    requirements: [
      { id: 'f1', text: 'Build FastAPI routes parameters' }
    ],
    milestones: [
      { id: 'm1', title: 'Swagger docs', desc: 'Confirm status returns code.' }
    ],
    starterCode: {
      'index.html': '<h2>FastAPI Server</h2>',
      'styles.css': '',
      'script.js': ''
    }
  },

  // React Native Course
  {
    id: 'native-mobile',
    course: 'React Native',
    title: 'Mobile Task Manager',
    difficulty: 'Advanced',
    estTime: '12 hours',
    icon: '📱',
    prereqId: null,
    objective: 'Build native iOS/Android lists views with touch handlers.',
    requirements: [
      { id: 'rn1', text: 'Define scroll list layout' }
    ],
    milestones: [
      { id: 'm1', title: 'Touch Handlers', desc: 'Bind buttons events on mobile.' }
    ],
    starterCode: {
      'index.html': '<h2>RN Screen</h2>',
      'styles.css': '',
      'script.js': ''
    }
  }
];
