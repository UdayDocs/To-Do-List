// tasks.js
import { saveTasksToLocalStorage, getTasksFromLocalStorage } from './localStorageUtils';

// Function to add a new task (saves to localStorage and renders)
export function addTask(taskData) {
  const tasks = getTasksFromLocalStorage();
  tasks.push(taskData);
  saveTasksToLocalStorage(tasks);
  renderTask(taskData); // Render after saving
}

// Function to render a task (only UI, no saving)
export function renderTask(taskData) {
  const todoList = document.getElementById('todo-list');
  const listItem = document.createElement('li');
  listItem.id = `task-${taskData.id}`;

  // Checkbox
  const taskCheckbox = document.createElement('input');
  taskCheckbox.type = 'checkbox';
  taskCheckbox.id = `task-checkbox-${taskData.id}`;
  taskCheckbox.checked = taskData.completed;

  // Label
  const taskLabel = document.createElement('label');
  taskLabel.htmlFor = taskCheckbox.id;
  taskLabel.textContent = taskData.title;
  taskLabel.style.textDecoration = taskData.completed ? 'line-through' : 'none';

  // Task Details
  const taskDetails = document.createElement('div');
  taskDetails.classList.add('task-details');
  taskDetails.innerHTML = `
    <p><strong>Description:</strong> ${taskData.description || 'N/A'}</p>
    <p><strong>Priority:</strong> ${taskData.priority || 'N/A'}</p>
    <p><strong>Due Date:</strong> ${taskData.dueDate || 'N/A'}</p>
    <p><strong>Project:</strong> ${taskData.project || 'N/A'}</p>
  `;

  // Delete Button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    deleteTask(taskData.id);
    listItem.remove();
  });

  // Checkbox Event Listener
  taskCheckbox.addEventListener('change', () => {
    const tasks = getTasksFromLocalStorage();
    const taskIndex = tasks.findIndex(task => task.id === taskData.id);
    if (taskIndex !== -1) {
      tasks[taskIndex].completed = taskCheckbox.checked;
      saveTasksToLocalStorage(tasks);
      taskLabel.style.textDecoration = taskCheckbox.checked ? 'line-through' : 'none';
    }
  });

  // Append elements
  listItem.appendChild(taskCheckbox);
  listItem.appendChild(taskLabel);
  listItem.appendChild(taskDetails);
  listItem.appendChild(deleteButton);
  todoList.appendChild(listItem);
}

export function deleteTask(taskId) {
  const tasks = getTasksFromLocalStorage();
  const updatedTasks = tasks.filter(task => task.id !== taskId);
  saveTasksToLocalStorage(updatedTasks);
}