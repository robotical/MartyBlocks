/**
 * @license
 * Visual Blocks Language
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
 * @fileoverview English strings.
 * @author ascii@media.mit.edu (Andrew Sliwinski)
 *
 * After modifying this file, run `npm run translate` from the root directory
 * to regenerate `./msg/json/en.json`.
 * IMPORTANT:
 * All message strings must use single quotes for the scripts to work properly
 */
'use strict';

goog.provide('Blockly.Msg.en');

goog.require('Blockly.Msg');

// Control blocks
Blockly.Msg.CONTROL_FOREVER = 'forever';
Blockly.Msg.CONTROL_REPEAT = 'repeat %1';
Blockly.Msg.CONTROL_IF = 'if %1 then';
Blockly.Msg.CONTROL_ELSE = 'else';
Blockly.Msg.CONTROL_STOP = 'stop';
Blockly.Msg.CONTROL_STOP_ALL = 'all';
Blockly.Msg.CONTROL_STOP_THIS = 'this script';
Blockly.Msg.CONTROL_STOP_OTHER = 'other scripts in sprite';
Blockly.Msg.CONTROL_WAIT = 'wait %1 seconds';
Blockly.Msg.CONTROL_WAITUNTIL = 'wait until %1';
Blockly.Msg.CONTROL_REPEATUNTIL = 'repeat until %1';
Blockly.Msg.CONTROL_WHILE = 'while %1';
Blockly.Msg.CONTROL_FOREACH = 'for each %1 in %2';
Blockly.Msg.CONTROL_STARTASCLONE = 'when I start as a clone';
Blockly.Msg.CONTROL_CREATECLONEOF = 'create clone of %1';
Blockly.Msg.CONTROL_CREATECLONEOF_MYSELF = 'myself';
Blockly.Msg.CONTROL_DELETETHISCLONE = 'delete this clone';
Blockly.Msg.CONTROL_COUNTER = 'counter';
Blockly.Msg.CONTROL_INCRCOUNTER = 'increment counter';
Blockly.Msg.CONTROL_CLEARCOUNTER = 'clear counter';
Blockly.Msg.CONTROL_ALLATONCE = 'all at once';

// Data blocks
Blockly.Msg.DATA_SETVARIABLETO = 'set %1 to %2';
Blockly.Msg.DATA_CHANGEVARIABLEBY = 'change %1 by %2';
Blockly.Msg.DATA_SHOWVARIABLE = 'show variable %1';
Blockly.Msg.DATA_HIDEVARIABLE = 'hide variable %1';
Blockly.Msg.DATA_ADDTOLIST = 'add %1 to %2';
Blockly.Msg.DATA_DELETEOFLIST = 'delete %1 of %2';
Blockly.Msg.DATA_DELETEALLOFLIST = 'delete all of %1';
Blockly.Msg.DATA_INSERTATLIST = 'insert %1 at %2 of %3';
Blockly.Msg.DATA_REPLACEITEMOFLIST = 'replace item %1 of %2 with %3';
Blockly.Msg.DATA_ITEMOFLIST = 'item %1 of %2';
Blockly.Msg.DATA_ITEMNUMOFLIST = 'item # of %1 in %2';
Blockly.Msg.DATA_LENGTHOFLIST = 'length of %1';
Blockly.Msg.DATA_LISTCONTAINSITEM = '%1 contains %2?';
Blockly.Msg.DATA_SHOWLIST = 'show list %1';
Blockly.Msg.DATA_HIDELIST = 'hide list %1';
Blockly.Msg.DATA_INDEX_ALL = 'all';
Blockly.Msg.DATA_INDEX_LAST = 'last';
Blockly.Msg.DATA_INDEX_RANDOM = 'random';

// Event blocks
Blockly.Msg.EVENT_WHENFLAGCLICKED = 'when %1 clicked';
Blockly.Msg.EVENT_WHENTHISSPRITECLICKED = 'when this sprite clicked';
Blockly.Msg.EVENT_WHENSTAGECLICKED = 'when stage clicked';
Blockly.Msg.EVENT_WHENTOUCHINGOBJECT = 'when this sprite touches %1';
Blockly.Msg.EVENT_WHENBROADCASTRECEIVED = 'when I receive %1';
Blockly.Msg.EVENT_WHENBACKDROPSWITCHESTO = 'when backdrop switches to %1';
Blockly.Msg.EVENT_WHENGREATERTHAN = 'when %1 > %2';
Blockly.Msg.EVENT_WHENGREATERTHAN_TIMER = 'timer';
Blockly.Msg.EVENT_WHENGREATERTHAN_LOUDNESS = 'loudness';
Blockly.Msg.EVENT_BROADCAST = 'broadcast %1';
Blockly.Msg.EVENT_BROADCASTANDWAIT = 'broadcast %1 and wait';
Blockly.Msg.EVENT_WHENKEYPRESSED = 'when %1 key pressed';
Blockly.Msg.EVENT_WHENKEYPRESSED_SPACE = 'space';
Blockly.Msg.EVENT_WHENKEYPRESSED_LEFT = 'left arrow';
Blockly.Msg.EVENT_WHENKEYPRESSED_RIGHT = 'right arrow';
Blockly.Msg.EVENT_WHENKEYPRESSED_DOWN = 'down arrow';
Blockly.Msg.EVENT_WHENKEYPRESSED_UP = 'up arrow';
Blockly.Msg.EVENT_WHENKEYPRESSED_ANY = 'any';

