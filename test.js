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
  // document.get
  setInterval(update, 1000);
};







// 
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
    if (Date.now() < endAt) {
      timerText.innerHTML = toHuman((endAt - Date.now()));//sets timer text on HTML page (not sure what this does)
    } else {
      if(sessionCount !=0){
        sessionCount--;
        input = 0.5;
      }
      else{
        countingDown = false;
        toggleUnloadPrompt();
        sound.play();
        timerText.innerHTML = 'Pomo Session';
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
  let min = Math.floor((ms / (1000 * 60)) % 60); //*1000 to convert into seconds, *60 to convert into minutes, find the remainder of minutes for formatting
  let sec = Math.floor((ms / 1000) % 60); //*1000 to convert into seconds, find the remainder of seconds for formatting

  if (min < 10){
    min = '0' + min;
  }
  if (sec < 10){
    sec = '0' + sec;
  }
  
  return min + ':' + sec;
}

// button click turns on timer/ restarts timer.
function startTimer() {
  input = 0.5;
  endAt = Date.now() + (60000 * Number(input));  // 60000 min to ms
  countingDown = true;
  sessionCount = 2;
  // update();
  toggleUnloadPrompt();
  document.getElementById('StartButton').innerText = 'Restart Timer';
}

// stops timer
function stopTimer() {
  sound.pause();
  countingDown = false;
  timerText.innerHTML = 'Stopped!';
  toggleUnloadPrompt();
  document.getElementById('StartButton').innerText = 'Start Timer';
}