"use strict";

import './css/style.css';
import 'md5';
import contentDisplay from './modules/contentDisplay.js';
import Task from './modules/taskController';

// needed to import md5
const md5 = require('md5')
// generate an MD5 hash of a random number for the task ID, in order to tie the DOM to the JS logic
const IDGenerator = () => {
  const rand = Math.random().toString().slice(2, 11)
  console.log(md5(rand))
};

const taskList = {
  "tasks": []
}
const testDate = new Date();
const testTask =  new Task('6241b155328acadfdfa617e96e712354', 'Test', 'This is a test task', testDate, 'High', 'Work');

for(const property in testTask) {
  console.log(`${testTask[property]}`)
}

testTask.addToList(taskList);
console.log(taskList["tasks"]);
testTask.removeFromList(taskList);
console.log(taskList);


contentDisplay.loadPage();

const taskButton = document.querySelector('.add');





taskButton.addEventListener('click', IDGenerator)
