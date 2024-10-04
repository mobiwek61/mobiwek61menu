import React from 'react';
import ReactDOM from 'react-dom/client';
//import App from './App';
import reportWebVitals from './reportWebVitals';
// import { MobiWekDemo } from 'mobiwek61menu';
import { ReactAppForDevelopment } from './ReactAppForDevelopment'

// %c	Applies CSS style rules from second argument ..
console.log('%cI am mobiwekMenu/webpack_babel/npmInstTestApp/src/index.js. I call the main app \n' +
  '"ReactAppForDevelopment.js" which uses the mobiwek61menu package,  \n' +
  'typically installed with command "npm i mobiwek61menu" \n' +
  'FOR PACKAGE DEVELOPERS, its like "npm i ../myPkgDevProj/bundlePublish/" instead. \n' +
  'See script "buildProductionBundle" for coding and building the bundle. ', 
  'color: #ff0000; font-weight:700')
const root = ReactDOM.createRoot(document.getElementById('testClientRoot'));
root.render(
  <div className='blockyMsg'>
          {/* <MobiWekDemo/> */}
          { <ReactAppForDevelopment/>}
     </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
