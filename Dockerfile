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
RUN ls /MartyBlocks/scripts
RUN /MartyBlocks/scripts/install-marty-blocks-lib.sh

RUN echo "Cloning stratch -----------------------------------------"
RUN /MartyBlocks/scripts/clone-scratch.sh

RUN echo "Checkout specific scratch commits -----------------------------------------"
RUN /MartyBlocks/scripts/checkout-scratch.sh

RUN echo "Perform npm install on scratch -----------------------------------------"
RUN /MartyBlocks/scripts/npm-install-scratch.sh

RUN echo "NPM Linking -----------------------------------------"
RUN /MartyBlocks/scripts/npm-link-all.sh

RUN echo "Build Scratch blocks -----------------------------------------"
RUN /MartyBlocks/scripts/build-martyblocks.sh

WORKDIR /MartyBlocks/scratch-gui
EXPOSE 8601
# Comment or uncomment the following line depending on whether you want the container
# to continue running after the build (serving MartyBlocks on localhost:8601) or not.
# If you choose not to run the container after the build, you can obtain the files in 
# the container by running the following command on the host's command line:
# docker cp <container_id>:/MartyBlocks/scratch-gui/build/ ./build
CMD ["npm","start"]