// Looks blocks
Blockly.Msg.LOOKS_SAYFORSECS = 'say %1 for %2 seconds';
Blockly.Msg.LOOKS_SAY = 'say %1';
Blockly.Msg.LOOKS_HELLO = 'Hello!';
Blockly.Msg.LOOKS_THINKFORSECS = 'think %1 for %2 seconds';
Blockly.Msg.LOOKS_THINK = 'think %1';
Blockly.Msg.LOOKS_HMM = 'Hmm...';
Blockly.Msg.LOOKS_SHOW = 'show';
Blockly.Msg.LOOKS_HIDE = 'hide';
Blockly.Msg.LOOKS_HIDEALLSPRITES = 'hide all sprites';
Blockly.Msg.LOOKS_EFFECT_COLOR = 'color';
Blockly.Msg.LOOKS_EFFECT_FISHEYE = 'fisheye';
Blockly.Msg.LOOKS_EFFECT_WHIRL = 'whirl';
Blockly.Msg.LOOKS_EFFECT_PIXELATE = 'pixelate';
Blockly.Msg.LOOKS_EFFECT_MOSAIC = 'mosaic';
Blockly.Msg.LOOKS_EFFECT_BRIGHTNESS = 'brightness';
Blockly.Msg.LOOKS_EFFECT_GHOST = 'ghost';
Blockly.Msg.LOOKS_CHANGEEFFECTBY = 'change %1 effect by %2';
Blockly.Msg.LOOKS_SETEFFECTTO = 'set %1 effect to %2';
Blockly.Msg.LOOKS_CLEARGRAPHICEFFECTS = 'clear graphic effects';
Blockly.Msg.LOOKS_CHANGESIZEBY = 'change size by %1';
Blockly.Msg.LOOKS_SETSIZETO = 'set size to %1 %';
Blockly.Msg.LOOKS_SIZE = 'size';
Blockly.Msg.LOOKS_CHANGESTRETCHBY = 'change stretch by %1';
Blockly.Msg.LOOKS_SETSTRETCHTO = 'set stretch to %1 %';
Blockly.Msg.LOOKS_SWITCHCOSTUMETO = 'switch costume to %1';
Blockly.Msg.LOOKS_NEXTCOSTUME = 'next costume';
Blockly.Msg.LOOKS_SWITCHBACKDROPTO = 'switch backdrop to %1';
Blockly.Msg.LOOKS_GOTOFRONTBACK = 'go to %1 layer';
Blockly.Msg.LOOKS_GOTOFRONTBACK_FRONT = 'front';
Blockly.Msg.LOOKS_GOTOFRONTBACK_BACK = 'back';
Blockly.Msg.LOOKS_GOFORWARDBACKWARDLAYERS = 'go %1 %2 layers';
Blockly.Msg.LOOKS_GOFORWARDBACKWARDLAYERS_FORWARD = 'forward';
Blockly.Msg.LOOKS_GOFORWARDBACKWARDLAYERS_BACKWARD = 'backward';
Blockly.Msg.LOOKS_BACKDROPNUMBERNAME = 'backdrop %1';
Blockly.Msg.LOOKS_COSTUMENUMBERNAME = 'costume %1';
Blockly.Msg.LOOKS_NUMBERNAME_NUMBER = 'number';
Blockly.Msg.LOOKS_NUMBERNAME_NAME = 'name';
Blockly.Msg.LOOKS_SWITCHBACKDROPTOANDWAIT = 'switch backdrop to %1 and wait';
Blockly.Msg.LOOKS_NEXTBACKDROP_BLOCK = 'next backdrop';
Blockly.Msg.LOOKS_NEXTBACKDROP = 'next backdrop';
Blockly.Msg.LOOKS_PREVIOUSBACKDROP = 'previous backdrop';
Blockly.Msg.LOOKS_RANDOMBACKDROP = 'random backdrop';

// Motion blocks
Blockly.Msg.MOTION_MOVESTEPS = 'move %1 steps';
Blockly.Msg.MOTION_TURNLEFT = 'turn %1 %2 degrees';
Blockly.Msg.MOTION_TURNRIGHT = 'turn %1 %2 degrees';
Blockly.Msg.MOTION_POINTINDIRECTION = 'point in direction %1';
Blockly.Msg.MOTION_POINTTOWARDS = 'point towards %1';
Blockly.Msg.MOTION_POINTTOWARDS_POINTER = 'mouse-pointer';
Blockly.Msg.MOTION_POINTTOWARDS_RANDOM = 'random direction';
Blockly.Msg.MOTION_GOTO = 'go to %1';
Blockly.Msg.MOTION_GOTO_POINTER = 'mouse-pointer';
Blockly.Msg.MOTION_GOTO_RANDOM = 'random position';
Blockly.Msg.MOTION_GOTOXY = 'go to x: %1 y: %2';
Blockly.Msg.MOTION_GLIDESECSTOXY = 'glide %1 secs to x: %2 y: %3';
Blockly.Msg.MOTION_GLIDETO = 'glide %1 secs to %2';
Blockly.Msg.MOTION_GLIDETO_POINTER = 'mouse-pointer';
Blockly.Msg.MOTION_GLIDETO_RANDOM = 'random position';
Blockly.Msg.MOTION_CHANGEXBY = 'change x by %1';
Blockly.Msg.MOTION_SETX = 'set x to %1';
Blockly.Msg.MOTION_CHANGEYBY = 'change y by %1';
Blockly.Msg.MOTION_SETY = 'set y to %1';
Blockly.Msg.MOTION_IFONEDGEBOUNCE = 'if on edge, bounce';
Blockly.Msg.MOTION_SETROTATIONSTYLE = 'set rotation style %1';
Blockly.Msg.MOTION_SETROTATIONSTYLE_LEFTRIGHT = 'left-right';
Blockly.Msg.MOTION_SETROTATIONSTYLE_DONTROTATE = 'don\'t rotate';
Blockly.Msg.MOTION_SETROTATIONSTYLE_ALLAROUND = 'all around';
Blockly.Msg.MOTION_XPOSITION = 'x position';
Blockly.Msg.MOTION_YPOSITION = 'y position';
Blockly.Msg.MOTION_DIRECTION = 'direction';
Blockly.Msg.MOTION_SCROLLRIGHT = 'scroll right %1';
Blockly.Msg.MOTION_SCROLLUP = 'scroll up %1';
Blockly.Msg.MOTION_ALIGNSCENE = 'align scene %1';
Blockly.Msg.MOTION_ALIGNSCENE_BOTTOMLEFT = 'bottom-left';
Blockly.Msg.MOTION_ALIGNSCENE_BOTTOMRIGHT = 'bottom-right';
Blockly.Msg.MOTION_ALIGNSCENE_MIDDLE = 'middle';
Blockly.Msg.MOTION_ALIGNSCENE_TOPLEFT = 'top-left';
Blockly.Msg.MOTION_ALIGNSCENE_TOPRIGHT = 'top-right';
Blockly.Msg.MOTION_XSCROLL = 'x scroll';
Blockly.Msg.MOTION_YSCROLL = 'y scroll';
Blockly.Msg.MOTION_STAGE_SELECTED = 'Stage selected: no motion blocks';

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

