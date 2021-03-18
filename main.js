/* global getList, displayList, decrementTopTask, displayListDone, introJs, getCurrentTask, removeTask, addTaskTutorial */

/* Stores the Unix time that the timer currently running will end at */
let endAt = 0;

/* If a timer is currently counting down, this is set to true. Otherwise, this is set to false*/
let countingDown = false;

/* Stores the number of minutes and seconds currently left on the timer as a string. Will be set to "Stopped" after pressing the stop button*/
let timerText;

/* Keeps track of if the manual switch in the settings is on or off */
let manualSwitch = document.getElementById("autoSwitch");

/* This is keeps track of the type of timer being run: work, shortBreak, or longBreak */
let currentSession = "work";

/* User's input of how many work sessions you must complete before a long break */
let sessionsBeforeLongBreak;

/* Keeps track of the number of work sessions until long break */
let sessionCountDown;

/* Keeps track of the current sound source */
let sound = new Audio("sound/End Work Alarm.mp3");

/**
 * Keeps track of if the timer is in a work or break session.
 *  breakState will be set to true when a break begins, otherwise false.
 */
let breakState = false;

/* Number of minutes to run the timer for */
let timerLength;

/**
 * Onload function. Adds eventListeners to buttons, sets update function to run
 *  every 1000 ms loads taskList contents from local storage, and displays
 *  taskList contents
 */
