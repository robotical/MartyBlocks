/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2017 Google Inc.
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
 * @fileoverview Extensions for vertical blocks in scratch-blocks.
 * The following extensions can be used to describe a block in Scratch terms.
 * For instance, a block in the operators colour scheme with a number output
 * would have the "colours_operators" and "output_number" extensions.
 * @author fenichel@google.com (Rachel Fenichel)
 */
"use strict";

goog.provide("Blockly.ScratchBlocks.VerticalExtensions");

goog.require("Blockly.Colours");
goog.require("Blockly.constants");

/**
 * Helper function that generates an extension based on a category name.
 * The generated function will set primary, secondary, and tertiary colours
 * based on the category name.
 * @param {String} category The name of the category to set colours for.
 * @return {function} An extension function that sets colours based on the given
 *     category.
 */
Blockly.ScratchBlocks.VerticalExtensions.colourHelper = function (category) {
  var colours = Blockly.Colours[category];
  if (!(colours && colours.primary && colours.secondary && colours.tertiary)) {
    throw new Error('Could not find colours for category "' + category + '"');
  }
  /**
   * Set the primary, secondary, and tertiary colours on this block for the
   * given category.
   * @this {Blockly.Block}
   */
  return function () {
    this.setColourFromRawValues_(
      colours.primary,
      colours.secondary,
      colours.tertiary
    );
  };
};

/**
 * Extension to set the colours of a text field, which are all the same.
 */
Blockly.ScratchBlocks.VerticalExtensions.COLOUR_TEXTFIELD = function () {
  this.setColourFromRawValues_(
    Blockly.Colours.textField,
    Blockly.Colours.textField,
    Blockly.Colours.textField
  );
};

/**
 * Extension to make a block fit into a stack of statements, regardless of its
 * inputs.  That means the block should have a previous connection and a next
 * connection and have inline inputs.
 * @this {Blockly.Block}
 * @readonly
 */
Blockly.ScratchBlocks.VerticalExtensions.SHAPE_STATEMENT = function () {
  this.setInputsInline(true);
  this.setPreviousStatement(true, null);
  this.setNextStatement(true, null);
};

/**
 * Extension to make a block be shaped as a hat block, regardless of its
 * inputs.  That means the block should have a next connection and have inline
 * inputs, but have no previous connection.
 * @this {Blockly.Block}
 * @readonly
 */
Blockly.ScratchBlocks.VerticalExtensions.SHAPE_HAT = function () {
  this.setInputsInline(true);
  this.setNextStatement(true, null);
};

/**
 * Extension to make a block be shaped as an end block, regardless of its
 * inputs.  That means the block should have a previous connection and have
 * inline inputs, but have no next connection.
 * @this {Blockly.Block}
 * @readonly
 */
Blockly.ScratchBlocks.VerticalExtensions.SHAPE_END = function () {
  this.setInputsInline(true);
  this.setPreviousStatement(true, null);
};

/**
 * Extension to make represent a number reporter in Scratch-Blocks.
 * That means the block has inline inputs, a round output shape, and a 'Number'
 * output type.
 * @this {Blockly.Block}
 * @readonly
 */
Blockly.ScratchBlocks.VerticalExtensions.OUTPUT_NUMBER = function () {
  this.setInputsInline(true);
  this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
  this.setOutput(true, "Number");
};

/**
 * Extension to make represent a string reporter in Scratch-Blocks.
 * That means the block has inline inputs, a round output shape, and a 'String'
 * output type.
 * @this {Blockly.Block}
 * @readonly
 */
Blockly.ScratchBlocks.VerticalExtensions.OUTPUT_STRING = function () {
  this.setInputsInline(true);
  this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
  this.setOutput(true, "String");
};

/**
 * Extension to make represent a boolean reporter in Scratch-Blocks.
 * That means the block has inline inputs, a round output shape, and a 'Boolean'
 * output type.
 * @this {Blockly.Block}
 * @readonly
 */
Blockly.ScratchBlocks.VerticalExtensions.OUTPUT_BOOLEAN = function () {
  this.setInputsInline(true);
  this.setOutputShape(Blockly.OUTPUT_SHAPE_HEXAGONAL);
  this.setOutput(true, "Boolean");
};

/**
 * Mixin to add a context menu for a procedure definition block.
 * It adds the "edit" option and removes the "duplicate" option.
 * @mixin
 * @augments Blockly.Block
 * @package
 * @readonly
 */
