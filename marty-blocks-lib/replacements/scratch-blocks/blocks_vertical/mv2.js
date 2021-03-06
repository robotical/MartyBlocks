'use strict';

goog.provide('Blockly.Blocks.mv2');
goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.constants');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

// Define blocks in marty-blocks-lib
console.log("Setting up Blockly MartyBlocks");
const martyblockslib = require('marty-blocks-lib');

Blockly.Blocks['mv2_getReady'] = {
  /**
   * Block to make Marty freeze
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MV2_GETREADY,
      "category": Blockly.Categories.control,
      "colour": 164,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        }
      ],
      "extensions": ["shape_statement"]
    });
  }
};

Blockly.Blocks['mv2_walk_fw'] = {
  /**
   * Block to make Marty walk forwards
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MV2_WALK_FW,
      "category": Blockly.Categories.motion,
      "colour": 164,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "STEPS"
        }
      ],
      "extensions": ["shape_statement"]
    });
  }
};

Blockly.Blocks['mv2_walk_bw'] = {
  /**
   * Block to make Marty walk backwards
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MV2_WALK_BW,
      "category": Blockly.Categories.motion,
      "colour": 164,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "STEPS"
        }
      ],
      "extensions": ["shape_statement"]
    });
  }
};

Blockly.Blocks['mv2_walk'] = {
  /**
   * Block to make Marty walk
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MV2_WALK,
      "category": Blockly.Categories.motion,
      "colour": 164,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "STEPS"
        },
        {
          "type": "input_value",
          "name": "STEPLEN"
        },
        {
          "type": "input_value",
          "name": "MOVETIME"
        },
        {
          "type": "input_value",
          "name": "TURN"
        }
      ],
      "extensions": ["shape_statement"]
    });
  }
};

Blockly.Blocks['mv2_turn'] = {
  /**
   * Block to make Marty walk
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MV2_TURN,
      "category": Blockly.Categories.motion,
      "colour": 164,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "STEPS"
        },
        {
          "type": "field_dropdown",
          "name": "SIDE",
          "options": [
            [Blockly.Msg.DROPDOWN_OPTION_LEFT, '0'],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHT, '1']
          ]
        }
      ],
      "extensions": ["shape_statement"]
    });
  }
};

Blockly.Blocks['mv2_wiggle'] = {
  /**
   * Block to make Marty wiggle
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MV2_WIGGLE,
      "category": Blockly.Categories.motion,
      "colour": 164,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        }
      ],
      "extensions": ["shape_statement"]
    });
  }
};

Blockly.Blocks['mv2_circle'] = {
  /**
   * Block to make Marty move in a circle
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MV2_CIRCLE,
      "category": Blockly.Categories.motion,
      "colour": 164,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "SIDE",
          "options": [
            [Blockly.Msg.DROPDOWN_OPTION_LEFT, '0'],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHT, '1']
          ]
        },
        {
          "type": "input_value",
          "name": "MOVETIME"
        }
      ],
      "extensions": ["shape_statement"]
    });
  }
};

Blockly.Blocks['mv2_kick'] = {
  /**
   * Block to make Marty kick
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MV2_KICK,
      "category": Blockly.Categories.motion,
      "colour": 164,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "SIDE",
          "options": [
            [Blockly.Msg.DROPDOWN_OPTION_LEFT, '0'],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHT, '1']
          ]
        },
        /*{
          "type": "input_value",      // proposed optional parameter
          "name": "TURN"
        }*/
      ],
      "extensions": ["shape_statement"]
    });
  }
};

