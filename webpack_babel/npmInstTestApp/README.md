
### This folder is a standalone test client which uses bundle*.js from the main project  
- It was created using **npx create-react-app my-app**
- **it has nothing to do with the main project**
- it imports bundle*.js from the main project either via the filesystem or npmjs.com. 
- It eats new bundle*.js files while it is running without restarting. Useful during package development to see how it interacts with clients.  
- it needs to have images locally under /public folder; the server serves them when needed by pages.

### Importing the bundle from local filesystem during development:
- **THERE IS A SNAFU: REACT CRASHES IF ANY NODE_MODULES FOLDER IN ANY LEVEL OF PARENT OF THE BUNDLE FILE HAS REACT IN IT** *Resulting error message is totally misleading, something about useEffect not allowed*
- **This is why bundle-publish-public is several levels up**

### How testClient uses the bundle:  
- **npm start** causes testClient to:
  - serve index.html which contains a **div named testClientRoot**. 
  - Code in **src/index.js** gets called by index.html and puts react content into above div, and calls menu components from the bundle.  
  - [*You should not do this but if you want to see how its setup look at /mobiwekMenu/mobiwekMenu/webpack_babel/npmInstTestApp/node_modules/react-scripts/config/paths.js. The custom webpack setup in this project is much easier to follow*] 
- More about **src/index.js**: it has   
    ```import { MobiWekDemo } from 'mobiwek61menu';``` it expects this to have been ```npm install```' ed   
   - above import obtains objects in export list indicated by **webpack.config.js** file under tag **module.exports/entry**. In this case the "file" (now squashed into the bundle) is **PackageTreeEntry.js**. It also causes any free (non-function) code in any file in the bundle to run.

### How to build the bundle exported above:  
- run script mobiwekMenu/webpack_babel/buildProductionBundle   
[assumes git-bash has been installed if on a pc]

### Install and run commands for this project
```
    # to remove old import and re-import locally:
    npm remove mobiwek61menu
    npm i ../../../publicProj/npmjs_com/bundle-publish-public/
    npm start
```