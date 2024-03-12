### How to add a new block
###### Relevant files: 
- `marty-blocks-lib/src/Scratch3Mv2Blocks.js` 
- `marty-blocks-lib/src/MartyBlocksToolbox.js` 
- `marty-blocks-lib/replacements/scratch-blocks/blocks_vertical/mv2.js` 
- `marty-blocks-lib/replacements/scratch-blocks/msg/messages.js` 
- `marty-blocks-lib/replacements/scratch-blocks/msg/scratch_msgs.js`

Step 1: in `marty-blocks-lib/src/Scratch3Mv2Blocks.js`, define a function that'll be executed when the block is pressed
Step 2: in `marty-blocks-lib/src/MartyBlocksToolbox.js`, add the block to the UI  (the type of the HTML element must be the name of the (bound) function defined in step 1)
Step 3: in `marty-blocks-lib/replacements/scratch-blocks/blocks_vertical/mv2.js`, add the blockly block definition
Step 4: in `marty-blocks-lib/replacements/scratch-blocks/msg/messages.js`, add the name of the block to the list of blocks that need to be translated
Step 5: in `marty-blocks-lib/replacements/scratch-blocks/msg/scratch_msgs.js`, add the translation of the block

### How to add translations
###### Relevant files:  
- `marty-blocks-lib/replacements/scratch-blocks/msg/messages.js` 
- `marty-blocks-lib/replacements/scratch-blocks/msg/scratch_msgs.js`
- `marty-blocks-lib/replacements/scratch-gui/src/components/menu-bar/language-menu.jsx`
- `marty-blocks-lib/replacements/scratch-vm/src/extensions/marty_martymachine/index.js`

Step 1: if this is a new language, go to the `language-menu.jsx` file and add its ISO to the list of languages to include.
Step 2: if there are new blocks, add their english version in `messages.js` 
Step 2: go to `scratch_msgs.js`, look for the language ISO code and add the translations for the new blocks
Step 3: go to `marty_martymachine/index.js` and add the translations for the new blocks there as well

### How to add a new modal
##### RELEVANT FILES: 
- `scratch-gui/src/reducers/modals.js`
- `scratch-gui/src/components/gui/gui.jsx`

1. Add a new modal to the modals reducer in `scratch-gui/src/reducers/modals.js`
1.1 Modal name
1.2 Initial state to false
1.3 Open/Close function
1.4 Export Open/Close functions

2. Create Modal Component in `scratch-gui/src/components/`
Comment: needs updating



### How to add a new Draggable modal

1. Create a new component in `scratch-gui/src/components/` that will be the CTA for the draggable modal (e.g., a button)
2. Create the question mark icon of the CTA in (optional -- can use an inline function as well). This is the children of the CTA component.
3. Create a new component in `scratch-gui/src/components/` that will be the content of the draggable modal (optional -- can use an inline function as well)
4. Call this component from the parent-component