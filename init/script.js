let addToDoButton = document.getElementById('addToDo');
let toDoContainer = document.getElementById('toDoContainer');
let inputField = document.getElementById('inputField');

addToDoButton.addEventListener('click', function () {
    let paragraph = document.createElement('p');
    paragraph.innerText= inputField.value;
    paragraph.classList.add('paragraph-styling')
    toDoContainer.appendChild(paragraph);
    inputField.value = '';
    paragraph.addEventListener('click', function () {
        paragraph.style.textDecoration="line-through";
    })
    paragraph.addEventListener('dblclick', function () {
        toDoContainer.removeChild(paragraph);
    })
})


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
