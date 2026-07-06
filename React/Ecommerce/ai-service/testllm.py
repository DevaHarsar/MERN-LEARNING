from agent import agent

response = agent.invoke(
    {
        "messages": [
            {
                "role": "user",
                "content": "Where is my order 12345?"
            }
        ]
    }
)

print(response)