import json

from agent import agent
import services.request_context as request_context


def chat_with_agent(message: str, token: str):

    request_context.current_token = token

    try:
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
            print("Type:", msg.type)
            print("Name:", getattr(msg, "name", ""))
            print("Content:", repr(msg.content))
            print("-" * 50)

            if msg.type == "tool" and msg.name == "search_products":
                try:
                    tool_data = json.loads(msg.content)
                    products = tool_data.get("products", [])
                except json.JSONDecodeError:
                    print("Search tool did not return JSON.")
                    print(msg.content)

        return {
            "assistantMessage": assistant_message,
            "products": products,
        }

    finally:
        request_context.current_token = None