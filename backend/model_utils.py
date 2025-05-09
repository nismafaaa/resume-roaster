import os
import requests
from dotenv import load_dotenv

load_dotenv()
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

print(f"API Key loaded: {'Yes' if OPENROUTER_API_KEY else 'No'}")

def roast_resume(text):
    if not OPENROUTER_API_KEY:
        raise ValueError("OpenRouter API key is missing. Please set the OPENROUTER_API_KEY environment variable.")
    
    # Rest of your existing code
    prompt = f"""
You are a brutally honest career coach and hiring manager. Review the following resume and give:
1. Harsh but constructive feedback
2. Actionable improvements
3. Tailored advice for job-market relevance
Be specific, direct, and no fluff. Here's the resume:
{text}
    """
    
    # Simplified headers for local development
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": "deepseek/deepseek-chat:free",  # Updated to match your reference
        "messages": [
            {"role": "system", "content": "You are a brutally honest career coach and hiring manager."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.7
    }
    
    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers=headers,
        json=payload
    )
    
    if response.status_code == 200:
        return response.json()["choices"][0]["message"]["content"].strip()
    else:
        error_msg = f"Error {response.status_code} from OpenRouter API: {response.text}"
        print(error_msg)  # Log error for debugging
        raise Exception(error_msg)