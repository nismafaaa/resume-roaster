from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from model_utils import roast_resume
import fitz  

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

def extract_text_from_pdf(file: UploadFile) -> str:
    try:
        # Read the file into memory
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
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    text = extract_text_from_pdf(file)
    if not text:
        raise HTTPException(status_code=400, detail="No text found in the uploaded PDF.")

    feedback = roast_resume(text)
    return {"feedback": feedback}