import React from 'react';
 
const space4=<>&nbsp;&nbsp;&nbsp;&nbsp;</>  // this is JSX. Must be bounded by <> and </>

/** example of creating a reusable menu leaf as a const */
const const_winslowHomerFogWarning = { LEAF:"fog Warning", mwmkey: "winslowHomerFogWarning",
  txtdesc:<>The fisherman is worried he cannot return to the schooner because of impending fog.<br/>
  If he can't get back, he will be lost at sea.<br/>
  From the direction of the swells, the wind and waves are against him.</>,
  mwmtype: "image",
  imgurl:'/jpeg/WIKIMEDIA-Winslow-HomerFogWarning.jpg' 
};

const mobiwekMenuJSONexample_1 = 
    { REV:'simple example', 
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
        { BRANCH:"aircraft", mwmkey:"aircraft", items:[
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
        { LEAF:"x15 Intro", mwmkey:"x15", mwmtype:"mwtypNull", clickMeLink:"x15image" },
        { LEAF:<>picture of<br/>x15</>, mwmkey:"x15image", mwmtype:"image", 
           txtdesc:<>from https://www.edwards.af.mil/News/Photos/igphoto/2001667598/</>, 
           imgurl:'/jpeg/hist/aerospace/WIKIMEDIA-X-15_flying.jpg' }
      ]},
      const_winslowHomerFogWarning, 
    ]};
    
    export { mobiwekMenuJSONexample_1 }
