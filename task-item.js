/* global saveList, displayList, decrementTopTask */
/**Variable storing the list of tasks as a JSON object */
let taskList = [];
let taskListDone = [];
class taskEntry extends HTMLElement {
  /**
   * Constructor for the taskEntry HTMLElement, containing the name, session
   * count, and removeButton
   * @constructor
   */
  constructor() {
    // Always call super first in constructor
    const template = document.createElement("template");
    template.innerHTML = `  
      <style>
      
        .object {
          display: flex;
          align-items: center;
          border: 1px solid #8a8a8a;
          border-radius: 10px;
          width: 98%;
          height: 120px;
          margin: 10px;
        }
        
        .object:hover {
          background-color: #f2f2f2;
        }
        .Name {
          padding: 20px;
          margin-right: 10px;
          width: 50%;
          max-width: 60%;
          text-align:left;
          overflow-x: hide;
        }
        .Session {
          padding: 20px;
        }
        #downTask{
          transform: rotate(180deg);
        }
        .all-move-btns{
          padding-left:15px;
          padding-right: 15px;
          width: 10%;
          max-width: 10%;
          margin: 0px;
          display: flex;
          flex:2;
        }
        .move-btns{
          width: 50%;
        }
        .move-btns button{
          background:none;
          outline: none;
          padding: 10px 0px 10px 0px;
          border: none;
        }
        .move-btns button svg{
          fill: #a3a3a3;
        }
        .move-btns button svg:hover{
          fill: #555;
        }
        #workTask{
          background:none;
          outline:none;
          margin: 0px;
          border:none;
          padding:10px;
        }
        #workTask svg{
          fill: #919191;
        }
        #workTask svg:hover{
          fill: #444;
        }
        .taskNumber{
          width:20%;
        }
        #taskSessionNumber{
          font-size: 20px;
          text-align: center;
          padding: 5px;
        } 
        #moveToNewList{
          width: 7.5%
          outline: none;
          background: none;
          border:none;
        }
        #moveToNewList:hover{
          outline: none;
          background: none;
          border:none;
        }
        #moveToNewList svg{
          fill: #919191;
        }
        #moveToNewList svg:hover{
          fill: #444;
        }
        #removeTask {
          border: none;
          background: none;
          width: 7.5%;
          height: 50%;
          outline: none;
        }
        #removeTask svg{
          fill: #919191;
        }
        #removeTask svg:hover{
          fill: #555;
        }
        .first{
          border: 1px solid red;
        }
        
      </style>
      
      <li id="element" class="object">
        <div class="all-move-btns">
          <div class="move-btns">
            <button class="up-btn" title="Move up" onclick="" id="upTask">
              <svg xmlns="images/arrow.svg" 
                height="50" viewBox="0 0 24 14" width="50" 
                preserveAspectRatio="xMidYMid slice">
                <path id="arrow" d="M0 0h24v24H0z" fill="none"/>
                <path d="M7 14l5-5 5 5z"/>
              </svg>
            </button>
            <button class="down-btn" title="Move down" onclick="" id="downTask">
              <svg xmlns="images/arrow.svg" 
                height="50" viewBox="0 0 24 14" width="50" 
                preserveAspectRatio="xMidYMid slice">
                <path id="arrow" d="M0 0h24v24H0z" fill="none" transform="rotate(180)"/>
                <path d="M7 14l5-5 5 5z"/>
              </svg>
            </button>
          </div>
          <button onclick="" title="Work on This Task" id="workTask"> 
          <svg xmlns="images/top.svg" height="70" viewBox="0 0 24 24" width="50">
            <path d="M0 0h24v24H0z" fill="none"/><path d="M5 4v2h14V4H5zm0 10h4v6h6v-6h4l-7-7-7 7z"/>
          </svg>
          </button>
        </div>
        <p class="Name" id="name">Task Name</p>
        <form class="taskNumber" action="">
          <input title="Number of Pomodoro Sessions" id="taskSessionNumber" name="taskSessionNumber" type="number" min="1" max="10" value="1" onKeyDown="return false">
        </form>
        <button onclick="" title="Move to Other List" id="moveToNewList">
          <svg xmlns="http://www.w3.org/2000/svg" height="50" viewBox="0 0 24 24" width="50">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"/>
          </svg>
        </button>
        <button title="Delete" onclick="" id="removeTask">
          <svg xmlns="images/delete.svg" height="35" viewBox="0 0 24 24" width="35">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
          </svg>
        </button>
      </li>
      `;
    super();
    this.root = this.attachShadow({ mode: "open" });
    this.root.appendChild(template.content.cloneNode(true));
  }
  /**
   * Sync the properties to object
   * @param {description}  Description - Object that contains the name, session,
   *     count
   */
  async syncName(description) {
    let taskName = this.root.getElementById("name");
    taskName.textContent = description.name;
    let sessionCount = this.root.getElementById("taskSessionNumber");
    sessionCount.addEventListener("change", function () {
      updateStorage(taskName.textContent, sessionCount.value);
    });
    sessionCount.value = description.sessions;
    let buttonRemove = this.root.getElementById("removeTask");
    buttonRemove.addEventListener("click", function () {
      removeButton(this, taskName.textContent);
    });
    let buttonWork = this.root.getElementById("workTask");
    if (description.done == true) {
      buttonWork.style.display = "none";
    } else {
      buttonWork.style.display = "block";
      buttonWork.addEventListener("click", function () {
        workOnThisButton(this, taskName.textContent);
      });
    }
    let buttonSwitch = this.root.getElementById("moveToNewList");
    let temp = this.root.getElementById("moveToNewList").querySelector("svg");
    if (description.done == true) {
      temp.setAttribute("xmlns", "");
    }
    buttonSwitch.addEventListener("click", function () {
      switchList(this, taskName.textContent);
    });
    let buttonUp = this.root.getElementById("upTask");
    buttonUp.addEventListener("click", function () {
      switchOrder(this, taskName.textContent, true);
    });
    let buttonDown = this.root.getElementById("downTask");
    buttonDown.addEventListener("click", function () {
      switchOrder(this, taskName.textContent, false);
    });
    if (description.firstTask === true) {
      this.root.getElementById("element").classList.add("first");
    }
  }
}

