### Example React apps using mobiwek61menu

### *Quick Start* 
- Inside folder **simple-demo**, open command window (git-bash or windows command) 
- run ```npm install```. This fills folder **node_modules** packages and their dependencies 
as specified in package.json. One of the dependencies is this mobiwek61menu package.  
- run ```npm start``` to start a dev server and show the page in a browser.
---------------------

### Description of example applications: 
These examples in subfolders do the same thing but were setup in different ways  
View the readme.md files in subfolder for instructions of use.  

- **create-react-app_demo**  
created using `npx create-react-app my-app` to demonstrate simplest case of using this package.
  - best for beginners who don't want to know about webpack.  
  - package.json modified to use the package   
  - source and asset files added   
  - best for beginning coders who just want to learn React and ignore webpack.
  - unused files removed (as put there by `npx create-react-app my-app`)  
  - has complex example of menu and router

- **custom-webpack** folder:  
  - **custom-webpack/full-menu-and-router**  
    Uses a custom webpack setup. Serves as a starting point for developers as it 
    contains a working webpack.config.js. *[this took a very long time for me to figure out]*.   
    Webpack is setup so an ASCII **qr code to the server's ip address** is displayed in the command window to facilitate viewing on a **mobile** device.  

  - **custom-webpack/simple-menu-and-router**   
    TODO: does not exist  
    Same as **custom-webpack-demo** using a simple example of menu and router.
