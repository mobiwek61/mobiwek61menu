import { React, Fragment } from 'react';
  /**
   * Helper functions for menu builder.
   * Some variables used by these functions are React useRef() things so that their:
   * 1) values get preserved across function calls
   * 2) values get shared with caller who is a react function component
   */

    /* preset menu selection to props.currPath ie "pictures/tableware/forks"
      To do this find the BRANCH_SUBMENU with mwmkey matching above. Then make it its siblings
      and its parent elements visible, similar to the onclick action way of doing it. 
      */
    function setMenuToWindowLocation(windowDotLocation) {
      /* inspect window.location and setup menu state and scroll position to match */
      // pathname strips out ->   ?mwmfont=8
      var targetKey = '[mwmkey=\'' + windowDotLocation.pathname.slice(1) + '\']' // slice leading '/'
      // typically ->   [mwmkey='pictures/artists/andywarhol/soupcan']
      // or,  document.querySelectorAll([mwmkey='pictures/artists/andywarhol/soupcan']);
      // "get me list of elements where mwmkey attribute is 'pictures/artists/andywarhol/soupcan'  "
      // console.log('targetKey ' + targetKey)
      var nodeListA = document.querySelectorAll(targetKey);
      // nodeListA.forEach (nodeWithKey => { console.log('i found: ' + nodeWithKey.textContent) });
      if (nodeListA.length > 1) console.log('WARNING: DUPLICATE MWMKEY IN TREE')
      var nodeMatchingWindowLocation = nodeListA.item(0);
      // above is a node. outerHTML is: <div mobiwekrole="LEAF" mwmkey="workshopTools/hand/pliers">pliers</div>
      if (!nodeMatchingWindowLocation) 
          return; 
      nodeMatchingWindowLocation.setAttribute('mwmCurrent', "mwmchosen") 
      nodeMatchingWindowLocation.classList.add('chosenMenuLeaf')
      // nodeMatchingWindowLocation.style.setProperty('border', 'solid 3px #ffcccc')
      // "get me list of elements with mobiwekrole attribute == 'BRANCH_SUBMENU'   "
      document.querySelectorAll('[mobiwekrole="BRANCH_SUBMENU"]').forEach(submenu => {
        if ((submenu === nodeMatchingWindowLocation) || 
            submenu.contains(nodeMatchingWindowLocation) || nodeMatchingWindowLocation.contains(submenu)) {
            submenu.classList.add('dispBlockClass')
            // previousSibling of a BRANCH_SUBMENU gets its corresponding BRANCH_BUTTON which has a solid or hollow arrow
            // now set the arrow after its title to solid to indicate in selected path
            submenu.previousSibling.style.setProperty('--mwmBtnAfterShape', 'var(--unicodeSolidRightTri)')
        } 
      });
      if (nodeMatchingWindowLocation.attributes.mobiwekrole.textContent === 'LEAF') {
          /* add marker class so auto-scroll wont cut off the leaf */
          nodeMatchingWindowLocation.classList.add('leafDummyClass')
      }
    }

  /* obsolete. I found out that using a JSX expression in menu spec makes this unnecessary 
  / * to incorporate <br/> into label. Must be restrictive to prevent injection. 
     avoids use of dangerouslySetInnerHTML * /
  function doHtmlBreakTag(zz) {
    // SPLIT USING A REGULAR EXPRESSION WITH TWO DELIMITERS (ONE IS <br/> other is <br />).
    var parts = zz.split(/<br\/\>|<br \/\>/i) // HEY! DONT PUT REGEX IN QUOTATION MARKS!!!
    //                                     ^  the i means IGNORE CASE
    if (parts.length === 1) return zz;
    / * now build a jsx thing. String wont work because html markup like <br/> gets rendered
       literally, as a safety measure. 
       Why is Fragment with key used? because if not, render works ok but the console
       gives a warning from React that each fragment must have a unique key. It
       really seems to demand this. * /
    const breaktag = <br/>; 
    const space4 = <>&nbsp;&nbsp;&nbsp;&nbsp;</>;
    var newJSX = parts.map((pt, idx) => { 
      if (idx == parts.length - 1) {
        return (<Fragment key={idx}>{ pt }</Fragment>)
      } else {
        return (<Fragment key={idx}>{ pt }{ breaktag }{ space4 }</Fragment>)
      }})
      // return (<span key={idx++}>{ pt }{ breaktag }{ space4 }</span>)})
    return(newJSX)
    }
    */
    /* other method but has problems
    const jsxArrayThing = [];
    var idx = 0;
    parts.forEach(pt => {
      jsxArrayThing.push(<Fragment key={idx++}>{ parts[idx++] }</Fragment>)
      jsxArrayThing.push(<Fragment key={idx++}>{ breaktag }{ space4 }</Fragment>)
    })
    jsxArrayThing.pop(); // remove last <br/> and spaces
    return(jsxArrayThing)
    */
    /* note: map produces another array not a string! */
    /* another way of doing it using map */
    // SAVE  console.log(parts.map((pt, i) => { return('pt is: ' + pt)}))
  

  /* another way using foreach instead of map
  function doHtmlBreakTag(zz) {
    // SPLIT USING A REGULAR EXPRESSION WITH TWO DELIMITERS (ONE IS <br/> other is <br />).
    var parts = zz.split(/<br\/\>|<br \/\>/i) // HEY! DONT PUT REGEX IN QUOTATION MARKS!!!
    //                                     ^  the i means IGNORE CASE
    if (parts.length === 1) return zz;
    console.log('breaktag ' + zz)
    const breaktag = <br/>; 
    const space4 = <>&nbsp;&nbsp;&nbsp;&nbsp;</>;
    const jsxArrayThing = [];
    var idx = 0;
    parts.forEach(pt => {
      jsxArrayThing.push(<>{ parts[idx++] }</>)
      jsxArrayThing.push(<>{ breaktag }{ space4 }</>)
    })
    jsxArrayThing.pop(); // remove last <br/> and spaces
    return(<>{jsxArrayThing}</>)
    //var parts = zz.split(/(<br\/>)|(\ ){2,}/);  // var parts = zz.split(/(\ ){2,}/);
    // parts.forEach(bb => { // });
  }
  */

  function hideOpenMenusExceptClickedSuccession(ancestors, clickedBranch) {
    // HIDE ALL menus EXCEPT those which are ancestors or descendants
    ancestors.forEach(submenu => {
        if (!(submenu === clickedBranch) && 
            !submenu.contains(clickedBranch) && !clickedBranch.contains(submenu)) {
            submenu.classList.remove('dispBlockClass')
        } 
    });
  }

  function scrollVandHToShowChosenSubmenu(chosenDomNode, extraWidth) {
      /* mwmCurrent gets established when page loads and document.location is examined to
         determine active node. It then does a .... .setAttribute('mwmCurrent', "mwmchosen")
         to mark the DOM node. Now look for it and scroll out to it. */
      if (chosenDomNode === null) return;
      var runner = chosenDomNode;
      var amtToScrollX = runner.clientWidth + extraWidth; // include the leaf node width to start with
      var amtToScrollY = 0; // if not initialized get NaN like the tv show
      var tier1Node;
      const menuHeadNode = document.querySelector('[mobiwekrole="headOfMenuTreeWithTableRowDisplay"]');
      do {
          if (runner.attributes.mobiwekrole) {
              if (runner.attributes.mobiwekrole.textContent === 'BRANCH') // dont add width of nested nodes
                  amtToScrollX += runner.clientWidth; // scroll by width of ancestor
              // console.log(runner.attributes.mobiwekrole.textContent)
          } 
          tier1Node = runner
          runner = runner.parentElement
      } while (runner !== menuHeadNode)
      var scrollingFrameOfMenu = document.querySelector('#mobiWekMenuTreeScrollingRoot')
      // console.log('gggggggg')
      if ((amtToScrollX - scrollingFrameOfMenu.clientWidth) > 0) {
        amtToScrollX = amtToScrollX - scrollingFrameOfMenu.clientWidth;
      } else { amtToScrollX = 0; }
      /* tier1Node is the leftmost ancestor. Now figure out its Y offset for scrolling */
      menuHeadNode.childNodes.forEach(leftDiv =>  { 
          if (leftDiv === tier1Node) tier1Node = null; // reached the node, so stop loop
          if (tier1Node !== null) {
              amtToScrollY += leftDiv.clientHeight; // console.log('bbv ' + leftDiv.outerHTML) 
          } })
      if ((amtToScrollY - scrollingFrameOfMenu.clientHeight * .75) > 0) {
        // this puts chosen menu item at bottom edge
        amtToScrollY = amtToScrollY - scrollingFrameOfMenu.clientHeight; 
        // not lift it up so it's fully visible. Mobile landscape node needs more offset....
        amtToScrollY += scrollingFrameOfMenu.clientHeight * .55; 
      } else { 
        amtToScrollY = 0; 
      }
      scrollingFrameOfMenu.scroll({ left: amtToScrollX, top: amtToScrollY, behavior: 'smooth' })
  }

  function ancestorsToSolidArrow(clickedBranch) {
      // Nope...  var labelist = document.querySelectorAll('[--mwmBtnAfterShape="var(--unicodeHollowRightTri)"]');
      // "get me all elements with mobiwekrole == 'BRANCH'  "
      var ancestors = document.querySelectorAll('[mobiwekrole="BRANCH"]');
      ancestors.forEach(theBranch => {
          // see "buoy88" to see why below works
          var labelForTheBranch = theBranch.firstElementChild;
          if (!(theBranch === clickedBranch) && 
              theBranch.contains(clickedBranch) && !clickedBranch.contains(theBranch)) {
                // console.log('labelForTheBranch ' + labelForTheBranch.textContent)
                labelForTheBranch.style.setProperty('--mwmBtnAfterShape', 'var(--unicodeSolidRightTri)'); 
                // it works!.. labelForTheBranch.style.setProperty('--mwmBtnAfterColor', 'red');
                    
          } else {
              labelForTheBranch.style.setProperty('--mwmBtnAfterShape', 'var(--unicodeHollowRightTri)');
          }
      });
    }

    function mobiwekSetMenuButtonEvents(ref_unHighLightMeNextClick, 
          ref_menuElementWasClicked, CloseSliderFn, menuCallBackPtr) {
      /* below obtains a "NodeList" of all buttons and adds click listener to each.
        It uses forEach to iterate through; oneBranch is the current pointer */
      document.querySelectorAll('[mobiwekrole="BRANCH_BUTTON"]').forEach (
        oneBranch => { 
          oneBranch.addEventListener('click', function(branchButtonEvent) {
                // console.log('click evt oneBranch: ' + oneBranch.innerHTML)
                ref_menuElementWasClicked.current = true; // reset element-clicked flag
                /* get the corresponding BRANCH_SUBMENU. see "Buoy88" comment to see why nextSibling is used */
                var targetSubmenu = branchButtonEvent.target.nextSibling;
                /* should be BRANCH_SUBMENU... console.log('targetSubmenu.attributes.mobiwekrole ' + targetSubmenu.attributes.mobiwekrole.textContent) */
                hideOpenMenusExceptClickedSuccession(
                      document.querySelectorAll('[mobiwekrole="BRANCH_SUBMENU"]'), targetSubmenu)
                var DOMTokenList_A = targetSubmenu.classList;
                /* NOTE: "toggle() adds the class if not present OR removes it
                   if present, and returns the final state:
                   Returns TRUE if it is now a 'dispBlockClass' */
                var I_am_visible_now = DOMTokenList_A.toggle('dispBlockClass')
                /* LOOK! this is how to set variable in css file! ie "var(--variableNameInCSS_file" */
                /* LOOK! this is how to set variable in css file! ie "var(--variableNameInCSS_file"*/
                var submenuOfThisButton = branchButtonEvent.target.nextSibling
                if (I_am_visible_now) {   //  branch was just opened
                    targetSubmenu.setAttribute('latestClickedSubMenu', "thatsMe")
                    ref_unHighLightMeNextClick.current = targetSubmenu;
                    scrollVandHToShowChosenSubmenu(targetSubmenu, 0) //targetSubmenu.clientWidth)
                } else {   // branch was just closed
                    // whoops! this removes the node ... targetSubmenu.remove('latestClickedSubMenu', "pizza")
                    // does nothing..   delete targetSubmenu.latestClickedSubMenu;
                    targetSubmenu.setAttribute('latestClickedSubMenu', "NOT_ME")
                    /* hide its sub-menus if it just got hidden. Refer to "Buoy88" for hierarchy */
                    var mySubMenus_NodeList = branchButtonEvent.target.parentNode.querySelectorAll('[mobiwekrole="BRANCH_SUBMENU"]');
                    mySubMenus_NodeList.forEach(subElem => { 
                        // console.log('hide role ' + subElem.attributes.mobiwekrole.textContent);
                        // below used for menu scrolling calculation
                        subElem.classList.remove('dispBlockClass'); 
                        subElem.classList.remove('leafDummyClass') 
                    }); 
                    scrollVandHToShowChosenSubmenu(branchButtonEvent.target.parentNode, -branchButtonEvent.target.clientWidth)
                }
                ancestorsToSolidArrow(oneBranch)  
              });
      }) 
      document.querySelectorAll('[mobiwekrole="LEAF"]').forEach(
        theleaf => {  // iterate allLeafs; theleaf is the current object in loop
          // console.log('theleaf ' + theleaf.innerHTML)
          theleaf.addEventListener('click', 
            function(event) {
                // event.target.style.border = '5px dotted red'
                event.target.style.setProperty('background', 'red')
                //console.log('todo when press get rid of current hilite')
                setTimeout(() => { // delay a bit so user sees choice light up
                      // console.log('todo pause to show highlilghted choice')
                      ref_menuElementWasClicked.current = true;
                      // event.target.classList.toggle('dispBlockClass')
                      // console.log('click leaf: ' + event.target.innerText)
                      //   + ' mwmkey: ' + event.target.attributes.mwmkey.textContent) //parentElement
                      CloseSliderFn();
                      /* call the menu callback specified as param */
                      var fontSearchUrlParam = document.body.style.getPropertyValue('--mwmMenuFontSize');
                      // console.log('--mwmMenuFontSize property ' + fontSearchUrlParam);
                      fontSearchUrlParam = '?mwmfont=' + fontSearchUrlParam;
                      /* typically function menuCallback in MobiWekDemo.js It calls Navigate() */
                      menuCallBackPtr(event.target.attributes.mwmkey.textContent, 
                      event.target.innerText, fontSearchUrlParam); // innerHTML   outerText  outerHTML
                }, 333)
            });
        })
    } // mobiwekSetMenuButtonEvents

    function changeFontSize(makeBigger) {
        /* about css variables: the two-dash thing is a variable declared in the css file (by html5, not react)
          its used like this in the css >>    font-size: var(--mwmMenuFontSize);
          Below you see how javascript can change the value of this variable dynamically 
          because css variable is used, need to COMPUTE the value....getComputedStyle  */
        // var fontSz = getComputedStyle(document.querySelector(':root')).getPropertyValue('--mwmMenuFontSize');
        var fontSz = getComputedStyle(document.body).getPropertyValue('--mwmMenuFontSize');
        fontSz = parseFloat(fontSz.slice(0, -2)); // remove 'vmin' 'vw' or 'px'
        var upDn = getComputedStyle(document.body).getPropertyValue('--mwmMenuScrnScaler')
        upDn /= 222;
        if (makeBigger) {fontSz = fontSz + upDn} else {fontSz = fontSz - upDn}
        /* change property of menu root div so it cascades down..  */
        document.body.style.setProperty('--mwmMenuFontSize', (fontSz.toFixed(1)) + 'px') 
        /* now rescroll window so chosen dom node appears in visible portion */
        var chosenDomNode = document.querySelector('[mwmCurrent="mwmchosen"]')
        if (document.querySelector('[latestClickedSubMenu="thatsMe"]') !== null) {
            chosenDomNode = document.querySelector('[latestClickedSubMenu="thatsMe"]');
            console.log('latestClickedSubMenu')
        }
        scrollVandHToShowChosenSubmenu(chosenDomNode, 0) // chosenDomNode.clientWidth)
    }

   function isDesktop(document) { 
        var ret = (getComputedStyle(document.body).getPropertyValue('--mwmVMINcutoff') < 
                      window.screen.width) ? true : false; 
        return ret;
      }

    /* "Buoy88" Use as a guide for choosing nextSibling, getParent etc in code...
     O==O==O==O==O  below is copy/paste from browser inspect->edit html                       O==O==O==O==O
     O==O==O==O==O  snapshot taken while the "tools->power is open and tools->hand is closed" O==O==O==O==O
     ........ as of 7-31-2023  .....
    <div mobiwekrole="BRANCH_SUBMENU" class="dispBlockClass">
        <div mobiwekrole="BRANCH">
            <div mobiwekrole="BRANCH_BUTTON" style="--mwmBtnAfterShape: var(--unicodeSolidRightTri);">power</div>
            <div mobiwekrole="BRANCH_SUBMENU" class="dispBlockClass">
                <div mobiwekrole="LEAF" mwmkey="workshopTools/power/drillPress">drillPress</div>
                <div mobiwekrole="LEAF" mwmkey="workshopTools/power/saw">saw</div>
            </div>
        </div>
        <div mobiwekrole="BRANCH">
            <div mobiwekrole="BRANCH_BUTTON" style="--mwmBtnAfterShape: var(--unicodeHollowRightTri);">hand</div>
            <div mobiwekrole="BRANCH_SUBMENU" class="">
                <div mobiwekrole="LEAF" mwmkey="workshopTools/hand/punch">punch</div>
                <div mobiwekrole="LEAF" mwmkey="workshopTools/hand/pliers">pliers</div>
            </div>
        </div>
    </div>
  */

