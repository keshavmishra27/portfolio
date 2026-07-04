@echo off
echo Starting Portfolio Frontend (Vite/React)...
cd frontend
if not exist "node_modules" (
    echo node_modules not found. Running npm install...
    npm install
)
npm run dev
