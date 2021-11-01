FROM node:14-alpine

ENV PORT 8601

RUN apk add --no-cache git python2 openjdk11 \
    && npm install -g typescript \
    && git clone https://github.com/robotical/MartyBlocks.git \
    && cd /MartyBlocks \
    && git clone https://github.com/robotical/marty2js.git \
    && git clone https://github.com/robotical/scratch-blocks.git \
    && git clone https://github.com/robotical/scratch3-vm.git \
    && git clone https://github.com/robotical/scratch3-gui.git \
    && cd /MartyBlocks/scratch-blocks && git checkout -f feature/refactorMartyBlocks \
    && cd /MartyBlocks/scratch3-vm && git checkout -f feature/refactorMartyBlocks \
    && cd /MartyBlocks/scratch3-gui && git checkout -f feature/refactorMartyBlocks \
    # # first we npm install each
    # && cd /MartyBlocks/marty2js && npm install \
    # && cd /MartyBlocks/marty-blocks-lib && npm install \
    # && cd /MartyBlocks/scratch-blocks && npm install \
    # && cd /MartyBlocks/scratch3-vm && npm install \
    # && cd /MartyBlocks/scratch3-gui && npm install \
    # # then we link everything
    # && cd /MartyBlocks/marty2js && npm link \
    # && cd /MartyBlocks/marty-blocks-lib && npm link \
    # && cd /MartyBlocks/scratch-blocks && npm link && npm link marty-blocks-lib \
    # && cd /MartyBlocks/scratch3-vm && npm link && npm link marty-blocks-lib scratch-blocks marty2js \
    # && cd /MartyBlocks/scratch3-gui && npm link marty-blocks-lib scratch-blocks scratch-vm marty2js \
    # # then build out scratch blocks
    # && cd /MartyBlocks/scratch-blocks && npm run prepublish \
    # && cd /MartyBlocks/scratch3-gui && npm update && BUILD_MODE=dist npm run build \
    # # then build marty2js
    # && cd /MartyBlocks/marty2js && tsc --build tsconfig.json

WORKDIR /MartyBlocks/scratch3-gui
EXPOSE 8601
# CMD ["npm","start"]
