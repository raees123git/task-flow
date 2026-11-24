
from langchain.agents import create_agent
from langchain_core.messages import ToolMessage
from dotenv import load_dotenv

from tools import create_todo

load_dotenv()

agent = create_agent(
    model="google_genai:gemini-3.1-flash-lite",
    tools=[create_todo],
    system_prompt="""
    You are an AI todo assistant.

    Your job is to help users create todo tasks.

    When a user asks to add or create a todo,
    use the create_todo tool.

    Extract the task name from the user's message.
    Do not invent task details.

    Only report successful creation after
    the tool confirms it.
    """,
)

result = agent.invoke({
    "messages": [
        {
            "role": "user",
            "content": "Add a todo to go to play cricket"
        }
    ]
})

for message in result["messages"]:
    if isinstance(message, ToolMessage):
        print("Tool executed:", message.name)
        print("Tool result:", message.content)

print("\nAgent response:")
print(result["messages"][-1].content)
