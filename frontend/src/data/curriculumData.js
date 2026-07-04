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
  },

  // TypeScript Course
  {
    id: 'ts-typing',
    course: 'TypeScript',
    title: 'Type Safety System',
    difficulty: 'Intermediate',
    estTime: '4 hours',
    icon: '📘',
    prereqId: null,
    objective: 'Convert a dynamic JavaScript calculator config to static interfaces and generics.',
    requirements: [
      { id: 'ts1', text: 'Create Calculator interfaces definitions' },
      { id: 'ts2', text: 'Export generic return structures' }
    ],
    milestones: [
      { id: 'm1', title: 'Type Mapping', desc: 'Define key layouts typing and error guards.' }
    ],
    starterCode: {
      'index.html': '<h2>TS Studio</h2>',
      'styles.css': '',
      'script.js': 'interface Config { label: string; }'
    }
  },

  // Git Course
  {
    id: 'git-cli',
    course: 'Git',
    title: 'Git Version Control CLI',
    difficulty: 'Beginner',
    estTime: '2 hours',
    icon: '🐙',
    prereqId: null,
    objective: 'Simulate git repositories initialization, commits creation, and branches merging.',
    requirements: [
      { id: 'g1', text: 'Run git init and configure local email commits' }
    ],
    milestones: [
      { id: 'm1', title: 'Local Commits', desc: 'Commit files to git HEAD.' }
    ],
    starterCode: {
      'index.html': '<h2>Git CLI Simulator</h2>',
      'styles.css': '',
      'script.js': 'console.log("Git ready");'
    }
  },

  // GitHub Course
  {
    id: 'github-pages',
    course: 'GitHub',
    title: 'Actions CI/CD Workflows',
    difficulty: 'Intermediate',
    estTime: '3 hours',
    icon: '🐱',
    prereqId: 'git-cli',
    objective: 'Create GitHub Pages workflows triggering test checks on commits push events.',
    requirements: [
      { id: 'gh1', text: 'Map jobs actions scripts steps' }
    ],
    milestones: [
      { id: 'm1', title: 'CI Pipeline', desc: 'Configure runner actions triggers.' }
    ],
    starterCode: {
      'index.html': '<h2>CI Dashboard</h2>',
      'styles.css': '',
      'script.js': ''
    }
  },

  // Docker Course
  {
    id: 'docker-container',
    course: 'Docker',
    title: 'Dockerizing Web Apps',
    difficulty: 'Intermediate',
    estTime: '5 hours',
    icon: '🐳',
    prereqId: null,
    objective: 'Create a multi-stage Dockerfile bundling Node static server builds.',
    requirements: [
      { id: 'd1', text: 'Define standard Dockerfile base commands' }
    ],
    milestones: [
      { id: 'm1', title: 'Image Builds', desc: 'Run containers layer caches optimizations.' }
    ],
    starterCode: {
      'index.html': '<h2>Docker Console</h2>',
      'styles.css': '',
      'script.js': 'FROM node:alpine'
    }
  },

  // Express Course
  {
    id: 'express-server',
    course: 'Express',
    title: 'Backend Middleware Gateway',
    difficulty: 'Intermediate',
    estTime: '4 hours',
    icon: '⚡',
    prereqId: 'node-api',
    objective: 'Implement custom logging and authorization routers in Express.',
    requirements: [
      { id: 'ex1', text: 'Define request logger intercepts' }
    ],
    milestones: [
      { id: 'm1', title: 'Middleware Chains', desc: 'Assemble route pipeline handlers.' }
    ],
    starterCode: {
      'index.html': '<h2>Express Router</h2>',
      'styles.css': '',
      'script.js': ''
    }
  },

  // Next.js Course
  {
    id: 'nextjs-app',
    course: 'Next.js',
    title: 'SSR Metric Dashboard App',
    difficulty: 'Advanced',
    estTime: '8 hours',
    icon: '▲',
    prereqId: 'react-dashboard',
    objective: 'Configure server components loading dynamic metrics with routing files.',
    requirements: [
      { id: 'nx1', text: 'Build Next.js layouts route trees' }
    ],
    milestones: [
      { id: 'm1', title: 'SSR Loading', desc: 'Generate static site caching fallbacks.' }
    ],
    starterCode: {
      'index.html': '<h2>Next.js Viewport</h2>',
      'styles.css': '',
      'script.js': ''
    }
  },

  // Python Course
  {
    id: 'python-scripts',
    course: 'Python',
    title: 'Data Scraping Engine',
    difficulty: 'Beginner',
    estTime: '6 hours',
    icon: '🐍',
    prereqId: null,
    objective: 'Implement page requests scripts parsing tags with BeautifulSoup.',
    requirements: [
      { id: 'p1', text: 'Create html parser calls' }
    ],
    milestones: [
      { id: 'm1', title: 'Scripting Parser', desc: 'Collect target link arrays.' }
    ],
    starterCode: {
      'index.html': '<h2>Python Terminal</h2>',
      'styles.css': '',
      'script.js': 'import urllib.request'
    }
  }
];
