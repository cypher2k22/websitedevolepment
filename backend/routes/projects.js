import express from 'express';
import Project from '../models/Project.js';

const router = express.Router();

// Get all curriculum projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({});
    res.json(projects);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Seed projects curriculum
router.get('/seed', async (req, res) => {
  try {
    await Project.deleteMany({});
    
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

    await Project.insertMany(seedData);
    res.json({ msg: 'Database curriculum seeded successfully!' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

export default router;
