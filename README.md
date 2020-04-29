# TranslateAR

By: Ruby, LJ, and Lizzy

Deployed here: [Live URL](https://pure-eyrie-22820.herokuapp.com/)

###  Application Summary

An Augmented Reality Language translation app. Users use their computer camera, and the app identifies the objects in the frame. The user can select any of the languages available with Google Translate. The application shows the English word and then the language translation beside it for all recognized objects. For example, if a user selects "French" and points their camera at a cup, the text that will appear is “cup” and “Coupe”. This could be used in situations where a user needs to know a word for an object in a room/wants to learn the object’s name in a different language.

### Goals
Base Goal: An application that recognizes objects in a room and translates the names of them from a photo. Translates only to common Roman Languages: French, Spanish, Italian etc.

Stretch goal: An application that recognizes objects in a room and translates them live while a user videos a space. Translates to all languages.

### User Stories

A user opens the web application and their webcam footage appears on the site. They then select a language from the dropdown menu. The footage is dynamically labeled with names of objects in English and in the specified language.

### System example

*Below are Screenshots of our application*

<img src="/Images/cup.png" width="80%"/>
<img src="/Images/phone.png" width="80%"/>


### Running our application

- Clone this github.
- Go to the `TranslateAR-ML` directory.
- run `npm install`.
- run `ng serve`.
- Go to `localhost:4200` in your web browser.
- Start using our app!

### Web Architecture

Angular, JS, HTML/CSS, Python for Google Translate API. Heroku for hosting.

### Roles

**Laura Joy Erb** => Integrated the translation code into an API. Combined the API call with the object detection algorithm. 
**Elizabeth Slade** => Wrote our translation function. Set up the server for hosting both our web app and the translation api. 
**Ruby Zaveri** => Set up webcam access and object detection libraries. Wront code for frontend drop-down menu and communication between front and backend. 
