// App.js
import React from 'react';
import TodoList from './TodoList';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1 className="heading">Todo-List</h1>
      <div className="todo-container">
        <TodoList />
      </div>
    </div>
  );
}

export default App;
