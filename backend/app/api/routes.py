
from fastapi import APIRouter, HTTPException
from openai import OpenAIError

from app.schemas.explanation import (
    ExplanationRequest,
    ExplanationResponse
)

from app.services.ai_service import explain_text


router = APIRouter()


@router.post(
    "/explain",
    response_model=ExplanationResponse
)
def explain(
    request: ExplanationRequest
):
    try:
        result = explain_text(request)
        return result

    except OpenAIError:
        raise HTTPException(
            status_code=502,
            detail="The AI service is currently unavailable."
        )

    except ValueError as error:
        raise HTTPException(
            status_code=502,
            detail=str(error)
        )
