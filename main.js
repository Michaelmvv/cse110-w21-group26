let endAt = 0;
let countingDown = false;

let timerText;

/**
 * Users input of how many short breaks before a long break
 */
let sessionsBeforeLongBreak = 4;  // user seleciton

/**
 * Number of sessions until long break
 */
let sessionCountDown = sessionsBeforeLongBreak;
let sound = new Audio('alarm1.flac');

/**
 * keeps track if timer is a work or a break timer.
 *  breakState will be set to true when a break begins
 */
let breakState = false;

/**Number of minutes to run the timer for */
let timerLength = [];

/**Variable storing the list of tasks as a JSON object */
let taskList = [];


let progress;
let pointer;
let move;

window.onload = start(); 
/**
 * Onload function. Adds eventListeners to buttons, sets update function to run
 * every 1000 ms loads taskList contents from local storage, and displays
 * taskList contents
 */
function start(){
  // window.addEventListener('beforeunload',unloadChecker);
  window.onbeforeunload = unloadChecker;
  ``
  timerText = document.getElementById('timer');
  document.getElementById('StartButton').addEventListener('click', startTimer);
  document.getElementById('StopButton').addEventListener('click', stopTimer);

  document.getElementById('workTime').addEventListener('click', setWorkTime);
  document.getElementById('longBreak').addEventListener('click', setLongTime);
  document.getElementById('shortBreak').addEventListener('click', setShortTime);

  // For circle rotation
  progress = document.getElementById('circleProgress');
  pointer = document.getElementById('pointerDot');
  move = Math.PI * 2 * 100;
  progress.style.strokeDasharray = move;
  progress.style.strokeDashoffset = move * 2;


  setInterval(update, 1000);

  getList();
  displayList();
}

/**
 * This is called when the "Work Timer" button is pressed
 */
function setWorkTime() {
  timerLength = document.getElementById('workTimeInput').value;
  sessionCountDown = 0;
  officialStart();
}

/**
 * This is called when the "Long Break" button is pressed
 */
function setLongTime() {
  timerLength = document.getElementById('longBreakTimeInput').value;
  sessionCountDown = 0;
  officialStart();

  // Change color scheme
}

/**
 * This is called when the "Short Break" button is pressed
 */
function setShortTime() {
  timerLength = document.getElementById('shortBreakTimeInput').value;
  sessionCountDown = 0;
  officialStart();

  // Change color scheme
}

/**
 * Run when the window is going to close. Gives a warning when the timer is
 * running.
 */
function unloadChecker(e) {
  let test = countingDown ? 'Are you sure you want to leave?' :
                            null;  // Chrome will not show this.
  e.retunValue = test;
  return test;
}

/**
 * Timer function that keeps track of time left until end - Under consturction
 */
function updateTimerText() {
  timerText =
      document.getElementById('timer'); /** Need a local variable for testing */
  timerText.textContent =
      toHuman((endAt - Date.now()));  // sets timer text on HTML page

  // Some CSS play around - sorry Dev team!
  let ms = (endAt - Date.now()) / 60000;
  updateCircle(ms, timerLength);
}
/*
 * update html text
 * keep trac
 * update session
 *   - Worktime -> *break
 *   - *break -> worktime
 *   - stoped
 */

/**
 * The update function is called once per second
 */
function update() {
  if (countingDown) {
    if (Date.now() < endAt + 1000) {
      updateTimerText();
    } else {
      updateSession();
    }
  }
}
/**
 * Updates the number of Pomodoro work sessions left to be completed before a
 * long break happens
 */
function updateSession() {
  // during work, displays how many sessions left of work before longbreak
  // during short break, displays "break!" or something similar
  // during long break, displays "long break!" or break
  // 4 short 3 short 2 short 1 long(0) reset to 4
  // short break
  //   0        1     0       1      0      1       0      1
  // 25 min, short, 25 min, short, 25 min, short, 25 min, long
  if (breakState == true) {
    console.log('pomo session starting');
    timerLength = document.getElementById('workTimeInput').value;
    endAt = Date.now() + (60000 * Number(timerLength));
    breakState = false;
    update();
    return;
  }

  if (sessionCountDown > 1) {
    console.log('short break starting');
    timerLength = document.getElementById('shortBreakTimeInput').value;
    endAt = Date.now() + (60000 * Number(timerLength));
    breakState = true;
  }


  // long break
  else if (sessionCountDown === 1) {
    console.log('Long Break starting, hopefully.');
    timerLength = document.getElementById('longBreakTimeInput').value;
    endAt = Date.now() + (60000 * Number(timerLength));
    breakState = true;
  }

  // can just be an else statement
  else if (sessionCountDown === 0) {
    console.log('DONEEEEE reset plz');
    stopTimer();
  }

  update();
  sessionCountDown--;
}

// Insperation from
// https://stackoverflow.com/questions/19700283/how-to-convert-time-milliseconds-to-hours-min-sec-format-in-javascript
/**Converts a time in ms to a human readable string
 * @param {number} ms - Time in ms to convert
 * @returns {string} Text of time remaining
 */
