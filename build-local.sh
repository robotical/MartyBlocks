EMBEDDED=${1:-embedded}

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
cd $CWD/marty-blocks-lib && npm link;
cd $CWD/scratch-blocks && npm link && npm link $CWD/marty-blocks-lib;
cd $CWD/scratch3-vm && npm link && npm link $CWD/marty-blocks-lib $CWD/scratch-blocks;
cd $CWD/scratch3-gui && npm link $CWD/marty-blocks-lib $CWD/scratch-blocks $CWD/scratch3-vm;

# optionally link marty-blocks-lib and marty2js
if [ -z "$1"]
  then
    cd $CWD/marty-blocks-lib && npm link $CWD/marty2js;
fi

# then build out scratch blocks
# cd $CWD/scratch-blocks && npm run prepublish;
cd $CWD/scratch3-gui && BUILD_MODE=dist npm run build;

cd $CWD
