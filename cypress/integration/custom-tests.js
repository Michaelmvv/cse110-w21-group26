describe('Test Work Timer Button', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  it('When work timer is clicked with input of 25, check if timer display updates to 25:00 correctly', () => {
      cy.get('#workTime').click();
      cy.get('#workTimeInput').then($el => {
        expect($el).to.have.value("25");
      });
      cy.get('#timer').contains("25:00");
    });

    // Checking style: https://github.com/cypress-io/cypress/issues/1393
  it('When work timer is clicked, check if work timer is dark pink', () => {
      cy.get('#workTime').click();

      // work timer should be dark pink
      cy.get('#workTime').should(($el) => {
        expect($el).to.have.css('background-color', 'rgb(158, 90, 99)'); // Must use rgb in cypress
      });
    });

  it('When work timer is clicked, check if short break changes to light pink', () => {
      cy.get('#workTime').click();
      cy.get('#shortBreak').should(($el) => {
        expect($el).to.have.css('background-color', 'rgb(233, 121, 121)'); // Must use rgb in cypress
      });
    });

  it('When work timer is clicked, check if long break changes to light pink', () => {
      cy.get('#workTime').click();
      cy.get('#longBreak').should(($el) => {
        expect($el).to.have.css('background-color', 'rgb(233, 121, 121)'); // Must use rgb in cypress
      });
    });

  it('When work timer is clicked, check if start button changes to light pink', () => {
      cy.get('#workTime').click();

      cy.get('#StartButton').should(($el) => {
        expect($el).to.have.css('background-color', 'rgb(233, 121, 121)'); // Must use rgb in cypress
      });
    });

  it('When work timer is clicked, check if stop button changes to light pink', () => {
      cy.get('#workTime').click();

      cy.get('#StopButton').should(($el) => {
        expect($el).to.have.css('background-color', 'rgb(233, 121, 121)'); // Must use rgb in cypress
      });
      
    });
  
  // Check if circle timer changes???

});

describe('Test Long Break Button', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  it('When Long Break is clicked with input of 15, check if timer display updates to 15:00 correctly', () => {
    cy.get('#longBreak').click();
    cy.get('#longBreakTimeInput').then($el => {
      expect($el).to.have.value("15");
    });
    cy.get('#timer').contains("15:00");
  });

  it('When Long Break is clicked, check if long break button turns dark pink', () => {
    cy.get('#longBreak').click();
    cy.get('#longBreak').should(($el) => {
      expect($el).to.have.css('background-color', 'rgb(158, 90, 99)'); // Must use rgb in cypress
    });
  });

  it('When Long Break button is clicked, check if short break button change to dark blue', () => {
    cy.get('#longBreak').click();
    cy.get('#shortBreak').should(($el) => {
      expect($el).to.have.css('background-color', 'rgb(41, 71, 181)'); // Must use rgb in cypress
    });
  });

  it('When Long Break button is clicked, check if work timer button change to dark blue', () => {
    cy.get('#longBreak').click();

    cy.get('#workTime').should(($el) => {
      expect($el).to.have.css('background-color', 'rgb(41, 71, 181)'); // Must use rgb in cypress
    });
  });

  it('When Long Break button is clicked, check if start button change to dark blue', () => {
    cy.get('#longBreak').click();

    cy.get('#StartButton').should(($el) => {
      expect($el).to.have.css('background-color', 'rgb(41, 71, 181)'); // Must use rgb in cypress
    });
  });

  it('When Long Break button is clicked, check if stop button change to dark blue', () => {
    cy.get('#longBreak').click();

    cy.get('#StopButton').should(($el) => {
      expect($el).to.have.css('background-color', 'rgb(41, 71, 181)'); // Must use rgb in cypress
    });
  });
});

describe('Test Short Break Button', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  it('When Short Break is clicked with input of 5, check if timer display updates to 05:00 correctly', () => {
    cy.get('#shortBreak').click();
    cy.get('#shortBreakTimeInput').then($el => {
      expect($el).to.have.value("5");
    });
    cy.get('#timer').contains("05:00");
  });

  // Checking style: https://github.com/cypress-io/cypress/issues/1393
  it('When Short Break is clicked, check if short break button changes to dark pink', () => {
      cy.get('#shortBreak').click();
      cy.get('#shortBreak').should(($el) => {
        expect($el).to.have.css('background-color', 'rgb(158, 90, 99)'); // Must use rgb in cypress
      })
    });

  it('When Short Break is clicked, check if long break button changes to lighter blue', () => {
      cy.get('#shortBreak').click();
      cy.get('#longBreak').should(($el) => {
        expect($el).to.have.css('background-color', 'rgb(88, 131, 206)'); // Must use rgb in cypress
      })
    });

    it('When Short Break is clicked, check if work timer button changes to lighter blue', () => {
      cy.get('#shortBreak').click();
      cy.get('#workTime').should(($el) => {
        expect($el).to.have.css('background-color', 'rgb(88, 131, 206)'); // Must use rgb in cypress
      })
    });

    it('When Short Break is clicked, check if Start button changes to lighter blue', () => {
      cy.get('#shortBreak').click();
      cy.get('#StartButton').should(($el) => {
        expect($el).to.have.css('background-color', 'rgb(88, 131, 206)'); // Must use rgb in cypress
      })
    });

    it('When Short Break is clicked, check if Stop button changes to lighter blue', () => {
      cy.get('#shortBreak').click();
      cy.get('#StopButton').should(($el) => {
        expect($el).to.have.css('background-color', 'rgb(88, 131, 206)'); // Must use rgb in cypress
      })
    });
});