from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from model_utils import roast_resume
import fitz  
import asyncio
from concurrent.futures import ThreadPoolExecutor

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Resume Roaster backend is alive 👊"}

def extract_text_from_pdf_sync(file: UploadFile) -> str:
    try:
        file_bytes = file.file.read()
        with fitz.open(stream=file_bytes, filetype="pdf") as doc:
            text = ""
            for page in doc:
                text += page.get_text()
        return text.strip()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to read PDF: {str(e)}")

@app.post("/review-resume/")
async def review_resume(file: UploadFile = File(...)):
    try:
        if file.content_type != "application/pdf":
            raise HTTPException(status_code=400, detail="Only PDF files are supported.")

        loop = asyncio.get_event_loop()
        with ThreadPoolExecutor() as pool:
            text = await loop.run_in_executor(pool, extract_text_from_pdf_sync, file)
            if not text:
                raise HTTPException(status_code=400, detail="No text found in the uploaded PDF.")
            feedback = await loop.run_in_executor(pool, roast_resume, text)

        return {"feedback": feedback, "resume_text": text}
    except Exception as e:
        import traceback
        print(f"ERROR PROCESSING RESUME: {str(e)}")
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=f"Error processing resume: {str(e)}")