// Category labels
Blockly.Msg.CATEGORY_MOTION = 'Motion';
Blockly.Msg.CATEGORY_LOOKS = 'Looks';
Blockly.Msg.CATEGORY_SOUND = 'Sound';
Blockly.Msg.CATEGORY_EVENTS = 'Events';
Blockly.Msg.CATEGORY_CONTROL = 'Control';
Blockly.Msg.CATEGORY_SENSING = 'Sensing';
Blockly.Msg.CATEGORY_OPERATORS = 'Operators';
Blockly.Msg.CATEGORY_VARIABLES = 'Variables';
Blockly.Msg.CATEGORY_MYBLOCKS = 'My Blocks';

// Context menus
Blockly.Msg.PYTHON_TRANSPILE = 'Show Python code';
Blockly.Msg.DUPLICATE = 'Duplicate';
Blockly.Msg.DELETE = 'Delete';
Blockly.Msg.ADD_COMMENT = 'Add Comment';
Blockly.Msg.REMOVE_COMMENT = 'Remove Comment';
Blockly.Msg.DELETE_BLOCK = 'Delete Block';
Blockly.Msg.DELETE_X_BLOCKS = 'Delete %1 Blocks';
Blockly.Msg.DELETE_ALL_BLOCKS = 'Delete all %1 blocks?';
Blockly.Msg.CLEAN_UP = 'Clean up Blocks';
Blockly.Msg.HELP = 'Help';
Blockly.Msg.UNDO = 'Undo';
Blockly.Msg.REDO = 'Redo';
Blockly.Msg.EDIT_PROCEDURE = 'Edit';
Blockly.Msg.SHOW_PROCEDURE_DEFINITION = 'Go to definition';
Blockly.Msg.WORKSPACE_COMMENT_DEFAULT_TEXT = 'Say something...';

// Color
Blockly.Msg.COLOUR_HUE_LABEL = 'Color';
Blockly.Msg.COLOUR_SATURATION_LABEL = 'Saturation';
Blockly.Msg.COLOUR_BRIGHTNESS_LABEL = 'Brightness';

// Variables
// @todo Remove these once fully managed by Scratch VM / Scratch GUI
Blockly.Msg.CHANGE_VALUE_TITLE = 'Change value:';
Blockly.Msg.RENAME_VARIABLE = 'Rename variable';
Blockly.Msg.RENAME_VARIABLE_TITLE = 'Rename all "%1" variables to:';
Blockly.Msg.RENAME_VARIABLE_MODAL_TITLE = 'Rename Variable';
Blockly.Msg.NEW_VARIABLE = 'Make a Variable';
Blockly.Msg.NEW_VARIABLE_TITLE = 'New variable name:';
Blockly.Msg.VARIABLE_MODAL_TITLE = 'New Variable';
Blockly.Msg.VARIABLE_ALREADY_EXISTS = 'A variable named "%1" already exists.';
Blockly.Msg.VARIABLE_ALREADY_EXISTS_FOR_ANOTHER_TYPE = 'A variable named "%1" already exists for another variable of type "%2".';
Blockly.Msg.DELETE_VARIABLE_CONFIRMATION = 'Delete %1 uses of the "%2" variable?';
Blockly.Msg.CANNOT_DELETE_VARIABLE_PROCEDURE = 'Can\'t delete the variable "%1" because it\'s part of the definition of the function "%2"';
Blockly.Msg.DELETE_VARIABLE = 'Delete the "%1" variable';

// Custom Procedures
// @todo Remove these once fully managed by Scratch VM / Scratch GUI
Blockly.Msg.NEW_PROCEDURE = 'Make a Block';
Blockly.Msg.PROCEDURE_ALREADY_EXISTS = 'A procedure named "%1" already exists.';
Blockly.Msg.PROCEDURE_DEFAULT_NAME = 'block name';
Blockly.Msg.PROCEDURE_USED = 'To delete a block definition, first remove all uses of the block';

