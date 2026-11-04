# NutriTone

## Features

- Tracking

  - Calorie tracking
  - Weight loss tracking

- Communities

  - Users can join/leave groups
  - Users can create,edit,delete, or like posts

- Coaching
  - Users can calculate budgeting goals by inputing thie gender, age, weight, activity level, and desired intensity

## Techonologies

React.js, Node.js, Express.js, MongoDB, Javascript

## Private configuration

Set `JWT_SECRET`, `MONGODB_URI`, `USDA_API_KEY` in the server process environment before running the application. server/.env.example lists the required names with blank values. Never commit real values.

The server reads process.env; a .env file is not loaded automatically. With Node.js 20.6 or later, from server/ you can use `node --env-file=.env app.js` after privately creating .env from .env.example. Existing npm start commands also work when the variables are already exported.

Use a long random JWT_SECRET (at least 32 random bytes), shared by token signing and verification. Do not reuse the formerly committed secret.

Food search now calls the Express /foods/search endpoint on port 3000. Only the server sends USDA_API_KEY to USDA; do not put it in client code or a VITE_ variable.

Before exposing this inactive development app publicly, add authentication and rate limits to its provider proxy and configure the frontend API URL and CORS for the deployment.

Removing credentials from the current source does not invalidate them or remove old commits, tags, forks, caches, or copies. Previously published credentials must be replaced or revoked separately through their providers.
