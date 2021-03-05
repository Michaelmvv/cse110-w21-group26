# [What Tools on the development side will we be using for testing and code quality]

* Status: [accepted] <!-- optional -->
* Deciders: [(everyone) Weekly Meeting] <!-- optional -->
* Date: [2021-02-25 when the decision was last updated] <!-- optional -->

Technical Story: [We need to finalize the constraints that we have for the project] <!-- optional -->

## Context and Problem Statement

[To test the robustness of our Pomodoro timer, we will stick to testing frameworks used in the scope of this course like Cypress for e2e testing and unit testing]

## Decision Drivers <!-- optional -->

* Web-Application compatible.
* Take care of bugs we find before our users find them.
* Have code that ensures our app is safe, secure, and reliable.
* Need to follow strict deadlines to complete this project.
* … <!-- numbers of drivers can vary -->

## Considered Options

* Use CodeFactor for code quality maintenance.
* Use Codacy for code quality maintenance.
* Use Jest for our testing framework.
* Use Cypress as our testing framework.
* … <!-- numbers of options can vary -->

## Decision Outcome

UPDATE on 2/17/2021 - We will be using Jest as our testing framework.
UPDATE on 2/25/2021 - In addition to Jest, we will be using Cypress as another testing framework.
UPDATE on 2/27/2021 - We are removing Jest as a testing framework and will solely use Cypress.

Chosen option: We have decided to use options 1 and option 4. Option 1 is chosen because CodeFactor was one of the few free code quality tools for our CI/CD pipeline for a private GitHub repository instead of a GitHub organization. We chose option 4 because after exploring this testing framework, Cypress allows us to test user interface interactions in addition to unit testing. We will not be using Jest because originally we were using it for unit testing but since Cypress is able to do that as well, we are only using Cypress.
<br/>


### Positive Consequences <!-- optional -->

* Ensure that our code is reliable with a code quality tool that catches issues during the development process.
* Ensure that our code is safe, secure, and works as expected with robust integration and unit testing.

### Negative Consequences <!-- optional -->

* Cost time exploring testing frameworks.
* Cost time exploring different code quality tools.

## Pros and Cons of the Options <!-- optional -->

### [option 1: Use CodeFactor for code quality maintenance. ]

* Good, because it catches issues easily overlooked like "mixed tabs and spaces".
* Good, because it is useable in a private GitHub repository.
* Good, because it is free.
* Bad, because some errors have to do with style when code functionality works as expected.

### [option 2: Use Codacy for code quality maintenance. ]

* Good, because it provides more context to code quality issues.
* Bad, because it requires us to use a GitHub Organization but we are supposed to use a private repository.

### [option 3: Use Jest for our testing framework.]

* Good, because Jest is easy to set up locally and on our CI/CD Pipeline
* Good, because Jest has official documentation we can use as a resource for unit testing.
* Bad, because Jest is harder to test button clicks and DOM changes; easier to test functions that have a return value.
* Bad, because Jest may interfere with Cypress tests (solved by configuring Jest to ignore Cypress test files).

### [option 4: Use Cypress as our testing framework.]

* Good, because Cypress allows testing user interactions with our interface easily.
* Good, because Cypress allows unit testing.
* Bad, because it may interfere with our previous testing framework, Jest (solved by checking whether module exists in our main JavaScript file for the module.exports line needed for Jest).

<!-- markdownlint-disable-file MD013 -->
