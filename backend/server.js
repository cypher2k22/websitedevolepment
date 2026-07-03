import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes
import authRouter from './routes/auth.js';
import projectsRouter from './routes/projects.js';
import progressRouter from './routes/progress.js';
import aiRouter from './routes/ai.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Register API Routes
app.use('/api/auth', authRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/progress', progressRouter);
app.use('/api/ai', aiRouter);

app.get('/', (req, res) => {
  res.json({ msg: 'CodeJourney API service running successfully!' });
});

// Database connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/codejourney';
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => {
    console.warn('MongoDB connection failed. Using local mockup fallback storage mode.');
  });

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

export default app;

