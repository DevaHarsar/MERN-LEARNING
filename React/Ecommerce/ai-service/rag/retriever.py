from rag.embeddings import EmbeddingModel
from rag.vectorstore import VectorStore


class Retriever:

    def __init__(self):
        embedding_service = EmbeddingModel()
        embedding_model = embedding_service.get_embedding_model()

        vector_store_service = VectorStore(embedding_model)

        self.vector_store = vector_store_service.load_vector_store()

    def retrieve(self, query, k=3):
        results = self.vector_store.similarity_search(
            query=query,
            k=k
        )

        return results