describe('Pomo tests', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500/index.html');
  });

  it('First Test', () => {
    expect(true).to.equal(true);
  });

  // When work timer is clicked, check if timer display updates correctly
  // When work timer is clicked, check if colors change to pink
  // Check if circle timer changes???

  // When Long Break is clicked, check if timer display updates correctly
  // When Long Break is clicked, check if colors change to light blue

  // When Short Break is clicked, check if timer display updates correctly
  // When Short Break is clicked, check if colors change to darker blue

});