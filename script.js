// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load tasks from local storage when the page loads
  loadTasks();

  // Add Task on button click
  addButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    addTask(taskText);
  });

  // Add Task on Enter key press
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      const taskText = taskInput.value.trim();
      addTask(taskText);
    }
  });

  // Function to add a new task
  function addTask(taskText, save = true) {
    if (!taskText) {
      alert('Please enter a task.');
      return;
    }

    // Create list item and remove button
    const li = document.createElement('li');
    li.textContent = taskText;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    // Remove task when remove button is clicked
    removeBtn.onclick = () => {
      taskList.removeChild(li);
      removeFromLocalStorage(taskText);
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Save to local storage
    if (save) {
      saveToLocalStorage(taskText);
    }

    // Clear input
    taskInput.value = '';
  }

  // Save task to Local Storage
  function saveToLocalStorage(taskText) {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
  }

  // Remove task from Local Storage
  function removeFromLocalStorage(taskText) {
    let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks = storedTasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
  }

  // Load tasks from Local Storage
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false));
  }
});
