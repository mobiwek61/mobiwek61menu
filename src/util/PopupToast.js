import React, { useState, useEffect, useRef } from 'react';

function PopupToast(props) {
    
    function hideToastAnimate() {
        // console.log('toast anim start')
        var toastDiv = document.querySelector('#toastA');
        /* run hide-animation now */
        toastDiv.classList.add('animateHideDialogB'); /* this starts animation (see css file) */
        /* when animation has completed "animationend", hide it..  */
        toastDiv.addEventListener("animationend", () => { 
            toastDiv.style.display = 'none'; /* hide it now */
            toastDiv.classList.remove('animateHideDialogB') // must remove for next appearance
            // console.log('anim end ' + toastDiv)
            props.onHideCallback(); // tell caller to set its useState thing
        }); /* so it won't do same thing next appearance */
    }

    useEffect(() => { 
        if (props.messageIfNullHideMe != null) {
            setTimeout(() => { hideToastAnimate(); }, props.toastVisibleTimeMsec);
        }
    }); // useEffect no args:run every time

    if (props.messageIfNullHideMe == null) 
        return (<></>);
    return( <div id='toastA' 
                 style={{ fontSize:props.fontSize, ...props.styleZ, backgroundColor:'#bbbbbb00' }} >
              <div className='toast_divblock toast_textblock'
                   style={{ backgroundColor:props.styleZ.backgroundColor,
                            color:props.styleZ.color}}>
                 { props.messageIfNullHideMe }
              </div>
            </div>
        )
    }

    export { PopupToast }
