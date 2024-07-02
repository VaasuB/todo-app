import React, { useState, useEffect } from 'react';

function TodoList() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Doctor Appointment',
      completed: true,
      priority: 'high', // Initial priority value
      createdTime: new Date().getTime() // Timestamp of task creation
    },
    {
      id: 2,
      text: 'Meeting at School',
      completed: false,
      priority: 'medium', // Initial priority value
      createdTime: new Date().getTime() // Timestamp of task creation 24 hours ago
    }
  ]);

  const [text, setText] = useState('');
  const [priority, setPriority] = useState(''); // State for priority input
  const [searchText, setSearchText] = useState('');
  const [searchedTasks, setSearchedTasks] = useState([]);

  const priorityOptions = ['high', 'medium', 'low']; // Priority options for dropdown

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks(tasks =>
        tasks.map(task => ({
          ...task,
          pendingTime: new Date().getTime() - task.createdTime
        }))
      );
    }, 1000); // Update pending time every second

    return () => clearInterval(interval);
  }, []); // Run effect only once on component mount

  function addTask(text) {
    if (text.trim() === '') {
      return; // Do not add empty task
    }

    if (!priority) {
      alert('Please set the priority.'); // Prompt user to set priority
      return;
    }

    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      priority,
      createdTime: new Date().getTime()
    };

    // Find the index to insert the new task based on priority
    const insertIndex = tasks.findIndex(
      task =>
        priorityOptions.indexOf(task.priority) > priorityOptions.indexOf(priority) ||
        (task.pendingTime > 24 * 60 * 60 * 1000 && task.priority === priority)
    );

    if (insertIndex !== -1) {
      setTasks(prevTasks => [
        ...prevTasks.slice(0, insertIndex),
        newTask,
        ...prevTasks.slice(insertIndex)
      ]);
    } else {
      setTasks(prevTasks => [...prevTasks, newTask]);
    }

    setText('');
    setPriority(''); // Reset priority after adding task
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function toggleCompleted(id) {
    setTasks(tasks =>
      tasks.map(task => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  }

  function searchTask() {
    if (!searchText) {
      setSearchedTasks([]);
      return;
    }
    const foundTasks = tasks.filter(task => task.text.toLowerCase().startsWith(searchText.toLowerCase()));
    setSearchedTasks(foundTasks);
  }

  return (
    <div className="todo-list">
      <div className="search-bar">
        <input
          className="search-input"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          placeholder="Search task"
        />
        <button className="search-btn" onClick={searchTask}>
          Search
        </button>
      </div>
      {searchedTasks.length > 0 ? (
        searchedTasks.map(task => (
          <div
            className={`todo-item ${
              task.priority === 'high'
                ? 'high-priority'
                : task.priority === 'medium'
                ? 'medium-priority'
                : 'low-priority'
            } ${task.pendingTime > 24 * 60 * 60 * 1000 ? 'overdue' : ''}`}
            key={task.id}
          >
            <p style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.text}
            </p>
            <div>
              {task.completed ? (
                <button className="undo-btn" onClick={() => toggleCompleted(task.id)}>
                  Undo
                </button>
              ) : (
                <button className="complete-btn" onClick={() => toggleCompleted(task.id)}>
                  Complete
                </button>
              )}
              <button className="delete-btn" onClick={() => deleteTask(task.id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      ) : searchText ? (
        <p>No task found</p>
      ) : null}
      <div className="add-task-bar">
        <input
          className="taskbar"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add new task"
        />
        <select
          className="priority-dropdown"
          value={priority}
          onChange={e => setPriority(e.target.value)}
          placeholder="Select Priority"
        >
          <option value="" disabled>
            Select Priority
          </option>
          {priorityOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button className="add-btn" onClick={() => addTask(text)}>
          Add
        </button>
      </div>
      {tasks.map(task => (
        <div
          className={`todo-item ${
            task.priority === 'high'
              ? 'high-priority'
              : task.priority === 'medium'
              ? 'medium-priority'
              : 'low-priority'
          } ${task.pendingTime > 24 * 60 * 60 * 1000 ? 'overdue' : ''}`}
          key={task.id}
        >
          <p style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.text}
          </p>
          <div>
            {task.completed ? (
              <button className="undo-btn" onClick={() => toggleCompleted(task.id)}>
                Undo
              </button>
            ) : (
              <button className="complete-btn" onClick={() => toggleCompleted(task.id)}>
                Complete
              </button>
            )}
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodoList;
