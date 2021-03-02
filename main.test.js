const allMethods = require('./main.js');
const testWorkButton = allMethods.setWorkTime;
const testDisplay = allMethods.readTime;



// describe("testing button clicks for work timer and breaks", () => {

//   //
//   document.body.innerHTML = `
//     <button id="workTime">Work Timer</button>
//     <button id="StartButton">Start Timer</button>
//     <input id="workTimeInput" type="number" value="50">
//     <p id="timer">foo</p>`;
//     require("./main.js");

//   // Click Work Time button
//   test('Work Time button', () => {

//     const workTimeInput = document.getElementById('workTimeInput');
//     expect(workTimeInput.value).toBe("50");

//     const mockFn = jest.fn();
//     const response = testWorkButton(mockFn);
//     //testWorkButton();
//     expect(mockFn).toHaveBeenCalledTimes(1);

//     expect(workTimeInput.value).toBe("50");

//     const timerDisplay = document.getElementById('timer');
//     expect(timerDisplay.innerHTML).toBe("50:00");

//     //const mock = jest.fn();
//     //expect(mock).toHaveBeenCalledTimes(1);

//     /*const spy = jest.spyOn(workTimerButton,'setWorkTime');
//     workTimerButton(mock);
//     expect(spy).toHaveBeenCalledTimes(1); */


//   });

//   // Click Long Break Button
//   test('Long Time button', () => {

//     document.body.innerHTML = `<input id="longBreakTimeInput" type="number"
//     value="40">`; require("./main.js");

//     const clickMe = document.getElementById('longBreakTimeInput');
//     clickMe.click();

//     const mock = jest.fn();
//     const result = mock();
//     expect(result).toBeUndefined();
//     expect(mock).toHaveBeenCalledTimes(1);
//     expect(clickMe.value).toBe("40");
//   });

//   // Click Short Break Button
//   test('Short Time button', () => {
//     document.body.innerHTML = `<input id="shortBreakTimeInput" type="number"
//     value="10">`; require("./main.js");

//     const clickMe = document.getElementById('shortBreakTimeInput');
//     clickMe.click();

//     const mock = jest.fn();
//     const result = mock();
//     expect(result).toBeUndefined();
//     expect(mock).toHaveBeenCalledTimes(1);
//     expect(clickMe.value).toBe("10");
//   });

// });

/*
describe("testing if pop up works", () => {
  test('pop up', () => {
    const mock = jest.fn();
    const result = mock();
    m4();
    expect(result).toBeUndefined();
    expect(mock).toHaveBeenCalledTimes(1);
  });


});

describe("testing if timer text display updates correctly", () => {
  test('timer text update', () => {
    const mock = jest.fn();
    const result = mock();
    m5();
    expect(result).toBeUndefined();
    expect(mock).toHaveBeenCalledTimes(1);
  });

}); */

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


/*
describe("testing if ms are converted to readable time", () => {

  test('convert ms correctly', () => {
    const mock = jest.fn();
    const result = mock();
    testDisplay();
    expect(result).toBeUndefined();
    expect(mock).toHaveBeenCalledTimes(1);

    allMethods.setWorkTime = jest.fn();
    expect(allMethods.setWorkTime.mock).toBeTruthy();
  });

});
*/