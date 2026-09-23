import { useState } from "react";

function TodoList({ tasks, setTasks }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  function startEdit(index, currentText) {
    setEditingIndex(index);
    setEditText(currentText);
  }

  function handleSave(indexToUpdate) {
    if (editText.trim() === "") {
      return;
    }

    setTasks((previousTasks) =>
      previousTasks.map((task, index) =>
        index === indexToUpdate ? editText : task
      )
    );

    setEditingIndex(null);
    setEditText("");
  }

  function handleDelete(indexToDelete) {
    setTasks((previousTasks) =>
      previousTasks.filter(
        (_, index) => index !== indexToDelete
      )
    );

    if (editingIndex === indexToDelete) {
      setEditingIndex(null);
      setEditText("");
    }
  }

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
          <div className="task-row" key={`${task}-${index}`}>

            <div className="task-number">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className="task-name">
              {editingIndex === index ? (
                <input
                  className="edit-input"
                  type="text"
                  value={editText}
                  onChange={(event) =>
                    setEditText(event.target.value)
                  }
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSave(index);
                    }
                  }}
                  autoFocus
                />
              ) : (
                <span>{task}</span>
              )}
            </div>

            <div className="task-status">
              <span className="status-badge">
                Pending
              </span>
            </div>

            <div className="task-actions">

              {editingIndex === index ? (
                <>
                  <button
                    className="save-button"
                    onClick={() => handleSave(index)}
                  >
                    Save
                  </button>

                  <button
                    className="cancel-button"
                    onClick={() => {
                      setEditingIndex(null);
                      setEditText("");
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="edit-button"
                    onClick={() => startEdit(index, task)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-button"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </>
              )}

            </div>
          </div>
        ))
      )}

    </div>
  );
}

export default TodoList;