// Lists
// @todo Remove these once fully managed by Scratch VM / Scratch GUI
Blockly.Msg.NEW_LIST = 'Make a List';
Blockly.Msg.NEW_LIST_TITLE = 'New list name:';
Blockly.Msg.LIST_MODAL_TITLE = 'New List';
Blockly.Msg.LIST_ALREADY_EXISTS = 'A list named "%1" already exists.';
Blockly.Msg.RENAME_LIST_TITLE = 'Rename all "%1" lists to:';
Blockly.Msg.RENAME_LIST_MODAL_TITLE = 'Rename List';
Blockly.Msg.DEFAULT_LIST_ITEM = 'thing';
Blockly.Msg.DELETE_LIST = 'Delete the "%1" list';
Blockly.Msg.RENAME_LIST = 'Rename list';

// Broadcast Messages
// @todo Remove these once fully managed by Scratch VM / Scratch GUI
Blockly.Msg.NEW_BROADCAST_MESSAGE = 'New message';
Blockly.Msg.NEW_BROADCAST_MESSAGE_TITLE = 'New message name:';
Blockly.Msg.BROADCAST_MODAL_TITLE = 'New Message';
Blockly.Msg.DEFAULT_BROADCAST_MESSAGE_NAME = 'message1';

// ======= COG Messages =======
// Cog Events
Blockly.Msg.COG_EVENT_BLOCK_ONTILT = '%1 %2 on tilt %3';
Blockly.Msg.COG_EVENT_BLOCK_ONSHAKE = '%1 %2 on shake';
Blockly.Msg.COG_EVENT_BLOCK_ONBUTTONPUSH = '%1 %2 on button press';
Blockly.Msg.COG_EVENT_BLOCK_ONOBJECTSENSED = '%1 %2 on object sensed %3';
Blockly.Msg.COG_EVENT_BLOCK_ONIRMESSAGERECEIVED = '%1 %2 on IR message received %3';

Blockly.Msg.COG_EVENT_BLOCK_ONLIGHTSENSED = '%1 %2 on light sensed';

// Cog Sensing
Blockly.Msg.COG_ACCELEROMETER = '%1 %2 Accelerometer %3';
Blockly.Msg.COG_GYROSCOPE = '%1 %2 Gyroscope %3';
Blockly.Msg.COG_BUTTON_CLICKED = '%1 %2 Button clicked';
Blockly.Msg.COG_BUTTON_FORCE_VALUE = '%1 %2 Button force value';
Blockly.Msg.COG_BUTTON_FORCE_VALUE_PERCENTAGE = '%1 %2 Button force value %';
Blockly.Msg.COG_OBSTACLE_SENSED = '%1 %2 Obstacle sensed %3';
Blockly.Msg.COG_LIGHT_SENSED = '%1 %2 Light sensed';
Blockly.Msg.COG_IR_SENSOR_VALUE = '%1 %2 IR sensor value %3';
Blockly.Msg.COG_AMBIENT_LIGHT_VALUE = '%1 %2 Ambient light value';
Blockly.Msg.COG_SHAKE_SENSED = '%1 %2 Shake Sensed';
Blockly.Msg.COG_TILT_DIRECTION = '%1 %2 Tilt direction';

// Cog Looks
Blockly.Msg.COG_SET_LED_COLOUR_PICKER = '%1 %2 Set LEDs using the ColorPicker %3';
Blockly.Msg.COG_SET_ALL_LEDS = '%1 %2 Set %3 LEDs to %4';
Blockly.Msg.COG_SET_ALL_RING_LEDS = '%1 %2 Set all ring LEDs to %3';
Blockly.Msg.COG_SET_LED = '%1 %2 Set button LED to %3';
Blockly.Msg.COG_SET_LED_TO_COLOUR = '%1 %2 Set LED %3 to %4';
Blockly.Msg.COG_SET_LED_PATTERN = '%1 %2 Set %3 LEDs to pattern %4';
Blockly.Msg.COG_SET_MIDDLE_LED = '%1 %2 Set middle LED to %3';
Blockly.Msg.COG_TURN_OFF_LEDS = '%1 %2 Turn off all LEDs';
Blockly.Msg.COG_PLAY_RTTTL_TUNE = '%1 %2 Play tune %3';
Blockly.Msg.COG_PLAY_NOTE_FOR_TIME = '%1 %2 Play note %3 for %4 seconds';
Blockly.Msg.COG_START_NOTE = '%1 %2 Start note %3';
Blockly.Msg.COG_PLAY_TONE = '%1 %2 Play tone from %3 to %4 Hz for %5 seconds';
Blockly.Msg.COG_SET_PITCH = '%1 %2 Set pitch to %3';
Blockly.Msg.COG_SET_VOLUME = '%1 %2 Set volume to %3';
Blockly.Msg.COG_STOP_SOUNDS = '%1 %2 Stop sounds';
Blockly.Msg.COG_SET_VOLUME_TO_PERCENTAGE = '%1 %2 Set volume to %3%';
Blockly.Msg.COG_PLAY_SOUND_AT_FREQUENCY = '%1 %2 Play sound at frequency %3';

// ====== End of COG Messages ======


// Marty Messages

// Marty new LED eyes blocks
Blockly.Msg.MV2_CHANGELEDEYESBLOCK = '%1 %2 Set %3 LEDs to %4';
Blockly.Msg.MV2_CHANGELEDSEYESBLOCK = '%1 %2 Set %3 using the ColorPicker %4';
Blockly.Msg.MV2_TURNOFFALLLEDS = '%1 %2 Turn off all LEDs';

Blockly.Msg.MV2_CHANGESPECIFICLEDEYESBLOCK = '%1 %2 Set %3 LED %4 to %5';

Blockly.Msg.MV2_RGBOPERATOR = 'red %1 green %2 blue %3';
Blockly.Msg.NEAREST_NOTE = 'nearest note to frequency %1';
Blockly.Msg.MV2_HSLOPERATOR = 'hue %1 saturation %2 lightness %3';

