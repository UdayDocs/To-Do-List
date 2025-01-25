//index.js -> The main file that initializes the app, loads data, and sets up event listeners.
import './style.css'; 
import { renderProject } from './Project'; 
import { Project } from './Project.js'; 
import { addTask } from './Task.js'; 
import { showProjectPopup, showTaskPopup, hideTaskPopup } from './UI';
import { saveTasksToLocalStorage, loadTasksFromLocalStorage } from './localStorageUtils';

// Initialize localStorage if empty
function loadProjects() {
  const projects = Project.loadAll();
  projects.forEach(project => renderProject(project));
}

if (!localStorage.getItem('tasks')) {
  saveTasksToLocalStorage([]);
  loadProjects();
}

document.addEventListener('DOMContentLoaded', () => {        // Load tasks on page load
  loadTasksFromLocalStorage();                              // Load tasks only once
   loadProjects();
});

// Get DOM elements 
const addProjectButton = document.getElementById('add-project'); 
const addTaskButton = document.getElementById('add-todo'); 

// Event listeners 
addProjectButton.addEventListener('click', showProjectPopup); 
addTaskButton.addEventListener('click', showTaskPopup); 

addTaskButton.addEventListener('click', () => {
  showTaskPopup();
});

const addTaskForm = document.querySelector('.new-task-form');
addTaskForm.addEventListener('submit', (event) => {
  event.preventDefault(); 

  const addTaskButtonInPopup = document.querySelector('.add-task');
  addTaskButtonInPopup.addEventListener('click', () => {
    const taskTitle = document.getElementById('task-title').value;
    const taskDesc = document.getElementById('task-desc').value;
    const selectedProject = document.getElementById('projects-list').value;
    const selectedPriority = document.getElementById('task-priority').value;
    const dueDate = document.getElementById('task-dueDate').value;

    if (taskTitle.trim() !== '') {
      const newTaskData = {
        title: taskTitle,
        description: taskDesc,
        project: selectedProject,
        priority: selectedPriority,
        dueDate: dueDate,
        id: Date.now(),   // Ensure each task gets a unique ID
        completed: false // Default to not completed
      };
      addTask(newTaskData); 
      hideTaskPopup(); 
    }
  });
});

const cancelTaskButton = document.querySelector('.cancel-task');
cancelTaskButton.addEventListener('click', hideTaskPopup);