# Development Guide
- Our Pomodoro Timer Web Application is created using vanilla HTML, CSS, and JavaScript inside the following paths:

### HTML
- Our main html page and code relevant to what is seen on the webpage is located inside [index.html](index.html)
- If someone tries to access a non-existing webpage on our site, we have a custom 404 page located in [404.html](404.html)

### CSS
- Our style definitions for HTML elements are located inside [main.css](main.css)

### JavaScript
- The functions that define specific actions on various user inputs for the timer and settings are located in [main.js](main.js)
- The functions that define specific actions for the task list feature of our application is located in [task-item.js](task-item.js)

## Packages and Dependencies
- All of our dependencies for development are listed inside [package.json](package.json)
- Most notable dependencies (all of which are easily accessible and free as a VSCode extension):
  - ESLint: Enforce style guidelines
  - Prettier: Define and maintain style guidelines
  - JSDoc: Compile a [list](https://github.com/Michaelmvv/cse110-w21-group26/wiki/API) of descriptions for our functions

### E2E and Unit Testing
- For our project, we used [Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress.html#npm-install) for end-to-end and unit testing.
- More information on how we used Cypress is located inside [cypress/README.md](cypress/README.md)

## Want to Continue our Project?
- If you wish to continue our project, after cloning the github-pages branch, please use `npm install` to install the correct dependencies.
- More instructions can be found here to help [get you started](https://github.com/Michaelmvv/cse110-w21-group26/wiki/Getting-Started)
