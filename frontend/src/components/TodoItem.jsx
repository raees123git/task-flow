import { useState, useEffect, useRef } from "react";

function TodoItem({ task, index, status, taskId, handleEdit, handleDelete, handleStatusChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task);
  const [showStatusMenu, setShowStatusMenu] = useState(false); 
  const statusContainerRef = useRef(null);

  const statusOptions = [ "pending", "completed", "aborted" ];

  // 2. Add an effect to listen for clicks outside the referenced element
  useEffect(() => {
    function handleClickOutside(event) {
      if (statusContainerRef.current && !statusContainerRef.current.contains(event.target)) {
        setShowStatusMenu(false);
      }
    }

    // Attach the event listener if the menu is open
    if (showStatusMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    
    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showStatusMenu]);


  function handleSaveClick() {
    if (editText.trim() === "") return;
    handleEdit(taskId, editText);
    setIsEditing(false);
  }

  function handleCancelClick() {
    setIsEditing(false);
  }

  function handleStatusClick() { 
    setShowStatusMenu((prev) => !prev); 
  }
  
  
  function handleStatusSelect(newStatus) { 
    handleStatusChange(taskId, newStatus);
    setShowStatusMenu(false);
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

      <div className="task-status" ref={statusContainerRef}>
        <button className="status-badge" onClick={handleStatusClick} > {status} </button>

        {showStatusMenu && ( 
          <div className="status-menu"> 
          <div className="status-menu-title"> Current status: <strong>{status}</strong> </div>
          {statusOptions.map((option) => ( 
            <button key={option} className={ option === status ? "status-option active" : "status-option" } 
            onClick={() => handleStatusSelect(option)} > 
            {option} {option === status && ( <span>✓</span> )} </button> ))
          } 
      </div> )}



      </div>

      {/* <div className="task-status">
        <span className="status-badge">{taskId}</span>
      </div> */}

      <div className="task-actions">
        {isEditing ? (
          <>
            <button className="save-button" onClick={handleSaveClick}>Save</button>
            <button className="cancel-button" onClick={handleCancelClick}>Cancel</button>
          </>
        ) : (
          <>
            <button className="edit-button" onClick={() => setIsEditing(true)}>Edit</button>
            <button className="delete-button" onClick={() => handleDelete(taskId)}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
}

export default TodoItem;
