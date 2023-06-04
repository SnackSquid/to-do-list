const TaskController = (() => {
  
  const makeTask = (divClass, parentIdentifier) => {
    const parent = document.querySelector(parentIdentifier);
    const div = document.createElement('div');
    div.classList.add(divClass);
    parent.appendChild(div);
  }


  return { makeDiv }

})();

const Task = (name, details, due, priority) => {
    return { name, details, due, priority };
};

export default {TaskController, Task};