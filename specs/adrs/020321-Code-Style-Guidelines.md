# [Code Style and Documentation Decisions]

* Status: [accepted] <!-- optional -->
* Deciders: [(everyone) Weekly Meeting] <!-- optional -->
* Date: [2021-02-25 when the decision was last updated] <!-- optional -->

Technical Story: [We need to come to a consensus about adhering to style guidelines.] <!-- optional -->

## Context and Problem Statement

[Since we will be doing the majority of coding in group settings, we need to adhere to strict style guidelines to ensure readability and documentation.]

## Decision Drivers <!-- optional -->

* Ease of code readability between developers.
* Automated style management
* Need to follow strict deadlines to complete this project.
* … <!-- numbers of drivers can vary -->

## Considered Options

* Use ESLint for linting
* Use prettier extension on VSCode to manage style guidelines (use default prettier style guidelines)
* Global variables defined at the top of files
* Use JSDocs for documentation


## Decision Outcome

Chosen option: [We will use all the options above; option 1 is for code style enforcement in JavaScript files, option 2 is for ease of coders to manage style guidelines, option 3 is for ease of visually seeing variables with a global scope, and option 4 is for documentation (method headers, etc.)]
<br/>


### Positive Consequences <!-- optional -->

* [Increase efficiency of reading code in a team setting]
* …

### Negative Consequences <!-- optional -->

* Spend time changing IDEs to adhere to style guidelines.
* …

## Pros and Cons of the Options <!-- optional -->

### [option 1: Use ESLint for linting]

* Good, because it is free and an extension on VSCode for easy installation.
* Good, because it catches style errors during the process of development.
* Good, because it enforces style on the CI/CD pipeline
* Bad, because it does not give expanded descriptions of issues.

### [option 2: Use prettier VSCode extension to manage style during coding]

* Good, because it is free and an extension on VSCode for easy installation.
* Good, because it catches style errors during the process of development.
* Bad, because everyone on the team need to install it locally to have effects on style.

### [option 3: Global variables defined at the top of files]

* Good, because it is easy to visualize which variables have a global scope.
* Bad, because developers will have to scroll to the top of the page to identify a global variable and may lose their place in coding.

### [option 4: Use JSDocs for documentation]

* Good, because it is free and an extension on VSCode for easy installation.
* Good, because it manages method headers.
* Bad, because it takes an extra step to make JSDocs work with ESLint.


<!-- markdownlint-disable-file MD013 -->
