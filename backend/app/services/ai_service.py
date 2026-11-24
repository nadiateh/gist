
import os

from dotenv import load_dotenv
from openai import OpenAI

from app.prompts.dictionary_prompt import GIST_SYSTEM_PROMPT
from app.schemas.explanation import (
    ExplanationRequest,
    ExplanationResponse
)


# Load environment variables from backend/.env
load_dotenv()

# Read the model name from the environment
MODEL_NAME = os.getenv("GIST_MODEL", "gpt-4o-mini")

# Initialize the OpenAI client
client = OpenAI()


def explain_text(
    request: ExplanationRequest
) -> ExplanationResponse:

    context_information = (
        request.context
        if request.context
        else "No additional context was provided."
    )

    user_message = f"""
    Text to explain:
    {request.text}

    Surrounding context:
    {context_information}

    Follow Gist's explanation rules.
    """

    response = client.responses.parse(
        model=MODEL_NAME,
        input=[
            {
                "role": "system",
                "content": GIST_SYSTEM_PROMPT
            },
            {
                "role": "user",
                "content": user_message
            }
        ],
        text_format=ExplanationResponse
    )

    result = response.output_parsed

    if result is None:
        raise ValueError(
            "The AI did not return a valid explanation."
        )

    return result
