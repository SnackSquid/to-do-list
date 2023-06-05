const contentDisplay = (() => {

  const makeDiv = (divClass, parentIdentifier) => {
    // select the parent to attach the new div to and create a div
    const parent = document.querySelector(parentIdentifier);
    const div = document.createElement('div');
    // add the div class and append it to the parent
    div.classList.add(divClass);
    parent.appendChild(div);
  }

  const makeIMG = (imageID, parentClass) => {
    // select the parent to attach the new IMG to and create
    const parent = document.querySelector(parentClass);
    const image = document.createElement('img');
    // add class and append the IMG
    image.id = imageID;
    parent.appendChild(image);
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
  }

  const makeForm = (formClass, parentIdentifier) => {
    // select the parent to attach the new form to and create
    const parent = document.querySelector(parentIdentifier);
    const form = document.createElement('form');
    // add class and append the form
    form.classList.add(formClass);
    parent.appendChild(form);
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

    for (let i = 0; i < options.length; i++) {
      const option = document.createElement('option');
      option.value = options[i];
      option.innerText = options[i];
      select.appendChild(option);
    }

    parent.appendChild(label);
    parent.appendChild(select);
  }

  const loadPage = () => {
    // variables to easily change where items are anchored
    const taskCreatorCard = '.taskCreator';
    const taskInput = '.taskInput';
    const main = '.main';

    // build the page main div is the anchor of the page
    contentDisplay.makeDiv('main', 'body');
    // header
    contentDisplay.makeDiv('header', main);
    contentDisplay.makeDiv('sidebar', main);
    contentDisplay.makeDiv('board', main);
    
    // create a form to attach the task creation inputs to
    contentDisplay.makeDiv('taskCreator', main);
    contentDisplay.makeForm('taskInput', taskCreatorCard)
    // create input fields for the task creation form
    contentDisplay.makeInput('name', taskInput, 'text')
    contentDisplay.makeInput('details', taskInput, 'text')
    contentDisplay.makeInput('due', taskInput, 'datetime-local', 'Due date:')
    contentDisplay.makeSelect('priority', taskInput, ['High', 'Medium', 'Low'], 'Priority')
    contentDisplay.makeButton('add', taskCreatorCard, 'Add Task', 'submit')
    // footer
    contentDisplay.makeDiv('footer', main);
  }

  return { makeDiv, makeIMG, makeButton, makeInput, makeForm, makeSelect, loadPage }

})();

export default contentDisplay;