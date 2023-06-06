"use strict";

import './css/style.css';
import contentDisplay from './modules/DOMController.js';
import Task from './modules/task';
import logicController from './modules/logicController';

if (logicController.storage) {
  localStorage.tasks = []
} else {
  // create JSON to store tasks
  const taskList = {
    "tasks": [],
    "deleted": []
  } 
}

// test stuff, delete later
const testDate = new Date();
const testTask =  new Task('6241b155328acadfdfa617e96e712354', 'Test', 'This is a test task', testDate, 'Medium', 'Work');

localStorage.temp = testTask;
console.log(localStorage.temp)


//console.log(localStorage.tasks)
// load the page
contentDisplay.loadPage();
contentDisplay.taskLoader();

const taskButton = document.querySelector('.add');
//taskList["tasks"][0].removeFromList();

const removeTask = document.querySelectorAll('.close');
removeTask.forEach(button => button.addEventListener('click', contentDisplay.taskRemover));

taskButton.addEventListener('click', logicController.IDGenerator)
