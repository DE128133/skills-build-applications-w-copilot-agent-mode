import mongoose, { type InferSchemaType } from 'mongoose';

const leaderboardSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    teamName: { type: String, required: true, trim: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
);

export type LeaderboardEntry = InferSchemaType<typeof leaderboardSchema>;
export const LeaderboardModel = mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema);
