import './css/style.css';
import 'md5';
import contentDisplay from './modules/contentDisplay.js';

// needed to import md5
const md5 = require('md5')
// generate an MD5 hash of a random number for the task ID, in order to tie the DOM to the JS logic
const IDGenerator = () => {
  const rand = Math.random().toString().slice(2, 11)
  console.log(md5(rand))
};

// build the page main div is the anchor of the page
contentDisplay.makeDiv('main', 'body');
// create a form to attach the task creation inputs to
const taskCreatorCard = '.taskCreator';
contentDisplay.makeDiv('taskCreator', '.main');
contentDisplay.makeForm('taskInput', taskCreatorCard)
const taskInput = '.taskInput';
contentDisplay.makeInput('name', taskInput, 'text')
contentDisplay.makeInput('details', taskInput, 'text')
contentDisplay.makeInput('due', taskInput, 'datetime-local', 'Due date:')

contentDisplay.makeSelect('priority', taskInput, ['High', 'Medium', 'Low'], 'Priority')

contentDisplay.makeButton('add', taskCreatorCard, 'Add Task', 'submit')


const taskButton = document.querySelector('.add');





taskButton.addEventListener('click', IDGenerator)
