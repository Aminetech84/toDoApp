import { useState, useEffect } from "react";
import "./App.css";
import axios from 'axios'
function App() {
  const [tasks, setTasks] = useState([
    {
      text : '',
      completed: false
    }
  ]);

  const [task, setTask] = useState();

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
    const storedTask = e.target.value
    //const {text, value} = e.target
    console.log(storedTask);
    
    setTask( prevInput => {
     return {
      ...prevInput,
      text: storedTask,
      completed: false
    }
    });
  };

const addTask = (e) => {
  e.preventDefault();
  console.log("Task Added");
  const newTask = {
    text : task.text,
    completed: false
  }
  
  axios.post('api/tasks', newTask);
}

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

  return (
    <div className="App">
      <form action="">
        <input name="text"
        type="text"
    
        placeholder="Add Tasks"
        onChange={handleChange}
      />
      </form>
      
      <button onClick={addTask}>Add Tasks</button>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.text}
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

/**
 * <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleCompletion(task._id)}
            />
 * 
 */