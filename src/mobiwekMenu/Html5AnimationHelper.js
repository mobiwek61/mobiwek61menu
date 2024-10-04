import React, {useRef, useState, useEffect, forwardRef, useImperativeHandle } from 'react';

//var fontAwsomeSizeThing = "2x"; // see options at end of this file
//var theIcon = FaBars //<FontAwesomeIcon icon={faBars} size={fontAwsomeSizeThing} />

const animEndDontAddMeTwice = (htmlElem, hideMe) => { 
    // console.log('animEndDontAddMeTwice'); 
    if (hideMe) htmlElem.style.display = 'none';
}
const x_hidden = -250;

/*   animation done by html5, not react.js code 
     https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations 
     JavaScript can access the @keyframes at-rule with the CSS object model interface CSSKeyframesRule.
     About forwardRef: its used here to expose function SlideToOpen to code outside DoHtml5AnimateSlide 
     Something about creating a ref to it in the client code... */
const DoHtml5AnimateSlide = forwardRef((propsSlide, ref) => {
    /* useImperativeHandle somehow exposes it to outside this functional component
       This does a dom CSS javascript animation.
       Using useState() as a param to this component causes a refresh, which gums
       up the css animation of it sliding left and right.
       Only ONE function is possible as far as I can tell   */
    useImperativeHandle(ref, (overrideIfNotNull) => ({
        ToggleMenuSlideInOut(override) { 
            if (document.querySelector('#divSlidesInToShowMenu')
                       .classList.contains('animateSlideFromLeft')) {
                override = false; // menu IS OPEN so close it
            }
            if (override == null) {
                SlideToOpen(); 
            } else if (override === true) {
                SlideToOpen(); 
            } else {
                SlideToClose();
            }
        }
    }))
    return(
      <div id='divSlidesInToShowMenu' style={{ left:{ x_hidden }, display:'none',
              position:'relative', zIndex:'10' }} >
        <propsSlide.sideSlidePayload 
            menuCallBackPtr={ propsSlide.menuCallBackPtr } /* runs callback in client code */
            CloseSliderFn={ SlideToClose }
            />
      </div>
    )
    
    function SlideToOpen() {  // also ok const SlideToOpen = () => {
          const divSlidesInToShowMenu = document.querySelector('#divSlidesInToShowMenu');
          // dont do this way because they get added each time..... elemA.addEventListener("animationend", animEndDontAddMeTwice(elemA, false)); 
          divSlidesInToShowMenu.onanimationend = (event) => {
            animEndDontAddMeTwice(divSlidesInToShowMenu, false)
            /* below tells menu to scroll itself into position. Necessary for
               the FIRST time only; subsequent calls its already fully setup. 
               See tag for this control to see what the actual function is */
            //// fails when something is chosen...    if (firstCalled.current) 
                propsSlide.onPayloadVisible(); 
            ////firstCalled.current = false;
          };
          divSlidesInToShowMenu.style.display = 'block'; // make VISIBLE!
          divSlidesInToShowMenu.classList.remove('animateSlideNhide');
          divSlidesInToShowMenu.classList.add('animateSlideFromLeft');
          /* onPayloadVisible gets called when page is directed to a url bookmark
            and menu slides-in and needs to be scrolled to
            accommodate the current url which may be several levels down ie:
            http://localhost:3000/pictures/tableware/cups */
          
          /* 0=0=0=0=0=0=0=00=0=0=0=0=0=0=00=0=0=0=0=0=0=00=0=0=0=0=0=0=0
              SAVE DONT DELETE!!!!!  SHOWS HOW TO ANIMATE IN CODE, NOT USING CSS FILE.
              IT LETS YOU USE VARIABLES TO DETERMINE ANIMATION PARAMETERS WHICH CANNOT
              BE DONE USING CSS FILE. NOT USED HERE SO SOURCE CODE NOT NEEDED TO TUNE ANIMATION.
          const slideNbounce_keyframes = [{ transform: 'translateX(' + x_hidden + 'px)' }, 
            { transform: 'translateX(' + x_visible + 'px)' }];
          divSlidesInToShowMenu.animate(slideNbounce_keyframes, 
            { duration: 250, 
              // TO GET BEZIER VISIT https://cubic-bezier.com/#.17,.67,.87,.26
              easing: 'cubic-bezier(0,.96,1,1.11)', // goes past and bounces back bc > 1.0
              fill:'forwards', direction:'normal' } // fill means keep new postion. direction:theDirection javascript--bezierCurveTo() 
          );
              0=0=0=0=0=0=0=00=0=0=0=0=0=0=00=0=0=0=0=0=0=00=0=0=0=0=0=0=0 */
    }

    function SlideToClose(zz) { 
      const elemB = document.querySelector('#divSlidesInToShowMenu');
      // htmlElem.style.display = 'block'; // make VISIBLE!
      elemB.classList.remove('animateSlideFromLeft');
      elemB.classList.add('animateSlideNhide');
      // hide it when animation has completed, not before
      elemB.onanimationend = (event) => {animEndDontAddMeTwice(elemB, true)};
      /* 0=0=0=0=0=0=0=00=0=0=0=0=0=0=00=0=0=0=0=0=0=00=0=0=0=0=0=0=0
      SAVE DONT DELETE!!!!!  SHOWS HOW TO ANIMATE IN CODE, NOT USING CSS FILE.
          IT LETS YOU USE VARIABLES TO DETERMINE ANIMATION PARAMETERS WHICH CANNOT
          BE DONE USING CSS FILE. NOT USED HERE SO SOURCE CODE NOT NEEDED TO TUNE ANIMATION. 
      var anim = htmlElem.animate([{ transform: 'translateX(' + x_hidden + 'px)' }], 
        { duration: 500, // BELOW TO GET BEZIER VISIT https://cubic-bezier.com/#.17,.67,.87,.26
          easing: 'cubic-bezier(.22,0,.91,1.27)', // goes past and bounces back bc > 1.0
          fill:'forwards', direction:'normal' }  // fill means keep new postion. direction:theDirection javascript--bezierCurveTo() 
      );
      // https://developer.mozilla.org/en-US/docs/Web/API/Animation/finished
      anim.finished.then( () => { 
        // console.log('amin done') // finished is a "promise"
        htmlElem.style.display = 'none';
      });
      0=0=0=0=0=0=0=00=0=0=0=0=0=0=00=0=0=0=0=0=0=00=0=0=0=0=0=0=0 */
    }

}
) // forwardRef
     
     /* SAVE as simple example
     const TestCSSanimation = () => {
      var showYesHideNo = false;
      const doAnimate = (event) => {
          var slideX = 200;
          const htmlElem = document.getElementById('divDoingTheSliding'); // not portable.. event.target;
          htmlElem.style.background = '#ffff00'
          showYesHideNo = !showYesHideNo;
          const hideIt_keyframes = [{ transform: 'translateX(' + slideX + 'px)' },
                { transform: 'translateX(0px)' }];
          const slideNbounce_keyframes = [{ transform: 'translateX(0px)' }, 
                { transform: 'translateX(' + slideX + 'px)' }]; //,
                //{ transform: 'translateX(' + (slideX - 10) + 'px)' }];
          var keyFrameSet = hideIt_keyframes; // gets changed...
          if (showYesHideNo) {
            htmlElem.style.background = '#00ffff'
            keyFrameSet = slideNbounce_keyframes;
          }
          // most googles give css file @keyframes method. I like this better
          // https://developer.mozilla.org/en-US/docs/Web/API/Element/animate
          // https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffect/KeyframeEffect#parameters
          event.target.animate(keyFrameSet, 
            { duration: 500, // BELOW TO GET BEZIER VISIT https://cubic-bezier.com/#.17,.67,.87,.26
              easing: 'cubic-bezier(.22,0,.91,1.27)', // goes past and bounces back bc > 1.0
              fill:'forwards', direction:'normal' }
              // fill means keep new postion. direction:theDirection javascript--bezierCurveTo() 
          );
      }
      return (<div id='divDoingTheSliding' style={{height:'140px',width:'100px', 
                background:'#2da73f', border:'3px solid #000', borderRadius:'5px'}} 
                onClick={(event)=>doAnimate(event)} ></div>)
    } */

    export { DoHtml5AnimateSlide /* , TestCSSanimation */ }