/* eslint-disable no-undef */
describe("Test Work Timer Button", () => {
  beforeEach(() => {
    cy.visit("index.html");

    //Switch to manual mode
    cy.get("#autoSwitch")
      .check({ force: true })
      .trigger("click", { force: true });
  });

  it("When work timer is clicked with default (input of 25), check if timer display updates to 25:00 correctly", () => {
    cy.get("#workTime").click().should("have.class", "active");
    cy.get("#workTimeInput").then(($el) => {
      expect($el).to.have.value("25");
    });
    cy.get("#timer").contains("25:00");
  });

  it("Testing work timer when work time input is 0, timer should display 60:00", () => {
    cy.get("#workTimeInput")
      .type("{selectall}{backspace}0", { force: true })
      .trigger("change", { force: true });
    cy.get("#workTime").click().should("have.class", "active");
    /* cy.get("#workTimeInput").then(($el) => {
      expect($el).to.have.value("60");
    });
    cy.get("#timer").contains("00:00"); */
  });

  for (let i = 1; i < 9; i++) {
    it(
      "Testing work timer when work time input is " +
        i +
        " timer should display 0" +
        i +
        ":00",
      () => {
        cy.get("#workTimeInput")
          .type("{selectall}{backspace}" + i, { force: true })
          .trigger("change", { force: true });
        cy.get("#workTime").click().should("have.class", "active");
        cy.get("#workTimeInput").then(($el) => {
          expect($el).to.have.value(i.toString());
        });
        cy.get("#timer").contains("0" + i + ":00");
      }
    );
  }

  for (let i = 1; i < 9; i++) {
    it(
      "Testing work timer when work time input is 0" +
        i +
        " timer should display 0" +
        i +
        ":00",
      () => {
        cy.get("#workTimeInput")
          .type("{selectall}{backspace}0" + i, { force: true })
          .trigger("change", { force: true });
        cy.get("#workTime").click().should("have.class", "active");
        cy.get("#workTimeInput").then(($el) => {
          expect($el).to.have.value(i.toString());
        });
        cy.get("#timer").contains("0" + i + ":00");
      }
    );
  }

  for (let i = 10; i < 60; i++) {
    it(
      "Testing work timer when work time input is " +
        i +
        " timer should display " +
        i +
        ":00",
      () => {
        cy.get("#workTimeInput")
          .type("{selectall}{backspace}0" + i, { force: true })
          .trigger("change", { force: true });
        cy.get("#workTime").click().should("have.class", "active");
        cy.get("#workTimeInput").then(($el) => {
          expect($el).to.have.value(i.toString());
        });
        cy.get("#timer").contains(i + ":00");
      }
    );
  }

  it("Testing work timer when work time input is 60, timer should display 60:00", () => {
    cy.get("#workTimeInput")
      .type("{selectall}{backspace}60", { force: true })
      .trigger("change", { force: true });
    cy.get("#workTime").click().should("have.class", "active");
    cy.get("#workTimeInput").then(($el) => {
      expect($el).to.have.value("60");
    });
    cy.get("#timer").contains("00:00");
  });

  it("Edge case: Testing work timer when work time input is 0, timer should display 60:00", () => {
    cy.get("#workTimeInput")
      .type("{selectall}{backspace}0", { force: true })
      .trigger("change", { force: true });
    cy.get("#workTime").click().should("have.class", "active");
    /* cy.get("#workTimeInput").then(($el) => {
      expect($el).to.have.value("60");
    });
    cy.get("#timer").contains("00:00"); */
  });

  it("Edge Case: Testing work timer when work time input is > 60, timer should display 60:00", () => {
    cy.get("#workTimeInput")
      .type("{selectall}{backspace}100", { force: true })
      .trigger("change", { force: true });
    cy.get("#workTime").click().should("have.class", "active");
    cy.get("#workTimeInput").then(($el) => {
      expect($el).to.have.value("100");
      //expect($el).to.have.value("60");
    });
    //cy.get("#timer").contains("00:00"); //TODO
  });

  it("When work timer is clicked, check if work timer is dark pink", () => {
    cy.get("#workTime").click().should("have.class", "active");

    // work timer should be dark pink
    cy.get("#workTime").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(201, 101, 103)");
    });
  });

  it("When work timer is clicked, check if short break changes to light pink", () => {
    cy.get("#workTime").click().should("have.class", "active");
    cy.get("#shortBreak").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(233, 120, 120)");
    });
  });

  it("When work timer is clicked, check if long break changes to light pink", () => {
    cy.get("#workTime").click().should("have.class", "active");
    cy.get("#longBreak").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(233, 120, 120)");
    });
  });

  it("When work timer is clicked, check if start button changes to light pink", () => {
    cy.get("#workTime").click().should("have.class", "active");

    cy.get("#StartButton").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(233, 120, 120)");
    });
  });

  it("When work timer is clicked, check if stop button changes to light pink", () => {
    cy.get("#workTime").click().should("have.class", "active");

    cy.get("#StopButton").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(233, 120, 120)");
    });
  });

  it("When work timer is clicked, check if logo changes to default pink color", () => {
    cy.get("#workTime").click().should("have.class", "active");
    cy.get("#logoSVG").should("have.attr", "src", "images/logo.svg");
  });

  it("When work timer is clicked, check if task list tab and add button changes to light pink color", () => {
    cy.get("#workTime").click().should("have.class", "active");

    cy.get("#to-do").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(233, 120, 120)");
    });

    cy.get("#addBtn").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(233, 120, 120)");
    });
  });
});

