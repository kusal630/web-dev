function TaskForm({ newTodo, handleInputChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={newTodo}
        onChange={handleInputChange}
        placeholder="Enter a new task..."
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
