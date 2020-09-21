@ECHO OFF
set commitMessage=%1
echo STARTING DEPLOYING TO FIREBASE (Vue.js)...
cd %~dp0\client\
cmd /c npm run build
cmd /c firebase deploy --project 726820887406
cd ..
echo STARTING DEPLOYING TO HEROKU (Node.js)...
cd %~dp0\server\
start /WAIT git add .
start /WAIT git commit -m "%commitMessage%"
cmd /c git push heroku master
cd ..
start /WAIT git push api "%commitMessage%"
echo ALL PROCESS ENDED, EXIT...