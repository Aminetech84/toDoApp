import { useState, useEffect } from "react";
import "./App.css";

function App() {
  //Global state
  const [tasks, setTasks] = useState([]);

  //Adding a task state
  const [task, setTask] = useState({
      text : '',
      completed: false
    });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };
    fetchTasks();
  }, []);

  const handleChange = (e) => {

    setTask({
      ...task,
      text: e.target.value,
    });
  };

const addTask = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("/api/tasks/", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const newTask = await response.json();
    setTasks([...tasks, newTask]);
    setTask({
      text: '',
      completed: false
    });
  } catch (error) {
    console.error("Error adding task", error);
  }
  console.log("Task Added");
};

  const handleDelete = async (taskId) => {
    try {
      await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  const handleToggleCompletion = async (taskId) => {
    try {
      const taskToUpdate = tasks.find((task) => task._id === taskId)
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !taskToUpdate.completed,
        }),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setTasks(
          tasks.map((task) => (task._id === taskId ? updatedTask : task))
        );
      } else {
        console.error("Error updating task", response.statusText);
      }
    } catch (error) {
      console.error("Network error", error);
    }
  };

  return (
    <div className="App">
      <form onSubmit={addTask}>
        <input name="text"
        type="text"
    value={task.text}
        placeholder="Add Tasks"
        onChange={handleChange}
      />
      <button type="submit">Add Tasks</button>
      </form>
      
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <span style={{textDecoration: task.completed ? 'line-through' : 'none' }}
            onClick={() => handleToggleCompletion(task._id) }
            >
            {task.text}
            </span>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

/**
 * 
 * const handleToggleCompletion = async (taskId) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: !tasks.find((task) => task._id === taskId).completed,
        }),
      });

      if (response.ok) {
        const updatedTasks = await response.json();
        setTasks(
          tasks.map((task) => (task._id === taskId ? updatedTasks : task))
        );
      } else {
        console.error("Error updating task", response.statusText);
      }
    } catch (error) {
      console.error("Network error", error);
    }
  };
 * 
 * 
 * 
 * <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleCompletion(task._id)}
            />
 * 
 */