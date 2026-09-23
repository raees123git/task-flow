import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  // const [tasks, setTasks] = useState([]);
  const [tasks, setTasks] = useState(["Play", "Buy groceries", "Sleep"]);

  return (
    <div className="app">
      <Header />

      <main className="dashboard">
        <TodoForm setTasks={setTasks} />

        <TodoList
          tasks={tasks}
          setTasks={setTasks}
        />
      </main>
    </div>
  );
}

export default App;