window.onload = () => {
  window.onbeforeunload = unloadChecker;

  // Gets a reference to the timer object in the circle
  timerText = document.getElementById("timer");

  // Gets a reference to the all the timer buttons
  document.getElementById("StartButton").addEventListener("click", startTimer);
  document.getElementById("StopButton").addEventListener("click", stopTimer);
  document.getElementById("workTime").addEventListener("click", setWorkTime);
  document.getElementById("longBreak").addEventListener("click", setLongTime);
  document.getElementById("shortBreak").addEventListener("click", setShortTime);

  // Gets a reference to the help/tutorial button
  document
    .getElementById("tutorialBtn")
    .addEventListener("click", startTutorial);

  // Gets saved value of Dark Mode setting from local storage
  if (window.localStorage.getItem("darkModeOn") !== null) {
    document.getElementById("darkMode").checked =
      window.localStorage.getItem("darkModeOn").charAt(0) == "t";
    darkMode();
  }
  darkMode();

  // Gets saved value for long break lengths from local storage
  if (window.localStorage.getItem("longInterval") !== null) {
    document.getElementById(
      "longBreakTimeInput"
    ).value = window.localStorage.getItem("longInterval");
  } else {
    window.localStorage.setItem("longInterval", 15);
  }

  // Gets saved value for short break lengths from local storage
  if (window.localStorage.getItem("shortInterval") !== null) {
    document.getElementById(
      "shortBreakTimeInput"
    ).value = window.localStorage.getItem("shortInterval");
  } else {
    window.localStorage.setItem("shortInterval", 5);
  }

  // Gets saved value for work period lengths from local storage
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

  // Gets saved value for number of work periods that must be completed for receiving a long break from local storage
  if (window.localStorage.getItem("numWorkInput") !== null) {
    document.getElementById("numWork").value = window.localStorage.getItem(
      "numWorkInput"
    );
    sessionsBeforeLongBreak = window.localStorage.getItem("numWorkInput");
  } else {
    window.localStorage.setItem("numWorkInput", 4);
  }

  // Gets saved value of alarm volume from local storage
  if (window.localStorage.getItem("savedVolume") !== null) {
    document.getElementById("volume").value = window.localStorage.getItem(
      "savedVolume"
    );
    sound.volume = parseInt(window.localStorage.getItem("savedVolume")) / 100; // converts 0-100 range to 0-1 range
  }

  // Gets saved value of Manual Mode setting from local storage
  if (window.localStorage.getItem("autoOn") !== null) {
    document.getElementById("autoSwitch").checked =
      window.localStorage.getItem("autoOn").charAt(0) == "t";
  }

  // Saves the number of pomodoros in a cycle from the settings to local storage
  if (window.localStorage.getItem("numWorkInput") === null) {
    sessionsBeforeLongBreak = 4;
  } else {
    sessionsBeforeLongBreak = window.localStorage.getItem("numWorkInput");
  }

  // Updates the display of the number of pomodoro cycles before a long break
  sessionCountDown = sessionsBeforeLongBreak;
  let seshLeft = document.getElementById("seshLeft");
  seshLeft.textContent =
    sessionCountDown + "/" + localStorage.getItem("numWorkInput");

  // Saves the long break input from settings to local storage
  document
    .getElementById("longBreakTimeInput")
    .addEventListener("change", function (e) {
      // stops the timer from running while the input is changing
      countingDown = false;

      // Negative values change to previous valid input. Over max value caps at max value.
      if (e.target.value <= 0) {
        if (window.localStorage.getItem("longInterval") === null) {
          e.target.value = 15;
        } else {
          e.target.value = window.localStorage.getItem("longInterval");
        }
      } else if (e.target.value > 60) {
        e.target.value = 60;
      }

      // Rounds (down) decimal inputs to nearest whole number
      e.target.value = Math.floor(e.target.value);

      // Saves changed input into local storage
      window.localStorage.setItem("longInterval", e.target.value);

      // Only updates timer text for long break if current session is long break
      if (currentSession === "longBreak") {
        changeTimerTextString(e.target.value.toString());
      }
      document.getElementById("StopButton").style.display = "none";

      // Handles start button display if manual mode is off
      if (!manualSwitch.checked) {
        document.getElementById("StartButton").style.display = "block";
      }
    });

  // Saves the short break input from settings to local storage
  document
    .getElementById("shortBreakTimeInput")
    .addEventListener("change", function (e) {
      // Stops the timer from running while the input is changing
      countingDown = false;

      // Negative values change to previous valid input. Over max value caps at max value.
      if (e.target.value <= 0) {
        if (window.localStorage.getItem("shortInterval") === null) {
          e.target.value = 5;
        } else {
          e.target.value = window.localStorage.getItem("shortInterval");
        }
      } else if (e.target.value > 60) {
        e.target.value = 60;
      }

      // Rounds (down) decimal inputs to nearest whole number
      e.target.value = Math.floor(e.target.value);

      // Saves changed input into local storage
      window.localStorage.setItem("shortInterval", e.target.value);

      // Only updates timer text for short break if current session is short break
      if (currentSession === "shortBreak") {
        changeTimerTextString(e.target.value.toString());
      }
      document.getElementById("StopButton").style.display = "none";

      // Handles start button display if manual mode is off
      if (!manualSwitch.checked) {
        document.getElementById("StartButton").style.display = "block";
      }
    });

  // Saves the work session input from settings to local storage
  document
    .getElementById("workTimeInput")
    .addEventListener("change", function (e) {
      // Stops the timer from running while the input is changing
      countingDown = false;

      // Negative values change to previous valid input. Over max value caps at max value.
      if (e.target.value <= 0) {
        if (window.localStorage.getItem("workInterval") === null) {
          e.target.value = 25;
        } else {
          e.target.value = window.localStorage.getItem("workInterval");
        }
      } else if (e.target.value > 60) {
        e.target.value = 60;
      }

      // Rounds (down) decimal inputs to nearest whole number
      e.target.value = Math.floor(e.target.value);

      // Saves changed input into local storage
      window.localStorage.setItem("workInterval", e.target.value);

      // Only updates timer text for work timer if current session is a work session
      if (currentSession === "work") {
        changeTimerTextString(e.target.value.toString());
      }
      document.getElementById("StopButton").style.display = "none";
      // Handles start button display if manual mode is off
      if (!manualSwitch.checked) {
        document.getElementById("StartButton").style.display = "block";
      }
    });

  // Saves the number of pomo sessions in a cycle input from settings to local storage
  document.getElementById("numWork").addEventListener("change", function (e) {
    // Any number less than the minimum value reverts to the previous valid input.
    // Max value gets capped
    if (e.target.value < 4) {
      if (window.localStorage.getItem("numWorkInput") === null) {
        e.target.value = 4;
      } else {
        e.target.value = window.localStorage.getItem("numWorkInput");
      }
    } else if (e.target.value > 10) {
      e.target.value = 10;
    }
    // Rounds (down) decimals to the nearest whole number
    e.target.value = Math.floor(e.target.value);

    // Sets the updated input value in local storage
    window.localStorage.setItem("numWorkInput", e.target.value);

    // Updates the display of the number of pomodoro sessions before a long break
    sessionsBeforeLongBreak = window.localStorage.getItem("numWorkInput");
    sessionCountDown = sessionsBeforeLongBreak;
    let seshLeft = document.getElementById("seshLeft");
    seshLeft.textContent =
      sessionCountDown + "/" + localStorage.getItem("numWorkInput");
  });

  // Handles the volume changing sound
  document.getElementById("volume").addEventListener("change", function () {
    window.localStorage.setItem(
      "savedVolume",
      document.getElementById("volume").value
    );
    // converts 0-100 range to 0-1 range
    sound.volume = parseInt(document.getElementById("volume").value) / 100;
  });

  // Checks if the dark mode switch gets activated
  document.getElementById("darkMode").addEventListener("click", function () {
    window.localStorage.setItem(
      "darkModeOn",
      document.getElementById("darkMode").checked
    );
  });

  // Checks if the manual switch gets activated
  document.getElementById("autoSwitch").addEventListener("click", function () {
    window.localStorage.setItem(
      "autoOn",
      document.getElementById("autoSwitch").checked
    );
  });

  // Updates the timer length to be the value of a work session
  timerLength = document.getElementById("workTimeInput").value;
  setInterval(update, 1000);

  autoSwitch();
  getList();
  displayList();
  getCurrentTask();
};

