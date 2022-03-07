FROM library/ubuntu:18.04

LABEL description="Base image MartyBlocks developement"
LABEL maintainer="Rob Dobson <rob@dobson.com>"

ENV PORT 8601

RUN apt update && apt install git npm -y
RUN npm install -g typescript
RUN echo "Cloning MartyBlocks -----------------------------------------"
RUN git clone https://github.com/robotical/MartyBlocks.git
RUN cd /MartyBlocks
RUN echo "Cloning stratch-blocks -----------------------------------------"
RUN git clone -b feature/refactorMartyBlocks https://github.com/robotical/scratch-blocks.git /MartyBlocks/scratch-blocks
RUN echo "Cloning stratch3-vm -----------------------------------------"
RUN git clone -b feature/refactorMartyBlocks https://github.com/robotical/scratch3-vm.git /MartyBlocks/scratch3-vm
RUN echo "Cloning stratch3-gui -----------------------------------------"
RUN git clone -b feature/refactorMartyBlocks https://github.com/robotical/scratch3-gui.git /MartyBlocks/scratch3-gui
RUN echo "Perform npm install on marty-blocks-lib -----------------------------------------"
RUN cd /MartyBlocks/marty-blocks-lib && npm install
RUN echo "Perform npm install on scratch-blocks -----------------------------------------"
RUN cd /MartyBlocks/scratch-blocks && npm install
RUN echo "Perform npm install on scratch3-vm -----------------------------------------"
RUN cd /MartyBlocks/scratch3-vm && npm install
RUN echo "Perform npm install on scratch3-gui -----------------------------------------"
RUN cd /MartyBlocks/scratch3-gui && npm install
RUN echo "NPM Linking -----------------------------------------"
RUN cd /MartyBlocks/marty-blocks-lib && npm link
RUN cd /MartyBlocks/scratch-blocks && npm link && npm link marty-blocks-lib
RUN cd /MartyBlocks/scratch3-vm && npm link && npm link marty-blocks-lib scratch-blocks
RUN echo "NPM Linking scratch3gui -----------------------------------------"
RUN cd /MartyBlocks/scratch3-gui && npm update && npm link marty-blocks-lib scratch-blocks scratch-vm
RUN echo "Scratch blocks prepublish -----------------------------------------"
RUN cd /MartyBlocks/scratch-blocks && npm run prepublish
RUN echo "Scratch gui build -----------------------------------------"
RUN cd /MartyBlocks/scratch3-gui && BUILD_MODE=dist npm run build

WORKDIR /MartyBlocks/scratch3-gui
EXPOSE 8601
# CMD ["npm","start"]