export { scrollVandHToShowChosenSubmenu, isDesktop, changeFontSize, setMenuToWindowLocation, mobiwekSetMenuButtonEvents }

/*
TRASH PILE:
// document.querySelectorAll('[mobiwekrole="BRANCH_SUBMENU"]')
//       .forEach(subElem => { subElem.classList.remove('dispBlockClass');  });
// document.querySelector('#mobiWekMenuTreeScrollingRoot').scroll({ 
//       left: 0, behavior: 'smooth' })

function setCSSClassOfLeafAncestors(ancestors, leafNodeTarget, className) {
    if (!leafNodeTarget) return;
    ancestors.forEach(submenu => {
        if (submenu.contains(leafNodeTarget) || leafNodeTarget.contains(submenu)) {
            submenu.classList.add(className)
        }
    });
  }
function getTotalAncestorWidths(allbranches, clickedBranch, skipLastBranch) {
      var widthSum = 0; var lastWidth = 0;
      allbranches.forEach(onebranch => {   // allbranches is a NodeList
          if (onebranch.contains(clickedBranch)) { // && !(onebranch === clickedBranch)) {
              // SAVE! var branchLabel = onebranch.previousSibling.textContent;
              // SAVE! console.log('branchLabel: ' + branchLabel + ' onebranch width: ' + onebranch.clientWidth + ' skipLastBranch ' + skipLastBranch)
              widthSum += onebranch.clientWidth;
              lastWidth = onebranch.clientWidth;
          } 
      });
      // below happens when submenu is collapes and we want to scroll to show its parent menu also
      if (skipLastBranch) widthSum -= lastWidth; 
      return widthSum;
  }
*/
/* SAVE AS EXAMPLE BUT NOT USED..  scrolls by examining current css of nodes to see if visible.
     Replaced by function which searches for chosen dom node
     using...  document.querySelector('[mwmCurrent="mwmchosen"') 
  function x_scrollWindowToFitMenuState(CSS_querySelector, extraWidth) {
      var amtToScroll = extraWidth;
      var elementAtMenuBase;
      / * get sum of widths of visible nodes to determine horiz scroll amt * /
      document.querySelectorAll(CSS_querySelector).forEach(domElement => {
        // SAVE  console.log(domElement.clientWidth +
        //     ' matching elem: ' + domElement.previousElementSibling.textContent +
        //     ' mobiwekrole ' + domElement.attributes.mobiwekrole.textContent)
        amtToScroll += nodeWidthForMwRole(domElement) 
        elementAtMenuBase = domElement;
      })
      // "get me html element with ID 'mobiWekMenuTreeScrollingRoot'  "
      var scrollingFrameOfMenu = document.querySelector('#mobiWekMenuTreeScrollingRoot')
      if ((amtToScroll - scrollingFrameOfMenu.clientWidth) > 0) {
        amtToScroll = amtToScroll - scrollingFrameOfMenu.clientWidth;
      } else { amtToScroll = 0; }
      scrollingFrameOfMenu.scroll({ left: amtToScroll, behavior: 'smooth' })
  }  
  const nodeWidthForMwRole = (domNode) =>  {
      // var outp = ''
      var theWidth;
      var mwRole = domNode.attributes.mobiwekrole.textContent;
      if (mwRole === 'LEAF') {
          // outp += 'LEAF ' + domNode.textContent + ' width ' + domNode.clientWidth;
          theWidth = domNode.clientWidth;
      }
      if (mwRole === 'BRANCH_SUBMENU') { // need parent to get real width
          // outp += 'BRANCH_SUBMENU ' + domNode.previousElementSibling.textContent + ' width ' + domNode.parentNode.clientWidth
          theWidth = domNode.parentNode.clientWidth
      }
      return theWidth;
  }*/

                  // console.log('button x: ' + event.currentTarget.clientX +
              //       'button left: ' + event.currentTarget)
              //       //'button left: ' + this.offsetParent.offsetParent.offsetLeft)
    