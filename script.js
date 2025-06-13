document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks when the page loads
    loadTasks();

    // Add new task
    function addTask(taskText = null, save = true) {
        const text = taskText || taskInput.value.trim();

        if (text === "") {
            alert("Please enter a task.");
            return;
        }

        // Create the task <li>
        const li = document.createElement('li');
        li.textContent = text;

        // Create the remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Remove logic
        removeBtn.onclick = () => {
            taskList.removeChild(li);
            removeTaskFromStorage(text);
        };

        // Append to list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Save task
        if (save) {
            const tasks = getTasksFromStorage();
            tasks.push(text);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        // Clear input
        taskInput.value = '';
    }

    // Get tasks from storage
    function getTasksFromStorage() {
        return JSON.parse(localStorage.getItem('tasks') || '[]');
    }

    // Remove a task from storage
    function removeTaskFromStorage(taskText) {
        let tasks = getTasksFromStorage();
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks on page load
    function loadTasks() {
        const tasks = getTasksFromStorage();
        tasks.forEach(task => addTask(task, false));
    }

    // Event listeners
    addButton.addEventListener('click', () => addTask());

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