describe("Test Long Break Button", () => {
  beforeEach(() => {
    cy.visit("index.html");
    //switch to manual mode
    cy.get("#autoSwitch")
      .check({ force: true })
      .trigger("click", { force: true });
  });

  it("When Long Break is clicked (default input of 15), check if timer display updates to 15:00 correctly", () => {
    cy.get("#longBreak").click().should("have.class", "active");
    cy.get("#longBreakTimeInput").then(($el) => {
      expect($el).to.have.value("15");
    });
    cy.get("#timer").contains("15:00");
  });

  it("When Long Break is clicked, check if long break button turns dark pink", () => {
    cy.get("#longBreak").click().should("have.class", "active");
    cy.get("#longBreak").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(201, 101, 103)");
    });
  });

  it("When Long Break button is clicked, check if short break button change to dark blue", () => {
    cy.get("#longBreak").click().should("have.class", "active");
    cy.get("#shortBreak").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(41, 71, 181)");
    });
  });

  it("When Long Break button is clicked, check if work timer button change to dark blue", () => {
    cy.get("#longBreak").click().should("have.class", "active");

    cy.get("#workTime").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(41, 71, 181)");
    });
  });

  it("When Long Break button is clicked, check if start button change to dark blue", () => {
    cy.get("#longBreak").click().should("have.class", "active");

    cy.get("#StartButton").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(41, 71, 181)");
    });
  });

  it("When Long Break button is clicked, check if stop button change to dark blue", () => {
    cy.get("#longBreak").click().should("have.class", "active");

    cy.get("#StopButton").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(41, 71, 181)");
    });
  });

  it("When Long Break is clicked, check if logo changes to light blue color", () => {
    cy.get("#longBreak").click().should("have.class", "active");
    cy.get("#logoSVG").should("have.attr", "src", "images/logoLong.svg");
  });

  it("When Long Break is clicked, check if task list tab and add button changes to light pink color", () => {
    cy.get("#longBreak").click().should("have.class", "active");

    cy.get("#to-do").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(41, 71, 181)");
    });

    cy.get("#addBtn").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(41, 71, 181)");
    });
  });

  for (let i = 1; i < 10; i++) {
    it(
      "Testing Long Break when Long Break input is " +
        i +
        ", timer should display 0" +
        i +
        ":00",
      () => {
        cy.get("#longBreakTimeInput")
          .type("{selectall}{backspace}" + i, { force: true })
          .trigger("change", { force: true });
        cy.get("#longBreak").click().should("have.class", "active");
        cy.get("#longBreakTimeInput").then(($el) => {
          expect($el).to.have.value(i.toString());
        });
        cy.get("#timer").contains("0" + i + ":00");
      }
    );
  }

  for (let i = 1; i < 10; i++) {
    it(
      "Testing Long Break when Long Break input is 0" +
        i +
        ", timer should display 0" +
        i +
        ":00",
      () => {
        cy.get("#longBreakTimeInput")
          .type("{selectall}{backspace}0" + i, { force: true })
          .trigger("change", { force: true });
        cy.get("#longBreak").click().should("have.class", "active");
        cy.get("#longBreakTimeInput").then(($el) => {
          expect($el).to.have.value(i.toString());
        });
        cy.get("#timer").contains("0" + i + ":00");
      }
    );
  }

  for (let i = 10; i < 60; i++) {
    it(
      "Testing Long Break when Long Break input is " +
        i +
        ", timer should display " +
        i +
        ":00",
      () => {
        cy.get("#longBreakTimeInput")
          .type("{selectall}{backspace}" + i, { force: true })
          .trigger("change", { force: true });
        cy.get("#longBreak").click().should("have.class", "active");
        cy.get("#longBreakTimeInput").then(($el) => {
          expect($el).to.have.value(i.toString());
        });
        cy.get("#timer").contains(i + ":00");
      }
    );
  }

  it("Edge Case: Testing Long Break when Long Break input is 0, timer should display 60:00", () => {
    cy.get("#longBreakTimeInput")
      .type("{selectall}{backspace}0", { force: true })
      .trigger("change", { force: true });
    cy.get("#longBreak").click().should("have.class", "active");
    /* cy.get("#longBreakTimeInput").then(($el) => {
      expect($el).to.have.value("0");
    });
    cy.get("#timer").contains("00:00"); */
  });

  it("Testing Long Break when Long Break input is 60, timer should display 60:00", () => {
    cy.get("#longBreakTimeInput")
      .type("{selectall}{backspace}60", { force: true })
      .trigger("change", { force: true });
    cy.get("#longBreak").click().should("have.class", "active");
    cy.get("#longBreakTimeInput").then(($el) => {
      expect($el).to.have.value("60");
    });
    cy.get("#timer").contains("00:00");
  });

  it("Testing Long Break when Long Break input is > 60, timer should display 60:00", () => {
    cy.get("#longBreakTimeInput")
      .type("{selectall}{backspace}100", { force: true })
      .trigger("change", { force: true });
    cy.get("#longBreak").click().should("have.class", "active");
    /* cy.get("#longBreakTimeInput").then(($el) => {
      expect($el).to.have.value("60");
    });
    cy.get("#timer").contains("00:00"); */
  });
});

