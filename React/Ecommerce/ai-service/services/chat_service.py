import json

from agent import agent
import services.request_context as request_context


def chat_with_agent(message: str, token: str):

    request_context.current_token = token

    response = agent.invoke(
        {
            "messages": [
                {
                    "role": "user",
                    "content": message,
                }
            ]
        }
    )

    messages = response["messages"]

    assistant_message = messages[-1].content

    products = []

    for msg in messages:
        if msg.type == "tool" and msg.name == "search_products":
            tool_data = json.loads(msg.content)
            products = tool_data.get("products", [])
    print("Message Type:", msg.type)
    print("Tool Name:", getattr(msg, "name", ""))
    print("Tool Content:", repr(msg.content))

    return {
        "assistantMessage": assistant_message,
        "products": products
    }