import React, { useState, useEffect, useRef } from 'react';
import { doQRcode, ShellCommandsToStartBrowser } from './qrCode'
import { PopupToast } from './PopupToast';
import { QuestionInsideColoredCircle } from './SvgAndFontHelper';

function PopupDebugShowsQRandCmdLine(props) {
    /* setup toast that says "copied to clipboard" */
    const [toastMessageIfNullHideMe, setToastMessageIfNullHideMe] = useState(null);
    var qrcanvas = useRef();
    var alreadyVisible = useRef(false);
    var makeVisibleThisTime = false;
    if (props.isVisible) { 
        /* user wants to open dialog */
        makeVisibleThisTime = true; 
        alreadyVisible.current = true; /* set things up for removing later */
    }
    if (!props.isVisible && alreadyVisible.current) {
        /* user wants to close the open dialog. Setup spiffy hide-animation.
           Note: dialog must still be visible for animation to work!  */
        makeVisibleThisTime = true; 
    } 
    // TODO when dialog is shows a second time and the toast is shown, a flash happens when toast hides
    useEffect(() => { 
        // console.log(PopupDebugShowsQRandCmdLine.name + ' ' + props.isVisible + ' ' + alreadyVisible.current)
        /* useEffect fires when the dialog has fully loaded. 
           Now determine if user is done with the dialog. If so do animation to
           hide it in a spiffy way. */
        doQRcode(window, qrcanvas.current); // render qr code always.
        var dialogDiv = document.querySelector('#divPopupContentRoot');
        if (makeVisibleThisTime) dialogDiv.style.display = 'grid'
        if (!props.isVisible && alreadyVisible.current) {
            console.log('animating close dialog')
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

    const mwmMenuFontSize = getComputedStyle(document.body).getPropertyValue('--mwmMenuFontSize')
    return( 
            <div id='divPopupContentRoot' className='eatZoomGesture' 
                style={{ gridTemplateRows: 'auto 1fr', // FOR SCROLLING CHILD OF FIXED HEIGHT DIV
                         display:(makeVisibleThisTime ? 'grid' : 'none'), // FOR SCROLLING CHILD OF FIXED HEIGHT DIV
                         position:'absolute', top:'0px',
                         marginTop:'5vh', 
                         // below prevents app window stretch beyond screen which messes up everything
                         height:'80vh', overflow:'auto', 
                         fontSize:parseInt(mwmMenuFontSize) * 0.8 + 'px'
                       }} >
              <PopupToast messageIfNullHideMe={ toastMessageIfNullHideMe }
                          toastVisibleTimeMsec={800}
                          fontSize={parseInt(mwmMenuFontSize) * 2 + 'px'}
                          onHideCallback={() => setToastMessageIfNullHideMe(null)}
                          styleZ={{ position:'absolute', top:'40vh', left:'10vw',
                                    color:'red', backgroundColor:'yellow'}} />
                <div className='popup_textblock' 
                     style={{ gridRow: '1/2' // FOR SCROLLING CHILD OF FIXED HEIGHT DIV
                    }}  >
                  Scan QR to show this page on mobile<br/>
                  <div style={{ display:'inline-grid', // inline-grid uses minimum width
                                gridTemplateColumns:'auto auto'}}>
                    <canvas ref={qrcanvas} style={{ width:'200px', height:'200px', float:'left'}} />
                    <QuestionInsideColoredCircle 
                       styleZ={{ margin:'10px 10px 10px 10px'}}
                       fontSize={parseInt(mwmMenuFontSize) * 1.3 + 'px'}
                       clickCallback={(foo) => { console.log(foo); setToastMessageIfNullHideMe('whooopee!') }} />
                  </div>
                  <div style={{ borderTop:'5px dotted #555555', padding:'1vh', marginTop:'1vh' }} ></div>
                </div>

                <div className='popup_textblock'
                     style={{ gridRow: '2/3', overflow:'auto', // FOR SCROLLING CHILD OF FIXED HEIGHT DIV
                              paddingBottom:'6px'}} >
                  This dialog is a helper for development. To view this page on mobile, you need to <br/>
                  show this page using the host IP, not localhost.<br/>
                  Below are shell commands for starting the browser this way, for windows and un*x <br/>
                  The QR code will reflect the new address; scan it and go to the page. <br/>
                  WARNING: Even without doing this, your source code will appear in the browser's debugger [inspect] by default.
                    <ShellCommandsToStartBrowser 
                       clickCallBack={(msg) => { 
                          // LOOK how <> and </> make it a JSX thing! msg is in braces because its injected into the JSX
                          setToastMessageIfNullHideMe(<>Copied to<br/>Clipboard {msg}</>) /* useState thing causes rerender of toast so it shows */ }}/>
                </div>
              {/* </div> */}
              <div id='okCancelButtons' 
                    style={{ gridRow: '3/4', 
                      display:(props.callBackCloseMe === null) ? 'none':'grid',
                      gridTemplateColumns: '1fr 4fr',
                      marginLeft:'20px', marginBottom:'7px' }}>
                <div className='buttonA' onClick={() => props.callBackCloseMe(false) } 
                  autoFocus={true} appearance="primary">
                  Ok
                </div>
              </div>
            </div>
        )
    }


    export { PopupDebugShowsQRandCmdLine }

        // console.log('open: ' + props.isOpenModal + ' currentlyVisible ' + isVisibleBeforeThisRender.current +
    //         ' showMe ' + makeVisibleThisTime)