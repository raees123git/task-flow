import { useState, useEffect } from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

function TodoDashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch("http://localhost:3000/todos");
        const data = await response.json();
        console.log("Fetched tasks:", data);
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTasks();
  }, []);

  async function handleAddTask(newTaskText) {
    try { 
      const response = await fetch("http://localhost:3000/todos",{
          method: "POST", 
          headers: { "Content-Type": "application/json" }, 
          body: JSON.stringify({ task: newTaskText, status: "Pending" }) 
        });
          if (!response.ok) { 
            throw new Error("Failed to create todo"); 
          }
          const createdTask = await response.json(); 
          console.log("Created task:", createdTask); 
          setTasks((prev) => [...prev, createdTask]); 
        }
    catch (error) {
            alert("Failed to create task. Please try again.");
            console.error("Error creating todo:", error);
          }
    }
 
  async function handleDeleteTask(taskId) {
    try {
      const response = await fetch(
        `http://localhost:3000/todos/${taskId}`,
        {
          method: "DELETE"
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      setTasks((prev) =>
        prev.filter((task) => task.id !== taskId)
      );

    } catch (error) {
      alert("Failed to delete task. Please try again.");
      console.error("Error deleting todo:", error);
    }
  }





  async function handleEditTask(taskId, newTaskText) {
  try {
    const response = await fetch(
      `http://localhost:3000/todos/${taskId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          task: newTaskText
        })
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update todo");
    }
    const updatedTask = await response.json();
    console.log("Updated task:", updatedTask);

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? updatedTask : task
      )
    );

  } catch (error) {
    alert("Failed to update task. Please try again.");
    console.error("Error updating todo:", error);
  }
}


async function handleStatusChange(taskId, newStatus) {
  try {
    const response = await fetch(
      `http://localhost:3000/todos/${taskId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          status: newStatus
        })
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update status");
    }

    const updatedTask = await response.json();

    console.log("Updated task:", updatedTask);

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? updatedTask : task
      )
    );

  } catch (error) {
    alert("Failed to update status. Please try again.");
    console.error("Error updating status:", error);
  }
}






  return (
    <>
      <TodoForm handleAddTask={handleAddTask} />
      <TodoList tasks={tasks} loading={loading} handleDeleteTask={handleDeleteTask} handleEditTask={handleEditTask} handleStatusChange={handleStatusChange}/>
    </>
  );
}

export default TodoDashboard;
