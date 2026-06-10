# Lab 11 — File Upload Application

## Structure

```
lab11/
  backend/   — NestJS + Multer file upload API
  frontend/  — Vite + React file upload client
```

## Backend setup

```bash
cd lab11/backend
npm install
npm run start:dev
```

Runs on http://localhost:3000

### API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | /files | Upload image file (JPEG/PNG/WebP, max 5MB) |
| GET | /files | Get list of all uploaded files |
| GET | /uploads/:name | Serve uploaded file by filename |

## Frontend setup

```bash
cd lab11/frontend
cp .env.example .env
npm install
npm run dev
```

Runs on http://localhost:5173

## Features

- File selection with client-side validation (type + size)
- Image preview before upload via URL.createObjectURL
- Upload progress bar via axios onUploadProgress
- Server-side validation of MIME type and file size
- Files stored under UUID names in uploads/ directory
- Uploaded file displayed after success
- List of all previously uploaded files
