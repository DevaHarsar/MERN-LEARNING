from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from langchain_groq import ChatGroq
import os

load_dotenv()
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
print(os.getenv("api_key"))

llm = ChatGroq(
    api_key=os.getenv("api_key"),
    model="llama-3.1-8b-instant"
)

class ChatRequest(BaseModel):
    message: str


@app.post("/chat")
def chat(data: ChatRequest):

    user_message = data.message

    response = llm.invoke(user_message)

    return {
        "reply": response.content
    }