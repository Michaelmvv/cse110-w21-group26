/* global taskEntry, getList, displayList, decrementTopTask */

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

/**
 * Onload function. Adds eventListeners to buttons, sets update function to run
 * every 1000 ms loads taskList contents from local storage, and displays
 * taskList contents
 */
window.onload = () => {
  // window.addEventListener('beforeunload',unloadChecker);
  window.onbeforeunload = unloadChecker;
  ``
  timerText = document.getElementById('timer');
  document.getElementById('StartButton').addEventListener('click', startTimer);
  document.getElementById('StopButton').addEventListener('click', stopTimer);

  document.getElementById('workTime').addEventListener('click', setWorkTime);
  document.getElementById('longBreak').addEventListener('click', setLongTime);
  document.getElementById('shortBreak').addEventListener('click', setShortTime);

  document.getElementById('longBreakTimeInput').addEventListener('change',{
      
  });
  timerLength = document.getElementById('workTimeInput').value;
  setInterval(update, 1000);

  getList();
  displayList();
};

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
  //timerText = document.getElementById('timer'); /** Need a local variable for testing */
  timerText.textContent =
      toHuman((endAt - Date.now()));  // sets timer text on HTML page

  // CSS for updating circle - sorry Dev team!
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
    if (Date.now() < endAt) {
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
    // add this for changing color scheme
    seshClicked('workTime');
    update();
    return;
  }

  if (sessionCountDown > 1) {
    console.log('short break starting');
    timerLength = document.getElementById('shortBreakTimeInput').value;
    endAt = Date.now() + (60000 * Number(timerLength));
    breakState = true;
    // add this for changing color scheme
    seshClicked('shortBreak');
    decrementTopTask();
  }


  // long break
  else if (sessionCountDown === 1) {
    console.log('Long Break starting, hopefully.');
    timerLength = document.getElementById('longBreakTimeInput').value;
    endAt = Date.now() + (60000 * Number(timerLength));
    breakState = true;
    // add this for changing color scheme
    seshClicked('longBreak');
    decrementTopTask();
  }

  // can just be an else statement
  else if (sessionCountDown === 0) {
    console.log('DONEEEEE reset plz');
    // decrementTopTask();
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
  officialStart();  // startTimer only calls officialStart(), replace all calls
                    // of startTimer() with officialStar
}

/**
 * Sets timer to beginning of work timer length. Depending on context, this may
 * be used to start a new session or reset one
 */
function officialStart() {
  //timerLength = document.getElementById('workTimeInput').value;
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
 * Functions for CSS
 */


/**
 * Change the colors according to button clicked
 * @param {string} seshID 
 */
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
  //Task list Components
  let toDoBtn = document.getElementById('to-do');
  let doneBtn = document.getElementById('done');
  let addTaskBtn = document.getElementById('addBtn');
  let taskInput = document.getElementById('addTaskInput');
  //Logo Components
  let logoP1 = document.getElementById('logo-P1');
  let logoP2 = document.getElementById('logo-P2');
  let logoCircle = document.getElementById('logo-circle');

  session.className = 'active';
  // hover effect need to address
  if (seshID == 'shortBreak') {
    long.className = 'notShortbreak';
    work.className = 'notShortbreak';
    start.className = 'notShortbreak';
    end.className = 'notShortbreak';
    addTaskBtn.style.backgroundColor = "#5883ce";
    taskInput.style.borderColor = "#5883ce";
    if(toDoBtn.className == 'activeList'){
      toDoBtn.style.backgroundColor = "#5883ce";
      doneBtn.style.backgroundColor = "#ccc";
    }else{
      doneBtn.style.backgroundColor = "#5883ce";
      toDoBtn.style.backgroundColor = "#ccc";
    }
    logoP1.style.fill="#5883ce";
    logoP2.style.fill="#5883ce";
    logoCircle.style.fill="#7D97BC";
    circlePointer.className.baseVal = 'shortCircle';
    circle.className.baseVal = 'shortCircle';
  } else if (seshID == 'longBreak') {
    short.className = 'notLongbreak';
    work.className = 'notLongbreak';
    start.className = 'notLongbreak';
    end.className = 'notLongbreak';
    addTaskBtn.style.backgroundColor = "#2947b5";
    taskInput.style.borderColor = "#2947b5";
    if(toDoBtn.className == 'activeList'){
      toDoBtn.style.backgroundColor = "#2947b5";
      doneBtn.style.backgroundColor = "#ccc";
    }else{
      doneBtn.style.backgroundColor = "#2947b5";
      toDoBtn.style.backgroundColor = "#ccc";
    }
    logoP1.style.fill="#2947b5";
    logoP2.style.fill="#2947b5";
    logoCircle.style.fill="#5C6DA8";
    circlePointer.className.baseVal = 'longCircle';
    circle.className.baseVal = 'longCircle';
  } else {
    short.className = 'notWork';
    long.className = 'notWork';
    start.className = 'notWork';
    end.className = 'notWork';
    addTaskBtn.style.backgroundColor = "#e97878";
    taskInput.style.borderColor = "#e97878";
    if(toDoBtn.className == 'activeList'){
      toDoBtn.style.backgroundColor = "#e97878";
      doneBtn.style.backgroundColor = "#ccc";
    }else{
      doneBtn.style.backgroundColor = "#e97878";
      toDoBtn.style.backgroundColor = "#ccc";
    }
    logoP1.style.fill="#F14148";
    logoP2.style.fill="#F14148";
    logoCircle.style.fill="#F68D90";
    circlePointer.className.baseVal = 'workCircle';
    circle.className.baseVal = 'workCircle';
  }
}

// For circle rotation
let progress = document.getElementById('circleProgress');
let pointer = document.getElementById('pointerDot');
let move = Math.PI * 2 * 100;
progress.style.strokeDasharray = move;
progress.style.strokeDashoffset = move * 2;

/**
 * update the circular timer display
 * @param {number} val 
 * @param {number} time 
 */
function updateCircle(val, time) {
  let offset = move + move * val / (time);
  progress.style.strokeDashoffset = offset;
  let rotation = 360 - 360 * val / (time);
  pointer.style.transform = `rotate(${rotation}deg)`;
}
/**
 * change the dark mode according to toggle button
 */
function darkMode() {
  let dark = document.getElementById('darkMode');
  let timerText = document.getElementById('timer');
  let taskListBackground = document.getElementById('pomoList');
  let settingsLogo = document.getElementById('settingsLogo');
  if (dark.checked) {
    document.body.style.backgroundColor = "#363636";
    timerText.style.fill = "#c3c3c3";
    taskListBackground.style.backgroundColor = "#c4c4c4";
    settingsLogo.setAttribute("fill", "#c3c3c3");
  } else {
    document.body.style.backgroundColor = "#f2f2f2";
    timerText.style.fill = "#363636";
    taskListBackground.style.backgroundColor = "#ffffff";
    settingsLogo.setAttribute("fill", "#444444");
  }
}
/**
 * the automatic function from the settings
 * it controls the visibility of sessions button 
 * and the start button state.
 */
function autoPilot(){
    
}

/**
 * open the popup window
 */
function openModal() {
  // open
  const modal = document.getElementById('addModal');
  modal.style.display = "block";
  console.log('open success');

  // close
  const closeBtn = document.getElementsByClassName('close')[0];
  closeBtn.addEventListener('click', () => {
    modal.style.display = "none";
    console.log('close success')
  })

  const openBtn = document.getElementById('addBtn');
  // close when click outside of the window
  window.onclick = (event) => {
    if (!modal.contains(event.target) && event.target != openBtn) {
      modal.style.display = "none";
    }
  }
}