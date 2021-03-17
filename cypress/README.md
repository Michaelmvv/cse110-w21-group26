# Cypress e2e and Unit testing

### Installation Steps
- This can take a few minutes to install cypress. In your terminal, navigate to the directory you wish to install Cypress in.

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

##### Code Coverage (Not working)
1. Install the dependencies below:
- `npm i babel-plugin-istanbul` istanbul is a code instrument tool that is compatible with Cypress.
- `npm i istanbul-lib-coverage`
- `npm i nyc` Helps instrument code.
- `npm i @cypress/code-coverage` This is a Cypress plugin for collecting test coverage during Cypress tests.

2. Import statements inside `cypress/support/index.js` and `cypress/plugins/index.js` files.
- Inside `cypress/support/index.js`, add `import '@cypress/code-coverage/support'`.
- Inside `cypress/plugins/index.js`, add
```
module.exports = (on, config) => {
  require('@cypress/code-coverage/task')(on, config)
  return config
}
```

3. Add plugins to the .babelrc file (if you do not have it, go to your terminal and type `touch .babelrc`). This goes inside .babelrc:

```
{
  "plugins": ["istanbul"]
}
```

4. Instrument the code. Cypress does not instrument your code for you. Basically what instrumenting does is wraps each line of code with a counter so that when Cypress runs the tests, the counter increments when that line of code gets executed.

- Use `npx nyc instrument --compact=false main.js instrumented` to instrument the main.js code into a folder labeled `instrumented`.
- Use `npx nyc instrument --compact=false task-item.js instrumented` to instrument the task-item.js code into a folder labeled `instrumented`.

5. Run Cypress using `npx cypress open`
6. Code coverage can be found under `coverage/lcov-report` and you can open the `index.html` file in a browser to see code coverage.