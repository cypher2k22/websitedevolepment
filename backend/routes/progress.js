import express from 'express';
import { query } from '../db/index.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Get current progress tracking stats
router.get('/', auth, async (req, res) => {
  try {
    const progressList = await query(
      `SELECT id, project_id as "projectId", tech, progress_percentage as "progressPercentage", 
              last_completed_milestone as "lastCompletedMilestone", updated_at as "updatedAt"
       FROM progress WHERE user_id = $1`,
      [req.user.id]
    );
    res.json(progressList.rows);
  } catch (err) {
    console.error('Fetch progress error:', err);
    res.status(500).send('Server Error');
  }
});

// Update checkpoint/milestone progress
router.post('/update', auth, async (req, res) => {
  const { projectId, tech, progressPercentage, lastCompletedMilestone } = req.body;
  try {
    // Upsert progress table
    let progressResult = await query(
      `SELECT * FROM progress WHERE user_id = $1 AND project_id = $2`,
      [req.user.id, projectId]
    );

    let progress;
    if (progressResult.rows.length === 0) {
      const insertResult = await query(
        `INSERT INTO progress (user_id, project_id, tech, progress_percentage, last_completed_milestone)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, project_id as "projectId", tech, progress_percentage as "progressPercentage", 
                   last_completed_milestone as "lastCompletedMilestone"`,
        [req.user.id, projectId, tech, progressPercentage, lastCompletedMilestone]
      );
      progress = insertResult.rows[0];
    } else {
      const updateResult = await query(
        `UPDATE progress 
         SET progress_percentage = $1, last_completed_milestone = $2, updated_at = CURRENT_TIMESTAMP
         WHERE user_id = $3 AND project_id = $4
         RETURNING id, project_id as "projectId", tech, progress_percentage as "progressPercentage", 
                   last_completed_milestone as "lastCompletedMilestone"`,
        [progressPercentage, lastCompletedMilestone, req.user.id, projectId]
      );
      progress = updateResult.rows[0];
    }

    // Award user XP & coins for progress activity
    let userResult = await query(
      `SELECT xp, coins, completed_projects as "completedProjects" FROM users WHERE id = $1`,
      [req.user.id]
    );

    let userXP = 0;
    let userCoins = 0;

    if (userResult.rows.length > 0) {
      let { xp, coins, completedProjects } = userResult.rows[0];
      
      // Parse JSON if needed
      let completedProjectsArr = Array.isArray(completedProjects) 
        ? completedProjects 
        : (typeof completedProjects === 'string' ? JSON.parse(completedProjects) : []);

      xp += 50;
      coins += 10;

      if (progressPercentage === 100 && !completedProjectsArr.includes(projectId)) {
        completedProjectsArr.push(projectId);
        xp += 200; // Extra bonus XP for completion
      }

      await query(
        `UPDATE users SET xp = $1, coins = $2, completed_projects = $3 WHERE id = $4`,
        [xp, coins, JSON.stringify(completedProjectsArr), req.user.id]
      );

      userXP = xp;
      userCoins = coins;
    }

    res.json({ progress, userXP, userCoins });
  } catch (err) {
    console.error('Update progress error:', err);
    res.status(500).send('Server Error');
  }
});

export default router;
