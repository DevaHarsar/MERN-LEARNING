from langgraph.prebuilt import create_react_agent

from rag.llm import LLMModel

from tools.order_tools import check_order_status
from tools.ticket_tools import create_ticket
from tools.rag_tool import company_knowledge

llm = LLMModel().get_llm()

tools = [
    company_knowledge,
    check_order_status,
    create_ticket
]

agent = create_react_agent(
    model=llm,
    tools=tools
)

response = agent.invoke(
    {
        "messages": [
            (
                "user",
                "Where is my order ORD123?"
            )
        ]
    }
)

print(response["messages"][-1].content)
response = agent.invoke(
    {
        "messages": [
            (
                "user",
                "show me the return policy"
            )
        ]
    }
)
print(response["messages"][-1].content)

response = agent.invoke(
    {
        "messages": [
            (
                "user",
                "For order id ord123, I want to create a ticket for a missing package."
            )
        ]
    }
)
print(response["messages"][-1].content)
