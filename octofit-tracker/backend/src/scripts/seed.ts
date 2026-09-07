import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { ActivityModel } from '../models/activity.js';
import { LeaderboardModel } from '../models/leaderboard.js';
import { TeamModel } from '../models/team.js';
import { UserModel } from '../models/user.js';
import { WorkoutModel } from '../models/workout.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    console.log('Seed the octofit_db database with test data');
    await connectDatabase();

    await Promise.all([
      UserModel.deleteMany({}),
      TeamModel.deleteMany({}),
      ActivityModel.deleteMany({}),
      LeaderboardModel.deleteMany({}),
      WorkoutModel.deleteMany({}),
    ]);

    await UserModel.insertMany([
      { username: 'maya-chen', name: 'Maya Chen', email: 'maya.chen@example.com', level: 8, points: 1240 },
      { username: 'jordan-rivera', name: 'Jordan Rivera', email: 'jordan.rivera@example.com', level: 6, points: 980 },
      { username: 'sam-taylor', name: 'Sam Taylor', email: 'sam.taylor@example.com', level: 5, points: 760 },
    ]);

    await TeamModel.insertMany([
      {
        name: 'Trail Blazers',
        description: 'A team focused on consistent outdoor training.',
        memberUsernames: ['maya-chen', 'jordan-rivera'],
      },
      {
        name: 'Strong Start',
        description: 'Strength and mobility sessions for every level.',
        memberUsernames: ['sam-taylor'],
      },
    ]);

    await ActivityModel.insertMany([
      {
        username: 'maya-chen',
        type: 'Running',
        durationMinutes: 32,
        distanceKm: 5.2,
        calories: 410,
        points: 180,
        completedAt: new Date('2026-09-05T08:00:00Z'),
      },
      {
        username: 'jordan-rivera',
        type: 'Cycling',
        durationMinutes: 45,
        distanceKm: 14.6,
        calories: 360,
        points: 160,
        completedAt: new Date('2026-09-04T16:30:00Z'),
      },
      {
        username: 'sam-taylor',
        type: 'Strength Training',
        durationMinutes: 28,
        calories: 220,
        points: 120,
        completedAt: new Date('2026-09-03T17:15:00Z'),
      },
    ]);

    await LeaderboardModel.insertMany([
      { username: 'maya-chen', teamName: 'Trail Blazers', points: 1240, rank: 1 },
      { username: 'jordan-rivera', teamName: 'Trail Blazers', points: 980, rank: 2 },
      { username: 'sam-taylor', teamName: 'Strong Start', points: 760, rank: 3 },
    ]);

    await WorkoutModel.insertMany([
      {
        name: 'Lunch Break 5K',
        type: 'Cardio',
        difficulty: 'Intermediate',
        durationMinutes: 35,
        description: 'A steady run with a short warm-up and cool-down.',
      },
      {
        name: 'Core Builder',
        type: 'Strength',
        difficulty: 'Beginner',
        durationMinutes: 20,
        description: 'A low-impact circuit for building core stability.',
      },
      {
        name: 'Full Body Circuit',
        type: 'Strength',
        difficulty: 'Advanced',
        durationMinutes: 40,
        description: 'A challenging circuit covering legs, push, pull, and core.',
      },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
