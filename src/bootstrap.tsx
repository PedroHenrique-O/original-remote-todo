import React from "react";
import { createRoot } from "react-dom/client";
import TodoApp from "./TodoApp";

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Remote Todo App
            </h1>
            <p className="text-gray-600">
              This app can run standalone or be consumed by the host app.
            </p>
          </div>
          <TodoApp />
        </div>
      </div>
    </React.StrictMode>
  );
}
