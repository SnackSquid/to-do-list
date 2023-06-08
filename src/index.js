"use strict";

import './css/style.css';
import contentDisplay from './modules/DOMController.js';
import Task from './modules/task';
import logicController from './modules/logicController';
import storageController from './modules/storageController';

if (storageController.storage) {
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
const testTask2 = new Task('9e92eede76647328dd2901be2b91b', 'Another Test!', 'This is another test task', testDate, 'Medium', 'Work');



testTask.storeTask();
testTask2.storeTask();

// load the page
contentDisplay.loadPage();
contentDisplay.taskLoader();


// select active objects and add appropriate event listeners

const taskButton = document.querySelector('.add');
//taskList["tasks"][0].removeFromList();

const removeTask = document.querySelectorAll('.close');
removeTask.forEach(button => button.addEventListener('click', contentDisplay.taskRemover));

const addTask = document.getElementById('submitButton');
addTask.addEventListener('click', logicController.taskCreator);

taskButton.addEventListener('click', logicController.IDGenerator)
