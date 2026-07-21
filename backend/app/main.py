from pathlib import Path

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="BeatScribe API",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


@app.get("/")
def root():
    return {"message": "Welcome to BeatScribe API"}


@app.get("/health")
def health():
    return {"status": "healthy", "app": "BeatScribe API"}


@app.post("/upload")
async def upload_audio(file: UploadFile = File(...)):
    destination = UPLOAD_DIR / file.filename

    with destination.open("wb") as buffer:
        buffer.write(await file.read())

    return {
        "filename": file.filename,
        "message": "Upload successful"
    }