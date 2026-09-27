import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import TodoDashboard from "./pages/TodoDashboard";
import TodoList from "./components/TodoList";

function App() {

  return (
    <div className="app">
      <Header />
      <main className="dashboard">
      <TodoDashboard />
    </main>
    </div>
  );
}

export default App;