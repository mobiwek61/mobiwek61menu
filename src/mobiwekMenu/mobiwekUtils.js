//import { ok_mwmtype_Values } from './mobiWekGlobals';

import { Fragment } from "react";
import { ok_mwmtype_Values } from "./mobiWekGlobals";
/* this file has json-based search utilities and other
   stuff not specific to React or mobiwek.
   It specializes in searching mobiwekMenu menu specs.
   Typically used to obtain a LEAF from a url, so all its 
   properties may be accessed.
*/

/**
 * returns leaf item from tree matching full path ie: 'pictures/vangough/postman'
 * @param {*} jsonObjectHead head of menu json array object tree thing
 * @param {*} fullPath full path as obtained from useLocation().pathname
 */
function findJsonObjectByFullPath(jsonObjectHead, fullPath) {
    if (fullPath[0] === '/') fullPath = fullPath.slice(1) // slice gets rid of leading '/' which messes up split
    var pathParts = fullPath.split('/');
    var menuItemWithPath = findJsonObjectByFullPath_recurse(jsonObjectHead.DD_MENU_HEAD, pathParts) 
    return menuItemWithPath
}
function findJsonObjectByFullPath_recurse(currentRoot, pathParts) {
  /* NOTE: Use of filter(), map(), foreach(), and anonymous functions with return values get tangled
     up with recursion return values.  Instead, use old fashioned loop. */
  var onePathSegment = pathParts.shift()  // get & remove the first element of array
  // console.log('searching path segment: "' + onePathSegment + '"')
  // now examine each child of current json array
  for (var idx in currentRoot) { 
          var oneMenuItem = currentRoot[idx]
          if (oneMenuItem.mwmkey === onePathSegment) {
            if (oneMenuItem.LEAF) {
                /* we found a key and its a leaf. Search is over to return it up the recursive chain */
                // console.log('FOUND mwmkey in path: ' + oneItem.mwmkey)
                return oneMenuItem; /* no further recursion */
            } 
            /* we found a key but its not a leaf. Continue recursion over items for this submenu */
            return findJsonObjectByFullPath_recurse(oneMenuItem.items, pathParts)
          } 
      }
  console.log('giving up path search at "' + onePathSegment + '"')
  return { error: 'giving up path search at "' + onePathSegment + '"' } // give up because this level of path was not found
}

/**
 * findJsonObjectByKeyNameAndValue
 * @param {*} jsonObjectHead root of JSON menu spec
 * @param {*} keyValue target value of &lt;keyName&gt; attribute
 * @returns array of JSON nodes having attribute &lt;keyName&gt;=&lt;targetString&gt;
 */
function findJsonObjectByKeyNameAndValue(jsonObjectHead, keyName, keyValue) {
  var jp = require('jsonpath');
  /* jsonPathQuery = "$..*[?(@.mwmkey=='winslowHomerFogWarning')]"
                      ^ $ is root of tree
                       ^^ 2 dots is "Recursive descent" drill-down operator
                         ^ wildcard "anything within the tree having next thing"
  they call this "filter" ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                             ^ @ The current node 
    also whats "predicate" ??  */
  /* When called, we have the targetString from the window.location URL that
    React useParams() gave to the React Route element.
    Below jsonpath query string says "search elements in json which have
    attribute named 'mwmkey' with value 'targetString".
    Composed string should look like these:
    jsonPathQueryString = "$..*[?(@.mwmkey=='winslowHomerFogWarning')]"
    jsonPathQueryString = "$..*[?(@.mwmkey=='dog.txt')]" */
  //  var jsonPathQueryString = "$..*[?(@.mwmkey=='" + targetString + "')]";
  var jsonPathQueryString = "$..*[?(@." + keyName + "=='" + keyValue + "')]";
  var matchA = jp.query(jsonObjectHead, jsonPathQueryString);
  return matchA;
}

/**
 * returns null or JSX (Fragment) array containing error text if mobiwekMenu has problems and needs correction.
 * So far, only checks for mwmtype field
 * @param {*} jsonObjectHead root of JSON mobiwekMenu menu spec
 * @returns 
 */
