from rag.loadDocuments import DocumentLoader
from rag.splitDocuments import DocumentSplitter
from rag.embeddings import EmbeddingModel
from rag.vectorstore import VectorStore

loader = DocumentLoader()
documents = loader.load_documents()

splitter = DocumentSplitter()

chunks = splitter.split_documents(documents)

embedding_service = EmbeddingModel()
embedding_model = embedding_service.get_embedding_model()


vector_store_service = VectorStore(embedding_model)
vector_store = vector_store_service.create_vector_store(chunks)
print("FAISS index created")
vector_store_service.save_vector_store(vector_store, path="vectorstore/faiss_index")
print("FAISS index saved successfully")