/* global saveList, displayList, decrementTopTask, getList, displayListDone, introJs, getCurrentTask, removeTask, addTaskTutorial */
/**Variable storing the list of tasks as a JSON object */
let taskList = [];
let taskListDone = [];
let listTracker = false;
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
        button:hover{
          cursor: pointer;
        }
        button img{
          opacity: 0.7;
        }
        button img:hover{
          opacity: 1;
        }
        .object {
          display: flex;
          justify-content: space-evenly;
          align-items: center;
          border: 1.5px solid #8a8a8a;
          border-radius: 10px;
          width: 98%;
          height: 120px;
          margin: 10px;
        }
        
        .object:hover {
          background-color: #f2f2f2;
        }
        .Name {
          font-size: 20px;
          padding: 10px;
          margin-right: 10px;
          margin-left: 5px;
          width: 48%;
          max-width: 48%;
          text-align:left;
          overflow-x: hide;
          display: block;
          border-radius: 5px;
        }
        .Session {
          padding: 20px;
        }
        #downTask{
          transform: rotate(180deg);
        }
        .all-move-btns{
          padding-left:2px;
          padding-right: 2px;
          width: 15%;
          max-width: 15%;
          margin: 0px;
          display: flex;
          flex:2;
        }
        .move-btns{
          width: 50%;
          max-width:50%;
        }
        .move-btns button{
          background:none;
          outline: none;
          padding: 0px;
          margin: auto;
          border: none;
          display: block;
        }
        .move-btns button img{
          width: 100%;
        }
        #workTask{
          background:none;
          outline:none;
          margin: auto;
          border:none;
          display: block;
          padding: 3px;
          width: 50%;
        }
        #workTask img{
          width: 100%;
        }
        #taskNum{
          width:17%;
          max-width: 17%; 
        }
        .taskNumber{
          width:50%;
          max-width: 50%; 
          display: block;
          margin: auto;
        }
        #taskSessionNumber{
          font-size: 20px;
          text-align: center;
          width:90%;
          padding: 10px;         
          max-width: 90%;
          display: block;
        } 
        #moveToNewList{
          width: 10%;
          outline: none;
          background: none;
          border:none;
          display: block;
        }
        #moveToNewList:hover{
          outline: none;
          background: none;
          border:none;
        }
        #moveToNewList img{
          width: 60%;
          margin: auto;
        }
        #removeTask {
          border: none;
          background: none;
          width: 10%;
          height: 50%;
          outline: none;
          display: block;
        }
        #removeTask img{
          width: 50%;
          margin: auto;
        }
        .first{
          border: 1.5px solid #e97878;
        }

        @media (max-width: 900px) {
          .Name{
            width: 30%;
            font-size: 15px;
          }
          .all-move-btns{
            width: 30%;
            max-width:30%;
          }
          .taskNumber{
            margin: 0px;
          }
          #taskSessionNumber{
            font-size: 15px;
          }
          #removeTask{
            padding: 0px;
          }
          #removeTask img{
            width: 100%;
          }
          #moveToNewList img{
            width: 100%;
          }
          #moveToNewList{
            padding: 0px;
          }
        }
        
      </style>
      
      <li id="element" class="object" part="object">
        <div class="all-move-btns">
          <div class="move-btns">
            <button class="up-btn" title="Move up" onclick="" id="upTask">
              <img src="images/arrow.svg"></img>
            </button>
            <button class="down-btn" title="Move down" onclick="" id="downTask">
              <img src="images/arrow.svg"></img>
            </button>
          </div>
          <button onclick="" title="Work on This Task" id="workTask"> 
            <img src="images/top.svg"></img>
          </button>
        </div>
        <input title="Task Name" class="Name" id="name" type="text" value="Insert Task Name" />
        <div id="taskNum">
        <form class="taskNumber" action="">
          <input title="Number of Pomodoro Sessions" id="taskSessionNumber" name="taskSessionNumber" type="number" min="1" max="10" value="1">
        </form>
        </div>
        <button onclick="" title="Move to Other List" id="moveToNewList">
          <img id="swapList" src="images/check.svg"/>
        </button>
        <button title="Delete" onclick="" id="removeTask">
          <img src="images/delete.svg"></img>
        </button>
      </li>
      `;
    super();
    this.root = this.attachShadow({ mode: "open" });
    /*var bgStyle = document.createElement( 'bgStyle' );
    bgStyle.textContent = ':host(.object){background: #ddd;}';
    this.root.appendChild(bgStyle);*/
    this.root.appendChild(template.content.cloneNode(true));
  }
  /**
   * Sync the properties to object
   * @param {description}  Description - Object that contains the name, session,
   *     count
   */
  async syncName(description) {
    let taskName = this.root.getElementById("name");
    taskName.addEventListener("change", function () {
      updateStorage(
        description.originalName,
        taskName.value,
        description.sessions
      );
    });
    taskName.value = description.name;
    let sessionCount = this.root.getElementById("taskSessionNumber");
    sessionCount.addEventListener("change", function () {
      if (sessionCount.value <= 0) {
        sessionCount.value = 1;
      }
      if (sessionCount.value >= 11) {
        sessionCount.value = 10;
      }
      sessionCount.value = Math.floor(sessionCount.value);
      updateStorage(
        description.originalName,
        taskName.value,
        Math.floor(sessionCount.value)
      );
      getCurrentTask();
    });
    sessionCount.value = description.sessions;
    let buttonRemove = this.root.getElementById("removeTask");
    buttonRemove.addEventListener("click", function () {
      removeButton(this, taskName.value);
    });
    let buttonWork = this.root.getElementById("workTask");
    let swapList = this.root.getElementById("swapList");
    if (description.done == true) {
      buttonWork.style.display = "none";
      swapList.src = "images/undo.svg";
    } else {
      swapList.src = "images/check.svg";
      buttonWork.style.display = "block";
      buttonWork.addEventListener("click", function () {
        workOnThisButton(this, taskName.value);
      });
    }
    let buttonSwitch = this.root.getElementById("moveToNewList");
    /*let temp = this.root.getElementById("moveToNewList").querySelector("svg");
    if (description.done == true) {
      temp.setAttribute("xmlns", "");
    }*/
    buttonSwitch.addEventListener("click", function () {
      switchList(this, taskName.value);
    });
    let buttonUp = this.root.getElementById("upTask");
    buttonUp.addEventListener("click", function () {
      switchOrder(this, taskName.value, true);
    });
    let buttonDown = this.root.getElementById("downTask");
    buttonDown.addEventListener("click", function () {
      switchOrder(this, taskName.value, false);
    });
    if (description.firstTask === true) {
      this.root.getElementById("element").classList.add("first");
      this.root.getElementById("element").part.add("first");
    }
    getCurrentTask();
  }
}

/**
 *  Updates local storage with new value of remaining sessions count
 *
 * @param {string} name - Name of Task
 * @param {int} newCount - New remaining sessions count
 *
 */
function updateStorage(originalName, name, newCount) {
  if (!name.trim().length) {
    alert("You need to enter a valid task name.");
    removeTask("New Task");
    if (listTracker) {
      displayList();
    } else {
      displayListDone();
    }
    return;
  }
  for (let i = 0; i < taskList.length; i++) {
    if (originalName != name && name == taskList[i].name) {
      alert("You cannot have the same name as a previous task");
      removeTask("New Task");
      if (listTracker) {
        displayList();
      } else {
        displayListDone();
      }
      return;
    }
  }
  for (let i = 0; i < taskListDone.length; i++) {
    if (originalName != name && name == taskListDone[i].name) {
      alert("You cannot have the same name as a previous task");
      removeTask("New Task");
      if (listTracker) {
        displayList();
      } else {
        displayListDone();
      }
      return;
    }
  }
  for (let i = 0; i < taskList.length; i++) {
    if (originalName == taskList[i].originalName) {
      taskList[i].originalName = name;
      taskList[i].name = name;
      taskList[i].sessions = newCount;
      taskList[i].seshAll = newCount;
      saveList();
      displayList();
      return;
    }
  }
  for (let i = 0; i < taskListDone.length; i++) {
    if (originalName == taskList[i].originalName) {
      taskListDone[i].originalName = name;
      taskListDone[i].sessions = newCount;
      taskList[i].seshAll = newCount;
      taskList[i].name = name;
      saveList();
      displayListDone();
      return;
    }
  }
}

/**
 * Return Current Working task and update text on screen, else return null
 */
function getCurrentTask() {
  let taskIndicator = document.getElementById("taskIndicator");
  //  let seshLeft = document.getElementById("seshLeft");
  if (taskList.length == 0) {
    taskIndicator.textContent = "";
    //    seshLeft.textContent = "";
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
 * Decrememnt the Top Task Pomodoro Sessions left, move to done list if necessary
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
  this.seshAll = sessionCount;
  //console.log(this.sessions + " HERE " + this.seshAll);
  this.done = false;
  this.sessionTotal = 0;
  this.firstTask = false;
  this.originalName = name;
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
      if (taskList[i].name != "New Task") {
        taskListDone.push(taskList[i]);
      }
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
 * Add an example task for the tutorial menu
 */
function addTaskTutorial() {
  if (taskList.length == 0) {
    putTaskInList("Task Name", "5");
  }
}
/**
 * Add an user entered task into the list
 */
function addTask() {
  // var name = document.getElementById("addTaskInput").value;
  // for (let i = 0; i < taskList.length; i++) {
  //   if (name == taskList[i].name) {
  //     alert("You cannot have the same name as a previous task");
  //     return;
  //   }
  // }
  // for (let i = 0; i < taskListDone.length; i++) {
  //   if (name == taskListDone[i].name) {
  //     alert("You cannot have the same name as a previous task");
  //     return;
  //   }
  // }
  // var sessionCount = document.getElementById("sessionNumber").value;
  // if (sessionCount < 0) {
  //   sessionCount.value = 0;
  //   return;
  // }
  // if (sessionCount > 10) {
  //   sessionCount.value = 10;
  //   return;
  // }
  // if (!name.trim().length) {
  //   alert("You need to enter a valid task name.");
  //   return;
  // }
  for (let i = 0; i < taskList.length; i++) {
    if ("New Task" == taskList[i].name) {
      alert("You already have a New Task waiting to be customized");
      return;
    }
  }
  putTaskInList("New Task", "1");
  /*Some styling stuff - resetting form after adding */
  // let taskBox = document.getElementById("addTaskInput");
  // taskBox.value = "";
  // let seshNum = document.getElementById("sessionNumber");
  // seshNum.value = "1";
  // // close the modal upon creation
  // let modal = document.getElementById("addModal");
  // modal.style.display = "none";
}

/**
 * Clear the done list and remove all tasks
 */
function clearDoneList() {
  taskListDone = [];
  saveList();
  displayListDone();
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
  getCurrentTask();
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
  let addTask = document.getElementById("addBtn");
  let clearTask = document.getElementById("clearBtn");
  addTask.style.display = "initial";
  clearTask.style.display = "none";
  listTracker = true;
  getCurrentTask();
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
  let addTask = document.getElementById("addBtn");
  let clearTask = document.getElementById("clearBtn");
  addTask.style.display = "none";
  clearTask.style.display = "initial";
  listTracker = false;
  getCurrentTask();
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
