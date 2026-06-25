from langchain_community.vectorstores import FAISS


class Retriever:

    def __init__(self, embedding_model, db_path="vector_db"):
        self.vector_store = FAISS.load_local(
            folder_path=db_path,
            embeddings=embedding_model,
            allow_dangerous_deserialization=True
        )

    def get_retriever(self, k=3):
        return self.vector_store.as_retriever(
            search_kwargs={"k": k}
        )