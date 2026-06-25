from langchain_core.tools import tool

from rag.embeddings import EmbeddingModel
from rag.retriever import Retriever
from rag.llm import LLMModel
from rag.prompt import PromptTemplate
from rag.ragchain import RagChain

embedding = EmbeddingModel().get_embedding_model()

retriever = Retriever(embedding).get_retriever()

llm = LLMModel().get_llm()

prompt = PromptTemplate().get_prompt()

rag_chain = RagChain(
    retriever,
    llm,
    prompt
)


@tool
def company_knowledge(query: str):
    """
    Answer questions about company policies,
    shipping, returns and FAQs.
    """

    return rag_chain.ask(query)