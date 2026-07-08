from langchain_groq import ChatGroq

from config import GROQ_API_KEY, MODEL_NAME, BACKEND_URL
from langchain_ollama import ChatOllama

llm = ChatGroq(
    api_key=GROQ_API_KEY,
    model=MODEL_NAME,
    temperature=0
)


# llm = ChatOllama(
#     model="qwen3:4b",
#     temperature=0,
#     num_ctx=4096,
# )