describe("Test Short Break Button", () => {
  beforeEach(() => {
    cy.visit("index.html");
    //switch to manual mode
    cy.get("#autoSwitch")
      .check({ force: true })
      .trigger("click", { force: true });
  });

  it("When Short Break is clicked with input of 5, check if timer display updates to 05:00 correctly", () => {
    cy.get("#shortBreak").click().should("have.class", "active");
    cy.get("#shortBreakTimeInput").then(($el) => {
      expect($el).to.have.value("5");
    });
    cy.get("#timer").contains("05:00");
  });

  it("When Short Break is clicked, check if short break button changes to dark pink", () => {
    cy.get("#shortBreak").click().should("have.class", "active");
    cy.get("#shortBreak").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(201, 101, 103)");
    });
  });

  it("When Short Break is clicked, check if long break button changes to lighter blue", () => {
    cy.get("#shortBreak").click().should("have.class", "active");
    cy.get("#longBreak").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(88, 131, 206)");
    });
  });

  it("When Short Break is clicked, check if work timer button changes to lighter blue", () => {
    cy.get("#shortBreak").click().should("have.class", "active");
    cy.get("#workTime").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(88, 131, 206)");
    });
  });

  it("When Short Break is clicked, check if Start button changes to lighter blue", () => {
    cy.get("#shortBreak").click().should("have.class", "active");
    cy.get("#StartButton").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(88, 131, 206)");
    });
  });

  it("When Short Break is clicked, check if Stop button changes to lighter blue", () => {
    cy.get("#shortBreak").click().should("have.class", "active");
    cy.get("#StopButton").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(88, 131, 206)");
    });
  });

  it("When Short Break is clicked, check if logo changes to light blue color", () => {
    cy.get("#shortBreak").click().should("have.class", "active");

    cy.get("#logoSVG").should("have.attr", "src", "images/logoShort.svg");
  });

  it("When Short Break is clicked, check if task list tab and add button changes to light blue color", () => {
    cy.get("#shortBreak").click().should("have.class", "active");

    cy.get("#to-do").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(88, 131, 206)");
    });

    cy.get("#addBtn").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(88, 131, 206)");
    });
  });

  it("Testing short Break when short Break input is 5, timer should display 05:00", () => {
    cy.get("#shortBreakTimeInput")
      .type("{selectall}{backspace}5", { force: true })
      .trigger("change", { force: true });
    cy.get("#shortBreak").click().should("have.class", "active");
    cy.get("#shortBreakTimeInput").then(($el) => {
      expect($el).to.have.value("5");
    });
    cy.get("#timer").contains("05:00");
  });

  it("Edge Case: Testing short Break when short Break input is 0, timer should display 60:00", () => {
    cy.get("#shortBreakTimeInput")
      .type("{selectall}{backspace}0", { force: true })
      .trigger("change", { force: true });
    cy.get("#shortBreak").click().should("have.class", "active");
    /* cy.get("#shortBreakTimeInput").then(($el) => {
      expect($el).to.have.value("60");
    });
    cy.get("#timer").contains("60:00"); */
  });

  it("Testing short Break when short Break input is 05, timer should display 05:00", () => {
    cy.get("#shortBreakTimeInput")
      .type("{selectall}{backspace}05", { force: true })
      .trigger("change", { force: true });
    cy.get("#shortBreak").click().should("have.class", "active");
    cy.get("#shortBreakTimeInput").then(($el) => {
      expect($el).to.have.value("5");
    });
    cy.get("#timer").contains("05:00");
  });

  it("Testing short Break when short Break input is 60, timer should display 60:00", () => {
    cy.get("#shortBreakTimeInput")
      .type("{selectall}{backspace}60", { force: true })
      .trigger("change", { force: true });
    cy.get("#shortBreak").click().should("have.class", "active");
    cy.get("#shortBreakTimeInput").then(($el) => {
      expect($el).to.have.value("60");
    });
    cy.get("#timer").contains("00:00");
  });

  it("Testing Short Break when short Break input is > 60, timer should display 60:00", () => {
    cy.get("#shortBreakTimeInput")
      .type("{selectall}{backspace}100", { force: true })
      .trigger("change", { force: true });
    cy.get("#shortBreak").click().should("have.class", "active");
    /* cy.get("#shortBreakTimeInput").then(($el) => {
      expect($el).to.have.value("60");
    });
    cy.get("#timer").contains("00:00"); */
  });
});

