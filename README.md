# TranslateAR

By: Ruby, LJ, and Lizzy

##  Application Summary

An Augmented Reality Language translation app. Users use their computer camera and the app identifies object in a space, when the application recognizes an object it shows the English word and then the language translation beside it. For example if a user points their camera at a cup the text that will appear is “cup” and “cup” In whatever language the user specifies. This could be used in situations where a user needs to know a word for an object in a room/wants to learn the object’s name in a different language. 

## Goals
Base Goal: An application that recognizes objects in a room and translates the names of them from a photo. Translates only to common Roman Languages: French, Spanish, Italian etc. 

Stretch goal: An application that recognizes objects in a room and translates them live while a user videos a space. Translates to all languages. 

## User Stories

A user opens the web application and selects a language. They then hit the `start streaming` button and their webcam footage appears on the site. The footage is dyanmically labeled with names of objects in English and in the specified language. The user hits the stop streaming button and the webcam footage disapears. 

## Web Architecture

JS, HTML/CS: Frontend. Python, flask: Backend. 

## Technical Approach
Feed the webcam footage into the google tensorflow api. Then translate the labels using a google translate api.

