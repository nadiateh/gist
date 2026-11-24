
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import router


app = FastAPI(
    title="Gist API",
    description=(
        "An AI-powered dictionary that explains "
        "words, phrases, and sentences."
    ),
    version="1.0.0"
)


# Allow our future React development server
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"]
)


@app.get("/")
def home():
    return {
        "message": "Welcome to Gist API!",
        "status": "running"
    }


app.include_router(
    router,
    prefix="/api",
    tags=["Dictionary"]
)