Blockly.ScratchBlocks.VerticalExtensions.PROCEDURE_DEF_CONTEXTMENU = {
  /**
   * Add the "edit" option and removes the "duplicate" option from the context
   * menu.
   * @param {!Array.<!Object>} menuOptions List of menu options to edit.
   * @this Blockly.Block
   */
  customContextMenu: function (menuOptions) {
    // Add the edit option at the end.
    menuOptions.push(Blockly.Procedures.makeEditOption(this));

    // Find the delete option and update its callback to be specific to
    // functions.
    for (var i = 0, option; (option = menuOptions[i]); i++) {
      if (option.text == Blockly.Msg.DELETE_BLOCK) {
        var input = this.getInput("custom_block");
        // this is the root block, not the shadow block.
        if (input && input.connection && input.connection.targetBlock()) {
          var procCode = input.connection.targetBlock().getProcCode();
        } else {
          return;
        }
        var rootBlock = this;
        option.callback = function () {
          var didDelete = Blockly.Procedures.deleteProcedureDefCallback(
            procCode,
            rootBlock
          );
          if (!didDelete) {
            alert(Blockly.Msg.PROCEDURE_USED);
          }
        };
      }
    }
    // Find and remove the duplicate option
    for (var i = 0, option; (option = menuOptions[i]); i++) {
      if (option.text == Blockly.Msg.DUPLICATE) {
        menuOptions.splice(i, 1);
        break;
      }
    }
  },
};

/**
 * Mixin to add a context menu for a procedure call block.
 * It adds the "edit" option and the "define" option.
 * @mixin
 * @augments Blockly.Block
 * @package
 * @readonly
 */
Blockly.ScratchBlocks.VerticalExtensions.PROCEDURE_CALL_CONTEXTMENU = {
  /**
   * Add the "edit" option to the context menu.
   * @todo Add "go to definition" option once implemented.
   * @param {!Array.<!Object>} menuOptions List of menu options to edit.
   * @this Blockly.Block
   */
  customContextMenu: function (menuOptions) {
    menuOptions.push(Blockly.Procedures.makeEditOption(this));
  },
};

Blockly.ScratchBlocks.VerticalExtensions.SCRATCH_EXTENSION = function () {
  this.isScratchExtension = true;
};
/**
 * Register all extensions for scratch-blocks.
 * @package
 */
Blockly.ScratchBlocks.VerticalExtensions.registerAll = function () {
  var categoryNames = [
    "control",
    "data",
    "data_lists",
    "sounds",
    "motion",
    "looks",
    "event",
    "sensing",
    "pen",
    "operators",
    "more",
    "mv2",
  ];
  // Register functions for all category colours.
  for (var i = 0; i < categoryNames.length; i++) {
    var name = categoryNames[i];
    Blockly.Extensions.register(
      "colours_" + name,
      Blockly.ScratchBlocks.VerticalExtensions.colourHelper(name)
    );
  }

  // Text fields transcend categories.
  Blockly.Extensions.register(
    "colours_textfield",
    Blockly.ScratchBlocks.VerticalExtensions.COLOUR_TEXTFIELD
  );

  // Register extensions for common block shapes.
  Blockly.Extensions.register(
    "shape_statement",
    Blockly.ScratchBlocks.VerticalExtensions.SHAPE_STATEMENT
  );
  Blockly.Extensions.register(
    "shape_hat",
    Blockly.ScratchBlocks.VerticalExtensions.SHAPE_HAT
  );
  Blockly.Extensions.register(
    "shape_end",
    Blockly.ScratchBlocks.VerticalExtensions.SHAPE_END
  );

  // Output shapes and types are related.
  Blockly.Extensions.register(
    "output_number",
    Blockly.ScratchBlocks.VerticalExtensions.OUTPUT_NUMBER
  );
  Blockly.Extensions.register(
    "output_string",
    Blockly.ScratchBlocks.VerticalExtensions.OUTPUT_STRING
  );
  Blockly.Extensions.register(
    "output_boolean",
    Blockly.ScratchBlocks.VerticalExtensions.OUTPUT_BOOLEAN
  );

  // Custom procedures have interesting context menus.
  Blockly.Extensions.registerMixin(
    "procedure_def_contextmenu",
    Blockly.ScratchBlocks.VerticalExtensions.PROCEDURE_DEF_CONTEXTMENU
  );
  Blockly.Extensions.registerMixin(
    "procedure_call_contextmenu",
    Blockly.ScratchBlocks.VerticalExtensions.PROCEDURE_CALL_CONTEXTMENU
  );

  // Extension blocks have slightly different block rendering.
  Blockly.Extensions.register(
    "scratch_extension",
    Blockly.ScratchBlocks.VerticalExtensions.SCRATCH_EXTENSION
  );
};

