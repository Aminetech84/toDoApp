// Get references to DOM elements
let addToDoButton = document.getElementById("addToDo");
let toDoContainer = document.getElementById("toDoContainer");
let inputField = document.getElementById("inputField");

// Function to store tasks on the server
async function storeTask(taskText) {
  let taskData = {
    text: taskText,
    completed: false,
  };

  try {
    const response = await fetch("http://127.0.0.1:5000/api/tasks", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    if (response.ok) {
      // Task stored successfully
      displayTasks(await retrieveTasks());
    } else {
      console.error("Error storing task", response.statusText);
    }
  } catch (err) {
    console.error("Network error", err);
  }
}

// Function to retrieve tasks from the server
async function retrieveTasks() {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/tasks");

    if (response.ok) {
      const tasks = await response.json();
      return tasks;
    } else {
      console.error("Error retrieving tasks", response.statusText);
      return {};
    }
  } catch (err) {
    console.error("Network error", err);
    return {};
  }
}



// Function to display retrieved tasks
function displayTasks(tasks) {
  toDoContainer.innerHTML = ""; //Clear existing tasks before displaying new ones.
  //console.log(tasks);
  tasks.forEach(task => {
    const paragraph = document.createElement("p");
    paragraph.innerText = task.text;
    paragraph.classList.add("paragraph-styling");
    paragraph.style.textDecoration = task.completed ? "line-through" : "";
    paragraph.dataset.taskId = task._id;
    toDoContainer.appendChild(paragraph);
    
  });
  
  
}
/*
// Function to add a new task
function addNewTask() {
  // ***Storing input value
  let taskText = inputField.value.trim(); //Trim leading/trailing whitespace
  if (taskText) {
    storeTask(taskText); // Store task in local storage
    inputField.value = "";
  } else {
    alert("Please enter a task!"); // Handle empty input
  }
}*/

// Function to mark a task as complete/incomplete
async function toggleTaskCompletion(taskElement) {
  const id = taskElement.dataset.taskId;
  const currentCompleted = taskElement.style.textDecoration === "line-through"
const newCompleted = !currentCompleted
  //const task = await retrieveTaskById(id); // Fetch the latest task data
 // console.log(task);

  //task.completed = !task.completed;
  
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ completed: newCompleted }),
    });
    
    if (response.ok) {
      const updatedTask = await response.json();
      taskElement.style.textDecoration = updatedTask.completed
      ? "line-through"
      : "";
    } else {
      console.error("Error updating task", response.statusText);
    }
  } catch (err) {
    console.error("Network error", err);
  }
}

// Function to retrieve a single task by ID
async function retrieveTaskById(id) {
  
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/tasks/${id}`);
//console.log(id);
    if (response.ok) {
      const task = await response.json();
      return task;
    } else {
      console.error("Error retrieving task:", response.statusText);
      return null
    }
  } catch (err) {
    console.error("Network error", err);
    return null;
  }
}

// Function to remove a task
async function removeTask(taskElement) {
  const id = taskElement.dataset.taskId;
  
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/tasks/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      toDoContainer.removeChild(taskElement);
    } else {
      console.error("Error deleting task", response.statusText);
    }
  } catch (err) {
    console.error("Network error", err);
  }
}

// Event listener for adding tasks
addToDoButton.addEventListener('click', () => {
  const taskText = inputField.value.trim();
  if (taskText) {
    storeTask(taskText);
    inputField.value = '';
  } else {
    alert('Please enter a task!');
  }
});



//Event listener for task completion (click)
toDoContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "P") {
    toggleTaskCompletion(event.target);
  }
  console.log(event.target);
});

// //Event listener for task removal (double-click)
toDoContainer.addEventListener("dblclick", (event) => {
  if (event.target.tagName === "P") {
    removeTask(event.target);
  }
});

// Load tasks from local storage on page load
window.onload = async () => {
  const storedTasks = await retrieveTasks();
  displayTasks(storedTasks); // Display retrieved tasks
};
