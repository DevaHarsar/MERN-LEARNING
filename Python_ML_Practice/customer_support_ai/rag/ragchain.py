from venv import logger

from opentelemetry import context


class RagChain:
     def __init__(self, retriever, llm, prompt):
        self.retriever = retriever
        self.llm = llm
        self.prompt = prompt
        
     def retrieve_context(self, question):

        docs = self.retriever.invoke(question)

        context = "\n\n".join(
            [doc.page_content for doc in docs]
        )
        logger.info("Retrieved Context:")
        logger.info(context)

        return context
     def create_prompt(self, context, question):

        return self.prompt.invoke(
            {
                "context": context,
                "question": question
            }
      )
        
     def ask(self, question):

        context = self.retrieve_context(question)

        prompt = self.create_prompt(context, question)

        response = self.llm.invoke(prompt)

        return response.content