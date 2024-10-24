const taskList = document.querySelector('.task-list');
const addBtn = document.querySelector('.add-btn');
const taskInput = document.querySelector('#task-input');

// Function to load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
}

// Function to create a task element
function createTaskElement(text, completed = false) {
    const task = document.createElement('div');
    task.classList.add('task');

    const taskContent = document.createElement('div');
    taskContent.classList.add('task-content');

    const textDiv = document.createElement('div');
    textDiv.classList.add('text');

    const input = document.createElement('input');
    input.setAttribute('type', 'radio');
    input.checked = completed;

    const para = document.createElement('p');
    para.textContent = text;

    textDiv.appendChild(input);
    textDiv.appendChild(para);

    // Apply styles based on completion status
    if (completed) {
        para.style.textDecoration = 'line-through';
        para.style.color = '#888';
        taskContent.style.filter = 'blur(3px)';
    }

    input.addEventListener('change', () => {
        if (input.checked) {
            para.style.textDecoration = 'line-through';
            para.style.color = '#888';
            taskContent.style.filter = 'blur(3px)';
        } else {
            para.style.textDecoration = 'none';
            para.style.color = '#000';
            taskContent.style.filter = 'none';
        }
        saveTasks(); // Save tasks on change
    });

    const cross = document.createElement('div');
    cross.classList.add('cross');

    const icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-xmark');

    icon.addEventListener('click', () => {
        task.remove();
        saveTasks(); // Save tasks on remove
    });

    cross.appendChild(icon);
    taskContent.appendChild(textDiv);
    task.appendChild(taskContent);
    task.appendChild(cross);
    taskList.appendChild(task);
}

// Function to save tasks to local storage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task').forEach(task => {
        const text = task.querySelector('.text p').textContent;
        const completed = task.querySelector('input[type="radio"]').checked;
        tasks.push({ text, completed });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listener for the add button
addBtn.addEventListener('click', (event) => {
    const str = taskInput.value;

    // Check if the input is not empty
    if (str.trim() === '') {
        alert('Please enter a task!');
        return;
    }

    createTaskElement(str);
    saveTasks(); // Save tasks after adding new task
    taskInput.value = ''; // Clear the input field
});

// Load tasks when the page is loaded
window.addEventListener('load', loadTasks);
