FROM node:14-alpine

ENV PORT 8601

RUN apk add --no-cache git python2 openjdk11 \
    && npm install -g typescript \
    && git clone https://github.com/robotical/MartyBlocks.git \
    && cd /MartyBlocks \
    && git submodule update --init --recursive \
    # first we npm install each
    && cd /MartyBlocks/marty2js && npm install \
    && cd /MartyBlocks/scratch-blocks && npm install \
    && cd /MartyBlocks/scratch3-vm && npm install \
    && cd /MartyBlocks/scratch3-gui && npm install \
    # then we link everything
    && cd /MartyBlocks/marty2js && npm link \
    && cd /MartyBlocks/scratch-blocks && npm link \
    && cd /MartyBlocks/scratch3-vm && npm link && npm link /MartyBlocks/scratch-blocks /MartyBlocks/marty2js\
    && cd /MartyBlocks/scratch3-gui && npm link /MartyBlocks/scratch-blocks /MartyBlocks/scratch3-vm /MartyBlocks/marty2js\
    # then build out scratch blocks
    && cd /MartyBlocks/scratch-blocks && npm run prepublish \
    && cd /MartyBlocks/scratch3-gui && npm update && BUILD_MODE=dist npm run build \
    # then build marty2js
    && cd /MartyBlocks/marty2js && tsc --build tsconfig.json

WORKDIR /MartyBlocks/scratch3-gui
EXPOSE 8601
CMD ["npm","start"]
