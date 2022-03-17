FROM library/ubuntu:18.04

LABEL description="Base image MartyBlocks development"
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
RUN git clone -b "feature/latest-scratch" https://github.com/robotical/MartyBlocks.git
RUN cd /MartyBlocks/marty-blocks-lib && npm install

RUN echo "Cloning stratch -----------------------------------------"
RUN git clone -b develop https://github.com/llk/scratch-blocks.git /MartyBlocks/scratch-blocks
RUN git clone -b develop https://github.com/llk/scratch-vm.git /MartyBlocks/scratch-vm
RUN git clone -b develop https://github.com/llk/scratch-gui.git /MartyBlocks/scratch-gui

RUN echo "Checkout specific scratch commits -----------------------------------------"
RUN chmod +x /MartyBlocks/scripts/checkout-scratch.sh && /MartyBlocks/scripts/checkout-scratch.sh

RUN echo "Perform npm install on scratch -----------------------------------------"
RUN cd /MartyBlocks/scratch-blocks && npm install && \
    cd /MartyBlocks/scratch-vm && npm install && \
    cd /MartyBlocks/scratch-gui && npm install

RUN echo "NPM Linking -----------------------------------------"
RUN cd /MartyBlocks/marty-blocks-lib && npm link && \
    cd /MartyBlocks/scratch-blocks && npm link && npm link marty-blocks-lib && \
    cd /MartyBlocks/scratch-vm && npm link && npm link marty-blocks-lib scratch-blocks && \
    cd /MartyBlocks/scratch-gui && npm link marty-blocks-lib scratch-blocks scratch-vm

RUN echo "Copy replacements over the scratch-blocks -----------------------------------------"
RUN cp -r /MartyBlocks/marty-blocks-lib/replacements/* /MartyBlocks/

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
