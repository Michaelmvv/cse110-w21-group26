/* global getList, displayList, decrementTopTask, displayListDone, introJs, getCurrentTask, removeTask, addTaskTutorial */

let endAt = 0;
let countingDown = false;

let timerText;

let manualSwitch = document.getElementById("autoSwitch");

/* Keeps track of manual mode sessions */
let currentSession = "work"; //work, shortBreak, longBreak

/**
 * Users input of how many short breaks before a long break
 */
let sessionsBeforeLongBreak;

/**
 * Number of sessions until long break
 * Attributed to bone666138 on freesound.com, audio file Analog Alarm Clock
 * https://freesound.org/people/bone666138/sounds/198841/
 */
let sessionCountDown;
//let sound = document.getElementById("soundTag");
let sound = new Audio("End Work Alarm.mp3");

/**
 * keeps track if timer is a work or a break timer.
 *  breakState will be set to true when a break begins
 */
let breakState = false;

/**Number of minutes to run the timer for */
let timerLength = [];

/**
 * Onload function. Adds eventListeners to buttons, sets update function to run
o * every 1000 ms loads taskList contents from local storage, and displays
 * taskList contents
 */
window.onload = () => {
  // window.addEventListener('beforeunload',unloadChecker);
  window.onbeforeunload = unloadChecker;
  timerText = document.getElementById("timer");
  document.getElementById("StartButton").addEventListener("click", startTimer);
  document.getElementById("StopButton").addEventListener("click", stopTimer);

  document.getElementById("workTime").addEventListener("click", setWorkTime);
  document.getElementById("longBreak").addEventListener("click", setLongTime);
  document.getElementById("shortBreak").addEventListener("click", setShortTime);

  document
    .getElementById("tutorialBtn")
    .addEventListener("click", startTutorial);

  if (window.localStorage.getItem("darkModeOn") !== null) {
    document.getElementById("darkMode").checked =
      window.localStorage.getItem("darkModeOn").charAt(0) == "t";
    darkMode();
  }
  darkMode();
  if (window.localStorage.getItem("longInterval") !== null) {
    document.getElementById(
      "longBreakTimeInput"
    ).value = window.localStorage.getItem("longInterval");
  } else {
    window.localStorage.setItem("longInterval", 15);
  }
  if (window.localStorage.getItem("shortInterval") !== null) {
    document.getElementById(
      "shortBreakTimeInput"
    ).value = window.localStorage.getItem("shortInterval");
  } else {
    window.localStorage.setItem("shortInterval", 5);
  }
  if (window.localStorage.getItem("workInterval") !== null) {
    document.getElementById(
      "workTimeInput"
    ).value = window.localStorage.getItem("workInterval");
    document.getElementById("timer").textContent = toHuman(
      parseInt(window.localStorage.getItem("workInterval")) * 60 * 1000
    );
  } else {
    window.localStorage.setItem("workInterval", 25);
  }
  if (window.localStorage.getItem("numWorkInput") !== null) {
    document.getElementById("numWork").value = window.localStorage.getItem(
      "numWorkInput"
    );
    sessionsBeforeLongBreak = window.localStorage.getItem("numWorkInput");
  } else {
    window.localStorage.setItem("numWorkInput", 4);
  }
  if (window.localStorage.getItem("savedVolume") !== null) {
    document.getElementById("volume").value = window.localStorage.getItem(
      "savedVolume"
    );
    sound.volume = parseInt(window.localStorage.getItem("savedVolume")) / 100; // converts 0-100 range to 0-1 range
  }

  if (window.localStorage.getItem("autoOn") !== null) {
    document.getElementById("autoSwitch").checked =
      window.localStorage.getItem("autoOn").charAt(0) == "t";
  }

  if (window.localStorage.getItem("numWorkInput") === null) {
    sessionsBeforeLongBreak = 4;
  } else {
    sessionsBeforeLongBreak = window.localStorage.getItem("numWorkInput");
  }

  sessionCountDown = sessionsBeforeLongBreak;

  document
    .getElementById("longBreakTimeInput")
    .addEventListener("change", function (e) {
      countingDown = false;
      if (e.target.value <= 0) {
        if (window.localStorage.getItem("longInterval") === null) {
          e.target.value = 15;
        } else {
          e.target.value = window.localStorage.getItem("longInterval");
        }
      } else if (e.target.value > 60) {
        e.target.value = 60;
      }
      e.target.value = Math.floor(e.target.value);
      window.localStorage.setItem("longInterval", e.target.value);
      if (currentSession === "longBreak") {
        changeTimerTextString(e.target.value.toString());
      }
    });
  document
    .getElementById("shortBreakTimeInput")
    .addEventListener("change", function (e) {
      countingDown = false;
      if (e.target.value <= 0) {
        if (window.localStorage.getItem("shortInterval") === null) {
          e.target.value = 5;
        } else {
          e.target.value = window.localStorage.getItem("shortInterval");
        }
      } else if (e.target.value > 60) {
        e.target.value = 60;
      }
      e.target.value = Math.floor(e.target.value);
      window.localStorage.setItem("shortInterval", e.target.value);
      if (currentSession === "shortBreak") {
        changeTimerTextString(e.target.value.toString());
      }
    });
  document
    .getElementById("workTimeInput")
    .addEventListener("change", function (e) {
      countingDown = false;
      if (e.target.value <= 0) {
        if (window.localStorage.getItem("workInterval") === null) {
          e.target.value = 25;
        } else {
          e.target.value = window.localStorage.getItem("workInterval");
        }
      } else if (e.target.value > 60) {
        e.target.value = 60;
      }
      e.target.value = Math.floor(e.target.value);
      window.localStorage.setItem("workInterval", e.target.value);
      if (currentSession === "work") {
        changeTimerTextString(e.target.value.toString());
      }
    });

  document.getElementById("numWork").addEventListener("change", function (e) {
    if (e.target.value <= 0) {
      if (window.localStorage.getItem("numWorkInput") === null) {
        e.target.value = 4;
      } else {
        e.target.value = window.localStorage.getItem("numWorkInput");
      }
    } else if (e.target.value > 60) {
      e.target.value = 60;
    }
    //e.target.value = Math.floor(e.target.value);
    window.localStorage.setItem("numWorkInput", e.target.value);
    sessionsBeforeLongBreak = window.localStorage.getItem("numWorkInput");
  });

  document.getElementById("volume").addEventListener("change", function () {
    window.localStorage.setItem(
      "savedVolume",
      document.getElementById("volume").value
    );
    sound.volume = parseInt(document.getElementById("volume").value) / 100; // converts 0-100 range to 0-1 range
  });

  document.getElementById("darkMode").addEventListener("click", function () {
    window.localStorage.setItem(
      "darkModeOn",
      document.getElementById("darkMode").checked
    );
  });

  document.getElementById("autoSwitch").addEventListener("click", function () {
    window.localStorage.setItem(
      "autoOn",
      document.getElementById("autoSwitch").checked
    );
  });

  timerLength = document.getElementById("workTimeInput").value;
  setInterval(update, 1000);

  autoSwitch();
  getList();
  displayList();
  getCurrentTask();
};

