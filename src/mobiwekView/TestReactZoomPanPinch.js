import React, { useEffect, useRef, useState } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";// "^3.1.0",
import { eatZoomGesture } from '../mobiwekMenu/mobiwekUtils';

function TestReactZoomPanPinch(mwmkeyLeaf) {
      useEffect(() => { 
            /* same thing is done in ancestor component, however it's useEffect doesnt get fired 
               when this component re-renders, so it must be done again */
            document.querySelectorAll('.eatZoomGesture').forEach((bbb) => { 
               eatZoomGesture(bbb)})
            //document.querySelector('#debugMsgMobile').append('asfsaf')
      }); // , []); // [] empty: run only once when component mounts like componentDidMount

      // NOTE: TransformWrapper and TransformComponent are Components of 
      // the awesome npmjs.com react-zoom-pan-pinch project.
      // Consists of "wrapper" containing "content".
      // Wrapper: serves as a constant size/position viewport through which the zoomable/panable window
      //             "content" is displayed. 
      // content: second level div made by rzpp. This is the div which grows when pinch-zoomed and is clipped
      //             according to parent "wrapper" viewport window 
      return(
            <div style={{ width:'100vw', height:'100vh', border:'5px solid green'
                   
            }}>
                     <TransformWrapper 
                        //minScale={finalDims.zoomDownForAllFit}
                        centerZoomedOut={true} limitToBounds={false} // prevents pan jumping
                        maxScale={50} 
                     >
                     <TransformComponent 
                        /* note: styles for both wrapper and content are set here */
                        wrapperStyle={{  // NOTE: !!! style for parent wrapper component !!!!
                           position:'absolute', // so sits under pgRefreshDragDownMask
                           gridRow:'1/2',
                           width:'calc(100% - 8px)', height:'calc(100% - 8px)',
                           border:'5px solid red'
                        }} 
                        // below set w/h of scrolling image window
                        contentStyle={{ /* nothing to set */ }} >   
                  {/* nope..     { props.theImgObject }       */}
                  <img id='finalImageLoaded' src='/jpeg/hist/X-15_flying.jpg' 
                        style={{  width:'55vw', height:'55vh'
                              }} alt='alt text'
                  />
                  </TransformComponent>
                  </TransformWrapper>
                  </div>
      )
}
        
    export { TestReactZoomPanPinch }

    //   destructuring assignment
  
