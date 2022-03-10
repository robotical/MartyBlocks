'use strict';

goog.provide('Blockly.Blocks.mv2');
goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

// Define blocks in marty-blocks-lib
console.log("Setting up Blockly MartyBlocks");
const martyblockslib = require('marty-blocks-lib');
martyblockslib.MartyBlocks_BlockLib_AddBlocks(Blockly);
