from dotenv import load_dotenv
import os

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
MODEL_NAME = os.getenv("MODEL_NAME")
BACKEND_URL = os.getenv("BACKEND_URL")

# print(f"GROQ_API_KEY: {GROQ_API_KEY}")
# print(f"MODEL_NAME: {MODEL_NAME}")
# print(f"BACKEND_URL: {BACKEND_URL}")