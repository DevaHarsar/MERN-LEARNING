from fastapi import APIRouter

from schemas.chatSchemas import ChatRequest
from services.chat_service import chat_with_agent

router = APIRouter()


@router.post("/chat")
def chat(request: ChatRequest):
    response = chat_with_agent(
    request.message,
    request.token
)

    return {
        "response": response
    }