// Get references to DOM elements
let addToDoButton = document.getElementById('addToDo');
let toDoContainer = document.getElementById('toDoContainer');
let inputField = document.getElementById('inputField');

// Function to generate a unique key for tasks
function generateUniqueKey() {
  let key = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  return key;
}

// Function to store tasks in local storage
function storeTask(taskText) {
  let key = generateUniqueKey();
  localStorage.setItem(key, taskText);
}

// Function to retrieve tasks from local storage 
function retrieveTasks() {
  let storedTasks = {};
  for (let i = 0; localStorage.getItem(i) !== null; i++) {
    let key = localStorage.key(i);
    storedTasks[key] = localStorage.getItem(key);
  }
  // console.log(storedTasks);
  return storedTasks;
}

// Function to display retrieved tasks
function displayTasks(tasks) {
  for (let key in tasks) {
    let paragraph = document.createElement('p');
    paragraph.innerText = tasks[key];
    paragraph.classList.add('paragraph-styling');

    // ***Check if task is marked as completed in local storage (implementation needed)
    if (localStorage.getItem(key + '-completed') === 'true') {
      paragraph.style.textDecoration = "line-through";
    }

    toDoContainer.appendChild(paragraph);
  }
}

// Event listener for adding tasks
addToDoButton.addEventListener('click', function () {
  // ***Storing input value
  let taskText = inputField.value.trim();  //Trim leading/trailing whitespace

  // Checking input value
  if (taskText) {
    storeTask(taskText); // Store task in local storage
    //localStorage.key(taskText)
    //console.log(localStorage.key(taskText));
    let paragraph = document.createElement('p');
    paragraph.innerText = taskText;
    paragraph.classList.add('paragraph-styling')
    paragraph.setAttribute('data-task-key', generateUniqueKey()); // Add unique key attribute
 const org =paragraph.dataset.taskKey;
      console.log(org);
    toDoContainer.appendChild(paragraph);
    inputField.value = '';

    // Add event listeners for completion and removal
    paragraph.addEventListener('click', function () {
      
    /** */  paragraph.style.textDecoration = paragraph.style.textDecoration === "line-through" ? "" : "line-through";
     /** */ localStorage.setItem(paragraph.dataset.taskKey + '-completed', paragraph.style.textDecoration === 'line-through' ? 'true' : 'false');
      console.log(paragraph.dataset.taskKey);
    });
    paragraph.addEventListener('dblclick', function () {
      toDoContainer.removeChild(paragraph);
      localStorage.removeItem(localStorage.dataset.taskKey); // Remove task from local storage
      localStorage.removeItem(localStorage.dataset.taskKey + '-completed'); // Remove completed tasks
      //console.log();
    });
  } else {
    alert('Please enter a task!'); // Handle empty input
  }
});

// Load tasks from local storage on page load
window.onload = function () {
  let storedTasks = retrieveTasks();
  displayTasks(storedTasks); // Display retrieved tasks
}

/**
 * // Get references to DOM elements
let addToDoButton = document.getElementById('addToDo');
let toDoContainer = document.getElementById('toDoContainer');
let inputField = document.getElementById('inputField');

// Add event listener to "Add" button
addToDoButton.addEventListener('click', function () {
  // Create a new paragraph element
  let paragraph = document.createElement('p');

  // Set the paragraph text content to the input field value
  paragraph.innerText = inputField.value;

  // Add a class for styling purposes (likely for styling)
  paragraph.classList.add('paragraph-styling');

  // Append the paragraph to the to-do container
  toDoContainer.appendChild(paragraph);

  // Clear the input field for the next to-do item
  inputField.value = '';

  // Add event listener to the to-do container (listens for clicks on all to-do items)
  toDoContainer.addEventListener('click', function(event) {
    // Check for the type of click event (single or double click)
    if (event.type === 'click') {
      // Toggle line-through style on single click to mark as complete
      paragraph.style.textDecoration = "line-through";
    } else if (event.type === 'dblclick') {
      // Remove paragraph element on double click to delete the item
      toDoContainer.removeChild(paragraph);
    }
  });
});
 */
