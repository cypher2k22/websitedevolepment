import express from 'express';
import Progress from '../models/Progress.js';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get current progress tracking stats
router.get('/', auth, async (req, res) => {
  try {
    const progressList = await Progress.find({ userId: req.user.id });
    res.json(progressList);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Update checkpoint/milestone progress
router.post('/update', auth, async (req, res) => {
  const { projectId, tech, progressPercentage, lastCompletedMilestone } = req.body;
  try {
    let progress = await Progress.findOne({ userId: req.user.id, projectId });
    if (!progress) {
      progress = new Progress({ userId: req.user.id, projectId, tech });
    }

    progress.progressPercentage = progressPercentage;
    progress.lastCompletedMilestone = lastCompletedMilestone;
    progress.updatedAt = Date.now();
    await progress.save();

    // Award user XP & coins for progress activity
    const user = await User.findById(req.user.id);
    if (user) {
      user.xp += 50;
      user.coins += 10;
      if (progressPercentage === 100 && !user.completedProjects.includes(projectId)) {
        user.completedProjects.push(projectId);
        user.xp += 200; // Extra bonus XP for completion
      }
      await user.save();
    }

    res.json({ progress, userXP: user?.xp, userCoins: user?.coins });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

export default router;
