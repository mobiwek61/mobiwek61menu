import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Outlet, useParams,  useNavigate, useLocation } from "react-router-dom";
import { mobiwekMenuJSONexample_1 } from  "./DevMenuSpec";
import devProjCSS from './devProject.module.css'

/**  IF USING IMPORT FROM PUBLISHED OR LOCAL PACKAGE, IGNORE THIS:
 *   This is the development version and so gets included into the dev bundle by webpack.
 *   That is why imports are done via the filesystem and not via a bundle.
 *   An equivalent version of this file exists in the example (bundle imporing) app and imports are from the bundle
 *   which has been installed previously by "npm i mybundle" or "npm i ../../webpackOutput/mybundle" [local use for dev]
 * */
import { PopupDebugShowsQRandCmdLine, findJsonObjectByFullPath, validateMwMenu,
    MediaPictureWithInfo,  MobiWekMenuFrame, MobiWekPageWrapper } 
    //from '../../../src/PackageTreeEntry'; // coders of the package do it this way. use this when developing the package
     from 'mobiwek61menu'; // Users of package do it this way. use this when the package has been "npm installed"'ed. 

/* WARNING: react-router-dom < V.6 crashes.  */

/**
 * gets called by index.html with tag <script src="/bundle_webpackServer.js"></script>
 * Above tag causes forDevBundle/startReactInDiv.js to run from the bundle.
 * It gets run because webpack.config*.js has the line:
 *         entry: ['./webpackServerDevApp/forDevBundle/startReactInDiv.js', '../src/PackageTreeEntry.js'],
 *    -or- entry: '../src/PackageTreeEntry.js',
 *    depending on if its the dev version or not.
 * @returns component with entire app
 */