Blockly.Extensions.register(
  "dynamic_menu_servo_current_extension",
  function () {
    this.getInput("SERVOCHOICE").appendField(
      new Blockly.FieldDropdown(function () {
        var options = [
          ["Select an option", "Select an option"],
          ["No sensor found", "No sensor found"],
        ];
        if (!mv2Interface.isConnected) return options;
        const servoObj = JSON.parse(mv2Interface.servos);
        if (!servoObj || !servoObj.hasOwnProperty("smartServos"))
          return options;
        const servoIds = Object.keys(servoObj.smartServos);
        return servoIds.map((servoId) => {
          const servoIdStr = servoId + "";
          if (servoIdStr === "0")
            return [Blockly.Msg.DROPDOWN_OPTION_LEFTHIP, servoIdStr];
          if (servoIdStr === "1")
            return [Blockly.Msg.DROPDOWN_OPTION_LEFTTWIST, servoIdStr];
          if (servoIdStr === "2")
            return [Blockly.Msg.DROPDOWN_OPTION_LEFTKNEE, servoIdStr];
          if (servoIdStr === "3")
            return [Blockly.Msg.DROPDOWN_OPTION_RIGHTHIP, servoIdStr];
          if (servoIdStr === "4")
            return [Blockly.Msg.DROPDOWN_OPTION_RIGHTTWIST, servoIdStr];
          if (servoIdStr === "5")
            return [Blockly.Msg.DROPDOWN_OPTION_RIGHTKNEE, servoIdStr];
          if (servoIdStr === "6")
            return [Blockly.Msg.DROPDOWN_OPTION_LEFTARM, servoIdStr];
          if (servoIdStr === "7")
            return [Blockly.Msg.DROPDOWN_OPTION_RIGHTARM, servoIdStr];
          if (servoIdStr === "8")
            return [Blockly.Msg.DROPDOWN_OPTION_EYES, servoIdStr];
          return [["Unknown servo", "n/a"]];
        });
      }),
      "SERVOCHOICE"
    );
  }
);

Blockly.Extensions.register(
  "dynamic_menu_servo_position_extension",
  function () {
    this.getInput("SERVOCHOICE").appendField(
      new Blockly.FieldDropdown(function () {
        var options = [
          ["Select an option", "Select an option"],
          ["No sensor found", "No sensor found"],
        ];
        if (!mv2Interface.isConnected) return options;
        const servoObj = JSON.parse(mv2Interface.servos);
        if (!servoObj || !servoObj.hasOwnProperty("smartServos"))
          return options;
        const servoIds = Object.keys(servoObj.smartServos);
        return servoIds.map((servoId) => {
          const servoIdStr = servoId + "";
          if (servoIdStr === "0")
            return [Blockly.Msg.DROPDOWN_OPTION_LEFTHIP, servoIdStr];
          if (servoIdStr === "1")
            return [Blockly.Msg.DROPDOWN_OPTION_LEFTTWIST, servoIdStr];
          if (servoIdStr === "2")
            return [Blockly.Msg.DROPDOWN_OPTION_LEFTKNEE, servoIdStr];
          if (servoIdStr === "3")
            return [Blockly.Msg.DROPDOWN_OPTION_RIGHTHIP, servoIdStr];
          if (servoIdStr === "4")
            return [Blockly.Msg.DROPDOWN_OPTION_RIGHTTWIST, servoIdStr];
          if (servoIdStr === "5")
            return [Blockly.Msg.DROPDOWN_OPTION_RIGHTKNEE, servoIdStr];
          if (servoIdStr === "6")
            return [Blockly.Msg.DROPDOWN_OPTION_LEFTARM, servoIdStr];
          if (servoIdStr === "7")
            return [Blockly.Msg.DROPDOWN_OPTION_RIGHTARM, servoIdStr];
          if (servoIdStr === "8")
            return [Blockly.Msg.DROPDOWN_OPTION_EYES, servoIdStr];
          return [["Unknown servo", "n/a"]];
        });
      }),
      "SERVOCHOICE"
    );
  }
);

