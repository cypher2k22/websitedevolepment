import mongoose from 'mongoose';

const MilestoneSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true }
});

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], required: true },
  technology: { type: String, required: true },
  milestones: [MilestoneSchema],
  starterCode: {
    'index.html': String,
    'styles.css': String,
    'script.js': String
  }
});

export default mongoose.model('Project', ProjectSchema);
