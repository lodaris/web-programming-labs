# Lab 10 — Auth Application (Frontend + Backend)

## Structure

```
lab10/
  backend/   — NestJS JWT auth API (copied from Lab 9 + CORS enabled)
  frontend/  — React + Vite auth client
```

## Backend setup

```bash
cd lab10/backend
cp .env.example .env   # fill DB credentials
npm install
npm run migration:run
npm run start:dev
```

Backend runs on http://localhost:3000

## Frontend setup

```bash
cd lab10/frontend
cp .env.example .env
npm install
npm run dev
```

Frontend runs on http://localhost:5173

## Features

- Registration with email + password
- Login with JWT token stored in localStorage
- Protected route /profile (redirects to /login if not authenticated)
- Guest routes /login, /register (redirects to /profile if authenticated)
- Auth state restored from localStorage on page reload
- axios interceptors for automatic token injection and 401 handling
- React Hook Form + Zod validation
- TanStack Query for server state management
