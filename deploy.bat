@ECHO OFF
echo STARTING DEPLOYING TO FIREBASE (Vue.js)...
cd %~dp0\client\
cmd /c npm run build
cmd /c firebase deploy --project 726820887406
cd ..
echo ALL PROCESS ENDED, EXIT...