function toHuman(ms) {
  var currentTime =
      new Date(1000 * Math.round(ms / 1000));  // round to nearest second
  function pad(i) {
    return ('0' + i).slice(-2);
  }
  var str =
      pad(currentTime.getUTCMinutes()) + ':' + pad(currentTime.getUTCSeconds());

  return str;
}


function startTimer() {
  timerLength = document.getElementById('workTimeInput').value;
  officialStart();  // startTimer only calls officialStart(), replace all calls
                    // of startTimer() with officialStar
}

/**
 * Sets timer to beginning of work timer length. Depending on context, this may
 * be used to start a new session or reset one
 */
function officialStart() {
  
  endAt = Date.now() + (60000 * Number(timerLength));  // 60000 min to ms
  countingDown = true;
  updateCircle(timerLength, timerLength);
  update();
  document.getElementById('StartButton').style.display = 'none';
  document.getElementById('StopButton').style.display = 'initial';
}

/**
 * Stops timer and resets button text to starting contents
 */
function stopTimer() {
  sound.pause();
  countingDown = false;
  timerText.textContent = 'Stopped!';
  document.getElementById('StartButton').innerText = 'Start Timer';
  document.getElementById('StartButton').style.display = '';
  document.getElementById('StopButton').style.display = 'none';
  sessionCountDown = sessionsBeforeLongBreak;
}

/**
 * Create A Task Object - to be folded into taskEntry class
 * @constructor
 * @param {string} name - Name of Task
 */
function Task(name) {
  this.name = name;
  this.sessions = 0;
  this.done = false;
}

/**
 * Create the Task Object and add it to list/save in local storage
 * @param {string} name - Name of Task
 */
function putTaskInList(name) {
  let t = new Task(name);
  taskList.push(t);
  saveList();
  displayList();
}

/**
 * Remove the task object by list
 * @param {string} name - Name of Task
 */
function removeTask(name) {
  for (let i = 0; i < taskList.length; i++) {
    if (name == taskList[i].name) {
      taskList.splice(i, 1);
      break;
    }
  }
  saveList();
  displayList();
}

/**
 * Add an user entered task into the list
 */
function addTask() {
  var name = document.getElementById('addTaskInput').value;
  if (name != null) {
    putTaskInList(name);
  }
}

/**
 * Accesses local storage to populate taskList and sets to empty if not found
 */
function getList() {
  if (localStorage.getItem('taskList-JSON') != null) {
    taskList = JSON.parse(localStorage.getItem('taskList-JSON'));
  } else {
    taskList = [];
  }
}

/**
 * Save taskList in a string version to local storage
 */
function saveList() {
  localStorage.setItem('taskList-JSON', JSON.stringify(taskList));
}

/**
 * Displays all the task list on the web page
 */
function displayList() {
  var taskFile = document.getElementById('tasks');
  console.log(taskList);
  taskFile.innerHTML = '';
  for (let i = 0; i < taskList.length; i++) {
    var currentTask = taskList[i];
    // let newTask = new taskEntry(); //So code factor is happy
    // newTask.syncName(currentTask);
    // taskFile.appendChild(newTask);
  }
}

/**
 * Functions for CSS
 */

// Indicates which button is active
function seshClicked(seshID) {
  document.querySelectorAll('.active').forEach(function(item) {
    item.className = '';
  });


  /* Changing color scheme of buttons depending on which button is clicked*/
  let session = document.getElementById(seshID);
  let circle = document.getElementById('circleProgress');
  let circlePointer = document.getElementById('pointerProgress');
  let start = document.getElementById('StartButton');
  let end = document.getElementById('StopButton');
  let short = document.getElementById('shortBreak');
  let long = document.getElementById('longBreak');
  let work = document.getElementById('workTime');
  session.className = 'active';
  // hover effect need to address
  if (seshID == 'shortBreak') {
    long.className = 'notShortbreak';
    work.className = 'notShortbreak';
    start.className = 'notShortbreak';
    end.className = 'notShortbreak';
    circlePointer.className.baseVal = 'shortCircle';
    circle.className.baseVal = 'shortCircle';
  } else if (seshID == 'longBreak') {
    short.className = 'notLongbreak';
    work.className = 'notLongbreak';
    start.className = 'notLongbreak';
    end.className = 'notLongbreak';
    circlePointer.className.baseVal = 'longCircle';
    circle.className.baseVal = 'longCircle';
  } else {
    short.className = 'notWork';
    long.className = 'notWork';
    start.className = 'notWork';
    end.className = 'notWork';
    circlePointer.className.baseVal = 'workCircle';
    circle.className.baseVal = 'workCircle';
  }
}




function updateCircle(val, time) {
  let offset = move + move * val / (time);
  progress.style.strokeDashoffset = offset;
  let rotation = 360 - 360 * val / (time);
  pointer.style.transform = `rotate(${rotation}deg)`;
}

function darkMode() {
  let dark = document.getElementById('darkMode');
  console.log('wat');
  console.log(dark);
}

// module.exports.method = setWorkTime;
// exports.method = setWorkTime;
module.exports = {setWorkTime,darkMode}
