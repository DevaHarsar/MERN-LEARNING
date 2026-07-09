from langchain_community.vectorstores import FAISS


class VectorStore:

    def __init__(self, embedding_model):
        self.embedding_model = embedding_model

    def create_vector_store(self, chunks):

        vector_store = FAISS.from_documents(
            documents=chunks,
            embedding=self.embedding_model
        )

        return vector_store
    
    def save_vector_store(self, vector_store, path="vectorstore/faiss_index"):
        vector_store.save_local(path)
        
    def load_vector_store(self, path="vectorstore/faiss_index"):
        vector_store = FAISS.load_local(
            folder_path=path,
            embeddings=self.embedding_model,
            allow_dangerous_deserialization=True
        )
        return vector_store