# Minimalistic design vs feature loaded design

* Status: Accepted
* Deciders: [Everyone, (In weekly meeting)] <!-- optional -->
* Date: [2021-01-17 when the decision was last updated](../../admin/meetings/012021-TeamMeetingWeek#3-Brainstorm.md) <!-- optional -->

Technical Story: Our focus on a minimalistic approach <!-- optional -->

## Context and Problem Statement

Since the functionality of a Pomodoro timer is simple and we do not want to make it overly complicated, we should design an interface that is not abundant in terms of features and necessities. we don't want to implement every feature we can think of, only the absolute necessities that users would enjoy

## Decision Drivers

* We have a strict deadline to complete this project
* More features = Less Intuitive design for the user which may lead to more conflict
* We want to learn the process and how to work in team environments more than actually coding this project with a large amount of features

## Considered Options

* Option 1: Only create the timer with buttons
* Option 2: Create above with setting menu
* Option 3: Create above with implemented task list
* Option 4: Create above with input for custom sounds


## Pros and Cons of the Options <!-- optional -->

### [Option 1: Only create the timer with buttons ]

* Good, because it allows for user input and creates a sense of individualized control
* Bad, because what if users only want an auto feature for simplistic reasons

### [Option 2: Create above with setting menu ]

* Good, because it allows user customization 
* Bad, because we have to plan the core features and what is allowed to be changed

### [Option 3: Create above with implemented task list]

* Good, because it allows user to keep track of what they want to accomplish
* Good, because the user can work through number of sessions and plan their schedule accordingly. 
* Bad, because it takes time to learn how to implement a task list with local storage API.
* Bad, because it can lead to security issues since local storage is client-side only and can be easily accessed and modified via the developer tools console.

### [Option 4: Create above with input for custom sounds]

* Good, because it can alert the user incase they are not on the same page.
* Bad, because even though we are implementing for Chrome, some other browers have restriciton on sound-usage.

## Decision Outcome

Chosen option: Option 2 because we want our user to be able to use this application without "reading any instructions". If we limit ourselves, we can focus on engineering well and focus on more process and remain in the constraints of the project.

UPDATE: We choose to implement all four options.


### Positive Consequences <!-- optional -->

* Focus on engineering aspect and how to code/design efficiently in a team setting

### Negative Consequences <!-- optional -->

* Lack of features might put us at a disadvantage in comparison towards other teams