// Marty V2 Disco Blocks
Blockly.Msg.MV2_DISCOCHANGEBLOCKCOLOUR = '%1 %2 Set %3 LEDs to %4';

Blockly.Msg.MV2_DISCOCHANGEBACKCOLOUR = '%1 %2 Set function LED to %3';
Blockly.Msg.MV2_DISCOSETBREATHEBACKCOLOUR = '%1 %2 Set function LED to %3 every %4ms';
Blockly.Msg.MV2_DISCOTURNOFFBACKCOLOUR = '%1 %2 Turn off function LED';

Blockly.Msg.MV2_DISCOCHANGEREGIONCOLOUR = '%1 %2 Set region %3 on %4 LEDs to %5';
Blockly.Msg.MV2_DISCOCHANGEBLOCKPATTERN = '%1 %2 Set %3 LEDs to pattern %4';


// MARTY V2 Motion Blocks
Blockly.Msg.MV2_GETREADY = '%1 %2 Get ready!';
Blockly.Msg.MV2_WALK_FW = '%1 %2 Walk %3 steps forwards';
Blockly.Msg.MV2_WALK_BW = '%1 %2 Walk %3 steps backwards';
Blockly.Msg.MV2_WALK = '%1 %2 Walk %3 steps with step length %4mm and step time %5s, and turn %6deg';
Blockly.Msg.MV2_TURN = '%1 %2 Turn %3 steps %4';
Blockly.Msg.MV2_WIGGLE = '%1 %2 Wiggle';
Blockly.Msg.MV2_CIRCLE = '%1 %2 Circle dance %3 for %4s';
Blockly.Msg.MV2_KICK = '%1 %2 Kick %3 leg';
Blockly.Msg.MV2_SLIDE = '%1 %2 Slide %3 times to the %4';
Blockly.Msg.MV2_SLIDE_MS_LENGTH = '%1 %2 Slide %3 times to the %4 in %5s, length %6';
Blockly.Msg.MV2_LEAN = '%1 %2 Lean %3 for %4s';
Blockly.Msg.MV2_EYES = '%1 %2 Eyes: %3';
Blockly.Msg.MV2_LIFTFOOT = '%1 %2 Lift %3 foot';
Blockly.Msg.MV2_LOWERFOOT = '%1 %2 Lower %3 foot';
Blockly.Msg.MV2_MOVEJOINT = '%1 %2 Move %3 to %4deg in %5s';
Blockly.Msg.MV2_WAVE = '%1 %2 Wave %3 arm';
Blockly.Msg.MV2_DANCE = '%1 %2 Dance!';
Blockly.Msg.MV2_STANDSTRAIGHT = '%1 %2 Stand straight in %3s';
Blockly.Msg.MV2_HOLD = '%1 %2 Hold this position for %3s';
Blockly.Msg.MV2_GRIPPERARMBASIC = '%1 %2 %3 gripper';
Blockly.Msg.MV2_GRIPPERARMTIMED = '%1 %2 %3 gripper in %4s';
Blockly.Msg.MV2_STOP = '%1 %2 Stop Marty %3';
Blockly.Msg.MV2_PAUSE = '%1 %2 Pause movement';
Blockly.Msg.MV2_RESUME = '%1 %2 Resume movement';


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
Blockly.Msg.MV2_POSITION = '%1 %2 Position of %3 joint (in deg from \'zero\')';
Blockly.Msg.MV2_CURRENT = '%1 %2 Current at %3 joint (in mA)';
Blockly.Msg.MV2_ACCELEROMETERX = '%1 %2 Accelerometer X';
Blockly.Msg.MV2_ACCELEROMETERY = '%1 %2 Accelerometer Y';
Blockly.Msg.MV2_ACCELEROMETERZ = '%1 %2 Accelerometer Z';
Blockly.Msg.MV2_MAGNETOMETERX = '%1 %2 Magnetometer X';
Blockly.Msg.MV2_MAGNETOMETERY = '%1 %2 Magnetometer Y';
Blockly.Msg.MV2_MAGNETOMETERZ = '%1 %2 Magnetometer Z';
Blockly.Msg.MV2_OBSTACLE = '%1 %2 %3 Foot Obstacle Sensed';
Blockly.Msg.MV2_GROUND = '%1 %2 %3 Foot sensor on the ground';
Blockly.Msg.MV2_COLOUR = '%1 %2 %3 Color Sensor';
Blockly.Msg.MV2_COLOUR_HEX = '%1 %2 %3 Color Sensor HEX';
Blockly.Msg.MV2_COLOUR_RAW = '%1 %2 %3 Color Sensor %4 channel';
Blockly.Msg.MV2_DISTANCE = '%1 %2 Distance sensor';
Blockly.Msg.MV2_LIGHT_SENSOR = '%1 %2 %3 Light sensor %4';
Blockly.Msg.MV2_NOISE_SENSOR = '%1 %2 %3 Noise sensor';

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

Blockly.Msg.MV2_SOUND_CHANGEEFFECTBY = '%1 %2 Change %3 effect by %4';
Blockly.Msg.MV2_SOUND_SETEFFECTO = '%1 %2 Set %3 effect to %4';
Blockly.Msg.MV2_SOUND_CLEAREFFECTS = '%1 %2 Clear sound effects';
Blockly.Msg.MV2_SOUND_CHANGEVOLUMEBY = '%1 %2 Change volume by %3';
Blockly.Msg.MV2_SOUND_SETVOLUMETO = '%1 %2 Set volume to %3%';

