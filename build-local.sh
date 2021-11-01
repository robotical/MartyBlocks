git submodule update --init --recursive
CWD=$(pwd -P)

# first we npm install each
cd $CWD/marty2js && npm install;
cd $CWD/marty-blocks-lib && npm install;
cd $CWD/scratch-blocks && npm install;
cd $CWD/scratch3-vm && npm install;
cd $CWD/scratch3-gui && npm install;

# then we link everything
cd $CWD/marty2js && npm link;
cd $CWD/marty-blocks-lib && npm link && npm link marty2js;
cd $CWD/scratch-blocks && npm link && npm link marty-blocks-lib;
cd $CWD/scratch3-vm && npm link && npm link marty-blocks-lib scratch-blocks;
cd $CWD/scratch3-gui && npm link marty-blocks-lib scratch-blocks scratch3-vm;

# then build out scratch blocks
# cd $CWD/scratch-blocks && npm run prepublish;
cd $CWD/scratch3-gui && BUILD_MODE=dist npm run build;

cd $CWD
