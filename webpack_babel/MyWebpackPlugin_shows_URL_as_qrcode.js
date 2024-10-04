
/**
 * THIS FILE DOES NOT GO INTO THE BUNDLE
 * IT IS A UTILITY FOR BUILDING DEVELOPMENT RUNS ON THE WEBPACK SERVER
 */

/**
 * This is a webpack plugin. It is specified in the webpack.config*.js file.
 * It is not necessary, it just shows a qr code in console for the url.
 * It is a way to run custom javascript code as part of a webpack build.
 * Followed https://webpack.js.org/contribute/writing-a-plugin/ I dont really know what's going on but it works.
 */

// var qrThing = require('./commandLine-get-QRcode')
const {abc, doAllQR} = require('./commandLine-get-QRcode')

// import { doAllQR } from './commandLine-get-QRcode'

class MyWebpackPlugin_shows_URL_as_qrcode {
  constructor(options = {}) {
    this.urlpath2 = options.urlpath // javascript class way of doing class variable
  }
  apply(compiler) {
    compiler.hooks.done.tap(
      'This is MyWebpackPlugin_shows_URL_as_qrcode 1',
      /* stats is passed as an argument when done hook is tapped.  */
      (stats) => { 
        console.log('This is MyWebpackPlugin_shows_URL_as_qrcode 2! cc');
        var zzz = this.urlpath2; // make separate variable because original gets garbage collected ?
        doAllQR(zzz)
      }
    );
  }
}

module.exports = MyWebpackPlugin_shows_URL_as_qrcode;