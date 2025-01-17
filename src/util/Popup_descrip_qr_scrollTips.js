import React, { useState, useEffect, useRef } from 'react';
import { doQRcode, ShellCommandsToStartBrowser } from './qrCode'

/**
 * This component is a popup showing description of image, qr button and viewing tips
 * @param isVisible
 * @param txtdesc
 * @param callBackCloseMe
 */
function Popup_descrip_qr_scrollTips(props) {
    const dispConstA = 'grid'
    var qrcanvas = useRef();
    var alreadyVisible = useRef(false);
    var makeVisibleThisTime = false;
    if (props.isVisible) { 
        /* user wants to open dialog */
        makeVisibleThisTime = true; 
        alreadyVisible.current = true; /* set things up for removing later */
    }
    //console.log('bb ' + props.isVisible)
    if (!props.isVisible && alreadyVisible.current) {
        /* user wants to close the open dialog. Setup spiffy hide-animation.
           Note: dialog must still be visible for animation to work!  */
        makeVisibleThisTime = true; 
    } 
    // TODO when dialog is shows a second time and the toast is shown, a flash happens when toast hides
    useEffect(() => { 
        //console.log('qqqq ' + props.isVisible + ' ' + alreadyVisible.current)
        /* useEffect fires when the dialog has fully loaded. 
           Now determine if user is done with the dialog. If so do animation to
           hide it in a spiffy way. */
        doQRcode(window, qrcanvas.current); // render qr code always.
        var dialogDiv = document.querySelector('#divPopupContentRoot');
        if (makeVisibleThisTime) dialogDiv.style.display = dispConstA 
        if (!props.isVisible && alreadyVisible.current) {
            // console.log('animating close dialog')
            /* user has dismissed dialog; we know because it is still visible. So run hide-animation now */
            dialogDiv.classList.add('animateHideDialogA'); /* this starts animation (see css file) */
            /* when animation has completed "animationend", hide it..  */
            dialogDiv.addEventListener("animationend", 
              () => { // console.log('animationend display: ' + dialogDiv.style.display  )
                      dialogDiv.style.display = 'none'; /* hide it now */
                      alreadyVisible.current = false; /* setup for next time */
                      dialogDiv.classList.remove('animateHideDialogA') }); /* so it won't do same thing next appearance */
        }
    }); // no args, run every time
    // ref: https://en.wikipedia.org/wiki/Geometric_Shapes_(Unicode_block)
    const rightArrow = <>&#x25B6;</> // the x means hexadecimal. Using <> and </> make it a jsx thing
    return( 
            <div id='divPopupContentRoot' className='eatZoomGesture' 
                style={{ display:(makeVisibleThisTime ? dispConstA : 'none'), // FOR SCROLLING CHILD OF FIXED HEIGHT DIV
                         gridTemplateRows: 'auto 1fr', // FOR SCROLLING CHILD OF FIXED HEIGHT DIV
                         zIndex:'222', // big zIndex else loses click to higher element
                         position:'absolute', 
                         fontSize:parseInt(getComputedStyle(document.body).getPropertyValue('--mwmMenuFontSize')) * 0.8 + 'px',
                         top:(window.innerHeight * 0.1) + 'px', // other way..    '5vh', 
                         // calculations are in javascript, not css calc thing..
                         maxHeight:window.innerHeight - (window.innerHeight * 0.2) + 'px', 
                         }} >
                <div id='detailDivA' style={{ display:'none'}} className='popup_textblock buttonA' >
                  <div id='zz8'>..Scan QR to show this page on mobile</div>
                  <canvas ref={qrcanvas} style={{ width:'200px', height:'200px'}} />
                </div>
                <div id='detailDivB' style={{ display:'none'}} className='popup_textblock buttonA' >
                  <div>to zoom:<br/>{rightArrow} on mobile: pinch<br/>{rightArrow}  on desktop trackpad: 2 fingers drag down
                       <br/>{rightArrow} on desktop mouse: use wheel</div>
                </div>
              <div className='popup_textblock' 
                   style={{ gridRow: '1/2', overflow:'auto', paddingBottom:'6px'}} >
                { props.txtdesc }
              </div>
              <div id='okCancelButtons' 
                    style={{ gridRow:'2/3', marginLeft:'10px', marginBottom:'7px' }}>
                <div style={{ borderTop:'5px dotted #555555', padding:'1vh', marginTop:'1vh',
                            gridRow:1, gridColumn:'1/22', height:'max-content' }} />
                <div style={{ gridRow:2, display:'grid',  gridTemplateColumns: '1fr 4fr 4fr' }}>
                  <div className='buttonA' 
                    onClick={() => {
                      // [id^='someId'] will match all ids starting with someId
                      document.querySelectorAll('[id^="detailDiv"]') // close all popups
                          .forEach((bbb) => { bbb.style.display = 'none'})
                      props.callBackCloseMe(false)
                    } } 
                    autoFocus={true} appearance="primary">
                    Ok
                  </div>
                  <div className='buttonA' 
                    onClick={() => { 
                      console.log('buttonA clicked')
                      document.querySelectorAll('[id^="detailDiv"]') // close all popups
                          .forEach((bbb) => { bbb.style.display = 'none'})
                      document.querySelector('#detailDivA').style.display = 'block'}} 
                    autoFocus={true} appearance="primary">
                    QRcode
                  </div>
                  <div className='buttonA' 
                    onClick={() => { 
                      document.querySelectorAll('[id^="detailDiv"]') // close all popups
                          .forEach((bbb) => { bbb.style.display = 'none'})
                      document.querySelector('#detailDivB').style.display = 'block'}} 
                    autoFocus={true} appearance="primary">
                    Scrolling<br/> Tips
                  </div>
                </div>
              </div>
            </div>
        )
    }


    export { Popup_descrip_qr_scrollTips }

        // console.log('open: ' + props.isOpenModal + ' currentlyVisible ' + isVisibleBeforeThisRender.current +
    //         ' showMe ' + makeVisibleThisTime)