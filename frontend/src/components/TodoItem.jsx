import { useState } from "react";

function TodoItem({ task, index, handleSave, handleDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task);

  function handleSaveClick() {
    if (editText.trim() === "") return;
    handleSave(index, editText);
    setIsEditing(false);
  }

  function handleCancelClick() {
    setIsEditing(false);
    setEditText(task); // Reset to original text
  }

  return (
    <div className="task-row">
      <div className="task-number">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="task-name">
        {isEditing ? (
          <input
            className="edit-input"
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSaveClick()}
            // above is a shorthand for:
            // onKeyDown={(e) => {  
            //     if (e.key === "Enter") {
            //         handleSaveClick();
            //     }
            //     }}
            autoFocus
          />
        ) : (
          <span>{task}</span>
        )}
      </div>

      <div className="task-status">
        <span className="status-badge">Pending</span>
      </div>

      <div className="task-actions">
        {isEditing ? (
          <>
            <button className="save-button" onClick={handleSaveClick}>Save</button>
            <button className="cancel-button" onClick={handleCancelClick}>Cancel</button>
          </>
        ) : (
          <>
            <button className="edit-button" onClick={() => setIsEditing(true)}>Edit</button>
            <button className="delete-button" onClick={() => handleDelete(index)}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
}

export default TodoItem;
