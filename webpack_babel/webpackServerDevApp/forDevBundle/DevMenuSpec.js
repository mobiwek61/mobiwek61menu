import React from 'react';
         
/**
 * About visual studio code JSON editor and JSON schema:
 * VSCode provides JSON schema intellisense and checking using a json file and a
 * schema file. That would be great here. A example in the JsonSchemaExample folder.
 * Unfortunately the JSON here is embedded in javascript and the schema cannot get applied.
 * Pure JSON files are not a solution because I need comments for blocking-out and comments.
 * Please let me know if there is a solution.
 */

// to get jpg from npm package which has been imported
//import jalepenos from 'jpegs/farmersmkt/jalepenos.JPG'

/* TODO: may need updating. This is the menu spec for a sample mobiwekmenu.
   The structure is BRANCH and LEAF nodes; LEAF represents a clickable menu item
   and BRANCH is a clickable submenu. 
   It gets processed by component "MobiwekBuildMenuRecursiveReactCompon" which
   produces HTML DOM, composing menus, submenus[BRANCH], and LEAF[clickable 'link']. 
   To get insight into how this thing works, use browser's debugger to "inspect" the
   structure. Browsers have a quick-button at the top for inspect. 
   Look at the "styles" tab in debugger, and see how opening and closing submenu
   items affect styles. 
   Attributes:
      "mwmkey"
      "mwmtype"
          If "handwriting" or "picture", "imgurl" must be present
          Values:  1. "handwriting": show in zoomable format and width pre-zoomed to full width. 
                       Assumes user wants to be zoomed-up for reading. This work is done
                       in MobiWekDemo.js by the handler function assigned by the React router.
                   2. "image": show zoomable format with picture filling frame exactly.
                   3. "mwtypNull" not applicable
                   4. "reactRoute" the url gets eaten and processed by the react router
   Optional attributes:
      You can add whatever attributes you need, to be interpreted by the handler and/or route you 
      setup in your app.  Use the example app as a starting point.
  */
const space4=<>&nbsp;&nbsp;&nbsp;&nbsp;</>  // this is JSX. Must be bounded by <> and </>

/** For testing scrolling/overflow of info popup. */
const lotsa_JSX_Lines = (count) => {
    var jsxA = []; for (let i = 0; i < count; i++) {
        jsxA.push(<div key={i} >line {i}</div>) // add unique key to avoid warning message
    } return jsxA }

/**
 * Generates a bunch of item menu elements to stretch the menu for testing scrolling.
 * Call to this within JSON declaration. It needs to use spread (...) operator to unwind
 * the returned array of JSON elements.
 * Look- this is how to generate JSON from array using map
 */
var lnTotalCt = 0;
const lotsa_JSON_Menu_LEAF = (total) => {
    const foo = [total]; for (let i = 0; i < total; i++) foo[i] = i;
    return (
      foo.map(val => {return({ LEAF:"addline"  + lnTotalCt, mwmkey: "addLine/" + lnTotalCt++,  mwmtype:"mwtypNull" })})
    )
}

/** example of creating a reusable or just bulky menu leaf as a const */
const const_winslowHomerFogWarning = { LEAF:"fog Warning", mwmkey: "winslowHomerFogWarning",
  txtdesc:<>The fisherman is worried he cannot return to the schooner because of impending fog.<br/>
  If he can't get back, he will be lost at sea.<br/>
  From the direction of the swells, the wind and waves are against him.</>,
  mwmtype: "image",
  imgurl:'/jpeg/WIKIMEDIA-Winslow-HomerFogWarning.jpg' 
};

