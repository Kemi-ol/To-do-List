// function to add a task list
function addTask() {
    const taskInput = document.getElementById("task-input");
    const taskText = taskInput.value;
    if (taskText === "") {
      return; // function returns early and no task is added
    }
const taskList = document.getElementById("task-list"); // retrieves task list where task will be displayed
  
  //  ( task description) & completed  are booleans  indicating whether task is completed or not)
const task = {
      text: taskText,
      completed: false
    };
  
    //Get existing task from local storage by parsing the JSON data. if there are no existing tasks, it default to an empty array
    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    existingTasks.push(task); //
    localStorage.setItem("tasks", JSON.stringify(existingTasks)); // saves the updated task array back to local storage JSON
    taskInput.value = ""; // clears the text input to prepare for next entry
    renderTasks();
  }
  
  // To remove a task list
  function removeTask(index) {
    //takes index parameter to specify task to remove
    const tasks = JSON.parse(localStorage.getItem("tasks")) || []; // retrieves existing tasks  using the key "tasks", if there are none, it returns an empty array
    tasks.splice(index, 1); //removes the task at the specified index from the tasks array
    localStorage.setItem("tasks", JSON.stringify(tasks)); // store back the modified array into local storage as a JSON String.
    renderTasks();
  }
  
  //function to render tasks from local storage
  function renderTasks() {
    const taskList = document.getElementById("task-list");
    const tasks = JSON.parse(localStorage.getItem("tasks")) || []; // retrieve existing task from local storage, if none, returns an empty array
    taskList.textContent = ""; // clears existing content of the taskList to ensure a fresh rendering
  
    tasks.forEach((task, index) => {
      const listItem = document.createElement("li");
  
      // create the checkbox
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `task-${index}`;
      checkbox.checked = task.completed;
  
      //create the label for the task text
      const label = document.createElement("label");
      label.setAttribute("for", `task-${index}`);
      label.textContent = task.text;
  
      // Create the remove button
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
  
      // Add event listener for the remove button
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
  
      // Add event listener for the checkbox
      checkbox.addEventListener("change", () => {
        task.completed = !task.completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
      });
  
      // Append elements to the listItem
      listItem.appendChild(checkbox);
      listItem.appendChild(label);
      listItem.appendChild(removeButton);
  
      // Append listItem to taskList
      taskList.appendChild(listItem);
    });
  }
  // Initial rendering of tasks
  
  renderTasks();
  