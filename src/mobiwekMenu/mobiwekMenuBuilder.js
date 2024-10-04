import React, { useEffect, useRef } from 'react';
// import { useNavigate } from "react-router-dom";
import { changeFontSize, setMenuToWindowLocation, mobiwekSetMenuButtonEvents, isDesktop
         } from "./mobiwekMenuBuilderHelper"
import { ok_mwmtype_Values } from "./mobiWekGlobals"
// import { FaRedoAlt as MenuHomeIcon } from "react-icons/fa";
import { FaHome as MenuHomeIcon } from "react-icons/fa";
// import { FaRegPlusSquare } from "react-icons/fa";
// import { FaRegMinusSquare } from "react-icons/fa";
  var reactNeedsThisUniqueKey = 0; // need key otherwise error
  var allmwmKeys = [];
  
  /* places a MobiwekBuildMenu inside a scrollable div.
     This div serves as a viewport through which the menu shows; the menu may be
     several times the screen width, and this div scrolls to show the desired section */
  function MobiWekAutoXYScrollMenuComponent(props) {
      var ref_unHighLightMeNextClick = useRef();
      var mobiWekMenuTreeScrollingRoot = useRef();
      var ref_menuElementWasClicked = useRef(false);
      var quittingError = false;
      var errMsg;
      /* !!! useEffect() !!! huh ?
        In the React world "useEffect" is a conponent lifecycle function. Controlled by argument 2 as follows:
        missing: run always;  [] empty: run only once when component mounts; [foo] run when useState foo changes */
      useEffect(() => {  
          if (quittingError) return;
          mobiWekMenuTreeScrollingRoot.current.addEventListener('click', (event) => { 
            // event.stopPropagation(); // preventDefault()
            // console.log('click')
            scrollingDivClick(event.target, event, props.CloseSliderFn, ref_menuElementWasClicked.current); 
          }, false ) // this third argument "useCapture" seems to determine event bubbling order  
      }, []); // [] present: only on load .. 

      var fsize = new URLSearchParams(props.windowDotLocation.search).get('mwmfont')
      // SAVE as example console.log('picUrl ' + new URLSearchParams(props.windowDotLocation.search).get('picUrl'))
      // console.log('picUrl2 ' + new URLSearchParams(props.windowDotLocation.search).get('picUrl2'))
      var regexMatch;
      if (fsize) regexMatch = fsize.match(/(^\d*\.?\d*px$)/);
      if (fsize && !regexMatch) {
        quittingError = true;
        console.log('ERROR -QUITTING: mwmfont of ' + fsize + ' not allowed. Must be like "6px"')
        return (<>ERROR -QUITTING: mwmfont of {fsize} not allowed. Must be like "6px"</>)
      }
      if (fsize) 
        document.body.style.setProperty('--mwmMenuFontSize', fsize)

      return (<div id='resetNscroll' style={{ 
            // border:'4px solid red',
            // position:'absolute'
            }}>
        <DoFontUpAndDownAndHomeButtons {...props}  /> {/* passes all props */}
        <div ref={mobiWekMenuTreeScrollingRoot}
            /* this div acts as a window into the menu div which gets scrolled. As the menu grows
              too wide to fit in this div, this window scrolls, so the right edge of the
              menu is always visible. Done using complicated javascript. */
            id='mobiWekMenuTreeScrollingRoot'
            style={{ marginLeft:'2vw', height:'80vh', 
              //border:'11px dotted yellow',
              // peanuts width:'90vw', overflowY:'scroll', overflowX:'overlay' }} 
              width:'90vw', overflowY:'scroll', overflowX:'scroll' }} 
            /* in CSS file:  #mobiWekMenuTreeScrollingRoot::-webkit-scrollbar{ display: none; } 
               prevents a wierd 1px wide scrollbar from appearing */
          >
          {/* filter:'drop-shadow(#fbeb70 4px 4px 2px), drop-shadow(#00FF00 -4px -4px 2px)' */}
          {/* {...props} uses the "spread operator" to pass all props to child */}
          <MobiwekBuildMenuRecursiveReactCompon {...props} isRoot='yes'/>
          {/* <Memo_MobiwekBuildMenu scrollDiv={mobiWekMenuTreeScrollingRoot} {...props} isRoot='yes'/> */}
        </div>
        </div>)

      function DoFontUpAndDownAndHomeButtons(propsFUD) {
        // SAVE shows how to get css in code...     
        // useEffect(() => { console.log( // wont work without useEffect bc menuTitle does not yet exist...
        //       document.querySelector("#menuTitle").style.getPropertyValue('margin-left'))}, []); 
        var screenScaler = getComputedStyle(document.body).getPropertyValue('--mwmMenuScrnScaler')
        var leftMargin = isDesktop(document) ? '40vw' : '15vw';
        
        return (<div id='menuHomeDiv' style={{ display:'inline', width:'100%', zIndex:'30' }} >
            <div id='menuTitle'
               style={{ float:'left', marginLeft:leftMargin, marginTop:'2vmin',
                        fontSize:screenScaler * 0.06 + 'px'}}>
                        { propsFUD.appTitle }
            </div>
            <div >
                <MenuHomeIcon id='reset_menu' className='fontPlusMinusButtonsA'
                    style={{float:'right', color: 'black', 
                            fontSize:screenScaler * 0.10 + 'px', 
                            marginRight:'2px' }}
                    onClick={ () => {
                      /* User wants to collapse menus and scroll to 0.
                        Get all elements matching and do a forEach on the list to set CSS class to hide.
                        Then do similar to scroll viewport back to 0 */
                      document.querySelectorAll('[mobiwekrole="BRANCH_SUBMENU"]').forEach(submenu => {
                        submenu.classList.remove('dispBlockClass')
                      document.querySelector('#mobiWekMenuTreeScrollingRoot').scroll({ left: 0, behavior: 'smooth' })
                      });
                    } } 
                />
                <span style={{float:'right', 
                              fontSize:screenScaler * 0.07 + 'px'}}>
                    <span className='fontPlusMinusButtonsA'
                      onClick={() => { changeFontSize(false); }} >A-</span>
                <span style={{ paddingLeft:'1.2vmin', 
                        fontSize:screenScaler * 0.09 + 'px' }} 
                        className='fontPlusMinusButtonsA' 
                      onClick={() => { changeFontSize(true); }} >A+</span></span>
            </div>
            {/* <FaRegPlusSquare style={{ marginTop:'1vw', fontSize: (window.innerWidth/11) + 'px', marginRight:'2px'}} />
            <FaRegMinusSquare style={{ marginTop:'1vw', fontSize: (window.innerWidth/11) + 'px', marginRight:'2px'}} /> */}
          </div>
        )
      }
      
      function MobiwekBuildMenuRecursiveReactCompon(props) {
        useEffect(() => { 
          if (props.isRoot === 'yes') {  // do ONLY for ROOT element, not ALL element
              if (errMsg !== undefined) {
                var foo = document.querySelectorAll('[mobiwekrole="headOfMenuTreeWithTableRowDisplay"]');
                foo[0].innerHTML = '<div style="width:80vmin; font-size:22px; color:yellow; background:black;">' +
                  'error(s) in menu specification<br/>' + errMsg + '</div>'
                console.log(foo[0].innerHTML)
              }
              allmwmKeys = []; // reset for next load sometime
              componentOnRender(props) 
          }
          // var movingMenuDiv = document.querySelector('[mobiwekrole="pushWidthOut"]')
          // movingMenuDiv.addEventListener('mousedown', () => { mouseDown = true; })
          // movingMenuDiv.addEventListener('mouseup', () => { mouseDown = false; })
          // movingMenuDiv.addEventListener('mousemove', (evt) => { 
          //   if (mouseDown) {
          //     console.log('menu drag ' + evt.target.attributes.mobiwekrole.value)
          //   }
          // })
        }); //  [] missing: run after every render. (no dependencies)

        var mouseDown = false;
        const uniqueKey = props.prefix + '/' + props.nextLoc.mwmkey
        if (allmwmKeys.indexOf(uniqueKey) != -1) {
          errMsg = 'duplicate keys in menu spec. mwmkey: \"' + uniqueKey + '\"'
        }
        allmwmKeys.push(uniqueKey)

        function componentOnRender(props) {
            /* occurs ONCE in recursions because its ROOT */
            /* NOTE: use ref_ things so that below function shares with THIS function */
            mobiwekSetMenuButtonEvents(ref_unHighLightMeNextClick, ref_menuElementWasClicked, props.CloseSliderFn, props.menuCallBackPtr);
            // 65 msec for big menu.. console.log('menu setup time: ' + (Date.now() - startt) + ' ms');
            setMenuToWindowLocation(props.windowDotLocation)
            if (!fsize) {
                /* The url does not specify a font size. So calculate a starting size. 
                   TAGS so I can find this later: default mwmfont 
                   here is where the default fontsize is setup when not specified. */
                var minWidOrHeightFactor = 
                      getComputedStyle(document.body).getPropertyValue('--mwmMenuScrnScaler')
                /* now save it as a css variable aka custom property
                   divide by 15 gives 24px size on a phone...    */
                var sizeSpec = (minWidOrHeightFactor / 15).toFixed(1) + 'px';
                document.body.style.setProperty('--mwmMenuFontSize', sizeSpec) 
            }
        }

        if (props.nextLoc.DD_MENU_HEAD) {
          // console.log('menu spec revision: \"' + props.nextLoc.REV + '\"');
          return( 
          /* from docs: "table-row These elements behave like <tr> HTML elements"
             This forces all elements inside div to have same width, so appearance and pushbuttons line up ok */
          <div mobiwekrole="pushWidthOut" style={{ width:'600vw' }} >
          <div mobiwekrole="headOfMenuTreeWithTableRowDisplay" 
               style={{ display:'table-row', border:'3px solid red' }} >
            {/* no key here causes runtime warning. something to do with list */}
            { props.nextLoc.DD_MENU_HEAD.map((childElem) => (
              <MobiwekBuildMenuRecursiveReactCompon {...props} isRoot='no' key={reactNeedsThisUniqueKey++} nextLoc={childElem} prefix={ '' } />
            ))}
          </div>
          </div>
          )
        }

        if (props.nextLoc.BRANCH) { 
            var ppx = (props.prefix) ?  props.prefix + '/' : '';
            var pathA = ppx + props.nextLoc.mwmkey; // console.log('Menu prefix: ' + pathA)
            return (
              <div mobiwekrole="BRANCH" >
                {/* below is a button with a label to open submenu */}
                {/* <div mobiwekrole="BRANCH_BUTTON" >{ doHtmlBreakTag(props.nextLoc.BRANCH) }</div> */}
                <div mobiwekrole="BRANCH_BUTTON" >{ props.nextLoc.BRANCH }</div>
                {/* css jogs below to the right to appear as a cascading submenu */}
                <div mobiwekrole="BRANCH_SUBMENU" >
                    { props.nextLoc.items.map((childElem) => (
                    <MobiwekBuildMenuRecursiveReactCompon {...props} isRoot='no' 
                        key={reactNeedsThisUniqueKey++} nextLoc={childElem} prefix={ pathA } />
                    ))}
                </div>
              </div>
            )
        }
        if (props.nextLoc.LEAF) { 
          var mwmkeyVal = (props.prefix === '') ? props.nextLoc.mwmkey : props.prefix + '/' + props.nextLoc.mwmkey
          // no longer needed. now using recursive path search. 
          // props.nextLoc.fullPath = mwmkeyVal; 
          // add path to json object, apart from DOM. For searching later.
          // console.log("Item mwmkey: " + mwmkeyVal)
          return(
              <div mobiwekrole="LEAF" style={{ borderBottom:'1px solid #001bce'}}
                  mwmkey={ mwmkeyVal } >
                  { props.nextLoc.LEAF }
                  {/* { doHtmlBreakTag(props.nextLoc.LEAF) } */}
              </div>
          )
        }
      }

      /* called when div containing menu is clicked; called AFTER button is clicked, thanks to
     "useCapture" argument to addEventListener(). If no button pressed, it hides the menu.
     If button pressed, re-scrolls the menu to useful position */
      function scrollingDivClick(thisElement, evt, CloseSliderFn) {
        // console.log('scrollingDivClick ' + thisElement.id);
        if (!ref_menuElementWasClicked.current) { // if user clicked outside element they want it closed.
            // console.log('no menu clicked')
            CloseSliderFn();
        }
        ref_menuElementWasClicked.current = false; // reset for next click
      }
  } // MobiWekAutoXYScrollMenuComponent

// const Memo_MobiWekAutoXYScrollMenuComponent = memo(MobiWekAutoXYScrollMenuComponent)
const sayHi = () => { console.log('this is hi from MobiwekMenuBuilder.js in the package') }

export { MobiWekAutoXYScrollMenuComponent, sayHi }

