import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);

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

  



  return (
    <div className="App">
      {tasks.map((task) => {
        return <h1>{task.text}</h1>;
      })}
    </div>
  );
}

export default App;

/*

const [tasks, setTasks] = useState([{
  text: '',
  completed: false
}]);

useEffect(() => {
  fetch('/api/tasks').then(res => {
    if (res.ok) {
      console.log(res);
      return res.json();

    }
  }).then(jsonRes => setTasks(jsonRes))
  
});
return (
  <div className="App">
    {tasks.map(task => {
      return <h1>{task.text}</h1>
    })}
  </div>
);


*/
