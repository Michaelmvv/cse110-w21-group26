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

  it("Testing work timer when work time input is 0 or negative, timer should display previous valid input", () => {
    cy.get("#workTimeInput")
      .type("{selectall}{backspace}10", { force: true })
      .trigger("change", { force: true });
    cy.get("#workTimeInput")
      .type("{selectall}{backspace}0", { force: true })
      .trigger("change", { force: true });
    cy.get("#workTime").click().should("have.class", "active");
    cy.get("#workTimeInput").then(($el) => {
      expect($el).to.have.value("10");
    });
    cy.get("#timer").contains("10:00");

    cy.get("#workTimeInput")
      .type("{selectall}{backspace}-1", { force: true })
      .trigger("change", { force: true });
    cy.get("#workTimeInput")
      .type("{selectall}{backspace}10", { force: true })
      .trigger("change", { force: true });
    cy.get("#workTime").click().should("have.class", "active");
    cy.get("#workTimeInput").then(($el) => {
      expect($el).to.have.value("10");
    });
    cy.get("#timer").contains("10:00");
  });

  for (let i = 0; i < 10; i++) {
    it(
      "Testing work timer when work time input is a decimal 1." +
        i +
        ", timer should display 1",
      () => {
        cy.get("#workTimeInput")
          .type("{selectall}{backspace}1." + i, { force: true })
          .trigger("change", { force: true });
        cy.get("#workTime").click().should("have.class", "active");
        cy.get("#workTimeInput").then(($el) => {
          expect($el).to.have.value("1");
        });
        cy.get("#timer").contains("01:00");
      }
    );
  }

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

  it("Edge case: Testing work timer when work time input is 0, timer should display previous valid input", () => {
    cy.get("#workTimeInput")
      .type("{selectall}{backspace}10", { force: true })
      .trigger("change", { force: true });
    cy.get("#workTimeInput")
      .type("{selectall}{backspace}0", { force: true })
      .trigger("change", { force: true });
    cy.get("#workTime").click().should("have.class", "active");
    cy.get("#workTimeInput").then(($el) => {
      expect($el).to.have.value("10");
    });
    cy.get("#timer").contains("10:00");
  });

  it("Edge Case: Testing work timer when work time input is > 60, timer should display 00:00", () => {
    cy.get("#workTimeInput")
      .type("{selectall}{backspace}100", { force: true })
      .trigger("change", { force: true });
    cy.get("#workTime").click().should("have.class", "active");
    cy.get("#workTimeInput").then(($el) => {
      expect($el).to.have.value("60");
    });
    cy.get("#timer").contains("00:00");
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

  it("When Long Break is clicked, check if long break button turns active dark blue", () => {
    cy.get("#longBreak").click().should("have.class", "active");
    cy.get("#longBreak").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(33, 57, 146)");
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

  for (let i = 0; i < 10; i++) {
    it(
      "Testing long break when long break input is a decimal 1." +
        i +
        ", timer should display 1",
      () => {
        cy.get("#longBreakTimeInput")
          .type("{selectall}{backspace}1." + i, { force: true })
          .trigger("change", { force: true });
        cy.get("#longBreak").click().should("have.class", "active");
        cy.get("#longBreakTimeInput").then(($el) => {
          expect($el).to.have.value("1");
        });
        cy.get("#timer").contains("01:00");
      }
    );
  }

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

  it("Edge Case: Testing Long Break when Long Break input is 0 or negative, timer should display previous valid input", () => {
    cy.get("#longBreakTimeInput")
      .type("{selectall}{backspace}25", { force: true })
      .trigger("change", { force: true });
    cy.get("#longBreakTimeInput")
      .type("{selectall}{backspace}0", { force: true })
      .trigger("change", { force: true });
    cy.get("#longBreak").click().should("have.class", "active");
    cy.get("#longBreakTimeInput").then(($el) => {
      expect($el).to.have.value("25");
    });
    cy.get("#timer").contains("25:00");

    cy.get("#longBreakTimeInput")
      .type("{selectall}{backspace}-10", { force: true })
      .trigger("change", { force: true });
    cy.get("#longBreakTimeInput")
      .type("{selectall}{backspace}25", { force: true })
      .trigger("change", { force: true });
    cy.get("#longBreak").click().should("have.class", "active");
    cy.get("#longBreakTimeInput").then(($el) => {
      expect($el).to.have.value("25");
    });
    cy.get("#timer").contains("25:00");
  });

  it("Testing Long Break when Long Break input is 60, timer should display 00:00", () => {
    cy.get("#longBreakTimeInput")
      .type("{selectall}{backspace}60", { force: true })
      .trigger("change", { force: true });
    cy.get("#longBreak").click().should("have.class", "active");
    cy.get("#longBreakTimeInput").then(($el) => {
      expect($el).to.have.value("60");
    });
    cy.get("#timer").contains("00:00");
  });

  it("Testing Long Break when Long Break input is > 60, timer should display 00:00", () => {
    cy.get("#longBreakTimeInput")
      .type("{selectall}{backspace}100", { force: true })
      .trigger("change", { force: true });
    cy.get("#longBreak").click().should("have.class", "active");
    cy.get("#longBreakTimeInput").then(($el) => {
      expect($el).to.have.value("60");
    });
    cy.get("#timer").contains("00:00");
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

  it("When Short Break is clicked, check if short break button changes to active light blue", () => {
    cy.get("#shortBreak").click().should("have.class", "active");
    cy.get("#shortBreak").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(61, 89, 138)");
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

  for (let i = 0; i < 10; i++) {
    it(
      "Testing short break when short break input is a decimal 1." +
        i +
        ", timer should display 1",
      () => {
        cy.get("#shortBreakTimeInput")
          .type("{selectall}{backspace}1." + i, { force: true })
          .trigger("change", { force: true });
        cy.get("#shortBreak").click().should("have.class", "active");
        cy.get("#shortBreakTimeInput").then(($el) => {
          expect($el).to.have.value("1");
        });
        cy.get("#timer").contains("01:00");
      }
    );
  }

  it("Edge Case: Testing short Break when short Break input is 0 or negative, timer should display previous valid input", () => {
    cy.get("#shortBreakTimeInput")
      .type("{selectall}{backspace}13", { force: true })
      .trigger("change", { force: true });
    cy.get("#shortBreakTimeInput")
      .type("{selectall}{backspace}0", { force: true })
      .trigger("change", { force: true });
    cy.get("#shortBreak").click().should("have.class", "active");
    cy.get("#shortBreakTimeInput").then(($el) => {
      expect($el).to.have.value("13");
    });
    cy.get("#timer").contains("13:00");

    cy.get("#shortBreakTimeInput")
      .type("{selectall}{backspace}-14", { force: true })
      .trigger("change", { force: true });
    cy.get("#shortBreakTimeInput")
      .type("{selectall}{backspace}13", { force: true })
      .trigger("change", { force: true });
    cy.get("#shortBreak").click().should("have.class", "active");
    cy.get("#shortBreakTimeInput").then(($el) => {
      expect($el).to.have.value("13");
    });
    cy.get("#timer").contains("13:00");
  });

  for (let i = 1; i < 10; i++) {
    it(
      "Testing Short Break when short Break input is " +
        i +
        ", timer should display 0" +
        i +
        ":00",
      () => {
        cy.get("#shortBreakTimeInput")
          .type("{selectall}{backspace}" + i, { force: true })
          .trigger("change", { force: true });
        cy.get("#shortBreak").click().should("have.class", "active");
        cy.get("#shortBreakTimeInput").then(($el) => {
          expect($el).to.have.value(i.toString());
        });
        cy.get("#timer").contains("0" + i + ":00");
      }
    );
  }

  for (let i = 1; i < 10; i++) {
    it(
      "Testing short Break when short Break input is 0" +
        i +
        ", timer should display 0" +
        i +
        ":00",
      () => {
        cy.get("#shortBreakTimeInput")
          .type("{selectall}{backspace}0" + i, { force: true })
          .trigger("change", { force: true });
        cy.get("#shortBreak").click().should("have.class", "active");
        cy.get("#shortBreakTimeInput").then(($el) => {
          expect($el).to.have.value(i.toString());
        });
        cy.get("#timer").contains("0" + i + ":00");
      }
    );
  }

  for (let i = 10; i < 60; i++) {
    it(
      "Testing short Break when short Break input is " +
        i +
        ", timer should display " +
        i +
        ":00",
      () => {
        cy.get("#shortBreakTimeInput")
          .type("{selectall}{backspace}" + i, { force: true })
          .trigger("change", { force: true });
        cy.get("#shortBreak").click().should("have.class", "active");
        cy.get("#shortBreakTimeInput").then(($el) => {
          expect($el).to.have.value(i.toString());
        });
        cy.get("#timer").contains(i + ":00");
      }
    );
  }

  it("Testing short Break when short Break input is 60, timer should display 00:00", () => {
    cy.get("#shortBreakTimeInput")
      .type("{selectall}{backspace}60", { force: true })
      .trigger("change", { force: true });
    cy.get("#shortBreak").click().should("have.class", "active");
    cy.get("#shortBreakTimeInput").then(($el) => {
      expect($el).to.have.value("60");
    });
    cy.get("#timer").contains("00:00");
  });

  it("Testing Short Break when short Break input is > 60, timer should display 00:00", () => {
    cy.get("#shortBreakTimeInput")
      .type("{selectall}{backspace}100", { force: true })
      .trigger("change", { force: true });
    cy.get("#shortBreak").click().should("have.class", "active");
    cy.get("#shortBreakTimeInput").then(($el) => {
      expect($el).to.have.value("60");
    });
    cy.get("#timer").contains("00:00");
  });
});

describe("Testing Edge cases in Pomo Cycle Input", () => {
  beforeEach(() => {
    cy.visit("index.html");
  });

  it("Edge case: Pomo Cycle Input should revert to default (4) if input is 0 or negative", () => {
    cy.get("#numWork")
      .type("{selectall}{backspace}0", { force: true })
      .trigger("change", { force: true });
    cy.get("#numWork").then(($el) => {
      expect($el).to.have.value("4");
    });

    cy.get("#numWork")
      .type("{selectall}{backspace}5", { force: true })
      .trigger("change", { force: true });
    cy.get("#numWork").then(($el) => {
      expect($el).to.have.value("5");
    });

    cy.get("#numWork")
      .type("{selectall}{backspace}-10", { force: true })
      .trigger("change", { force: true });
    cy.get("#numWork").then(($el) => {
      expect($el).to.have.value("5");
    });
  });

  for (let i = 4; i < 10; i++) {
    it("Testing Pomo Cycles input when input is " + i, () => {
      cy.get("#numWork")
        .type("{selectall}{backspace}" + i, { force: true })
        .trigger("change", { force: true });
      cy.get("#numWork").then(($el) => {
        expect($el).to.have.value("" + i);
      });
    });
  }

  for (let i = 4; i < 10; i++) {
    it("Testing Pomo cycle when pomo cycle input is 0" + i, () => {
      cy.get("#numWork")
        .type("{selectall}{backspace}0" + i, { force: true })
        .trigger("change", { force: true });
      cy.get("#numWork").then(($el) => {
        expect($el).to.have.value("" + i);
      });
    });
  }

  for (let i = 10; i < 60; i++) {
    it("Any input past max value (" + i + ") should cap at max value", () => {
      cy.get("#numWork")
        .type("{selectall}{backspace}" + i, { force: true })
        .trigger("change", { force: true });
      cy.get("#numWork").then(($el) => {
        expect($el).to.have.value("10");
      });
    });
  }

  for (let i = 0; i < 10; i++) {
    it(
      "Decimal input in pomo cycle should truncate to integer value " + i,
      () => {
        cy.get("#numWork")
          .type("{selectall}{backspace}1." + i, { force: true })
          .trigger("change", { force: true });
        cy.get("#numWork").then(($el) => {
          expect($el).to.have.value("4");
        });
      }
    );
  }
});

describe("Testing Start Button", () => {
  beforeEach(() => {
    cy.visit("index.html");
  });

  it("When Start button is clicked, timer changes to 25:00 (default input in automatic mode)", () => {
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

  for (let i = 1; i < 10; i++) {
    it("When Start button is clicked, timer changes to 0" + i + ":00", () => {
      cy.get("#workTimeInput")
        .type("{selectall}{backspace}" + i, { force: true })
        .trigger("change", { force: true });
      cy.get("#StartButton").click();
      cy.get("#timer").contains("0" + i + ":00");
    });
  }

  for (let i = 10; i < 60; i++) {
    it("When Start button is clicked, timer changes to " + i + ":00", () => {
      cy.get("#workTimeInput")
        .type("{selectall}{backspace}" + i, { force: true })
        .trigger("change", { force: true });
      cy.get("#StartButton").click();
      cy.get("#timer").contains(i + ":00");
    });
  }
});

describe("Testing Stop Button", () => {
  beforeEach(() => {
    cy.visit("index.html");
  });

  it("When Stop button is clicked, timer changes to Stopped", () => {
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

    cy.get("#timer").contains("Stopped");
  });
});

describe("Testing Task List", () => {
  beforeEach(() => {
    cy.visit("index.html");
  });

  it("Successfully add task HW1 to task list", () => {
    cy.get("#addBtn").click();
    cy.get("task-item")
      .shadow()
      .find("li")
      .find("#name")
      .type("{selectall}{backspace}HW1", { force: true })
      .trigger("change", { force: true });

    cy.get("#taskIndicator").then((text) => {
      assert(text, "HW1");
    });
  });

  it("Successfully add 2 tasks: HW1 and HW2 to task list", () => {
    cy.get("#addBtn").click();
    cy.get("task-item")
      .shadow()
      .find("li")
      .find("#name")
      .type("{selectall}{backspace}HW1", { force: true })
      .trigger("change", { force: true });

    cy.get("#taskIndicator").then((text) => {
      assert(text, "HW1");
    });

    cy.get("#addBtn").click();
    cy.get("task-item:nth-of-type(2)")
      .shadow()
      .find("li")
      .find("#name")
      .type("{selectall}{backspace}HW2", { force: true })
      .trigger("change", { force: true });

    cy.get("#taskIndicator").then((text) => {
      assert(text, "HW1");
    });
  });

  it("Successfully change number of pomo sessions in HW1 to 4", () => {
    cy.get("#addBtn").click();
    cy.get("task-item")
      .shadow()
      .find("li")
      .find("#name")
      .type("{selectall}{backspace}HW1", { force: true })
      .trigger("change", { force: true });

    cy.get("task-item")
      .shadow()
      .find("li")
      .find("#taskNum")
      .find("form")
      .find("input")
      .type("{selectall}{backspace}4", { force: true });

    cy.get("#addBtn").click();
    cy.get("task-item:nth-of-type(2)")
      .shadow()
      .find("li")
      .find("#name")
      .type("{selectall}{backspace}HW2", { force: true })
      .trigger("change", { force: true });
  });

  it("Edge Case: Testing negative pomo number in task list", () => {
    cy.get("#addBtn").click();
    cy.get("task-item")
      .shadow()
      .find("li")
      .find("#name")
      .type("{selectall}{backspace}HW1", { force: true })
      .trigger("change", { force: true });

    cy.get("task-item")
      .shadow()
      .find("li")
      .find("#taskNum")
      .find("form")
      .find("input")
      .type("{selectall}{backspace}-1", { force: true });

    cy.get("#addBtn").click();
    cy.get("task-item:nth-of-type(2)")
      .shadow()
      .find("li")
      .find("#name")
      .type("{selectall}{backspace}HW2", { force: true })
      .trigger("change", { force: true });
  });

  it("Edge Case: Testing 0 pomo number in task list", () => {
    cy.get("#addBtn").click();
    cy.get("task-item")
      .shadow()
      .find("li")
      .find("#name")
      .type("{selectall}{backspace}HW1", { force: true })
      .trigger("change", { force: true });

    cy.get("task-item")
      .shadow()
      .find("li")
      .find("#taskNum")
      .find("form")
      .find("input")
      .type("{selectall}{backspace}0", { force: true });

    cy.get("#addBtn").click();
    cy.get("task-item:nth-of-type(2)")
      .shadow()
      .find("li")
      .find("#name")
      .type("{selectall}{backspace}HW2", { force: true })
      .trigger("change", { force: true });
  });

  it("Edge Case: Testing decimal input for pomo number in task list, should truncate to the integer", () => {
    cy.get("#addBtn").click();
    cy.get("task-item")
      .shadow()
      .find("li")
      .find("#name")
      .type("{selectall}{backspace}HW1", { force: true })
      .trigger("change", { force: true });

    cy.get("task-item")
      .shadow()
      .find("li")
      .find("#taskNum")
      .find("form")
      .find("input")
      .type("{selectall}{backspace}2.4", { force: true });

    cy.get("#addBtn").click();
    cy.get("task-item:nth-of-type(2)")
      .shadow()
      .find("li")
      .find("#name")
      .type("{selectall}{backspace}HW2", { force: true })
      .trigger("change", { force: true });
  });

  it("Remove task if spaces in title, display alert", () => {
    cy.get("#addBtn").click();
    cy.get("task-item")
      .shadow()
      .find("li")
      .find("#name")
      .type("{selectall}{backspace} ", { force: true })
      .trigger("change", { force: true });

    cy.on("window:alert", (txt) => {
      expect(txt).to.contains("You need to enter a valid task name.");
    });
  });

  it("Display alert when task name is null aka 0 char", () => {
    cy.get("#addBtn").click();
    cy.get("task-item")
      .shadow()
      .find("li")
      .find("#name")
      .type("{selectall}{backspace}", { force: true })
      .trigger("change", { force: true });

    cy.on("window:alert", (txt) => {
      expect(txt).to.contains("You need to enter a valid task name.");
    });
  });

  it("Alert pops up when trying to add duplicate task names (HW1) to task list", () => {
    cy.get("#addBtn").click();
    cy.get("task-item")
      .shadow()
      .find("li")
      .find("#name")
      .type("{selectall}{backspace} HW1", { force: true })
      .trigger("change", { force: true });

    cy.get("#addBtn").click();
    cy.get("task-item:nth-of-type(2)")
      .shadow()
      .find("li")
      .find("#name")
      .type("{selectall}{backspace} HW1", { force: true })
      .trigger("change", { force: true });

    cy.on("window:alert", (txt) => {
      expect(txt).to.contains(
        "You cannot have the same name as a previous task"
      );
    });
  });

  it("Alert pops up when trying to enter a new task without entering valid name for previous task", () => {
    cy.get("#addBtn").click();
    cy.get("#addBtn").click();

    cy.on("window:alert", (txt) => {
      expect(txt).to.contains(
        "You already have a New Task waiting to be customized"
      );
    });
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
      expect($el).to.have.css("background-color", "rgb(187, 187, 187)");
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
      expect($el).to.have.css("background-color", "rgb(187, 187, 187)");
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
      expect($el).to.have.css("background-color", "rgb(187, 187, 187)");
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
      expect($el).to.have.css("background-color", "rgb(187, 187, 187)");
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
      expect($el).to.have.css("background-color", "rgb(187, 187, 187)");
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
      expect($el).to.have.css("background-color", "rgb(187, 187, 187)");
    });

    cy.get("#done").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(41, 71, 181)");
    });
  });

  it("Successfully move HW1 to done list on clicking the switch button", () => {
    cy.get("#addBtn").click();
    cy.get("task-item")
      .shadow()
      .find("li")
      .find("#name")
      .type("{selectall}{backspace}HW1", { force: true })
      .trigger("change", { force: true });

    cy.get("#addBtn").click();
    cy.get("task-item:nth-of-type(2)")
      .shadow()
      .find("li")
      .find("#name")
      .type("{selectall}{backspace}HW2", { force: true })
      .trigger("change", { force: true });

    cy.get("task-item:nth-of-type(1)")
      .shadow()
      .find("li")
      .find("#moveToNewList")
      .click();
  });

  it("Successfuly deletes the first task from task list", () => {
    cy.get("#addBtn").click();
    cy.get("task-item")
      .shadow()
      .find("li")
      .find("#name")
      .type("{selectall}{backspace}HW1", { force: true })
      .trigger("change", { force: true });

    cy.get("#addBtn").click();
    cy.get("task-item:nth-of-type(2)")
      .shadow()
      .find("li")
      .find("#name")
      .type("{selectall}{backspace}HW2", { force: true })
      .trigger("change", { force: true });

    cy.get("task-item:nth-of-type(1)")
      .shadow()
      .find("li")
      .find("#removeTask")
      .click();

    cy.get("#addBtn").click();
  });

  it("Successfuly deletes the last task from task list", () => {
    cy.get("#addBtn").click();
    cy.get("task-item")
      .shadow()
      .find("li")
      .find("#name")
      .type("{selectall}{backspace}HW1", { force: true })
      .trigger("change", { force: true });

    cy.get("#addBtn").click();
    cy.get("task-item:nth-of-type(2)")
      .shadow()
      .find("li")
      .find("#name")
      .type("{selectall}{backspace}HW2", { force: true })
      .trigger("change", { force: true });

    cy.get("task-item:nth-of-type(2)")
      .shadow()
      .find("li")
      .find("#removeTask")
      .click();

    cy.get("#addBtn").click();
  });

  it("Successfuly moves a task up to the top in the To-Do list", () => {
    cy.get("#addBtn").click();
    cy.get("task-item")
      .shadow()
      .find("li")
      .find("#name")
      .type("{selectall}{backspace}HW1", { force: true })
      .trigger("change", { force: true });

    cy.get("#addBtn").click();
    cy.get("task-item:nth-of-type(2)")
      .shadow()
      .find("li")
      .find("#name")
      .type("{selectall}{backspace}HW2", { force: true })
      .trigger("change", { force: true });

    cy.get("task-item:nth-of-type(2)")
      .shadow()
      .find("li")
      .find(".all-move-btns")
      .find("#workTask")
      .click();

    cy.get("#taskIndicator").then((text) => {
      assert(text, "HW2");
    });
  });

  it("Edge case: move task up to the top for the top task does nothing in the To-Do list", () => {
    cy.get("#addBtn").click();
    cy.get("task-item")
      .shadow()
      .find("li")
      .find("#name")
      .type("{selectall}{backspace}HW1", { force: true })
      .trigger("change", { force: true });

    cy.get("#addBtn").click();
    cy.get("task-item:nth-of-type(2)")
      .shadow()
      .find("li")
      .find("#name")
      .type("{selectall}{backspace}HW2", { force: true })
      .trigger("change", { force: true });

    cy.get("task-item:nth-of-type(2)")
      .shadow()
      .find("li")
      .find(".all-move-btns")
      .find("#workTask")
      .click();

    cy.get("task-item:nth-of-type(2)")
      .shadow()
      .find("li")
      .find(".all-move-btns")
      .find("#workTask")
      .click();
  });

  it("Successfuly moves a task up 1 in the To-Do list", () => {
    cy.get("#addBtn").click();
    cy.get("task-item")
      .shadow()
      .find("li")
      .find("#name")
      .type("{selectall}{backspace}HW1", { force: true })
      .trigger("change", { force: true });

    cy.get("#addBtn").click();
    cy.get("task-item:nth-of-type(2)")
      .shadow()
      .find("li")
      .find("#name")
      .type("{selectall}{backspace}HW2", { force: true })
      .trigger("change", { force: true });

    cy.get("task-item:nth-of-type(1)")
      .shadow()
      .find("li")
      .find(".all-move-btns")
      .find(".move-btns")
      .find(".up-btn")
      .click();
  });

  it("Edge case: move task up button on top task does nothing in the To-Do list", () => {
    cy.get("#addBtn").click();
    cy.get("task-item")
      .shadow()
      .find("li")
      .find("#name")
      .type("{selectall}{backspace}HW1", { force: true })
      .trigger("change", { force: true });

    cy.get("#addBtn").click();
    cy.get("task-item:nth-of-type(2)")
      .shadow()
      .find("li")
      .find("#name")
      .type("{selectall}{backspace}HW2", { force: true })
      .trigger("change", { force: true });

    cy.get("task-item:nth-of-type(1)")
      .shadow()
      .find("li")
      .find(".all-move-btns")
      .find(".move-btns")
      .find(".up-btn")
      .click();

    cy.get("task-item:nth-of-type(1)")
      .shadow()
      .find("li")
      .find(".all-move-btns")
      .find(".move-btns")
      .find(".up-btn")
      .click();

    cy.get("#taskIndicator").then((text) => {
      assert(text, "HW1");
    });
  });

  it("Successfully moves a task down 1 in the To-Do list", () => {
    cy.get("#addBtn").click();
    cy.get("task-item")
      .shadow()
      .find("li")
      .find("#name")
      .type("{selectall}{backspace}HW1", { force: true })
      .trigger("change", { force: true });

    cy.get("#addBtn").click();
    cy.get("task-item:nth-of-type(2)")
      .shadow()
      .find("li")
      .find("#name")
      .type("{selectall}{backspace}HW2", { force: true })
      .trigger("change", { force: true });

    cy.get("task-item:nth-of-type(1)")
      .shadow()
      .find("li")
      .find(".all-move-btns")
      .find(".move-btns")
      .find(".down-btn")
      .click();
  });

  it("Edge case: move task down button on bottom task does nothing in the To-Do list", () => {
    cy.get("#addBtn").click();
    cy.get("task-item")
      .shadow()
      .find("li")
      .find("#name")
      .type("{selectall}{backspace}HW1", { force: true })
      .trigger("change", { force: true });

    cy.get("#addBtn").click();
    cy.get("task-item:nth-of-type(2)")
      .shadow()
      .find("li")
      .find("#name")
      .type("{selectall}{backspace}HW2", { force: true })
      .trigger("change", { force: true });

    cy.get("task-item:nth-of-type(1)")
      .shadow()
      .find("li")
      .find(".all-move-btns")
      .find(".move-btns")
      .find(".down-btn")
      .click();

    cy.get("task-item:nth-of-type(1)")
      .shadow()
      .find("li")
      .find(".all-move-btns")
      .find(".move-btns")
      .find(".down-btn")
      .click();

    cy.get("task-item:nth-of-type(1)")
      .shadow()
      .find("li")
      .find(".all-move-btns")
      .find(".move-btns")
      .find(".down-btn")
      .click();
  });

  it("Successfuly switches a task from To-Do to Done and Done to To-Do", () => {
    cy.get("#addBtn").click();
    cy.get("task-item")
      .shadow()
      .find("li")
      .find("#name")
      .type("{selectall}{backspace}HW1", { force: true })
      .trigger("change", { force: true });

    cy.get("#addBtn").click();
    cy.get("task-item:nth-of-type(2)")
      .shadow()
      .find("li")
      .find("#name")
      .type("{selectall}{backspace}HW2", { force: true })
      .trigger("change", { force: true });

    cy.get("task-item:nth-of-type(1)")
      .shadow()
      .find("li")
      .find("#moveToNewList")
      .click();

    cy.get("#done").click();
    cy.get("#to-do").click();
    cy.get("task-item:nth-of-type(2)")
      .shadow()
      .find("li")
      .find("#moveToNewList")
      .click();
  });

  it("Successfuly deletes all tasks from task list", () => {
    cy.get("#addBtn").click();
    cy.get("task-item")
      .shadow()
      .find("li")
      .find("#name")
      .type("{selectall}{backspace}HW1", { force: true })
      .trigger("change", { force: true });

    cy.get("#addBtn").click();
    cy.get("task-item:nth-of-type(2)")
      .shadow()
      .find("li")
      .find("#name")
      .type("{selectall}{backspace}HW2", { force: true })
      .trigger("change", { force: true });

    cy.get("#done").click();
    cy.get("#clearBtn").click();
  });

  it("Spamming clear in done tab does not do anything", () => {
    cy.get("#addBtn").click();
    cy.get("task-item")
      .shadow()
      .find("li")
      .find("#name")
      .type("{selectall}{backspace}HW1", { force: true })
      .trigger("change", { force: true });

    cy.get("#addBtn").click();
    cy.get("task-item:nth-of-type(2)")
      .shadow()
      .find("li")
      .find("#name")
      .type("{selectall}{backspace}HW2", { force: true })
      .trigger("change", { force: true });

    cy.get("#done").click();
    cy.get("#clearBtn").click();
    cy.get("#clearBtn").click();
    cy.get("#clearBtn").click();
  });
});

describe("Testing default time passed check from Work to Short Break (automatic)", () => {
  beforeEach(() => {
    cy.clock();
    cy.visit("index.html");
  });

  it("time passed check from Work to Short Break", () => {
    cy.get("#StartButton").click();
    cy.tick(1502000); // 25 minutes and 2 seconds

    cy.get("#shortBreak").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(61, 89, 138)");
    });
  });

  it("time passed check from Short Break to Work (automatic)", () => {
    cy.get("#StartButton").click();
    cy.tick(1500000); // 25 minutes
    cy.tick(5 * 60 * 1000); // 5 minutes
    cy.tick(3000); // 30 minutes and 2 seconds (Work 25 Minutes, Short 5 Minutes)

    cy.get("#workTime").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(201, 101, 103)");
    });
  });

  it("Check if current task in task list with 1 pomo moves to done after 1 pomo (automatic)", () => {
    cy.get("#StartButton").click();
    cy.get("#addBtn").click();
    cy.get("task-item")
      .shadow()
      .find("li")
      .find("#name")
      .type("{selectall}{backspace}HW1", { force: true })
      .trigger("change", { force: true });
    cy.tick(1500000); // 25 minutes

    cy.get("#workTime").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(88, 131, 206)");
    });
  });

  it("Check if # pomo cycles decreases after 1 work session and resets after 0 (automatic)", () => {
    cy.get("#StartButton").click();
    // 4 pomos left
    cy.tick(1500000); // 25 minutes
    cy.get("#seshLeft").then((text) => {
      assert(text, "4/4");
    });
    // 3 pomos left
    cy.tick(5 * 60 * 1000 + 1500000);
    cy.get("#seshLeft").then((text) => {
      assert(text, "3/4");
    });
    // 2 pomos left
    cy.tick(5 * 60 * 1000 + 1500000);
    cy.get("#seshLeft").then((text) => {
      assert(text, "2/4");
    });
    // 1 pomos left
    cy.tick(5 * 60 * 1000 + 1500000);
    cy.get("#seshLeft").then((text) => {
      assert(text, "1/4");
    });
    // 0 pomos left
    cy.tick(5 * 60 * 1000 + 1500000);
    cy.get("#seshLeft").then((text) => {
      assert(text, "0/4");
    });
    // reset
    cy.tick(5 * 60 * 1000 + 1500000);
    cy.get("#seshLeft").then((text) => {
      assert(text, "4/4");
    });

    cy.get("#workTime").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(201, 101, 103)");
    });
  });
});

