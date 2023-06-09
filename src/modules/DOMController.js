import logicController from "./logicController";
import uniq from "lodash/uniq";
import HTMLController from "./HTMLController";

const contentDisplay = (() => {
  const makeSidebar = () => {
    const keys = logicController.removeTempKey();
    const categories = [];
    for (let i = 0; i < keys.length; i++) {
      const temp = JSON.parse(localStorage.getItem(keys[i]));
      categories.push(temp["category"]);
    }
    // clear duplicate values
    const cleanList = uniq(categories);
    cleanList.unshift("All");
    const form = HTMLController.makeForm("categories", ".sidebar");

    for (let i = 0; i < cleanList.length; i++) {
      const categoryDisplay = HTMLController.makeList("categoryCard", form, cleanList[i]);
    }
    
    
  };
  const loadPage = () => {
    // variables to easily change where items are anchored
    const taskCreatorCard = ".taskCreator";
    const taskInput = ".taskInput";
    const main = ".main";
    const sideBar = ".sidebar";

    // build the page main div is the anchor of the page
    HTMLController.makeDiv("main", "body");
    // header and title
    HTMLController.makeDiv("header", main);
    HTMLController.makeHeader("title", ".header", 1, "To-Do-ification");
    // sidebar will also display task categories
    HTMLController.makeDiv("sidebar", main);
    makeSidebar();
    // create the "board" that displays task cards
    HTMLController.makeDiv("board", main);
    // create a form to attach the task creation inputs to
    HTMLController.makeDiv("taskCreator", main);
    const taskInputCard = HTMLController.makeForm("taskInput", taskCreatorCard);
    // create input fields for the task creation form
    const cancelButton = HTMLController.makeButton(
      "cancel",
      taskInput,
      "x",
      "reset"
    );
    const titleInput = HTMLController.makeInput(
      "title",
      taskInput,
      "text",
      "Task name:"
    );
    const detailsInput = HTMLController.makeInput(
      "details",
      taskInput,
      "text",
      "Task details:"
    );
    const dateInput = HTMLController.makeInput(
      "due",
      taskInput,
      "date",
      "Due date:"
    );
    const selectInput = HTMLController.makeSelect(
      "priority",
      taskInput,
      ["High", "Medium", "Low"],
      "Priority"
    );
    const categoryInput = HTMLController.makeInput(
      "category",
      taskInput,
      "text",
      "Task category:"
    );
    const submitButton = HTMLController.makeButton(
      "add",
      taskInput,
      "Add Task",
      "submit"
    );
    // create button to show the taskInputCard
    const showTaskButton = HTMLController.makeButton(
      "showTask",
      sideBar,
      "Add Task",
      "submit"
    );
    // set special IDs for grabbing data on submit button click
    // I know I should just edit the HTML maker module but this is faster for now
    cancelButton.id = "cancelButton";
    titleInput.id = "titleInput";
    detailsInput.id = "detailsInput";
    dateInput.id = "dateInput";
    selectInput.id = "selectInput";
    categoryInput.id = "categoryInput";
    submitButton.id = "submitButton";
    showTaskButton.id = "showTaskButton";
    // footer
    HTMLController.makeDiv("footer", main);

    submitButton.addEventListener("click", logicController.taskCreator);
    showTaskButton.addEventListener("click", showOrHideTaskCard);
    cancelButton.addEventListener("click", showOrHideTaskCard);
    showOrHideTaskCard();
  };

  const showOrHideTaskCard = () => {
    const taskCreator = document.querySelector(".taskCreator");
    const showTask = document.getElementById("showTaskButton")

    if (taskCreator.classList.contains("hidden")) {
      taskCreator.classList.remove("hidden");
      showTask.classList.add("hidden");
    } else {
      taskCreator.classList.add("hidden");
      showTask.classList.remove("hidden");
    }
  };

  const destroyPage = () => {
    const div = document.querySelector(".main");
    div.remove();
  };

  const reloadPage = () => {
    destroyPage();
    loadPage();
    taskLoader();
  };

  const taskLoader = () => {
    const keyList = logicController.removeTempKey();
    for (let i = 0; i < keyList.length; i++) {
      // select the task board to append the new element to
      const board = ".board";
      // select the current task

      const key = keyList[i];
      const task = JSON.parse(localStorage.getItem(key));
      // create the elements needed for the task card
      const div = HTMLController.makeDiv("taskCard", board);
      div.id = task.id;

      // create the task fields and render the data, using variable names for readability
      const title = HTMLController.makeHeader("taskTitle", div, 3, task.title);
      const divider = document.createElement("hr");
      const details = HTMLController.makeP("details", div, task.details);
      const due = HTMLController.makeP("due", div, task.due);
      const category = HTMLController.makeP("category", div, task.category);
      const priority = HTMLController.makeP("priority", div, task.priority);

      // since task IDs are based off of MD5s, we need to use CSS.escape to handle the IDs that start with numbers
      // create the close/edit/priority button on task cards
      HTMLController.makeButton(
        "close",
        `#${CSS.escape(task.id)}`,
        "x",
        "button"
      );
      HTMLController.makeButton(
        "edit",
        `#${CSS.escape(task.id)}`,
        "🖉",
        "button"
      );

      const removeTask = document.querySelectorAll(".close");
      removeTask.forEach((button) =>
        button.addEventListener("click", taskRemover)
      );
      const editTask = document.querySelectorAll(".edit");
      editTask.forEach((button) =>
        button.addEventListener("click", taskEditCardDisplay)
      );
    }
  };

  const taskRemover = (click) => {
    click.stopPropagation();
    const taskID = click.target.parentElement.id;
    logicController.taskDestroyer(taskID);
    reloadPage();
  };

  const taskEditCardDisplay = (click) => {
    click.stopPropagation();
    const taskID = click.target.parentElement.id;
    const task = JSON.parse(localStorage.getItem(taskID));
    const taskInput = document.querySelector(".taskInput");
    showOrHideTaskCard();
    const title = document.getElementById("titleInput");
    const details = document.getElementById("detailsInput");
    const due = document.getElementById("dateInput");
    const priority = document.getElementById("selectInput");
    const category = document.getElementById("categoryInput");
    const button = document.getElementById("submitButton");
    localStorage.temp = taskID;
    title.value = task.title;
    details.value = task.details;
    due.value = task.due;
    priority.value = task.priority;
    category.value = task.category;
    setTaskCardButton(button);
  };

  const setTaskCardButton = (button) => {
    console.log(button);
    if (button.id == "submitButton") {
      button.id = "editButton";
      button.innerText = "Edit task";
      button.removeEventListener("click", logicController.taskCreator);
      button.addEventListener("click", logicController.taskEditor);
    } else if (button.id == "editButton") {
      button.id = "submitButton";
      button.innerText = "Add task";
      button.removeEventListener("click", logicController.taskEditor);
      button.addEventListener("click", logicController.taskCreator);
    }
  };

  return {
    loadPage,
    reloadPage,
    taskLoader,
    taskRemover,
    setTaskCardButton,
  };
})();

export default contentDisplay;
