import express from 'express';
import { connectDatabase } from './config/database.js';
import { ActivityModel } from './models/activity.js';
import { LeaderboardModel } from './models/leaderboard.js';
import { TeamModel } from './models/team.js';
import { UserModel } from './models/user.js';
import { WorkoutModel } from './models/workout.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-tracker-api', apiBaseUrl });
});

const collectionRoutes = [
  { path: 'users', model: UserModel },
  { path: 'teams', model: TeamModel },
  { path: 'activities', model: ActivityModel },
  { path: 'leaderboard', model: LeaderboardModel },
  { path: 'workouts', model: WorkoutModel },
] as const;

for (const resource of collectionRoutes) {
  app.get(`/api/${resource.path}/`, async (_request, response) => {
    try {
      const documents = await resource.model.find().lean();
      response.json(documents);
    } catch (error) {
      console.error(`Error loading ${resource.path}:`, error);
      response.status(500).json({ error: `Unable to load ${resource.path}` });
    }
  });
}

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`OctoFit Tracker API listening at ${apiBaseUrl}`);
    });
  })
  .catch((error) => {
    console.error('Unable to start the API:', error);
    process.exitCode = 1;
  });