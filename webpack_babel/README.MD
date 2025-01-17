



### This folder is for running and configuring a custom webpack setup.
- To publish a package to npmjs.com or just package it into a bundle.js file, you need what's in this folder.  To just code the project, you can use the setup here or ```npm start``` in the project root.  
- Source for package code is at ```../src```  
  Code in this folder is non-package code and uses the package. It is here for package development and testing.  
- Webpack is setup by the create React thing **npx create-react-app my-app**, but its details are hidden and a beginning user has no idea it's there; you just run "npm start", the React.js appears in a browser and you go coding.  *To see what it does, look in node_modules/react-scripts/\*, but its really ugly*.
- **In this folder, webpack is setup from scratch** so you can learn how to use it and also **create .js bundles for publishing to npmjs.com**. **React** requires several **customizations** for this to work:
  - Webpack gets setup to run babel to "transpile" jsx in react.js code into regular javascript, prior to bundling; bundles cannot have jsx because they run in a browser.  
  
- One webpack.config.js file is for running the **webpack dev server** for development of this package, and the other is for **generating bundle.js** for publishing and install by a client somewhere.  
  - The webpack.config\*.js file for producing bundle\*.js has an important entry: the **module.exports/externals** has entries to **prevent misleading and extremely hard to trace** React error messages. See comments in file.  
- When a client is being developed at the same time this package is being being developed (before publishing), the client should install through the file system ie:  
 **npm install ../../xyz/bundle.js**
 ### About the 2 webpack.config*.js files and dev versus production:  
- in config, the line **module.exports/entry** specifies  
  - start of dependency tree  
  - exported objects (const, var, and function) exported by the bundle. 
- In the dev server setup **entry** is the **test app** which is in the dev bundle. it needs to be in the bundle so webpack will see it and feed it to babel which transpires jsx to javascript. If not transpired it won't run when its sent to a browser.
- In production bundle setup **entry** has no test app. Instead the client starts up React itself and uses the exported objects.

### SNAFU "bundle node_modules": 
- IF A PARENT FOLDER OF THE ONE CONTAINING THE BUNDLE FILE HAS A node_modules IN IT, REACT CRASHES WITH AN  AMBIGUOUS ERROR MESSAGE, *something about useEffect not allowed*
- FOR THIS REASON THE BUNDLE.JS FILES MADE BY STUFF HERE DOES NOT GO HERE. IT GOES AT THE TOP OF THE FOLDER TREE.   
###  Commands to import the bundle from local filesystem during development:
  ```
      # to remove old import and re-import locally:
      npm remove mobiwek61menu
      npm i ../../../../publicProj/npmjs_com/bundle-publish-public/
      npm start
  ```
### Details of webpack server:
- serves index.html which contains a script tag:  
  &lt; script src="/bundle_localdev.js" ...
- Above script tag **causes exports** in .js file(s) indicated by **webpack.config.js** file under tag **module.exports/entry** to appear in the DOM window object. See HTML example for how to get to it.  
- *Even though the HTML calls a script by filename, the file does not exist in the filesystem.* The server auto-reloads code edits and updates this bundle "file" in real time. 
- **Snafu:**  
When a path such as http://zz.com/food/candy is get'ed from the server, it cannot find it and a 404 results. It's configured so the request is sent back to index.html, where the React router can properly process it. Entry **historyApiFallback: true,** in webpack.config.js sets it this way.

### Command lines:
    # run these from folder mobiwekMenu\webpack_babel
    # build production bundle.js
    node ../node_modules/webpack/bin/webpack build -c ./webpack.config_build.js
    # Start webpack server 
    node ../node_modules/webpack/bin/webpack serve -c ./webpack.config_devServer.js


