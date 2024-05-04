// Get references to DOM elements
let addToDoButton = document.getElementById('addToDo');
let toDoContainer = document.getElementById('toDoContainer');
let inputField = document.getElementById('inputField');

// Function to generate a unique key for tasks
function generateUniqueKey() {
  let generatedKey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  return generatedKey;
}

// Function to store tasks in local storage
function storeTask(taskText) {
  let key = generateUniqueKey();
  localStorage.setItem(key, taskText);
  localStorage.setItem(key + '-completed', 'false'); // Set default completion flag to false

}



// Function to retrieve tasks from local storage 
function retrieveTasks() {
  let storedTasks = {};
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    storedTasks[key] = localStorage.getItem(key);
  }
   console.log(storedTasks);
  return storedTasks;
}

// Function to display retrieved tasks
function displayTasks(tasks) {
  toDoContainer.innerHTML = ''; //Clear existing tasks before displaying new ones.
  for (let key in tasks) {
    if (!key.includes('-completed')) {
      let paragraph = document.createElement('p');
      paragraph.innerText = tasks[key];
      paragraph.classList.add('paragraph-styling');
      
      // ***Check if task is marked as completed in local storage
      if (localStorage.getItem(key + '-completed') === 'true') {
        paragraph.style.textDecoration = "line-through";
      }
      paragraph.setAttribute('data-task-key', key);
      toDoContainer.appendChild(paragraph);
      
    }
  }
}

// Function to add a new task
function addNewTask() {
  // ***Storing input value
  let taskText = inputField.value.trim();  //Trim leading/trailing whitespace
  
  if (taskText) {
    storeTask(taskText); // Store task in local storage
    //localStorage.key(taskText)
    //console.log(localStorage.key(taskText));
    displayTasks(retrieveTasks());
    inputField.value = '';
  } else {
    alert('Please enter a task!'); // Handle empty input
  }
}

// Function to mark a task as complete/incomplete
function toggleTaskCompletion(taskElement) {
  let key = taskElement.dataset.taskKey;
  let isCompleted = localStorage.getItem(key + '-completed') === 'true';
  localStorage.setItem(key + '-completed', isCompleted ? 'false' : 'true');
  taskElement.style.textDecoration = isCompleted ? "" : "line-through";

  console.log(localStorage);
}

// Function to remove a task
function removeTask(taskElement) {
  let key = taskElement.dataset.taskKey;
  
  localStorage.removeItem(key); // Remove task from local storage
  localStorage.removeItem(key + '-completed'); // Remove completed tasks from local storage
  toDoContainer.removeChild(taskElement);  
}

// 

// Event listener for adding tasks
addToDoButton.addEventListener('click', addNewTask);

//Event listener for task completion (click)
  
toDoContainer.addEventListener('click', function (event) {
  if (event.target.tagName === 'P') {
    toggleTaskCompletion(event.target);
  }
});

// //Event listener for task removal (double-click)
toDoContainer.addEventListener('dblclick', function (event) {
    if (event.target.tagName === 'P') {
      removeTask(event.target);
    }
  });


// Load tasks from local storage on page load
window.onload = function () {
  let storedTasks = retrieveTasks();
  displayTasks(storedTasks); // Display retrieved tasks
}

/*
let keyKey = generateUniqueKey();

myObj = {
  name: 'does something',
  really: true
}
console.log(typeof myObj);
localStorage.setItem(keyKey,JSON.stringify(myObj));
const data = localStorage.getItem(keyKey)
const data1 = JSON.parse(localStorage.getItem(keyKey))    
console.log(typeof localStorage.getItem);
console.log(typeof data);
console.log(data);
console.log(data1);

*/


//********************************************************** */

// Instead of generating a unique key for each task and storing each task separately, consider using a single key for the entire to-do list. This will make it easier to manage and retrieve the list from Local Storage.

/*
// Converting Tasks to JSON: You can convert the tasks from JavaScript objects to a JSON string using JSON.stringify(). This is useful when you want to save the tasks in local storage or send them to a server.
function storeTask(taskText) {
  let key = generateUniqueKey();
  let taskData = {
    text: taskText,
    completed: false
  };
  localStorage.setItem(key, JSON.stringify(taskData));
}

// Parsing JSON to JavaScript Objects: When retrieving tasks from local storage, you’ll need to convert the JSON string back into a JavaScript object using JSON.parse().
function retrieveTasks() {
  let storedTasks = {};
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (!key.includes('-completed')) {
      storedTasks[key] = JSON.parse(localStorage.getItem(key));
    }
  }
  return storedTasks;
}

//Updating the Display Function: Modify the displayTasks function to handle the parsed objects.
function displayTasks(tasks) {
  toDoContainer.innerHTML = '';
  for (let key in tasks) {
    let task = tasks[key];
    let paragraph = document.createElement('p');
    paragraph.innerText = task.text;
    paragraph.classList.add('paragraph-styling');
    paragraph.style.textDecoration = task.completed ? "line-through" : "";
    paragraph.setAttribute('data-task-key', key);
    toDoContainer.appendChild(paragraph);
  }
}

//Updating Task Completion: Adjust the toggleTaskCompletion function to work with the task object.
function toggleTaskCompletion(taskElement) {
  let key = taskElement.dataset.taskKey;
  let task = JSON.parse(localStorage.getItem(key));
  task.completed = !task.completed;
  localStorage.setItem(key, JSON.stringify(task));
  taskElement.style.textDecoration = task.completed ? "line-through" : "";
}

*/