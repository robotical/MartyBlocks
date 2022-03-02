FROM node:14-alpine

ENV PORT 8601

RUN apk add --no-cache git python2 openjdk11 \
    && npm install -g typescript \
    && echo "Cloning MartyBlocks -----------------------------------------" \
    && git clone https://github.com/robotical/MartyBlocks.git \
    && cd /MartyBlocks \
    && echo "Cloning stratch-blocks -----------------------------------------" \
    && git clone https://github.com/robotical/scratch-blocks.git \
    && echo "Cloning stratch3-vm -----------------------------------------" \
    && git clone https://github.com/robotical/scratch3-vm.git \
    && echo "Cloning stratch3-gui -----------------------------------------" \
    && git clone https://github.com/robotical/scratch3-gui.git \
    && echo "Checkout desired branch -----------------------------------------" \
    && cd /MartyBlocks/scratch-blocks && git checkout -f feature/refactorMartyBlocks \
    && cd /MartyBlocks/scratch3-vm && git checkout -f feature/refactorMartyBlocks \
    && cd /MartyBlocks/scratch3-gui && git checkout -f feature/refactorMartyBlocks \
    && echo "Perform npm install on marty-blocks-lib -----------------------------------------" \
    && cd /MartyBlocks/marty-blocks-lib && npm install \
    && echo "Perform npm install on scratch-blocks -----------------------------------------" \
    && cd /MartyBlocks/scratch-blocks && npm install \
    && echo "Perform npm install on scratch3-vm -----------------------------------------" \
    && cd /MartyBlocks/scratch3-vm && npm install \
    && echo "Perform npm install on scratch3-gui -----------------------------------------" \
    && cd /MartyBlocks/scratch3-gui && npm install \
    && echo "NPM Linking -----------------------------------------" \
    && cd /MartyBlocks/marty-blocks-lib && npm link \
    && cd /MartyBlocks/scratch-blocks && npm link && npm link marty-blocks-lib \
    && cd /MartyBlocks/scratch3-vm && npm link && npm link marty-blocks-lib scratch-blocks \
    && echo "NPM Linking scratch3gui -----------------------------------------" \
    && cd /MartyBlocks/scratch3-gui && npm update && npm link marty-blocks-lib scratch-blocks scratch-vm \
    && ls -al ./node_modules \
    && echo "Scratch blocks prepublish -----------------------------------------" \
    && cd /MartyBlocks/scratch-blocks && npm run prepublish \
    && echo "Scratch gui build -----------------------------------------" \
    && cd /MartyBlocks/scratch3-gui && BUILD_MODE=dist npm run build


WORKDIR /MartyBlocks/scratch3-gui
EXPOSE 8601
# CMD ["npm","start"]