// MARTY V2 sound blocks
Blockly.Msg.MV2_PLAYSOUND = '%1 %2 Start sound: %3';
Blockly.Msg.MV2_PLAYSOUNDUNTILDONE = '%1 %2 Play sound: %3 until done';
Blockly.Msg.MV2_PLAYNOTE = '%1 %2 Play note: %3';
Blockly.Msg.MV2_PLAYTONE = '%1 %2 Play tone from: %3 to: %4 Hz in: %5 seconds';
Blockly.Msg.MV2_STOPSOUNDS = '%1 %2 Stop all sounds';


// MARTY V2 block drop-down options
// MARTY V2 sensing blocks options
Blockly.Msg.DROPDOWN_OPTION_SELECT  = 'Select';
Blockly.Msg.DROPDOWN_OPTION_NO_LED_ADDONS_FOUND = 'No LED addons found';

Blockly.Msg.DROPDOWN_OPTION_STOP_IMMEDIATELY = 'immediately';
Blockly.Msg.DROPDOWN_OPTION_STOP_AFTER_MOVE = 'after move';
Blockly.Msg.DROPDOWN_OPTION_LEDEYESLEFT = 'Left eye';
Blockly.Msg.DROPDOWN_OPTION_LEDEYESRIGHT = 'Right eye';
Blockly.Msg.DROPDOWN_OPTION_PATTERN_PINWHEEL = 'pinwheel';
Blockly.Msg.DROPDOWN_OPTION_PATTERN_SHOWOFF = 'show-off';

Blockly.Msg.DROPDOWN_OPTION_RING = 'ring';
Blockly.Msg.DROPDOWN_OPTION_BUTTON = 'button';
Blockly.Msg.DROPDOWN_OPTION_INDICATOR = 'indicator';

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
Blockly.Msg.DROPDOWN_OPTION_BOTH_EYES = 'Both eyes';
Blockly.Msg.DROPDOWN_OPTION_BOTH_ARMS = 'Both arms';
Blockly.Msg.DROPDOWN_OPTION_BOTH_FEET = 'Both feet';
Blockly.Msg.DROPDOWN_OPTION_ALL = 'all';
Blockly.Msg.DROPDOWN_OPTION_CONFUSIONSOUND = 'confusion';
Blockly.Msg.DROPDOWN_OPTION_DISBELIEFSOUND = 'disbelief';
Blockly.Msg.DROPDOWN_OPTION_EXCITEMENTSOUND = 'excitement';
Blockly.Msg.DROPDOWN_OPTION_NOWAYSOUND = 'no way!';
Blockly.Msg.DROPDOWN_OPTION_NOSOUND = 'no!';
Blockly.Msg.DROPDOWN_OPTION_WHISTLESOUND = 'whistle';

