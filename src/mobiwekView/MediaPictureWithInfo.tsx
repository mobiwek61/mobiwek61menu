import React, { useEffect, useRef, useState } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";// "^3.1.0",
import { GlowingInfo } from '../util/SvgAndFontHelper';
import { Popup_descrip_qr_scrollTips } from '../util/Popup_descrip_qr_scrollTips';
import { eatZoomGesture } from '../mobiwekMenu/mobiwekUtils';
import { MobiWekPageWrapper } from './MobiWekPageWrapper'

/** this establishes the properties supplied to the info popup from MediaPictureWithInfo.tsx */
interface PopupProps {
   domImgObj?: object;
   isVisible?: boolean;
   txtdesc?: string;
   addlPars?: object;
   callBackCloseMe?: (value: boolean) => void;
   somethingElse?: string;
}
var foo:PopupProps = {}; foo.somethingElse = '.this is foo PopupProps'; console.log(foo)
/**
 * This control handles an image to be displayed. It also shows an info icon which invokes a popup when pressed.
 * @param {*} mwmkeyLeaf element of the menu tree of the application. Typically mobiwekMenuJSONexample
 * @returns 
 */
// this works also -> function MediaPictureWithInfo(mwmkeyLeaf, imageDescPopup) {
// before conversion from propsQ from 4 params to unlimited using ... spread operator april 2025
function MediaPictureWithInfo(propsQ) {
      const preloadImage = new Image();
      console.log('MediaPictureWithInfo with imageDescPopup optional param 4')
      preloadImage.src = '/jpeg/imgLoading.jpg' // shows while loading
      var scrnIsPortrait = (window.innerHeight - window.innerWidth > 0) ? true : false;
      const screenScalerFactor = parseInt(getComputedStyle(document.body).getPropertyValue('--mwmMenuScrnScaler')) 
      /**
          * Calculates image dimensions according to these values of **mwmtype** :
          *   - 
          * @param {*} imgWH original IMAGE width/height structure
          * @param {*} winWH original WINDOW width/height structure
          * @param {*} mwmtype determines how image gets scaled  
          *      - 'handwriting' always takes full screen width, flush to top, so its easy to read something like a newspaper etc full width.
          *      - anything else scaled so its full width or height will fit in window.
          * @returns structure having new image width, height and minimum zoom so that zooming down wont give a postage stamp.
          */
         const fitToWidthHeight = (imgWH, winWH, mwmtype) => {
            // JSDoc uses below declaration to generate docs. Adding elements dynamically makes it weird out.
            var dims = { zoomDownForAllFit:1, width:-1, height:-1, doesImageTakeFullWidth:false }; 
            //dims.height = winWH.height/2
            //return dims;
            // SAVE as example..looks absolutely useless...     let { width } = winWH; console.log('"destructured object": ' + width)
            dims.doesImageTakeFullWidth = ((imgWH.width/imgWH.height - winWH.width/ winWH.height) > 0)
            if (mwmtype === 'handwriting') {  
               // handwriting always shown full width to facilitate reading it
               dims.width =  winWH.width;
               // calculate new scaled height of image. May be taller than window requiring scrolling
               dims.height = ( winWH.width / imgWH.width) * imgWH.height;  
               dims.zoomDownForAllFit = // calculate zoom factor to view entire image without scrolling
                  (dims.doesImageTakeFullWidth) ?  winWH.width/dims.width :  winWH.height/dims.height;
               // SAVE document.querySelector('#debugMsgMobile').append('zoom ' + dims.zoomDownForAllFit)
            } else if ((imgWH.width/imgWH.height) -  winWH.width/ winWH.height > 0) {
               // image ratio wider than window so show full width
               dims.width = winWH.width;  // image takes full width
               dims.height = ( winWH.width / imgWH.width) * imgWH.height;
            } else {
               // image ratio narrower than window so show full height
               dims.height = winWH.height;  // image takes full height
               dims.width = ( winWH.height / imgWH.height) * imgWH.width;
            } 
            return dims
         }


      return(
         <div id='mobiwekViewComponent' className='noZoomPageW'
              style={{ height:'inherit', zIndex:'0', top: '0px', gridArea:'1/1/2/2'
                    // ,border:'3px solid red'
              }} >
            <CreateRZPPimageWithPreloadStandIn 
               preload={preloadImage} imgSrcUrl={propsQ.mwmkeyLeaf.imgurl} mwmkeyLeaf={propsQ.mwmkeyLeaf}
               mwmtype={propsQ.mwmkeyLeaf.mwmtype} imageDescPopup={propsQ.imageDescPopup}
               addlPars={propsQ.addlPars} /> 
            {/* for putting message on mobile screen for debug. comment out... */}
            {/* SAVE...  <div id='debugMsgMobile' style={{ position:'absolute', top:'90px', backgroundColor:'#ffffbb',  
            height:'max-content', fontSize:'22px', zIndex:200, color:'black'}} /> */}
         </div>);
      
        
   // function finalImageLoaded(theSrc, finalDims) {
   //    return <img id='finalImageLoaded' src={theSrc} 
   //    // TODO: can't I just show the image object direct without src= ?
   //    style={{  width:finalDims.width + 'px',
   //             height:finalDims.height + 'px'
   //          }} alt='alt text'
   //    />
   // }

   function PupA(treats) {
      return <>this is PupA txtdesc: { treats.txtdesc } </>
   }
 
   /**
       * ImgDivWithInfoBtn
       * typically called twice, once upon initial page load and again when image is loaded 
       * and setState() thing gets set and causes component refresh.
       * @param props.theImgObject  image object to be displayed
       * @returns npmjs.com react-zoom-pan-pinch with image, or blank.
       */
   
   function ImgDivWithInfoBtn(dvprops) {
      useEffect(() => { 
         /* same thing is done in ancestor component, however it's useEffect doesnt get fired 
            when this component re-renders, so it must be done again */
         document.querySelectorAll('.eatZoomGesture').forEach((bbb) => { 
            eatZoomGesture(bbb)})
         //document.querySelector('#debugMsgMobile').append('asfsaf')
      }); // , []); // [] empty: run only once when component mounts like componentDidMoun
      const transformComponentRef = useRef();// useRef<ReactZoomPanPinchRef | null>(null);
      const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
      if (dvprops.theImgObject == null) return(<></>) // image not loaded yet so show nothing
      else {
         console.log((dvprops.imageDescPopup) ? 'custom popup': 'default popup')
         var ThePopup: React.FC<PopupProps> = dvprops.imageDescPopup ? dvprops.imageDescPopup : Popup_descrip_qr_scrollTips 
      //   var thePopup = <>hello from thepopup</>
      //   thePopup = PupA ( /* this popup shows description of image, qr and scroll tips */
      //      { txtdesc:props.mwmkeyLeaf.txtdesc, isVisible:isInfoPopupOpen,
      //        callBackCloseMe:isOpen => setIsInfoPopupOpen(isOpen)})  
      
        /* we need to calculate the image size and postion. Depends on aspect ratio of image and screen (is
           it landscape or not). Since the dom is not yet rendered, can't get dimensions of parent. Instead
           use dimensions of window, may need to flub a bit.
           Setup TransformComponent below using attribute initialPositionX='123' */
        var finalDims = fitToWidthHeight(
            // brackets is es6 way of "struct" etc. 
            {width: dvprops.theImgObject.width, height: dvprops.theImgObject.height}, // image
            {width:window.innerWidth, height:window.innerHeight}, // window
            dvprops.mwmtype // if handwriting, dimension differently etc
            );
        var ofstY = finalDims.doesImageTakeFullWidth ? centerHeight(): 0;
        var ofstX = finalDims.doesImageTakeFullWidth ? 0: centerWidth();
        function centerHeight() { return (window.innerHeight - finalDims.height) * .4}
        function centerWidth() { return (window.innerWidth - finalDims.width) * .5 }
        // nope...  var testImg = props.theImgObject; testImg.style.width='100vw'; testImg.style.height='auto';
        return(
        <div id='final_RZPP' style={{ 
               display:'block',
               width:'100%', 
               //height:'100%',
               height:window.innerHeight + 'px'
               // if border change width etc...  border:'4px solid #ff0000', width:'calc(100% - 8px)', height:'calc(100% - 8px)'
               }}>
        <div id='pgRefreshDragDownMask' className='eatZoomGesture'
             /* image zoom/scroll prevents normal page reload-drag gesture. 
                Preventing at top of screen using this div to eat the event instead.
                Note it's zIndex z-index is between the menu and the screen content.  */
             style={{ position:'absolute', width:'100%', height:'20%', zIndex:'25'}} 
        />
         {/* { props.popupToShow } */}
         <ThePopup 
            domImgObj={ dvprops.theImgObject } // the DOM image object from state() passed as a prop
            txtdesc={ dvprops.mwmkeyLeaf.txtdesc }
            isVisible={ isInfoPopupOpen }
            addlPars={dvprops.addlPars} 
            callBackCloseMe={(isOpen)=> { setIsInfoPopupOpen(isOpen) } } />
         {/* { thePopup } */}
         {/* <Popup_descrip_qr_scrollTips 
            txtdesc={ props.txtdesc }
            isVisible={ isInfoPopupOpen } 
            callBackCloseMe={(isOpen)=> { setIsInfoPopupOpen(isOpen) } } /> */}
         <div id='ginfo' className='eatZoomGesture'> {/* glowing  icon at bottom left. It must not pass zoom gesture to browser */}
         <div style={{ margin:'5px', zIndex:'22',
                  height:'fit-content', width:'fit-content',
                  // below lines align it with bottom of parent
                  position:'absolute', 
                  bottom:'0px'
                  //top:'288px' 
                  }}
                  onClick={ () => { setIsInfoPopupOpen(true) }} > 
            <GlowingInfo 
                  // onClick changes useState() thing & triggers re-render to show dialog
                  fontSize={screenScalerFactor/10 + 'px'} />
            </div>
         </div>
         {/* NOTE: TransformWrapper and TransformComponent are Components of 
            the awesome npmjs.com react-zoom-pan-pinch project.
            Consists of "wrapper" containing "content".
            Wrapper: serves as a constant size/position viewport through which the zoomable/panable window
                     "content" is displayed. 
            content: second level div made by rzpp. This is the div which grows when pinch-zoomed and is clipped
                     according to parent "wrapper" viewport window */}  
         <TransformWrapper 
            minScale={finalDims.zoomDownForAllFit}
            centerZoomedOut={true} limitToBounds={false} // prevents pan jumping
            maxScale={50} initialPositionY={ofstY} initialPositionX={ofstX}
         >
            <TransformComponent 
               /* note: styles for both wrapper and content are set here */
               wrapperStyle={{  // NOTE: !!! style for parent wrapper component !!!!
                  position:'absolute', // so sits under pgRefreshDragDownMask
                  gridRow:'1/2',
                  width:'calc(100% - 0px)', height:'calc(100% - 0px)',
               }} 
               // below set w/h of scrolling image window
               contentStyle={{ /* nothing to set */ }} >   
         {/* nope..     { props.theImgObject }       */}
         <img id='finalImageLoaded' src={dvprops.theImgObject.src} 
               style={{  width:finalDims.width + 'px',
                        height:finalDims.height + 'px'
                     }} alt='alt text'
         />
         </TransformComponent></TransformWrapper>
   </div>
)}}

      /**
       * This Component shows preload while final image loads. When loaded, does switchover, avoiding 
       *    the windowshade loading effect.
       * @param preload small image displayed while primaryImage loads
       * @param imgSrcUrl final image may take some time to load
       * @param mwmtype values: 'image', 'handwriting' so far. 
       *                'handwriting' causes initial image size to fill width in landscape mode to ease reading of handwriting
       */
      // const CreateRZPPimageWithPreloadStandIn = (props) => {
      function CreateRZPPimageWithPreloadStandIn(props) {
          var ref_preloadImg = useRef();
          const [theImgObj_state, setTheImgObj_state] = useState(null);
          const borderWidth = 0;
          const slowTimeDelay = 0;
          if (theImgObj_state == null) {
            var imgToLoad;
            imgToLoad = new Image();
            imgToLoad.src = props.imgSrcUrl; // imgA.style='width:90vmin';
            // console.log('starting load: ' + props.imgSrcUrl + ' |||||||||||||||||||||||||||||||||||||||||||')
            imgToLoad.addEventListener("load", (event) => {  
               //setTimeout(() => { // ONLY FOR TESTING TO SIMULATE SLOW LOAD
                  // console.log('image loaded ++++++++++++++++++++++++++++++++++++++++++++++++++')
                  ref_preloadImg.current.style.display='none'; /* hide the preload and .. */
                  // setting state object causes ImgDivWithInfoBtn to reload with new image
                  setTheImgObj_state(imgToLoad) 
               //}, slowTimeDelay)
            })
          }
          return <><img ref={ref_preloadImg} src={props.preload.src} 
                        style={{ 
                           // border:borderWidth + 'px dotted ' + (scrnIsPortrait ? 'red': '#00ff00'),
                           width:(scrnIsPortrait ? '100%': 'fit-content'),
                           // below ie:   calc(100% - 8px);
                           height:(scrnIsPortrait ? 'fit-content':'calc(100% - ' + (borderWidth * 2) + 'px)')
                        }} alt='alt text' />
                   <div className='blockyMsg textShadowA' 
                        style={{position:'absolute', top:'15vh', backgroundColor:'#cccccc77', width:'80vw', overflow:'auto'}}>
                     { // console.log('theImgObj_state: ' + theImgObj_state + ' loading url: ' + props.imgSrcUrl + ((slowTimeDelay > 0) ? ' debug delay: ' + slowTimeDelay: '') ) 
                     } 
                   </div> 
                   {/* below component refreshes when theImgObject changes. 
                       On initial refresh its null, so shows nothing */}
                   <ImgDivWithInfoBtn theImgObject={theImgObj_state} mwmkeyLeaf={props.mwmkeyLeaf}
                                      imageDescPopup={props.imageDescPopup} addlPars={props.addlPars}/>
                   {/* <img src='/jpeg/hist/aerospace/X-15_flying.jpg' /> */}
                 </>
      }
    }

    const favoriteCheese='sharp cheddar'
         /* LOOK AT THIS! How to create a React component in java code! 
               var newImg = ImgCallback({ src: domImage_state, callBackMoose: imgCB })
               this does not run unless { newImg } is in the JSX  */
      
         
    export { MediaPictureWithInfo, PopupProps, favoriteCheese }

    //   destructuring assignment

    //   thePopup = Popup_descrip_qr_scrollTips ( /* this popup shows description of image, qr and scroll tips */
      //   { txtdesc:props.txtdesc, isVisible:isInfoPopupOpen,
      //     callBackCloseMe:isOpen => setIsInfoPopupOpen(isOpen)})  