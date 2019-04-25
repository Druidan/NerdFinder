# NerdFinder
A friend finder that focuses on helping you find a nerd friend that shares your interests.

## Overview and Goals
Nerd Friend Finder is meant to be a lighthearted application to connect one nerd to another who generally shares similar perspectives on nerdy topics.

## MVP
The MVP of this project is that, when a user visits our site, they will:
* Be introduced to the app and its core concept and use.
* Be prompted to take a survey to match them with a nerd friend.
* When the take survey button is clicked it will take them to the survey page.
* The survey will populate from our database file.
* The user will be required to give a name and a link to a picture of themselves.
* The user will rate their agreement with each statement on the survey from 1 (strongly disagree) to 5 (strongly agree).
* The user must fill out each blank and rate each statement to complete the survey.
* The user's overall score will be compared to all other active users' scores, and the active user (or users) with the least difference from our example user's score will be displayed. Ta-da! They have found a friend.
* They will be given the opportunity to retake the survey.

## Future Features and Fixes
* Currently the app has no validation on the image url. The user can technically input gibberish. We need to prevent that.
* The exact methodology for comparison is a bit weak. I think it should add weight to each question based on how important the topic is to the user.
* We could also use a more thorough survey.
* The modal could use a carousel to swap between the matching users who share the same score. This is especially likely with our limited question set.

## Dependencies
* [Express](https://www.npmjs.com/package/express) - We use Express to handle our routing for our pages.

## Deployment 
We are deploying on Heroku [HERE](https://gentle-fortress-32924.herokuapp.com/)