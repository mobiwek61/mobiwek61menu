
1/17/2025
todo: remove Popup_custom.tsx and LeafletHelper. Then deploy bundle to npmjs with change to allow popup callback.

### This folder has code to be included in the development bundle by webpack.
- It starts up react and loads a dev application
- Code here is not included in a public distribution.  
  Instead, the client code does above things.
- During development, this code needs to be in the bundle because: 
    - it gets hot-reloaded during coding
    - only one node_modules folder containing React must be present, or a mysterious error appears.
      This setup assures only one such folder exists.
      
# LICENSE
Code in this folder is examples of how to use the package, so it has a more permissive license than the rest of this repository. It does not get included in the production package, it is for development only.
See license notices in source files in this folder.
