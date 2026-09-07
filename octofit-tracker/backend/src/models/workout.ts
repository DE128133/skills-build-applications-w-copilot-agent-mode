import mongoose, { type InferSchemaType } from 'mongoose';

const workoutSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    description: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export type Workout = InferSchemaType<typeof workoutSchema>;
export const WorkoutModel = mongoose.models.Workout || mongoose.model('Workout', workoutSchema);
