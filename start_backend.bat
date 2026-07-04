@echo off
echo Starting Portfolio Backend (FastAPI)...
cd backend
if not exist "venv\Scripts\activate.bat" (
    echo Virtual environment not found. Please run setup first.
    exit /b 1
)
call venv\Scripts\activate.bat
python -m uvicorn main:app --reload
