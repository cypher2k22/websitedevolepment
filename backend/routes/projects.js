import express from 'express';
import { query } from '../db/index.js';

const router = express.Router();

const toSlug = (title) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

// Get all curriculum projects along with their milestones
router.get('/', async (req, res) => {
  try {
    const projectsResult = await query('SELECT * FROM projects');
    const milestonesResult = await query('SELECT * FROM milestones');

    const projects = projectsResult.rows.map(p => {
      const milestones = milestonesResult.rows
        .filter(m => m.project_id === p.id)
        .map(m => ({
          id: m.id,
          title: m.title,
          desc: m.desc_text
        }));

      return {
        id: p.id,
        title: p.title,
        description: p.description,
        difficulty: p.difficulty,
        technology: p.technology,
        starterCode: p.starter_code || {},
        milestones
      };
    });

    res.json(projects);
  } catch (err) {
    console.error('Fetch projects error:', err);
    res.status(500).send('Server Error');
  }
});

// Seed projects curriculum
router.get('/seed', async (req, res) => {
  try {
    // Clear existing data
    await query('DELETE FROM milestones');
    await query('DELETE FROM projects');
    
    const seedData = [
      {
        title: 'Personal Portfolio Page',
        description: 'Build a semantic page detailing your bio and favorite hobbies.',
        difficulty: 'Beginner',
        technology: 'HTML',
        milestones: [
          { id: 'm1', title: 'HTML Boilerplate & Head', desc: 'Set up doctype, head elements, and metadata.' },
          { id: 'm2', title: 'Semantic Body Structure', desc: 'Implement header, main, section, and footer elements.' },
          { id: 'm3', title: 'Media Integration', desc: 'Add images, profile cards, and external link anchors.' }
        ]
      },
      {
        title: 'Glassmorphic Card',
        description: 'Design an elegant blurred card with gradients.',
        difficulty: 'Beginner',
        technology: 'CSS',
        milestones: [
          { id: 'm1', title: 'Linear Backgrounds', desc: 'Create vivid dark background gradients.' },
          { id: 'm2', title: 'Backdrop-filter Glass', desc: 'Apply webkit blur effects and high contrast borders.' }
        ]
      },
      {
        title: 'Interactive Calculator',
        description: 'Implement calculations, input registers, and key validations.',
        difficulty: 'Beginner',
        technology: 'JavaScript',
        milestones: [
          { id: 'm1', title: 'Event Bindings', desc: 'Bind event click listeners to pad buttons.' },
          { id: 'm2', title: 'Evaluation Engine', desc: 'Process mathematical sequences safely.' }
        ]
      }
    ];

    for (const project of seedData) {
      const id = toSlug(project.title);
      const starterCode = {
        'index.html': `<!-- Starter code for ${project.title} -->`,
        'styles.css': `/* Styling for ${project.title} */`,
        'script.js': `// Script for ${project.title}`
      };

      await query(
        `INSERT INTO projects (id, title, description, difficulty, technology, starter_code) 
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [id, project.title, project.description, project.difficulty, project.technology, JSON.stringify(starterCode)]
      );

      for (const milestone of project.milestones) {
        await query(
          `INSERT INTO milestones (id, project_id, title, desc_text) 
           VALUES ($1, $2, $3, $4)`,
          [milestone.id, id, milestone.title, milestone.desc]
        );
      }
    }

    res.json({ msg: 'Database curriculum seeded successfully!' });
  } catch (err) {
    console.error('Seed projects error:', err);
    res.status(500).send('Server Error');
  }
});

export default router;
