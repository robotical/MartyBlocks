#### How to add a new block
###### Relevant files: `marty-blocks-lib/src/Scratch3Mv2Blocks.js`, `marty-blocks-lib/src/MartyBlocksToolbox.js`, `marty-blocks-lib/replacements/scratch-blocks/blocks_vertical/mv2.js`, `marty-blocks-lib/replacements/scratch-blocks/msg/messages.js`, `marty-blocks-lib/replacements/scratch-blocks/msg/scratch_msgs.js`

Step 1: in `marty-blocks-lib/src/Scratch3Mv2Blocks.js`, define a function that'll be executed when the block is pressed
Step 2: in `marty-blocks-lib/src/MartyBlocksToolbox.js`, add the block to the UI  (the type of the HTML element must be the name of the (bound) function defined in step 1)
Step 3: in `marty-blocks-lib/replacements/scratch-blocks/blocks_vertical/mv2.js`, add the blockly block definition
Step 4: in `marty-blocks-lib/replacements/scratch-blocks/msg/messages.js`, add the name of the block to the list of blocks that need to be translated
Step 5: in `marty-blocks-lib/replacements/scratch-blocks/msg/scratch_msgs.js`, add the translation of the block