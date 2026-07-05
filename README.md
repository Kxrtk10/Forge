# Forge

Forge is an AI Product Mentor for founders. This repository is scaffolded as a production-grade monorepo with a Next.js frontend and FastAPI backend.

## Structure

- `frontend/` - Next.js 15, React, TypeScript, Tailwind CSS, shadcn/ui-ready architecture.
- `backend/` - FastAPI, SQLAlchemy, Alembic, PostgreSQL architecture.
- `docs/` - Product, architecture, and engineering documentation.
- `prompts/` - AI mentor prompt assets and prompt engineering notes.
- `assets/` - Brand, media, and design assets.
- `scripts/` - Local development and automation scripts.

## Local Development

```bash
docker compose up --build
```

Frontend: `http://localhost:3000`

Backend: `http://localhost:8000`

API health: `http://localhost:8000/api/v1/health`
