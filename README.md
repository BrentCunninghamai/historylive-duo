# HistoryLive Duo

AI-Powered YouTube Content Creator that puts Brent + Lisa into real historical scenes as co-reporters.

## Quick Start (Local)

```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload

# Frontend (new terminal)
npm install
npm run dev
```

Open http://localhost:3000

Or: `./start-local.sh`

## Live Deploy

See HOW_TO_USE.md and the live deploy notes.

### Vercel (Frontend)
```bash
npm i -g vercel
vercel
```

### Railway / Render (Backend)
Root: backend  
Start: `uvicorn main:app --host 0.0.0.0 --port $PORT`

Then set `VITE_API_BASE` in Vercel to the backend URL.

## Features
- Duo Mode (Brent + Lisa)
- Multi-scene historical library (Pyramids, Waterloo, D-Day, Gettysburg, Colosseum, Moon...)
- Period costumes (Egyptian, Roman, WWII, Astronaut)
- Full generation pipeline
- Batch series generator
- Ready for real Imagine / Voice / FFmpeg wiring