/**
 *  Updates local storage with new value of remaining sessions count
 *
 * @param {string} name - Name of Task
 * @param {int} newCount - New remaining sessions count
 *
 */
function updateStorage(name, newCount) {
  getCurrentTask();
  for (let i = 0; i < taskList.length; i++) {
    if (name == taskList[i].name) {
      taskList[i].sessions = newCount;
      saveList();
      displayList();
      return;
    }
  }
  for (let i = 0; i < taskListDone.length; i++) {
    if (name == taskListDone[i].name) {
      taskListDone[i].sessions = newCount;
      saveList();
      displayListDone();
      return;
    }
  }
}

/**
 * Return Current Working task, else return null
 */
function getCurrentTask() {
  let taskIndicator = document.getElementById("taskIndicator");
  if (taskList.length == 0) {
    taskIndicator.textContent = "No Task Selected";
    return null;
  } else {
    if (taskList[0].name.length >= 11) {
      taskIndicator.textContent = taskList[0].name.substring(0, 10) + "...";
    } else {
      taskIndicator.textContent = taskList[0].name;
    }
    return taskList[0].name;
  }
}

/**
 * Function called to switch order of tasks in task list implementation
 * @param {HTMLElement} button - The HTML button object this function is being
 *     attached to
 * @param {string} name - The name of the list entry that is being removed
 * @param {string} upDown - Whether the selected task will be moved up or down
 *
 */
function switchOrder(button, name, upDown) {
  for (let i = 0; i < taskList.length; i++) {
    if (name == taskList[i].name) {
      if (upDown) {
        if (i != 0) {
          var current = taskList[i];
          taskList[i] = taskList[i - 1];
          taskList[i - 1] = current;
        }
      } else {
        if (i != taskList.length - 1) {
          current = taskList[i];
          taskList[i] = taskList[i + 1];
          taskList[i + 1] = current;
        }
      }
      getCurrentTask();
      saveList();
      displayList();
      return;
    }
  }

  for (let i = 0; i < taskListDone.length; i++) {
    if (name == taskListDone[i].name) {
      if (upDown) {
        if (i != 0) {
          let currentTask = taskListDone[i];
          taskListDone[i] = taskListDone[i - 1];
          taskListDone[i - 1] = currentTask;
        }
      } else {
        if (i != taskListDone.length - 1) {
          let currentTask = taskListDone[i];
          taskListDone[i] = taskListDone[i + 1];
          taskListDone[i + 1] = currentTask;
        }
      }
      saveList();
      displayListDone();
      return;
    }
  }
}

/**
 * Select Task to work on, repeat call on switchOrder to move it up
 * @param {HTMLElement} button - Button of the task you want to change
 * @param {String} name - Name of the task
 */
function workOnThisButton(button, name) {
  for (let i = 0; i < taskList.length; i++) {
    if (name == taskList[i].name) {
      var count = i;
      while (count != 0) {
        switchOrder(button, name, true);
        count--;
      }
      saveList();
      displayList();
      return;
    }
  }
}

/**
 * Decrememnt the Top Task Pomo Sessions left
 */
function decrementTopTask() {
  if (taskList.length != 0) {
    taskList[0].sessions = taskList[0].sessions - 1;
    taskList[0].sessionTotal = taskList[0].sessionTotal + 1;
    if (taskList[0].sessions == 0) {
      switchList(null, taskList[0].name);
    }
    saveList();
    displayList();
  }
}

/**
 * Function called when removeButton is clicked. Removes the list entry the
 * removeButton is attached to
 * @param {HTMLElement} button - The HTML button object this function is being
 *     attached to
 * @param {string} name - The name of the list entry that is being removed
 */
function removeButton(button, name) {
  removeTask(name);
  console.log("Removed " + name);
}

/**
 * Create A Task Object - to be folded into taskEntry class
 * @constructor
 * @param {string} name - Name of Task
 */
