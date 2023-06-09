import "md5";
import Task from "./task";
import contentDisplay from "./DOMController";
import { format } from "date-fns";
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
    localStorage.removeItem(taskID);
  };

  const taskEditor = (click) => {
    console.log("Taskeditor")
    click.preventDefault();
    click.stopPropagation();
    const id = localStorage.temp;
    const title = document.getElementById("titleInput").value;
    const details = document.getElementById("detailsInput").value;
    const date = document.getElementById("dateInput").value;
    const priority = document.getElementById("selectInput").value;
    const category = document.getElementById("categoryInput").value;
    const button = document.getElementById("editButton")

    const values = [id, title, details, date, priority, category];
    let makeTask = true;
    for (let i = 0; i < values.length; i++) {
      if (values[i] == "" || values[i] == null) {
        makeTask = false;
      }
    }
    
    if (makeTask) {
      const updateTask = new Task(id, title, details, date, priority, category);
      updateTask.editTask();
      contentDisplay.reloadPage();
    } else {
      alert("Enter a value for every task field");
    }
    console.log(button)
    contentDisplay.setTaskCardButton(button);
  };

  const removeTempKey = () => {
    const tempKeys = Object.keys(localStorage);
    const keys = tempKeys.filter(key => key != "temp")
    return keys
  }

  return { IDGenerator, taskCreator, taskDestroyer, taskEditor, removeTempKey };
})();

export default logicController;
