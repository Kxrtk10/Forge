from fastapi import APIRouter

from app.api.v1.routes import health, projects, reality_check

api_router = APIRouter()
api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(projects.router, prefix="/projects", tags=["projects"])
api_router.include_router(reality_check.router, prefix="/reality-check", tags=["reality-check"])
