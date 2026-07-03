import mongoose from 'mongoose';

const ProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  projectId: { type: String, required: true },
  tech: { type: String, required: true },
  progressPercentage: { type: Number, default: 0 },
  lastCompletedMilestone: { type: String },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Progress', ProgressSchema);
