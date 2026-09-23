import { useState } from "react";

function TodoForm({ setTasks }) {
  const [text, setText] = useState("");

  function handleAdd() {
    if (text.trim() === "") {
      return;
    }

    setTasks((previousTasks) => {
      return [...previousTasks, text];
    });

    setText("");
  }

  return (
    <div className="todo-form">
      <input
        type="text"
        placeholder="What needs to be done?"
        value={text}
        onChange={(event) => setText(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleAdd();
          }
        }}
      />

      <button className="add-button" onClick={handleAdd}>
        + Add Task
      </button>
    </div>
  );
}

export default TodoForm;