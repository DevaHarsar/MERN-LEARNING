from langchain_core.tools import tool

from services.rag_service import RAGService

rag_service = RAGService()


@tool
def rag_search(question: str) -> str:
    """
    Use this tool to answer questions about:
    - Return Policy
    - Shipping Policy
    - Cancellation Policy
    - Warranty
    - Payment Methods
    - FAQs
    - Account Help
    - Company policies

    Do NOT use this tool for product search, cart operations, or orders.
    """

    return rag_service.answer_question(question)