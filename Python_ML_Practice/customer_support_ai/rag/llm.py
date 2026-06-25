from dotenv import load_dotenv
import os

from langchain_groq import ChatGroq


load_dotenv()


class LLMModel:

    def __init__(self):

        self.llm = ChatGroq(
            api_key=os.getenv("api_key"),
            model=os.getenv("MODEL_NAME"),
            temperature=0
        )

    def get_llm(self):
        return self.llm