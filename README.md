# Resume Roaster 🔥

**Live Demo:** [https://resume-roaster-three.vercel.app/](https://resume-roaster-three.vercel.app/)

**Resume Roaster** is a web application that gives you brutally honest, actionable feedback on your resume using AI. Upload your PDF resume, and get a "roast" that highlights strengths, weaknesses, and concrete steps to improve—no fluff, just facts.

---

## 🚀 Purpose

Recruiters spend only a few seconds scanning your resume. Resume Roaster helps you stand out by providing:
- **Savage but helpful feedback**: Honest, direct, and sometimes spicy advice.
- **Actionable improvements**: Specific steps to level up your resume.
- **No design bias**: Focuses only on your content, not formatting.

---

## 🛠️ Tech Stack

- **Frontend**: React (with Vite), styled with custom CSS for a minimal, professional look.
- **Backend**: FastAPI (Python), deployed as an API service.
- **AI Model**: DeepSeek (via OpenRouter API) for generating feedback.
- **PDF Parsing**: PyMuPDF (`fitz`) for extracting text from uploaded resumes.
- **Deployment**: 
  - Backend: Railway
  - Frontend: Vercel

---

## 📦 Features

- **Upload your resume** (PDF only)
- **AI-powered feedback** in four sections:
  - Vibe Check
  - What Slaps
  - Red Flags
  - Make It Better
- **Copy feedback** to clipboard
- **Pro tips** for resume writing
- **Responsive UI** for desktop and mobile

---

## 🖥️ How It Works

1. **User uploads a PDF resume** via the web UI.
2. **Frontend** sends the file to the FastAPI backend.
3. **Backend** extracts text from the PDF and sends it to DeepSeek via OpenRouter API.
4. **AI returns structured feedback** (ignoring formatting/layout).
5. **Frontend displays feedback** in a clean, tabbed interface.

---

## 📝 Local Development

### Prerequisites
- Node.js & npm
- Python 3.10+
- Railway (or similar) account for backend deployment
- Vercel (or similar) account for frontend deployment
- OpenRouter API key

### Backend
```bash
cd resume-roaster/backend
pip install -r requirements.txt
# Set your OPENROUTER_API_KEY in a .env file
uvicorn main:app --reload
```

### Frontend
```bash
cd resume-roaster/frontend
npm install
npm run dev
```
- Update the API endpoint in `UploadForm.jsx` to your backend URL as needed.

---

## 🌐 Deployment

- **Backend**: Deploy `/backend` to Railway.
- **Frontend**: Deploy `/frontend` to Vercel.
- Make sure the frontend API calls point to your deployed backend URL.

---

## 🤝 Credits

- Built with [FastAPI](https://fastapi.tiangolo.com/), [React](https://react.dev/), [DeepSeek](https://deepseek.com/), and [OpenRouter](https://openrouter.ai/).
- Created by [Nisma](https://github.com/nismafaaa).

---
