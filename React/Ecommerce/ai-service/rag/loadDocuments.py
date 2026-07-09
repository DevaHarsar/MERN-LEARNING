from langchain_community.document_loaders import DirectoryLoader, TextLoader


class DocumentLoader:
    def __init__(self, directory_path="docs"):
        self.directory_path = directory_path

    def load_documents(self):
        loader = DirectoryLoader(
            self.directory_path,
            glob="**/*.txt",
            loader_cls=TextLoader,
            loader_kwargs={"encoding": "utf-8"},
        )
        documents = loader.load()
        return documents
    
if __name__ == "__main__":
    loader = DocumentLoader()

    documents = loader.load_documents()

    print(f"Total Documents Loaded: {len(documents)}")

    for i, doc in enumerate(documents, start=1):
        print("=" * 50)
        print(f"Document {i}")
        print("Source :", doc.metadata["source"])
        print("Content:")
        print(doc.page_content)