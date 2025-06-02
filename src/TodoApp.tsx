import React, { useState, useEffect } from "react";
import "./TodoApp.css";
// import { tw } from "./utils/tw";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type FilterType = "all" | "active" | "completed";

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [filter, setFilter] = useState<FilterType>("all");

  // Load todos from localStorage
  useEffect(() => {
    const savedTodos = localStorage.getItem("module-federation-todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem("module-federation-todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (): void => {
    if (inputValue.trim() !== "") {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
    }
  };

  const toggleTodo = (id: number): void => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number): void => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = (): void => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = todos.length - completedCount;

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className="todo-card">
      <div className="text-center mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Todo List</h2>
        <p className="text-sm text-gray-600 italic">
          Remote component from localhost:3001
        </p>
      </div>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new todo..."
          className="todo-input"
        />
        <button onClick={addTodo} className="todo-button">
          Add
        </button>
      </div>

      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg mb-4">
        <span className="text-sm text-gray-600">Total: {todos.length}</span>
        <span className="text-sm text-gray-600">Active: {activeCount}</span>
        <span className="text-sm text-gray-600">
          Completed: {completedCount}
        </span>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          className={`todo-filter-button ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`todo-filter-button ${
            filter === "active" ? "active" : ""
          }`}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={`todo-filter-button ${
            filter === "completed" ? "active" : ""
          }`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      <div className="space-y-2 mb-6 min-h-200">
        {filteredTodos.length === 0 ? (
          <p className="text-center text-gray-500 italic py-8">
            {filter === "all" ? "No todos yet" : `No ${filter} todos`}
          </p>
        ) : (
          filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className={`flex items-center gap-3 p-3 border border-gray-200 rounded-md ${
                todo.completed ? "opacity-60 bg-gray-50" : ""
              }`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
              />
              <span
                className={`flex-1 ${
                  todo.completed
                    ? "line-through text-gray-500"
                    : "text-gray-900"
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="px-3 py-1 bg-red-500 text-white text-sm rounded-md transition-colors duration-200"
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.backgroundColor = "#dc2626")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.backgroundColor = "#ef4444")
                }
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {completedCount > 0 && (
        <button
          onClick={clearCompleted}
          className="w-full py-2 bg-gray-500 text-white rounded-md transition-colors duration-200"
          onMouseEnter={(e) =>
            ((e.target as HTMLElement).style.backgroundColor = "#4b5563")
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLElement).style.backgroundColor = "#6b7280")
          }
        >
          Clear Completed ({completedCount})
        </button>
      )}
    </div>
  );
};

export default TodoApp;
