
/*
  This is the javascript file which goes into file webpack.config.js:
  entry: '../src/PackageTreeEntry.tsx',

  Entry means 2 things:
    1. "start dependency graph at this file" to build bundle.js
    2. when index.html has this: <script src="/bundle_localdev.js" type="text/javascript"></script>
       the bundle's exports get available via the DOM window object (see example index.html in webpack projects)
    2a. when script is called, every non-function javascript code in any file in the bundle gets run.
       Typically there is code to start React.js ie: ReactDOM.createRoot( ...

   Typescript:
     This file began as javascript. Later I used a typescript file for
     something and needed to export a typescript "interface". In order to
     get this file to pass through the export, it had to be converted
     to typescript also. See exports section. 
*/

  import { Popup_descrip_qr_scrollTips } from './util/Popup_descrip_qr_scrollTips'
  import { findJsonObjectByFullPath, findJsonObjectByKeyNameAndValue, validateMwMenu } from './mobiwekMenu/mobiwekUtils'
  // NOTE THAT TYPESCRIPT IMPORT MUST END WITH TS OR TSX. ANY TYPESCRIPT HAVING
  // JSX IN IT MUST HAVE A TSX SUFFIX
  import { MediaPictureWithInfo, PopupProps, favoriteCheese } from './mobiwekView/MediaPictureWithInfo.tsx'
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
   return({ msg:'...sayHi() from PackageTreeEntry.js in the bundle'
}) }

// export { sayHi, MobiWekDemo, PopupDebugShowsQRandCmdLine, findJsonObjectByFullPath, findJsonObjectByKeyNameAndValue, 
//     validateMwMenu, MediaPictureWithInfo,  MobiWekMenuFrame, MobiWekPageWrapper }

// TODO: webpack.config_build.js gives warning:
// export 'PopupProps'  (reexported as 'PopupProps') was not found in './mobiwekView/MediaPictureWithInfo.tsx' (possible exports: MediaPictureWithInfo, favoriteCheese)

export { sayHi, Popup_descrip_qr_scrollTips, findJsonObjectByFullPath, findJsonObjectByKeyNameAndValue, 
   validateMwMenu, MediaPictureWithInfo, favoriteCheese,  MobiWekMenuFrame, MobiWekPageWrapper }
// this is a typescript thing. It specifies a set of parameters passed
// to a function by the mobiwek framework.
export type { PopupProps }  
