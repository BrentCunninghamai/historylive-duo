#!/bin/bash
echo "Starting HistoryLive Duo local stack..."
cd backend
pip install -r requirements.txt > /dev/null 2>&1
uvicorn main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!
cd ..
npm install
npm run dev -- --host 0.0.0.0 --port 3000
kill $BACKEND_PID 2>/dev/null
