import { useState } from "react";

function TodoForm(props) {
  const [text, setText] = useState("");
  
  function handleSubmit() {
    if (!text.trim()) {
      alert("Please enter a task first.");
      return;
    }

    props.handleAddTask(text);
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
            handleSubmit();
          }
        }}
      />

      <button className="add-button" onClick={handleSubmit}>
        + Add Task
      </button>
    </div>
  );
}

export default TodoForm;