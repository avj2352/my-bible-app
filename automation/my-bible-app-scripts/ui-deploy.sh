# Script to only copy over build folder
echo "Deploying UI - from Source folder to Heroku project...."
cp -a ../../../node-workspace/my-bible-app/frontend/build/ ../../mba-pwa/build
echo "Deleting Source location build folder...."
rm -rf ../../../node-workspace/my-bible-app/frontend/build
