import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Equivalent of componentDidMount
  useEffect(() => {
    axios
      .get('/api/todos')
      .then((res) => setTodos(res.data))
      .catch((err) => console.error('Fetch error:', err));
  }, []);

  const handleInputChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const newTask = { task: newTodo, completed: false };

    try {
      const res = await axios.post('/api/todos', newTask);
      setTodos([res.data, ...todos]);
      setNewTodo('');
    } catch (err) {
      console.error('Add error:', err);
    }
  };

  return (
    <div className="app">
      <h1>📝 MERN Todo App</h1>
      <TaskForm
        newTodo={newTodo}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      <TaskList todos={todos} />
    </div>
  );
}

export default App;