/* Keeps track of if the timer is in a work session in manual mode */
let workTimeManual = false;

/**
 * This is called when the manual "Work Timer" button is pressed. It starts a new work period and updates appropriate session variables
 */
function setWorkTime() {
  timerLength = document.getElementById("workTimeInput").value;
  let seshLeft = document.getElementById("seshLeft");

  // Start a long break when the number of pomodoro sessions becomes 0.
  if (sessionCountDown === 0) {
    sessionCountDown = sessionsBeforeLongBreak;
  }

  // Updates the display of number of pomodoro sessions
  seshLeft.textContent =
    sessionCountDown + "/" + localStorage.getItem("numWorkInput");
  workTimeManual = true;
  officialStart();
}

/**
 * This is called when the manual "Long Break" button is pressed. It starts a long break.
 */
function setLongTime() {
  timerLength = document.getElementById("longBreakTimeInput").value;
  workTimeManual = false;
  officialStart();
}

/**
 * This is called when the manual "Short Break" button is pressed. It starts a short break.
 */
function setShortTime() {
  timerLength = document.getElementById("shortBreakTimeInput").value;
  workTimeManual = false;
  officialStart();
}

/**
 * Run when the window is going to close. Gives a warning when the timer is
 *  running.
 */
function unloadChecker(e) {
  let test = countingDown ? "Are you sure you want to leave?" : null; // Chrome will not show this.
  e.retunValue = test;
  return test;
}

/**
 * Starts the onscreen tutorial for how to use the timer. Called when the Question Mark button is clicked
 */
function startTutorial() {
  let dropMenu = document.getElementsByClassName("dropdown-content")[0];
  let taskListTutorial = document.getElementById("tasks");

  // Walks through each help entry
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
    })
    .onexit(function () {
      dropMenu.style.display = "";
      removeTask("Task Name");
      displayList();
    })
    .start();
}

/**
 * Updates the text on the timer every time it is called
 * Only used by the update function.
 */
function updateTimerText() {
  let autoText = document.getElementById("autoText");

  // sets timer text on HTML page
  timerText.textContent = toHuman(endAt - Date.now());
  document.title = toHuman(endAt - Date.now()) + " " + autoText.innerText;
  getCurrentTask();

  // Updating circle timer
  let ms = (endAt - Date.now()) / 60000;
  updateCircle(ms, timerLength);
}

/**
 * The update function is called once per second.
 *  It determines if the timer has finished counting down the current timer
 *  period. If it hasn't finished counting, the timer's text is updated.
 *  If it has finished counting, the number of pomodoro sessions left is updated
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
 * during work, displays how many sessions left of work before longbreak
 * during short break, displays "break!" or something similar
 * during long break, displays "long break!" or break
 * 4 short 3 short 2 short 1 long(0) reset to 4
 * short break
 *  0        1     0       1      0      1       0      1
 * 25 min, short, 25 min, short, 25 min, short, 25 min, long
 */
