CWD=$(pwd -P)

# checkout the branches we want
cd $CWD/scratch-blocks && git checkout -f mv2app;
cd $CWD/scratch3-vm && git checkout -f mv2app
cd $CWD/scratch3-gui && git checkout -f mv2app

# first we npm install each
cd $CWD/marty-blocks-lib && npm install;
cd $CWD/scratch-blocks && npm install;
cd $CWD/scratch3-vm && npm install;
cd $CWD/scratch3-gui && npm install;

# then we link everything
cd $CWD/marty-blocks-lib && npm link && npm link;
cd $CWD/scratch-blocks && npm link && npm link marty-blocks-lib;
cd $CWD/scratch3-vm && npm link && npm link marty-blocks-lib scratch-blocks;
cd $CWD/scratch3-gui && npm link marty-blocks-lib scratch-blocks scratch-vm;

# then build out scratch blocks
# cd $CWD/scratch-blocks && npm run prepublish;
cd $CWD/scratch3-gui && BUILD_MODE=dist npm run build;

cd $CWD
