class Task {
  constructor(id, title, details, due, priority, category) {
    this.id = id;
    this.title = title;
    this.details = details;
    this.due = due;
    this.priority = priority;
    this.category = category;
  }

  storeTask() {
    const key = this.id;
    const string = JSON.stringify(this)
    return localStorage.setItem(key, string);
  }

  removeTask() {
    const key = this.id;
    return localStorage.removeItem(key);
  }

  editTask() {
    const key = this.id;
    const string = JSON.stringify(this)
    return localStorage.setItem(key, string);
  }

}

export default Task;