// Notes
Blockly.Msg.DROPDOWN_OPTION_ABASSNOTE = 'A Bass';
Blockly.Msg.DROPDOWN_OPTION_AELECBASSNOTE = 'A Elec Bass';
Blockly.Msg.DROPDOWN_OPTION_AELECGUITARNOTE = 'A Elec Guitar';
Blockly.Msg.DROPDOWN_OPTION_AELECPIANONOTE = 'A Elec Piano';
Blockly.Msg.DROPDOWN_OPTION_AGUITARNOTE = 'A Guitar';
Blockly.Msg.DROPDOWN_OPTION_AMINORUKULELENOTE = 'A minor Ukulele';
Blockly.Msg.DROPDOWN_OPTION_APIANONOTE = 'A Piano';
Blockly.Msg.DROPDOWN_OPTION_ASAXNOTE = 'A Sax';
Blockly.Msg.DROPDOWN_OPTION_ATROMBONENOTE = 'A Trombone';
Blockly.Msg.DROPDOWN_OPTION_ATRUMPETNOTE = 'A Trumpet';
Blockly.Msg.DROPDOWN_OPTION_BBASSNOTE = 'B Bass';
Blockly.Msg.DROPDOWN_OPTION_BELECBASSNOTE = 'B Elec Bass';
Blockly.Msg.DROPDOWN_OPTION_BELECGUITARNOTE = 'B Elec Guitar';
Blockly.Msg.DROPDOWN_OPTION_BELECPIANONOTE = 'B Elec Piano';
Blockly.Msg.DROPDOWN_OPTION_BGUITARNOTE = 'B Guitar';
Blockly.Msg.DROPDOWN_OPTION_BMINORUKULELENOTE = 'B minor Ukulele';
Blockly.Msg.DROPDOWN_OPTION_BPIANONOTE = 'B Piano';
Blockly.Msg.DROPDOWN_OPTION_BSAXNOTE = 'B Sax';
Blockly.Msg.DROPDOWN_OPTION_BTROMBONENOTE = 'B Trombone';
Blockly.Msg.DROPDOWN_OPTION_BTRUMPETNOTE = 'B Trumpet';
Blockly.Msg.DROPDOWN_OPTION_CBASSNOTE = 'C Bass';
Blockly.Msg.DROPDOWN_OPTION_CELECBASSNOTE = 'C Elec Bass';
Blockly.Msg.DROPDOWN_OPTION_CELECGUITARNOTE = 'C Elec Guitar';
Blockly.Msg.DROPDOWN_OPTION_CELECPIANONOTE = 'C Elec Piano';
Blockly.Msg.DROPDOWN_OPTION_CGUITARNOTE = 'C Guitar';
Blockly.Msg.DROPDOWN_OPTION_CMAJORUKULELENOTE = 'C major Ukulele';
Blockly.Msg.DROPDOWN_OPTION_CPIANONOTE = 'C Piano';
Blockly.Msg.DROPDOWN_OPTION_CSAXNOTE = 'C Sax';
Blockly.Msg.DROPDOWN_OPTION_CTROMBONENOTE = 'C Trombone';
Blockly.Msg.DROPDOWN_OPTION_CTRUMPETNOTE = 'C Trumpet';
Blockly.Msg.DROPDOWN_OPTION_DBASSNOTE = 'D Bass';
Blockly.Msg.DROPDOWN_OPTION_DELECBASSNOTE = 'D Elec Bass';
Blockly.Msg.DROPDOWN_OPTION_DELECGUITARNOTE = 'D Elec Guitar';
Blockly.Msg.DROPDOWN_OPTION_DELECPIANONOTE = 'D Elec Piano';
Blockly.Msg.DROPDOWN_OPTION_DGUITARNOTE = 'D Guitar';
Blockly.Msg.DROPDOWN_OPTION_DMINORUKULELENOTE = 'D minor Ukulele';
Blockly.Msg.DROPDOWN_OPTION_DPIANONOTE = 'D Piano';
Blockly.Msg.DROPDOWN_OPTION_DSAXNOTE = 'D Sax';
Blockly.Msg.DROPDOWN_OPTION_DTROMBONENOTE = 'D Trombone';
Blockly.Msg.DROPDOWN_OPTION_DTRUMPETNOTE = 'D Trumpet';
Blockly.Msg.DROPDOWN_OPTION_EBASSNOTE = 'E Bass';
Blockly.Msg.DROPDOWN_OPTION_EELECBASSNOTE = 'E Elec Bass';
Blockly.Msg.DROPDOWN_OPTION_EELECGUITARNOTE = 'E Elec Guitar';
Blockly.Msg.DROPDOWN_OPTION_EELECPIANONOTE = 'E Elec Piano';
Blockly.Msg.DROPDOWN_OPTION_EGUITARNOTE = 'E Guitar';
Blockly.Msg.DROPDOWN_OPTION_EMINORUKULELENOTE = 'E minor Ukulele';
Blockly.Msg.DROPDOWN_OPTION_EPIANONOTE = 'E Piano';
Blockly.Msg.DROPDOWN_OPTION_ESAXNOTE = 'E Sax';
Blockly.Msg.DROPDOWN_OPTION_ETROMBONENOTE = 'E Trombone';
Blockly.Msg.DROPDOWN_OPTION_ETRUMPETNOTE = 'E Trumpet';
Blockly.Msg.DROPDOWN_OPTION_FBASSNOTE = 'F Bass';
Blockly.Msg.DROPDOWN_OPTION_FELECBASSNOTE = 'F Elec Bass';
Blockly.Msg.DROPDOWN_OPTION_FELECGUITARNOTE = 'F Elec Guitar';
Blockly.Msg.DROPDOWN_OPTION_FELECPIANONOTE = 'F Elec Piano';
Blockly.Msg.DROPDOWN_OPTION_FGUITARNOTE = 'F Guitar';
Blockly.Msg.DROPDOWN_OPTION_FMAJORUKULELENOTE = 'F major Ukulele';
Blockly.Msg.DROPDOWN_OPTION_FPIANONOTE = 'F Piano';
Blockly.Msg.DROPDOWN_OPTION_FSAXNOTE = 'F Sax';
Blockly.Msg.DROPDOWN_OPTION_FTROMBONENOTE = 'F Trombone';
Blockly.Msg.DROPDOWN_OPTION_FTRUMPETNOTE = 'F Trumpet';
Blockly.Msg.DROPDOWN_OPTION_GBASSNOTE = 'G Bass';
Blockly.Msg.DROPDOWN_OPTION_GELECBASSNOTE = 'G Elec Bass';
Blockly.Msg.DROPDOWN_OPTION_GELECGUITARNOTE = 'G Elec Guitar';
Blockly.Msg.DROPDOWN_OPTION_GELECPIANONOTE = 'G Elec Piano';
Blockly.Msg.DROPDOWN_OPTION_GGUITARNOTE = 'G Guitar';
Blockly.Msg.DROPDOWN_OPTION_GUKULELENOTE = 'G Ukulele';
Blockly.Msg.DROPDOWN_OPTION_GPIANONOTE = 'G Piano';
Blockly.Msg.DROPDOWN_OPTION_GSAXNOTE = 'G Sax';
Blockly.Msg.DROPDOWN_OPTION_GTROMBONENOTE = 'G Trombone';
Blockly.Msg.DROPDOWN_OPTION_GTRUMPETNOTE = 'G Trumpet';

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
Blockly.Msg.DROPDOWN_OPTION_THREE = 'off';

Blockly.Msg.DROPDOWN_OPTION_EITHER = 'either';
Blockly.Msg.DROPDOWN_OPTION_CLOCKWISE = 'clockwise';
Blockly.Msg.DROPDOWN_OPTION_ANTICLOCKWISE = 'anticlockwise';
Blockly.Msg.DROPDOWN_OPTION_MOVE = 'move';
Blockly.Msg.DROPDOWN_OPTION_SHAKE = 'shake';
Blockly.Msg.DROPDOWN_OPTION_X = 'X';
Blockly.Msg.DROPDOWN_OPTION_Y = 'Y';
Blockly.Msg.DROPDOWN_OPTION_Z = 'Z';
Blockly.Msg.DROPDOWN_OPTION_FLASH = 'Flash';
Blockly.Msg.DROPDOWN_OPTION_RAINBOW = 'Rainbow';
Blockly.Msg.DROPDOWN_OPTION_SPIN = 'Spin';
Blockly.Msg.DROPDOWN_OPTION_SPIN1 = 'Spin1';
Blockly.Msg.DROPDOWN_OPTION_SPIN2 = 'Spin2';
Blockly.Msg.DROPDOWN_OPTION_SPIN3 = 'Spin3';
Blockly.Msg.DROPDOWN_OPTION_SPIN4 = 'Spin4';
Blockly.Msg.DROPDOWN_OPTION_SPIN5 = 'Spin5';
Blockly.Msg.DROPDOWN_OPTION_SPIN6 = 'Spin6';
Blockly.Msg.DROPDOWN_OPTION_SPIN7 = 'Spin7';
Blockly.Msg.DROPDOWN_OPTION_SPIN8 = 'Spin8';

