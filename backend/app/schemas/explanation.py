
from typing import Literal
from pydantic import BaseModel, Field


class ExplanationRequest(BaseModel):
    text: str = Field(min_length=1, max_length=5000)
    context: str | None = Field(
        default=None,
        max_length=10000
    )


class ExplanationResponse(BaseModel):
    input_text: str

    content_type: Literal[
        "word",
        "phrase",
        "sentence"
    ]

    part_of_speech: str | None = None

    plain_explanation: str

    kid_explanation: str

    examples: list[str] = Field(
        min_length=3,
        max_length=3
    )

    synonyms: list[str] = Field(
        default_factory=list
    )

    antonyms: list[str] = Field(
        default_factory=list
    )

    context_explanation: str | None = None
