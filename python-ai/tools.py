import os
import httpx
from dotenv import load_dotenv
from langchain_core.tools import tool

load_dotenv()

BASE_URL = "http://localhost:3000"


@tool
def create_todo(task: str) -> dict:
    """Create a new todo task for the authenticated user."""

    token = os.getenv("TODO_JWT")

    if not token:
        raise ValueError("TODO_JWT is missing")

    response = httpx.post(
        f"{BASE_URL}/todos",
        json={
            "task": task,
            "status": "pending"
        },
        headers={
            "Authorization": f"Bearer {token}"
        },
        timeout=10.0
    )

    response.raise_for_status()

    return response.json()
