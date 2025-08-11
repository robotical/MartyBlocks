/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Colour blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.colour');

goog.require('Blockly.Blocks');

goog.require('Blockly.constants');

/**
 * Pick a random colour.
 * @return {string} #RRGGBB for random colour.
 */
function randomColour() {
  const COLOURS = ["#ff0000", "#00ff00", "#0000ff", "#00cbff"];
  const colourIdx = Math.floor(Math.random() * COLOURS.length);
  return COLOURS[colourIdx];
  // var num = Math.floor(Math.random() * Math.pow(2, 24));
  // return '#' + ('00000' + num.toString(16)).substr(-6);
}

Blockly.Blocks['colour_picker'] = {
  /**
   * Block for colour picker.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_colour_slider",
          "name": "COLOUR",
          "colour": randomColour()
        }
      ],
      "outputShape": Blockly.OUTPUT_SHAPE_ROUND,
      "output": "Colour"
    });
  }
};

Blockly.Blocks['colour_picker_LED_eyes'] = {
  /**
   * Block for colour picker LED eyes.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_colour_picker_LED_eyes",
          "name": "COLOUR",
          "colour": "#00cbff"
        }
      ],
      "outputShape": Blockly.OUTPUT_SHAPE_ROUND,
      "output": "String"
    });
  },
  
  // === Persist LED colours into the block's XML ===
  mutationToDom: function () {
    const container = document.createElement('mutation');
    const field = this.getField('COLOUR');

    if (field && field.eyeMatrix) {
      // Use a helper that works even when editor is closed (added in step 2)
      const cols =
        (typeof field.eyeMatrix.getLEDColoursSafe === 'function')
          ? field.eyeMatrix.getLEDColoursSafe()
          : (field.eyeMatrix.ledColours || []);

      if (cols && cols.length) {
        container.setAttribute('led_colours', JSON.stringify(cols));
      }
    }
    return container;
  },

  // === Restore LED colours from XML into the field ===
  domToMutation: function (xmlElement) {
    const json = xmlElement.getAttribute('led_colours');
    if (!json) return;

    try {
      const cols = JSON.parse(json);
      const field = this.getField('COLOUR');
      if (field && field.eyeMatrix) {
        const eye = field.eyeMatrix;

        // Persist for later openings of the editor
        eye.ledColours = cols.slice();

        // Sync binary selection state so thumbnails highlight correctly
        const clear = eye.clearColour || '#9966FF';
        eye.matrix_ = cols.map(c => c === clear ? '0' : '1').join('');

        // Update the little thumbnail on the block (safe if editor is closed)
        if (typeof eye.updateMatrix_ === 'function') {
          eye.updateMatrix_();
        }

        // (Optional) refresh the small colour button preview
        if (typeof field.updateColourBtn === 'function') {
          field.updateColourBtn(field.getValue());
        }
      }
    } catch (e) {
      console.warn('Failed to parse led_colours mutation:', e);
    }
  }
};

