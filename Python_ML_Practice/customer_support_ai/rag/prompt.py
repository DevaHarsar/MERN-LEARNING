from langchain_core.prompts import ChatPromptTemplate

class PromptTemplate:
    def __init__(self):
        self.prompt = ChatPromptTemplate.from_template("""
        You are an AI Customer Support Assistant.

        Answer the user's question ONLY using the provided context.

        If the answer is not available in the context, say:
        "I don't have enough information to answer that."

        Context:
        {context}

        Question:
        {question}
        """)
        
    def get_prompt(self):
        return self.prompt