describe("Testing pomo session to long break (default inputs in automatic)", () => {
  beforeEach(() => {
    cy.clock();
    cy.visit("index.html");
  });

  let work = 1500000;
  let shortB = 5 * 60 * 1000;
  it("4 work sessions before long break", () => {
    cy.get("#StartButton").click();
    cy.tick(work); // 25 minutes work session
    cy.tick(shortB); // 5 minutes short break
    cy.tick(work); // 25 minutes work session
    cy.tick(shortB); // 5 minutes short break
    cy.tick(work); // 25 minutes work session
    cy.tick(shortB); // 5 minutes short break
    cy.tick(work); // 25 minutes work session

    cy.get("#workTime").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(41, 71, 181)");
    });
  });
});

describe("Testing pomo session to long break (1 min work session in automatic)", () => {
  beforeEach(() => {
    cy.clock();
    cy.visit("index.html");
  });

  let work = 60000;
  let shortB = 5 * 60000;
  it("4 one-minute work sessions before long break", () => {
    cy.get("#workTimeInput")
      .type("{selectall}{backspace}1", { force: true })
      .trigger("change", { force: true });

    cy.get("#numWork")
      .type("{selectall}{backspace}4", { force: true })
      .trigger("change", { force: true });
    cy.get("#numWork").then(($el) => {
      expect($el).to.have.value("4");
    });
    cy.get("#StartButton").click();
    cy.tick(work); // 25 minutes work session
    cy.tick(shortB); // 5 minutes break session
    cy.tick(work);
    cy.tick(shortB);
    cy.tick(work);
    cy.tick(shortB);
    cy.tick(work); // after 4 work sessions, do long break
    //cy.tick(longB); stack breaks if trying to check after this

    cy.get("#workTime").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(41, 71, 181)");
    });
  });
});

