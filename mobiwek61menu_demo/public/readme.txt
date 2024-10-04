#in a blank folder  
npx create-react-app mobiwek61menu_demo
cd mobiwek61menu_demo/
mv package.json package.json.orig
# copy package.json from demo app to here
npm i
npm start
# app runs but no images, so then I copied jpegs from the public folder from working test app
# now images ok
# now build runnable to put on zzzz.github.io
npm run build
ls build/
# I see all files needed to run the app including images.
# then I copied all contents of build to zzz\zzz\zzzz\mobiwek61.github.io
# then I git push that to github. Then browsed to mobiwek61.github.io and the app appeared
# I left the readme.md in place at the destination
