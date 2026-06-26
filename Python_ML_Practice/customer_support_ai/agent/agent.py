from langchain.agents import create_agent

from utils.logger import logger
from rag.llm import LLMModel
from langgraph.checkpoint.memory import MemorySaver

from tools.order_tools import check_order_status
from tools.ticket_tools import create_ticket
from tools.rag_tool import company_knowledge
from agent.agent_prompt import SYSTEM_PROMPT

llm = LLMModel().get_llm()
memory = MemorySaver()
config = {
    "configurable": {
        "thread_id": "customer_001"
    }
}

tools = [
    company_knowledge,
    check_order_status,
    create_ticket
]

agent = create_agent(
    model=llm,
    tools=tools,
    checkpointer=memory,
    system_prompt=SYSTEM_PROMPT,
)

print("=" * 50)
print("AI Customer Support Assistant")
print("Type 'exit' to quit.")
print("=" * 50)

while True:

    user_input = input("\nYou: ")

    if user_input.lower() == "exit":
        print("Goodbye!")
        break

    response = agent.invoke(
        {
            "messages": [
                (
                    "user",
                    user_input
                )
            ]
        },
        config=config
    )

    logger.info(f"[USER] {user_input}")
    logger.info(f"[AI] {response['messages'][-1].content}")

    print("\nAI:", response["messages"][-1].content)
# response = agent.invoke(
#     {
#         "messages": [
#             (
#                 "user",
#                 "show me the return policy"
#             )
#         ]
#     },
#     config=config
# )
# logger.info("Agent Response")
# logger.info(response)
# print(response["messages"][-1].content)

# response = agent.invoke(
#     {
#         "messages": [
#             (
#                 "user",
#                 "For order id ord123, I want to create a ticket for a missing package."
#             )
#         ]
#     },
#     config=config
# )
# print(response["messages"][-1].content)