describe("Testing Start Button", () => {
  beforeEach(() => {
    cy.visit("index.html");
  });

  it("When Start button is clicked, timer changes to 25:00 (automatic mode)", () => {
    cy.get("#StopButton").should(($el) => {
      expect($el).to.have.css("display", "none");
    });
    cy.get("#StartButton").click();
    cy.get("#StartButton").should(($el) => {
      expect($el).to.have.css("display", "none");
    });

    cy.get("#StopButton").should(($el) => {
      expect($el).to.have.css("display", "block");
    });

    cy.get("#timer").contains("25:00");
  });
});

describe("Testing Stop Button", () => {
  beforeEach(() => {
    cy.visit("index.html");
  });

  it("When Stop button is clicked, timer changes to Stopped!", () => {
    cy.get("#StopButton").should(($el) => {
      expect($el).to.have.css("display", "none");
    });
    cy.get("#StartButton").click();
    cy.get("#StartButton").should(($el) => {
      expect($el).to.have.css("display", "none");
    });

    cy.get("#StopButton").should(($el) => {
      expect($el).to.have.css("display", "block");
    });

    cy.get("#timer").contains("25:00");

    cy.get("#StopButton").click();

    cy.get("#StopButton").should(($el) => {
      expect($el).to.have.css("display", "none");
    });

    cy.get("#timer").contains("Stopped!");
  });
});

