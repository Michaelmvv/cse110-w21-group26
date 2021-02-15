let endAt = 0;
let countingDown = false;
let timerText;
let sessionCount = 0;
let sessionsBeforeLongBreak = 4;
let sound = new Audio('alarm1.flac');
let input;

// Startup stuffs, Wait for load before starting
window.onload = () => {
  timerText = document.getElementById('timer');
  document.getElementById("StartButton").addEventListener("click", startTimer)
  document.getElementById("StopButton").addEventListener("click", stopTimer)
  // document.get
  setInterval(update, 1000);
};



// Exit Prompt... Only works if you have interacted with site...
// https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload
/**
 * @description Exit Prompt... Only works if you have interacted with site...
 * @param  {} {window.onbeforeunload=running?(
 * @param  {null;}} =>{returntrue;}
 * @returns null
 */
function toggleUnloadPrompt() {
  window.onbeforeunload = countingDown ? () => {
    return true;
  } : null;
}

// This is run every second, and updates the screen and state.
function update() {
  if (countingDown) {
    if (Date.now() < endAt + 1000) {
      timerText.textContent = toHuman((((endAt/10000)*10000) - Date.now()));//sets timer text on HTML page (not sure what this does)
    } else {
      if (sessionCount !== 0) {
        sessionCount--;
        input = 1;
        endAt = Date.now() + (60000 * Number(input));       
        update();
      } else {
        countingDown = false;
        toggleUnloadPrompt();
        sound.play();
        timerText.textContent = 'Pomo Session';
        setTimeout(() => {
          alert('Your pomodoro session is done!');
          sound.pause();  // Stop sound after done
        }, 1);
      }
    }
  }
}

// Insperation from
// https://stackoverflow.com/questions/19700283/how-to-convert-time-milliseconds-to-hours-min-sec-format-in-javascript
function toHuman(ms) {
  var currentTime = new Date(1000*Math.round(ms/1000)); // round to nearest second
  function pad(i) { return ('0'+i).slice(-2); }
  var str = pad(currentTime.getUTCMinutes()) + ':' + pad(currentTime.getUTCSeconds());

  
  return str;
}

// button click turns on timer/ restarts timer.
function startTimer() {
  input = .5;
  endAt = Date.now() + (60000 * Number(input));  // 60000 min to ms
  countingDown = true;
  sessionCount = 2;
  update();
  toggleUnloadPrompt();
  document.getElementById('StartButton').innerText = 'Restart Timer';
}

// stops timer
function stopTimer() {
  sound.pause();
  countingDown = false;
  timerText.textContent = 'Stopped!';
  toggleUnloadPrompt();
  document.getElementById('StartButton').innerText = 'Start Timer';
}