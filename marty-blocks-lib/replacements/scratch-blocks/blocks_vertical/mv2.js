"use strict";

goog.provide("Blockly.Blocks.mv2");
goog.require("Blockly.Blocks");
goog.require("Blockly.Colours");
goog.require("Blockly.constants");
goog.require("Blockly.ScratchBlocks.VerticalExtensions");

// Define blocks in marty-blocks-lib
console.log("Setting up Blockly MartyBlocks");
// var martyblockslib = require('marty-blocks-lib');

Blockly.Blocks["mv2_getReady"] = {
  /**
   * Block to make Marty freeze
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_GETREADY,
      category: Blockly.Categories.control,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
      ],
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["mv2_walk_fw"] = {
  /**
   * Block to make Marty walk forwards
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_WALK_FW,
      category: Blockly.Categories.motion,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "input_value",
          name: "STEPS",
        },
      ],
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["mv2_walk_bw"] = {
  /**
   * Block to make Marty walk backwards
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_WALK_BW,
      category: Blockly.Categories.motion,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "input_value",
          name: "STEPS",
        },
      ],
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["mv2_walk"] = {
  /**
   * Block to make Marty walk
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_WALK,
      category: Blockly.Categories.motion,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "input_value",
          name: "STEPS",
        },
        {
          type: "input_value",
          name: "STEPLEN",
        },
        {
          type: "input_value",
          name: "MOVETIME",
        },
        {
          type: "input_value",
          name: "TURN",
        },
      ],
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["mv2_turn"] = {
  /**
   * Block to make Marty walk
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_TURN,
      category: Blockly.Categories.motion,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "input_value",
          name: "STEPS",
        },
        {
          type: "field_dropdown",
          name: "SIDE",
          options: [
            [Blockly.Msg.DROPDOWN_OPTION_LEFT, "0"],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHT, "1"],
          ],
        },
      ],
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["mv2_wiggle"] = {
  /**
   * Block to make Marty wiggle
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_WIGGLE,
      category: Blockly.Categories.motion,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
      ],
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["mv2_circle"] = {
  /**
   * Block to make Marty move in a circle
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_CIRCLE,
      category: Blockly.Categories.motion,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "field_dropdown",
          name: "SIDE",
          options: [
            [Blockly.Msg.DROPDOWN_OPTION_LEFT, "0"],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHT, "1"],
          ],
        },
        {
          type: "input_value",
          name: "MOVETIME",
        },
      ],
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["mv2_kick"] = {
  /**
   * Block to make Marty kick
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_KICK,
      category: Blockly.Categories.motion,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "field_dropdown",
          name: "SIDE",
          options: [
            [Blockly.Msg.DROPDOWN_OPTION_LEFT, "0"],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHT, "1"],
          ],
        },
        /*{
          "type": "input_value",      // proposed optional parameter
          "name": "TURN"
        }*/
      ],
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["mv2_slide"] = {
  /**
   * Block to make Marty slide
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_SLIDE,
      category: Blockly.Categories.motion,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "input_value",
          name: "STEPS",
        },
        {
          type: "field_dropdown",
          name: "SIDE",
          options: [
            [Blockly.Msg.DROPDOWN_OPTION_LEFT, "0"],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHT, "1"],
          ],
        },
      ],
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["mv2_slideMsLength"] = {
  /**
   * Block to make Marty slide with a specific length of time and step length
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_SLIDE_MS_LENGTH,
      category: Blockly.Categories.motion,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "input_value",
          name: "STEPS",
        },
        {
          type: "field_dropdown",
          name: "SIDE",
          options: [
            [Blockly.Msg.DROPDOWN_OPTION_LEFT, "0"],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHT, "1"],
          ],
        },
        {
          type: "input_value",
          name: "MOVETIME",
        },
        {
          type: "input_value",
          name: "STEPLEN",
        },
      ],
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["mv2_lean"] = {
  /**
   * Block to make Marty lean
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_LEAN,
      category: Blockly.Categories.motion,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "field_dropdown",
          name: "SIDE",
          options: [
            [Blockly.Msg.DROPDOWN_OPTION_LEFT, "0"],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHT, "1"],
            [Blockly.Msg.DROPDOWN_OPTION_FORWARD, "2"],
            [Blockly.Msg.DROPDOWN_OPTION_BACKWARD, "3"],
          ],
        },
        {
          type: "input_value",
          name: "MOVETIME",
        },
      ],
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["mv2_eyes"] = {
  /**
   * Block to make Marty's eyes emote
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_EYES,
      category: Blockly.Categories.motion,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "field_dropdown",
          name: "COMMAND",
          options: [
            [Blockly.Msg.DROPDOWN_OPTION_EXCITED, "eyesExcited"],
            [Blockly.Msg.DROPDOWN_OPTION_WIDE, "eyesWide"],
            [Blockly.Msg.DROPDOWN_OPTION_ANGRY, "eyesAngry"],
            [Blockly.Msg.DROPDOWN_OPTION_NORMAL, "eyesNormal"],
            [Blockly.Msg.DROPDOWN_OPTION_WIGGLE, "wiggleEyes"],
          ],
        },
      ],
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["mv2_moveLeg"] = {
  /**
   * Block to make Marty's legs move
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_MOVELEG,
      category: Blockly.Categories.motion,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "field_dropdown",
          name: "SIDE",
          options: [
            [Blockly.Msg.DROPDOWN_OPTION_LEFT, "0"],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHT, "3"],
          ],
        },
        {
          type: "field_dropdown",
          name: "DIRECTION",
          options: [
            [Blockly.Msg.DROPDOWN_OPTION_FORWARD, "-20"],
            [Blockly.Msg.DROPDOWN_OPTION_BACKWARD, "20"],
          ],
        },
      ],
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["mv2_liftFoot"] = {
  /**
   * Block to make Marty lift his foot
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_LIFTFOOT,
      category: Blockly.Categories.motion,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "field_dropdown",
          name: "SIDE",
          options: [
            [Blockly.Msg.DROPDOWN_OPTION_LEFT, "0"],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHT, "1"],
          ],
        },
      ],
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["mv2_lowerFoot"] = {
  /**
   * Block to make Marty lower his foot
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_LOWERFOOT,
      category: Blockly.Categories.motion,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "field_dropdown",
          name: "SIDE",
          options: [
            [Blockly.Msg.DROPDOWN_OPTION_LEFT, "0"],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHT, "1"],
          ],
        },
      ],
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["mv2_moveJoint"] = {
  /**
   * Block to make Marty move a specific joint
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_MOVEJOINT,
      category: Blockly.Categories.motion,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "field_dropdown",
          name: "SERVOCHOICE",
          options: [
            [Blockly.Msg.DROPDOWN_OPTION_LEFTHIP, "0"],
            [Blockly.Msg.DROPDOWN_OPTION_LEFTTWIST, "1"],
            [Blockly.Msg.DROPDOWN_OPTION_LEFTKNEE, "2"],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHTHIP, "3"],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHTTWIST, "4"],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHTKNEE, "5"],
            [Blockly.Msg.DROPDOWN_OPTION_LEFTARM, "6"],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHTARM, "7"],
            [Blockly.Msg.DROPDOWN_OPTION_EYES, "8"],
          ],
        },
        {
          type: "input_value",
          name: "ANGLE",
        },
        {
          type: "input_value",
          name: "MOVETIME",
        },
      ],
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["mv2_wave"] = {
  /**
   * Block to make Marty wave
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_WAVE,
      category: Blockly.Categories.motion,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "field_dropdown",
          name: "SIDE",
          options: [
            [Blockly.Msg.DROPDOWN_OPTION_LEFT, "0"],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHT, "1"],
          ],
        },
      ],
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["mv2_stop"] = {
  /**
   * Block to make Marty stop
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_STOP,
      category: Blockly.Categories.motion,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "field_dropdown",
          name: "STOP_TYPE",
          options: [
            [Blockly.Msg.DROPDOWN_OPTION_STOP_IMMEDIATELY, "stop"],
            [Blockly.Msg.DROPDOWN_OPTION_STOP_AFTER_MOVE, "stopAfterMove"],
          ],
        },
      ],
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["mv2_pause"] = {
  /**
   * Block to make Marty pause
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_PAUSE,
      category: Blockly.Categories.motion,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
      ],
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["mv2_resume"] = {
  /**
   * Block to make Marty resume
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_RESUME,
      category: Blockly.Categories.motion,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
      ],
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["mv2_dance"] = {
  /**
   * Block to make Marty perform a chosen dance
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_DANCE,
      category: Blockly.Categories.motion,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
      ],
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["mv2_standStraight"] = {
  /**
   * Block to make Marty stand up straight
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_STANDSTRAIGHT,
      category: Blockly.Categories.motion,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "input_value",
          name: "MOVETIME",
        },
      ],
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["mv2_hold"] = {
  /**
   * Block to make Marty hold his current position
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_HOLD,
      category: Blockly.Categories.motion,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "input_value",
          name: "MOVETIME",
        },
      ],
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["mv2_gripperArmBasic"] = {
  /**
   * Block to make Marty wave
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_GRIPPERARMBASIC,
      category: Blockly.Categories.motion,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "field_dropdown",
          name: "HAND_POSITION",
          options: [
            [Blockly.Msg.DROPDOWN_OPTION_OPEN, "0"],
            [Blockly.Msg.DROPDOWN_OPTION_CLOSE, "1"],
          ],
        },
      ],
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["mv2_gripperArmTimed"] = {
  /**
   * Block to make Marty wave
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_GRIPPERARMTIMED,
      category: Blockly.Categories.motion,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "field_dropdown",
          name: "HAND_POSITION",
          options: [
            [Blockly.Msg.DROPDOWN_OPTION_OPEN, "0"],
            [Blockly.Msg.DROPDOWN_OPTION_CLOSE, "1"],
          ],
        },
        {
          type: "input_value",
          name: "MOVETIME",
        },
      ],
      extensions: ["shape_statement"],
    });
  },
};

// LOOK

Blockly.Blocks["mv2_discoChangeBlockPattern"] = {
  /**
   * Block to make Marty freeze
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_DISCOCHANGEBLOCKPATTERN,
      category: Blockly.Categories.looks,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "input_dummy",
          name: "BOARDTYPE",
        },
        {
          type: "field_dropdown",
          name: "PATTERN",
          options: [
            [Blockly.Msg.DROPDOWN_OPTION_PATTERN_SHOWOFF, "show-off"],
            [Blockly.Msg.DROPDOWN_OPTION_PATTERN_PINWHEEL, "pinwheel"],
            [Blockly.Msg.DROPDOWN_OPTION_OFF, "off"],
          ],
        },
      ],
      extensions: ["shape_statement", "dynamic_menu_disco_options_extension"],
    });
  },
};

Blockly.Blocks["mv2_LEDEyesColour"] = {
  /**
   * DISCO MARTY BLOCK LED EYES
   * Block to change the colour of the led eyes,
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_CHANGELEDEYESBLOCK,
      category: Blockly.Categories.looks,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "input_dummy",
          name: "BOARDTYPE",
        },
        {
          type: "input_value",
          name: "COLOUR_LED_EYES",
        },
      ],
      extensions: ["shape_statement", "dynamic_menu_disco_options_extension"],
    });
  },
};
Blockly.Blocks["mv2_LEDEyesColour_SpecificLED"] = {
  /**
   * DISCO MARTY BLOCK LED EYES
   * Block to change the colour of the led eyes,
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_CHANGESPECIFICLEDEYESBLOCK,
      category: Blockly.Categories.looks,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "input_dummy",
          name: "BOARDTYPE",
        },
        {
          type: "input_value",
          name: "LED_POSITION",
        },
        {
          type: "input_value",
          name: "COLOUR_LED_EYES",
        },
      ],
      extensions: ["shape_statement", "dynamic_menu_disco_options_extension"],
    });
  },
};

Blockly.Blocks["mv2_LEDEyesColourLEDs"] = {
  /**
   * DISCO MARTY BLOCK LED EYES
   * Block to change the colour of the led eyes,
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_CHANGELEDSEYESBLOCK,
      category: Blockly.Categories.looks,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "input_dummy",
          name: "SIDE",
        },
        {
          type: "input_value",
          name: "COLOUR_LED_EYES",
        },
      ],
      extensions: ["shape_statement", "dynamic_menu_LED_eyes_side_extension"],
    });
  },
};

Blockly.Blocks["mv2_turnAllLEDsOff"] = {
  /**
   * Turn all LEDs off
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_TURNOFFALLLEDS,
      category: Blockly.Categories.looks,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
      ],
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["mv2_RGBOperator"] = {
  /**
   * Block for RGB operator.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_RGBOPERATOR,
      category: Blockly.Categories.looks,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "input_value",
          name: "NUM_R",
        },
        {
          type: "input_value",
          name: "NUM_G",
        },
        {
          type: "input_value",
          name: "NUM_B",
        },
      ],
      extensions: ["output_number"],
    });
  },
};
Blockly.Blocks["mv2_HSLOperator"] = {
  /**
   * Block for HSL operator.
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_HSLOPERATOR,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "input_value",
          name: "NUM_H",
        },
        {
          type: "input_value",
          name: "NUM_S",
        },
        {
          type: "input_value",
          name: "NUM_L",
        },
      ],
      category: Blockly.Categories.looks,
      extensions: ["output_number"],
    });
  },
};

Blockly.Blocks["mv2_discoChangeBackColour"] = {
  /**
   * DISCO MARTY BACK
   * Block to change the colour of the back LED
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_DISCOCHANGEBACKCOLOUR,
      category: Blockly.Categories.looks,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "input_value",
          name: "COLOR",
        },
      ],
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["mv2_discoSetBreatheBackColour"] = {
  /**
   * DISCO MARTY BACK
   * Block to change the colour of the back LED
   * and set it to breathe mode
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_DISCOSETBREATHEBACKCOLOUR,
      category: Blockly.Categories.looks,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "input_value",
          name: "COLOR",
        },
        {
          type: "input_value",
          name: "MILLISECONDS",
        },
      ],
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["mv2_discoTurnOffBackColour"] = {
  /**
   * DISCO MARTY BACK
   * Block to turn off the colour of the back LED
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_DISCOTURNOFFBACKCOLOUR,
      category: Blockly.Categories.looks,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
      ],
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["mv2_discoChangeRegionColour"] = {
  /**
   * DISCO MARTY BLOCK
   * Block to change the colour on a specified region
   * of both arms, both legs, both feet or all to a preset colour
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_DISCOCHANGEREGIONCOLOUR,
      category: Blockly.Categories.looks,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "field_dropdown",
          name: "REGION",
          options: [
            [Blockly.Msg.DROPDOWN_OPTION_ZERO, "0"],
            [Blockly.Msg.DROPDOWN_OPTION_ONE, "1"],
            [Blockly.Msg.DROPDOWN_OPTION_TWO, "2"],
          ],
        },
        {
          type: "input_dummy",
          name: "BOARDTYPE",
        },
        {
          type: "input_value",
          name: "COLOR",
        },
      ],
      extensions: ["shape_statement", "dynamic_menu_disco_options_extension"],
    });
  },
};

// SOUND
// This is for playing sounds installed into marty
// Blockly.Blocks['mv2_playSound'] = {
//   /**
//    * Block to make Marty play a specified sound
//    * @this Blockly.Block
//    */
//   init: function() {
//     this.jsonInit({
//       "message0": Blockly.Msg.MV2_PLAYSOUND,
//       "category": Blockly.Categories.sound,
//       "colour": 164,
//       "args0": [
//         {
//           "type": "field_image",
//           "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
//           "width": 40,
//           "height": 40
//         },
//         {
//           "type": "field_vertical_separator"
//         },
//         {
//           "type": "field_dropdown",
//           "name": "SOUND",
//           "options": [
//             [Blockly.Msg.DROPDOWN_OPTION_CONFUSIONSOUND, 'confused.raw'],
//             [Blockly.Msg.DROPDOWN_OPTION_DISBELIEFSOUND, 'disbelief.raw'],
//             [Blockly.Msg.DROPDOWN_OPTION_EXCITEMENTSOUND, 'excited.raw'],
//             [Blockly.Msg.DROPDOWN_OPTION_NOWAYSOUND, 'no_way.raw'],
//             [Blockly.Msg.DROPDOWN_OPTION_NOSOUND, 'no.raw'],
//             [Blockly.Msg.DROPDOWN_OPTION_WHISTLESOUND, 'whistle.raw'],
//           ]
//         },
//       ],
//       "extensions": ["shape_statement"]
//     });
//   }
// };

Blockly.Blocks["mv2_playSound"] = {
  /**
   * Block to make Marty play a specified sound
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_PLAYSOUND,
      category: Blockly.Categories.sound,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "input_value",
          name: "SOUND_MENU",
        },
      ],
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["mv2_playSoundUntilDone"] = {
  /**
   * Block to make Marty play a specified sound
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_PLAYSOUNDUNTILDONE,
      category: Blockly.Categories.sound,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "input_value",
          name: "SOUND_MENU",
        },
      ],
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["mv2_playNote"] = {
  /**
   * Block to make Marty play a specified note
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_PLAYNOTE,
      category: Blockly.Categories.sound,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "field_dropdown",
          name: "NOTES_MENU",
          options: [
            [
              Blockly.Msg.DROPDOWN_OPTION_ABASSNOTE,
              JSON.stringify({
                name: "A Bass",
                tags: ["music", "instruments", "notes"],
                assetId: "c04ebf21e5e19342fa1535e4efcdb43b",
                dataFormat: "",
                md5ext: "c04ebf21e5e19342fa1535e4efcdb43b.wav",
                sampleCount: 56320,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_AELECBASSNOTE,
              JSON.stringify({
                name: "A Elec Bass",
                tags: ["music", "instruments", "notes"],
                assetId: "5cb46ddd903fc2c9976ff881df9273c9",
                dataFormat: "",
                md5ext: "5cb46ddd903fc2c9976ff881df9273c9.wav",
                sampleCount: 11840,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_AELECGUITARNOTE,
              JSON.stringify({
                name: "A Elec Guitar",
                tags: ["music", "instruments", "notes"],
                assetId: "fa5f7fea601e9368dd68449d9a54c995",
                dataFormat: "",
                md5ext: "fa5f7fea601e9368dd68449d9a54c995.wav",
                sampleCount: 88200,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_AELECPIANONOTE,
              JSON.stringify({
                name: "A Elec Piano",
                tags: ["music", "note", "piano", "keyboard"],
                assetId: "0cfa8e84d6a5cd63afa31d541625a9ef",
                dataFormat: "",
                md5ext: "0cfa8e84d6a5cd63afa31d541625a9ef.wav",
                sampleCount: 88200,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_AGUITARNOTE,
              JSON.stringify({
                name: "A Guitar",
                tags: ["music", "instruments", "notes"],
                assetId: "ee753e87d212d4b2fb650ca660f1e839",
                dataFormat: "",
                md5ext: "ee753e87d212d4b2fb650ca660f1e839.wav",
                sampleCount: 63744,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_AMINORUKULELENOTE,
              JSON.stringify({
                name: "A Minor Ukulele",
                tags: ["music", "instruments", "notes", "chords"],
                assetId: "69d25af0fd065da39c71439174efc589",
                dataFormat: "",
                md5ext: "69d25af0fd065da39c71439174efc589.wav",
                sampleCount: 36534,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_APIANONOTE,
              JSON.stringify({
                name: "A Piano",
                tags: ["music", "instruments", "notes"],
                assetId: "0727959edb2ea0525feed9b0c816991c",
                dataFormat: "",
                md5ext: "0727959edb2ea0525feed9b0c816991c.wav",
                sampleCount: 88200,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_ASAXNOTE,
              JSON.stringify({
                name: "A Sax",
                tags: ["music", "instruments", "notes"],
                assetId: "420991e0d6d99292c6d736963842536a",
                dataFormat: "",
                md5ext: "420991e0d6d99292c6d736963842536a.wav",
                sampleCount: 12944,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_ATROMBONENOTE,
              JSON.stringify({
                name: "A Trombone",
                tags: ["music", "instruments", "notes"],
                assetId: "863ccc8ba66e6dabbce2a1261c22be0f",
                dataFormat: "adpcm",
                md5ext: "863ccc8ba66e6dabbce2a1261c22be0f.wav",
                sampleCount: 17273,
                rate: 22050,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_ATRUMPETNOTE,
              JSON.stringify({
                name: "A Trumpet",
                tags: ["music", "instruments", "notes"],
                assetId: "d2dd6b4372ca17411965dc92d52b2172",
                dataFormat: "",
                md5ext: "d2dd6b4372ca17411965dc92d52b2172.wav",
                sampleCount: 27822,
                rate: 44100,
              }),
            ],

            [
              Blockly.Msg.DROPDOWN_OPTION_BBASSNOTE,
              JSON.stringify({
                name: "B Bass",
                tags: ["music", "instruments", "notes"],
                assetId: "e31dcaf7bcdf58ac2a26533c48936c45",
                dataFormat: "",
                md5ext: "e31dcaf7bcdf58ac2a26533c48936c45.wav",
                sampleCount: 51584,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_BELECBASSNOTE,
              JSON.stringify({
                name: "B Elec Bass",
                tags: ["music", "instruments", "notes"],
                assetId: "5a0701d0a914223b5288300ac94e90e4",
                dataFormat: "",
                md5ext: "5a0701d0a914223b5288300ac94e90e4.wav",
                sampleCount: 12416,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_BELECGUITARNOTE,
              JSON.stringify({
                name: "B Elec Guitar",
                tags: ["music", "instruments", "notes"],
                assetId: "81f142d0b00189703d7fe9b1f13f6f87",
                dataFormat: "",
                md5ext: "81f142d0b00189703d7fe9b1f13f6f87.wav",
                sampleCount: 88200,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_BELECPIANONOTE,
              JSON.stringify({
                name: "B Elec Piano",
                tags: ["music", "note", "piano", "keyboard"],
                assetId: "9cc77167419f228503dd57fddaa5b2a6",
                dataFormat: "",
                md5ext: "9cc77167419f228503dd57fddaa5b2a6.wav",
                sampleCount: 88200,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_BGUITARNOTE,
              JSON.stringify({
                name: "B Guitar",
                tags: ["music", "instruments", "notes"],
                assetId: "2ae2d67de62df8ca54d638b4ad2466c3",
                dataFormat: "",
                md5ext: "2ae2d67de62df8ca54d638b4ad2466c3.wav",
                sampleCount: 59008,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_BPIANONOTE,
              JSON.stringify({
                name: "B Piano",
                tags: ["music", "instruments", "notes"],
                assetId: "86826c6022a46370ed1afae69f1ab1b9",
                dataFormat: "",
                md5ext: "86826c6022a46370ed1afae69f1ab1b9.wav",
                sampleCount: 88200,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_BSAXNOTE,
              JSON.stringify({
                name: "B Sax",
                tags: ["music", "instruments", "notes"],
                assetId: "653ebe92d491b49ad5d8101d629f567b",
                dataFormat: "",
                md5ext: "653ebe92d491b49ad5d8101d629f567b.wav",
                sampleCount: 19110,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_BTROMBONENOTE,
              JSON.stringify({
                name: "B Trombone",
                tags: ["music", "instruments", "notes"],
                assetId: "85b663229525b73d9f6647f78eb23e0a",
                dataFormat: "",
                md5ext: "85b663229525b73d9f6647f78eb23e0a.wav",
                sampleCount: 31044,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_BTRUMPETNOTE,
              JSON.stringify({
                name: "B Trumpet",
                tags: ["music", "instruments", "notes"],
                assetId: "cad2bc57729942ed9b605145fc9ea65d",
                dataFormat: "",
                md5ext: "cad2bc57729942ed9b605145fc9ea65d.wav",
                sampleCount: 29408,
                rate: 44100,
              }),
            ],

            [
              Blockly.Msg.DROPDOWN_OPTION_CBASSNOTE,
              JSON.stringify({
                name: "C Bass",
                tags: ["music", "instruments", "notes"],
                assetId: "c3566ec797b483acde28f790994cc409",
                dataFormat: "",
                md5ext: "c3566ec797b483acde28f790994cc409.wav",
                sampleCount: 89216,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_CELECBASSNOTE,
              JSON.stringify({
                name: "C Elec Bass",
                tags: ["music", "instruments", "notes"],
                assetId: "69eee3d038ea0f1c34ec9156a789236d",
                dataFormat: "",
                md5ext: "69eee3d038ea0f1c34ec9156a789236d.wav",
                sampleCount: 10432,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_CELECGUITARNOTE,
              JSON.stringify({
                name: "C Elec Guitar",
                tags: ["music", "instruments", "notes"],
                assetId: "0d340de02e14bebaf8dfa0e43eb3f1f9",
                dataFormat: "",
                md5ext: "0d340de02e14bebaf8dfa0e43eb3f1f9.wav",
                sampleCount: 88200,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_CELECPIANONOTE,
              JSON.stringify({
                name: "C Elec Piano",
                tags: ["music", "note", "piano", "keyboard"],
                assetId: "8366ee963cc57ad24a8a35a26f722c2b",
                dataFormat: "",
                md5ext: "8366ee963cc57ad24a8a35a26f722c2b.wav",
                sampleCount: 88200,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_CGUITARNOTE,
              JSON.stringify({
                name: "C Guitar",
                tags: ["music", "instruments", "notes"],
                assetId: "22baa07795a9a524614075cdea543793",
                dataFormat: "",
                md5ext: "22baa07795a9a524614075cdea543793.wav",
                sampleCount: 89728,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_CMAJORUKULELENOTE,
              JSON.stringify({
                name: "C Major Ukulele",
                tags: ["music", "instruments", "notes", "chords"],
                assetId: "aa2ca112507b59b5337f341aaa75fb08",
                dataFormat: "",
                md5ext: "aa2ca112507b59b5337f341aaa75fb08.wav",
                sampleCount: 36406,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_CPIANONOTE,
              JSON.stringify({
                name: "C Piano",
                tags: ["music", "instruments", "notes"],
                assetId: "d27ed8d953fe8f03c00f4d733d31d2cc",
                dataFormat: "",
                md5ext: "d27ed8d953fe8f03c00f4d733d31d2cc.wav",
                sampleCount: 88200,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_CSAXNOTE,
              JSON.stringify({
                name: "C Sax",
                tags: ["music", "instruments", "notes"],
                assetId: "4d2c939d6953b5f241a27a62cf72de64",
                dataFormat: "",
                md5ext: "4d2c939d6953b5f241a27a62cf72de64.wav",
                sampleCount: 18982,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_CTROMBONENOTE,
              JSON.stringify({
                name: "C Trombone",
                tags: ["music", "instruments", "notes"],
                assetId: "821b23a489201a0f21f47ba8528ba47f",
                dataFormat: "",
                md5ext: "821b23a489201a0f21f47ba8528ba47f.wav",
                sampleCount: 38106,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_CTRUMPETNOTE,
              JSON.stringify({
                name: "C Trumpet",
                tags: ["music", "instruments", "notes"],
                assetId: "8970afcdc4e47bb54959a81fe27522bd",
                dataFormat: "",
                md5ext: "8970afcdc4e47bb54959a81fe27522bd.wav",
                sampleCount: 26236,
                rate: 44100,
              }),
            ],

            [
              Blockly.Msg.DROPDOWN_OPTION_DBASSNOTE,
              JSON.stringify({
                name: "D Bass",
                tags: ["music", "instruments", "notes"],
                assetId: "5a3ae8a2665f50fdc38cc301fbac79ba",
                dataFormat: "",
                md5ext: "5a3ae8a2665f50fdc38cc301fbac79ba.wav",
                sampleCount: 80384,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_DELECBASSNOTE,
              JSON.stringify({
                name: "D Elec Bass",
                tags: ["music", "instruments", "notes"],
                assetId: "67a6d1aa68233a2fa641aee88c7f051f",
                dataFormat: "",
                md5ext: "67a6d1aa68233a2fa641aee88c7f051f.wav",
                sampleCount: 11136,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_DELECGUITARNOTE,
              JSON.stringify({
                name: "D Elec Guitar",
                tags: ["music", "instruments", "notes"],
                assetId: "1b5de9866801eb2f9d4f57c7c3b473f5",
                dataFormat: "",
                md5ext: "1b5de9866801eb2f9d4f57c7c3b473f5.wav",
                sampleCount: 88200,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_DELECPIANONOTE,
              JSON.stringify({
                name: "D Elec Piano",
                tags: ["music", "note", "piano", "keyboard"],
                assetId: "835f136ca8d346a17b4d4baf8405be37",
                dataFormat: "",
                md5ext: "835f136ca8d346a17b4d4baf8405be37.wav",
                sampleCount: 88200,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_DGUITARNOTE,
              JSON.stringify({
                name: "D Guitar",
                tags: ["music", "instruments", "notes"],
                assetId: "2dbcfae6a55738f94bbb40aa5fcbf7ce",
                dataFormat: "",
                md5ext: "2dbcfae6a55738f94bbb40aa5fcbf7ce.wav",
                sampleCount: 82240,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_DPIANONOTE,
              JSON.stringify({
                name: "D Piano",
                tags: ["music", "instruments", "notes"],
                assetId: "51381ac422605ee8c7d64cfcbfd75efc",
                dataFormat: "",
                md5ext: "51381ac422605ee8c7d64cfcbfd75efc.wav",
                sampleCount: 88200,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_DSAXNOTE,
              JSON.stringify({
                name: "D Sax",
                tags: ["music", "instruments", "notes"],
                assetId: "39f41954a73c0e15d842061e1a4c5e1d",
                dataFormat: "",
                md5ext: "39f41954a73c0e15d842061e1a4c5e1d.wav",
                sampleCount: 19110,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_DTROMBONENOTE,
              JSON.stringify({
                name: "D Trombone",
                tags: ["music", "instruments", "notes"],
                assetId: "f3afca380ba74372d611d3f518c2f35b",
                dataFormat: "",
                md5ext: "f3afca380ba74372d611d3f518c2f35b.wav",
                sampleCount: 34678,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_DTRUMPETNOTE,
              JSON.stringify({
                name: "D Trumpet",
                tags: ["music", "instruments", "notes"],
                assetId: "0b1345b8fe2ba3076fedb4f3ae48748a",
                dataFormat: "",
                md5ext: "0b1345b8fe2ba3076fedb4f3ae48748a.wav",
                sampleCount: 25404,
                rate: 44100,
              }),
            ],

            [
              Blockly.Msg.DROPDOWN_OPTION_EBASSNOTE,
              JSON.stringify({
                name: "E Bass",
                tags: ["music", "instruments", "notes"],
                assetId: "0657e39bae81a232b01a18f727d3b891",
                dataFormat: "",
                md5ext: "0657e39bae81a232b01a18f727d3b891.wav",
                sampleCount: 72320,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_EELECBASSNOTE,
              JSON.stringify({
                name: "E Elec Bass",
                tags: ["music", "instruments", "notes"],
                assetId: "0704b8ceabe54f1dcedda8c98f1119fd",
                dataFormat: "",
                md5ext: "0704b8ceabe54f1dcedda8c98f1119fd.wav",
                sampleCount: 11382,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_EELECGUITARNOTE,
              JSON.stringify({
                name: "E Elec Guitar",
                tags: ["music", "instruments", "notes"],
                assetId: "2e6a6ae3e0f72bf78c74def8130f459a",
                dataFormat: "",
                md5ext: "2e6a6ae3e0f72bf78c74def8130f459a.wav",
                sampleCount: 88200,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_EELECPIANONOTE,
              JSON.stringify({
                name: "E Elec Piano",
                tags: ["music", "note", "piano", "keyboard"],
                assetId: "ab3c198f8e36efff14f0a5bad35fa3cd",
                dataFormat: "",
                md5ext: "ab3c198f8e36efff14f0a5bad35fa3cd.wav",
                sampleCount: 88200,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_EGUITARNOTE,
              JSON.stringify({
                name: "E Guitar",
                tags: ["music", "instruments", "notes"],
                assetId: "4b5d1da83e59bf35578324573c991666",
                dataFormat: "",
                md5ext: "4b5d1da83e59bf35578324573c991666.wav",
                sampleCount: 76800,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_EPIANONOTE,
              JSON.stringify({
                name: "E Piano",
                tags: ["music", "instruments", "notes"],
                assetId: "c818fdfaf8a0efcb562e24e794700a57",
                dataFormat: "",
                md5ext: "c818fdfaf8a0efcb562e24e794700a57.wav",
                sampleCount: 88200,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_ESAXNOTE,
              JSON.stringify({
                name: "E Sax",
                tags: ["music", "instruments", "notes"],
                assetId: "3568b7dfe173fab6877a9ff1dcbcf1aa",
                dataFormat: "",
                md5ext: "3568b7dfe173fab6877a9ff1dcbcf1aa.wav",
                sampleCount: 14978,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_ETROMBONENOTE,
              JSON.stringify({
                name: "E Trombone",
                tags: ["music", "instruments", "notes"],
                assetId: "c859fb0954acaa25c4b329df5fb76434",
                dataFormat: "",
                md5ext: "c859fb0954acaa25c4b329df5fb76434.wav",
                sampleCount: 33398,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_ETRUMPETNOTE,
              JSON.stringify({
                name: "E Trumpet",
                tags: ["music", "instruments", "notes"],
                assetId: "494295a92314cadb220945a6711c568c",
                dataFormat: "adpcm",
                md5ext: "494295a92314cadb220945a6711c568c.wav",
                sampleCount: 9145,
                rate: 22050,
              }),
            ],

            [
              Blockly.Msg.DROPDOWN_OPTION_FBASSNOTE,
              JSON.stringify({
                name: "F Bass",
                tags: ["music", "instruments", "notes"],
                assetId: "ea21bdae86f70d60b28f1dddcf50d104",
                dataFormat: "",
                md5ext: "ea21bdae86f70d60b28f1dddcf50d104.wav",
                sampleCount: 68736,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_FELECBASSNOTE,
              JSON.stringify({
                name: "F Elec Bass",
                tags: ["music", "instruments", "notes"],
                assetId: "45eedb4ce62a9cbbd2207824b94a4641",
                dataFormat: "",
                md5ext: "45eedb4ce62a9cbbd2207824b94a4641.wav",
                sampleCount: 10624,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_FELECGUITARNOTE,
              JSON.stringify({
                name: "F Elec Guitar",
                tags: ["music", "instruments", "notes"],
                assetId: "5eb00f15f21f734986aa45156d44478d",
                dataFormat: "",
                md5ext: "5eb00f15f21f734986aa45156d44478d.wav",
                sampleCount: 88200,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_FELECPIANONOTE,
              JSON.stringify({
                name: "F Elec Piano",
                tags: ["music", "note", "piano", "keyboard"],
                assetId: "dc5e368fc0d0dad1da609bfc3e29aa15",
                dataFormat: "",
                md5ext: "dc5e368fc0d0dad1da609bfc3e29aa15.wav",
                sampleCount: 88200,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_FGUITARNOTE,
              JSON.stringify({
                name: "F Guitar",
                tags: ["music", "instruments", "notes"],
                assetId: "b51d086aeb1921ec405561df52ecbc50",
                dataFormat: "",
                md5ext: "b51d086aeb1921ec405561df52ecbc50.wav",
                sampleCount: 72832,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_FMAJORUKULELENOTE,
              JSON.stringify({
                name: "F Major Ukulele",
                tags: ["music", "instruments", "notes", "chords"],
                assetId: "cd0ab5d1b0120c6ed92a1654ccf81376",
                dataFormat: "",
                md5ext: "cd0ab5d1b0120c6ed92a1654ccf81376.wav",
                sampleCount: 36470,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_FPIANONOTE,
              JSON.stringify({
                name: "F Piano",
                tags: ["music", "instruments", "notes"],
                assetId: "cdab3cce84f74ecf53e3941c6a003b5e",
                dataFormat: "",
                md5ext: "cdab3cce84f74ecf53e3941c6a003b5e.wav",
                sampleCount: 88200,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_FSAXNOTE,
              JSON.stringify({
                name: "F Sax",
                tags: ["music", "instruments", "notes"],
                assetId: "2ae3083817bcd595e26ea2884b6684d5",
                dataFormat: "adpcm",
                md5ext: "2ae3083817bcd595e26ea2884b6684d5.wav",
                sampleCount: 8129,
                rate: 22050,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_FTROMBONENOTE,
              JSON.stringify({
                name: "F Trombone",
                tags: ["music", "instruments", "notes"],
                assetId: "d6758470457aac2aa712717a676a5163",
                dataFormat: "",
                md5ext: "d6758470457aac2aa712717a676a5163.wav",
                sampleCount: 38746,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_FTRUMPETNOTE,
              JSON.stringify({
                name: "F Trumpet",
                tags: ["music", "instruments", "notes"],
                assetId: "5fa3108b119ca266029b4caa340a7cd0",
                dataFormat: "",
                md5ext: "5fa3108b119ca266029b4caa340a7cd0.wav",
                sampleCount: 25532,
                rate: 44100,
              }),
            ],

            [
              Blockly.Msg.DROPDOWN_OPTION_GBASSNOTE,
              JSON.stringify({
                name: "G Bass",
                tags: ["music", "instruments", "notes"],
                assetId: "05c192194e8f1944514dce3833e33439",
                dataFormat: "",
                md5ext: "05c192194e8f1944514dce3833e33439.wav",
                sampleCount: 61952,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_GELECBASSNOTE,
              JSON.stringify({
                name: "G Elec Bass",
                tags: ["music", "instruments", "notes"],
                assetId: "97b187d72219b994a6ef6a5a6b09605c",
                dataFormat: "",
                md5ext: "97b187d72219b994a6ef6a5a6b09605c.wav",
                sampleCount: 11136,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_GELECGUITARNOTE,
              JSON.stringify({
                name: "G Elec Guitar",
                tags: ["music", "instruments", "notes"],
                assetId: "cd0d0e7dad415b2ffa2ba7a61860eaf8",
                dataFormat: "",
                md5ext: "cd0d0e7dad415b2ffa2ba7a61860eaf8.wav",
                sampleCount: 88200,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_GELECPIANONOTE,
              JSON.stringify({
                name: "G Elec Piano",
                tags: ["music", "note", "piano", "keyboard"],
                assetId: "39525f6545d62a95d05153f92d63301a",
                dataFormat: "",
                md5ext: "39525f6545d62a95d05153f92d63301a.wav",
                sampleCount: 88200,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_GGUITARNOTE,
              JSON.stringify({
                name: "G Guitar",
                tags: ["music", "instruments", "notes"],
                assetId: "98a835713ecea2f3ef9f4f442d52ad20",
                dataFormat: "",
                md5ext: "98a835713ecea2f3ef9f4f442d52ad20.wav",
                sampleCount: 67200,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_GPIANONOTE,
              JSON.stringify({
                name: "G Piano",
                tags: ["music", "instruments", "notes"],
                assetId: "42bb2ed28e7023e111b33220e1594a6f",
                dataFormat: "",
                md5ext: "42bb2ed28e7023e111b33220e1594a6f.wav",
                sampleCount: 88200,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_GSAXNOTE,
              JSON.stringify({
                name: "G Sax",
                tags: ["music", "instruments", "notes"],
                assetId: "cefba5de46adfe5702485e0934bb1e13",
                dataFormat: "adpcm",
                md5ext: "cefba5de46adfe5702485e0934bb1e13.wav",
                sampleCount: 8129,
                rate: 22050,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_GTROMBONENOTE,
              JSON.stringify({
                name: "G Trombone",
                tags: ["music", "instruments", "notes"],
                assetId: "9436fd7a0eacb4a6067e7db14236dde1",
                dataFormat: "",
                md5ext: "9436fd7a0eacb4a6067e7db14236dde1.wav",
                sampleCount: 34358,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_GTRUMPETNOTE,
              JSON.stringify({
                name: "G Trumpet",
                tags: ["music", "instruments", "notes"],
                assetId: "e84afda25975f14b364118591538ccf4",
                dataFormat: "",
                md5ext: "e84afda25975f14b364118591538ccf4.wav",
                sampleCount: 29280,
                rate: 44100,
              }),
            ],
            [
              Blockly.Msg.DROPDOWN_OPTION_GUKULELENOTE,
              JSON.stringify({
                name: "G Ukulele",
                tags: ["music", "instruments", "notes", "chords"],
                assetId: "d20218f92ee606277658959005538e2d",
                dataFormat: "",
                md5ext: "d20218f92ee606277658959005538e2d.wav",
                sampleCount: 36470,
                rate: 44100,
              }),
            ],
          ],
        },
      ],
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["mv2_playTone"] = {
  /**
   * Block to make Marty play a tone
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_PLAYTONE,
      category: Blockly.Categories.sound,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "input_value",
          name: "HZ1",
        },
        {
          type: "input_value",
          name: "HZ2",
        },
        {
          type: "input_value",
          name: "SECONDS",
        },
      ],
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["mv2_stopSounds"] = {
  /**
   * Block to make Marty stop all sounds
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_STOPSOUNDS,
      category: Blockly.Categories.sound,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
      ],
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["mv2_changePitchEffect"] = {
  /**
   * Block to change the audio effect
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_SOUND_CHANGEEFFECTBY,
      category: Blockly.Categories.sound,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "field_dropdown",
          name: "EFFECT",
          options: [[Blockly.Msg.SOUND_EFFECTS_PITCH, "PITCH"]],
        },
        {
          type: "input_value",
          name: "VALUE",
        },
      ],
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["mv2_setPitchEffect"] = {
  /**
   * Block to set the audio effect
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_SOUND_SETEFFECTO,
      category: Blockly.Categories.sound,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "field_dropdown",
          name: "EFFECT",
          options: [[Blockly.Msg.SOUND_EFFECTS_PITCH, "PITCH"]],
        },
        {
          type: "input_value",
          name: "VALUE",
        },
      ],
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["mv2_clearSoundEffects"] = {
  /**
   * Block to clear audio effects
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_SOUND_CLEAREFFECTS,
      category: Blockly.Categories.sound,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
      ],
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["mv2_changeVolume"] = {
  /**
   * Block to change the sprite's volume by a certain value
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_SOUND_CHANGEVOLUMEBY,
      category: Blockly.Categories.sound,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "input_value",
          name: "VOLUME",
        },
      ],
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["mv2_setVolume"] = {
  /**
   * Block to set the sprite's volume to a certain percent
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_SOUND_SETVOLUMETO,
      category: Blockly.Categories.sound,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "input_value",
          name: "VOLUME",
        },
      ],
      extensions: ["shape_statement"],
    });
  },
};

// SENSING

Blockly.Blocks["BatteryPercentage"] = {
  /**
   * Block to display Marty's battery percentage
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_BATTERYLEVEL,
      category: Blockly.Categories.sensing,
      colour: 164,
      checkboxInFlyout: true,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
      ],
      extensions: ["output_number"],
    });
  },
};

Blockly.Blocks["ServoPosition"] = {
  /**
   * Block to display the position of one of Marty's servos
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_POSITION,
      category: Blockly.Categories.sensing,
      colour: 164,
      type: "dynamic_dropdown",
      checkboxInFlyout: true,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "input_dummy",
          name: "SERVOCHOICE",
        },
      ],
      extensions: ["output_number", "dynamic_menu_servo_position_extension"],
    });
  },
};

Blockly.Blocks["ServoCurrent"] = {
  /**
   * Block to display the current through one of Marty's servos
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_CURRENT,
      category: Blockly.Categories.sensing,
      type: "dynamic_dropdown",
      colour: 164,
      checkboxInFlyout: true,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "input_dummy",
          name: "SERVOCHOICE",
        },
      ],
      extensions: ["output_number", "dynamic_menu_servo_current_extension"],
    });
  },
};

Blockly.Blocks["XAxisMovement"] = {
  /**
   * Block to display Marty's accelerometer X-axis state
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_ACCELEROMETERX,
      category: Blockly.Categories.sensing,
      colour: 164,
      checkboxInFlyout: true,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
      ],
      extensions: ["output_number"],
    });
  },
};

Blockly.Blocks["YAxisMovement"] = {
  /**
   * Block to display Marty's accelerometer Y-axis state
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_ACCELEROMETERY,
      category: Blockly.Categories.sensing,
      colour: 164,
      checkboxInFlyout: true,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
      ],
      extensions: ["output_number"],
    });
  },
};

Blockly.Blocks["ZAxisMovement"] = {
  /**
   * Block to display Marty's accelerometer Z-axis state
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_ACCELEROMETERZ,
      category: Blockly.Categories.sensing,
      colour: 164,
      checkboxInFlyout: true,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
      ],
      extensions: ["output_number"],
    });
  },
};

Blockly.Blocks["XAxisMagnetometer"] = {
  /**
   * Block to display Marty's magnetometer X-axis state
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_MAGNETOMETERX,
      category: Blockly.Categories.sensing,
      colour: 164,
      checkboxInFlyout: true,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
      ],
      extensions: ["output_number"],
    });
  },
};

Blockly.Blocks["YAxisMagnetometer"] = {
  /**
   * Block to display Marty's magnetometer Y-axis state
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_MAGNETOMETERY,
      category: Blockly.Categories.sensing,
      colour: 164,
      checkboxInFlyout: true,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
      ],
      extensions: ["output_number"],
    });
  },
};

Blockly.Blocks["ZAxisMagnetometer"] = {
  /**
   * Block to display Marty's magnetometer Z-axis state
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_MAGNETOMETERZ,
      category: Blockly.Categories.sensing,
      colour: 164,
      checkboxInFlyout: true,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
      ],
      extensions: ["output_number"],
    });
  },
};

Blockly.Blocks["mv2_obstaclesense"] = {
  /**
   * Block to report on obstacle detection from an IR sensor
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_OBSTACLE,
      category: Blockly.Categories.sensing,
      colour: 164,
      type: "dynamic_dropdown",
      checkboxInFlyout: true,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "input_dummy",
          name: "SENSORCHOICE",
        },
      ],
      extensions: ["output_boolean", "dynamic_menu_sensor_IRF_extension"],
    });
  },
};

Blockly.Blocks["mv2_groundsense"] = {
  /**
   * Block to report on obstacle detection from an IR sensor
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_GROUND,
      category: Blockly.Categories.sensing,
      colour: 164,
      type: "dynamic_dropdown",
      checkboxInFlyout: true,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "input_dummy",
          name: "SENSORCHOICE",
        },
      ],
      extensions: ["output_boolean", "dynamic_menu_sensor_IRF_extension"],
    });
  },
};

Blockly.Blocks["mv2_coloursense"] = {
  /**
   * Block to report on colour detection from a colour sensing foot
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_COLOUR,
      category: Blockly.Categories.sensing,
      colour: 164,
      type: "dynamic_dropdown",
      checkboxInFlyout: true,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "input_dummy",
          name: "SENSORCHOICE",
        },
      ],
      extensions: ["output_string", "dynamic_menu_sensor_colour_extension"],
    });
  },
};

Blockly.Blocks["mv2_coloursense_hex"] = {
  /**
   * Block to report on colour detection from a colour sensing foot
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_COLOUR_HEX,
      category: Blockly.Categories.sensing,
      colour: 164,
      type: "dynamic_dropdown",
      checkboxInFlyout: true,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "input_dummy",
          name: "SENSORCHOICE",
        },
      ],
      extensions: ["output_string", "dynamic_menu_sensor_colour_extension"],
    });
  },
};

Blockly.Blocks["mv2_coloursenseraw"] = {
  /**
   * Block to report a specific numeric reading from a colour sensor channel
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_COLOUR_RAW,
      category: Blockly.Categories.sensing,
      colour: 164,
      type: "dynamic_dropdown",
      checkboxInFlyout: true,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "input_dummy",
          name: "SENSORCHOICE",
        },
        {
          type: "field_dropdown",
          name: "SENSORCHANNEL",
          options: [
            [Blockly.Msg.DROPDOWN_OPTION_CLEAR, "Clear"],
            [Blockly.Msg.DROPDOWN_OPTION_RED, "Red"],
            [Blockly.Msg.DROPDOWN_OPTION_GREEN, "Green"],
            [Blockly.Msg.DROPDOWN_OPTION_BLUE, "Blue"],
          ],
        },
      ],
      extensions: ["output_number", "dynamic_menu_sensor_colour_extension"],
    });
  },
};

Blockly.Blocks["mv2_distancesense"] = {
  /**
   * Block to report on distance sensor
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_DISTANCE,
      category: Blockly.Categories.sensing,
      colour: 164,
      checkboxInFlyout: true,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
      ],
      extensions: ["output_number"],
    });
  },
};

Blockly.Blocks["mv2_lightsense"] = {
  /**
   * Block to report a specific numeric reading from a colour sensor channel
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_LIGHT_SENSOR,
      category: Blockly.Categories.sensing,
      colour: 164,
      type: "dynamic_dropdown",
      checkboxInFlyout: true,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "input_dummy",
          name: "SENSORCHOICE",
        },
        {
          type: "field_dropdown",
          name: "SENSORCHANNEL",
          options: [
            ["1", "Reading1"],
            ["2", "Reading2"],
            ["3", "Reading3"],
          ],
        },
      ],
      extensions: ["output_number", "dynamic_menu_sensor_light_extension"],
    });
  },
};

Blockly.Blocks["mv2_noisesense"] = {
  /**
   * Block to report on distance sensor
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.MV2_NOISE_SENSOR,
      category: Blockly.Categories.sensing,
      colour: 164,
      type: "dynamic_dropdown",
      checkboxInFlyout: true,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "input_dummy",
          name: "SENSORCHOICE",
        },
      ],
      extensions: ["output_number", "dynamic_menu_sensor_noise_extension"],
    });
  },
};

// MISC/DEBUG

Blockly.Blocks["mv2_demo_sensor"] = {
  /**
   * Block to give readout of demo sensor
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: "%1 %2 Demo sensor",
      category: Blockly.Categories.sensing,
      colour: 164,
      checkboxInFlyout: true,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
      ],
      extensions: ["output_number"],
    });
  },
};

Blockly.Blocks["mv2_set_demo_sensor"] = {
  /**
   * Block to set demo sensor value
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: "%1 %2 Set Demo sensor to %3",
      category: Blockly.Categories.sensing,
      colour: 164,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/marty-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "input_value",
          name: "SENSORVAL",
        },
      ],
      extensions: ["shape_statement"],
    });
  },
};
