# NodeNotes

This repo contains a full-stack MERN app created by Hubert Kozik. It is an app for managing and storing in database notes. Application is built with responsive web design approach and should work perfectly on every device with internet connection. This app is hosted on heroku and github pages, so you can see it anytime and from anywhere.

## Technologies Used:

- React.js
- Node.js
- Express.js
- MongoDB
- HTML, SASS (with BEM methodology), Javascript
- Material-UI
- Backend server on Heroku / Frontend server on GitHub Pages

## Link to see this app

Link to app: https://hubertkozik.github.io/nodenotes/

## What is required for running this project?

You need program like Visual Studio Code, npm package manager and web browser.

## Setup databse for project

There is no need to setup database for this project, because it is in cloud provided by MongoDB.

## How to build and run this project on your computer?

To run this project you have to do next steps:

1. Download data from branch "ApplicationCode". You can do this by clicking download or cloning this repo.
2. Run command "npm i" to install all necessary packages and libraries.
3. Now you have to run backend server. In main directory run command "npm start". You will see comunicats from nodemon.
4. Now it's time to run frontend server. Go to "client" directory and run command "npm start". After a while you will see a communicat from React.
5. When servers are working go to your web browser and go to "localhost:3000/nodenotes".
6. Now it is working on your computer!
7. If you want to build this project you can run command "npm run build" in client directory.

## Example usages

- If you want to add a new note just click the green button "Add a note".
- If you want to edit, delete or view history of particular note just move your mouse on it. You will see three buttons where you can to this.
- If you want to change criterium of sorting notes choose option from red button list "Sort by...".
- If you want to see full history of all notes in this app you can click blue button "Full History".
