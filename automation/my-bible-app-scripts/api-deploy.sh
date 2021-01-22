# Script to copy over all contents from project to current location
echo "API - Copying from Dist...."
cp -a ../../../node-workspace/my-bible-app/backend/dist/. ../../mba-pwa/.
echo "Copied! "
echo "API - Deleting source location..."
rm -rf ../../../node-workspace/my-bible-app/backend/dist
echo "UI - Copying from Frontend..."
cp -a ../../../node-workspace/my-bible-app/frontend/build ../../mba-pwa/build
echo "Copied! "
echo "UI - Deleting source location..."
rm -rf ../../../node-workspace/my-bible-app/frontend/build
