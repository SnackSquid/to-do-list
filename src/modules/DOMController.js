const contentDisplay = (() => {

  const makeDiv = (divClass, parentIdentifier) => {
    // select the parent to attach the new div to and create a div
    const parent = document.querySelector(parentIdentifier);
    const div = document.createElement('div');
    // add the div class and append it to the parent
    div.classList.add(divClass);
    parent.appendChild(div);
    return div;
  }

  const makeIMG = (imageID, parentClass) => {
    // select the parent to attach the new IMG to and create
    const parent = document.querySelector(parentClass);
    const image = document.createElement('img');
    // add class and append the IMG
    image.id = imageID;
    parent.appendChild(image);
    return image;
  }

  const makeButton = (buttonClass, parentIdentifier, text, type) => {
    // select the parent to attach the new button to and create
    const parent = document.querySelector(parentIdentifier);
    const button = document.createElement('button');
    // add class and append the button
    button.textContent = text;
    button.type = type;
    button.classList.add(buttonClass);
    parent.appendChild(button);
    return button;
  }

  const makeForm = (formClass, parentIdentifier) => {
    // select the parent to attach the new form to and create
    const parent = document.querySelector(parentIdentifier);
    const form = document.createElement('form');
    // add class and append the form
    form.classList.add(formClass);
    parent.appendChild(form);
    return form;
  }

  const makeInput = (fieldClass, parentIdentifier, type, innerText) => {
    // select the parent to attach the new input field to and create
    const parent = document.querySelector(parentIdentifier);
    const label = document.createElement('label');
    const input = document.createElement('input');
    if (innerText != null) {
      label.innerText = innerText;
    }
    // add class, set input value and type then append
    label.classList.add(fieldClass);
    label.for = fieldClass;
    input.placeholder = `Enter task ${fieldClass}`;
    input.type = type;
    input.title = fieldClass;
    parent.appendChild(label);
    parent.appendChild(input);
    return input;
  }

  const makeSelect = (selectClass, parentIdentifier, options, innerText) => {
    // select the parent to attach the new select field to and create
    const parent = document.querySelector(parentIdentifier);
    const label = document.createElement('label');
    const select = document.createElement('select');
    if (innerText != null) {
      label.innerText = innerText;
    }
    // add class, set select value and type then append
    label.classList.add(selectClass);
    label.for = selectClass;
    
    select.name = selectClass;
    // loop through the priority options and add them into a dropdown
    for (let i = 0; i < options.length; i++) {
      const option = document.createElement('option');
      option.value = options[i];
      option.innerText = options[i];
      select.appendChild(option);
    }

    parent.appendChild(label);
    parent.appendChild(select);
    return select;
  }

  const loadPage = () => {
    // variables to easily change where items are anchored
    const taskCreatorCard = '.taskCreator';
    const taskInput = '.taskInput';
    const main = '.main';
    const sideBar = '.sidebar';

    // build the page main div is the anchor of the page
    makeDiv('main', 'body');
    // header
    makeDiv('header', main);
    makeDiv('sidebar', main);
    makeDiv('board', main);
    
    // create a form to attach the task creation inputs to
    makeDiv('taskCreator', main);
    makeForm('taskInput', sideBar)
    // create input fields for the task creation form
    makeInput('name', taskInput, 'text')
    makeInput('details', taskInput, 'text')
    makeInput('due', taskInput, 'datetime-local', 'Due date:')
    makeSelect('priority', taskInput, ['High', 'Medium', 'Low'], 'Priority')
    makeButton('add', sideBar, 'Add Task', 'submit')
    // footer
    makeDiv('footer', main);
  }

  const destroyPage = () => {
    const div = document.querySelector('.main')
    div.remove();
  }

  const reloadPage = () => {
    destroyPage();
    loadPage();
  }

  const taskLoader = () => {

    for (let i = 0; i < localStorage.length; i++) {
      // select the task board to append the new element to
      const board = '.board';
      // select the current task
      const task = localStorage[i];
      console.log(localStorage[i]);
      // create the elements needed for the task card
      const div = makeDiv('taskCard', board);
      div.id = task.id;

      const title = document.createElement('h4');
      const divider = document.createElement('hr');
      const details = document.createElement('p');
      const due = document.createElement('p');
      const category = document.createElement('p');
      

      // assign && render the info in the task object
      title.textContent = task.title;
      details.textContent = task.textContent;
      due.textContent = task.due;
      category.textContent = task.category;
      
      div.appendChild(title);
      div.appendChild(divider);
      div.appendChild(details);
      div.appendChild(category);
      div.appendChild(due);

      // since task IDs are based off of MD5s, we need to use CSS.escape to handle the IDs that start with numbers
      const closeButton = makeButton('close', `#${CSS.escape(task.id)}`, 'X', 'button')
      const select = makeSelect('priority', `#${CSS.escape(task.id)}`, ['High', 'Medium', 'Low'], 'Priority');

      if (task.priority == 'High') {
        select.selectedIndex = 0;
      } else if (task.priority == 'Medium') {
        select.selectedIndex = 1;
      } else if (task.priority == 'Low') {
        select.selectedIndex = 2;
      }
      
    }
  }

  const taskRemover = (click) => {
    click.stopPropagation();
    click.preventDefault();
    const taskID = click.target.parentElement.id;
    const list = taskList["tasks"];
    for (let i = 0; i < list.length; i++){
      if (list[i].id == taskID) {
        list[i].removeFromList(taskList);
      }
    }
  }

  return { makeDiv, makeIMG, makeButton, makeInput, makeForm, makeSelect, loadPage, destroyPage, reloadPage, taskLoader, taskRemover }

})();

export default contentDisplay;