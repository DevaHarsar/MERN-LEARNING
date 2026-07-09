from services.rag_service import RAGService

rag = RAGService()

while True:
    question = input("Question: ")

    if question.lower() == "exit":
        break

    answer = rag.answer_question(question)

    print("\nAnswer:")
    print(answer)