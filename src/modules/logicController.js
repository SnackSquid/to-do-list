import "md5";
import Task from "./task";
import contentDisplay from "./DOMController";

// needed to import md5
const md5 = require("md5");

const logicController = (() => {
  // generate an MD5 hash of a random number for the task ID, in order to tie the DOM to the JS logic
  const IDGenerator = () => {
    const rand = Math.random().toString().slice(2, 11);
    return md5(rand);
  };

  const taskCreator = (click) => {
    click.preventDefault();

    const id = IDGenerator();
    const title = document.getElementById("titleInput").value;
    const details = document.getElementById("detailsInput").value;
    const date = document.getElementById("dateInput").value;
    const priority = document.getElementById("selectInput").value;
    const category = document.getElementById("categoryInput").value;

    const values = [id, title, details, date, priority, category];
    let makeTask = true;
    for (let i = 0; i < values.length; i++) {
      if (values[i] == "") {
        makeTask = false;
      }
    }
    if (makeTask) {
      const newTask = new Task(id, title, details, date, priority, category);
      newTask.storeTask();
      contentDisplay.reloadPage();
    } else {
      alert("Enter a value for every task field");
    }
  };

  const taskDestroyer = (taskID) => {
    // cleaner to have a named function even though it is very simple
    localStorage.removeItem(taskID);
  };

  const taskEditor = (click) => {
    click.preventDefault();
    // gathering all the data from the task form
    const id = localStorage.temp;
    const title = document.getElementById("titleInput").value;
    const details = document.getElementById("detailsInput").value;
    const date = document.getElementById("dateInput").value;
    const priority = document.getElementById("selectInput").value;
    const category = document.getElementById("categoryInput").value;
    const button = document.getElementById("editButton")

    // looop through values to make sure there aren't
    // any blank fields
    const values = [id, title, details, date, priority, category];
    let makeTask = true;
    for (let i = 0; i < values.length; i++) {
      if (values[i] == "" || values[i] == null) {
        makeTask = false;
      }
    }
    // since there are no blank fields create a new task and update the
    // task at the index
    if (makeTask) {
      const updateTask = new Task(id, title, details, date, priority, category);
      updateTask.storeTask();
      contentDisplay.reloadPage();
    } else {
      alert("Enter a value for every task field");
    }
    // set our edit button back to the edit button
    contentDisplay.setTaskCardButton(button);
  };

  const removeTempKey = () => {
    // strip out the temp key since it's only for editing tasks
    const tempKeys = Object.keys(localStorage);
    const keys = tempKeys.filter(key => key != "temp")
    return keys
  }

  return { IDGenerator, taskCreator, taskDestroyer, taskEditor, removeTempKey };
})();

export default logicController;