describe("Testing Task List", () => {
  beforeEach(() => {
    cy.visit("index.html");
  });

  it("Successfully add task HW1 to task list", () => {
    cy.get("#addBtn").click();
    //cy.get("#tasks").shadow().find('#element').find('#name').clear().type("HW1");
  });

  it("Successfully add task HW2 to task list", () => {
    /* cy.get("#addBtn").click();
    cy.get("#addModal").should("exist");
    cy.get("#addTaskInput").clear().type("HW2");
    cy.get(".addTaskBtn").click(); */
  });

  it("Successfully add task HW3 to task list", () => {
    /* cy.get("#addBtn").click();
    cy.get("#addModal").should("exist");
    cy.get("#addTaskInput").clear().type("HW3");
    cy.get(".addTaskBtn").click(); */
  });

  it("Display alert when enter empty task", () => {
    /* cy.get("#addBtn").click();
    cy.get("#addModal").should("exist");
    //cy.get('#addTaskInput').clear().invoke('value', null);
    cy.get(".addTaskBtn").click(); */
    //cy.on('window:alert',(txt)=>{
    //  expect(txt).to.contains('You need to enter a valid task name.');
    //})
  });

  it("Display alert when enter only spaces in task name", () => {
    /* cy.get("#addBtn").click();
    cy.get("#addModal").should("exist");
    cy.get("#addTaskInput").clear().type("    ");
    cy.get(".addTaskBtn").click();
    cy.on("window:alert", (txt) => {
      expect(txt).to.contains("You need to enter a valid task name.");
    }); */
  });

  it("Work timer: To-Do tab is pink when clicked on; Done tab is greyed", () => {
    //Switch to manual mode
    cy.get("#autoSwitch")
      .check({ force: true })
      .trigger("click", { force: true });

    cy.get("#workTime").click().should("have.class", "active");
    cy.get("#addBtn").click();

    cy.get("#to-do").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(233, 120, 120)");
    });

    cy.get("#done").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(204, 204, 204)");
    });
  });

  it("Work Timer: Done tab is pink when clicked on; To-Do tab is greyed", () => {
    //Switch to manual mode
    cy.get("#autoSwitch")
      .check({ force: true })
      .trigger("click", { force: true });

    cy.get("#workTime").click().should("have.class", "active");
    cy.get("#done").click();

    cy.get("#to-do").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(204, 204, 204)");
    });

    cy.get("#done").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(233, 120, 120)");
    });
  });

  it("Short Break: To-Do tab is light blue when clicked on; Done tab is greyed", () => {
    //Switch to manual mode
    cy.get("#autoSwitch")
      .check({ force: true })
      .trigger("click", { force: true });

    cy.get("#shortBreak").click().should("have.class", "active");
    cy.get("#addBtn").click();

    cy.get("#to-do").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(88, 131, 206)");
    });

    cy.get("#done").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(204, 204, 204)");
    });
  });

  it("Short Break: Done tab is light blue when clicked on; To-Do tab is greyed", () => {
    //Switch to manual mode
    cy.get("#autoSwitch")
      .check({ force: true })
      .trigger("click", { force: true });

    cy.get("#shortBreak").click().should("have.class", "active");
    cy.get("#done").click();

    cy.get("#to-do").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(204, 204, 204)");
    });

    cy.get("#done").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(88, 131, 206)");
    });
  });

  it("Long Break: To-Do tab is dark blue when clicked on; Done tab is greyed", () => {
    //Switch to manual mode
    cy.get("#autoSwitch")
      .check({ force: true })
      .trigger("click", { force: true });

    cy.get("#longBreak").click().should("have.class", "active");
    cy.get("#addBtn").click();

    cy.get("#to-do").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(41, 71, 181)");
    });

    cy.get("#done").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(204, 204, 204)");
    });
  });

  it("Long Break: Done tab is dark blue when clicked on; To-Do tab is greyed", () => {
    //Switch to manual mode
    cy.get("#autoSwitch")
      .check({ force: true })
      .trigger("click", { force: true });

    cy.get("#longBreak").click().should("have.class", "active");
    cy.get("#done").click();

    cy.get("#to-do").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(204, 204, 204)");
    });

    cy.get("#done").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(41, 71, 181)");
    });
  });

  it("Successfully move HW1 to done list on clicking the switch button", () => {
    /* cy.get("#addBtn").click();
    cy.get("#addModal").should("exist");
    cy.get("#addTaskInput").clear().type("HW1");
    cy.get(".addTaskBtn").click();

    cy.get("#to-do").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(233, 120, 120)");
    });

    cy.get("#done").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(204, 204, 204)");
    });

    //cy.get('#moveToNewList').click();
    cy.get("#done").click();

    cy.get("#to-do").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(204, 204, 204)");
    });

    cy.get("#done").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(233, 120, 120)");
    }); */
  });

  it("Alert pops up when trying to add duplicate task names (HW1) to task list", () => {
    /* cy.get("#addBtn").click();
    cy.get("#addModal").should("exist");
    cy.get("#addTaskInput").clear().type("HW1");
    cy.get(".addTaskBtn").click();

    cy.get("#addBtn").click();
    cy.get("#addModal").should("exist");
    cy.get("#addTaskInput").clear().type("HW1");
    cy.get(".addTaskBtn").click();

    cy.on("window:alert", (txt) => {
      expect(txt).to.contains(
        "You cannot have the same name as a previous task"
      );
    }); */
  });

  it("Alert pops up when trying to add duplicate task names (HW2) to task list", () => {
    /* cy.get("#addBtn").click();
    cy.get("#addModal").should("exist");
    cy.get("#addTaskInput").clear().type("HW2");
    cy.get(".addTaskBtn").click();

    cy.get("#addBtn").click();
    cy.get("#addModal").should("exist");
    cy.get("#addTaskInput").clear().type("HW2");
    cy.get(".addTaskBtn").click();

    cy.on("window:alert", (txt) => {
      expect(txt).to.contains(
        "You cannot have the same name as a previous task"
      );
    }); */
  });

  it("Successfuly deletes the first task from task list", () => {
    /* cy.get("#addBtn").click();
    cy.get("#addModal").should("exist");
    cy.get("#addTaskInput").clear().type("HW1");
    cy.get(".addTaskBtn").click();

    cy.get("#addBtn").click();
    cy.get("#addModal").should("exist");
    cy.get("#addTaskInput").clear().type("HW2");
    cy.get(".addTaskBtn").click(); */
    //cy.get('#tasks').shadow().first().find('#removeTask').click();
  });

  it("Successfuly deletes the last task from task list", () => {
    /* cy.get("#addBtn").click();
    cy.get("#addModal").should("exist");
    cy.get("#addTaskInput").clear().type("HW2");
    cy.get(".addTaskBtn").click();

    cy.get("#addBtn").click();
    cy.get("#addModal").should("exist");
    cy.get("#addTaskInput").clear().type("HW1");
    cy.get(".addTaskBtn").click(); */
  });

  it("Successfuly deletes all tasks from task list", () => {
    /* cy.get("#addBtn").click();
    cy.get("#addModal").should("exist");
    cy.get("#addTaskInput").clear().type("HW2");
    cy.get(".addTaskBtn").click();

    cy.get("#addBtn").click();
    cy.get("#addModal").should("exist");
    cy.get("#addTaskInput").clear().type("HW3");
    cy.get(".addTaskBtn").click(); */
  });
});

describe("Testing default time passed check from Work to Short Break", () => {
  beforeEach(() => {
    cy.clock();
    cy.visit("index.html");
  });

  it("time passed check from Work to Short Break", () => {
    cy.get("#StartButton").click();
    cy.tick(1502000); // 25 minutes and 2 seconds

    cy.get("#shortBreak").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(201, 101, 103)");
    });

    //cy.clock().invoke('restore');
  });

  it("time passed check from Short Break to Work", () => {
    cy.get("#StartButton").click();
    cy.tick(1500000); // 25 minutes
    cy.tick(5 * 60 * 1000); // 5 minutes
    cy.tick(3000); // 30 minutes and 2 seconds (Work 25 Minutes, Short 5 Minutse)

    cy.get("#workTime").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(201, 101, 103)"); // Must use rgb in cypress
    });

    // cy.clock().invoke('restore');
  });
});

// Use this as a skeleton
//describe("Testing description here", () => {
//  beforeEach(() => {
//    cy.visit("http://127.0.0.1:5500/index.html");
//  });
//});
