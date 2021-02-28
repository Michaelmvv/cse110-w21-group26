# [Development Approach Decisions]

* Status: [accepted] <!-- optional -->
* Deciders: [(everyone) Weekly Meeting] <!-- optional -->
* Date: [2021-02-25 when the decision was last updated] <!-- optional -->

Technical Story: [We need to adhere to constraints in our choice of programming languages and use of 3rd party add-ons] <!-- optional -->

## Context and Problem Statement

[Since our Pomodoro timer will be strictly client-side, we are limiting the languages we are using to HTML, JavaScript, and CSS for the core functionality. We will also be using 3rd party APIs such as local storage to implement the task list feature which we believe will be necessary to complete this project. We have decided that coding core functionality should be done in a group setting to facilitate the flow of ideas and lead to progress being made.]

## Decision Drivers <!-- optional -->

* Web-Application compatible.
* We need to follow constraints given in class.
* Need to follow strict deadlines to complete this project.
* … <!-- numbers of drivers can vary -->

## Considered Options

* JavaScript, HTML, CSS - Constraints
* Create above with Local Storage API
* … <!-- numbers of options can vary -->

## Decision Outcome

UPDATE on 2/8/2021 - We are doing a client-side Task List so we will be using the Local Storage API.

Chosen option: Option 2 is chosen because we decided a Task List should be a feature in our Pomodoro Timer, therefore in addition to using vanilla JavaScript, HTML, and CSS, we will be using the Local Storage API to implement the Task List. In the scope of this class, we will not be worrying about the client-side altering the Task List via Chrome-developer tools.
<br/>


### Positive Consequences <!-- optional -->

* [Performance issues will be minimized since we are not importing 3rd-party add-ons like bootstrap]

### Negative Consequences <!-- optional -->

* Time may be spent implementing features that already exist in a library (re-inventing the wheel issue)

## Pros and Cons of the Options <!-- optional -->

### [option 1: JavaScript, HTML, CSS - Constraints]

* Good, because we would not need to worry about 3rd party add-ons or spending time fixing bugs that come with 3rd party add-ons.
* Good, because there are a multitude of resources for JavaScript, HTML, and CSS.
* Bad, because we will be coding from scratch and spend time implementing features that may already exist in a library.

### [option 2: Create above with Local Storage API]

* Good, because Local Storage allows us to store the Task List feature with ease.
* Good, because everyone on our team has been exposed to using Local Storage API from the lab.
* Bad, because the client-side has access to Local Storage and can manually alter the Task List if they desire (potential security issue).

<!-- markdownlint-disable-file MD013 -->
