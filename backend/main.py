import os
import sys
from pathlib import Path

# Ensure the backend directory is in the Python path
backend_dir = Path(__file__).resolve().parent
sys.path.append(str(backend_dir))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Import routers
from api.routes import router as api_router

load_dotenv()

app = FastAPI(
    title="Keshav Mishra Portfolio API",
    description="Backend API for portfolio Platform",
    version="1.0.0"
)

# Configure CORS for frontend access
origins = [
    "http://localhost:5173", # Vite default
    "http://127.0.0.1:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the main router
app.include_router(api_router, prefix="/api")

@app.get("/health", tags=["System"])
def health_check():
    return {"status": "ok", "version": app.version}
