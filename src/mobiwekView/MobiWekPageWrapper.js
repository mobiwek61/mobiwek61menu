import React, { useEffect, useState, useRef } from 'react';
import { eatZoomGesture } from "../mobiwekMenu/mobiwekUtils"
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";// "^3.1.0",
// SAVE AS EXAMPLE..  import { getAllPetGreetingFunctions } from "./TypeScriptExample.ts"

  /** This wrapper adapts an html/jsx page or image to work properly with mobiwekMenu
   *  First, it disables browser zoom so the menu doesn't zoom away. It then enables zoom for
   *  the wrapped item, using the react-zoom-pan-pinch library.
   *  displays thepage with these mods:
   *  - disables browser zoom because that hides the menu bars and user gets lost
   *  - sizes page with scroll setup
   *  Typical call: MobiWekPageWrapper(page_x15_spaceplane(mwmkeyLeaf))
   */
  function MobiWekPageWrapper(thepageOrImg)  {
      // SAVE AS EXAMPLE..   TestGetSetOfImportedFunctions();

      // WARNING below produces error "React has detected a change in the order of Hooks"
      // useEffect(() => { 
      //   document.querySelectorAll('.eatZoomGesture').forEach((bbb) => {
      //     eatZoomGesture(bbb)}) // prevent zoom gesture from getting seen by browser and hiding the menu
      // });
      
      /* setup a hook function called by RZPP which resets zoom. Going from zoomed page to
        other page does not auto reset the zoom to level 1, so this is needed.
        RZPP hooks code require they are in separate component, not inline or inside tags,
        AND are nested inside TransformComponent. Took a while to figure this out.  */
      const ComponentHoldingHookForRZPP = () => { 
        // OK: useTransformInit(({ state, instance }) => { console.log(state); // { previousScale: 1, scale: 1, positionX: 0, positionY: 0 } });
        // SAVE... see code for TestGetSetOfImportedFunctions to see how useControls() brings in lots of functions
        const { instance, zoomIn, zoomOut, ...restOfParsBB } = useControls();
        // hover over restOfParsBB to get param list. Animationname is chosen from param description cant make your own.
        // ref: [work done here] react-zoom-pan-pinch-master\src\core\handlers\handlers.utils.ts
        //      "optional chaining (?.) operator accesses an object's property or calls a function"
        restOfParsBB.resetTransform(222, 'linear'); // (animationTime, animationType)
      }
      return <>
      <div id='pgRefreshDragDownMask' // className='eatZoomGesture'
            /* image zoom/scroll prevents normal page reload-drag gesture. 
              Preventing at top of screen using this div to eat the event instead.
              Note it's zIndex z-index is between the menu and the screen content.  */
            style={{ position:'absolute', width:'100%', height:'20%', zIndex:'25'}} 
      />
      {/* NOTE: TransformWrapper and TransformComponent are Components of 
          the awesome npmjs.com react-zoom-pan-pinch project.
          Consists of "wrapper" containing "content".
          Wrapper: serves as a constant size/position viewport through which the zoomable/panable window
                  "content" is displayed. 
          content: second level div made by rzpp. This is the div which grows when pinch-zoomed and is clipped
                  according to parent "wrapper" viewport window */}  
      <TransformWrapper initialScale={1.0}
           centerZoomedOut={true} limitToBounds={false} // prevents pan jumping
           maxScale={50} minScale={0.3}> 
        <TransformComponent wrapperStyle={{ height:'98vh'}}>
          <ComponentHoldingHookForRZPP/> 
          <div className='noZoomPageW' >
                    <div style={{margin:'20px'}}> {thepageOrImg} </div></div>
        </TransformComponent>
      </TransformWrapper>
      </>
  }

  /* SAVE AS EXAMPLE
  const TestGetSetOfImportedFunctions = () => {
    console.log('getpets: ' + getAllPetGreetingFunctions('fuzzy1').dog)
    console.log('getpets: ' + getAllPetGreetingFunctions('fuzzy2').cat)
    console.log('getpets: ' + getAllPetGreetingFunctions('fuzzy3').moose)
    console.log('getpets: ' + getAllPetGreetingFunctions('').rat)
  } */

  export { MobiWekPageWrapper }