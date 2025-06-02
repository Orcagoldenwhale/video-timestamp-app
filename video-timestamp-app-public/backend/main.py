from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
import whisper, os

app = FastAPI()
model = whisper.load_model("base")

app.mount("/static", StaticFiles(directory="frontend-dist"), name="static")

@app.get("/")
def index():
    return FileResponse("frontend-dist/index.html")

@app.post("/upload")
async def upload_video(file: UploadFile = File(...)):
    temp_path = f"temp_{file.filename}"
    with open(temp_path, "wb") as f:
        f.write(await file.read())

    result = model.transcribe(temp_path)
    os.remove(temp_path)

    timestamps = []
    for segment in result["segments"]:
        timestamps.append({
            "time": int(segment["start"]),
            "text": segment["text"]
        })

    return {"timestamps": timestamps}
