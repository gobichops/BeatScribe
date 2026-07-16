from fastapi import FastAPI

app = FastAPI(
    title="BeatScribe API",
    version="0.1.0"
)

@app.get("/")
def root():
    return {
        "message": "Welcome to BeatScribe API"
    }

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "app": "BeatScribe API"
    }