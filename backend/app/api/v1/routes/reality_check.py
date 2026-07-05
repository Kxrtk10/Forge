from fastapi import APIRouter

from app.schemas.reality_check import RealityCheckRequest, RealityCheckResponse
from app.services.reality_check_service import RealityCheckService

router = APIRouter()

reality_check_service = RealityCheckService()


@router.post("/", response_model=RealityCheckResponse)
async def generate_reality_check(payload: RealityCheckRequest) -> RealityCheckResponse:
    reality_check = reality_check_service.generate(payload.context)
    return RealityCheckResponse(reality_check=reality_check)
