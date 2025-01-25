// project.js ->  Handles creating projects, saving/loading them, and rendering.
const projectNameInput = document.getElementById('project-name');
const projectList = document.getElementById('project-list');
const newProjectPopup = document.querySelector('.new-project-popup');
const newProjectForm = document.querySelector('.new-project-form');

export class Project {
  constructor(name) {
    this.id = Date.now(); // Unique ID like a fingerprint
    this.name = name;
  }
  static saveAll(projects) {
    localStorage.setItem('projects', JSON.stringify(projects));      // Save all projects to localStorage (static = oven for all cookies)
  }
  static loadAll() {
    return JSON.parse(localStorage.getItem('projects')) || [];     // Get all projects from localStorage (get cookie jar)
  }
}

export function renderProject(project) {
  // 1. Create list item FIRST
  const listItem = document.createElement('li');
  listItem.textContent = project.name;
  listItem.classList.add('project-name')
  listItem.dataset.id = project.id; // Hidden ID tag  
  //2. Add delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add('delete-button');
  deleteBtn.onclick = () => deleteProject(project.id);
  listItem.prepend(deleteBtn);
  projectList.appendChild(listItem);
}

function deleteProject(projectId) {
  let allProjects = Project.loadAll();                                             // 1. Get all projects  
  allProjects = allProjects.filter(p => p.id !== projectId);                      // 2. Filter out deleted one
  Project.saveAll(allProjects);                                                  // 3. Save updated list
  const projectElement = document.querySelector(`[data-id="${projectId}"]`);    // 4. Remove from screen
  if (projectElement) projectElement.remove();
}


newProjectForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const projectName = projectNameInput.value.trim();
  if (projectName) {
    const newProject = new Project(projectName);      // 1. Create new project 
    const allProjects = Project.loadAll();           // 2. Get existing projects 
    allProjects.push(newProject);                   // 3. Add new cookie to jar
    Project.saveAll(allProjects);                  // 4. Put jar back in storage    
    renderProject(newProject);                    // 5. Show the new cookie
    
    // Clear input and hide popup
    projectNameInput.value = '';
    newProjectPopup.style.display = 'none';
  }
});