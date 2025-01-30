import { create } from 'zustand'; 

const useStore = create((set) => ({
  todos: [],
  setTodos: (todos) => set({ todos }),
  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
  deleteTodo: (id) => set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
  updateTodo: (id, updatedTodo) => set((state) => ({
    todos: state.todos.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo)),
  })),
}));

export default useStore;
