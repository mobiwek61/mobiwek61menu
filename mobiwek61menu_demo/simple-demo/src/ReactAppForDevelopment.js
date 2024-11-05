import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Outlet, useParams,  useNavigate, useLocation } from "react-router-dom";
import { mobiwekMenuJSONexample_1 } from  "./DevMenuSpec";
import devProjCSS from './devProject.module.css'

import { findJsonObjectByFullPath, validateMwMenu,
    MediaPictureWithInfo,  MobiWekMenuFrame, MobiWekPageWrapper } 
    //from '../../../src/PackageTreeEntry'; // coders of the package do it this way. use this when developing the package
     from 'mobiwek61menu'; // Users of package do it this way. use this when the package has been "npm installed"'ed. 

function ReactAppForDevelopment() {
  /* !!! useEffect() !!! is React's lifecycle event, like onLoad(), onRefresh() etc. */
  useEffect(() => { console.log('ReactAppForDevelopment useEffect')  }, []); 
  const theMobiwekMenu = mobiwekMenuJSONexample_1
  var errorJSX = validateMwMenu(theMobiwekMenu) // not really up to date anymore
  if (errorJSX !== null) return(errorJSX) 
  // get "css variable" from css file using getComputedStyle().  
  var cssVariableFromCSSfile_fontsizeA = 
        getComputedStyle(document.body).getPropertyValue('--fontSizeA')
  {/* the code below has parts which looks like HTML is actually JSX. One big difference is when css
      style is specified, things like margin-bottom become marginBottom (camelcase) and the value
      appears in quotes. Also note the double brackets around css. */}
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' // this route always taken. Serves as menu frame for content
              //       ^ all routes hit this one because its /
              element=
                  {<div id='reactRouterTopRoute' className='eatZoomGesture'
                        style={{ fontSize:cssVariableFromCSSfile_fontsizeA}} >
                      {/* "Outlet" below says to include content in nested component */}
                      <Mobiwek61MenuTop mwmenuRoot={theMobiwekMenu}  pageContent={<Outlet/>} />
                  </div>} 
          >
            {/* within JSX, call "function" to setup routes. Note unusual syntax of enclosing inside {}  */}
            { SetupRoutes_A() }
        </Route> 
      </Routes>
    </BrowserRouter>
  );

  /** sets up React routes for this application */
  function SetupRoutes_A() {
    return(<>
    {/* // this wildcard route gets hit only when no other sibling routes get hit */}
    <Route path='*' 
        element={<HandleByFullPathToFindMenuEntry mwmenuRoot={theMobiwekMenu} />} 
    />
    <Route path='about_app' element={ < Do_about_app /> } />
    {/* this route send "itemKey" as a parameter to the Aircraft component.
    itemKey could be "/x15/x15image" or "/x15/x15". Aircraft component decides what action to take */}
    <Route path='x15/:itemKey' 
        element={ <Aircraft/>}  
    />
    <Route path='amhistory' element={<Outlet/>} >
        <Route path='aircraft/:itemKey' element={ <Aircraft/> }  />
    </Route>
    </>)
  }

  /** 1) Sets up mobiwekmenu whose branches and leaves are specified by props.mwmenuRoot
   *  2) Sets up callback function which gets invoked when a leaf is clicked.
   *     Typically calls navigate() to point browser to new location indicated by what was clicked,
   *     but also check for special things like 'resetMenu'.
   *  3) I'm called inside a <Route/> tag so I get to use useNavigate(). Else error occurs
   */
  function Mobiwek61MenuTop(props) {
    const navigate = useNavigate();
    return(<>
      <MobiWekMenuFrame
          appTitle="MENU-DEMO"
          mobiwekMenuJSON_A={ props.mwmenuRoot }  
          menuCallBackPtr={ ReactAppForDevelopmentMenuCallbackFn }  
          overflowCSS="hidden" //"scroll" // leads to div "divPageContentInFrameHelper" having this property
          {...props}     />
      </>)
    /**
     * Callback function for menu LEAF choice
     * @param mwmkeyFullPath unique mwmkey as defined in menuspec "theMobiwekMenu" includes hierarchy ie: workshopTools/power/saw/chainsaw
     * @param innerText label of menu button
     * @param fontSearchUrlParam ie: "?mwmfont=24.3px"
     * to access from window:  "new URLSearchParams(window.location.search).get('mwmfont')"
     */
    function ReactAppForDevelopmentMenuCallbackFn(mwmkeyFullPath, innerText, fontSearchUrlParam) {
          console.log('LEAF CLICKED--   mwmkey: ' + mwmkeyFullPath + ' label: ' +  innerText.replaceAll('\n', '\\n') + ' fontSearchUrlParam ' + fontSearchUrlParam)
          // console.log(' zzb ' + new URLSearchParams(window.location.search).get('mwmfont'))
          if (mwmkeyFullPath === 'resetMenu') mwmkeyFullPath = '/'
          if (mwmkeyFullPath === '/Home') mwmkeyFullPath = '/'
          navigate(mwmkeyFullPath + fontSearchUrlParam); 
    }
  }

  /** "about" page */
  function Do_about_app(props) {
    useEffect(() => { 
      // The MobiWekPageWrapper component which wraps this component does CSS overflow "none" to accommodate
      // zoomable scrollable images. This "page" is just html, so add scrolling as follows:
      document.querySelector("#divPageContentInFrameHelper").style.overflow = "scroll";
    }, []); 
    
    // JSX multi classname: <div className={devProjCSS.divInMiddle + ' ' + devProjCSS.textShadowB}   
    return(<div style={{ margin:'10vh 5px 5px 5px', padding:'5px',border:'3px solid #cccccc'}}>
        <div style={{ marginBottom:'20px', color:'#ffff00'}}>This is a demo of mobiwek61menu. </div>
        mobiwek61menu is an <b>npm package</b> which implements a floating overlay menu. <br/>
        It is an experimental project to:
        <ul>
          <li>fit a large cascading menu onto a mobile screen</li>
          <li>provide variable font size with one click</li>
          <li>present user with a simple interface</li>
          <li>present menu while minimally obscuring content, which may be artwork.</li>
          <li>display zoomable images of historically significant handwriting to assist readability</li>
          <li>present info button to display information and a qr code to that menu location</li>
        </ul>
        <div style={{ marginBottom:'20px', color:'#ffff00'}}>Related resources</div>
        <ul>
          <li>npm package location: <a style={{color:'#32ffbc'}} href='https://www.npmjs.com/package/mobiwek61menu'><>https://www.npmjs.com/package/mobiwek61menu</></a></li>
          <li>provide variable font size with one click</li>
          <li>another line</li><li>another line</li><li>another line</li><li>another line</li><li>another line</li>
        </ul>
    </div>)
  }

  /** depending of parameters, show specific webpage. If no match, decide if image is shown */
  function Aircraft() {
      var params = useParams();
      // if (true) return(<>hello</>)
      // obtain matching menu leaf (a JSON object) in theMobiwekMenu tree, as indicated by fullUrlPath 
      var fullUrlPath = useLocation().pathname;
      var mwmkeyLeaf = findJsonObjectByFullPath(theMobiwekMenu, fullUrlPath)
      if (params.itemKey === 'x15') { 
        console.log("Aircraft() handler,  x15 page"); 
        return MobiWekPageWrapper(Page_x15_spaceplane(mwmkeyLeaf))
        //return page_x15_spaceplane(mwmkeyLeaf);
      }
      if (params.itemKey === 'spaceShuttleIntro') {
        console.log("Aircraft() handler, spaceShuttleIntro page"); 
        return MobiWekPageWrapper(Page_spaceShuttle(mwmkeyLeaf));
        //return Page_spaceShuttle(mwmkeyLeaf)
      }
      // if leaf is an image, just give to MediaPictureWithInfo()
      if (mwmkeyLeaf.mwmtype === 'image') {
        console.log("Aircraft() handler, just am image"); 
        return MediaPictureWithInfo(mwmkeyLeaf) 
      }
      // get here only if there is a problem
      return (<>ExperimentalAircraft no handler found</>)
  }

  /** custom page for x15. Includes clickable image to navigate to image display page. */
  function Page_x15_spaceplane(mwmkeyLeaf) {
    const navigate = useNavigate();
    return <div><h1>x15 Spaceplane</h1><br/>first winged vehicle designed to go outside the atmosphere<br/>
        <div style={{border: 'solid 0px red', display: 'inline-block'}} 
             onClick={ () => { const nav = getNavigateDir();
               navigate(nav.locationDir + '/' + mwmkeyLeaf.clickMeLink + nav.fontSuffix)}} >
        <img style={{border: 'solid 5px white', borderRadius:'48px', margin:'5vw', width:'70vw' }} 
            src='/jpeg/hist/aerospace/WIKIMEDIA-X-15_flying.jpg' alt='x15'
        /></div></div>
  }

  /** pulls apart window.location to get current folder and get font-suffix thing.
   *  Otherwise navigate tries to go to subfolder of current url.
   *  Please let me know if there is a builtin way of doing this.  */
  function getNavigateDir() {
    var locationDir = window.location.pathname; 
    locationDir = locationDir.substring(0, locationDir.lastIndexOf("/") );
    const fontSuffix = window.location.search // ie: '?mwmfont=22.2px' .. need to stick back onto end
    return { 'locationDir': locationDir, 'fontSuffix': fontSuffix }
  }

  /** custom page for space shuttle */
  function Page_spaceShuttle(mwmkeyLeaf) {
    const navigate = useNavigate();
    //  useEffect(() => { 
    //   // document.querySelector('#clkImgA').addEventListener('click', () => { console.log('evtlisten')})
    // }, []); 
    return <div>
        <h1>Space Shuttle</h1>
        First spacecraft designed with flying wings (maybe)<br/>
        {/* image is not clickable so wrap in a div  */}
        <div style={{border: 'solid 0px red', display: 'inline-block'}} 
             onClick={ () => { const nav = getNavigateDir();
               navigate(nav.locationDir + '/' + mwmkeyLeaf.clickMeLink + nav.fontSuffix)}} >
          <img style={{border: 'solid 5px white', borderRadius:'48px', margin:'5vw', width:'70vw' }} 
              src='/jpeg/hist/aerospace/WIKIMEDIA-spaceShuttleTransport.jpg' 
              alt='space shuttle transported' />
        </div><br/>Space shuttle transported on 747
        <div onClick={ () => { const nav = getNavigateDir(); 
                navigate(nav.locationDir + '/' + mwmkeyLeaf.clickMeLink2 + nav.fontSuffix)}} >
          <img id='clkImgA' style={{border: 'solid 5px white', borderRadius:'48px', margin:'5vw', width:'70vw' }} 
              src='/jpeg/hist/aerospace/WIKIMEDIA-spaceShuttleOrbit.jpg' alt='space shuttle in orbit'/>
        </div>
        <br/>Space shuttle in orbit
        
        </div>
  }

    /**
     * Router handler uses router full path to find matching menu entry in menu object.
     * it then examines mwmtype of menu entry to direct to proper handler.
     * @param props.mwmenuRoot head of JSON menu structure to search for node having fullPath
     */
    function HandleByFullPathToFindMenuEntry(props) {
      // var fullUrlPath = useParams()["*"]; // works only for <Route path='*' element=...
      var fullUrlPath = useLocation().pathname 
      // SAVE to test error message: 
      // fullUrlPath = fullUrlPath + 'zzz' // to test things
      // fullUrlPath = 'LibCongress/pictszzzz/gwoodAmericanGothic'
      var mwmkeyLeaf = findJsonObjectByFullPath(props.mwmenuRoot, fullUrlPath)
      //console.log('found ' + mwmkeyLeaf.mwmkey + '  path ' + fullUrlPath)
      if (mwmkeyLeaf.error !== undefined) {
          console.log('WARNING ' + fullUrlPath + ' path not found in menu JSON object. mwmkeyLeaf.error: ' + mwmkeyLeaf.error)
          return(<span className={devProjCSS.divInMiddle + ' ' + devProjCSS.textShadowB} ><br/>
          No route set for path <br/>"{ fullUrlPath }" not found<br/>This url is probably for testing the menu display and is not
          a bug. </span>)
      }
      
      if (mwmkeyLeaf.imgurl !== undefined) 
          return MediaPictureWithInfo(mwmkeyLeaf)
      // if not just show a message
      // following shows how JSX mixes variables with markuup and styles. A bit weird looking.
      const redHi = { background:'#ff00001f', overflowWrap: 'anywhere' }
      return(<div className={devProjCSS.divInMiddle + ' ' + devProjCSS.textShadowB}
                style={{ ...redHi, margin:'0 7vw 0 7vw', width:"inherit", left:'2vw'}} > {/* WOW bing ai got this answer! */}
          This menu leaf is probably test menu data with no handler setup, and is not a bug.
          <br/><code>function HandleByFullPathToFindMenuEntry(). </code><br/> fullUrlPath: { fullUrlPath } 
          <br/>mwmkey: {mwmkeyLeaf.mwmkey}<br/> 
        </div>)
    }
}

export { ReactAppForDevelopment };