/**
 * This is called when the "Work Timer" button is pressed
 */
function setWorkTime() {
  timerLength = document.getElementById("workTimeInput").value;
  //sessionCountDown = 0;
  officialStart();
}

/**
 * This is called when the "Long Break" button is pressed
 */
function setLongTime() {
  timerLength = document.getElementById("longBreakTimeInput").value;
  //sessionCountDown = 0;
  officialStart();
  // Change color scheme
}

/**
 * This is called when the "Short Break" button is pressed
 */
function setShortTime() {
  timerLength = document.getElementById("shortBreakTimeInput").value;
  //sessionCountDown = 0;
  officialStart();

  // Change color scheme
}

/**
 * Run when the window is going to close. Gives a warning when the timer is
 * running.
 */
function unloadChecker(e) {
  let test = countingDown ? "Are you sure you want to leave?" : null; // Chrome will not show this.
  e.retunValue = test;
  return test;
}
/**
 * Start the JS Intro
 */

function startTutorial() {
  let dropMenu = document.getElementsByClassName("dropdown-content")[0];
  let taskListTutorial = document.getElementById("tasks");
  introJs()
    .onchange(function (targetElement) {
      dropMenu.style.display = "";
      switch (this._currentStep - 1) {
        case 0:
          dropMenu.style.display = "block";
          break;
        case 1:
          addTaskTutorial();
          getCurrentTask();
          dropMenu.style.display = "block";
          break;
        case 2:
          dropMenu.style.display = "block";
          break;
        case 3:
          dropMenu.style.display = "";
          break;
        case 4:
          break;
        case 5:
          break;
        case 6:
          break;
        case 7:
          break;
        case 8:
          displayList();
          break;
        case 9:
          displayListDone();
          break;
        case 10:
          displayList();
          break;
      }
      console.log("IntroJS Step: " + this._currentStep);
    })
    .onexit(function () {
      dropMenu.style.display = "";
      removeTask("Task Name");
      displayList();
    })
    .start();
}

