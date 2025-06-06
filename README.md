# mobiwek61menu

4/17/2025 this version:
- takes a popup component as a parameter to src\mobiwekView\MediaPictureWithInfo.tsx. This component takes a new added parameter which is an Object with non-fixed names addlPars={{drink:'coffee', flavor:'orange'}}  
- documentation improved

-------------

*mobi is "mobile", wek61 is "weka" with the "a" shown as hexadecimal. The awkward name is to eliminate possible name clashes with other entities.*

## Overview of mobiwek61menu    
This project is a coding exercise/experiment for the author to learn about React, webpack, javascript bundling, and to try out some UI design ideas. Since I don't work on it continuously, it is extensively documented for my own reference.

- If you publish code derived from this, I ask that you **leave the existing documentation in place** for my benefit, and even better, document your work so I can see wha't going on.
- If you remove the font +/- buttons, I won't be able to see the results of your work on a mobile, so I ask you leave or improve on them.    
## React.js common errors  
*React.js errors sometimes produce runtime crashes with misleading error messages which can stop a project dead.*
- ### Import statement syntax 
    - Use this syntax ***EXACTLY***: &nbsp;```import React, { useEffect, useState } from 'react';```  
    If other things needed from react, put them inside curly brackets.   
  - Wrong ```import``` syntax fails to import file.
    - For .js files to import use NO SUFFIX: ```import {Popup_custom} from './Popup_custom'```  
    - For .tsx files to import DO USE SUFFIX: &nbsp;&nbsp;&nbsp;&nbsp;```import { Popup_custom } from "./Popup_custom.tsx"```  
  - **DO USE** curly brackets as shown above. 
  - example misleading error message:  
    *"Warning: React.createElement: type is invalid -- expected a string (for built-in components) or a class/function..."*
- ### More than one node_modules containing React.js  
  When running a node/React app using ```npm start``` or from webpack,  
   <u>**there must be only one node_modules in the run folder hierarchy**.</u>   
   If more than one node_modules is present ie: run folder and 2 levels up, React fails with a misleading error message, typically something about ***useEffect not allowed***.  
   The reason is that the runtime sees more than one React.js install and gets panicky about it.  


## Project Summary
- menu maintains related/unrelated topics in a hierarchy with multi-level display, with auto-centering needed by small mobile screens.
- the state of the menu perists between chosen routes ('links'), to preserve position in the hierarchy. A "home" button is provided. Elements not in current hierarchy are hidden.
- if the hierarchy tree has many levels, the menu can be very wide/tall. It is touch scrollable to the screen viewport and auto-scrolls to the chosen position. This is significant on mobile devices. The font +/- buttons provide visual aid for those who need it.  It also provides a zoom function to see position in the tree.
- **Menu definition:** a JSON structure defines a website in one place. Example is MobiWekDemo_exampleMenu.js:  
  - branch [submenu] nodes are defined with labels and submenu elements
  - leaf nodes are defined with labels and attributes. Attributes describe behavior (eg: display image, image of handwriting, webpage and others) Depending on this, the work is routed to appropriate React components.
  - leaf nodes may have url attributes in the case of images.
  - all nodes have a "mwmkey" attribute. When a leaf is clicked on, its mwmkey and those if its ancestors and used to form a REST-style request sent to useLocation()
- above clicked-LEAF requests get sent to React **BrowserRouter** in MobiWekDemo.js in REST-style. The full path of the request [which matches the menu hierarchy] is examined and matched with the matching node in the JSON menu structure (above). The attributes of this determine which component handles the request and how it behaves.
  - example: node has an **imgurl** attribute, so it's sent to the **MediaPicture(mwmkeyLeaf)** component where its displayed with zoom/pan and an info button in the lower left corner
