# Architecture

Forge is organized as a monorepo with clear product boundaries.

## Frontend

The frontend uses the Next.js App Router and keeps domain work in `src/features`. Shared UI primitives live in `src/components`, infrastructure helpers live in `src/lib`, API clients live in `src/services`, and shared contracts live in `src/types`.

## Backend

The backend follows a layered FastAPI architecture:

- `api/` exposes versioned HTTP routes.
- `core/` owns configuration and application settings.
- `db/` owns database sessions and metadata.
- `models/` contains SQLAlchemy persistence models.
- `schemas/` contains Pydantic request and response contracts.
- `services/` contains business logic.
- `middleware/` contains request lifecycle middleware.
- `utils/` contains small reusable helpers.
