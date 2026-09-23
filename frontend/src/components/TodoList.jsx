import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // PLACE YOUR BACKEND FETCHING HERE
  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch("http://localhost:3000/todos/");
        const data = await response.json();
        console.log("Fetched tasks:", data);
        setTasks(data);
        // setTasks(["Buy groceries", "Walk the dog", "Read a book"]); // Mock data
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, []);

  function handleSave(index, newTask) {
    setTasks((prev) =>
      prev.map((task, i) => (i === index ? { ...task, task: newTask } : task))
    );
  }

  function handleDelete(indexToDelete) {
    setTasks((prev) => prev.filter((_, index) => index !== indexToDelete));
  }

  if (loading) return <div className="loading">Loading tasks...</div>;

  return (
    <div className="task-container">
      <div className="task-header">
        <span>#</span>
        <span>Task</span>
        <span>Status</span>
        <span>Actions</span>
      </div>

      {tasks.length === 0 ? (
        <div className="empty-state">
          <h3>No tasks yet</h3>
          <p>Add your first task to get started.</p>
        </div>
      ) : (
        tasks.map((task, index) => (
          console.log("Rendering task:", task.task), 
          <TodoItem
            key={task.id} 
            task={task.task}
            index={index}
            handleSave={handleSave}
            handleDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}

export default TodoList;
