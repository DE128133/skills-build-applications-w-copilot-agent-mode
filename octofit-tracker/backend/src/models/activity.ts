import mongoose, { type InferSchemaType } from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    calories: { type: Number, required: true, min: 0 },
    points: { type: Number, required: true, min: 0 },
    completedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export type Activity = InferSchemaType<typeof activitySchema>;
export const ActivityModel = mongoose.models.Activity || mongoose.model('Activity', activitySchema);
