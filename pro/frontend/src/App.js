import {useState, useEffect} from 'react'
import './App.css';

function App() {
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
}

export default App;
