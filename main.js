let endAt = 0;
let running = false;
let timerText;
let sound = new Audio('alarm1.flac');

// Startup stuffs, Wait for load before starting
window.onload = () => {
  timerText = document.getElementById('timer');
  // document.get
  setInterval(update, 1000);
};



// Exit Prompt... Only works if you have interacted with site...
// https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload
function toggleUnloadPrompt() {
  window.onbeforeunload = running ? () => {
    return true;
  } : null;
}

// This is run every second, and updates the screen and state.
function update() {
  if (running) {
    if (Date.now() < endAt) {
      timerText.innerHTML = toHuman((endAt - Date.now()));
    } else {
      running = false;
      toggleUnloadPrompt();
      sound.play();
      timerText.innerHTML = 'Done';
      setTimeout(() => {
        alert('done');
        sound.pause();  // Stop sound after done
      }, 1);
    }
  }
}

// Insperation from
// https://stackoverflow.com/questions/19700283/how-to-convert-time-milliseconds-to-hours-min-sec-format-in-javascript
function toHuman(ms) {
  let hr = Math.floor(ms / (1000 * 60 * 60));
  let min = Math.floor((ms / (1000 * 60)) % 60);
  let sec = Math.floor((ms / 1000) % 60);

  hr = (hr < 10) ? '0' + hr : hr;
  min = (min < 10) ? '0' + min : min;
  sec = (sec < 10) ? '0' + sec : sec;

  return hr + ':' + min + ':' + sec;
}

// button click turns on timer/ restarts timer.
function startTimer() {
  let input = document.getElementById('timeToRun').value;
  endAt = Date.now() + (60000 * Number(input));  // 60000 min to ms
  running = true;
  // update();
  toggleUnloadPrompt();
  document.getElementById('StartButton').innerText = 'Restart Timer';
}

// stops timer
function stopTimer() {
  sound.pause();
  running = false;
  timerText.innerHTML = 'Stopped!';
  toggleUnloadPrompt();
  document.getElementById('StartButton').innerText = 'Start Timer';
}