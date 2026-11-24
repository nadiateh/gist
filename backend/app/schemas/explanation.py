
from typing import Literal

from pydantic import BaseModel, Field, field_validator


class ExplanationRequest(BaseModel):
    text: str = Field(
        min_length=1,
        max_length=5000
    )

    context: str | None = Field(
        default=None,
        max_length=10000
    )

    @field_validator("text")
    @classmethod
    def validate_text(cls, value: str) -> str:
        value = value.strip()

        if not value:
            raise ValueError("Text cannot be empty.")

        return value

    @field_validator("context")
    @classmethod
    def clean_context(cls, value: str | None) -> str | None:
        if value is not None:
            value = value.strip()
            return value or None

        return None


class ExplanationResponse(BaseModel):
    input_text: str

    content_type: Literal[
        "word",
        "phrase",
        "sentence"
    ]

    part_of_speech: str | None

    plain_explanation: str

    kid_explanation: str

    examples: list[str] = Field(
        min_length=3,
        max_length=3
    )

    synonyms: list[str]

    antonyms: list[str]

    context_explanation: str | None
