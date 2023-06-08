import logicController from "./logicController";
import uniq from 'lodash/uniq';
import HTMLController from "./HTMLController";

const contentDisplay = (() => {

  const makeSidebar = () => {
    const keys = Object.keys(localStorage)
    const categories = [];
    for (let i = 0; i < keys.length; i++) {
      const temp = JSON.parse(localStorage.getItem(keys[i]))
      categories.push(temp["category"])
    }
    const cleanList = uniq(categories)

    for (let i = 0; i < cleanList.length; i++) {
      const categoryDiv = HTMLController.makeDiv('category', '.sidebar')
      categoryDiv.innerText = cleanList[i];
    }
    
  }
  const loadPage = () => {
    // variables to easily change where items are anchored
    const taskCreatorCard = '.taskCreator';
    const taskInput = '.taskInput';
    const main = '.main';
    const sideBar = '.sidebar';

    // build the page main div is the anchor of the page
    HTMLController.makeDiv('main', 'body');
    // header
    HTMLController.makeDiv('header', main);
    // sidebar will also display special categories
    HTMLController.makeDiv('sidebar', main);
    makeSidebar();
    HTMLController.makeDiv('board', main);

    // create a form to attach the task creation inputs to
    HTMLController.makeDiv('taskCreator', main);
    HTMLController.makeForm('taskInput', sideBar);
    // create input fields for the task creation form
    const nameInput = HTMLController.makeInput('name', taskInput, 'text', 'Task name:');
    const detailsInput = HTMLController.makeInput('details', taskInput, 'text', 'Task details:');
    const dateInput = HTMLController.makeInput('due', taskInput, 'datetime-local', 'Due date:');
    const selectInput = HTMLController.makeSelect('priority', taskInput, ['High', 'Medium', 'Low'], 'Priority');
    const categoryInput = HTMLController.makeInput('category', taskInput, 'text', 'Task category:');
    const submitButton = HTMLController.makeButton('add', taskInput, 'Add Task', 'submit');
    // set special IDs for grabbing data on submit button click
    nameInput.id = 'nameInput';
    detailsInput.id = 'detailsInput';
    dateInput.id = 'dateInput';
    selectInput.id = 'selectInput';
    categoryInput.id = 'categoryInput';
    submitButton.id = 'submitButton';
    // footer
    HTMLController.makeDiv('footer', main);

    const taskButton = document.querySelector('.add');

    submitButton.addEventListener('click', logicController.taskCreator);
  }

  const destroyPage = () => {
    const div = document.querySelector('.main')
    div.remove();
  }

  const reloadPage = () => {
    destroyPage();
    loadPage();
    taskLoader();
  }

  const taskLoader = () => {

    for (let i = 0; i < localStorage.length; i++) {
      // select the task board to append the new element to
      const board = '.board';
      // select the current task
      const key = Object.keys(localStorage)[i];
      const task = JSON.parse(localStorage.getItem(key));
      // create the elements needed for the task card
      const div = HTMLController.makeDiv('taskCard', board);
      div.id = task.id;

      const title = document.createElement('h4');
      const divider = document.createElement('hr');
      const details = document.createElement('p');
      const due = document.createElement('p');
      const category = document.createElement('p');

      // assign && render the info in the task object
      title.textContent = task.title;
      details.textContent = task.details;
      due.textContent = task.due;
      category.textContent = task.category;
    
      div.appendChild(title);
      div.appendChild(divider);
      div.appendChild(details);
      div.appendChild(category);
      div.appendChild(due);

      // since task IDs are based off of MD5s, we need to use CSS.escape to handle the IDs that start with numbers
      HTMLController.makeButton('close', `#${CSS.escape(task.id)}`, 'X', 'button')
      const select = HTMLController.makeSelect('priority', `#${CSS.escape(task.id)}`, ['High', 'Medium', 'Low'], 'Priority');

      select.value = task.priority;

      const removeTask = document.querySelectorAll('.close');
      removeTask.forEach(button => button.addEventListener('click', taskRemover));
    }

  }

  const taskRemover = (click) => {
    click.stopPropagation();
    const taskID = click.target.parentElement.id;
    logicController.taskDestroyer(taskID);
    reloadPage();
  }

  return { loadPage, destroyPage, reloadPage, taskLoader, taskRemover }

})();

export default contentDisplay;