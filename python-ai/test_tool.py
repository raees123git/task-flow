from tools import create_todo

result = create_todo.invoke({
    "task": "Learn js"
})

print(result)