# MartyBlocks by Robotical

MartyBlocks is basically scratch as developed by MIT but with additional blocks and connection to Marty the Robot developed by Robotical.

## Build

Build is done using docker:

- clone the repo and cd into the new folder
- docker-compose up

This should build the repo so check for success messages

## Publish to npm

Follow these steps:

- chmod +x ./scripts/extract-dist-files.sh
- ./scripts/extract-dist-files.sh
- --- check that the folder ./dist has been created - it should contain the build from scratch-gui

Assuming the above worked publish to npm with:

- npm publish

May be prompeted to npm adduser in which case follow the instructions and any 2FA requirements

