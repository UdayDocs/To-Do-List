//UI.js - Controls showing/hiding popups for adding projects and tasks.
import { Project } from './Project.js';

const projectsList = document.getElementById('projects-list');
// Function to show the project popup 
export function showProjectPopup() { 
  const projectPopup = document.querySelector('.new-project-popup'); 
  projectPopup.style.display = 'block'; 
} 

// Function to show the task popup 
export function showTaskPopup() {
  const taskPopup = document.querySelector('.new-task-popup');
  taskPopup.style.display = 'block';
  
  // Use the DOM reference we created
  projectsList.innerHTML = '';
  Project.loadAll().forEach(project => {
    const option = document.createElement('option');
    option.value = project.name;
    option.textContent = project.name;
    projectsList.appendChild(option);
  });
}

export function hideTaskPopup() {
  const taskPopup = document.querySelector('.new-task-popup');
  taskPopup.style.display = 'none';

  // Clear the task form fields
  document.getElementById('task-title').value = '';
  document.getElementById('task-desc').value = '';
  document.getElementById('projects-list').value = ''; // Or select a default option
  document.getElementById('task-priority').value = 'Low'; // Or set a default value
  document.getElementById('task-dueDate').value = ''; 
}