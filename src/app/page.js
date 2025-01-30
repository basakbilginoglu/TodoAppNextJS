"use client"; 
import { useState, useEffect } from 'react';
import TodoList from '@/components/TodoList';  

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Fetch todos from the API
  useEffect(() => {
    console.log("API'yi çağırmaya çalışıyoruz..."); 
    async function fetchTodos() {
      try {
        const response = await fetch('/api/todos');
        
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
    
        const data = await response.json();
        setTodos(data);  // Verileri state'e set ediyoruz
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to fetch todos');  // Eğer hata oluşursa kullanıcıya bilgi veriyoruz
      }
    }
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (newTodo) {
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
        setTodos((prevTodos) => [...prevTodos, addedTodo]);
        setNewTodo('');
      } catch (error) {
        console.error('Error adding todo:', error);
      }
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
            <li key={todo.id || todo.title} className="flex justify-between items-center mb-4">
              <span>{todo.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
