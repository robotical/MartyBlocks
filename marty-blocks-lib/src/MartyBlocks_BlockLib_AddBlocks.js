
export function MartyBlocks_BlockLib_AddBlocks(Blockly) {

  console.log("MartyBlocks_BlockLib_AddBlocks()");

  Blockly.Categories.mv2 = "mv2";

  Blockly.Colours.mv2 = {
    "primary": "#37ABC8",
    "secondary": "#133C46",
    "tertiary": "#FFDA61"
  };

  // Blockly.Msg.MV2_CONNECTVIAIP ='%1 %2 Connect via IP: %3';

    // Marty V2 Disco Blocks
  Blockly.Msg.MV2_DISCOCHANGEBLOCKCOLOUR = '%1 %2 Set %3 LEDs to %4';
  Blockly.Msg.MV2_DISCOCHANGEREGIONCOLOUR = '%1 %2 Set region %3 on %4 LEDs to %5';
  Blockly.Msg.MV2_DISCOCHANGEBLOCKPATTERN = '%1 %2 Set %3 LEDs to pattern %4';

  // MARTY V2 Motion Blocks
  Blockly.Msg.MV2_GETREADY = '%1 %2 Get ready!';
  Blockly.Msg.MV2_WALK_FW = '%1 %2 Walk %3 steps forwards';
  Blockly.Msg.MV2_WALK_BW = '%1 %2 Walk %3 steps backwards';
  Blockly.Msg.MV2_WALK = '%1 %2 Walk %3 steps with step length %4mm and step time %5s, and turn %6°';
  Blockly.Msg.MV2_TURN = '%1 %2 Turn %3 steps %4';
  Blockly.Msg.MV2_WIGGLE = '%1 %2 Wiggle';
  Blockly.Msg.MV2_CIRCLE = '%1 %2 Circle dance %3 for %4s';
  Blockly.Msg.MV2_KICK = '%1 %2 Kick %3 leg';
  Blockly.Msg.MV2_SLIDE = '%1 %2 Slide %3 times to the %4';
  Blockly.Msg.MV2_LEAN = '%1 %2 Lean %3 for %4s';
  Blockly.Msg.MV2_EYES = '%1 %2 Eyes: %3';
  Blockly.Msg.MV2_MOVELEG = '%1 %2 Move %3 leg %4';
  Blockly.Msg.MV2_LIFTFOOT = '%1 %2 Lift %3 foot';
  Blockly.Msg.MV2_LOWERFOOT = '%1 %2 Lower %3 foot';
  Blockly.Msg.MV2_MOVEJOINT = '%1 %2 Move %3 to %4° in %5s';
  Blockly.Msg.MV2_WAVE = '%1 %2 Wave %3 arm';
  Blockly.Msg.MV2_DANCE = '%1 %2 Dance!';
  Blockly.Msg.MV2_STANDSTRAIGHT = '%1 %2 Stand straight in %3s';
  Blockly.Msg.MV2_HOLD = '%1 %2 Hold this position for %3s';
  Blockly.Msg.MV2_GRIPPERARMBASIC = '%1 %2 %3 gripper';
  Blockly.Msg.MV2_GRIPPERARMTIMED = '%1 %2 %3 gripper in %4s';

  // Operators blocks
  Blockly.Msg.OPERATORS_ADD = '%1 + %2';
  Blockly.Msg.OPERATORS_SUBTRACT = '%1 - %2';
  Blockly.Msg.OPERATORS_MULTIPLY = '%1 * %2';
  Blockly.Msg.OPERATORS_DIVIDE = '%1 / %2';
  Blockly.Msg.OPERATORS_RANDOM = 'pick random %1 to %2';
  Blockly.Msg.OPERATORS_GT = '%1 > %2';
  Blockly.Msg.OPERATORS_LT = '%1 < %2';
  Blockly.Msg.OPERATORS_EQUALS = '%1 = %2';
  Blockly.Msg.OPERATORS_AND = '%1 and %2';
  Blockly.Msg.OPERATORS_OR = '%1 or %2';
  Blockly.Msg.OPERATORS_NOT = 'not %1';
  Blockly.Msg.OPERATORS_JOIN = 'join %1 %2';
  Blockly.Msg.OPERATORS_JOIN_APPLE = 'apple';
  Blockly.Msg.OPERATORS_JOIN_BANANA = 'banana';
  Blockly.Msg.OPERATORS_LETTEROF = 'letter %1 of %2';
  Blockly.Msg.OPERATORS_LETTEROF_APPLE = 'a';
  Blockly.Msg.OPERATORS_LENGTH = 'length of %1';
  Blockly.Msg.OPERATORS_CONTAINS = '%1 contains %2?';
  Blockly.Msg.OPERATORS_MOD = '%1 mod %2';
  Blockly.Msg.OPERATORS_ROUND = 'round %1';
  Blockly.Msg.OPERATORS_MATHOP = '%1 of %2';
  Blockly.Msg.OPERATORS_MATHOP_ABS = 'abs';
  Blockly.Msg.OPERATORS_MATHOP_FLOOR = 'floor';
  Blockly.Msg.OPERATORS_MATHOP_CEILING = 'ceiling';
  Blockly.Msg.OPERATORS_MATHOP_SQRT = 'sqrt';
  Blockly.Msg.OPERATORS_MATHOP_SIN = 'sin';
  Blockly.Msg.OPERATORS_MATHOP_COS = 'cos';
  Blockly.Msg.OPERATORS_MATHOP_TAN = 'tan';
  Blockly.Msg.OPERATORS_MATHOP_ASIN = 'asin';
  Blockly.Msg.OPERATORS_MATHOP_ACOS = 'acos';
  Blockly.Msg.OPERATORS_MATHOP_ATAN = 'atan';
  Blockly.Msg.OPERATORS_MATHOP_LN = 'ln';
  Blockly.Msg.OPERATORS_MATHOP_LOG = 'log';
  Blockly.Msg.OPERATORS_MATHOP_EEXP = 'e ^';
  Blockly.Msg.OPERATORS_MATHOP_10EXP = '10 ^';

  // Procedures blocks
  Blockly.Msg.PROCEDURES_DEFINITION = 'define %1';

  // Sensing blocks
  Blockly.Msg.SENSING_TOUCHINGOBJECT = 'touching %1?';
  Blockly.Msg.SENSING_TOUCHINGOBJECT_POINTER = 'mouse-pointer';
  Blockly.Msg.SENSING_TOUCHINGOBJECT_EDGE = 'edge';
  Blockly.Msg.SENSING_TOUCHINGCOLOR = 'touching color %1?';
  Blockly.Msg.SENSING_COLORISTOUCHINGCOLOR = 'color %1 is touching %2?';
  Blockly.Msg.SENSING_DISTANCETO = 'distance to %1';
  Blockly.Msg.SENSING_DISTANCETO_POINTER = 'mouse-pointer';
  Blockly.Msg.SENSING_ASKANDWAIT = 'ask %1 and wait';
  Blockly.Msg.SENSING_ASK_TEXT = 'What\'s your name?';
  Blockly.Msg.SENSING_ANSWER = 'answer';
  Blockly.Msg.SENSING_KEYPRESSED = 'key %1 pressed?';
  Blockly.Msg.SENSING_MOUSEDOWN = 'mouse down?';
  Blockly.Msg.SENSING_MOUSEX = 'mouse x';
  Blockly.Msg.SENSING_MOUSEY = 'mouse y';
  Blockly.Msg.SENSING_SETDRAGMODE = 'set drag mode %1';
  Blockly.Msg.SENSING_SETDRAGMODE_DRAGGABLE = 'draggable';
  Blockly.Msg.SENSING_SETDRAGMODE_NOTDRAGGABLE = 'not draggable';
  Blockly.Msg.SENSING_LOUDNESS = 'loudness';
  Blockly.Msg.SENSING_LOUD = 'loud?';
  Blockly.Msg.SENSING_TIMER = 'timer';
  Blockly.Msg.SENSING_RESETTIMER = 'reset timer';
  Blockly.Msg.SENSING_OF = '%1 of %2';
  Blockly.Msg.SENSING_OF_XPOSITION = 'x position';
  Blockly.Msg.SENSING_OF_YPOSITION = 'y position';
  Blockly.Msg.SENSING_OF_DIRECTION = 'direction';
  Blockly.Msg.SENSING_OF_COSTUMENUMBER = 'costume #';
  Blockly.Msg.SENSING_OF_COSTUMENAME = 'costume name';
  Blockly.Msg.SENSING_OF_SIZE = 'size';
  Blockly.Msg.SENSING_OF_VOLUME = 'volume';
  Blockly.Msg.SENSING_OF_BACKDROPNUMBER = 'backdrop #';
  Blockly.Msg.SENSING_OF_BACKDROPNAME = 'backdrop name';
  Blockly.Msg.SENSING_OF_STAGE = 'Stage';
  Blockly.Msg.SENSING_CURRENT = 'current %1';
  Blockly.Msg.SENSING_CURRENT_YEAR = 'year';
  Blockly.Msg.SENSING_CURRENT_MONTH = 'month';
  Blockly.Msg.SENSING_CURRENT_DATE = 'date';
  Blockly.Msg.SENSING_CURRENT_DAYOFWEEK = 'day of week';
  Blockly.Msg.SENSING_CURRENT_HOUR = 'hour';
  Blockly.Msg.SENSING_CURRENT_MINUTE = 'minute';
  Blockly.Msg.SENSING_CURRENT_SECOND = 'second';
  Blockly.Msg.SENSING_DAYSSINCE2000 = 'days since 2000';
  Blockly.Msg.SENSING_USERNAME = 'username';
  Blockly.Msg.SENSING_USERID = 'user id';

  // MARTY V2 sensing blocks

  Blockly.Msg.MV2_BATTERYLEVEL = '%1 %2 Remaining battery (%)';
  Blockly.Msg.MV2_POSITION = '%1 %2 Position of %3 joint (in ° from \'zero\')';
  Blockly.Msg.MV2_CURRENT = '%1 %2 Current at %3 joint (in mA)';
  Blockly.Msg.MV2_ACCELEROMETERX = '%1 %2 Accelerometer X';
  Blockly.Msg.MV2_ACCELEROMETERY = '%1 %2 Accelerometer Y';
  Blockly.Msg.MV2_ACCELEROMETERZ = '%1 %2 Accelerometer Z';
  Blockly.Msg.MV2_OBSTACLE = "%1 %2 %3 Foot Obstacle Sensed";
  Blockly.Msg.MV2_GROUND = "%1 %2 %3 Foot sensor on the ground";
  Blockly.Msg.MV2_COLOUR = "%1 %2 %3 Colour Sensor";
  Blockly.Msg.MV2_COLOUR_RAW = "%1 %2 %3 Colour Sensor %4 channel";
  Blockly.Msg.MV2_DISTANCE = "%1 %2 Distance sensor";
  Blockly.Msg.MV2_LIGHT_SENSOR = "%1 %2 %3 Light sensor %4";
  Blockly.Msg.MV2_NOISE_SENSOR = "%1 %2 %3 Noise sensor";

  // Sound blocks
  Blockly.Msg.SOUND_PLAY = 'start sound %1';
  Blockly.Msg.SOUND_PLAYUNTILDONE = 'play sound %1 until done';
  Blockly.Msg.SOUND_STOPALLSOUNDS = 'stop all sounds';
  Blockly.Msg.SOUND_SETEFFECTO = 'set %1 effect to %2';
  Blockly.Msg.SOUND_CHANGEEFFECTBY = 'change %1 effect by %2';
  Blockly.Msg.SOUND_CLEAREFFECTS = 'clear sound effects';
  Blockly.Msg.SOUND_EFFECTS_PITCH = 'pitch';
  Blockly.Msg.SOUND_EFFECTS_PAN = 'pan left/right';
  Blockly.Msg.SOUND_CHANGEVOLUMEBY = 'change volume by %1';
  Blockly.Msg.SOUND_SETVOLUMETO = 'set volume to %1%';
  Blockly.Msg.SOUND_VOLUME = 'volume';
  Blockly.Msg.SOUND_RECORD = 'record...';

  // MARTY V2 sound blocks
  Blockly.Msg.MV2_PLAYSOUND = '%1 %2 Play sound: %3';

  // MARTY V2 block drop-down options
  Blockly.Msg.DROPDOWN_OPTION_LEFT = 'left';
  Blockly.Msg.DROPDOWN_OPTION_RIGHT = 'right';
  Blockly.Msg.DROPDOWN_OPTION_FORWARD = 'forward';
  Blockly.Msg.DROPDOWN_OPTION_BACKWARD = 'backward';
  Blockly.Msg.DROPDOWN_OPTION_OPEN = 'open';
  Blockly.Msg.DROPDOWN_OPTION_CLOSE = 'close';
  Blockly.Msg.DROPDOWN_OPTION_EXCITED = 'excited';
  Blockly.Msg.DROPDOWN_OPTION_WIDE = 'wide';
  Blockly.Msg.DROPDOWN_OPTION_ANGRY = 'angry';
  Blockly.Msg.DROPDOWN_OPTION_NORMAL = 'normal';
  Blockly.Msg.DROPDOWN_OPTION_WIGGLE = 'wiggle';
  Blockly.Msg.DROPDOWN_OPTION_LEFTHIP = 'left hip';
  Blockly.Msg.DROPDOWN_OPTION_LEFTTWIST = 'left twist';
  Blockly.Msg.DROPDOWN_OPTION_LEFTKNEE = 'left knee';
  Blockly.Msg.DROPDOWN_OPTION_RIGHTHIP = 'right hip';
  Blockly.Msg.DROPDOWN_OPTION_RIGHTTWIST = 'right twist';
  Blockly.Msg.DROPDOWN_OPTION_RIGHTKNEE = 'right knee';
  Blockly.Msg.DROPDOWN_OPTION_LEFTARM = 'left arm';
  Blockly.Msg.DROPDOWN_OPTION_RIGHTARM = 'right arm';
  Blockly.Msg.DROPDOWN_OPTION_EYES = 'eyes';
  Blockly.Msg.DROPDOWN_OPTION_ARMS = 'arms';
  Blockly.Msg.DROPDOWN_OPTION_FEET = 'feet';
  Blockly.Msg.DROPDOWN_OPTION_ALL = 'all';
  Blockly.Msg.DROPDOWN_OPTION_CONFUSIONSOUND = 'confusion';
  Blockly.Msg.DROPDOWN_OPTION_DISBELIEFSOUND = 'disbelief';
  Blockly.Msg.DROPDOWN_OPTION_EXCITEMENTSOUND = 'excitement';
  Blockly.Msg.DROPDOWN_OPTION_NOWAYSOUND = 'no way!';
  Blockly.Msg.DROPDOWN_OPTION_NOSOUND = 'no!';
  Blockly.Msg.DROPDOWN_OPTION_WHISTLESOUND = 'whistle';
  Blockly.Msg.DROPDOWN_OPTION_CLEAR = 'clear';
  Blockly.Msg.DROPDOWN_OPTION_RED = 'red';
  Blockly.Msg.DROPDOWN_OPTION_GREEN = 'green';
  Blockly.Msg.DROPDOWN_OPTION_BLUE = 'blue';
  Blockly.Msg.DROPDOWN_OPTION_PINK = 'pink';
  Blockly.Msg.DROPDOWN_OPTION_YELLOW = 'yellow';
  Blockly.Msg.DROPDOWN_OPTION_WHITE = 'white';
  Blockly.Msg.DROPDOWN_OPTION_OFF = 'off';
  Blockly.Msg.DROPDOWN_OPTION_ZERO = '0';
  Blockly.Msg.DROPDOWN_OPTION_ONE = '1';
  Blockly.Msg.DROPDOWN_OPTION_TWO = '2';
  Blockly.Msg.DROPDOWN_OPTION_THREE = '3';

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

}