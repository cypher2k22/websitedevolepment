// src/curriculumData.js

export const LEARNING_PATHS = {
  HTML: {
    title: 'HTML Mastery',
    icon: '🌐',
    description: 'Learn to structure web pages using semantic markup and best practices.',
    levels: {
      Beginner: [
        {
          id: 'html-p1',
          title: 'Personal Profile Page',
          description: 'Build a semantic page detailing your bio and favorite hobbies.',
          milestones: [
            { id: 'm1', title: 'HTML Boilerplate & Head', desc: 'Set up doctype, head elements, and metadata.' },
            { id: 'm2', title: 'Semantic Body Structure', desc: 'Implement header, main, section, and footer elements.' },
            { id: 'm3', title: 'Media Integration', desc: 'Add images, profile cards, and external link anchors.' }
          ]
        },
        {
          id: 'html-p2',
          title: 'Registration Form',
          description: 'Create an accessible registration form with field validation.',
          milestones: [
            { id: 'm1', title: 'Form Element setup', desc: 'Build form container, submit buttons, and method properties.' },
            { id: 'm2', title: 'Inputs & Labels', desc: 'Map names, emails, dates, and radio inputs cleanly.' }
          ]
        }
      ],
      Intermediate: [
        {
          id: 'html-p3',
          title: 'Travel Agency Website',
          description: 'Construct a multi-section landing portal for travel packages.',
          milestones: [
            { id: 'm1', title: 'Navigation grid', desc: 'Map section destinations and semantic links.' }
          ]
        }
      ],
      Advanced: [
        {
          id: 'html-p4',
          title: 'Interactive Calculator Layout',
          description: 'Set up grid structures, aria-labels, and custom symbols representation.',
          milestones: [
            { id: 'm1', title: 'Accessibility grid', desc: 'Apply aria tags and button keys layout.' }
          ]
        }
      ]
    }
  },
  CSS: {
    title: 'CSS Styling & Layouts',
    icon: '🎨',
    description: 'Design beautiful, responsive pages with modern Flexbox, Grid, and animations.',
    levels: {
      Beginner: [
        {
          id: 'css-p1',
          title: 'Glassmorphic Card',
          description: 'Design an elegant blurred card with gradients.',
          milestones: [
            { id: 'm1', title: 'Linear Backgrounds', desc: 'Create vivid dark background gradients.' },
            { id: 'm2', title: 'Backdrop-filter Glass', desc: 'Apply webkit blur effects and high contrast borders.' }
          ]
        }
      ],
      Intermediate: [
        {
          id: 'css-p2',
          title: 'Responsive Dashboard grid',
          description: 'Build a dashboard that collapses fluidly on mobile.',
          milestones: [
            { id: 'm1', title: 'CSS Grid template', desc: 'Configure auto-fit grids.' }
          ]
        }
      ],
      Advanced: [
        {
          id: 'css-p3',
          title: 'CS2 Printstream Theme Animation',
          description: 'Construct complex conics and particle debris sweeps.',
          milestones: [
            { id: 'm1', title: 'Keyframe sweeps', desc: 'Animate conics and translation drift.' }
          ]
        }
      ]
    }
  },
  JavaScript: {
    title: 'Core JavaScript Engine',
    icon: '⚡',
    description: 'Manipulate DOM, handle events, manage async requests, and build web logic.',
    levels: {
      Beginner: [
        {
          id: 'js-p1',
          title: 'Interactive Calculator',
          description: 'Implement calculations, input registers, and key validations.',
          milestones: [
            { id: 'm1', title: 'Event Bindings', desc: 'Bind event click listeners to pad buttons.' },
            { id: 'm2', title: 'Evaluation Engine', desc: 'Process mathematical sequences safely.' }
          ]
        }
      ],
      Intermediate: [
        {
          id: 'js-p2',
          title: 'Weather Application',
          description: 'Fetch real-time data from weather web APIs.',
          milestones: [
            { id: 'm1', title: 'Fetch promises', desc: 'Integrate API keys and handle promise rejections.' }
          ]
        }
      ],
      Advanced: [
        {
          id: 'js-p3',
          title: 'Music Player Engine',
          description: 'Manage HTML5 audio stream instances and progress scrubbers.',
          milestones: [
            { id: 'm1', title: 'Audio events', desc: 'Sync timelines and progress bars.' }
          ]
        }
      ]
    }
  },
  TypeScript: {
    title: 'Strict TypeScript Types',
    icon: '🛡️',
    description: 'Enforce type safety, interfaces, union types, and generic structures.',
    levels: { Beginner: [], Intermediate: [], Advanced: [] }
  },
  React: {
    title: 'React Components',
    icon: '⚛️',
    description: 'Build single-page web applications with components, hooks, and context APIs.',
    levels: {
      Beginner: [
        {
          id: 'react-p1',
          title: 'Interactive Todo Application',
          description: 'Build lists, toggles, filter states, and persistent local storage.',
          milestones: [
            { id: 'm1', title: 'State Arrays', desc: 'Manage todos list state.' }
          ]
        }
      ],
      Intermediate: [],
      Advanced: []
    }
  },
  'React Native': {
    title: 'React Native Mobile',
    icon: '📱',
    description: 'Build native iOS and Android apps using React components.',
    levels: { Beginner: [], Intermediate: [], Advanced: [] }
  },
  'Node.js': {
    title: 'Node.js Backend',
    icon: '🟢',
    description: 'Process files, manage streams, and execute scripts in backend environments.',
    levels: { Beginner: [], Intermediate: [], Advanced: [] }
  },
  'Express.js': {
    title: 'Express.js Framework',
    icon: '🚂',
    description: 'Route requests, configure middle-wares, and respond with JSON APIs.',
    levels: { Beginner: [], Intermediate: [], Advanced: [] }
  },
  FastAPI: {
    title: 'FastAPI Backend',
    icon: '🚀',
    description: 'Build secure, asynchronous APIs in Python with auto-generated documentation.',
    levels: { Beginner: [], Intermediate: [], Advanced: [] }
  },
  Python: {
    title: 'Python Language',
    icon: '🐍',
    description: 'Learn lists, dicts, generators, object-oriented concepts, and files in Python.',
    levels: { Beginner: [], Intermediate: [], Advanced: [] }
  },
  MongoDB: {
    title: 'MongoDB NoSQL',
    icon: '🍃',
    description: 'Store document structures, filter keys, and run aggregation pipelines.',
    levels: { Beginner: [], Intermediate: [], Advanced: [] }
  },
  MySQL: {
    title: 'MySQL Relational DB',
    icon: '🐬',
    description: 'Define relational models, query keys, and join multiple tables.',
    levels: { Beginner: [], Intermediate: [], Advanced: [] }
  },
  PostgreSQL: {
    title: 'PostgreSQL Advanced',
    icon: '🐘',
    description: 'Leverage transactions, advanced indexes, and JSONB fields in Postgres.',
    levels: { Beginner: [], Intermediate: [], Advanced: [] }
  },
  Git: {
    title: 'Git Version Control',
    icon: '🌿',
    description: 'Track changes, manage commits, branches, merges, and resolve conflicts.',
    levels: { Beginner: [], Intermediate: [], Advanced: [] }
  },
  GitHub: {
    title: 'GitHub Collaboration',
    icon: '🐙',
    description: 'Manage PRs, issues, actions, and projects workflows.',
    levels: { Beginner: [], Intermediate: [], Advanced: [] }
  },
  'REST APIs': {
    title: 'REST API Concepts',
    icon: '📡',
    description: 'Understand status codes, methods, request parameters, and responses.',
    levels: { Beginner: [], Intermediate: [], Advanced: [] }
  },
  Docker: {
    title: 'Docker Containers',
    icon: '🐳',
    description: 'Package apps in virtual containers with Dockerfiles and Docker Compose.',
    levels: { Beginner: [], Intermediate: [], Advanced: [] }
  },
  Firebase: {
    title: 'Firebase Suite',
    icon: '🔥',
    description: 'Connect Firestore, Authentication, Cloud Functions, and Hosting services.',
    levels: { Beginner: [], Intermediate: [], Advanced: [] }
  },
  'Tailwind CSS': {
    title: 'Tailwind CSS styling',
    icon: '🌊',
    description: 'Apply atomic utilities to create layouts rapidly.',
    levels: { Beginner: [], Intermediate: [], Advanced: [] }
  },
  'Next.js': {
    title: 'Next.js React Framework',
    icon: '▲',
    description: 'Implement Server Actions, Server Side Rendering, and App Routing.',
    levels: { Beginner: [], Intermediate: [], Advanced: [] }
  },
  'AI APIs': {
    title: 'AI Integrations',
    icon: '🤖',
    description: 'Incorporate OpenAI, Gemini, and Claude services in fullstack applications.',
    levels: { Beginner: [], Intermediate: [], Advanced: [] }
  },
  'Machine Learning Basics': {
    title: 'Machine Learning Basics',
    icon: '🧠',
    description: 'Understand linear regressions, classification bounds, and dataset models.',
    levels: { Beginner: [], Intermediate: [], Advanced: [] }
  },
  'System Design Basics': {
    title: 'System Design Basics',
    icon: '🏗️',
    description: 'Design CDNs, microservices, caches, and load balancers.',
    levels: { Beginner: [], Intermediate: [], Advanced: [] }
  },
  Deployment: {
    title: 'Cloud Deployment',
    icon: '☁️',
    description: 'Deploy code to Vercel, Netlify, Render, AWS, and DigitalOcean.',
    levels: { Beginner: [], Intermediate: [], Advanced: [] }
  }
};

