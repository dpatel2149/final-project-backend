# final-project-backend

## Project Overview
This project is the backend for a forum-style web application built with Node.js, Express, TypeScript, and MongoDB.

The API supports user registration, login, post creation, retrieving posts, updating posts, deleting posts, liking posts, admin management routes, and request logging.

## Tech Stack
- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- JWT
- Jest
- Bruno

## Setup
1. Clone the repository.
2. Open the project in VS Code.
3. Install dependencies:

```bash
npm install
```

## Run The Server
Start the backend server with:

```bash
node -r ts-node/register src/server.ts
```

Or run development mode with:

```bash
npm run dev
```

## Run Tests
Run the automated test suite with:

```bash
npm test
```

Generate the coverage report with:

```bash
npm run coverage
```

## Environment Variables
Create a `.env` file in the root of the project with:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Base URL
```txt
http://localhost:5000
```

## Available Endpoints

### Health Check
- `GET /`

### Register User
- `POST /api/auth/register`

Sample body:

```json
{
  "name": "Jeet Test",
  "email": "jeet@example.com",
  "password": "123456"
}
```

### Login User
- `POST /api/auth/login`

Sample body:

```json
{
  "email": "jeet@example.com",
  "password": "123456"
}
```

### Get Posts
- `GET /api/posts`

### Create Post
- `POST /api/posts`

Sample body:

```json
{
  "title": "My first post",
  "content": "This is a sample post"
}
```

### Update Post
- `PUT /api/posts/:id`

Sample body:

```json
{
  "title": "Updated post title",
  "content": "Updated post content"
}
```

### Delete Post
- `DELETE /api/posts/:id`

### Like Post
- `POST /api/posts/:id/like`

### Admin Stats
- `GET /api/admin/stats`
- Requires admin token

### Admin Delete Post
- `DELETE /api/admin/posts/:id`
- Requires admin token

## Logging
Request logging middleware records:
- HTTP method
- route
- status code
- response time

## API Testing
Bruno collection/testing is handled by a teammate.

## Team Contributions
- Jeet: logging, README documentation, backend verification, Jest test setup and coverage
- Divy: login, JWT, admin features
- Tirth: post-related features, likes, comments

## Notes
Before starting work, pull the latest changes:

```bash
git pull origin master
```

Test endpoints before pushing code and keep Jira updated from `To Do` to `In Progress` to `Done`.
