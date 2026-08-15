# How to Use HistoryLive Duo

## 1. Start the App (Local)

```bash
cd historylive-duo

# Terminal 1 – Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload

# Terminal 2 – Frontend
cd ..
npm install
npm run dev
```

Open http://localhost:3000

Or use the one-liner:
```bash
./start-local.sh
```

## 2. Using the App (3 Simple Steps)

### Step 1 – Capture / Load Subjects
- Go to **Capture**
- Click **“⚡ Use Demo Subjects”** (recommended – uses the real cutouts of you and Lisa we already extracted)
- Or upload new multi-angle photos of both of you

### Step 2 – Choose Scenes
- Go to **Scenes**
- Click any combination (or use “Select All Battles” / “Select Pyramid Mysteries Series”)
- You can select as many as you want for a multi-scene documentary

### Step 3 – Generate
- Go to **Generate**
- (Optional) tick “Apply Period Costumes”
- Click **▶ Run Full Duo Pipeline**  
  Watch the live progress log. When finished you get a YouTube-ready result.

### Bonus – Series
- Go to **Series** and click “Generate Full Series” for entire episode packs.

## 3. What Happens Behind the Scenes
1. Subject extraction (or uses demo cutouts)
2. Historical background generation
3. Duo compositing with face lock + lighting match
4. Animation (walking + gesturing)
5. Dual voice-over
6. Stitch into documentary + YouTube export ready

## 4. Live Deploy
See the live deploy guide or just run `vercel` after connecting the repo.
