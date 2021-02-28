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
    const template = document.createElement('template');
    template.innerHTML = `  
      <style>
        .object {
          display: flex;
          align-items: center;
          border: 1px solid #8a8a8a;
          border-radius: 10px;
          width: 98%;
          margin: 10px;
        }
        .object:hover {
          background-color: #f2f2f2;
        }
        .Name {
          padding: 20px;
          width: 60%;
          max-width: 60%;
          text-align:left;
        }
        .Session {
          padding: 20px;
        }
        .move-btns{
          padding-left:20px;
          width: 10%;
        }
        .move-btns button{
          background:none;
          border: none;
          padding: 0;
        }
        .move-btns button img{
          height: 60px;
          padding: 0px;
          margin: 0px;
          width:50px;
        }
        #removeTask {
          background-color: #e97;
          border: none;
          border-radius: 5px;
          color: white;
          width: 12%;
          height: 9%;
          text-align: center;
          margin-left: 80px;
        }
      </style>
      <span>
      <li class="object">
        <div class="move-btns">
          <button onclick="" id="upTask"><img src="./images/arrow.svg"></button>
          <button onclick="" id="downTask"><img src="./images/arrow.svg" style="transform: rotate(180deg)"></button>
        </div>
        <p class="Name" id="name">Task Name</p>
        <form action="">
        <input id="taskSessionNumber" name="taskSessionNumber" type="number" min="1" max="10" value="1" onKeyDown="return false">
        </form>
        <button onclick="" id="moveToNewList">Switch List</button>
        <button onclick="" id="removeTask">Remove Task</button>
      </li>
      </span>
      `;
    super();
    this.root = this.attachShadow({mode: 'open'});
    this.root.appendChild(template.content.cloneNode(true));
  }
  /**
   * Sync the properties to object
   * @param {description}  Description - Object that contains the name, session,
   *     count
   */
  async syncName(description) {
    let taskName = this.root.getElementById('name');
    taskName.textContent = description.name;
    let sessionCount = this.root.getElementById('taskSessionNumber');
    sessionCount.addEventListener('change', function() {
      updateStorage(taskName.textContent, sessionCount.value)
    })
    sessionCount.value = description.sessions;
    let buttonRemove = this.root.getElementById('removeTask');
    buttonRemove.addEventListener('click', function() {
      removeButton(this, taskName.textContent);
    });
    let buttonSwitch = this.root.getElementById('moveToNewList');
    buttonSwitch.addEventListener('click', function() {
      switchList(this, taskName.textContent);
    });
    let buttonUp = this.root.getElementById('upTask');
    buttonUp.addEventListener('click', function() {
      switchOrder(this, taskName.textContent, true);
    });
    let buttonDown = this.root.getElementById('downTask');
    buttonDown.addEventListener('click', function() {
      switchOrder(this, taskName.textContent, false);
    });
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
      if(upDown) {
        if(i != 0) {
          var current = taskList[i];
          taskList[i] = taskList[i-1];
          taskList[i-1] = current;
        }
      } else {
        if(i != taskList.length - 1) {
          current = taskList[i];
          taskList[i] = taskList[i+1];
          taskList[i+1] = current;
        }
      }
      break;
    }
  }
  saveList();
  displayList();
}

function decrementTopTask() {
  if(taskList.length != 0) {
    taskList[0].sessions = taskList[0].sessions - 1;
    taskList[0].sessionTotal = taskList[0].sessionTotal + 1;
    if(taskList[0].sessions == 0) {
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
  console.log('Removed ' + name);
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
      taskList.done = true;
      if(button != null) {
        button.innerHTML = "Move to Done";
      }
      taskListDone.push(taskList[i]);
      taskList.splice(i, 1);
      saveList();
      displayList();
      return;
    }
  }
  for (let i = 0; i < taskListDone.length; i++) {
    if (name == taskListDone[i].name) {
      taskList.done = false;
      if (button != null) {
        button.innerHTML = "Move to To-Do";
      }
      taskList.push(taskListDone[i]);
      taskListDone.splice(i, 1);
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
      taskList.splice(i,1);
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
  var name = document.getElementById('addTaskInput').value;
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
  var sessionCount = document.getElementById('sessionNumber').value;
  if(sessionCount < 0) {
    sessionCount.value = 0;
    return;
  }
  if (sessionCount > 10) {
    sessionCount.value = 10;
    return;
  }
  if (name != null) {
    putTaskInList(name, sessionCount);
  }
}

/**
 * Accesses local storage to populate taskList and sets to empty if not found
 */
function getList() {
  if (localStorage.getItem('taskListCurrent-JSON') != null) {
    taskList = JSON.parse(localStorage.getItem('taskListCurrent-JSON'));
  } else {
    taskList = [];
  }
  if (localStorage.getItem('taskListDone-JSON') != null) {
    taskListDone = JSON.parse(localStorage.getItem('taskListDone-JSON'));
  } else {
    taskListDone = [];
  }
}

/**
 * Save taskList in a string version to local storage
 */
function saveList() {
  localStorage.setItem('taskListCurrent-JSON', JSON.stringify(taskList));
  localStorage.setItem('taskListDone-JSON', JSON.stringify(taskListDone));
}

/**
 * Displays all the task list current on the web page
 */
function displayList() {
  //Some CSS related thingy
  let toDoBtn = document.getElementById('to-do');
  toDoBtn.className = 'active';
  let doneBtn = document.getElementById('done');
  doneBtn.className = '';
  //End of CSS
  var taskFile = document.getElementById('tasks');
  // console.log(taskList);
  taskFile.innerHTML = '';
  for (let i = 0; i < taskList.length; i++) {
    var currentTask = taskList[i];
    let newTask = new taskEntry(); //So code factor is happy
    newTask.syncName(currentTask);
    taskFile.appendChild(newTask);
  }
}
/**
 * Displays all the task list done on the web page
 */
function displayListDone() {
  //Some CSS related thingy
  let doneBtn = document.getElementById("done");
  doneBtn.className = "active";
  let toDoBtn = document.getElementById("to-do");
  toDoBtn.className = "";
  //End of CSS
  var taskFile = document.getElementById("tasks");
  // console.log(taskList);
  taskFile.innerHTML = "";
  for (let i = 0; i < taskListDone.length; i++) {
    var currentTask = taskListDone[i];
    currentTask.sessions = currentTask.sessionTotal;
    let newTask = new taskEntry(); //So code factor is happy
    newTask.syncName(currentTask);
    taskFile.appendChild(newTask);
  }
}

customElements.define("task-item", taskEntry);