// Fallback skeleton structure for empty lists to prevent dashboard break
Object.keys(LEARNING_PATHS).forEach((key) => {
  const levels = LEARNING_PATHS[key].levels;
  if (!levels.Beginner || levels.Beginner.length === 0) {
    levels.Beginner = [
      {
        id: `${key.toLowerCase().replace(/[^a-z0-9]/g, '')}-p1`,
        title: `Introductory ${key} Project`,
        description: `Explore fundamentals of ${key} through interactive tasks.`,
        milestones: [
          { id: 'm1', title: 'Environment Config', desc: 'Initialize basic starter files and folder trees.' },
          { id: 'm2', title: 'Key Challenge Task', desc: 'Build the core module and verify compilation results.' }
        ]
      }
    ];
  }
  if (!levels.Intermediate || levels.Intermediate.length === 0) {
    levels.Intermediate = [
      {
        id: `${key.toLowerCase().replace(/[^a-z0-9]/g, '')}-p2`,
        title: `Intermediate ${key} Application`,
        description: `Expand modules, configure bindings, and handle complex patterns in ${key}.`,
        milestones: [
          { id: 'm1', title: 'Advanced integration', desc: 'Link additional dependencies and APIs.' }
        ]
      }
    ];
  }
  if (!levels.Advanced || levels.Advanced.length === 0) {
    levels.Advanced = [
      {
        id: `${key.toLowerCase().replace(/[^a-z0-9]/g, '')}-p3`,
        title: `Advanced ${key} Architecture`,
        description: `Optimize speeds, structures, and systems in ${key}.`,
        milestones: [
          { id: 'm1', title: 'System-level scale', desc: 'Handle stress loads and build final submission build.' }
        ]
      }
    ];
  }
});