function ReactAppForDevelopment() {
  /* !!! useEffect() !!! huh ?
     In the React world "useEffect" is a conponent lifecycle function. Controlled by argument 2 as follows:
     missing: run always;  [] empty: run only once when component mounts; [foo] run when useState foo changes */
  useEffect(() => { 
    // console.log('ReactAppForDevelopment useEffect') 
  }, []); 

  const theMobiwekMenu = mobiwekMenuJSONexample_1
  var errorJSX = validateMwMenu(theMobiwekMenu) // not really up to date anymore
  if (errorJSX !== null) return(errorJSX) 
  // get "css variable" from css file using getComputedStyle().  
  var cssVariableFromCSSfile_fontsizeA = 
        getComputedStyle(document.body).getPropertyValue('--fontSizeA')
  console.log('mon 9th b')
  {/* the code below has parts which looks like HTML is actually JSX. One big difference is when css
      style is specified, things like margin-bottom become marginBottom and the value
      appears in quotes. Also note the double brackets around css. */}
  return (
    <BrowserRouter>
      <Routes>
          {/* on github.io request for image gets caught by router, so put route here. dont know why its just for image loading jpeg? 
              <Route path='/jpeg/farmersmkt/jalepenos.jpg' element={<img src='/jpeg/farmersmkt/jalepenos.jpg' />} 
          />*/}
          <Route path='/' // this route always taken. Serves as menu frame for content
              //       ^ all routes hit this one because its /
              element=
                  {<div id='reactRouterTopRoute' className='eatZoomGesture'
                        style={{ fontSize:cssVariableFromCSSfile_fontsizeA}} >
                      {/* 
                      Below is the top level div of menu. Encompasses the entire screen but is transparent
                      so below content is visible. Hamburger button always visible with high zIndex.
                      Rest of menu hidden (display='none'). When visible it has a high zIndex so it floats
                      over the screen, and code keeps active submenus centered.
                      <Outlet/>: see what it means for path amhistory  */}
                      <Mobiwek61MenuTop mwmenuRoot={theMobiwekMenu}  pageContent={<Outlet/>} />
                  </div>} 
          >
            <Route path='qrCode' element={<PopupDebugShowsQRandCmdLine isVisible={ true } callBackCloseMe={null} />} />
            
            {/* Note: need "()"", and dont use form <SetupRoutes/> cause its not a JSX 
                This is how to insert lots of routes without code clutter */}
            { SetupRoutes_A() }

        </Route> {/*  <Route path='/' */}
      </Routes>
    </BrowserRouter>
  );

  /** sets up React routes for this application */
  function SetupRoutes_A() {
    return(<>
    {/* // this wildcard route gets hit only when no other sibling routes get hit */}
    <Route path='*' 
        /** path='*' means do this if none of the following routes matches a path.
         *  It passes control to component which:
         *  1. obtains matching menu leaf (a JSON object) in theMobiwekMenu tree 
         *  2. examines it's tags to see how to proceed. ie: if it has an imgurl, show the picture etc.
         *  3. Modify to handle your own tags and forward to rendering components.
         *     Use this approach if you're not using a REST-style approach.
         */
        element={<HandleByFullPathToFindMenuEntry mwmenuRoot={theMobiwekMenu} />} 
    />

    {/* MobiWekPageWrapper( Do_about_app() ) wraps the React component "Do_about_app" inside a zoomable, 
        scrollable thing with a narrow page-refresh band at the top of the screen  */}
    {/* <Route path='about_app' element={MobiWekPageWrapper( Do_about_app() )} /> */}
    <Route path='about_app' element={ < Do_about_app /> } />
    <Route path="govtDemo/govtDemoSummary" 
       element={ <div className={devProjCSS.divInMiddle + ' ' + devProjCSS.textShadowB} >
        Demo of gov't use. </div> } />
 
    
    <Route path="OrgChart"> 
        <Route path="whatsThis"
          element={ <div className={devProjCSS.divInMiddle + ' ' + devProjCSS.textShadowB} >
            Experiment test Org chart. <br/>
            Such an application would need: <ul>
            <li>full user interface for data entry and editing</li>
            <li>something to restrict access only to authorized viewers</li>
            <li>security, database etc</li></ul>
            Also demonstrates image menu items.<br/>
            </div> } /> 
        <Route path='*' element={ < OrgChart />} />
    </Route>
    
    <Route path='coffee' element={<div style={{ marginTop:'25vh'}}>Coffee route here</div>} />
    {/* REST-style: any route staring with beverages followed by a single path */}
    <Route path='beverages'>
        {/* "nested route" */}
        <Route path='mojito' 
              element={
                <div className={devProjCSS.divInMiddle + ' ' + devProjCSS.blockyMsg} >
                    <div style={{backgroundColor:'#cccccc'}}>
                      1. muddle mint and lime<br/>2. add sugar and more line and muddle again<br/>
                      3. add seltzer and run, stir and put in ice.<br/>4. consult a real recipe not
                      some stuff from<br/>&nbsp;&nbsp;&nbsp; the internet.
                    </div>
                </div>} >
        </Route>
        {/* "nested route" */}
        <Route path='hotDrink' 
              element={
                <div className={devProjCSS.divInMiddle + ' ' + devProjCSS.blockyMsg} >
                    Today's hot drink is: <br/><div style={{backgroundColor:'#cccccc'}}><Outlet/></div>
                </div>} >
            <Route path='tea' element={<>a hot cup of tea</>} />
            <Route path='coffee' element={<>burnt coffee</>} />
        </Route>
    </Route>
    {/* this route send "itemKey" as a parameter to the Aircraft component.
    itemKey could be "/x15/x15image" or "/x15/x15". Aircraft component decides what action to take */}
    <Route path='x15/:itemKey' 
        element={ <Aircraft/>}  
    />
    <Route path='amhistory' element={<Outlet/>} >
        {/* REST-style: any route staring with amhistory/aircraft/experimental/ */}
        <Route path='aircraft/:itemKey' element={ <Aircraft/> }  />
        {/* REST-style: any route staring with amhistory/aircraft/experimental/ */}
        <Route path='aircraft/experimental/:itemKey' element={ <Aircraft/>  }  />
    </Route>
    {/* note wonky way css classes from bundle are combined into multiple classnames */}
    <Route path='amhistory/horaceGreeley/greeleyIntro' 
           element={ <div className={devProjCSS.divInMiddle + ' ' + devProjCSS.textShadowB} 
                        >Horace greeley intro goes here
                        <div style={{ color:'#00ff00', backgroundColor:'#bbbbff' }}
                            className={devProjCSS.blockyMsg + ' ' + devProjCSS.textShadowB} 
                            >This css from dev css module</div></div>
            
           } />
    <Route path='addLine/:lineNum' element={<>This is a filler submenu to stretch the menu taller than the viewport to test scrolling and return-to-position when menu becomes visible</>} />

    <Route path='todaysSoup' element={<>todaysSoup here <Outlet /></>} >
        <Route path=':choice' element={<div className='pushDown'><TodaysSoup /></div>} />
        <Route path='cold/:choice' element={<div className='pushDown'>cold soup:<TodaysSoup /></div>} />
    </Route>

    {/* below route demonstrates a 2-level path and a default for anything not 2 level  */}
    <Route path='workshopTools' 
        element={<div className='blockyMsg' style={{marginTop:'20vh'}} >
          path "workshopTools" <br/>Outlet is in red dashed box:
          <div style={{border:'6px dashed red'}}> <Outlet /></div></div>} >
              {/* HERE IS THE STUFF THAT GOES INTO <Outlet/> tag:  */}
              <Route path='*' element={<>wildcard route * </>} />
              {/*          ^ anything else ie:   workshopTools/power/saw/chainsaw */}
              <Route path=':ftype/:subtype' element={<Tools2level />} /> 
              {/*          ^ specifically two paths down ie: /workshopTools/power/drillPress */}
    </Route>
    </>)
  }

  /** 1) Sets up mobiwekmenu whose branches and leaves are specified by props.mwmenuRoot
   *  2) Sets up callback function which gets invoked when a leaf is clicked.
   *     Typically calls navigate() to point browser to new location indicated by what was clicked,
   *     but also check for special things like 'resetMenu'.
   *  3) Things get a bit weird here: every component or function which uses the navigate() React hook
   *     gets put inside this function which IS a component. Must do this because a call to navigate
   *     needs to be called from a <Route/> or else React freaks out. Tried to streamline app
   *     by removing this function but it went badly because of this.
   *  4) I'm called inside a <Route/> tag so I get to use useNavigate()
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
     * 
     * @param mwmkeyFullPath unique mwmkey as defined in menuspec "theMobiwekMenu" includes hierarchy ie: workshopTools/power/saw/chainsaw
     * @param innerText label of menu button
     * @param fontSearchUrlParam ie: "?mwmfont=24.3px"
     *          "new URLSearchParams(window.location.search).get('mwmfont')"
     */
    function ReactAppForDevelopmentMenuCallbackFn(mwmkeyFullPath, innerText, fontSearchUrlParam) {
          console.log('LEAF CLICKED--   mwmkey: ' + mwmkeyFullPath + ' label: ' +  innerText.replaceAll('\n', '\\n') + ' fontSearchUrlParam ' + fontSearchUrlParam)
          // console.log(' zzb ' + new URLSearchParams(window.location.search).get('mwmfont'))
          if (mwmkeyFullPath === 'resetMenu') mwmkeyFullPath = '/'
          if (mwmkeyFullPath === '/Home') mwmkeyFullPath = '/'
          navigate(mwmkeyFullPath + fontSearchUrlParam); 
    }
  }
  function Do_about_app(props) {
    useEffect(() => { 
      // The MobiWekPageWrapper component which wraps this component does CSS overflow "none" to accommodate
      // zoomable scrollable images. This "page" is just html, so add scrolling as follows:
      document.querySelector("#divPageContentInFrameHelper").style.overflow = "scroll";
    }, []); 
    
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

  function OrgChart() {
    // var params = useParams();
    var fullUrlPath = useLocation().pathname;
    var mwmkeyLeaf = findJsonObjectByFullPath(theMobiwekMenu, fullUrlPath)
    return(<div className={devProjCSS.divInMiddle + ' ' + devProjCSS.textShadowB} >
        Handler for OrgChart.<br/>"{fullUrlPath}" chosen. <br/>Displays image<br/> "{mwmkeyLeaf.theImage}" 
        <br/>with text<br/> "{mwmkeyLeaf.theText}"
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
        return <MediaPictureWithInfo mwmkeyLeaf={mwmkeyLeaf}  
                //imageDescPopup={Popup_custom} 
              />
      }
      // get here only if there is a problem
      return (<>ExperimentalAircraft no handler found</>)
  }

  /** custom page for x15 */
  function Page_x15_spaceplane(mwmkeyLeaf) {
    const navigate = useNavigate();
    return <div><h1>x15 Spaceplane</h1><br/>first winged vehicle designed to go outside the atmosphere<br/>
        <div style={{border: 'solid 0px red', display: 'inline-block'}} 
             onClick={ () => { const nav = getNavigateDir();
               navigate(nav.locationDir + '/' + mwmkeyLeaf.clickMeLink + nav.fontSuffix)}} >
        <img style={{border: 'solid 5px white', borderRadius:'48px', margin:'5vw', width:'70vw' }} 
            src='/jpeg/hist/aerospace/WIKIMEDIA-X-15_flying.jpg' alt='x15'
            // onClick={() => { { window.location=mwmkeyLeaf.clickMeLink } }}
            //onClick={navigate(mwmkeyLeaf.clickMeLink)}
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

    function Tools2level() {
      console.log("Tools2level() here, workshopTools with 2 more levels in REST")
      var zz = useParams();
      return(<>Tools2level() here, workshopTools with 2 more levels in REST <i>"path=':ftype/:subtype'"</i><br/> 
             ftype: {zz.ftype}<br/> subtype: {zz.subtype}</>)
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
        return <MediaPictureWithInfo mwmkeyLeaf={mwmkeyLeaf}  
          //imageDescPopup={Popup_custom} 
        />
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

    function TodaysSoup() {
      var zz = useParams();
      return(<>todaySoup() choice: {zz.choice}</>)
    }      
   

}

export { ReactAppForDevelopment };

/* WARNING: this app needs react-router-dom V.6 or newer.
   To check that you have V.6 this should crash the app: import { Prompt } from "react-router-dom";
*/
/* Text from https://patorjk.com/software/taag   Font Name: ??                                                                               
  ___ ___   _   ___ _____   _    ___ ___ ___ _____   _____ _    ___   __  __ ___ _____ _  _  ___  ___  ___ 
 | _ \ __| /_\ / __|_   _| | |  |_ _| __| __/ __\ \ / / __| |  | __| |  \/  | __|_   _| || |/ _ \|   \/ __|
 |   / _| / _ \ (__  | |   | |__ | || _|| _| (__ \ V / (__| |__| _|  | |\/| | _|  | | | __ | (_) | |) \__ \
 |_|_\___/_/ \_\___| |_|   |____|___|_| |___\___| |_| \___|____|___| |_|  |_|___| |_| |_||_|\___/|___/|___/
                                                                                                          
   * COMPONENT LIFECYCLE METHODS: react.js has lifecycle methods called by the framework
   * when a component first loads, another one every time it renders, another one every time
   * a useState() thing changes value, another when component unloads, and more.
   * Unlike other frameworks, REACT USES THE WORD "USEEFFECT" FOR "LIFECYCLE METHODS"
   * There are 3 react.js things it calls 'hook functions' used here for react function components:
   *    useState(), useRef() and useEffect.
   * Below is how they are used in this project, but are not complete descriptions:
   * 1. You code "useEffect" methods and the point it gets called in the component lifecycle
   *    is defined according to second array arg and return value [done this way probably to
   *    streamline code for those who code for it every day, but not for me, personally]. :
   *   + missing: run every time. Good for getting dimensions of window etc
   *   + [] empty: run only once when component mounts like componentDidMount
   *   + [aa, bb]: do only when aa or bb changes
   *   + [] empty and returns function: runs when component unmounts
   * 2. "useState" sets up a variable which perists between renders and queues a render when its value is changed.
   * 3. "useRef" lets you name a dom element and reference it in the code.
   */
  /* "If you’re familiar with React class lifecycle methods, you can think of useEffect Hook as componentDidMount, 
      componentDidUpdate, and componentWillUnmount combined" */

  /**   TRASH BUT MAYBE USEFUL SOMETIME
   * 
       * Creates 2 images from 2 url's, one for the initial image to show while the primary (hidden)
       * image loads, which may take a while. When loaded, swap CSS 'display' settings.
       * @   param preloadImage small image displayed while primaryImage loads
       * @   param primaryImage final image may take some time to load
       * /
      const CreateImgSwapLoad = (props) => {
        / * state variable keeps track of which image to hide or show depending on load status.
           Changing this variable causes a redraw, to reflect 'display' status. * /
        const [isLoaded, setIsLoaded] = useState(false);
        console.log('preload: ' + props.preload)
        return (<>
        {/ * "show me before next image loads, then set my display to 'none' which hides me"  * /}
            <img src={props.preload } 
                style={{ display: isLoaded ? "none" : "block", width:'90%'}} />
        {/ * "hide me before I load, then set my display to 'block' which shows me"  * /}
            <img src={props.src } 
                style={{ display: isLoaded ? "block" : "none", width:'90%'}}
                // when loaded, fire a redraw, changing only CSS display status
                onLoad={() => { setIsLoaded(true) }} />
            </>)
    }
      */

   
   /*
   useEffect(() => {  
    document.querySelector('#rootDivA').addEventListener('click', doClick)
   ...
  }, []); 
  function doClick(zz) { console.log('click'); zz.target.removeEventListener('click', doClick)}
  function doDrag() { console.log('drag')}

  <Route path=':foo' render={(props) => { <Tools2level {...props} /> }} />
  */