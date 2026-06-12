# StudyNotes — Frontend

React + Vite + Tailwind v4 + Framer Motion frontend for the Notes API.

## Setup

```bash
npm install
cp .env.example .env   # adjust VITE_API_URL if needed
npm run dev
```

Default API: `http://localhost:4000/api` (matches the provided Express backend).

## Backend endpoints used
- `POST /auth/register`, `POST /auth/login`
- `GET /notes` (paginated), `POST /notes`
- `GET /notes/:id`, `PUT /notes/:id`, `DELETE /notes/:id`
- `GET /notes/search?q=`, `GET /notes/category/:category`

JWT is stored in `localStorage` and sent as `Authorization: Bearer <token>`.