function validateMwMenu(jsonObjectHead) {
    var jp = require('jsonpath');
    /* jsonPathQuery = "$..*[?(@.mwmkey=='winslowHomerFogWarning')]"
                        ^ $ is root of tree
                        ^^ 2 dots is "Recursive descent" drill-down operator
                          ^ wildcard "anything within the tree having next thing"
    they call this "filter" ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
                              ^ @ The current node 
      also whats "predicate" ??  */
    // var jsonPathQueryString = "$..*[?(@." + keyName + "=='" + keyValue + "')]";
    var jsonPathQueryString = "$..*[?(@.LEAF)]"  // searches for LEAF's
    var matchA = jp.query(jsonObjectHead, jsonPathQueryString);
    var errMsg
    // map() returns array of Fragment's (if errors) and undefined's
    var errFragmentArr = matchA.map(oneLeaf => { 
      if (oneLeaf.mwmtype === undefined) { 
            errMsg += '\nno mwmtype: ' + oneLeaf.mwmkey 
            /* cannot use <></> shorthand for Fragment because key is needed, to prevent
               the no-key-in-list error on console.  */
            return(<Fragment key={errMsg.length}><br/> no mwmtype: { oneLeaf.mwmkey } </Fragment>)
      } 
      /* nice SQL-kind of query using es6 object and keywork 'in'. Keys are used but values ignored.
        Rightclick ok_mwmtype_Values -> Go To Definition     ...to see what it is
        ref: "The in operator returns true if the specified property is in the specified object or its prototype chain." */
      else if (!(oneLeaf.mwmtype in ok_mwmtype_Values)) {
              errMsg += '\nnot valid mwmtype: "' + oneLeaf.mwmtype + '" key: "' + oneLeaf.mwmkey + '"'
              return(<Fragment key={errMsg.length}><br/> not valid mwmtype: "{oneLeaf.mwmtype}" key: "{oneLeaf.mwmkey}" </Fragment>)
      }
      else return undefined
    })
    if (errMsg === undefined) return null;
    console.log(errMsg)
    // now have array filled with many undefined's. Filter them out.
    var errJSX = errFragmentArr.filter(oneVal => { if (oneVal !== undefined) return oneVal; })
    return <span className="blockyMsg"> {errJSX} </span>;
}

/**
 * Eats touchstart event and calls preventDefault.
 * This prevents page from getting mobile zoom gesture and zooming the
 * page, which must not happen with this app.
 */
function eatZoomGesture(domElem) {
    domElem.addEventListener("touchstart", (event) => {
        // it's 2 fingers; prevent browser from zooming by preventDefault()
        if (event.touches.length === 2) event.preventDefault();
    });
    // in desktop chrome, pinch-to-zoom events generate a wheel event. the cntrlKey part of event
    // determines if its zoom or scroll
    domElem.addEventListener("wheel", (event) => {
        //console.log('wheel..pinch ' + event.ctrlKey)
        if (event.ctrlKey === true) event.preventDefault();
    });
}

function squareJSX() { 
  var square = (<><div id='AAA' style={{ height:'100px', width:'100px', background:'green' }} /></>) 
  return square;
}
function squareDOM() { 
  var square = document.createElement('div')
  square.id = 'thesquare'
  square.style = "height:100px; width:100px; background:green"
  return square;
}

// from internet. Use example:
// addEventListenerAll_fromStackOverflow(refreshDragListener, (evt) => {
//    console.log(evt.type); });
function addEventListenerAll_fromStackOverflow(target, listener, ...otherArguments) {
  // install listeners for all natively triggered events
  for (const key in target) {
      if (/^on/.test(key)) {
          const eventType = key.substr(2);
          target.addEventListener(eventType, listener, ...otherArguments);
      }
  }
  // dynamically install listeners for all manually triggered events, just-in-time before they're dispatched ;D
  const dispatchEvent_original = EventTarget.prototype.dispatchEvent;
  function dispatchEvent(event) {
      target.addEventListener(event.type, listener, ...otherArguments);  // multiple identical listeners are automatically discarded
      dispatchEvent_original.apply(this, arguments);
  }
  EventTarget.prototype.dispatchEvent = dispatchEvent;
  if (EventTarget.prototype.dispatchEvent !== dispatchEvent) throw new Error(`Browser is smarter than you think!`);
}


