import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../db/index.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let result = await query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length > 0) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const insertResult = await query(
      `INSERT INTO users (name, email, password) 
       VALUES ($1, $2, $3) RETURNING id, name, email`,
      [name, email, hashedPassword]
    );
    const user = insertResult.rows[0];

    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'super_secret_codejourney_key_1298471',
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
      }
    );
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).send('Server Error');
  }
});

// Login User
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let result = await query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'super_secret_codejourney_key_1298471',
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
      }
    );
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Server Error');
  }
});

// Social Auth (Google / GitHub)
router.post('/social-auth', async (req, res) => {
  const { name, email, provider } = req.body;
  try {
    let result = await query('SELECT * FROM users WHERE email = $1', [email]);
    let user = result.rows[0];

    if (!user) {
      const dummyPassword = await bcrypt.hash(`social_auth_${provider}_${Math.random()}`, 10);
      const insertResult = await query(
        `INSERT INTO users (name, email, password, badges) 
         VALUES ($1, $2, $3, $4) RETURNING id, name, email, xp, level, streak, coins, badges, completed_projects as "completedProjects"`,
        [name, email, dummyPassword, JSON.stringify([`Linked ${provider}`])]
      );
      user = insertResult.rows[0];
    }

    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'super_secret_codejourney_key_1298471',
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: { id: user.id, name: user.name, email: user.email, xp: user.xp, level: user.level, streak: user.streak, coins: user.coins, badges: user.badges, completedProjects: user.completedProjects } });
      }
    );
  } catch (err) {
    console.error('Social auth error:', err);
    res.status(500).send('Server Error');
  }
});

// Get authenticated user stats
router.get('/user', auth, async (req, res) => {
  try {
    const result = await query(
      `SELECT id, name, email, xp, level, streak, coins, badges, completed_projects as "completedProjects"
       FROM users WHERE id = $1`, 
      [req.user.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Fetch user error:', err);
    res.status(500).send('Server Error');
  }
});

export default router;
