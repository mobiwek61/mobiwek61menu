import React from 'react';
import { BsQuestionCircle as QuestionIcon } from "react-icons/bs";
import { FaBars as HamburgerIcon } from "react-icons/fa";
// import { faCircleInfo as InfoCircle } from "react-icons/fa";
import { BsInfoCircle as InfoCircle } from "react-icons/bs";
// import Ajv from "ajv"; // JSON schema

/**
 * This is the glowing info icon. It consists of a react-icon/fa thing 
 * on top of a SVG circle which forms a background color
 * @param fontSize
 * @param onClick function to invoke when control is clicked
 * @returns 
 */
function GlowingInfo(props) {
  return(
    <div style={{ display:'inline-grid', margin:'5px', zIndex:'22',
                  height:'fit-content', width:'fit-content',
                  // below lines align it with bottom of parent
                  position:'absolute', bottom:'0px' }}> 
      {/* below is box under hamburger to give the glowingCloud effect. Got right size by
        looking as debug-source of hamburger, using its viewbox etc */}
      <svg id='SolidBoxUnderInfo' 
            className="glowingBackdrop"
            viewBox="0 0 10 10" // viewBox is min/max scale for cx, cy, r, not size
            height="1em" width="1em" // use 1em to set relative to font size, setup below in style
            xmlns="http://www.w3.org/2000/svg" 
            style={{fontSize:props.fontSize, // width/height eats this
                    zIndex:'22', margin:'0',  position:'absolute' }} >
            <circle // below center & radius in viewBox coordinates setup in svg tag
                    cx="5" cy="5" r="5" 
                    //fill='#cccccc' 
                    />
      </svg>
      <InfoCircle // this sits on top of glowing backdrop
            style={{fontSize:props.fontSize, zIndex:'22', color:'#000000' }}
            onClick={props.onClick} />
    </div>)
}
// does not work in jsx...  filter:"dropShadow(#7ad786e8 5px 5px 5px) dropShadow(#7ad786e8 -5px -5px 5px)"
// note: refer to GlowingInfo for updated version ...
function GlowingBurger(props) {
  return(
    <div style={{ display:'inline-grid', margin:'5px', zIndex:'22'}}> 
      {/* below is box under hamburger to give the glowingCloud effect. Got right size by
        looking as debug-source of hamburger, using its viewbox etc */}
      <svg id='SolidBoxUnderHamburger' 
            viewBox="0 0 18 18" // viewBox is min/max scale for rect dimens
            className="glowingBackdrop"
            height="1em" width="1em" // use 1em to set relative to font size, setup below in style
            xmlns="http://www.w3.org/2000/svg" 
            style={{fontSize:props.fontSize, zIndex:'22', margin:'2.0vmin', position:'absolute' }} >
            <rect width="18" height="18" />
      </svg>
      <HamburgerIcon id='HamburgerIcon' // this sits on top of glowing backdrop
        style={{fontSize:props.fontSize, zIndex:'22' }}
        onClick={ props.onClick} />
    </div>)
}

/**
 * uses svg to put icon on top of colored circle to fill in with color.
 * @param applePie.styleZ set of styles to pass onto outer div of component
 * @param applePie.fontSize font size to use
 * @param applePie.clickCallback callback function when clicked
 * @returns 
 */
const QuestionInsideColoredCircle = (applePie) => {
    return (<div id='iconCircleTop' style={{ display:'Grid', ...applePie.styleZ }} >
            <QuestionIcon   
                style={{ fontSize:applePie.fontSize, zIndex:'2', gridColumn:1, gridRow:1 }}
                onClick={ () => { applePie.clickCallback('question mark pressed') }} 
            />
            <svg id='SolidBoxUnderInfo' 
                    viewBox="0 0 10 10" // viewBox is min/max scale for cx, cy, r, not size
                    height="1em" width="1em" // use 1em to set relative to font size, setup below in style
                    xmlns="http://www.w3.org/2000/svg" 
                    style={{fontSize:applePie.fontSize, // width/height above eats fontSize
                    zIndex:'1', margin:'0', gridColumn:1, gridRow:1  }} >
                <circle // below center & radius in viewBox coordinates setup in svg tag
                cx="5" cy="5" r="5" 
                fill='#ffff00' 
                />
            </svg><br/>
        </div>)
}

/* const QuestionInsideColoredCircleqqq = (applePie) => {
    return (<div id='iconCircleTop' style={{ position:'auto'}} >
            <QuestionIcon   
                style={{ fontSize:applePie.fontSize, position:'absolute', zIndex:'2' }}
                // onClick={ () => {
                    
                //   }} 
            />
            <svg id='SolidBoxUnderInfo' 
                    viewBox="0 0 10 10" // viewBox is min/max scale for cx, cy, r, not size
                    height="1em" width="1em" // use 1em to set relative to font size, setup below in style
                    xmlns="http://www.w3.org/2000/svg" 
                    style={{fontSize:applePie.fontSize, // width/height above eats fontSize
                    zIndex:'1', margin:'0',  position:'absolute' }} >
                <circle // below center & radius in viewBox coordinates setup in svg tag
                cx="5" cy="5" r="5" 
                fill='#ffff00' 
                />
            </svg><br/>
        </div>)
} */

export { QuestionInsideColoredCircle, GlowingBurger, GlowingInfo }