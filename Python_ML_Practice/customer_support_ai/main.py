import os

from rag.loader import DocumentLoader
from rag.splitter import DocumentSplitter
from rag.embeddings import EmbeddingModel
from rag.vectors import VectorStore
from rag.retriever import Retriever
from rag.llm import LLMModel
from rag.ragchain import RagChain
from rag.prompt import PromptTemplate
from tools.order_tools import check_order_status
from tools.ticket_tools import create_ticket

embedding = EmbeddingModel().get_embedding_model()


if not os.path.exists("vector_db"):

    print("Creating Vector Database...")

    loader = DocumentLoader()
    documents = loader.load_documents()

    splitter = DocumentSplitter()
    chunks = splitter.split_documents(documents)

    vector_store = VectorStore(embedding)

    db = vector_store.create_vector_store(chunks)

    vector_store.save_vector_store(db)

    print("Vector Database Created Successfully!")

else:

    print("Vector Database already exists.")

retriever = Retriever(embedding).get_retriever()

llm = LLMModel().get_llm()


prompt = PromptTemplate().get_prompt()


rag_chain = RagChain(
    retriever=retriever,
    llm=llm,
    prompt=prompt
)

question = "What is the return policy?"

answer = rag_chain.ask(question)

print("\nAnswer:\n")
print(answer)

print(
    check_order_status.invoke(
        {"order_id":"ORD123"}
    )
)

print(
    create_ticket.invoke(
        {
            "issue":"My package has not arrived."
        }
    )
)