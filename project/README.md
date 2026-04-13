# Pixel Drawer


**Personal Information:**
- Name: David Rabba
- GitHub: Davidrabbaa
- edX: David Rabba
- City: Amman
- Country: Jordan

hello world! this is my final project for CS50x, called Pixel Drawer! Pixel Drawer is a web application that allows users to create pixel art by coloring specific cells on a grid. this project consists of multiple files and folders that brings this beauty to life! and i would like to explain the functionality of each file and folder. i wanted to build something that is simple and fun, like those old retro games where everything was made of pixels.

## Files and Folders

### `templates/`

this folder contains the HTML templates for the application. it's where the structure of our website lives, using jinja2 to make it dynamic.

### `static/`

this folder contains the static files for the application. (js and css files)

### `app.py`

this file is the main application file that handles the backend logic of the application. it uses Flask to handle HTTP requests and responses. it also contains the database connection and the logic for creating and retrieving pixel art using SQL. i used some defensive coding here to make sure that everything is safe and secure from SQL injection attacks.

### `gallery.html`

this is the gallery page that displays all the pixel art created by the users. it uses Jinja loops to display the pixel art, handling both cases where there is pixel art and where there is no pixel art. you can also find the bootstrap code for the navbar layout. as for the js code, in short it waits for the page to load by running the DOMContentloaded event listener. then it finds the artworks and reads the pixel data. after that it sets up the gird and draws the pixels. it's basically a mini-version of the main drawing logic

### `index.html`

this is the main page of the application. it contains the pixel art grid and the color palette. it also has a button to save the pixel art to the database. you can also find the bootstrap code for the navbar layout here, since i want both pages to have the same navbar layout. i tried to keep the design clean and simple so users can focus on their art.

### `script.js`

probably the most important and complicated code that i've ever written ( i hate js so much ). so basically if you check my html files you can see id names that i have in specific places. this js file is responsible for handling the logic of the pixel art grid and the color palette. by first getting the id names from the html files and then using them to create the grid and handle the drawing and erasing logic. it also handles the saving logic by sending the pixel data to the backend as a JSON string. it was quite a huge pain to get the mouse drag drawing working smoothly :D

### `style.css`

this is where the looks of the website come from. it has all the css code that i used to style the page. 

### `database.db`

this is the database where i store all the pixel art created by the users. it has a table called artworks that contains the title of the artwork, the pixel data and the timestamp of when it was created.

## Design Choices

i chose Flask for the backend because it's lightweight and easy to set up for a project like this. for the frontend, i went with Vanilla JavaScript because i wanted to understand how things work under the hood without using big frameworks like React. bootstrap is a very simple choice for the layout and the navbar. it made the website look neat without needing to write a gazillion line css file.
