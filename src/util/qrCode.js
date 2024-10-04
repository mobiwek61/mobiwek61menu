import React, { useEffect } from 'react';

var QRCode = require('qrcode')
//   "qrcode": "^1.5.1",

  // the QRCode component works by taking a HTML5 canvas that you put in the document and drawing a QRCode into it
  // It lets you easily get the site on you phone (requires server and phone on same subnet).
  // First set you browser to the true IP address (not localhost) and then scan it.
  function doQRcode(window, qrcanvas) {
    // SAVE THIS:   to get url (not localhost) and open in browser, on dev machine run this:
    // on pc, run "hostname -I" to get ip. Below is a script which should extract needed parts of result:
    // foo=http://$(hostname -I | sed "s/ *$//g"):3000; google-chrome $foo;
    // on ubuntu:
    // first to "ipconfig | grep IPv4" to see which line to choose below
    // ipconfig | grep IPv4 | sed -n '4 p'| sed -n -e 's/.*: //p'
    //                                ^ line 3           ^^^ all stuff before colon
    // -n means not to print anything by default. -e is followed by a sed command. s is the pattern replacement command.
    var myURL = window.location.href;
    // console.log('doQRcode ' + myURL)
    QRCode.toCanvas(qrcanvas, myURL, { width: 99 }, 
      function (error) {
          if (error) console.error('error in doQRcode: ' + error); 
          // console.log('success from doQRcode');
      })
  }

  function ShellCommandsToStartBrowser(props) {
    const cmdLineCSS = {background:'#ccffff', color:'#920c0c', overflow:'auto',
                        border:'4px solid #444444' };
    /* In the React world "useEffect" is a lifecycle function. Controlled by argument 2.
       missing: run always;  [] empty: run only once when component mounts; [foo] run when useState foo changes */
    useEffect(() => { 
        // comment out 'copy to clipboard' but leave code in case I want to use that feature sometime.
        // document.querySelector('#wincmd').addEventListener('click', 
        //     (evt) => { 
        //       if (!navigator.clipboard) { console.log('null navigator.clipboard not copying'); return; }
        //       navigator.clipboard.writeText(evt.currentTarget.textContent)
        //       document.execCommand("copy"); window.getSelection().removeAllRanges(); props.clickCallBack('wincmd')  })
        // document.querySelector('#unixcmd').addEventListener('click', 
        //       (evt) => { 
        //         if (!navigator.clipboard) { console.log('null navigator.clipboard not copying'); return; }
        //         navigator.clipboard.writeText(evt.currentTarget.textContent)
        //         document.execCommand("copy"); window.getSelection().removeAllRanges(); props.clickCallBack('unixcmd')  })
    }, []); 

    return(
    <>
        <div><div  style={{ color:'red' }}>PC with git-bash 
             {/* <i> (click-to-copy)</i>*/}: </div> 
        <div id='wincmd' style={cmdLineCSS} >{showPS_pc()}
             arp -a | grep dynamic &nbsp;&nbsp;&nbsp;# this gets IP of phone. [Firewall settings-&gt;advanced] <br/>
             # SNAFU: is wifi PUBLIC or PRIVATE ???<br/>&nbsp;</div> {/* onclick may be added by useEffect */}
        </div>
        <div ><div  style={{ color:'red' }}>UN*X
             {/* <i> (click-to-copy)</i>*/}: </div></div>
        <div id='unixcmd'  style={cmdLineCSS} >{showPS_nix()}</div> {/* onclick may be added by useEffect */}
        <div >window size stats:</div>
        <div style={cmdLineCSS}>
        </div>
        <div style={{ 
            width:'fit-content', display:'grid', 
            gridColumnGap: '2vw', gridRowGap: '0.1vh',
            gridTemplateColumns: 'auto auto auto auto' }}>
            <div>outerWidth:</div><div>{ window.outerWidth }</div>
            <div >outerHeight:</div><div>{ window.outerHeight }</div>
            <div >innerWidth:</div><div>{ window.innerWidth }</div>
            <div >innerHeight:</div><div>{ window.innerHeight }</div>
        </div>
      </>
    ); 
  }

  // produces these outputs for pc and nix respectively:
  // foo=$(ipconfig| gawk '/Wi-Fi:/,0 { print $0 } ' | sed -n 's/IPv4.*\:\(.*\)/\1/p'); echo $foo; "C:\Program Files\Google\Chrome\Application\chrome.exe" $foo:3001;
  // above uses gawk to get Wi-Fi lines, then pipes to sed which gets the IPv4 ip address
  //       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ obtains Wi-Fi ip address
  //     ^ run what inside () and use output to set foo        ^ substitute     ^^ first capture
  //                        ^^^^^^ find this up to semicolon     ^^^^^^ find line with IPv4
  //                                    ^^^^^^^^ print all lines past matching line 
  //                                                                      ^^^^^ capture line past semicolon using ()
  //                                                                            ^^^ output capture here its the ip address
  //             
  // foo=http://$(hostname -I | sed "s/\(\.*\)\ .*/\1/g"); echo $foo; google-chrome $foo:3001;
  
  const edge = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
  const chrome = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
  const pcBrowser = edge
  function showPS_pc() { return(<div style={{ fontFamily:'courier'}}>
    phoneIP=$(ipconfig| gawk '/Wi-Fi/,0 &#123; print $0 &#125; ' | 
        sed -n 's/IPv4.*\:\(.*\)/\1/p'); <br/>
        echo phoneIP: $phoneIP; <br/>"{ pcBrowser }" $phoneIP:3000;</div>);}
  function showPS_nix() { return(<div style={{ fontFamily:'courier'}}>phoneIP=http://$(hostname -I | sed "s/\(\.*\)\ .*/\1/g"); echo $phoneIP; google-chrome $phoneIP:3000;<br/>&nbsp;</div>);}
  

//   <canvas ref={qrcanvas}  ></canvas>
//   var qrcanvas = useRef();

// useEffect(() => { // [] empty: run only once when component mounts like componentDidMount
//   doQRcode();
// }, []);

export { doQRcode, ShellCommandsToStartBrowser };




