import { useState, useEffect } from 'react';
import useStore from '@/app/stores/UseTodoStore';
export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('/api/todos');
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const data = await response.json();
        setTodos(data); // Todos'u state'e set ediyoruz
      } catch (error) {
        console.error(error);
      }
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (!newTodo) return;

    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTodo }),
      });

      if (!response.ok) {
        throw new Error('Failed to add todo');
      }

      const addedTodo = await response.json();
      setTodos((prevTodos) => [...prevTodos, addedTodo]); // Yeni todo'yu ekliyoruz
      setNewTodo('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id)); // Todo'yu listeden çıkarıyoruz
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateTodo = async (id, updatedTitle, updatedCompleted) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: updatedTitle, completed: updatedCompleted }),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }

      const updatedTodo = await response.json();
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, title: updatedTodo.title, completed: updatedTodo.completed } : todo
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">Todo List</h1>
        
        <div className="mb-4">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Yeni todo ekle..."
          />
          <button
            onClick={handleAddTodo}
            className="w-full mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Todo Ekle
          </button>
        </div>

        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="flex justify-between items-center mb-4">
              <span>{todo.title}</span>

              {/* Güncelleme Butonu */}
              <button
                onClick={() => handleUpdateTodo(todo._id, 'Updated Title', !todo.completed)}
                className="ml-2 p-2 bg-yellow-500 text-white rounded"
              >
                Güncelle
              </button>

              {/* Silme Butonu */}
              <button
                onClick={() => handleDeleteTodo(todo.id)}
                className="ml-2 p-2 bg-yellow 500 text-black rounded"
              >
                Sİl
              </button>
              <button className="bg-red-500 p-2">Test Button</button>

            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
