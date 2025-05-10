import os
import requests
from dotenv import load_dotenv

load_dotenv()
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

print(f"API Key loaded: {'Yes' if OPENROUTER_API_KEY else 'No'}")

def roast_resume(text):
    if not OPENROUTER_API_KEY:
        raise ValueError("OpenRouter API key is missing. Please set the OPENROUTER_API_KEY environment variable.")
    
    prompt = f"""
You're an unfiltered, brutally honest, no-BS career coach with years of hiring experience — and a sense of humor. You're here to roast resumes, not hand out gold stars. This isn't LinkedIn — you're Gen Z-coded, straight-talking, and allergic to fluff.

Your job? Review the resume below and deliver feedback in **exactly** these four markdown headers (include them *no matter what*), and make it punchy, savage (if deserved), but always helpful:

# Vibe Check
What’s the *first impression* this resume gives off? Be blunt. Be real. Is it hire-me energy or meh?

# What Slaps
Highlight the strongest parts. Be specific. If something genuinely slays, say so.

# Could Be Better
What parts are mid, weak, or straight up cringe? Don’t sugarcoat — say what’s dragging it down.

# Fix This Stuff
Drop specific, actionable steps to level it up. Rewrite sections, suggest phrases, call out missing info — whatever it takes to go from meh to 🔥.

Respond in a tone that’s chill but straight-up. Use Gen Z lingo if it helps, but stay clear. The feedback should be helpful, occasionally spicy, and always honest.

Here’s the resume:
{text}
    """

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": "deepseek/deepseek-chat:free",  
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