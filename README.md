#Intro
DrawingBook is a drawing app that everyone can enjoy. Within this app, all users can draw in specified areas within their hearts' content. A user would also have the ability to create, read, update, or even delete images created by other users.

# DrawingBook
DrawingBook is a basic CRUD app for an HTML element called canvas. Canvas is a space in HTML which can be used to draw on. It's like a piece of paper on a monitor. However, for a mouse to be used as a pencil or pen, it must be setup in JavaScript. I used the fabric.js library for the drawing functionalities. Fabric is a framework that simplifies the coding for a canvas element. It is an interactive object model on top of canvas element. There are many features within this framework, including image sharpening and edge detection, which are useful for pattern recognition.

# How it works
If you're a first time user of this app, click on the 'Register' link and fill out the form for registration. As soon as you submit this form, you will be redirected to the login page. Go ahead and enter the same information as you did in the registration page. You will see all images that are drawn so far in the home page. To zoom in on an image, just click on it. If you want to create a new image of your own, click the link that says "Draw New Image." You will find some tools you can use to draw on your "paper." When you want to save your work, just click the 'save' link and the app will take care of the rest.

#Get it Working in Development
1. cd desktop
2. Type in "https://github.com/wildraj/DrawingBook" into your URL
3. On the right of the page, where it says 'HTTPS clone URL,' click on the clipboard.
4. In your terminal, type in 'git clone', don't press enter just yet.
5. Press the keys Command(or control if you have Windows) and v, then press enter
6. Within the terminal, type in cd drawingbook
7. Then type bundle install. This will install bundle and all the necessary gems you need for this project
8. Install Rails(if you don't have one)
9. Type these commands bin/rails db:create, bin/rails db:migrate.
10. Type 'rails server' in terminal.
11. In a browser, type in 'localhost:3000' and the app should be activated.
