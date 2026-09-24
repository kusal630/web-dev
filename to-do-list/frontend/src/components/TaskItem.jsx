function TaskItem({ todo }) {
  return (
    <li className="task-item">
      <span>{todo.task}</span>
      <span className={todo.completed ? 'done' : 'pending'}>
        {todo.completed ? '✓' : '○'}
      </span>
    </li>
  );
}

export default TaskItem;
