import React, { useEffect, useState, useRef } from 'react';
import { DoHtml5AnimateSlide } from './Html5AnimationHelper';
import { MobiWekAutoXYScrollMenuComponent } from './mobiwekMenuBuilder.jsx'
import { scrollVandHToShowChosenSubmenu } from './mobiwekMenuBuilderHelper'
import './mobiwekMenu.css'
import { useNavigate, Outlet } from "react-router-dom";
import { GlowingBurger } from '../util/SvgAndFontHelper';
// import { validateJSONtest } from '../util/jsonUtils';

function MobiWekMenuFrame(propsMenuFrame) {
    // const adjustHeightForMobileURLbar = useRef();
    // const navigate = useNavigate();
    var borderWidth = 0;
    const DoHtml5AnimateSlide_ref = useRef(DoHtml5AnimateSlide)
    const makeMobiWekAutoXYScrollMenuComponent = (propsXY) => 
      MobiWekAutoXYScrollMenuComponent(
      { windowDotLocation: window.location, 
      // june fix to key error...  { key:-1, windowDotLocation: window.location, 
        // MENU STARTING POINT HERE
        nextLoc: propsMenuFrame.mobiwekMenuJSON_A,
        appTitle: propsMenuFrame.appTitle,
        scrollInBox:true, CloseSliderFn:propsXY.CloseSliderFn, 
        menuCallBackPtr: propsXY.menuCallBackPtr });
    setupCSSVars(); 
    const screenScalerFactor = parseInt(getComputedStyle(document.body).getPropertyValue('--mwmMenuScrnScaler'))

    useEffect(() => { // runs once when loaded 
      // react gives 8px margin by default. Bad for mobile so fix it here
      document.querySelector('body').style.margin = '0px'; 
      /* on mobile reload if orientation flip between portrait and landscape */
      var fnFlipMeDontEndlessLoop;
      window.addEventListener("orientationchange", fnFlipMeDontEndlessLoop = (() => { 
          window.removeEventListener("orientationchange", fnFlipMeDontEndlessLoop );
          window.location.reload() 
        }))
    }, []);
    
    // console.log('screenScalerFactor ' + screenScalerFactor)
    return(
      <div id='MobiWekMenuFrame' 
              style={{ color:'#eeeeff', zIndex:-10, backgroundColor:'#626262',
              /* on mobile, the url bar at top causes height 100vh to overlap 
                and scroll. Set height to innerHeight/or/outerHeight instead. */
              height:(window.innerHeight - borderWidth * 2) + 'px',
              backgroundRepeat: 'initial', backgroundSize: 'contain', padding:'0px', margin:'0px',
              border: borderWidth + 'px dotted #00ff00',
              overflow:'hidden', // prevents zoomable picture from stretching this div
              display:'grid'
              //, gridTemplateColumns: '1fr' 
            }}>
          <div id='hamburgermenu' className='eatZoomGesture' style={{ height:'fit-content', gridColumn: '1/2', gridRow:'1/2'}} >
            <GlowingBurger 
              onClick={ () => { 
                // to try out json validation stuff ..    validateJSONtest();
                DoHtml5AnimateSlide_ref.current.ToggleMenuSlideInOut(null); }}
              fontSize={screenScalerFactor/10 + 'px'} />
          </div>
          <div id='AnimateSlideHolder' style={{ height:'inherit', gridColumn: '1/2', gridRow:'1/2', marginTop:'2vmin'}} >
          <DoHtml5AnimateSlide ref={DoHtml5AnimateSlide_ref}
                menuCallBackPtr={ propsMenuFrame.menuCallBackPtr }
                showCSS={ false }
                /* below is a function which returns a component.
                    IT IS NOT CALLED NOW. It is called a few layers down, using props
                    which are not specified now, but are given to the
                    "parent" components above */
                sideSlidePayload={ makeMobiWekAutoXYScrollMenuComponent }
                /* tells menu to scroll to current choice when menu comes up */
                onPayloadVisible={ () => { 
                  var currentlyChosenMenuItem = 
                        document.querySelector('[mwmCurrent="mwmchosen"')
                  scrollVandHToShowChosenSubmenu(currentlyChosenMenuItem, 0)} }  
              />
          </div>
          {/* below is page content to be displayed. Some pages get the zoom/pan wrapper and some
              get a plain display; give these CSS overflow:scroll  */}
          <div id='divPageContentInFrameHelper' 
              style={{ gridArea:'1 / 1 / 2 / 2', zIndex:'0', overflow: propsMenuFrame.overflowCSS }} >
              { propsMenuFrame.pageContent }
          </div>
      </div>)
    
    function setupCSSVars() {
      var smallerDimension = Math.min(window.screen.width, window.screen.height);
      // console.log('smallerDimension ' + window.screen.width)
      var radius = '8px' // ok for mobile
      if (smallerDimension > getComputedStyle(document.body).getPropertyValue('--mwmVMINcutoff')) { 
          // console.log('assuming desktop size')
          radius = '15px'
          smallerDimension *= getComputedStyle(document.body).getPropertyValue('--mwmScalerDesktop');
      } else {
          console.log('assuming mobile size')
          smallerDimension *= getComputedStyle(document.body).getPropertyValue('--mwmScalerMobile');
      }
      document.body.style.setProperty('--mwmScaledRadius', radius);
      document.body.style.setProperty('--mwmMenuScrnScaler', smallerDimension);
    }
}

export { MobiWekMenuFrame }

/* SAVE below works ok
              sideSlidePayload={(props) => { 
                console.log('sideSlidePayload contrl created')
                return(<MobiWekAutoXYScrollMenuComponent // need {...props} to send CloseSliderFn
                    key={-1} windowDotLocation={window.location} nextLoc={propsDBGM.mobiwekMenuJSON_A} 
                    scrollInBox={true} 
                    CloseSliderFn={props.CloseSliderFn}
                    menuCallBackPtr={ props.menuCallBackPtr } 
                    />) }} */