export { validateMwMenu, findJsonObjectByFullPath, findJsonObjectByKeyNameAndValue, addEventListenerAll_fromStackOverflow, eatZoomGesture }

/* SAVE DONT DELETE notes on jsonpath takes a long time to learn without notes!
    document.querySelectorAll('[mobiwekrole="BRANCH_SUBMENU"]').forEach(submenu => {
    document.querySelector('#mobiWekMenuTreeScrollingRoot') === null) 
    // jsonpath
    $.books[?(@.writers[?(@.name=='Mariangela')]).name]
    $.phoneNumbers[?(@.type=='iPhone')]


/* reduce() works like map(), except that you declare its "accumulator",
       in this case 'arrayGrowing', parameter 1. Strangely, the type of arrayGrowing is the second
       argument to reduce(), in this case '[]', an array.
       The first argument to reduce is an anonymous function which returns arrayGrowing.
       It calls push() on it to add another jsx error entry. */
    /* works but map & filter is less confusing...
      var errJSXzzz = matchA.reduce(
      (arrayGrowing, oneLeaf) => { 
          var jsxOut = null;
          if (oneLeaf.mwmtype === undefined) { 
                errMsg += '\nno mwmtype: ' + oneLeaf.mwmkey 
                // cant use <></> because it complains about lack of key. Shut it up this way:
                jsxOut = <span key={arrayGrowing.length}><br/> no mwmtype. mwmkey: { oneLeaf.mwmkey } </span>
          } 
          / * nice SQL-kind of query using es6 object and keywork 'in'. Keys are used but values ignored.
             Rightclick ok_mwmtype_Values -> Go To Definition     ...to see what it is
             ref: "The in operator returns true if the specified property is in the specified object or its prototype chain." * /
          else if (!(oneLeaf.mwmtype in ok_mwmtype_Values)) {
                  errMsg += '\nnot valid mwmtype: "' + oneLeaf.mwmtype + '" key: "' + oneLeaf.mwmkey + '"'
                  jsxOut = <span key={arrayGrowing.length} ><br/> not valid mwmtype: "{oneLeaf.mwmtype}" mwmkey: "{oneLeaf.mwmkey}" </span>
          }
          if (jsxOut === null) return arrayGrowing;
          //jsxOut.key = arrayGrowing.length;
          arrayGrowing.push(jsxOut); // {key:arrayGrowing.length, msg:jsxOut});
          return arrayGrowing
      }, 
      / * below is second argument to reduce(), initial value of 'arrayGrowing'. 
        In this case its an array, which also defines its type. Without this push() fails
        because it hasn't been declared as an array. * /
      []
    ) */

    // SAVE THIS...   using FILTER
// function aaaaaaaaafindJsonObjectByFullPath_recurse(currentRoot, pathParts) {
//   // console.log('findJsonObjectByFullPath_recurse')
//   var pth = pathParts.shift() // pop
//   /* use FILTER instead of MAP because it WONT include null values ie: branches where nothing is found */
//   var nextMenuItem = currentRoot.filter(oneItem => 
//       { 
//           // console.log('oneItem: ' + oneItem.mwmkey + '  ' + pth)
//           if (oneItem.mwmkey === pth) {
//             if (oneItem.LEAF) {
//                 console.log('FOUND mwmkey in path: ' + oneItem.mwmkey)
//                 /* NO NO NO THIS DOES NOT RETURN VALUE FROM FUNCTION
//                    IT RETURNS VALUE TO FILTER() */
//                 return oneItem; /* no further recursion */
//             } 
//             /* NO NO NO THIS DOES NOT RETURN VALUE FROM FUNCTION
//                    IT RETURNS VALUE TO FILTER() */
//             return findJsonObjectByFullPath_recurse(oneItem.items, pathParts)
//           } 
//       })
//   console.log('returning ' + nextMenuItem.length)
//   return nextMenuItem
// }