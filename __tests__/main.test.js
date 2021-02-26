const fs = require('fs');
const path = require('path');
document.documentElement.innerHTML = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');


const allMethods = require('../main.js');

describe("testing button clicks for work timer and breaks", () => {
  // Click Work Time button
  test('Work Time button', () => {

    const workTimeInput = document.getElementById('workTimeInput');
    expect(workTimeInput.value).toBe("25");
    allMethods();
    expect(workTimeInput.value).toBe("25");

    const timerDisplay = document.getElementById('timer');
    expect(timerDisplay.innerHTML).toBe("25:00");
  });

  /*
  // Click Long Break Button
  test('Long Time button', () => {

    const longBreak = document.getElementById('longBreakTimeInput');
    expect(longBreak.innerHTML).toBe("15");
    testLongTime();
    expect(longBreak.innerHTML).toBe("15");

    const timerDisplay = document.getElementById('timer');
    expect(timerDisplay.innerHTML).toBe("15:00");
    
  });

  // Click Short Break Button
  test('Short Time button', () => {

    const shortBreak = document.getElementById('shortBreakTimeInput');

    const mock = jest.fn();
    const result = mock();
    expect(result).toBeUndefined();
    expect(mock).toHaveBeenCalledTimes(1);
    expect(shortBreak.innerHTML).toBe("5");
    testShortTime();
    expect(shortBreak.innerHTML).toBe("5");

    const timerDisplay = document.getElementById('timer');
    expect(timerDisplay.innerHTML).toBe("05:00");
    
  }); */

});

/*
describe("testing if ms are converted to readable time", () => {
  test('convert ms correctly', () => {
    const mock = jest.fn();
    const result = mock();
    testDisplay();
    expect(result).toBeUndefined();
    expect(mock).toHaveBeenCalledTimes(1);
  });
});  */