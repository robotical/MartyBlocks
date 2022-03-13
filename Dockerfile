FROM library/ubuntu:18.04

LABEL description="Base image MartyBlocks developement"
LABEL maintainer="Rob Dobson <rob@dobson.com>"

ENV PORT 8601

# Install the required packages
RUN apt update
RUN apt install curl gnupg -y
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash
RUN apt install nodejs -y
RUN node -v
RUN npm -v
RUN apt install git openjdk-8* -y
RUN npm install -g typescript

# configure npm
RUN npm config set spin=false && npm config set progress=false
    
RUN echo "Cloning MartyBlocks -----------------------------------------"
RUN git clone https://github.com/robotical/MartyBlocks.git
RUN cd /MartyBlocks
RUN echo "Perform npm install on marty-blocks-lib -----------------------------------------"
RUN cd /MartyBlocks/marty-blocks-lib && npm install

RUN echo "Cloning stratch-blocks -----------------------------------------"
RUN git clone -b develop https://github.com/llk/scratch-blocks.git /MartyBlocks/scratch-blocks
RUN echo "Cloning stratch-vm -----------------------------------------"
RUN git clone -b develop https://github.com/llk/scratch-vm.git /MartyBlocks/scratch-vm

RUN echo "Cloning stratch-gui -----------------------------------------"
RUN git clone -b develop https://github.com/llk/scratch-gui.git /MartyBlocks/scratch-gui

RUN echo "Checkout specific scratch commits -----------------------------------------"
RUN cd /MartyBlocks/scratch-blocks && git reset --hard 0969d4c14e61a89dfc2bd105f7482a4ee73e222f
RUN echo "Checkout specific scratch commits -----------------------------------------"
RUN cd /MartyBlocks/scratch-vm && git reset --hard fe1c45460429eae680142243c891fd84b95f9b07
RUN echo "Checkout specific scratch commits -----------------------------------------"
RUN cd /MartyBlocks/scratch-gui && git reset --hard c87fdc046a5497afedaaa3d7db51430247e9a246

RUN echo "Perform npm install on scratch-blocks -----------------------------------------"
RUN cd /MartyBlocks/scratch-blocks && npm install
RUN echo "Perform npm install on scratch-vm -----------------------------------------"
RUN cd /MartyBlocks/scratch-vm && npm install
RUN echo "Perform npm install on scratch-gui -----------------------------------------"
RUN cd /MartyBlocks/scratch-gui && npm install

RUN echo "NPM Linking -----------------------------------------"
RUN cd /MartyBlocks/marty-blocks-lib && npm link
RUN cd /MartyBlocks/scratch-blocks && npm link && npm link marty-blocks-lib
RUN cd /MartyBlocks/scratch-vm && npm link && npm link marty-blocks-lib scratch-blocks
RUN cd /MartyBlocks/scratch-gui && npm link marty-blocks-lib scratch-blocks scratch-vm

RUN echo "Build Scratch blocks -----------------------------------------"
RUN cd /MartyBlocks/scratch-blocks && npm run prepublish
RUN cd /MartyBlocks/scratch-vm && npm run build
RUN cd /MartyBlocks/scratch-gui && BUILD_MODE=dist npm run build

WORKDIR /MartyBlocks/scratch-gui
EXPOSE 8601
# Comment or uncomment the following line depending on whether you want the container
# to continue running after the build (serving MartyBlocks on localhost:8601) or not.
# If you choose not to run the container after the build, you can obtain the files in 
# the container by running the following command on the host's command line:
# docker cp <container_id>:/MartyBlocks/scratch-gui/build/ ./build
CMD ["npm","start"]