function Task(name, sessionCount) {
  this.name = name;
  this.sessions = sessionCount;
  this.done = false;
  this.sessionTotal = 0;
  this.firstTask = false;
}

/**
 * Create the Task Object and add it to list/save in local storage
 * @param {string} name - Name of Task
 */
function putTaskInList(name, sessionCount) {
  let t = new Task(name, sessionCount);
  taskList.push(t);
  saveList();
  displayList();
}

/**
 * Switch Item from Done/To-Do
 * @param {button} button - The Button of the item being switched
 * @param {string} name - The  name of the item being switched
 */

function switchList(button, name) {
  for (let i = 0; i < taskList.length; i++) {
    if (name == taskList[i].name) {
      taskList[i].done = true;
      if (button != null) {
        button.innerHTML = "Move to Done";
      }
      taskListDone.push(taskList[i]);
      taskList.splice(i, 1);
      getCurrentTask();
      saveList();
      displayList();
      return;
    }
  }
  for (let i = 0; i < taskListDone.length; i++) {
    if (name == taskListDone[i].name) {
      taskListDone[i].done = false;
      if (button != null) {
        button.innerHTML = "Move to To-Do";
      }
      taskListDone[i].sessions = 1;
      taskList.push(taskListDone[i]);
      taskListDone.splice(i, 1);
      getCurrentTask();
      saveList();
      displayListDone();
      return;
    }
  }
}

/**
 * Remove the task object by list
 * @param {string} name - Name of Task
 */
function removeTask(name) {
  for (let i = 0; i < taskList.length; i++) {
    if (name == taskList[i].name) {
      taskList.splice(i, 1);
      saveList();
      displayList();
      return;
    }
  }
  for (let i = 0; i < taskListDone.length; i++) {
    if (name == taskListDone[i].name) {
      taskListDone.splice(i, 1);
      saveList();
      displayListDone();
      return;
    }
  }
}

/**
 * Add an user entered task into the list
 */
function addTask() {
  var name = document.getElementById("addTaskInput").value;
  for (let i = 0; i < taskList.length; i++) {
    if (name == taskList[i].name) {
      alert("You cannot have the same name as a previous task");
      return;
    }
  }
  for (let i = 0; i < taskListDone.length; i++) {
    if (name == taskListDone[i].name) {
      alert("You cannot have the same name as a previous task");
      return;
    }
  }
  var sessionCount = document.getElementById("sessionNumber").value;
  if (sessionCount < 0) {
    sessionCount.value = 0;
    return;
  }
  if (sessionCount > 10) {
    sessionCount.value = 10;
    return;
  }
  if (!name.trim().length) {
    alert("You need to enter a valid task name.");
    return;
  }
  putTaskInList(name, sessionCount);
  /*Some styling stuff - resetting form after adding */
  let taskBox = document.getElementById("addTaskInput");
  taskBox.value = "";
  let seshNum = document.getElementById("sessionNumber");
  seshNum.value = "1";
  // close the modal upon creation
  let modal = document.getElementById("addModal");
  modal.style.display = "none";
}

/**
 * Accesses local storage to populate taskList and sets to empty if not found
 */
function getList() {
  if (localStorage.getItem("taskListCurrent-JSON") != null) {
    taskList = JSON.parse(localStorage.getItem("taskListCurrent-JSON"));
  } else {
    taskList = [];
  }
  if (localStorage.getItem("taskListDone-JSON") != null) {
    taskListDone = JSON.parse(localStorage.getItem("taskListDone-JSON"));
  } else {
    taskListDone = [];
  }
}

/**
 * Save taskList in a string version to local storage
 */
function saveList() {
  localStorage.setItem("taskListCurrent-JSON", JSON.stringify(taskList));
  localStorage.setItem("taskListDone-JSON", JSON.stringify(taskListDone));
}

/**
 * Displays all the task list current on the web page
 */
function displayList() {
  // Some CSS related thingy
  document.getElementById("to-do").className = "activeList";
  document.getElementById("done").className = "";
  // End of CSS
  var taskFile = document.getElementById("tasks");
  // console.log(taskList);
  taskFile.innerHTML = "";
  for (let i = 0; i < taskList.length; i++) {
    var currentTask = taskList[i];
    // currentTask.sessions = currentTask.originalSessions;
    let newTask = new taskEntry(); // So code factor is happy
    currentTask.firstTask = i === 0;

    newTask.syncName(currentTask);
    taskFile.appendChild(newTask);
  }
}
/**
 * Displays all the task list done on the web page
 */
function displayListDone() {
  // Some CSS related thingy
  document.getElementById("done").className = "activeList";
  document.getElementById("to-do").className = "";
  // End of CSS
  var taskFile = document.getElementById("tasks");
  // console.log(taskList);
  taskFile.innerHTML = "";
  for (let i = 0; i < taskListDone.length; i++) {
    var currentTask = taskListDone[i];
    currentTask.firstTask = false;
    currentTask.sessions = currentTask.sessionTotal;
    let newTask = new taskEntry();
    newTask.syncName(currentTask);
    taskFile.appendChild(newTask);
  }
}

customElements.define("task-item", taskEntry);
