"""
HistoryLive Duo — FastAPI Backend Stubs
Run: uvicorn main:app --reload --port 8000
"""

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uuid

app = FastAPI(title="HistoryLive Duo API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

ASSETS = {}

class CompositeRequest(BaseModel):
    bg: str
    brent: str
    lisa: str
    prompt: str

class AnimateRequest(BaseModel):
    asset_id: str
    prompt: str
    duration: int = 10

class VoiceRequest(BaseModel):
    turns: list
    voices: dict

class StitchRequest(BaseModel):
    videos: List[str]
    fade: float = 1.5

@app.get("/health")
def health():
    return {"status": "ok", "service": "HistoryLive Duo Backend"}

@app.post("/api/extract")
async def extract(images: List[UploadFile] = File(...), person: str = Form("brent")):
    asset_id = str(uuid.uuid4())
    ASSETS[asset_id] = {"type": "cutout", "person": person}
    return {"asset_id": asset_id, "status": "extracted", "person": person}

@app.post("/api/generate-bg")
async def generate_bg(scene_id: str = "", extra_prompt: str = ""):
    asset_id = str(uuid.uuid4())
    return {"asset_id": asset_id, "image_url": f"/assets/{asset_id}.jpg"}

@app.post("/api/composite")
async def composite(req: CompositeRequest):
    asset_id = str(uuid.uuid4())
    return {"asset_id": asset_id, "image_url": f"/assets/{asset_id}.jpg"}

@app.post("/api/animate")
async def animate(req: AnimateRequest):
    asset_id = str(uuid.uuid4())
    return {"asset_id": asset_id, "video_url": f"/assets/{asset_id}.mp4"}

@app.post("/api/voice")
async def voice(req: VoiceRequest):
    asset_id = str(uuid.uuid4())
    return {"audio_url": f"/assets/{asset_id}.mp3", "duration": 15.0}

@app.post("/api/stitch")
async def stitch(req: StitchRequest):
    asset_id = str(uuid.uuid4())
    return {"final_url": f"/assets/{asset_id}.mp4", "duration": len(req.videos) * 10, "youtube_ready": True}

@app.post("/api/period-costume")
async def period_costume(asset_id: str = "", era: str = ""):
    new_id = str(uuid.uuid4())
    return {"asset_id": new_id}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
