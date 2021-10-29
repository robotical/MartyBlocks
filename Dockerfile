FROM node:14-alpine

ENV PORT 8601

RUN apk add --no-cache git \
    && git clone https://github.com/robotical/MartyBlocks.git \
    && cd /MartyBlocks \
    && git submodule update --init --recursive \
    # first we npm install each
    && cd /MartyBlocks/scratch-blocks && npm install \
    && cd /MartyBlocks/scratch3-vm && npm install \
    && cd /MartyBlocks/scratch3-gui && npm install \
    # then we link everything
    && cd /MartyBlocks/scratch-blocks && npm link \
    && cd /MartyBlocks/scratch3-vm && npm link \
    && cd /MartyBlocks/scratch3-vm && npm link /MartyBlocks/scratch-blocks \
    && cd /MartyBlocks/scratch3-gui && npm link /MartyBlocks/scratch-blocks /MartyBlocks/scratch3-vm \
    # then build out scratch blocks
    && cd /MartyBlocks/scratch-blocks && npm run prepublish \
    && cd /MartyBlocks/scratch-gui && BUILD_MODE=dist npm run build

WORKDIR /MartyBlocks/scratch3-gui
EXPOSE 8601
CMD ["npm","start"]
