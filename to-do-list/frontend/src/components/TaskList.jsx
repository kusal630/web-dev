import TaskItem from './TaskItem';

function TaskList({ todos }) {
  if (todos.length === 0) {
    return <p className="empty">No tasks yet. Add one above! 🎉</p>;
  }
  return (
    <ul className="task-list">
      {todos.map((todo) => (
        <TaskItem key={todo._id} todo={todo} />
      ))}
    </ul>
  );
}

export default TaskList;
