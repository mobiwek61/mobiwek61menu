

This demo project uses a custom webpack configuration, specifically setup for React.  
Assumes the 'nix **bash shell** included with git for windows has been installed or it's
run from a 'nix box (not tested)  
To run, cd to this folder and in a git-bash shell:  
  ```
  # reads package.json and loads node_modules folder with packages.
  npm install 
  # run the app using preconfigured setup.
  ./runWebpackSrv 
  # a QR code of the app should appear in the commandline window
  # and the app should popup in a browser
  # Any edits get auto-reloaded in real time.
  ```

#### Code details in **src**:
- **DevMenuSpec.js** defines the menu structure
- **ReactAppForDevelopment.js** defines React.js routes which match those setup in the menu.

#### Folder webpackUtils:
- has webpack plugins and supporting node.js code. This plugin displays the url as a QR code for display/debugging of app on a mobile device.
