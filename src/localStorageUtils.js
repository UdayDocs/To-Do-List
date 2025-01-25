//localStorageUtils.js - Helper functions for saving and loading data.
import { renderTask } from './Task.js'; // Import renderTask instead of addTask

export function loadTasksFromLocalStorage() {
  const tasks = getTasksFromLocalStorage();
  tasks.forEach(task => {
    renderTask(task); // Render tasks without re-saving
  });
}

export function getTasksFromLocalStorage() {
  try {
    const tasksString = localStorage.getItem('tasks');
    if (tasksString) {
      // Attempt to parse only if it's valid JSON
      return JSON.parse(tasksString);
    } else {
      return []; // No tasks saved yet
    }
  } catch (error) {
    console.error("Error parsing tasks from local storage:", error);
    // Clear corrupted data to prevent future errors
    localStorage.removeItem('tasks');
    return [];
  }
}

export function saveTasksToLocalStorage(tasks) {
  try {
    // Ensure tasks is an array before saving
    if (!Array.isArray(tasks)) {
      console.error("Attempted to save non-array tasks:", tasks);
      return;
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks to local storage:", error);
  }
}

export function getProjectsFromLocalStorage() {
  try {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]');
    return Array.isArray(projects) ? projects : [];
  } catch {
    return [];
  }
}

export function saveProjectsToLocalStorage(projects) {
  // How do we save this properly? (Look at saveTasks for pattern)
  try {
    if (!Array.isArray(projects)) {
      console.error("Attempted to save Projects", projects);
      return;
    }
    localStorage.setItem('projects', JSON.stringify(projects));
  } catch (error) {
    console.error("Error saving projects to local storage:", error);

  }
}

