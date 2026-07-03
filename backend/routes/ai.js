import express from 'express';
import auth from '../middleware/auth.js';

const router = express.Router();

// Interact with AI Mentor
router.post('/mentor', auth, async (req, res) => {
  const { question, milestoneTitle, currentCode } = req.body;

  try {
    // Simulated AI response generator conforming to vision instructions
    let answer = `Interesting question! Let's think about how the layout flows. For the "${milestoneTitle}" milestone, you should double-check that your attributes align correctly.`;
    
    if (question.toLowerCase().includes('hint')) {
      answer = `Here is a hint: Make sure to nest all structural blocks in semantic containers like <main> or <article>. This boosts overall document accessibility (A11y).`;
    } else if (question.toLowerCase().includes('bug') || question.toLowerCase().includes('error')) {
      answer = `To debug, open your browser Console tab. If you see a syntax mismatch, locate the exact line where a closing quote or parenthesis might be missing.`;
    } else if (question.toLowerCase().includes('solution') || question.toLowerCase().includes('code')) {
      answer = `I cannot reveal the exact solution code directly, as the best way to learn is by typing it out. Try writing elements first, and let me review your structure!`;
    }

    res.json({ answer });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

export default router;
