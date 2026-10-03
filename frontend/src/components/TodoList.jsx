import TodoItem from "./TodoItem";

function TodoList({tasks, loading, handleDeleteTask, handleEditTask, handleStatusChange}) {

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
            key={task._id} 
            index={index}
            task={task.task}
            status={task.status}
            taskId={task._id}
            handleEdit={handleEditTask}
            handleDelete={handleDeleteTask}
            handleStatusChange={handleStatusChange}
          />
        ))
      )}
    </div>
  );
}

export default TodoList;