Blockly.Blocks['mv2_slide'] = {
  /**
   * Block to make Marty slide
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MV2_SLIDE,
      "category": Blockly.Categories.motion,
      "colour": 164,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "STEPS"
        },
        {
          "type": "field_dropdown",
          "name": "SIDE",
          "options": [
            [Blockly.Msg.DROPDOWN_OPTION_LEFT, '0'],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHT, '1']
          ]
        }
      ],
      "extensions": ["shape_statement"]
    });
  }
};

Blockly.Blocks['mv2_lean'] = {
  /**
   * Block to make Marty lean
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MV2_LEAN,
      "category": Blockly.Categories.motion,
      "colour": 164,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "SIDE",
          "options": [
            [Blockly.Msg.DROPDOWN_OPTION_LEFT, '0'],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHT, '1'],
            [Blockly.Msg.DROPDOWN_OPTION_FORWARD, '2'],
            [Blockly.Msg.DROPDOWN_OPTION_BACKWARD, '3']
          ]
        },
        {
          "type": "input_value",
          "name": "MOVETIME"
        }
      ],
      "extensions": ["shape_statement"]
    });
  }
};

Blockly.Blocks['mv2_eyes'] = {
  /**
   * Block to make Marty's eyes emote
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MV2_EYES,
      "category": Blockly.Categories.motion,
      "colour": 164,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "COMMAND",
          "options": [
            [Blockly.Msg.DROPDOWN_OPTION_EXCITED, 'eyesExcited'],
            [Blockly.Msg.DROPDOWN_OPTION_WIDE, 'eyesWide'],
            [Blockly.Msg.DROPDOWN_OPTION_ANGRY, 'eyesAngry'],
            [Blockly.Msg.DROPDOWN_OPTION_NORMAL, 'eyesNormal'],
            [Blockly.Msg.DROPDOWN_OPTION_WIGGLE, 'wiggleEyes']
          ]
        }
      ],
      "extensions": ["shape_statement"]
    });
  }
};

Blockly.Blocks['mv2_moveLeg'] = {
  /**
   * Block to make Marty's legs move
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MV2_MOVELEG,
      "category": Blockly.Categories.motion,
      "colour": 164,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "SIDE",
          "options": [
            [Blockly.Msg.DROPDOWN_OPTION_LEFT, '0'],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHT, '3']
          ]
        },
        {
          "type": "field_dropdown",
          "name": "DIRECTION",
          "options": [
            [Blockly.Msg.DROPDOWN_OPTION_FORWARD, '-20'],
            [Blockly.Msg.DROPDOWN_OPTION_BACKWARD, '20']
          ]
        }
      ],
      "extensions": ["shape_statement"]
    });
  }
};

Blockly.Blocks['mv2_liftFoot'] = {
  /**
   * Block to make Marty lift his foot
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MV2_LIFTFOOT,
      "category": Blockly.Categories.motion,
      "colour": 164,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "SIDE",
          "options": [
            [Blockly.Msg.DROPDOWN_OPTION_LEFT, '0'],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHT, '1']
          ]
        },
      ],
      "extensions": ["shape_statement"]
    });
  }
};

Blockly.Blocks['mv2_lowerFoot'] = {
  /**
   * Block to make Marty lower his foot
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MV2_LOWERFOOT,
      "category": Blockly.Categories.motion,
      "colour": 164,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "SIDE",
          "options": [
            [Blockly.Msg.DROPDOWN_OPTION_LEFT, '0'],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHT, '1']
          ]
        },
      ],
      "extensions": ["shape_statement"]
    });
  }
};

Blockly.Blocks['mv2_moveJoint'] = {
  /**
   * Block to make Marty move a specific joint
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MV2_MOVEJOINT,
      "category": Blockly.Categories.motion,
      "colour": 164,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "SERVOCHOICE",
          "options": [
            [Blockly.Msg.DROPDOWN_OPTION_LEFTHIP, '0'],
            [Blockly.Msg.DROPDOWN_OPTION_LEFTTWIST, '1'],
            [Blockly.Msg.DROPDOWN_OPTION_LEFTKNEE, '2'],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHTHIP, '3'],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHTTWIST, '4'],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHTKNEE, '5'],
            [Blockly.Msg.DROPDOWN_OPTION_LEFTARM, '6'],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHTARM, '7'],
            [Blockly.Msg.DROPDOWN_OPTION_EYES, '8']
          ]
        },
        {
          "type": "input_value",
          "name": "ANGLE"
        },
        {
          "type": "input_value",
          "name": "MOVETIME"
        },
      ],
      "extensions": ["shape_statement"]
    });
  }
};

Blockly.Blocks['mv2_wave'] = {
  /**
   * Block to make Marty wave
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MV2_WAVE,
      "category": Blockly.Categories.motion,
      "colour": 164,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "SIDE",
          "options": [
            [Blockly.Msg.DROPDOWN_OPTION_LEFT, '0'],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHT, '1']
          ]
        },
      ],
      "extensions": ["shape_statement"]
    });
  }
};

Blockly.Blocks['mv2_dance'] = {
  /**
   * Block to make Marty perform a chosen dance
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MV2_DANCE,
      "category": Blockly.Categories.motion,
      "colour": 164,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        },
      ],
      "extensions": ["shape_statement"]
    });
  }
};

Blockly.Blocks['mv2_standStraight'] = {
  /**
   * Block to make Marty stand up straight
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MV2_STANDSTRAIGHT,
      "category": Blockly.Categories.motion,
      "colour": 164,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "MOVETIME"
        }
      ],
      "extensions": ["shape_statement"]
    });
  }
};

Blockly.Blocks['mv2_hold'] = {
  /**
   * Block to make Marty hold his current position
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MV2_HOLD,
      "category": Blockly.Categories.motion,
      "colour": 164,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "MOVETIME"
        }
      ],
      "extensions": ["shape_statement"]
    });
  }
};



Blockly.Blocks['mv2_gripperArmBasic'] = {
  /**
   * Block to make Marty wave
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MV2_GRIPPERARMBASIC,
      "category": Blockly.Categories.motion,
      "colour": 164,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "HAND_POSITION",
          "options": [
            [Blockly.Msg.DROPDOWN_OPTION_OPEN, '0'],
            [Blockly.Msg.DROPDOWN_OPTION_CLOSE, '1']
          ]
        }
      ],
      "extensions": ["shape_statement"]
    });
  }
};


Blockly.Blocks['mv2_gripperArmTimed'] = {
  /**
   * Block to make Marty wave
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MV2_GRIPPERARMTIMED,
      "category": Blockly.Categories.motion,
      "colour": 164,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "HAND_POSITION",
          "options": [
            [Blockly.Msg.DROPDOWN_OPTION_OPEN, '0'],
            [Blockly.Msg.DROPDOWN_OPTION_CLOSE, '1']
          ]
        },
        {
          "type": "input_value",
          "name": "MOVETIME"
        }
      ],
      "extensions": ["shape_statement"]
    });
  }
};

// LOOK

Blockly.Blocks['mv2_discoChangeBlockPattern'] = {
  /**
   * Block to make Marty freeze
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MV2_DISCOCHANGEBLOCKPATTERN,
      "category": Blockly.Categories.looks,
      "colour": 164,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "BOARDTYPE",
          "options": [
            [Blockly.Msg.DROPDOWN_OPTION_EYES, '0'],
            [Blockly.Msg.DROPDOWN_OPTION_ARMS, '1'],
            [Blockly.Msg.DROPDOWN_OPTION_FEET, '2'],
            [Blockly.Msg.DROPDOWN_OPTION_ALL, '3']
          ]
        },
        {
          "type": "field_dropdown",
          "name": "PATTERN",
          "options": [
            [Blockly.Msg.DROPDOWN_OPTION_ONE, '0'],
            [Blockly.Msg.DROPDOWN_OPTION_TWO, '1'],
            [Blockly.Msg.DROPDOWN_OPTION_OFF, '2']
          ]
        }
      ],
      "extensions": ["shape_statement"]
    });
  }
};


Blockly.Blocks['mv2_discoChangeBlockColour'] = {
  /**
   * DISCO MARTY BLOCK
   * Block to change the colour of both arms, 
   * both legs, both feet or all to a preset colour
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MV2_DISCOCHANGEBLOCKCOLOUR,
      "category": Blockly.Categories.looks,
      "colour": 164,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "BOARDTYPE",
          "options": [
            [Blockly.Msg.DROPDOWN_OPTION_EYES, '0'],
            [Blockly.Msg.DROPDOWN_OPTION_ARMS, '1'],
            [Blockly.Msg.DROPDOWN_OPTION_FEET, '2'],
            [Blockly.Msg.DROPDOWN_OPTION_ALL, '3']
          ]
        },
        {
          "type": "input_value",
          "name": "COLOR"
        }
      ],
      "extensions": ["shape_statement"]
    });
  }
};



Blockly.Blocks['mv2_discoChangeRegionColour'] = {
  /**
   * DISCO MARTY BLOCK
   * Block to change the colour on a specified region 
   * of both arms, both legs, both feet or all to a preset colour
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MV2_DISCOCHANGEREGIONCOLOUR,
      "category": Blockly.Categories.looks,
      "colour": 164,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "REGION",
          "options": [
            [Blockly.Msg.DROPDOWN_OPTION_ZERO, '0'],
            [Blockly.Msg.DROPDOWN_OPTION_ONE, '1'],
            [Blockly.Msg.DROPDOWN_OPTION_TWO, '2']
          ]
        },
        {
          "type": "field_dropdown",
          "name": "BOARDTYPE",
          "options": [
            [Blockly.Msg.DROPDOWN_OPTION_EYES, '0'],
            [Blockly.Msg.DROPDOWN_OPTION_ARMS, '1'],
            [Blockly.Msg.DROPDOWN_OPTION_FEET, '2'],
            [Blockly.Msg.DROPDOWN_OPTION_ALL, '3']
          ]
        },
        {
          "type": "input_value",
          "name": "COLOR"
        }
      ],
      "extensions": ["shape_statement"]
    });
  }
};


// SOUND

Blockly.Blocks['mv2_playSound'] = {
  /**
   * Block to make Marty play a specified sound
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MV2_PLAYSOUND,
      "category": Blockly.Categories.sound,
      "colour": 164,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "SOUND",
          "options": [
            [Blockly.Msg.DROPDOWN_OPTION_CONFUSIONSOUND, 'confused.raw'],
            [Blockly.Msg.DROPDOWN_OPTION_DISBELIEFSOUND, 'disbelief.raw'],
            [Blockly.Msg.DROPDOWN_OPTION_EXCITEMENTSOUND, 'excited.raw'],
            [Blockly.Msg.DROPDOWN_OPTION_NOWAYSOUND, 'no_way.raw'],
            [Blockly.Msg.DROPDOWN_OPTION_NOSOUND, 'no.raw'],
            [Blockly.Msg.DROPDOWN_OPTION_WHISTLESOUND, 'whistle.raw'],
          ]
        },
      ],
      "extensions": ["shape_statement"]
    });
  }
};

Blockly.Blocks['mv2_playSound_stream'] = {
  /**
   * Block to make Marty play a specified sound
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MV2_PLAYSOUND_STREAM,
      "category": Blockly.Categories.sound,
      "colour": 164,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "SOUND_MENU"
        },
      ],
      "extensions": ["shape_statement"]
    });
  }
};

// SENSING

Blockly.Blocks['BatteryPercentage'] = {
  /**
   * Block to display Marty's battery percentage
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MV2_BATTERYLEVEL,
      "category": Blockly.Categories.sensing,
      "colour": 164,
      "checkboxInFlyout": true,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        }
      ],
      "extensions": ["output_number"]
    });
  }
};

Blockly.Blocks['ServoPosition'] = {
  /**
   * Block to display the position of one of Marty's servos
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MV2_POSITION,
      "category": Blockly.Categories.sensing,
      "colour": 164,
      "checkboxInFlyout": true,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "SERVOCHOICE",
          "options": [
            [Blockly.Msg.DROPDOWN_OPTION_LEFTHIP, '0'],
            [Blockly.Msg.DROPDOWN_OPTION_LEFTTWIST, '1'],
            [Blockly.Msg.DROPDOWN_OPTION_LEFTKNEE, '2'],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHTHIP, '3'],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHTTWIST, '4'],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHTKNEE, '5'],
            [Blockly.Msg.DROPDOWN_OPTION_LEFTARM, '6'],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHTARM, '7'],
            [Blockly.Msg.DROPDOWN_OPTION_EYES, '8']
          ]
        },
      ],
      "extensions": ["output_number"]
    });
  }
};

Blockly.Blocks['ServoCurrent'] = {
  /**
   * Block to display the current through one of Marty's servos
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MV2_CURRENT,
      "category": Blockly.Categories.sensing,
      "colour": 164,
      "checkboxInFlyout": true,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "SERVOCHOICE",
          "options": [
            [Blockly.Msg.DROPDOWN_OPTION_LEFTHIP, '0'],
            [Blockly.Msg.DROPDOWN_OPTION_LEFTTWIST, '1'],
            [Blockly.Msg.DROPDOWN_OPTION_LEFTKNEE, '2'],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHTHIP, '3'],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHTTWIST, '4'],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHTKNEE, '5'],
            [Blockly.Msg.DROPDOWN_OPTION_LEFTARM, '6'],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHTARM, '7'],
            [Blockly.Msg.DROPDOWN_OPTION_EYES, '8']
          ]
        },
      ],
      "extensions": ["output_number"]
    });
  }
};

Blockly.Blocks['XAxisMovement'] = {
  /**
   * Block to display Marty's accelerometer X-axis state
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MV2_ACCELEROMETERX,
      "category": Blockly.Categories.sensing,
      "colour": 164,
      "checkboxInFlyout": true,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        }
      ],
      "extensions": ["output_number"]
    });
  }
};

Blockly.Blocks['YAxisMovement'] = {
  /**
   * Block to display Marty's accelerometer Y-axis state
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MV2_ACCELEROMETERY,
      "category": Blockly.Categories.sensing,
      "colour": 164,
      "checkboxInFlyout": true,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        }
      ],
      "extensions": ["output_number"]
    });
  }
};

Blockly.Blocks['ZAxisMovement'] = {
  /**
   * Block to display Marty's accelerometer Z-axis state
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MV2_ACCELEROMETERZ,
      "category": Blockly.Categories.sensing,
      "colour": 164,
      "checkboxInFlyout": true,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        }
      ],
      "extensions": ["output_number"]
    });
  }
};

Blockly.Blocks['mv2_obstaclesense'] = {
  /**
   * Block to report on obstacle detection from an IR sensor
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MV2_OBSTACLE,
      "category": Blockly.Categories.sensing,
      "colour": 164,
      "checkboxInFlyout": true,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "SENSORCHOICE",
          "options": [
            [Blockly.Msg.DROPDOWN_OPTION_LEFT, 'LeftIRFootTouch'],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHT, 'RightIRFootTouch']
          ]
        },
      ],
      "extensions": ["output_boolean"]
    });
  }
};

Blockly.Blocks['mv2_groundsense'] = {
  /**
   * Block to report on obstacle detection from an IR sensor
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MV2_GROUND,
      "category": Blockly.Categories.sensing,
      "colour": 164,
      "checkboxInFlyout": true,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "SENSORCHOICE",
          "options": [
            [Blockly.Msg.DROPDOWN_OPTION_LEFT, 'LeftIRFootAir'],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHT, 'RightIRFootAir']
          ]
        },
      ],
      "extensions": ["output_boolean"]
    });
  }
};

Blockly.Blocks['mv2_coloursense'] = {
  /**
   * Block to report on colour detection from a colour sensing foot
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MV2_COLOUR,
      "category": Blockly.Categories.sensing,
      "colour": 164,
      "checkboxInFlyout": true,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "SENSORCHOICE",
          "options": [
            [Blockly.Msg.DROPDOWN_OPTION_LEFT, 'LeftColourSensor'],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHT, 'RightColourSensor']
          ]
        },
      ],
      "extensions": ["output_string"]
    });
  }
};

Blockly.Blocks['mv2_coloursenseraw'] = {
  /**
   * Block to report a specific numeric reading from a colour sensor channel
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MV2_COLOUR_RAW,
      "category": Blockly.Categories.sensing,
      "colour": 164,
      "checkboxInFlyout": true,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "SENSORCHOICE",
          "options": [
            [Blockly.Msg.DROPDOWN_OPTION_LEFT, 'LeftColourSensor'],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHT, 'RightColourSensor']
          ]
        },
        {
          "type": "field_dropdown",
          "name": "SENSORCHANNEL",
          "options": [
            [Blockly.Msg.DROPDOWN_OPTION_CLEAR, 'Clear'],
            [Blockly.Msg.DROPDOWN_OPTION_RED, 'Red'],
            [Blockly.Msg.DROPDOWN_OPTION_GREEN, 'Green'],
            [Blockly.Msg.DROPDOWN_OPTION_BLUE, 'Blue'],
          ]
        },
      ],
      "extensions": ["output_number"]
    });
  }
};

Blockly.Blocks['mv2_distancesense'] = {
  /**
   * Block to report on distance sensor
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MV2_DISTANCE,
      "category": Blockly.Categories.sensing,
      "colour": 164,
      "checkboxInFlyout": true,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        },
      ],
      "extensions": ["output_number"]
    });
  }
};

Blockly.Blocks['mv2_lightsense'] = {
  /**
   * Block to report a specific numeric reading from a colour sensor channel
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MV2_LIGHT_SENSOR,
      "category": Blockly.Categories.sensing,
      "colour": 164,
      "checkboxInFlyout": true,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "SENSORCHOICE",
          "options": [
            [Blockly.Msg.DROPDOWN_OPTION_LEFT, 'LeftLightSensor'],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHT, 'RightLightSensor']
          ]
        },
        {
          "type": "field_dropdown",
          "name": "SENSORCHANNEL",
          "options": [
            ['1', 'Reading1'],
            ['2', 'Reading2'],
            ['3', 'Reading3']
          ]
        }
      ],
      "extensions": ["output_number"]
    });
  }
};

Blockly.Blocks['mv2_noisesense'] = {
  /**
   * Block to report on distance sensor
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": Blockly.Msg.MV2_NOISE_SENSOR,
      "category": Blockly.Categories.sensing,
      "colour": 164,
      "checkboxInFlyout": true,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "field_dropdown",
          "name": "SENSORCHOICE",
          "options": [
            [Blockly.Msg.DROPDOWN_OPTION_LEFT, 'LeftNoiseSensor'],
            [Blockly.Msg.DROPDOWN_OPTION_RIGHT, 'RightNoiseSensor']
          ]
        },
      ],
      "extensions": ["output_number"]
    });
  }
};

// MISC/DEBUG

Blockly.Blocks['mv2_demo_sensor'] = {
  /**
   * Block to give readout of demo sensor
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": "%1 %2 Demo sensor",
      "category": Blockly.Categories.sensing,
      "colour": 164,
      "checkboxInFlyout": true,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        }
      ],
      "extensions": ["output_number"]
    });
  }
};

Blockly.Blocks['mv2_set_demo_sensor'] = {
  /**
   * Block to set demo sensor value
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "message0": "%1 %2 Set Demo sensor to %3",
      "category": Blockly.Categories.sensing,
      "colour": 164,
      "args0": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "extensions/marty-small.svg",
          "width": 40,
          "height": 40
        },
        {
          "type": "field_vertical_separator"
        },
        {
          "type": "input_value",
          "name": "SENSORVAL"
        }
      ],
      "extensions": ["shape_statement"]
    });
  }
};
