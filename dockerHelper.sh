git submodule update --init --recursive
CWD=$(pwd -P)

# first we npm install each
cd $CWD/scratch-blocks && npm install;
cd $CWD/scratch3-vm && npm install;
cd $CWD/scratch3-gui && npm install;

# then we link everything
cd $CWD/scratch-blocks && npm link;
cd $CWD/scratch3-vm && npm link;
cd $CWD/scratch3-vm && npm link $CWD/scratch-blocks;
cd $CWD/scratch3-gui && npm link $CWD/scratch-blocks $CWD/scratch3-vm;

# then build out scratch blocks
cd $CWD/scratch-blocks && npm run prepublish;
cd $CWD