/**
 * Timer function that keeps track of time left until end - Under consturction
 */
function updateTimerText() {
  // timerText = document.getElementById('timer'); /** Need a local variable for
  // testing */
  let autoText = document.getElementById("autoText");
  timerText.textContent = toHuman(endAt - Date.now()); // sets timer text on HTML page
  document.title = autoText.innerText + " " + toHuman(endAt - Date.now());
  getCurrentTask();
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
 * It determines if the timer has finished counting down the current timer
 * period
 */
function update() {
  if (countingDown) {
    if (Date.now() < endAt) {
      updateTimerText();
    } else {
      updateSession();
    }
  } else {
    return;
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
  manualSwitch = document.getElementById("autoSwitch");
  if (breakState == true) {
    console.log("pomo session starting");
    timerLength = document.getElementById("workTimeInput").value;
    endAt = Date.now() + 60000 * Number(timerLength);
    breakState = false;

    sound.src = "End Break Alarm.mp3";
    sound.load();
    sound.play();

    // add this for changing color scheme
    if (!manualSwitch.checked) {
      // console.log('i really hope this could fix the manual thing');
      seshClicked("workTime");
    } else {
      stopTimer();
      // console.log('how dare u decrement');
      //decrementTopTask();
    }

    update();
    return;
  }

  if (sessionCountDown > 1) {
    console.log("short break starting");
    timerLength = document.getElementById("shortBreakTimeInput").value;
    endAt = Date.now() + 60000 * Number(timerLength);
    breakState = true;

    sound.src = "End Work Alarm.mp3";
    sound.load();
    sound.play();

    // add this for changing color scheme
    if (!manualSwitch.checked) {
      // console.log('you only click if it is auto bluh');
      seshClicked("shortBreak");
      decrementTopTask();
    } else {
      stopTimer();
    }
  }

  // long break
  else if (sessionCountDown == 1) {
    console.log("Long Break starting, hopefully.");
    timerLength = document.getElementById("longBreakTimeInput").value;
    endAt = Date.now() + 60000 * Number(timerLength);
    breakState = true;

    sound.src = "End Work Alarm.mp3";
    sound.load();
    sound.play();

    // add this for changing color scheme
    if (!manualSwitch.checked) {
      // console.log('long break lalalala');
      seshClicked("longBreak");
      decrementTopTask();
    } else {
      stopTimer();
    }
  }

  // can just be an else statement
  else {
    if (manualSwitch.checked) {
      console.log("DONEEEEE reset plz");
      stopTimer();
    } else {
      // console.log("WHATTTTT HELPPP");
      sessionCountDown = sessionsBeforeLongBreak;
    }
  }

  sessionCountDown--;
  console.log("SESH COUNTDOWN: " + sessionCountDown);
  // console.log('or is it ya');
  update();
}
// Insperation from
// https://stackoverflow.com/questions/19700283/how-to-convert-time-milliseconds-to-hours-min-sec-format-in-javascript
/**Converts a time in ms to a human readable string
 * @param {number} ms - Time in ms to convert
 * @returns {string} Text of time remaining
 */
function toHuman(ms) {
  var currentTime = new Date(1000 * Math.round(ms / 1000)); // round to nearest second
  function pad(i) {
    return ("0" + i).slice(-2);
  }
  var str =
    pad(currentTime.getUTCMinutes()) + ":" + pad(currentTime.getUTCSeconds());
  return str;
}

function startTimer() {
  let autoText = document.getElementById("autoText");
  autoText.innerText = "Work Time";
  timerLength = document.getElementById("workTimeInput").value;
  officialStart();
}

/**
 * Sets timer to beginning of work timer length. Depending on context, this may
 * be used to start a new session or reset one
 */
function officialStart() {
  endAt = Date.now() + 60000 * Number(timerLength); // 60000 min to ms
  countingDown = true;
  updateCircle(timerLength, timerLength);
  update();
  document.getElementById("StartButton").style.display = "none";
  document.getElementById("StopButton").style.display = "initial";
}

/**
 * Stops timer and resets button text to starting contents
 */
function stopTimer() {
  sound.pause();
  countingDown = false;
  manualSwitch = document.getElementById("autoSwitch");
  timerText.textContent = "Stopped!";

  if (manualSwitch.checked) {
    // document.getElementById("StartButton").style.display = "";
  } else {
    document.getElementById("StartButton").innerText = "Start Timer";
    document.getElementById("StartButton").style.display = "";
  }

  document.getElementById("StopButton").style.display = "none";

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
  /* Changing color scheme of buttons depending on which button is clicked*/
  let session = document.getElementById(seshID);
  let logo = document.getElementById("logoSVG");
  session.className = "active";
  let autoText = document.getElementById("autoText");
  // hover effect need to address
  if (seshID == "shortBreak") {
    document.body.classList.add("shortBreak");
    document.body.classList.remove("longBreak", "workTime");
    logo.src = "images/logoShort.svg";
    autoText.innerText = "Short Break";
    currentSession = "shortBreak";
  } else if (seshID == "longBreak") {
    document.body.classList.add("longBreak");
    document.body.classList.remove("shortBreak", "workTime");
    logo.src = "images/logoLong.svg";
    autoText.innerText = "Long Break";
    currentSession = "longBreak";
  } else {
    document.body.classList.add("workTime");
    document.body.classList.remove("shortBreak", "longBreak");
    logo.src = "images/logo.svg";
    autoText.innerText = "Work Time";
    currentSession = "work";
  }
}

// For circle rotation
let progress = document.getElementById("circleProgress");
let pointer = document.getElementById("pointerDot");
let move = Math.PI * 2 * 100;
progress.style.strokeDasharray = move;
progress.style.strokeDashoffset = move * 2;

/**
 * update the circular timer display
 * @param {number} val
 * @param {number} time
 */
function updateCircle(val, time) {
  let offset = move + (move * val) / time;
  progress.style.strokeDashoffset = offset;
  let rotation = 360 - (360 * val) / time;
  pointer.style.transform = `rotate(${rotation}deg)`;
}
/**
 * change the dark mode according to toggle button
 */
function darkMode() {
  let dark = document.getElementById("darkMode");
  let settingsLogo = document.getElementById("settingsLogo");
  let helperBtn = document.getElementById("helperBtn");
  if (dark.checked) {
    document.body.classList.add("dark-mode");
    settingsLogo.setAttribute("fill", "#c3c3c3");
    helperBtn.setAttribute("fill", "#c3c3c3");
  } else {
    document.body.classList.remove("dark-mode");
    settingsLogo.setAttribute("fill", "#444444");
    helperBtn.setAttribute("fill", "#444");
  }
}

/**
 * the automatic function from the settings
 * it controls the visibility of sessions button
 * and the start button state.
 */
function autoSwitch() {
  console.log("switch on");
  manualSwitch = document.getElementById("autoSwitch");
  let workTimerButton = document.getElementById("workTime");
  let shortBreakButton = document.getElementById("longBreak");
  let longBreakButton = document.getElementById("shortBreak");
  let startButton = document.getElementById("StartButton");
  let autoText = document.getElementById("currentSessionAuto");
  let stopButton = document.getElementById("StopButton");
  if (manualSwitch.checked) {
    //Manual mode is enabled
    //hide start button
    if (countingDown) {
      console.log("Timer running");
      stopButton.style.display = "block";
    } else {
      console.log("Timer not running");
    }
    startButton.style.display = "none";
    autoText.style.display = "none";

    workTimerButton.style.display = "block";
    shortBreakButton.style.display = "block";
    longBreakButton.style.display = "block";
  } else {
    //hide top buttons
    workTimerButton.style.display = "none";
    shortBreakButton.style.display = "none";
    longBreakButton.style.display = "none";

    if (countingDown) {
      stopButton.style.display = "block";
    } else {
      startButton.style.display = "block";
      stopButton.style.display = "none";
    }

    // startButton.style.display = "block";
    autoText.style.display = "block";
  }
}

/**
 * open the popup window
 */
function openModal() {
  // open
  const modal = document.getElementById("addModal");
  modal.style.display = "block";
  console.log("open success");

  // close
  const closeBtn = document.getElementsByClassName("close")[0];
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    console.log("close success");
  });

  const openBtn = document.getElementById("addBtn");
  // close when click outside of the window
  window.onclick = (event) => {
    if (!modal.contains(event.target) && event.target != openBtn) {
      modal.style.display = "none";
    }
  };
}

/**
 * Easily change the timer text by hardcoding the string (for changing initial display)
 */
function changeTimerTextString(num) {
  if (num.length == 1) {
    timerText.textContent = "0" + num + ":00";
  } else if (num.length == 2) {
    timerText.textContent = num + ":00";
  }
}