Blockly.Extensions.register("dynamic_menu_sensor_IRF_extension", function () {
  const RIC_WHOAMI_TYPE_CODE_ADDON_IRFOOT = "IRFoot";
  const RIC_WHOAMI_TYPE_CODE_ADDON_COLOUR = "coloursensor";
  this.getInput("SENSORCHOICE").appendField(
    new Blockly.FieldDropdown(function () {
      var defaultOptions = [
        ["Select an option", "Select an option"],
        ["No sensor found", "No sensor found"],
      ];
      if (!mv2Interface.isConnected || !mv2Interface.addons)
        return defaultOptions;
      const addons = JSON.parse(mv2Interface.addons).addons;
      if (!addons) return defaultOptions;
      const addonOptions = [];
      for (const addon of addons) {
        if (
          addon.whoAmI == RIC_WHOAMI_TYPE_CODE_ADDON_IRFOOT ||
          addon.whoAmI == RIC_WHOAMI_TYPE_CODE_ADDON_COLOUR
        ) {
          addonOptions.push([addon.name, addon.name]);
        }
      }
      return addonOptions.length ? addonOptions : defaultOptions;
    }),
    "SENSORCHOICE"
  );
});

Blockly.Extensions.register(
  "dynamic_menu_sensor_colour_extension",
  function () {
    const RIC_WHOAMI_TYPE_CODE_ADDON_COLOUR = "coloursensor";
    this.getInput("SENSORCHOICE").appendField(
      new Blockly.FieldDropdown(function () {
        var defaultOptions = [
          ["Select an option", "Select an option"],
          ["No sensor found", "No sensor found"],
        ];
        if (!mv2Interface.isConnected || !mv2Interface.addons)
          return defaultOptions;
        const addons = JSON.parse(mv2Interface.addons).addons;
        if (!addons) return defaultOptions;
        const addonOptions = [];
        for (const addon of addons) {
          if (addon.whoAmI == RIC_WHOAMI_TYPE_CODE_ADDON_COLOUR) {
            addonOptions.push([addon.name, addon.name]);
          }
        }
        return addonOptions.length ? addonOptions : defaultOptions;
      }),
      "SENSORCHOICE"
    );
  }
);

Blockly.Extensions.register("dynamic_menu_sensor_light_extension", function () {
  const RIC_WHOAMI_TYPE_CODE_ADDON_LIGHT = "lightsensor";
  this.getInput("SENSORCHOICE").appendField(
    new Blockly.FieldDropdown(function () {
      var defaultOptions = [
        ["Select an option", "Select an option"],
        ["No sensor found", "No sensor found"],
      ];
      if (!mv2Interface.isConnected || !mv2Interface.addons)
        return defaultOptions;
      const addons = JSON.parse(mv2Interface.addons).addons;
      if (!addons) return defaultOptions;
      const addonOptions = [];
      for (const addon of addons) {
        if (addon.whoAmI == RIC_WHOAMI_TYPE_CODE_ADDON_LIGHT) {
          addonOptions.push([addon.name, addon.name]);
        }
      }
      return addonOptions.length ? addonOptions : defaultOptions;
    }),
    "SENSORCHOICE"
  );
});