Blockly.Msg.DROPDOWN_OPTION_NOTEC4 = 'C4';
Blockly.Msg.DROPDOWN_OPTION_NOTECSHARP4 = 'C#4';
Blockly.Msg.DROPDOWN_OPTION_NOTED4 = 'D4';
Blockly.Msg.DROPDOWN_OPTION_NOTEDSHARP4 = 'D#4';
Blockly.Msg.DROPDOWN_OPTION_NOTEE4 = 'E4';
Blockly.Msg.DROPDOWN_OPTION_NOTEF4 = 'F4';
Blockly.Msg.DROPDOWN_OPTION_NOTEFSHARP4 = 'F#4';
Blockly.Msg.DROPDOWN_OPTION_NOTEG4 = 'G4';
Blockly.Msg.DROPDOWN_OPTION_NOTEGSHARP4 = 'G#4';
Blockly.Msg.DROPDOWN_OPTION_NOTEA4 = 'A4';
Blockly.Msg.DROPDOWN_OPTION_NOTEASHARP4 = 'A#4';
Blockly.Msg.DROPDOWN_OPTION_NOTEB4 = 'B4';
Blockly.Msg.DROPDOWN_OPTION_NOTEC5 = 'C5';
Blockly.Msg.DROPDOWN_OPTION_NOTECSHARP5 = 'C#5';
Blockly.Msg.DROPDOWN_OPTION_NOTED5 = 'D5';
Blockly.Msg.DROPDOWN_OPTION_NOTEDSHARP5 = 'D#5';
Blockly.Msg.DROPDOWN_OPTION_NOTEE5 = 'E5';
Blockly.Msg.DROPDOWN_OPTION_NOTEF5 = 'F5';
Blockly.Msg.DROPDOWN_OPTION_NOTEFSHARP5 = 'F#5';
Blockly.Msg.DROPDOWN_OPTION_NOTEG5 = 'G5';
Blockly.Msg.DROPDOWN_OPTION_NOTEGSHARP5 = 'G#5';
Blockly.Msg.DROPDOWN_OPTION_NOTEA5 = 'A5';
Blockly.Msg.DROPDOWN_OPTION_NOTEASHARP5 = 'A#5';
Blockly.Msg.DROPDOWN_OPTION_NOTEB5 = 'B5';
Blockly.Msg.DROPDOWN_OPTION_NOTEC6 = 'C6';
Blockly.Msg.DROPDOWN_OPTION_NOTECSHARP6 = 'C#6';
Blockly.Msg.DROPDOWN_OPTION_NOTED6 = 'D6';
Blockly.Msg.DROPDOWN_OPTION_NOTEDSHARP6 = 'D#6';
Blockly.Msg.DROPDOWN_OPTION_NOTEE6 = 'E6';
Blockly.Msg.DROPDOWN_OPTION_NOTEF6 = 'F6';
Blockly.Msg.DROPDOWN_OPTION_NOTEFSHARP6 = 'F#6';
Blockly.Msg.DROPDOWN_OPTION_NOTEG6 = 'G6';
Blockly.Msg.DROPDOWN_OPTION_NOTEGSHARP6 = 'G#6';
Blockly.Msg.DROPDOWN_OPTION_NOTEA6 = 'A6';
Blockly.Msg.DROPDOWN_OPTION_NOTEASHARP6 = 'A#6';
Blockly.Msg.DROPDOWN_OPTION_NOTEB6 = 'B6';
Blockly.Msg.DROPDOWN_OPTION_NOTEC7 = 'C7';
Blockly.Msg.DROPDOWN_OPTION_NOTECSHARP7 = 'C#7';
Blockly.Msg.DROPDOWN_OPTION_NOTED7 = 'D7';
Blockly.Msg.DROPDOWN_OPTION_NOTEDSHARP7 = 'D#7';
Blockly.Msg.DROPDOWN_OPTION_NOTEE7 = 'E7';
Blockly.Msg.DROPDOWN_OPTION_NOTEF7 = 'F7';
Blockly.Msg.DROPDOWN_OPTION_NOTEFSHARP7 = 'F#7';
Blockly.Msg.DROPDOWN_OPTION_NOTEG7 = 'G7';
Blockly.Msg.DROPDOWN_OPTION_NOTEGSHARP7 = 'G#7';
Blockly.Msg.DROPDOWN_OPTION_NOTEA7 = 'A7';
Blockly.Msg.DROPDOWN_OPTION_NOTEASHARP7 = 'A#7';
Blockly.Msg.DROPDOWN_OPTION_NOTEB7 = 'B7';





Blockly.Msg.COLOUR_RED = 'Red';
Blockly.Msg.COLOUR_YELLOW = 'Yellow';
Blockly.Msg.COLOUR_GREEN = 'Green';
Blockly.Msg.COLOUR_CYAN = 'Cyan';
Blockly.Msg.COLOUR_BLUE = 'Blue';
Blockly.Msg.COLOUR_PURPLE = 'Purple';
Blockly.Msg.COLOUR_PINK = 'Pink';

