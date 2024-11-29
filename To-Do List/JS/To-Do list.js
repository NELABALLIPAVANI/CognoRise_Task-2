document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');

    // Load tasks from LocalStorage
    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToDOM(task));
    };

    const addTaskToDOM = (task) => {
        const li = document.createElement('li');
        li.textContent = task;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            li.remove();
            saveTasks();
        });

        li.appendChild(deleteButton);
        taskList.appendChild(li);
    };

    const saveTasks = () => {
        const tasks = Array.from(taskList.children).map(li => li.firstChild.textContent);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Add new task
    addTaskButton.addEventListener('click', () => {
        const task = taskInput.value.trim();
        if (task) {
            addTaskToDOM(task);
            saveTasks();
            taskInput.value = '';
        }
    });

    // Load existing tasks
    loadTasks();
});