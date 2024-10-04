         
/*
             _       ___       __                                                    
 \    / /\  |_) |\ |  |  |\ | /__ o   ._   _   _|  _    ._ _   _   _|     |  _   _   
  \/\/ /--\ | \ | \| _|_ | \| \_| o   | | (_) (_| (/_   | | | (_) (_| |_| | (/_ _>   
 When running dev server, there must be ONLY ONE NODE_MODULES folder in the hierarchy 
 up from the folder of this source code.  Indicator: errors including stuff about 
 "more than one copy of React is running" appear   Font Name: Mini                                                                               
*/
// THESE IMPORTS COME FROM NODE_MODULES SEVERAL LEVELS UP, THE SAME ONE WHERE PACKAGE CODE IS.
// THAT PREVENTS THE "MULTIPLE COPIES OF REACT" ERROR FROM OCCURING.
/**
 * this file is specified in webpack.config*.js as:
 * entry: ['./webpackServerDevApp/forDevBundle/startReactInDiv.js', '../src/PackageTreeEntry.js'],
 * It gets put into the bundle for dev, not production. The second entry above is the true starting
 * point for the package to be published.
 */
import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { ReactAppForDevelopment } from './ReactAppForDevelopment'

/** This file starts when index.html ->   <script src="/bundle_webpackServer.js"></script>
 * All non-function script in the bundle gets run at this time. This files is
 * in the bundle, so below code gets run. It starts up react.  
 **/
// $c Applies CSS style rules from second argument
console.log('%cI am /mobiwekMenu/webpack_babel/webpackServerDevApp/forDevBundle/startReactInDiv.js. \n' +
      'I\'m in the dev, not prod bundle. I start react with the ReactDOM.createRoot()\n' + 
      'command, called by code not in a function, so it runs when the server starts.',
     'color: #ff0000; font-weight:700'      )
// START REACT. This code is in the bundle, is not a function so it gets run by the html script tag. 
const root = ReactDOM.createRoot(document.getElementById('rootDivA'));
root.render( // THIS FILLS THE DIV WITH REACT STUFF
  <>
          <ReactAppForDevelopment/>
  </>
);

// SAVE THESE EXAMPLES. THEY SHOW HOW TO GET OBJECTS FROM THE BUNDLE VIA THE DOM WINDOW OBJECT 
// show webpack bundle in window object:
// const wlib = window.webPackLibraryVisibleFromDomWindowObject
// const React = wlib.React; const MobiWekDemo = wlib.MobiWekDemo; const ReactDOM = wlib.ReactDOM;

