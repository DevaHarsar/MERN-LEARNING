from rag.retriever import Retriever
from services.llm_service import llm


class RAGService:

    def __init__(self):
        self.retriever = Retriever()

    def answer_question(self, query: str):

        docs = self.retriever.retrieve(query)

        context = "\n\n".join([doc.page_content for doc in docs])

        prompt = f"""
            You are an AI customer support assistant for an ecommerce website.

            Use ONLY the information provided in the context to answer the user's question.

            Rules:
            - Answer only from the context.
            - Do not make up information.
            - If the answer is not available in the context, reply:
            "Sorry, I couldn't find that information in our knowledge base."
            - Keep the answer clear and concise.

            ------------------------
            Context:
            {context}
            ------------------------

            Customer Question:
            {query}

            Answer:
"""

        response = llm.invoke(prompt)

        return response.content