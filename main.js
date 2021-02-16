let endAt = 0;
let countingDown = false;

/**Variable tracking the current state of the timer. Can be in stopped, work, shortbreak, or longbreak*/
let state = 'stopped';
let timerText;

/**Users input of how many short breaks before a long break */
let sessionsBeforeLongBreak = 4; // user seleciton

/**Number of sessions until long break */
let sessionCountDown = sessionsBeforeLongBreak;
let sound = new Audio('alarm1.flac');

/**Number of minutes to run the timer for */
let timerLength;

/** */
window.onload = () => {
  // window.addEventListener('beforeunload',unloadChecker);
  window.onbeforeunload = unloadChecker;
  timerText = document.getElementById('timer');
  document.getElementById("StartButton").addEventListener("click", startTimer);
  document.getElementById("StopButton").addEventListener("click", stopTimer);

  document.getElementById("workTime").addEventListener("click", setWorkTime);
  document.getElementById("longBreak").addEventListener("click", setLongTime);
  document.getElementById("shortBreak").addEventListener("click", setShortTime);
  // document.get
  setInterval(update, 1000);
};

/**This is called when the "Work Timer" button is pressed */
function setWorkTime() {
  timerLength = document.getElementById("workTimeInput").value;
  sessionCountDown = 0;
  officialStart();
}

/**This is called when the "Long Break" button is pressed */
function setLongTime() {
  timerLength = document.getElementById("longBreakTimeInput").value;
  sessionCountDown = 0;
  officialStart();
}

/**This is called when the "Short Break" button is pressed */
function setShortTime() {
  timerLength = document.getElementById("shortBreakTimeInput").value;
  sessionCountDown = 0;
  officialStart();
}

/**Run when the window is going to close. Gives a warning when the timer is running. */
function unloadChecker(e){
  let test = countingDown ? "Are you sure you want to leave?" : null; //Chrome will not show this.
  e.retunValue = test;
  return test;
}

/**Timer function that keeps track of time left until end - Under consturction*/
function updateTimerText(){
    timerText.textContent = toHuman((endAt - Date.now()));//sets timer text on HTML page 
}

/*
* update html text
* keep trac
* update session
*   - Worktime -> *break
*   - *break -> worktime
*   - stoped
*/

/**The update function is called once per second */
function update(){
  if (Date.now() < endAt + 1000) {
    updateTimerText();
  } else {
    updateSession();
  }

}

function updateSession() {
//during work, displays how many sessions left of work before longbreak
//during short break, displays "break!" or something similar
//during long break, displays "long break!" or break
// 4 short 3 short 2 short 1 long(0)  

}


// function update() {
//   if (countingDown) {
//     if (Date.now() < endAt + 1000) {
//       timerText.textContent = toHuman((endAt - Date.now()));//sets timer text on HTML page (not sure what this does)
//     } else {
//       if (sessionCountDown !== 0) {
//         sessionCountDown--;
//         timerLength = 1;
//         endAt = Date.now() + (60000 * Number(timerLength));       
//         update(); 
//       } else {
//         sessionCountDown = sessionsBeforeLongBreak; 
//         // countingDown = false;
//         // // toggleUnloadPrompt();
//         // sound.play();
//         // timerText.textContent = 'Pomo Session';
//         // setTimeout(() => {
//         //   alert('Your pomodoro session is done!');
//         //   //sound.pause();  // Stop sound after done
//         // }, 1);
        
//       }
//     }
//   }
// }

// Insperation from
// https://stackoverflow.com/questions/19700283/how-to-convert-time-milliseconds-to-hours-min-sec-format-in-javascript
/**Converts a time in ms to a human readable string
 * @param {number} ms - Time in ms to convert
 * @returns {string} Text of time remaining
*/
function toHuman(ms) {
  var currentTime = new Date(1000*Math.round(ms/1000)); // round to nearest second
  function pad(i) { return ('0'+i).slice(-2); }
  var str = pad(currentTime.getUTCMinutes()) + ':' + pad(currentTime.getUTCSeconds());

  return str;
}

// button click turns on timer/ restarts timer.
function startTimer() {
  officialStart();
}


function officialStart() {
  endAt = Date.now() + (60000 * Number(timerLength));  // 60000 min to ms
  countingDown = true;
  update();
  document.getElementById('StartButton').style.display = 'none';
}

// stops timer
function stopTimer() {
  sound.pause();
  countingDown = false;
  timerText.textContent = 'Stopped!';
  document.getElementById('StartButton').innerText = 'Start Timer';
  document.getElementById('StartButton').style.display = '';
  sessionCountDown = sessionsBeforeLongBreak;
}