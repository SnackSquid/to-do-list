import './style.css';
import 'md5';
import contentDisplay from './modules/contentDisplay.js';


contentDisplay.makeDiv("main", "body");
contentDisplay.makeButton("add", ".main", "Add Task")

taskButton = document.querySelector('.add');

taskButton.onClick(new Task())

print(md5('test'))