const mobiwekMenuJSONexample_1 = 
    { REV:'3 Aug 2024 b', 
      // schema wont work here because not a JSON file..     "$schema": "./TestJsonASchema.json", // visual studio code way of custom schema
      DD_MENU_HEAD:[
      { LEAF:"About", mwmkey: "about_app", mwmtype:"mwtypNull" },
      { BRANCH:"American History", mwmkey:"amhistory", items: [
        { LEAF:"Abraham Lincoln Photo", mwmkey: "aLincoln1",
          mwmtype: "image", 
          txtdesc:<>Anthony, Edward and Brady, Mathew B. 1860 https://www.loc.gov/item/2021669449/<br/></>, 
          gotfrom:'https://tile.loc.gov/image-services/iiif/service:gdc:gdcwdl:wd:l_:01:50:2:wdl_01502:icon966301/full/pct:50/0/default.jpg',
          imgurl:'/jpeg/LOC-AbeLincoln.jpg'
        },
        { BRANCH:"Horace Greeley", mwmkey:"horaceGreeley", items: [
          { LEAF:"intro to Greeley", mwmkey: "greeleyIntro", mwmtype:'mwtypNull'},
          { LEAF:"New York Tribune May 16 1866", mwmkey: "nyTribuneMay16-1866",
            mwmtype: "handwriting", 
            txtdesc:<>New York Tribune May 16 1866<br/></>, 
            gotfrom:'https://chroniclingamerica.loc.gov/lccn/sn83030214/1866-05-16/ed-1/seq-1.jp2',
            imgurl:'/jpeg/hist/horaceGreeley/LOC-nyTribuneMay16-1866.jpg'
          },
          { LEAF:"greeley letter1", mwmkey: "greeleyLetter1",
                  mwmtype: "handwriting", 
                  // example of using JSX<></> instead of text. Either works. Text wont support html.
                  txtdesc:<>apprentice agreement Horace Greeley<br/> 
                  { lotsa_JSX_Lines(27) }</>, 
                  // in nodejs dev server, served under /public folder
                  imgurl:'/jpeg/hist/horaceGreeley/LOC-greeley-apprenticeagreement.jpg' 
          },
          { LEAF:"greeleyReminices1 enhanced", mwmkey: "greeleyReminices1_enh",
                  mwmtype: "handwriting", txtdesc:"Reminiscences of Horace Greeley, 1879. Image enhanced", 
                  imgurl:'/jpeg/hist/horaceGreeley/LOC-greeleyReminices1_enh.jpg' 
          }
        ]},
        { BRANCH:"aircraft", mwmkey:"aircraft", items:[
          { BRANCH:"experimental", mwmkey:"experimental", items:[
             { LEAF:"x15", mwmkey:"x15", mwmtype:"reactRoute", clickMeLink:"x15image" },
             { LEAF:<>..picture of<br/>x15</>, mwmkey:"x15image", mwmtype:"image", 
                txtdesc:<>from https://commons.wikimedia.org</>, 
                imgurl:'/jpeg/hist/aerospace/WIKIMEDIA-X-15_flying.jpg' }
          ]},
          { LEAF:<>space shuttle<br/>{space4}Introduction</>, mwmkey:"spaceShuttleIntro", mwmtype:"reactRoute", 
            clickMeLink:"spaceShuttleTransport", clickMeLink2:"spaceShuttleOrbit" },
          { LEAF:<>space shuttle<br/>{space4}transport</>, mwmkey:"spaceShuttleTransport", mwmtype:"image",
            txtdesc:<>from https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Shuttle_Carrier_Aircraft_transporting_Discovery_departs_Kennedy_Space_Center.jpg<br/></>,
            imgurl:'/jpeg/hist/aerospace/WIKIMEDIA-spaceShuttleTransport.jpg' },
          { LEAF:<>space shuttle<br/>{space4}orbit</>, mwmkey:"spaceShuttleOrbit", mwmtype:"image", 
              txtdesc:<>from https://commons.wikimedia.org/wiki/File:STS007-32-1702.jpg<br/>
              This file is in the public domain in the United States because it was solely created by NASA.
              <br/>Image is unenhanced, original Kodachrome I guess. Shows just how old it is.</>, 
              imgurl:'/jpeg/hist/aerospace/WIKIMEDIA-spaceShuttleOrbit.jpg' }
        ]},
        { BRANCH:"Ben Franklin", mwmkey:"benFranklin", items: [
          { LEAF:"Speed Of Ships", mwmkey: "speedOfShips",
                  mwmtype: "handwriting", 
                  txtdesc:<>Benjamin Franklin technical notes about ships<br/>Benjamin Franklin Papers: Series III, 1728-1841; Miscellaneous material; 1728-1783 (vol. 31)<br/>from https://www.loc.gov/resource/mss21451.mss21451-012_00093_00422/?sp=114</>, 
                  imgurl:'/jpeg/hist/benFranklin/LOC-benFranklinSpeedOfShips.jpg' 
          },
          { LEAF:"Ship diagram", mwmkey: "shipDiagram",
                  mwmtype: "handwriting", 
                  txtdesc:<>diagram of sailing ship and wind direction<br/>Benjamin Franklin Papers: Series III, 1728-1841; Miscellaneous material; 1784-1841 , undated (vol. 32)<br/>from https://www.loc.gov/resource/mss21451.mss21451-012_00423_00602/?sp=3</>, 
                  imgurl:'/jpeg/hist/benFranklin/LOC-benFranklin_sailingShipDiagram.jpg' 
          },
        ]},
      ]}, // END OF BRANCH amhistory
      { BRANCH:"x15 Spaceplane", mwmkey:"x15", items:[
        { LEAF:"x15", mwmkey:"x15", mwmtype:"mwtypNull", clickMeLink:"x15image" },
        { LEAF:<>picture of<br/>x15</>, mwmkey:"x15image", mwmtype:"image", 
           txtdesc:<>from https://www.edwards.af.mil/News/Photos/igphoto/2001667598/</>, 
           imgurl:'/jpeg/hist/aerospace/WIKIMEDIA-X-15_flying.jpg' }
      ]},
      { BRANCH:"Lib Of Congress", mwmkey:"LibCongress", items: [
        { BRANCH:"picts", mwmkey:"picts", items:[
          { LEAF:"American Gothic", mwmkey: "gwoodAmericanGothic", mwmtype: "image",
              imgurl:'/jpeg/WIKIMEDIA_American_Gothic.jpg'
            },
          { BRANCH:<>Winslow<br/>{space4}Homer</>, mwmkey:"winslowHomer", items:[
            const_winslowHomerFogWarning,
            { LEAF:<>Ship-building,<br/>{space4}Gloucester<br />{space4}Harbor</>, mwmkey: "winslowHomerShipBuilding",
              mwmtype: "image",
              //imgurl:'https://tile.loc.gov/storage-services/service/pnp/cph/3c30000/3c32000/3c32900/3c32923r.jpg' 
              //imgurl:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Winslow_Homer_-_Ship_Building%2C_Gloucester_Harbor_%281873%29.jpg/1024px-Winslow_Homer_-_Ship_Building%2C_Gloucester_Harbor_%281873%29.jpg'
              imgurl:'https://mobiwek61menu.github.io/imgsFromWikimediaAndLibOfCongress/docs/assets/loc-shipbuilding.jpg'
            }
          ]},
        ]},
      ]}, 
      { BRANCH:"Drinks", mwmkey:"beverages", items:[
        { LEAF:"Mojito", mwmkey: "mojito", mwmtype:"mwtypNull" },  
        { BRANCH:"Hot Drink", mwmkey:"hotDrink", items:[
            { LEAF:"Tea", mwmkey: "tea", mwmtype:"mwtypNull" },      
            { LEAF:"Coffee", mwmkey: "coffee", mwmtype:"mwtypNull" },
        ]},
      ]},
      // SAVE BELOW EXAMPLE to verify React routing (see matching entry in code)
      { BRANCH:<>tools for my<br/>{space4}workshop</>, mwmkey:"workshopTools", items: [
        { LEAF:"hone", mwmkey: "hone", mwmtype:"mwtypNull" },
        { BRANCH:"power", mwmkey:"power", items:[
            { LEAF:"drillPress", mwmkey: "drillPress", mwmtype:"mwtypNull" },
            { BRANCH:"saw", mwmkey:"saw", items:[
              { LEAF:"band", mwmkey: "band", mwmtype:"mwtypNull" },
              { LEAF:"chainsaw", mwmkey: "chainsaw", mwmtype:"mwtypNull" }]}
        ]},
        { BRANCH:"hand", mwmkey:"hand", items:[
            { LEAF:"punch", mwmkey:"punch", mwmtype:"mwtypNull" },
            { LEAF:"pliers", mwmkey:"pliers", mwmtype:"mwtypNull" }]}
      ]},
      const_winslowHomerFogWarning, 
      // put in lots of lines to force page scroll for testing proper behavior
      // need (...) spread operator to unwind the array of JSON objects (the menus)
      ...lotsa_JSON_Menu_LEAF(22), 
      { BRANCH:"today's_soup", mwmkey:"todaysSoup", items: [
        { BRANCH:"cold", mwmkey:"cold", items: [
            { LEAF:"vichysoisse", mwmkey: "vichysoisse", mwmtype:"mwtypNull" },
            { LEAF:"borscht", mwmkey: "borscht", mwmtype:"mwtypNull" }
        ]},
        { LEAF:"chowder", mwmkey: "chowder", mwmtype:"mwtypNull" },
        { LEAF:"tomato", mwmkey: "tomato", mwmtype:"mwtypNull" }
      ]},
      ...lotsa_JSON_Menu_LEAF(5), // need spread operator to unwind the array of JSON objects (the menus)
    ]};
    
    
    export { mobiwekMenuJSONexample_1 }

    /*
   // clunkier way of using map
// const lotsa_JSON_Menu_LEAF = (total) => {
//   const foo = [total] 
//   for (let i = 0; i < total; i++) foo[i] = i;
//   var jsonArrayOut = [];
//   foo.map(val => { jsonArrayOut.push({ LEAF:"addline"  + lnTotalCt, mwmkey: "line" + lnTotalCt++ }) })
//   return  jsonArrayOut
// }
    
*/