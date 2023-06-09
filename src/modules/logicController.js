import 'md5';
import Task from './task';
import contentDisplay from './DOMController';
// needed to import md5
const md5 = require('md5');

const logicController = (() => {
  // generate an MD5 hash of a random number for the task ID, in order to tie the DOM to the JS logic
  const IDGenerator = () => {
    const rand = Math.random().toString().slice(2, 11)
    return md5(rand);
  };

  const taskCreator = (click) => {
    click.preventDefault();

    const id = IDGenerator();
    const title = document.getElementById('nameInput').value;
    const details = document.getElementById('detailsInput').value;
    const date = document.getElementById('dateInput').value;
    const priority = document.getElementById('selectInput').value;
    const category = document.getElementById('categoryInput').value;

    const values = [id, title, details, date, priority, category];
    let makeTask = true;
    for (let i = 0; i < values.length; i++) {
      if (values[i] == '') {
        makeTask = false;
      }
    }
    if (makeTask) {
      const newTask = new Task(id, title, details, date, priority, category)
      newTask.storeTask();
      contentDisplay.reloadPage();
    } else {
      alert("Enter a value for every task field")
    }
    

  };

  const taskDestroyer = (taskID) => {
    localStorage.removeItem(taskID);
  };

  return { IDGenerator, taskCreator, taskDestroyer }

})();

export default logicController;