describe("Testing 4 pomo sessions to long break two times in a row (1 min work session in automatic)", () => {
  beforeEach(() => {
    cy.clock();
    cy.visit("index.html");
  });

  let work = 60000;
  let shortB = 5 * 60000;
  let longB = 15 * 60000;
  it("1 minute each for work, short break, long break session", () => {
    cy.get("#workTimeInput")
      .type("{selectall}{backspace}1", { force: true })
      .trigger("change", { force: true });

    cy.get("#numWork")
      .type("{selectall}{backspace}4", { force: true })
      .trigger("change", { force: true });
    cy.get("#numWork").then(($el) => {
      expect($el).to.have.value("4");
    });
    cy.get("#StartButton").click();
    cy.tick(4 * work + 3 * shortB);
    cy.tick(longB);
    cy.tick(4 * work + 3 * shortB);

    cy.get("#workTime").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(41, 71, 181)");
    });
  });
});

describe("Testing automatic/manual mode", () => {
  beforeEach(() => {
    cy.clock();
    cy.visit("index.html");
  });

  let work = 1500000;
  let shortB = 5 * 60 * 1000;
  let longB = 15 * 60 * 1000;
  let workTheme = "rgb(201, 101, 103)";
  let shortTheme = "rgb(88, 131, 206)";
  let longTheme = "rgb(41, 71, 181)";
  it("Switching from automatic to manual mode when timer is running should continue to run", () => {
    cy.get("#workTimeInput")
      .type("{selectall}{backspace}1", { force: true })
      .trigger("change", { force: true });

    // Automatic mode
    cy.get("#StartButton").click();
    cy.get("#timer").contains("01:00");
    cy.tick(6000);
    cy.get("#timer").contains("00:54");
    //Switch to manual mode
    cy.get("#autoSwitch")
      .check({ force: true })
      .trigger("click", { force: true });

    cy.get("#timer").contains("00:54");

    cy.get("#workTime").should(($el) => {
      expect($el).to.have.css("background-color", workTheme);
    });
  });

  it("Switching from automatic to manual mode when timer is not running should display 'Stopped'", () => {
    cy.get("#workTimeInput")
      .type("{selectall}{backspace}1", { force: true })
      .trigger("change", { force: true });

    // Automatic mode
    cy.get("#StartButton").click();
    cy.get("#timer").contains("01:00");
    cy.tick(6000);
    cy.get("#StopButton").click();
    cy.get("#timer").contains("Stopped");

    //Switch to manual mode
    cy.get("#autoSwitch")
      .check({ force: true })
      .trigger("click", { force: true });

    cy.get("#timer").contains("Stopped");

    cy.get("#workTime").should(($el) => {
      expect($el).to.have.css("background-color", workTheme);
    });
  });

  it("Switching from manual to automatic mode when timer is running should continue to run (work session)", () => {
    cy.get("#workTimeInput")
      .type("{selectall}{backspace}1", { force: true })
      .trigger("change", { force: true });

    //Switch to manual mode
    cy.get("#autoSwitch")
      .check({ force: true })
      .trigger("click", { force: true });

    // Automatic mode
    cy.get("#workTime").click();
    cy.get("#timer").contains("01:00");
    cy.tick(6000);
    cy.get("#timer").contains("00:54");

    //Switch to automatic mode
    cy.get("#autoSwitch")
      .uncheck({ force: true })
      .trigger("click", { force: true });

    cy.get("#timer").contains("00:54");

    cy.get("#workTime").should(($el) => {
      expect($el).to.have.css("background-color", workTheme);
    });
  });

  it("Switching from manual to automatic mode when timer is running should continue to run (short break)", () => {
    cy.get("#shortBreakTimeInput")
      .type("{selectall}{backspace}1", { force: true })
      .trigger("change", { force: true });

    //Switch to manual mode
    cy.get("#autoSwitch")
      .check({ force: true })
      .trigger("click", { force: true });

    // Automatic mode
    cy.get("#shortBreak").click();
    cy.get("#timer").contains("01:00");
    cy.tick(6000);
    cy.get("#timer").contains("00:54");

    //Switch to automatic mode
    cy.get("#autoSwitch")
      .uncheck({ force: true })
      .trigger("click", { force: true });

    cy.get("#timer").contains("00:54");

    cy.get("#workTime").should(($el) => {
      expect($el).to.have.css("background-color", shortTheme);
    });
  });

  it("Switching from manual to automatic mode when timer is running should continue to run (long break)", () => {
    cy.get("#longBreakTimeInput")
      .type("{selectall}{backspace}1", { force: true })
      .trigger("change", { force: true });

    //Switch to manual mode
    cy.get("#autoSwitch")
      .check({ force: true })
      .trigger("click", { force: true });

    // Automatic mode
    cy.get("#longBreak").click();
    cy.get("#timer").contains("01:00");
    cy.tick(6000);
    cy.get("#timer").contains("00:54");

    //Switch to automatic mode
    cy.get("#autoSwitch")
      .uncheck({ force: true })
      .trigger("click", { force: true });

    cy.get("#timer").contains("00:54");

    cy.get("#workTime").should(($el) => {
      expect($el).to.have.css("background-color", longTheme);
    });
  });

  it("Switching from manual to automatic mode when timer is not running should display 'Stopped' (long break)", () => {
    //Switch to manual mode
    cy.get("#autoSwitch")
      .check({ force: true })
      .trigger("click", { force: true });

    // Automatic mode
    cy.get("#longBreak").click();
    cy.get("#timer").contains("15:00");
    cy.tick(6000);
    cy.get("#StopButton").click();
    cy.get("#timer").contains("Stopped");

    //Switch to automatic mode
    cy.get("#autoSwitch")
      .uncheck({ force: true })
      .trigger("click", { force: true });

    cy.get("#timer").contains("Stopped");

    cy.get("#workTime").should(($el) => {
      expect($el).to.have.css("background-color", longTheme);
    });
  });

  it("Switching from manual to automatic mode when timer is not running should display 'Stopped' (short break)", () => {
    //Switch to manual mode
    cy.get("#autoSwitch")
      .check({ force: true })
      .trigger("click", { force: true });

    // Automatic mode
    cy.get("#shortBreak").click();
    cy.get("#timer").contains("05:00");
    cy.tick(6000);
    cy.get("#StopButton").click();
    cy.get("#timer").contains("Stopped");

    //Switch to automatic mode
    cy.get("#autoSwitch")
      .uncheck({ force: true })
      .trigger("click", { force: true });

    cy.get("#timer").contains("Stopped");

    cy.get("#workTime").should(($el) => {
      expect($el).to.have.css("background-color", shortTheme);
    });
  });

  it("Switching from manual to automatic mode when timer is not running should display 'Stopped' (work session)", () => {
    //Switch to manual mode
    cy.get("#autoSwitch")
      .check({ force: true })
      .trigger("click", { force: true });

    // Automatic mode
    cy.get("#workTime").click();
    cy.get("#timer").contains("25:00");
    cy.tick(6000);
    cy.get("#StopButton").click();
    cy.get("#timer").contains("Stopped");

    //Switch to automatic mode
    cy.get("#autoSwitch")
      .uncheck({ force: true })
      .trigger("click", { force: true });

    cy.get("#timer").contains("Stopped");

    cy.get("#workTime").should(($el) => {
      expect($el).to.have.css("background-color", workTheme);
    });
  });

  it("Manual mode: work timer correctly runs and ends without moving on to short break", () => {
    //Switch to manual mode
    cy.get("#autoSwitch")
      .check({ force: true })
      .trigger("click", { force: true });

    cy.get("#workTime").click();
    cy.get("#timer").contains("25:00");
    cy.tick(work);
    cy.get("#timer").contains("Stopped");
    cy.get("#workTime").should(($el) => {
      expect($el).to.have.css("background-color", workTheme);
    });
  });

  it("Manual mode: short break correctly runs and ends without moving on to work session", () => {
    //Switch to manual mode
    cy.get("#autoSwitch")
      .check({ force: true })
      .trigger("click", { force: true });

    cy.get("#shortBreak").click();
    cy.get("#timer").contains("05:00");
    cy.tick(shortB);
    cy.get("#timer").contains("Stopped");
    cy.get("#workTime").should(($el) => {
      expect($el).to.have.css("background-color", shortTheme);
    });
  });

  it("Manual mode: long break correctly runs and ends without moving on to work session", () => {
    //Switch to manual mode
    cy.get("#autoSwitch")
      .check({ force: true })
      .trigger("click", { force: true });

    cy.get("#longBreak").click();
    cy.get("#timer").contains("15:00");
    cy.tick(longB);
    cy.get("#timer").contains("Stopped");
    cy.get("#workTime").should(($el) => {
      expect($el).to.have.css("background-color", longTheme);
    });
  });
});

