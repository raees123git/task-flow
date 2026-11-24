import { useState, useEffect } from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { useNavigate } from "react-router-dom";

function TodoDashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTasks() {
      try {
        const response = await fetch("http://localhost:3000/todos", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("response is: ",response);
        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }

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
          headers: { "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
           }, 
          body: JSON.stringify({ task: newTaskText, status: "pending" }) 
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
          method: "DELETE",
          headers: {Authorization: `Bearer ${token}`}
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      setTasks((prev) =>
        prev.filter((task) => task._id !== taskId)
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
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
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
        task._id === taskId ? updatedTask : task
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
          "Content-Type": "application/json",
           Authorization: `Bearer ${token}`
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
        task._id === taskId ? updatedTask : task
      )
    );

  } catch (error) {
    alert("Failed to update status. Please try again.");
    console.error("Error updating status:", error);
  }
  }


  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <>
      <TodoForm handleAddTask={handleAddTask} handleLogout={handleLogout}/>
      <TodoList tasks={tasks} loading={loading} handleDeleteTask={handleDeleteTask} handleEditTask={handleEditTask} handleStatusChange={handleStatusChange}/>
    </>
  );
}

export default TodoDashboard;