function updateSession() {
  let seshLeft = document.getElementById("seshLeft");

  // If number of pomodoro cycles before long break is 0, reset display
  if (
    sessionCountDown === 0 &&
    (!manualSwitch.checked || workTimeManual == true)
  ) {
    sessionCountDown = sessionsBeforeLongBreak;
    seshLeft.textContent =
      sessionCountDown + "/" + localStorage.getItem("numWorkInput");
  }

  manualSwitch = document.getElementById("autoSwitch");

  // breakState is true if the timer is finishing a break
  if (breakState == true) {
    timerLength = document.getElementById("workTimeInput").value;
    endAt = Date.now() + 60000 * Number(timerLength);
    breakState = false;

    // Play the sound for a work session
    sound.src = "sound/End Break Alarm.mp3";
    sound.load();
    sound.play();

    // Changes color scheme depending on the session
    if (!manualSwitch.checked) {
      seshClicked("workTime");
    } else {
      stopTimer();
      if (workTimeManual == true) {
        sessionCountDown--;
      }
      seshLeft.textContent =
        sessionCountDown + "/" + localStorage.getItem("numWorkInput");
    }
    update();
    return;
  }

  // if breakState is not true, the timer is currently finishing a work session and goes to this portion of the code
  // sessionCountDown is greater than 1 if we have completed fewer work sessions than needed to receive a long break
  if (sessionCountDown > 1) {
    timerLength = document.getElementById("shortBreakTimeInput").value;
    endAt = Date.now() + 60000 * Number(timerLength);
    breakState = true;

    // Plays the sound for a break session
    sound.src = "sound/End Work Alarm.mp3";
    sound.load();
    sound.play();

    // Changes color scheme depending on the session
    if (!manualSwitch.checked) {
      seshClicked("shortBreak");
      decrementTopTask();
    } else {
      stopTimer();
    }
  }

  //sessionCountDown is equal to 1 if we have completed enough work sessions to receive a long break
  else if (sessionCountDown == 1) {
    timerLength = document.getElementById("longBreakTimeInput").value;
    endAt = Date.now() + 60000 * Number(timerLength);
    breakState = true;

    // Plays the sound for a break session
    sound.src = "sound/End Work Alarm.mp3";
    sound.load();
    sound.play();

    // Changes color depending on the current session
    if (!manualSwitch.checked) {
      seshClicked("longBreak");
      decrementTopTask();
    } else {
      stopTimer();
    }
  }

  // Updates the session in manual mode
  else {
    if (manualSwitch.checked) {
      stopTimer();
    } else {
      sessionCountDown = sessionsBeforeLongBreak;
    }
  }

  // Updates text above timer related to work sessions
  if (!manualSwitch.checked || workTimeManual == true) {
    sessionCountDown--;
  }
  seshLeft.textContent =
    sessionCountDown + "/" + localStorage.getItem("numWorkInput");
  update();
}

/**
 * Converts a time in ms to a human readable string
 * @param {number} ms -Time in ms to convert
 * @returns {string} Text of time remaining
 */
function toHuman(ms) {
  // rounds to the nearest second
  var currentTime = new Date(1000 * Math.round(ms / 1000));

  // Gets the minutes for the timer
  function pad(i) {
    return ("0" + i).slice(-2);
  }

  // Converts to human-readable clock time
  var str =
    pad(currentTime.getUTCMinutes()) + ":" + pad(currentTime.getUTCSeconds());
  return str;
}

/**
 * Starts a timer work session
 *  The Start Button is only displayed while the app is not in Manual mode
 *  Called upon clicking the Start Button
 */
function startTimer() {
  // Updates the display of current session to work time
  let autoText = document.getElementById("autoText");
  autoText.innerText = "Work Time";
  timerLength = document.getElementById("workTimeInput").value;

  // Changes the color to work time theme
  seshClicked("workTime");

  breakState = false;
  officialStart();
}

/**
 * Sets timer to beginning of work timer length. Depending on context, this may
 *  be used to start a new session or reset one
 */
function officialStart() {
  // 60000 min to ms
  endAt = Date.now() + 60000 * Number(timerLength);

  // Keeps track of if the timer is running
  countingDown = true;
  updateCircle(timerLength, timerLength);
  update();
  document.getElementById("StartButton").style.display = "none";
  document.getElementById("StopButton").style.display = "initial";
}

/**
 * Stops a timer session
 *  Called upon clicking the Stop Button
 */
function stopTimer() {
  // To make sure that play() does not interfere with pause()
  setTimeout(function () {
    sound.pause();
  }, 2000);

  // Keeps track of if the timer is running
  countingDown = false;
  manualSwitch = document.getElementById("autoSwitch");
  timerText.textContent = "Stopped";

  // Displays the start button in automatic mode
  if (!manualSwitch.checked) {
    document.getElementById("StartButton").innerText = "Start";
    document.getElementById("StartButton").style.display = "";
  }

  // Hide stop button when timer is stopped
  document.getElementById("StopButton").style.display = "none";
}

