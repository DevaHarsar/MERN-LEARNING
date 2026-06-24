from dotenv import load_dotenv
import os

from langchain_groq import ChatGroq
from langchain.tools import tool
from langchain.agents import create_agent

load_dotenv()

api_key = os.getenv("api_key")

llm = ChatGroq(
    api_key=api_key,
    model="llama-3.3-70b-versatile"
)

# Task Storage
tasks = [
    "Learn LangChain",
    "Finish Assignment"
]


# Tool 1 - Add Task
@tool
def add_task(task: str)-> str:
    """Add a new task to the task list."""
    tasks.append(task)
    return f"Task '{task}' added successfully."


# Tool 2 - View Tasks
@tool
def view_tasks():
    """View all tasks in the task list."""

    if not tasks:
        return "No tasks available."

    result = ""

    for i, task in enumerate(tasks, start=1):
        result += f"{i}. {task}\n"

    return result


# Tool 3 - Search Task
@tool
def search_task(keyword: str) ->str:
    """
    Search for tasks that contain the given keyword.
    
    Args:
        keyword: The word to search for in tasks.
    """

    matches = []

    for task in tasks:
        if keyword.lower() in task.lower():
            matches.append(task)

    if not matches:
        return "No matching tasks found."

    return "\n".join(matches)


# Register Tools
tools = [
    add_task,
    view_tasks,
    search_task
]


# Create ReAct Agent
agent = create_agent(
    model=llm,
    tools=tools,
    system_prompt="""

        You are a Task Manager.

    Tools:
    - add_task
    - view_tasks
    - search_task

    Use the correct tool.
    """
)


# Interactive Chat
while True:

    user_input = input("\nYou: ")

    if user_input.lower() == "exit":
        break

    try:
        response = agent.invoke(
            {
                "messages": [
                    {
                        "role": "user",
                        "content": user_input
                    }
                ]
            }
        )
    except Exception as e:
        print(f"Error occurred: {e}")

    print("\nAgent:")
    print(response["messages"][-1].content)
                

    print("\nAgent:")
    print(response["messages"][-1].content)