Blockly.Extensions.register("dynamic_menu_sensor_noise_extension", function () {
  const RIC_WHOAMI_TYPE_CODE_ADDON_NOISE = "noisesensor";
  this.getInput("SENSORCHOICE").appendField(
    new Blockly.FieldDropdown(function () {
      var defaultOptions = [
        ["Select an option", "Select an option"],
        ["No sensor found", "No sensor found"],
      ];
      if (!mv2Interface.isConnected || !mv2Interface.addons)
        return defaultOptions;
      const addons = JSON.parse(mv2Interface.addons).addons;
      if (!addons) return defaultOptions;
      const addonOptions = [];
      for (const addon of addons) {
        if (addon.whoAmI == RIC_WHOAMI_TYPE_CODE_ADDON_NOISE) {
          addonOptions.push([addon.name, addon.name]);
        }
      }
      return addonOptions.length ? addonOptions : defaultOptions;
    }),
    "SENSORCHOICE"
  );
});
Blockly.Extensions.register(
  "dynamic_menu_disco_options_extension",
  function () {
    const RIC_WHOAMI_TYPE_CODE_ADDON_LEDFOOT = "LEDfoot";
    const RIC_WHOAMI_TYPE_CODE_ADDON_LEDARM = "LEDarm";
    const RIC_WHOAMI_TYPE_CODE_ADDON_LEDEYE = "LEDeye";
    this.getInput("BOARDTYPE").appendField(
      new Blockly.FieldDropdown(function () {
        var defaultOptions = [
          ["Select an option", "Select an option"],
          ["No LED addons found", "No LED addons found"],
        ];
        if (!mv2Interface.isConnected || !mv2Interface.addons)
          return defaultOptions;
        const addons = JSON.parse(mv2Interface.addons).addons;
        if (!addons) return defaultOptions;
        const addonOptions = [];
        let armsOptionAdded = false;
        let eyesOptionAdded = false;
        let feetOptionAdded = false;
        for (const addon of addons) {
          if (addon.whoAmI == RIC_WHOAMI_TYPE_CODE_ADDON_LEDFOOT) {
            if (!feetOptionAdded) {
              addonOptions.push([
                Blockly.Msg.DROPDOWN_OPTION_BOTH_FEET,
                JSON.stringify({
                  whoAmI: RIC_WHOAMI_TYPE_CODE_ADDON_LEDFOOT,
                  name: RIC_WHOAMI_TYPE_CODE_ADDON_LEDFOOT,
                }),
              ]);
              feetOptionAdded = true;
            }
            addonOptions.push([
              addon.name,
              JSON.stringify({
                name: addon.name,
                whoAmI: RIC_WHOAMI_TYPE_CODE_ADDON_LEDFOOT,
              }),
            ]);
          }
          if (addon.whoAmI == RIC_WHOAMI_TYPE_CODE_ADDON_LEDEYE) {
            if (!eyesOptionAdded) {
              addonOptions.push([
                Blockly.Msg.DROPDOWN_OPTION_BOTH_EYES,
                JSON.stringify({
                  whoAmI: RIC_WHOAMI_TYPE_CODE_ADDON_LEDEYE,
                  name: RIC_WHOAMI_TYPE_CODE_ADDON_LEDEYE,
                }),
              ]);
              eyesOptionAdded = true;
            }
            addonOptions.push([
              addon.name,
              JSON.stringify({
                name: addon.name,
                whoAmI: RIC_WHOAMI_TYPE_CODE_ADDON_LEDEYE,
              }),
            ]);
          }
          if (addon.whoAmI == RIC_WHOAMI_TYPE_CODE_ADDON_LEDARM) {
            if (!armsOptionAdded) {
              addonOptions.push([
                Blockly.Msg.DROPDOWN_OPTION_BOTH_ARMS,
                JSON.stringify({
                  whoAmI: RIC_WHOAMI_TYPE_CODE_ADDON_LEDARM,
                  name: RIC_WHOAMI_TYPE_CODE_ADDON_LEDARM,
                }),
              ]);
              armsOptionAdded = true;
            }
            addonOptions.push([
              addon.name,
              JSON.stringify({
                name: addon.name,
                whoAmI: RIC_WHOAMI_TYPE_CODE_ADDON_LEDARM,
              }),
            ]);
          }
        }
        return addonOptions.length ? addonOptions : defaultOptions;
      }),
      "BOARDTYPE"
    );
  }
);
Blockly.Extensions.register(
  "dynamic_menu_LED_eyes_side_extension",
  function () {
    const RIC_WHOAMI_TYPE_CODE_ADDON_LEDEYE = "LEDeye";
    const RIC_WHOAMI_TYPE_CODE_ADDON_LEFTLEDEYE = "LeftLEDeye";
    const RIC_WHOAMI_TYPE_CODE_ADDON_RIGHTLEDEYE = "RightLEDeye";
    this.getInput("SIDE").appendField(
      new Blockly.FieldDropdown(function () {
        var defaultOptions = [
          ["Select an option", "Select an option"],
          ["No LED eyes found", "No LED eyes found"],
        ];
        if (!mv2Interface.isConnected || !mv2Interface.addons)
          return defaultOptions;
        const addons = JSON.parse(mv2Interface.addons).addons;
        if (!addons) return defaultOptions;
        const addonOptions = [];
        let bothOptionAdded = false;
        for (const addon of addons) {
          if (
            addon.whoAmI == RIC_WHOAMI_TYPE_CODE_ADDON_LEDEYE ||
            addon.whoAmI == RIC_WHOAMI_TYPE_CODE_ADDON_LEFTLEDEYE ||
            addon.whoAmI == RIC_WHOAMI_TYPE_CODE_ADDON_RIGHTLEDEYE
          ) {
            if (!bothOptionAdded) {
              addonOptions.push([
                Blockly.Msg.MV2_LEDEYESBOTH,
                RIC_WHOAMI_TYPE_CODE_ADDON_LEDEYE,
              ]);
              bothOptionAdded = true;
            }
            addonOptions.push([addon.name, addon.name]);
          }
        }
        return addonOptions.length ? addonOptions : defaultOptions;
      }),
      "SIDE"
    );
  }
);

Blockly.ScratchBlocks.VerticalExtensions.registerAll();
