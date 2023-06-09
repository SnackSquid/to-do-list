const HTMLController = (() => {
  const makeDiv = (divClass, parentIdentifier) => {
    // select the parent to attach the new div to and create a div
    const parent = document.querySelector(parentIdentifier);
    const div = document.createElement("div");
    // add the div class and append it to the parent
    div.classList.add(divClass);
    parent.appendChild(div);
    return div;
  };

  const makeHeader = (headerClass, parentIdentifier, headerLevel, text) => {
    const headerTotal = "h" + headerLevel;
    const header = document.createElement(headerTotal);
    if (typeof parentIdentifier == "object") {
      parentIdentifier.appendChild(header);
    } else {
      // select the parent to attach the new div to and create a div
      const parent = document.querySelector(parentIdentifier);
      parent.appendChild(header);
    }
    // add the div class and append it to the parent
    header.classList.add(headerClass);
    header.innerText = text;

    return header;
  };

  const makeP = (pClass, parentIdentifier, innerText) => {
    // select the parent to attach the new div to and create a div
    const p = document.createElement("p");
    if (typeof parentIdentifier == "object") {
      parentIdentifier.appendChild(p);
    } else {
      const parent = document.querySelector(parentIdentifier);
      parent.appendChild(p);
    }
    // add the div class and append it to the parent
    p.classList.add(pClass);

    if (innerText != null) {
      p.innerText = innerText;
    }
    return p;
  };

  const makeIMG = (imageID, parentClass) => {
    // select the parent to attach the new IMG to and create
    const parent = document.querySelector(parentClass);
    const image = document.createElement("img");
    // add class and append the IMG
    image.id = imageID;
    parent.appendChild(image);
    return image;
  };

  const makeButton = (buttonClass, parentIdentifier, text, type) => {
    // select the parent to attach the new button to and create
    const parent = document.querySelector(parentIdentifier);
    const button = document.createElement("button");
    // add class and append the button
    button.textContent = text;
    button.type = type;
    button.classList.add(buttonClass);
    parent.appendChild(button);
    return button;
  };

  const makeForm = (formClass, parentIdentifier) => {
    // select the parent to attach the new form to and create
    const parent = document.querySelector(parentIdentifier);
    const form = document.createElement("form");
    // add class and append the form
    form.classList.add(formClass);
    parent.appendChild(form);
    return form;
  };

  const makeInput = (fieldClass, parentIdentifier, type, innerText) => {
    // select the parent to attach the new input field to and create
    const label = document.createElement("label");
    const input = document.createElement("input");
    if (typeof parentIdentifier == "object") {
      parentIdentifier.appendChild(label);
      parentIdentifier.appendChild(input);
    } else {
      const parent = document.querySelector(parentIdentifier);
      parent.appendChild(label);
      parent.appendChild(input);
    }

    if (innerText != null) {
      label.innerText = innerText;
    }
    // add class, set input value and type then append
    label.classList.add(fieldClass);
    label.htmlFor = fieldClass;

    input.type = type;
    if (input.type == "text") {
      input.placeholder = `Enter task ${fieldClass}`;
    }
    input.title = fieldClass;

    return input;
  };

  const makeSelect = (selectClass, parentIdentifier, options, innerText) => {
    // select the parent to attach the new select field to and create
    const parent = document.querySelector(parentIdentifier);
    const label = document.createElement("label");
    const select = document.createElement("select");
    if (innerText != null) {
      label.innerText = innerText;
    }
    // add class, set select value and type then append
    label.classList.add(selectClass);
    label.for = selectClass;

    select.name = selectClass;
    // loop through the priority options and add them into a dropdown
    for (let i = 0; i < options.length; i++) {
      const option = document.createElement("option");
      option.value = options[i];
      option.innerText = options[i];
      select.appendChild(option);
    }

    parent.appendChild(label);
    parent.appendChild(select);
    return select;
  };

  const makeList = (listClass, parentID, text, id) => {
    const list = document.createElement("ul");
    if (typeof parentID == "object") {
      parentID.appendChild(list);
    } else {
      const parent = document.querySelector(parentID);
      parent.appendChild(list);
    }

    // logic to handle if the function is passed a string or an array
    if (typeof text == "string") {
      // passed one item, make one entry
      const item = document.createElement("li");
      item.innerText = text;
      list.appendChild(item);
    } else {
      // passed object, create entry for each
      for (let i = 0; i < text.length; i++) {
        const item = document.createElement("li");
        item.innerText = text[i];
        list.appendChild(item);
      }
    }

    // make sure the id has value before assigning
    if (id != null) {
      list.id = id;
    }
    list.classList.add(listClass);
  };

  return {
    makeDiv,
    makeHeader,
    makeP,
    makeForm,
    makeSelect,
    makeIMG,
    makeButton,
    makeInput,
    makeList,
  };
})();

export default HTMLController;
