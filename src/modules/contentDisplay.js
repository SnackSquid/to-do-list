const contentDisplay = (() => {

  const makeDiv = (divClass, parentIdentifier) => {
    const parent = document.querySelector(parentIdentifier);
    const div = document.createElement('div');
    div.classList.add(divClass);
    parent.appendChild(div);
  }

  const makeIMG = (imageID, parentClass) => {
    const parent = document.querySelector(parentClass);
    const image = document.createElement('img');
    image.id = imageID;
    parent.appendChild(image);
  }

  const makeButton = (buttonClass, parentIdentifier, text) => {
    const parent = document.querySelector(parentIdentifier);
    const button = document.createElement('button');
    button.textContent = text;
    button.classList.add(buttonClass);
    parent.appendChild(button);
  }

  const makeForm = (formClass, parentIdentifier) => {
    const parent = document.querySelector(parentIdentifier);
    const form = document.createElement('form');
    form.classList.add(formClass);
    parent.appendChild(form);
  }

  const makeInput = (fieldClass, parentIdentifier, type) => {
    const parent = document.querySelector(parentIdentifier);
    const label = document.createElement('label');
    const input = document.createElement('input');

  }

  return { makeDiv, makeIMG, makeButton, makeInput, makeForm }

})();

export default contentDisplay;