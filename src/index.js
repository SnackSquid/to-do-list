"use strict";

import './css/style.css';
import contentDisplay from './modules/DOMController.js';
import Task from './modules/task';
import logicController from './modules/logicController';
import storageController from './modules/storageController';

// check to make sure local storage is enabled
if (storageController.storage) {
} else {
  // gotta have it
  alert("Local storage needs to be enabled for app to work.") 
}

// test stuff, delete later
const testDate = new Date();
const testTask =  new Task('6241b155328acadfdfa617e96e712354', 'Test', 'This is a test task', testDate, 'Medium', 'Work');
const testTask2 = new Task('9e92eede76647328dd2901be2b91b', 'Another Test!', 'This is another test task', testDate, 'Medium', 'Work');

// test tasks
testTask.storeTask();
testTask2.storeTask();

// load the page
contentDisplay.loadPage();
contentDisplay.taskLoader();
