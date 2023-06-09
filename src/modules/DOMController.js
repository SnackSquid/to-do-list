import logicController from "./logicController";
import uniq from "lodash/uniq";
import HTMLController from "./HTMLController";

const contentDisplay = (() => {
  const makeSidebar = () => {
    const keys = Object.keys(localStorage);
    const categories = [];
    for (let i = 0; i < keys.length; i++) {
      const temp = JSON.parse(localStorage.getItem(keys[i]));
      categories.push(temp["category"]);
    }
    const cleanList = uniq(categories);

    for (let i = 0; i < cleanList.length; i++) {
      const categoryDiv = HTMLController.makeDiv("categoryCard", ".sidebar");
      categoryDiv.innerText = cleanList[i];
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
    const taskInputCard = HTMLController.makeForm("taskInput", main);
    taskInputCard.classList.add("hidden");
    // create input fields for the task creation form
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
      "datetime-local",
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
    const showTask = HTMLController.makeButton(
      "showTask",
      sideBar,
      "Add Task",
      "submit"
    );
    // set special IDs for grabbing data on submit button click
    // I know I should just edit the HTML maker module but this is faster for now
    titleInput.id = "titleInput";
    detailsInput.id = "detailsInput";
    dateInput.id = "dateInput";
    selectInput.id = "selectInput";
    categoryInput.id = "categoryInput";
    submitButton.id = "submitButton";
    // footer
    HTMLController.makeDiv("footer", main);

    const taskButton = document.querySelector(".add");

    submitButton.addEventListener("click", logicController.taskCreator);
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
    for (let i = 0; i < localStorage.length; i++) {
      // select the task board to append the new element to
      const board = ".board";
      // select the current task
      const key = Object.keys(localStorage)[i];
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
        button.addEventListener("click", taskEditor)
      );
    }
  };

  const taskRemover = (click) => {
    click.stopPropagation();
    const taskID = click.target.parentElement.id;
    logicController.taskDestroyer(taskID);
    reloadPage();
  };

  const taskEditor = (click) => {
    click.stopPropagation();
    const taskID = click.target.parentElement.id;
    const task = JSON.parse(localStorage.getItem(taskID));
    const taskInput = document.querySelector(".taskInput");
    taskInput.classList.remove("hidden");
    const title = document.getElementById("titleInput");
    const details = document.getElementById("detailsInput");
    const due = document.getElementById("dateInput");
    const priority = document.getElementById("selectInput")
    const category = document.getElementById("categoryInput")
    title.value = task.title;
    details.value = task.details;
    due.value = task.due;
    console.log(due.value)

  };

  return {
    loadPage,
    destroyPage,
    reloadPage,
    taskLoader,
    taskRemover,
    taskEditor,
  };
})();

export default contentDisplay;