- **query techniques used here**     
*Makes use of 2 unrelated types of queries:* 
  - DOM (Document Object Model) queries for querying HTML  
    ```
    document.querySelectorAll('[mobiwekrole="BRANCH_SUBMENU"]')
         .forEach(submenu => { ......
    ```    
  - JSONPATH queries for querying JSON objects  
    ```
    var jsonPath = require('jsonpath');
    var jsonPathQueryString = "$..*[?(@.LEAF)]"  // searches for LEAF's  
    var matchA = jsonPath.query(jsonObjectHead, jsonPathQueryString);
    ```
  - JSONPATH example annotated:  
    ```
    jsonPathQuery = "$..*[?(@.mwmkey=='winslowHomerFogWarning')]"
    //               ^ $ is root of tree
    //                ^^ 2 dots is "Recursive descent" drill-down operator
    //                  ^ wildcard * "anything within the tree having next thing"
    //      the "filter" ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
    ```
  - Microsoft copilot is very useful for explaining queries. Tell it:  
    ```
    explain this jsonpath query: $..*[?(@.mwmkey=='winslowHomerFogWarning')]
    ```  
    Then you can ask it to elaborate details. Eventually it includes the details you asked for in the first place next time you ask about a query.  

### STRUCTURE OF THIS PROJECT
- **Overview**
This project may be run in 4(**!**) ways: 
  - as a standard React project created by **npx create-react-app my-app** (it was created this way), command ```npm run```
  - **I use this:** using custom config of webpack/babel to run its built-in dev server. See folder **webpack_babel** for README.MD
  - using **webpack_babel** folder to create a bundle file using webpack.config\*.js files here as a custom setup. It took me a long time to configure these files for React, so they are extensively documented. The resulting bundle is installed/tested using app in **webpack_babel/npmInstTestApp**.  
  - running the bundle file without a server by clicking on index.html in the bundle distribution folder setup above. This has bugs but its fun to try out.
- **Folder src** has code for this package, but no start point for testing/developing. Use code under webpack_babel/webpackServerDevApp; run the webpack server-start script there and any changes to src and the test app get eaten as soon as they are saved.  Another script packs the package into a bundle*.js for distribution.  
- **Folder webpack_babel** has webpack setup for:
  - running webpack's development server for development using webpack.config\*.js files here as a custom setup. 
  - This folder has its own node_modules and package.json. These are to provide webpack/babel functionality to create bundles. They are not used by the main project or exported in the bundles.
  - creating bundle.js for publishing along with LICENSE.TXT and package.json. 
- **Folder webpack_babel/npmInstTestApp**  
has a separate React app which installs the mobiwebmenu package for testing. The package may be installed via the filesystem or npmjs.com. Created by ```npx create-react-app my-app``` (for cautions about this utility, see **[About create-react-app my-app](#about-create-react-app-my-app)**)
- **Folder webpack_babel/webpackServerDevApp** 
is another test app. It is run by the customized webpack server and does not install a package. This is how it imports and virtual bundle file (not a real file) provided by the dev server:  
IN HTML:  
```<script src="/bundle_webpackServer.js"></script>```  
IN JAVASCRIPT (requires HTML script tag loading javascript file)  
```import { MobiWekDemo, React, ReactDOM } from '../../src/PackageTreeEntry';```  
### About create-react-app my-app
  - when a project is created by ```npx create-react-app my-app``` the  
    ```<script src="/bundle_webpackServer.js"></script>``` tag in index.html is **NOT THERE**.  
  This is because the **webpack.config.js**, setup in **node_modules/react-scripts** calls plugin "**HtmlWebpackPlugin**" which automagically inserts this tag into the html file before running. 
    - The demo project in **webpack_babel/webpackServerDevApp** uses custom ```webpack.config*.js``` files without the "**HtmlWebpackPlugin**" plugin, so HTML in the demo requires this script tag. 
    - The project in **Folder webpack_babel/npmInstTestApp** uses this default configuration to keep it a simple demo and easily replicated. 
### TODO
- convert code in client example to use next.js and typescript. maybe. 
- modify runWebpackSrv script to check for duplicate node_modules in hierarchy

### BUG
- on desktop with mouse, cannot use mouse to drag menu when it is larger than the screen. Works ok on laptop trackpad and android. There's probably one line of css fixing this but I haven't found it. Put in some test code src\mobiwekMenu\mobiwekMenuBuilder.js, line 126. 
### VSCode displays only one edit file tab at a time. To Fix:  
  In File->settings,   
  workbench->editor->enable preview ...   
  Deselect this.


