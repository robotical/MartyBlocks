cd MartyBlocks/marty-blocks-lib && npm link && cd ../.. && \
cd MartyBlocks/scratch-blocks && npm link && npm link marty-blocks-lib && cd ../.. && \
cd MartyBlocks/scratch-vm && npm link && npm link marty-blocks-lib scratch-blocks && cd ../.. && \
cd MartyBlocks/scratch-gui && npm link marty-blocks-lib scratch-blocks scratch-vm && cd ../..