describe("Testing light and dark mode", () => {
  beforeEach(() => {
    cy.visit("index.html");
  });

  it("Switch from light mode to dark mode", () => {
    //Turn on dark mode
    cy.get("#darkMode")
      .check({ force: true })
      .trigger("click", { force: true });

    cy.get("#autoText").then((fill) => {
      assert(fill, "rgb(195, 195, 195)");
    });
    cy.get("body").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(54, 54, 54)");
    });
  });

  it.only("Switch from dark mode to light mode", () => {
    //Turn on dark mode
    cy.get("#darkMode")
      .check({ force: true })
      .trigger("click", { force: true });

    cy.get("#autoText").then((fill) => {
      assert(fill, "rgb(195, 195, 195)");
    });
    cy.get("body").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(54, 54, 54)");
    });

    //Switch back to light mode
    cy.get("#darkMode")
      .uncheck({ force: true })
      .trigger("click", { force: true });

    cy.get("#autoText").then((fill) => {
      assert(fill, "rgb(0, 0, 0)");
    });
    cy.get("body").should(($el) => {
      expect($el).to.have.css("background-color", "rgb(245, 245, 245)");
    });
  });
});

describe("Testing # pomo cycles work correctly from 5 pomo cycles to 10", () => {
  beforeEach(() => {
    cy.clock();
    cy.visit("index.html");
  });

  let work = 1500000;
  let shortB = 5 * 60 * 1000;
  let longTheme = "rgb(41, 71, 181)";

  for (let i = 5; i < 11; i++) {
    it("Test " + i + " pomo cycles before a long break", () => {
      cy.get("#numWork")
        .type("{selectall}{backspace}" + i, { force: true })
        .trigger("change", { force: true });

      cy.get("#numWork").then(($el) => {
        expect($el).to.have.value(i);
      });

      cy.get("#StartButton").click();
      cy.tick(i * work + (i - 1) * shortB);

      cy.get("#workTime").should(($el) => {
        expect($el).to.have.css("background-color", longTheme);
      });
    });
  }
});
