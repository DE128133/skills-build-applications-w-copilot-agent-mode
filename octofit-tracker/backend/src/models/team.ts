import mongoose, { type InferSchemaType } from 'mongoose';

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
    memberUsernames: { type: [String], required: true, default: [] },
  },
  { timestamps: true },
);

export type Team = InferSchemaType<typeof teamSchema>;
export const TeamModel = mongoose.models.Team || mongoose.model('Team', teamSchema);
