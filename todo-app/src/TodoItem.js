// TodoItem.js
import React from 'react';

const TodoItem = ({ task, deleteTask, toggleCompleted }) => {
  return (
    <div className={`todo-item ${task.completed ? 'completed' : ''}`}>
      <p>{task.text}</p>
      <div>
        <button
          className="complete-btn"
          onClick={() => toggleCompleted(task.id)}
        >
          {task.completed ? 'Undo' : 'Complete'}
        </button>
        <button className="delete-btn" onClick={() => deleteTask(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
