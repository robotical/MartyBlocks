"use strict";

goog.provide("Blockly.Blocks.cog");
goog.require("Blockly.Blocks");
goog.require("Blockly.Colours");
goog.require("Blockly.constants");
goog.require("Blockly.ScratchBlocks.VerticalExtensions");

var martyblockslib = require('marty-blocks-lib');

/* EVENT BLOCKS */
Blockly.Blocks[martyblockslib.cog_blocks_definitions.events.cog_onTilt.type] = {
  /**
   * ON TILT
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.COG_EVENT_BLOCK_ONTILT,
      category: Blockly.Categories.events,
      colour: "#ffbf00",
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/cog-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "field_dropdown",
          name: martyblockslib.cog_blocks_definitions.events.cog_onTilt.values.DIRECTION.name,
          options: [
            [Blockly.Msg.DROPDOWN_OPTION_LEFT, "left"],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHT, "right"],
            [Blockly.Msg.DROPDOWN_OPTION_BACKWARD, "backward"],
            [Blockly.Msg.DROPDOWN_OPTION_FORWARD, "forward"],
          ],
        },
      ],
      extensions: ["colours_event", "shape_hat"],
    });
  },
};

Blockly.Blocks[martyblockslib.cog_blocks_definitions.events.cog_onRotate.type] = {
  /**
   * ON ROTATE
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.COG_EVENT_BLOCK_ONROTATE,
      category: Blockly.Categories.events,
      colour: "#ffbf00",
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/cog-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "field_dropdown",
          name: martyblockslib.cog_blocks_definitions.events.cog_onRotate.values.DIRECTION.name,
          options: [
            [Blockly.Msg.DROPDOWN_OPTION_CLOCKWISE, "clockwise"],
            [Blockly.Msg.DROPDOWN_OPTION_ANTICLOCKWISE, "counterClockwise"]
          ],
        },
      ],
      extensions: ["colours_event", "shape_hat"],
    });
  },
};

Blockly.Blocks[martyblockslib.cog_blocks_definitions.events.cog_onMove.type] = {
  /**
   * ON MOVE
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.COG_EVENT_BLOCK_ONMOVE,
      category: Blockly.Categories.events,
      colour: "#ffbf00",
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/cog-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "field_dropdown",
          name: martyblockslib.cog_blocks_definitions.events.cog_onMove.values.MOVE_TYPE.name,
          options: [
            [Blockly.Msg.DROPDOWN_OPTION_MOVE, "move"],
            [Blockly.Msg.DROPDOWN_OPTION_SHAKE, "shake"]
          ],
        },
      ],
      extensions: ["colours_event", "shape_hat"],
    });
  },
};

Blockly.Blocks[martyblockslib.cog_blocks_definitions.events.cog_onButtonPush.type] = {
  /**
   * ON BUTTON PUSH
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.COG_EVENT_BLOCK_ONBUTTONPUSH,
      category: Blockly.Categories.events,
      colour: "#ffbf00",
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/cog-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        }
      ],
      extensions: ["colours_event", "shape_hat"],
    });
  },
};

Blockly.Blocks[martyblockslib.cog_blocks_definitions.events.cog_onObjectSense.type] = {
  /**
   * ON OBJECT SENSED
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.COG_EVENT_BLOCK_ONOBJECTSENSED,
      category: Blockly.Categories.events,
      colour: "#ffbf00",
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/cog-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "field_dropdown",
          name: martyblockslib.cog_blocks_definitions.events.cog_onObjectSense.values.SIDE.name,
          options: [
            [Blockly.Msg.DROPDOWN_OPTION_LEFT, "left"],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHT, "right"],
          ],
        },
      ],
      extensions: ["colours_event", "shape_hat"],
    });
  },
};

Blockly.Blocks[martyblockslib.cog_blocks_definitions.events.cog_onLightSense.type] = {
  /**
   * ON LIGHT SENSED
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.COG_EVENT_BLOCK_ONLIGHTSENSED,
      category: Blockly.Categories.events,
      colour: "#ffbf00",
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/cog-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
      ],
      extensions: ["colours_event", "shape_hat"],
    });
  },
};

Blockly.Blocks[martyblockslib.cog_blocks_definitions.events.cog_onIRMessageReceived.type] = {
  /**
   * ON IR MESSAGE RECEIVED
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.COG_EVENT_BLOCK_ONIRMESSAGERECEIVED,
      category: Blockly.Categories.events,
      colour: "#ffbf00",
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/cog-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "field_dropdown",
          name: martyblockslib.cog_blocks_definitions.events.cog_onIRMessageReceived.values.SIDE.name,
          options: [
            [Blockly.Msg.DROPDOWN_OPTION_LEFT, "left"],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHT, "right"],
            [Blockly.Msg.DROPDOWN_OPTION_EITHER, "either"],
          ],
        },
      ],
      extensions: ["colours_event", "shape_hat"],
    });
  },
};
/* END OF EVENT BLOCKS */

/* SENSOR BLOCKS */
Blockly.Blocks[martyblockslib.cog_blocks_definitions.sensing.cog_getAccelerometer.type] = {
  /**
   * GET ACCELEROEMETER
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.COG_ACCELEROMETER,
      category: Blockly.Categories.sensing,
      colour: "#4cbfe6",
      checkboxInFlyout: true,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/cog-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "field_dropdown",
          name: martyblockslib.cog_blocks_definitions.sensing.cog_getAccelerometer.values.AXIS.name,
          options: [
            [Blockly.Msg.DROPDOWN_OPTION_X, "ax"],
            [Blockly.Msg.DROPDOWN_OPTION_Y, "ay"],
            [Blockly.Msg.DROPDOWN_OPTION_Z, "az"],
          ],
        },
      ],
      extensions: ["colours_sensing", "output_number"],
    });
  },
};
Blockly.Blocks[martyblockslib.cog_blocks_definitions.sensing.cog_getGyroscope.type] = {
  /**
   * GET GYROSCOPE
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.COG_GYROSCOPE,
      category: Blockly.Categories.sensing,
      colour: "#4cbfe6",
      checkboxInFlyout: true,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/cog-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "field_dropdown",
          name: martyblockslib.cog_blocks_definitions.sensing.cog_getGyroscope.values.AXIS.name,
          options: [
            [Blockly.Msg.DROPDOWN_OPTION_X, "gx"],
            [Blockly.Msg.DROPDOWN_OPTION_Y, "gy"],
            [Blockly.Msg.DROPDOWN_OPTION_Z, "gz"],
          ],
        },
      ],
      extensions: ["colours_sensing", "output_number"],
    });
  }
};
Blockly.Blocks[martyblockslib.cog_blocks_definitions.sensing.cog_getButtonClicked.type] = {
  /**
   * GET BUTTON CLICKED
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.COG_BUTTON_CLICKED,
      category: Blockly.Categories.sensing,
      colour: "#4cbfe6",
      checkboxInFlyout: true,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/cog-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        }
      ],
      extensions: ["colours_sensing", "output_boolean"],
    });
  }
};
Blockly.Blocks[martyblockslib.cog_blocks_definitions.sensing.cog_getButtonForceValue.type] = {
  /**
   * GET BUTTON FORCE VALUE
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.COG_BUTTON_FORCE_VALUE,
      category: Blockly.Categories.sensing,
      colour: "#4cbfe6",
      checkboxInFlyout: true,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/cog-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        }
      ],
      extensions: ["colours_sensing", "output_boolean"],
    });
  }
};
Blockly.Blocks[martyblockslib.cog_blocks_definitions.sensing.cog_getObstacleSensed.type] = {
  /**
   * GET OBSTACLE SENSED
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.COG_OBSTACLE_SENSED,
      category: Blockly.Categories.sensing,
      colour: "#4cbfe6",
      checkboxInFlyout: true,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/cog-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "field_dropdown",
          name: martyblockslib.cog_blocks_definitions.sensing.cog_getObstacleSensed.values.SIDE.name,
          options: [
            [Blockly.Msg.DROPDOWN_OPTION_LEFT, "left"],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHT, "right"],
          ],
        },
      ],
      extensions: ["colours_sensing", "output_boolean"],
    });
  }
};
Blockly.Blocks[martyblockslib.cog_blocks_definitions.sensing.cog_getLightSensed.type] = {
  /**
   * GET LIGHT SENSED
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.COG_LIGHT_SENSED,
      category: Blockly.Categories.sensing,
      colour: "#4cbfe6",
      checkboxInFlyout: true,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/cog-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        }
      ],
      extensions: ["colours_sensing", "output_boolean"],
    });
  }
};
Blockly.Blocks[martyblockslib.cog_blocks_definitions.sensing.cog_getIRSensorValue.type] = {
  /**
   * GET IR SENSOR VALUE
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.COG_IR_SENSOR_VALUE,
      category: Blockly.Categories.sensing,
      colour: "#4cbfe6",
      checkboxInFlyout: true,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/cog-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "field_dropdown",
          name: martyblockslib.cog_blocks_definitions.sensing.cog_getIRSensorValue.values.SIDE.name,
          options: [
            [Blockly.Msg.DROPDOWN_OPTION_LEFT, "left"],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHT, "right"],
          ],
        },
      ],
      extensions: ["colours_sensing", "output_number"],
    });
  }
};
Blockly.Blocks[martyblockslib.cog_blocks_definitions.sensing.cog_getAmbientLightValue.type] = {
  /**
   * GET AMBIENT LIGHT VALUE
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.COG_AMBIENT_LIGHT_VALUE,
      category: Blockly.Categories.sensing,
      colour: "#4cbfe6",
      checkboxInFlyout: true,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/cog-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        }
      ],
      extensions: ["colours_sensing", "output_number"],
    });
  }
};
Blockly.Blocks[martyblockslib.cog_blocks_definitions.sensing.cog_getMovementType.type] = {
  /**
   * GET MOVEMENT TYPE
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.COG_MOVEMENT_TYPE,
      category: Blockly.Categories.sensing,
      colour: "#4cbfe6",
      checkboxInFlyout: true,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/cog-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        }
      ],
      extensions: ["colours_sensing", "output_string"],
    });
  }
};
Blockly.Blocks[martyblockslib.cog_blocks_definitions.sensing.cog_getTiltDirection.type] = {
  /**
   * GET TILT DIRECTION
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.COG_TILT_DIRECTION,
      category: Blockly.Categories.sensing,
      colour: "#4cbfe6",
      checkboxInFlyout: true,
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/cog-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        }
      ],
      extensions: ["colours_sensing", "output_string"],
    });
  }
};
/* END OF SENSOR BLOCKS */

/* LOOKS BLOCKS */
Blockly.Blocks[martyblockslib.cog_blocks_definitions.looks.cog_setLEDColourPicker.type] = {
  /**
   * SET LED COLOUR PICKER
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.COG_SET_LED_COLOUR_PICKER,
      category: Blockly.Categories.looks,
      colour: "#9966ff",
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/cog-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "input_value",
          name: martyblockslib.cog_blocks_definitions.looks.cog_setLEDColourPicker.values.COLOR.name,
        },
      ],
      extensions: ["colours_looks", "shape_statement"]
    });
  }
};
Blockly.Blocks[martyblockslib.cog_blocks_definitions.looks.cog_setLEDs.type] = {
  /**
   * SET ALL LEDS
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.COG_SET_ALL_LEDS,
      category: Blockly.Categories.looks,
      colour: "#9966ff",
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/cog-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "field_dropdown",
          name: martyblockslib.cog_blocks_definitions.looks.cog_setLEDs.values.LED_TYPE.name,
          options: [
            [Blockly.Msg.DROPDOWN_OPTION_RING, "ring"],
            [Blockly.Msg.DROPDOWN_OPTION_BUTTON, "button"],
            [Blockly.Msg.DROPDOWN_OPTION_ALL, "all"],
          ],
        },
        {
          type: "input_value",
          name: martyblockslib.cog_blocks_definitions.looks.cog_setLEDs.values.COLOR.name,
        },
      ],
      extensions: ["colours_looks", "shape_statement"]
    });
  }
};
Blockly.Blocks[martyblockslib.cog_blocks_definitions.looks.cog_setLEDToColour.type] = {
  /**
   * SET LED TO COLOUR
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.COG_SET_LED_TO_COLOUR,
      category: Blockly.Categories.looks,
      colour: "#9966ff",
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/cog-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "input_value",
          name: martyblockslib.cog_blocks_definitions.looks.cog_setLEDToColour.values.LED_ID.name,
        },
        {
          type: "input_value",
          name: martyblockslib.cog_blocks_definitions.looks.cog_setLEDToColour.values.COLOR.name,
        },
      ],
      extensions: ["colours_looks", "shape_statement"]
    });
  }
};
Blockly.Blocks[martyblockslib.cog_blocks_definitions.looks.cog_setLEDPattern.type] = {
  /**
   * SET LED PATTERN
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.COG_SET_LED_PATTERN,
      category: Blockly.Categories.looks,
      colour: "#9966ff",
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/cog-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "field_dropdown",
          name: martyblockslib.cog_blocks_definitions.looks.cog_setLEDPattern.values.LED_TYPE.name,
          options: [
            [Blockly.Msg.DROPDOWN_OPTION_RING, "ring"],
            [Blockly.Msg.DROPDOWN_OPTION_BUTTON, "button"],
            [Blockly.Msg.DROPDOWN_OPTION_ALL, "all"],
          ],
        },
        {
          type: "field_dropdown",
          name: martyblockslib.cog_blocks_definitions.looks.cog_setLEDPattern.values.PATTERN.name,
          options: [
            [Blockly.Msg.DROPDOWN_OPTION_FLASH, "Flash"],
            ...Array.from({ length: 8 }, (_, i) => ([
              Blockly.Msg['DROPDOWN_OPTION_SPIN' + (i + 1).toString()],
              "Spin" + (i + 1).toString()
            ]))
          ],
        },
      ],
      extensions: ["colours_looks", "shape_statement"]
    });
  }
};
Blockly.Blocks[martyblockslib.cog_blocks_definitions.looks.cog_turnOffLEDs.type] = {
  /**
   * TURN OFF LEDS
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.COG_TURN_OFF_LEDS,
      category: Blockly.Categories.looks,
      colour: "#9966ff",
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/cog-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        }
      ],
      extensions: ["colours_looks", "shape_statement"]
    });
  }
};
/* END OF LOOKS BLOCKS */

/* SOUND BLOCKS */
Blockly.Blocks[martyblockslib.cog_blocks_definitions.sound.cog_playRtttlTune.type] = {
  /**
   * PLAY RTTTL TUNE
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.COG_PLAY_RTTTL_TUNE,
      category: Blockly.Categories.sound,
      colour: "#ffab19",
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/cog-small.svg",
          width: 40,
          height: 40
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "field_dropdown",
          name: martyblockslib.cog_blocks_definitions.sound.cog_playRtttlTune.values.TUNE.name,
          options: [
            [Blockly.Msg.DROPDOWN_OPTION_CONFUSIONSOUND, 'confusion'],
            [Blockly.Msg.DROPDOWN_OPTION_DISBELIEFSOUND, 'disbelief'],
            [Blockly.Msg.DROPDOWN_OPTION_EXCITEMENTSOUND, 'excitement'],
            [Blockly.Msg.DROPDOWN_OPTION_NOWAYSOUND, 'noway'],
            [Blockly.Msg.DROPDOWN_OPTION_NOSOUND, 'no'],
            [Blockly.Msg.DROPDOWN_OPTION_WHISTLESOUND, 'whistle'],
          ]
        },
      ],
      extensions: ["colours_sounds", "shape_statement"]
    });
  }
};
Blockly.Blocks[martyblockslib.cog_blocks_definitions.sound.cog_playNoteForTime.type] = {
  /**
   * PLAY NOTE FOR TIME
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.COG_PLAY_NOTE_FOR_TIME,
      category: Blockly.Categories.sound,
      colour: "#ffab19",
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/cog-small.svg",
          width: 40,
          height: 40
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "input_value",
          name: martyblockslib.cog_blocks_definitions.sound.cog_playNoteForTime.values.NOTE.name,
        },
        {
          type: "input_value",
          name: martyblockslib.cog_blocks_definitions.sound.cog_playNoteForTime.values.TIME.name,
        },
      ],
      extensions: ["colours_sounds", "shape_statement"]
    });
  }
};
Blockly.Blocks[martyblockslib.cog_blocks_definitions.sound.cog_playTone.type] = {
  /**
   * PLAY TONE
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.COG_PLAY_TONE,
      category: Blockly.Categories.sound,
      colour: "#ffab19",
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/cog-small.svg",
          width: 40,
          height: 40
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "input_value",
          name: martyblockslib.cog_blocks_definitions.sound.cog_playTone.values.HZ1.name,
        },
        {
          type: "input_value",
          name: martyblockslib.cog_blocks_definitions.sound.cog_playTone.values.HZ2.name,
        },
        {
          type: "input_value",
          name: martyblockslib.cog_blocks_definitions.sound.cog_playTone.values.SECONDS.name,
        },
      ],
      extensions: ["colours_sounds", "shape_statement"]
    });
  }
};
Blockly.Blocks[martyblockslib.cog_blocks_definitions.sound.cog_playNoteForTime.values.NOTE.shadow.type] = {
  /**
   * NOTES MENU
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: "%1",
      args0: [
        {
          type: "field_dropdown",
          name: martyblockslib.cog_blocks_definitions.sound.cog_playNoteForTime.values.NOTE.name,
          options: ["notec4", "notecsharp4", "noted4", "notedsharp4", "notee4", "notef4", "notefsharp4", "noteg4", "notegsharp4", "notea4", "noteasharp4", "noteb4", "notec5", "notecsharp5", "noted5", "notedsharp5", "notee5", "notef5", "notefsharp5", "noteg5", "notegsharp5", "notea5", "noteasharp5", "noteb5", "notec6", "notecsharp6", "noted6", "notedsharp6", "notee6", "notef6", "notefsharp6", "noteg6", "notegsharp6", "notea6", "noteasharp6", "noteb6", "notec7", "notecsharp7", "noted7", "notedsharp7", "notee7", "notef7", "notefsharp7", "noteg7", "notegsharp7", "notea7", "noteasharp7", "noteb7"]
            .map(note => {
              let blocklyMsg = Blockly.Msg['DROPDOWN_OPTION_' + note.toUpperCase()]
              if (blocklyMsg === undefined) {
                return [note, note]
              }
              return [
                Blockly.Msg['DROPDOWN_OPTION_' + note.toUpperCase()],
                note
              ]
            })
        },
      ],
      colour: Blockly.Colours.sounds.secondary,
      extensions: ["colours_sounds", "output_string"]
    });
  }
};
Blockly.Blocks[martyblockslib.cog_blocks_definitions.sound.cog_startNote.type] = {
  /**
   * START NOTE
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.COG_START_NOTE,
      category: Blockly.Categories.sound,
      colour: "#ffab19",
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/cog-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "input_value",
          name: martyblockslib.cog_blocks_definitions.sound.cog_startNote.values.NOTE.name,
        },
      ],
      extensions: ["colours_sounds", "shape_statement"]
    });
  }
};
Blockly.Blocks[martyblockslib.cog_blocks_definitions.sound.cog_stopAllSounds.type] = {
  /**
   * STOP ALL SOUNDS
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.COG_STOP_SOUNDS,
      category: Blockly.Categories.sound,
      colour: "#ffab19",
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/cog-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
      ],
      extensions: ["colours_sounds", "shape_statement"]
    });
  }
};
Blockly.Blocks[martyblockslib.cog_blocks_definitions.sound.cog_setVolumeToPercentage.type] = {
  /**
   * SET VOLUME TO PERCENTAGE
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.COG_SET_VOLUME_TO_PERCENTAGE,
      category: Blockly.Categories.sound,
      colour: "#ffab19",
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/cog-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "input_value",
          name: martyblockslib.cog_blocks_definitions.sound.cog_setVolumeToPercentage.values.PERCENTAGE.name,
        },
      ],
      extensions: ["colours_sounds", "shape_statement"]
    });
  }
};
Blockly.Blocks[martyblockslib.cog_blocks_definitions.sound.cog_playSoundAtFrequency.type] = {
  /**
   * PLAY SOUND AT FREQUENCY
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      message0: Blockly.Msg.COG_PLAY_SOUND_AT_FREQUENCY,
      category: Blockly.Categories.sound,
      colour: "#ffab19",
      args0: [
        {
          type: "field_image",
          src:
            Blockly.mainWorkspace.options.pathToMedia +
            "extensions/cog-small.svg",
          width: 40,
          height: 40,
        },
        {
          type: "field_vertical_separator",
        },
        {
          type: "input_value",
          name: martyblockslib.cog_blocks_definitions.sound.cog_playSoundAtFrequency.values.FREQUENCY.name,
        },
      ],
      extensions: ["colours_sounds", "shape_statement"],
    });
  },
};
/* END OF SOUND BLOCKS */