/**
 * Change the colors according to button clicked
 * @param {string} seshID - The type of work session the button is being changed for
 */
function seshClicked(seshID) {
  // Changes color scheme of buttons depending on which button is clicked
  let session = document.getElementById(seshID);
  let logo = document.getElementById("logoSVG");
  session.className = "active";
  let autoText = document.getElementById("autoText");

  // Change color scheme on a short break
  if (seshID == "shortBreak") {
    document.body.classList.add("shortBreak");
    document.body.classList.remove("longBreak", "workTime");
    logo.src = "images/logoShort.svg";
    autoText.innerText = "Short Break";
    currentSession = "shortBreak";
  }
  // Changes color scheme on a long break
  else if (seshID == "longBreak") {
    document.body.classList.add("longBreak");
    document.body.classList.remove("shortBreak", "workTime");
    logo.src = "images/logoLong.svg";
    autoText.innerText = "Long Break";
    currentSession = "longBreak";
  }
  // Changes color scheme on a work session
  else {
    document.body.classList.add("workTime");
    document.body.classList.remove("shortBreak", "longBreak");
    logo.src = "images/logo.svg";
    autoText.innerText = "Work Time";
    currentSession = "work";
  }
}

// Variables used for rotating the circular timer element
let progress = document.getElementById("circleProgress");
let pointer = document.getElementById("pointerDot");
let move = Math.PI * 2 * 100;
progress.style.strokeDasharray = move;
progress.style.strokeDashoffset = move * 2;

/**
 * Updates the arc of the circular timer element
 * @param {number} val - ??????
 * @param {number} time - Time left on the timer
 */
function updateCircle(val, time) {
  let offset = move + (move * val) / time;
  progress.style.strokeDashoffset = offset;
  let rotation = 360 - (360 * val) / time;
  pointer.style.transform = `rotate(${rotation}deg)`;
}

/**
 * Changes HTML elements to Dark Mode
 * Called upon page load or when the Dark Mode setting is changed
 */
function darkMode() {
  let dark = document.getElementById("darkMode");
  let settingsLogo = document.getElementById("settingsLogo");
  let helperBtn = document.getElementById("helperBtn");

  // If dark mode is activated, change theme to dark mode, otherwise change to light mode
  if (dark.checked) {
    document.body.classList.add("dark-mode");
    settingsLogo.setAttribute("fill", "#FFFFFF");
    helperBtn.setAttribute("fill", "#c3c3c3");
  } else {
    document.body.classList.remove("dark-mode");
    settingsLogo.setAttribute("fill", "#444444");
    helperBtn.setAttribute("fill", "#444");
  }
}

/**
 * If the Manual Switch is set to true, displays the manual state change buttons
 *  If it is not, hides those same buttons
 *  Called upon page load or when the Manual setting is changed
 */
function autoSwitch() {
  manualSwitch = document.getElementById("autoSwitch");
  let workTimerButton = document.getElementById("workTime");
  let shortBreakButton = document.getElementById("longBreak");
  let longBreakButton = document.getElementById("shortBreak");
  let startButton = document.getElementById("StartButton");
  let autoText = document.getElementById("currentSessionAuto");
  let stopButton = document.getElementById("StopButton");

  // Manual mode is enabled
  if (manualSwitch.checked) {
    // hide start button
    if (countingDown) {
      stopButton.style.display = "block";
    }
    startButton.style.display = "none";
    autoText.style.display = "none";

    // Display manual buttons
    workTimerButton.style.display = "block";
    shortBreakButton.style.display = "block";
    longBreakButton.style.display = "block";
  }
  // Manual mode is disabled, so we are in automatic mode
  else {
    if (currentSession == "workBreak") {
      breakState = false;
    }
    if (currentSession == "shortBreak" || currentSession == "longBreak") {
      breakState = true;
    }
    // hide manual buttons
    workTimerButton.style.display = "none";
    shortBreakButton.style.display = "none";
    longBreakButton.style.display = "none";

    // Display stop button when timer is running, otherwise hide it
    if (countingDown) {
      stopButton.style.display = "block";
    } else {
      startButton.style.display = "block";
      stopButton.style.display = "none";
    }
    autoText.style.display = "block";
  }
}

/**
 * Forces a change the timer text by  the string
 * @param {number} num Number of minutes the timer is being set to
 */
function changeTimerTextString(num) {
  if (num.length == 1) {
    timerText.textContent = "0" + num + ":00";
  } else if (num.length == 2) {
    timerText.textContent = num + ":00";
  }
}
