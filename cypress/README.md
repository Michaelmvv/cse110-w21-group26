# Cypress e2e and Unit testing

### Installation
- Make sure your project directory is ready with `npm init -y`

- Install Cypress using `npm install cypress --save-dev` in the root directory of the project.

- More information on OS requirements can be found [here](https://docs.cypress.io/guides/getting-started/installing-cypress.html#)

### Usage

#### Test File Location
- Cypress test files are located inside [integration/custom-tests.js](integration/custom-tests.js)

#### What Are We Testing?
- We mainly use Cypress to unit test and e2e test our UI. For example, does each button press execute what we want it to do?

#### How It Works:
- Each `describe()` block denotes a test suite (group of related tests) and each `it()` block denotes a single test.
- The description of each test is indicated inside each block like: `describe("Click on Start button, timer changes to 25:00")`
- Single tests can be run using `.only` after each `describe()` or `it` block and Cypress will *only* run these tests (if used with `describe()`, Cypress will run all the tests inside `describe()`).
- Example: `describe.only(...)` or `it.only(...)`

- Similarly, you can skip tests by using `.skip` after each `describe()` or `it` block and Cypress will *not* run these tests (if used with `describe()`, Cypress will *not* run all the tests inside `describe()`).
- Example: `describe.skip(...)` or `it.skip(...)`

- Most tests need a reference to an HTML DOM element and we can refer to an element using `cy.get(...)`. Cypress uses similar syntax to CSS to access element classes `.` and id's `#`.

- A list of Cypress commands can be found [here](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress.html#Chains-of-Commands).

#### Running Cypress
- To open Cypress using their UI, use `npx cypress open` (may take a few minutes to load up) and navigate to the test file (custom-tests.js). A new browser window will open up and you can see the tests run.

- To run Cypress test files in the command line (takes longer than using Cypress's UI), use `npx cypress run`

##### Code Coverage (not working)
- To see our attempt at Cypress code coverage, please navigate to the `code-coverage` branch.
