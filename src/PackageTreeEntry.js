
/*
  This is the javascript file which goes into file webpack.config.js
  in entry /module.exports/entry: '../src/PackageTreeEntry.js'
  
  Entry means 2 things:
    1. "start dependency graph at this file" to build bundle.js
    2. when index.html has this: <script src="/bundle_localdev.js" type="text/javascript"></script>
       the bundle's exports get available via the DOM window object (see example index.html in webpack projects)
    2a. when script is called, every non-function javascript code in any file in the bundle gets run.
       Typically there is code to start React.js ie: ReactDOM.createRoot( ...
*/

  import { PopupDebugShowsQRandCmdLine } from './util/PopupDebugShowsQRandCmdLine'
  import { findJsonObjectByFullPath, findJsonObjectByKeyNameAndValue, validateMwMenu } from './mobiwekMenu/mobiwekUtils'
  // import './mobiwekMenu/mobiwekMenu.css'
  import { MediaPictureWithInfo } from './mobiwekView/MediaPictureWithInfo'
  import { MobiWekMenuFrame } from './mobiwekMenu/mobiwekMenuFrameHelper';
  import { MobiWekPageWrapper } from "./mobiwekView/MobiWekPageWrapper"

// ReactDOM.createRoot( ... can go here to startup react for development.
// Instead, I put it in a dev-only js file which gets put into the dev bundle. That way you see what's going on.
console.log('running code at PackageTreeEntry.js Oct 2 to npmjs')

// this code would be automatically run if a client imported the bundle.
// Clients typically run this code themselves, so they can specify their own menus and callbacks.
// so that's why its commented out.
// function CreateReactRootFromDivAndRunMobiWekDemo() {
//   // console.log("running bundle code from file PackageTreeEntry.js. Now loading div \"" + rootDivName + "\" with React stuff")
//   const root = ReactDOM.createRoot(document.getElementById(rootDivName));
//   // console.log('root ' + root)
//   root.render(
//     <div>
//       <MobiWekDemo />
//     </div>
//   );
// }

// NOTE: it only wants to return values as JSON, not a simple string when used as an export
function sayHi() {
   return({ msg:'sayHi() from PackageTreeEntry.js in the bundle'
}) }

// export { sayHi, MobiWekDemo, PopupDebugShowsQRandCmdLine, findJsonObjectByFullPath, findJsonObjectByKeyNameAndValue, 
//     validateMwMenu, MediaPictureWithInfo,  MobiWekMenuFrame, MobiWekPageWrapper }
export { sayHi, PopupDebugShowsQRandCmdLine, findJsonObjectByFullPath, findJsonObjectByKeyNameAndValue, 
   validateMwMenu, MediaPictureWithInfo,  MobiWekMenuFrame, MobiWekPageWrapper }
