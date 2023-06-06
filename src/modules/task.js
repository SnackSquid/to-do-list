class Task {
  constructor(id, title, details, due, priority, category) {
    this.id = id;
    this.title = title;
    this.details = details;
    this.due = due;
    this.priority = priority;
    this.category = category;
  }

  updateTask(prop, newValue) {
    return this.prop = newValue;
  }

  addToList() {
    return localStorage.tasks.push(this);
  }

  removeFromList(list) {
    console.log(list)
    list["deleted"].push(this);
    return list["tasks"] = list["tasks"].filter(task => task.id != this.id);
  }

  deleteTask(list) {
    return list["deleted"] = list["deleted"].filter(task => task.id != this.id)
  }

}

export default Task;