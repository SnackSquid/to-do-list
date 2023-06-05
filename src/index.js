import './style.css';
import 'md5';
import contentDisplay from './modules/contentDisplay.js';

// needed to import md5
const md5 = require('md5')
// generate an MD5 hash of a random number for the task ID, in order to tie the DOM to the JS logic
const IDGenerator = () => {
  let rand = Math.random().toString().slice(2, 11)
  console.log(md5(rand))
};

// build the page 
contentDisplay.makeDiv('main', 'body');
contentDisplay.makeButton('add', '.main', 'Add Task')
contentDisplay.makeForm('taskInput', '.main')

const taskButton = document.querySelector('.add');





taskButton.addEventListener('click', IDGenerator)
