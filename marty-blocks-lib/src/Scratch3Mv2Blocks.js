const Mv2Interface = require("./Mv2Interface");
const MartyMachine = require("./MartyMachine");
const MSTTesting = require("./MSTTesting");
const lamejs = require("./lame-all");
const { default: isVersionGreater } = require("./versionChecker");
const Cast = require("./util/cast");
const Color = require("./util/color");
// const meSpeak = require("./util/mespeak"); // for text to speech locally -- removed as we don't use it anymore
const { Project } = require("@robotical/scratch-to-python-transpiler");


mv2Interface = new Mv2Interface();
mstTesting = new MSTTesting(mv2Interface);
martyMachine = new MartyMachine();
pythonTranspiler = Project;

const LED_EYES_FW_VERSION = "1.2.0"; // greater versions than this support the LED_EYE functionality

// making sure that the magnetometer notification is only shown once
let hasMagnetometerNotificationBeenShown = false;

// device type IDs for Robotical Standard Add-ons
const RIC_WHOAMI_TYPE_CODE_ADDON_DISTANCE = "VCNL4200";
const RIC_WHOAMI_TYPE_CODE_ADDON_LIGHT = "lightsensor";
const RIC_WHOAMI_TYPE_CODE_ADDON_COLOUR = "coloursensor";
const RIC_WHOAMI_TYPE_CODE_ADDON_IRFOOT = "IRFoot";
const RIC_WHOAMI_TYPE_CODE_ADDON_LEDFOOT = "LEDfoot";
const RIC_WHOAMI_TYPE_CODE_ADDON_LEDARM = "LEDarm";
const RIC_WHOAMI_TYPE_CODE_ADDON_LEDEYE = "LEDeye";
const RIC_WHOAMI_TYPE_CODE_ADDON_NOISE = "noisesensor";
const RIC_WHOAMI_TYPE_CODE_ADDON_GRIPSERVO = "roboservo3";
/**
 * Questions:
 * - what is the util parameter for? // irrelevant
 * - what are the minimum moveTimes for various actions?
 * - in the requirements (18/05) - "Lower Legs" and new dances are mentioned - do these require new API commands?
 * - clarify reps - can be added to any function (and therefore block)? // this is fine
 * - clarify the categorisations!!!
 * Missing/non-functional Blocks:
 * - get ready (is this still necessary?)
 * - stop - what are various stop options (and what are the appropriate API calls?)
 * - lift/lower legs - API calls?
 * - Battery voltage
 * - GPIO in (do we need this?)
 * - blocking mode (???)
 */

class Scratch3Mv2Blocks {
  constructor(runtime) {
    /**
     * The runtime instantiating this block package.
     * @type {Runtime}
     */
    this.runtime = runtime;
  }

  /**
   * Retrieve the block primitives implemented by this package.
   * @return {object.<string, Function>} Mapping of opcode to Function.
   */
  getPrimitives() {
    return {
      // motion commands

      mv2_getReady: (args, utils) =>
        this._martyIsConnectedWrapper(this.getReady.bind(this, args, utils)),
      mv2_walk_fw: (args, utils) =>
        this._martyIsConnectedWrapper(this.walk_fw.bind(this, args, utils)),
      mv2_walk_bw: (args, utils) =>
        this._martyIsConnectedWrapper(this.walk_bw.bind(this, args, utils)),
      mv2_walk: (args, utils) =>
        this._martyIsConnectedWrapper(this.walk.bind(this, args, utils)),
      mv2_turn: (args, utils) =>
        this._martyIsConnectedWrapper(this.turn.bind(this, args, utils)),
      mv2_stop: (args, utils) =>
        this._martyIsConnectedWrapper(this.stop.bind(this, args, utils)),
      mv2_pause: (args, utils) =>
        this._martyIsConnectedWrapper(this.pause.bind(this, args, utils)),
      mv2_resume: (args, utils) =>
        this._martyIsConnectedWrapper(this.resume.bind(this, args, utils)),
      mv2_wiggle: (args, utils) =>
        this._martyIsConnectedWrapper(this.wiggle.bind(this, args, utils)),
      mv2_circle: (args, utils) =>
        this._martyIsConnectedWrapper(this.circle.bind(this, args, utils)),
      mv2_kick: (args, utils) =>
        this._martyIsConnectedWrapper(this.kick.bind(this, args, utils)),
      mv2_lean: (args, utils) =>
        this._martyIsConnectedWrapper(this.lean.bind(this, args, utils)),
      mv2_slide: (args, utils) =>
        this._martyIsConnectedWrapper(this.slide.bind(this, args, utils)),
      mv2_slideMsLength: (args, utils) =>
        this._martyIsConnectedWrapper(
          this.slideMsLength.bind(this, args, utils)
        ),
      mv2_eyes: (args, utils) =>
        this._martyIsConnectedWrapper(this.eyes.bind(this, args, utils)),
      mv2_moveLeg: (args, utils) =>
        this._martyIsConnectedWrapper(this.moveLeg.bind(this, args, utils)),
      mv2_liftFoot: (args, utils) =>
        this._martyIsConnectedWrapper(this.liftFoot.bind(this, args, utils)),
      mv2_lowerFoot: (args, utils) =>
        this._martyIsConnectedWrapper(this.lowerFoot.bind(this, args, utils)),
      mv2_moveJoint: (args, utils) =>
        this._martyIsConnectedWrapper(this.moveJoint.bind(this, args, utils)),
      mv2_wave: (args, utils) =>
        this._martyIsConnectedWrapper(this.wave.bind(this, args, utils)),
      mv2_dance: (args, utils) =>
        this._martyIsConnectedWrapper(this.dance.bind(this, args, utils)),
      mv2_standStraight: (args, utils) =>
        this._martyIsConnectedWrapper(
          this.standStraight.bind(this, args, utils)
        ),
      mv2_hold: (args, utils) =>
        this._martyIsConnectedWrapper(this.hold.bind(this, args, utils)),
      mv2_gripperArmBasic: (args, utils) =>
        this._martyIsConnectedWrapper(
          this.gripperArmBasic.bind(this, args, utils)
        ),
      mv2_gripperArmTimed: (args, utils) =>
        this._martyIsConnectedWrapper(
          this.gripperArmTimed.bind(this, args, utils)
        ),

      // looks
      mv2_discoChangeBackColour: (args, utils) =>
        this._martyIsConnectedWrapper(
          this.discoChangeBackColour.bind(this, args, utils)
        ),
      mv2_discoSetBreatheBackColour: (args, utils) =>
        this._martyIsConnectedWrapper(
          this.discoSetBreatheBackColour.bind(this, args, utils)
        ),
      mv2_discoTurnOffBackColour: (args, utils) =>
        this._martyIsConnectedWrapper(
          this.discoTurnOffBackColour.bind(this, args, utils)
        ),
      mv2_LEDEyesColour: (args, utils) =>
        this._martyIsConnectedWrapper(
          this.LEDEyesColour.bind(this, args, utils)
        ),
      mv2_LEDEyesColourLEDs: (args, utils) =>
        this._martyIsConnectedWrapper(
          this.LEDEyesColourLEDs.bind(this, args, utils)
        ),
      mv2_LEDEyesColour_SpecificLED: (args, utils) =>
        this._martyIsConnectedWrapper(
          this.LEDEyesColour_SpecificLED.bind(this, args, utils)
        ),
      mv2_RGBOperator: (args, utils) =>
        this._martyIsConnectedWrapper(this.RGBOperator.bind(this, args, utils)),
      mv2_HSLOperator: (args, utils) =>
        this._martyIsConnectedWrapper(this.HSLOperator.bind(this, args, utils)),
      mv2_discoChangeBlockPattern: (args, utils) =>
        this._martyIsConnectedWrapper(
          this.discoChangeBlockPattern.bind(this, args, utils)
        ),
      mv2_discoChangeRegionColour: (args, utils) =>
        this._martyIsConnectedWrapper(
          this.discoChangeRegionColour.bind(this, args, utils)
        ),
      mv2_turnAllLEDsOff: (args, utils) =>
        this._martyIsConnectedWrapper(
          this.turnAllLEDsOff.bind(this, args, utils)
        ),

      // sensors

      ServoPosition: (args, utils) =>
        this.errorHandler(this.position.bind(this, args, utils)),
      ServoCurrent: (args, utils) =>
        this.errorHandler(this.current.bind(this, args, utils)),
      XAxisMovement: (args, utils) =>
        this.errorHandler(this.accelerometerX.bind(this, args, utils)),
      YAxisMovement: (args, utils) =>
        this.errorHandler(this.accelerometerY.bind(this, args, utils)),
      ZAxisMovement: (args, utils) =>
        this.errorHandler(this.accelerometerZ.bind(this, args, utils)),
      XAxisMagnetometer: (args, utils) =>
        this.errorHandler(this.magnetometerX.bind(this, args, utils)),
      YAxisMagnetometer: (args, utils) =>
        this.errorHandler(this.magnetometerY.bind(this, args, utils)),
      ZAxisMagnetometer: (args, utils) =>
        this.errorHandler(this.magnetometerZ.bind(this, args, utils)),
      ObstacleProximity: (args, utils) =>
        this.errorHandler(this.proximity.bind(this, args, utils)),
      BatteryPercentage: (args, utils) =>
        this.errorHandler(this.batteryLevel.bind(this, args, utils)),
      mv2_obstaclesense: (args, utils) =>
        this.errorHandler(this.obstacleSense.bind(this, args, utils)),
      mv2_groundsense: (args, utils) =>
        this.errorHandler(this.groundSense.bind(this, args, utils)),
      mv2_coloursense: (args, utils) =>
        this.errorHandler(this.colourSense.bind(this, args, utils)),
      mv2_coloursense_hex: (args, utils) =>
        this.errorHandler(this.colourSenseHEX.bind(this, args, utils)),
      mv2_coloursenseraw: (args, utils) =>
        this.errorHandler(this.colourSenseRaw.bind(this, args, utils)),
      mv2_distancesense: (args, utils) =>
        this.errorHandler(this.distanceSense.bind(this, args, utils)),
      mv2_lightsense: (args, utils) =>
        this.errorHandler(this.lightSense.bind(this, args, utils)),
      mv2_noisesense: (args, utils) =>
        this.errorHandler(this.noiseSense.bind(this, args, utils)),

      // sound commands

      // mv2_playSound: (args, utils) => this._martyIsConnectedWrapper(this.playSound.bind(this, args, utils)),
      mv2_playSound: this.playSound,

      mv2_playSoundUntilDone: this.playSoundUntilDone,

      mv2_playNote: (args, utils) =>
        this._martyIsConnectedWrapper(this.playNote.bind(this, args, utils)),
      mv2_playTone: (args, utils) =>
        this._martyIsConnectedWrapper(this.playTone.bind(this, args, utils)),
      mv2_stopSounds: (args, utils) =>
        this._martyIsConnectedWrapper(this.stopSounds.bind(this, args, utils)),

      mv2_changePitchEffect: (args, utils) =>
        this._martyIsConnectedWrapper(
          window.vm.runtime._primitives.sound_changeeffectby.bind(
            this,
            args,
            utils
          )
        ),
      mv2_setPitchEffect: (args, utils) =>
        this._martyIsConnectedWrapper(
          window.vm.runtime._primitives.sound_seteffectto.bind(
            this,
            args,
            utils
          )
        ),
      mv2_clearSoundEffects: (args, utils) =>
        this._martyIsConnectedWrapper(
          window.vm.runtime._primitives.sound_cleareffects.bind(
            this,
            args,
            utils
          )
        ),
      mv2_changeVolume: (args, utils) =>
        this._martyIsConnectedWrapper(
          window.vm.runtime._primitives.sound_changevolumeby.bind(
            this,
            args,
            utils
          )
        ),
      mv2_setVolume: (args, utils) =>
        this._martyIsConnectedWrapper(
          window.vm.runtime._primitives.sound_setvolumeto.bind(
            this,
            args,
            utils
          )
        ),

      // misc/debugging commands (including proposed/deprecated blocks)

      mv2_demo_sensor: (args, utils) =>
        this._martyIsConnectedWrapper(this.demo_sensor.bind(this, args, utils)),
      mv2_set_demo_sensor: (args, utils) =>
        this._martyIsConnectedWrapper(
          this.set_demo_sensor.bind(this, args, utils)
        ),
      mv2_set_ip: (args, utils) =>
        this._martyIsConnectedWrapper(this.set_ip.bind(this, args, utils)),

      /* mv2_kickLeft: this.kickLeft,

            mv2_sidefall: this.sidefall,
            mv2_stepLeft: this.stepLeft,
            mv2_stepRight: this.stepRight,
            mv2_sidestepLeft: this.sidestepLeft,
            mv2_sidestepRight: this.sidestepRight,
            mv2_circleLeft: this.circleLeft,
            mv2_stop: this.stop,
            mv2_circleRight: this.circleRight,
            mv2_waveLeft: this.waveLeft,
            mv2_waveRight: this.waveRight,
            mv2_kickRight: this.kickRight, */
    };
  }

  errorHandler(func) {
    try {
      return func();
    } catch (e) {
      console.log(e);
      try {
        const errorObj = {
          message: e.message,
          name: e.name,
          stack: e.stack,
        };
        const msg = JSON.stringify(errorObj);
        mv2Interface.sendFeedbackToServer(msg);
      } catch (err) {
        console.log("error sending feedback", e);
      }
    }
  }

  _martyIsConnectedWrapper(martyBlock) {
    if (!mv2Interface.isConnected) {
      window.vm.runtime.stopAll();
      return mv2Interface.send_REST(
        "notification/warn-message/You are not currently connected to a Marty. Please connect."
      );
    }
    return this.errorHandler(martyBlock);
  }

  // DISCO Utils

  getColourHexString(colourChoiceStr) {
    let colour;
    let colourChoice = parseInt(colourChoiceStr);

    switch (colourChoice) {
      case 0:
        //RED
        colour = "ff0000";
        break;
      case 1:
        //GREEN
        colour = "00ff00";
        break;
      case 2:
        //BLUE
        colour = "0000ff";
        break;
      case 3:
        //PINK
        colour = "ff00d9";
        break;
      case 4:
        //YELLOW
        colour = "fcec00";
        break;
      case 5:
        //WHITE
        colour = "ffffff";
        break;
      case 6:
        //OFF
        colour = "000000";
        break;

      default:
        //set default to mode 01 (OFF)
        colour = "000000";
        break;
    }

    return colour;
  }

  getDiscoBoardType(boardChoiceStr) {
    let boardDeviceType;
    let boardChoice = parseInt(boardChoiceStr);

    switch (boardChoice) {
      case 0:
        // EYE
        boardDeviceType = RIC_WHOAMI_TYPE_CODE_ADDON_LEDEYE;
        break;
      case 1:
        // ARM
        boardDeviceType = RIC_WHOAMI_TYPE_CODE_ADDON_LEDARM;
        break;
      case 2:
        // FOOT
        boardDeviceType = RIC_WHOAMI_TYPE_CODE_ADDON_LEDFOOT;
        break;
      case 3:
        // ALL
        boardDeviceType = "all";
        break;
      default:
        boardDeviceType = 0x00;
        break;
    }

    console.log("returning: " + boardDeviceType);

    return boardDeviceType;
  }

  //utility functions
  colorToLEDAddonStr(color) {
    // the LEDs are capped at about brightness level 20 on each channel, so we need to scale down the RGB values
    const divisor = 20;
    return (
      this.hexstr(parseInt(color[0] / divisor), 2) +
      this.hexstr(parseInt(color[1] / divisor), 2) +
      this.hexstr(parseInt(color[2] / 20), 2)
    );
  }

  decTo4cHexString(decimal) {
    let hexString = decimal.toString(16);
    hexString = hexString.toUpperCase();

    if (hexString.length == 1) {
      hexString = "000" + hexString;
    } else if (hexString.length == 2) {
      hexString = "00" + hexString;
    } else if (hexString.length == 3) {
      hexString = "0" + hexString;
    } else if (hexString.length > 4 || hexString.length == 0) {
      hexString = "0000";
    }
    return hexString;
  }

  // return padded hex string, up to 8 nibbles long
  hexstr(val, length) {
    // for negative numbers, zero right shift fill, convert and then get the end of the resulting 32 bit number
    if (val < 0) return (val >>> 0).toString(16).substr(0 - length);
    // for positive numbers, convert to hex and pad with zeros
    return val.toString(16).padStart(length, "0");
  }

  // return name of first addon found with a specific whoAmI value
  addonNameByWhoAmI(whoAmI) {
    const addons = JSON.parse(mv2Interface.addons).addons;
    for (let addon of addons) {
      if (addon.whoAmI == whoAmI) {
        return addon.name;
      }
    }
    return null;
  }

  // MOTION

  getReady(args, util) {
    const moveTime = 3000;
    console.log("Ready, set, go!");
    mv2Interface.send_REST(`traj/getReady/?moveTime=${moveTime}`);
    return new Promise((resolve) => setTimeout(resolve, moveTime));
  }

  getAllDiscoBoards(addons) {
    var addressList = [];

    for (let addon of addons) {
      if (
        addon.whoAmI == RIC_WHOAMI_TYPE_CODE_ADDON_LEDEYE ||
        addon.whoAmI == RIC_WHOAMI_TYPE_CODE_ADDON_LEDARM ||
        addon.whoAmI == RIC_WHOAMI_TYPE_CODE_ADDON_LEDFOOT
      ) {
        addressList.push(addon.name);
      }
    }
    return addressList;
  }

  getFilteredDiscoBoards(addons, filterBoardType) {
    var addressList = [];

    for (let addon of addons) {
      if (addon.whoAmI == filterBoardType) {
        addressList.push(addon.name);
      }
    }

    return addressList;
  }

  LEDColourPickerApiCommandBuilder(side, colorsArray) {
    let command = `led/${side}/color/persist?`;
    for (let i = 0; i < colorsArray.length; i++) {
      let color = colorsArray[i].replace("#", "");
      if (color === "5ba591") color = "000000"; // that's our "off" colour
      const ledIdMapped = this.ledIdMapping(i, true);
      let end = "&";
      if (i === colorsArray.length) end = "";
      command += `${ledIdMapped}=${color}${end}`;
    }
    return command;
  }

  LEDEyesColourLEDs(args, util) {
    let coloursArray = args.COLOUR_LED_EYES;
    if (typeof coloursArray === "string") {
      coloursArray = new Array(12).fill(coloursArray);
    }
    const side = args.SIDE;
    this.addonNotConnectedAlert(side);
    let martyCmd = this.LEDColourPickerApiCommandBuilder(side, coloursArray);
    if (
      !isVersionGreater(mv2Interface.getMartyFwVersion(), LED_EYES_FW_VERSION)
    ) {
      martyCmd = "notification/fw-needs-update";
    }
    console.log(martyCmd);
    mv2Interface.send_REST(martyCmd);
    return new Promise((resolve) => setTimeout(resolve, 200));
  }

  LEDEyesColour(args, util) {
    let colour = this.colourToHex(args.COLOUR_LED_EYES);
    colour = colour.replace("#", "");
    const boardtypeStr = args.BOARDTYPE;
    let boardtypeObj;
    try {
      boardtypeObj = JSON.parse(boardtypeStr);
    } catch (e) {
      boardtypeObj = { name: boardtypeStr, whoAmI: boardtypeStr };
    }
    this.addonNotConnectedAlert(boardtypeObj.name);
    let marty_cmd = `led/${boardtypeObj.name}/color/${colour}`;
    if (
      !isVersionGreater(mv2Interface.getMartyFwVersion(), LED_EYES_FW_VERSION)
    ) {
      marty_cmd = "notification/fw-needs-update";
    }
    console.log(marty_cmd);
    mv2Interface.send_REST(marty_cmd);
    return new Promise((resolve) => setTimeout(resolve, 200));
  }

  ledIdMapping(id, isFromColorPicker, boardtypeWhoAmI = "LEDeye") {
    // map led position id to code id
    // boardtypeWhoAmI: LEDeye, LEDarm, LEDfoot (different mappings for each)
    // the order starting from the top id is: 6 5 4 3 2 1 0 11 10 9 8 7
    if (boardtypeWhoAmI === "LEDeye") {
      const MAP = [6, 5, 4, 3, 2, 1, 0, 11, 10, 9, 8, 7];
      if (isFromColorPicker) {
        return MAP[(id + 3) % 12];
      }
      return MAP[id];
    } else if (boardtypeWhoAmI === "LEDarm") {
      const MAP = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
      return MAP[id];
    } else if (boardtypeWhoAmI === "LEDfoot") {
      const MAP = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
      return MAP[id];
    }
    return id; // no mapping
  }

  ledIDtoHex(ledID) {
    if (ledID < 10) return "0" + ledID.toString();
    if (ledID === 10) return "0A";
    if (ledID === 11) return "0B";
    return null;
  }

  LEDEyesColour_SpecificLED(args, util) {
    let colour = this.colourToHex(args.COLOUR_LED_EYES);
    colour = colour.replace("#", "");
    const ledID = +args.LED_POSITION;
    const boardtypeStr = args.BOARDTYPE;
    let boardtypeObj;
    try {
      boardtypeObj = JSON.parse(boardtypeStr);
    } catch (e) {
      boardtypeObj = { name: boardtypeStr, whoAmI: boardtypeStr };
    }
    const boardtypeWhoAmI = boardtypeObj.whoAmI;
    if (boardtypeWhoAmI === "LEDeye") {
      if (ledID < 0 || ledID > 11) {
        mv2Interface.send_REST(
          "notification/warn-message/LED id for eyes has to be between 0 and 11"
        );
        this.addonNotConnectedAlert(boardtypeObj.whoAmI);
        return new Promise((resolve) => setTimeout(resolve, 200));
      }
    }
    if (boardtypeWhoAmI === "LEDarm") {
      if (ledID < 0 || ledID > 25) {
        mv2Interface.send_REST(
          "notification/warn-message/LED id for arms has to be between 0 and 25"
        );
        this.addonNotConnectedAlert(boardtypeObj.whoAmI);
        return new Promise((resolve) => setTimeout(resolve, 200));
      }
    }
    if (boardtypeWhoAmI === "LEDfoot") {
      if (ledID < 0 || ledID > 19) {
        mv2Interface.send_REST(
          "notification/warn-message/LED id for feet has to be between 0 and 19"
        );
        this.addonNotConnectedAlert(boardtypeObj.whoAmI);
        return new Promise((resolve) => setTimeout(resolve, 200));
      }
    }

    const ledIdMapped = this.ledIdMapping(ledID, false, boardtypeWhoAmI);
    this.addonNotConnectedAlert(boardtypeObj.name);
    let marty_cmd = `led/${boardtypeObj.name}/setled/${ledIdMapped}/${colour}`;
    if (
      !isVersionGreater(mv2Interface.getMartyFwVersion(), LED_EYES_FW_VERSION)
    ) {
      marty_cmd = "notification/fw-needs-update";
    }
    console.log(marty_cmd);
    mv2Interface.send_REST(marty_cmd);
    return new Promise((resolve) => setTimeout(resolve, 200));
  }

  addonNotConnectedAlert(addonTitle) {
    const isAddonConnected = mv2Interface.isAddonConnected(addonTitle);
    if (!isAddonConnected) {
      mv2Interface.send_REST(
        `notification/warn-message/Oh no! Marty seems to have misplaced the ${addonTitle} add-on. Could you pick a different one from the dropdown?`
      );
    }
    return isAddonConnected;
  }

  static hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
      : null;
  }

  static componentToHex(c) {
    if (typeof c == "string") {
      try {
        c = +c;
      } catch (e) {
        console.log(e);
      }
    }
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  static rgbToHex(r, g, b) {
    return (
      "#" +
      Scratch3Mv2Blocks.componentToHex(r) +
      Scratch3Mv2Blocks.componentToHex(g) +
      Scratch3Mv2Blocks.componentToHex(b)
    );
  }

  static hslToHex(h, s, l) {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0"); // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  RGBOperator(args, util) {
    const r = args.NUM_R;
    const g = args.NUM_G;
    const b = args.NUM_B;
    if (
      !r ||
      r > 255 ||
      r < 0 ||
      !g ||
      g > 255 ||
      g < 0 ||
      !b ||
      b > 255 ||
      b < 0
    )
      mv2Interface.send_REST(
        "notification/warn-message/RGB values must be between 0 and 255"
      );
    return Scratch3Mv2Blocks.rgbToHex(r, g, b);
  }
  HSLOperator(args, util) {
    const h = args.NUM_H;
    const s = args.NUM_S;
    const l = args.NUM_L;
    if (!h || h > 360 || h < 0)
      mv2Interface.send_REST(
        "notification/warn-message/Hue value must be between 0 and 360"
      );
    if (!s || s > 100 || s < 0)
      mv2Interface.send_REST(
        "notification/warn-message/Saturation value must be between 0 and 100"
      );
    if (!l || l > 100 || l < 0)
      mv2Interface.send_REST(
        "notification/warn-message/Lightness value must be between 0 and 100"
      );
    const rgbColour = Color.hsvToRgb({ h: h, s: s / 100, v: l / 100 });
    return Scratch3Mv2Blocks.rgbToHex(rgbColour.r, rgbColour.g, rgbColour.b);
  }

  discoChangeBlockPattern(args, util) {
    // const addons = JSON.parse(mv2Interface.addons).addons;
    //so if it's set in a forever loop give 0.2s break between each update
    const resolveTime = 200;
    const boardtypeStr = args.BOARDTYPE;
    let boardtypeObj;
    try {
      boardtypeObj = JSON.parse(boardtypeStr);
    } catch (e) {
      boardtypeObj = { name: boardtypeStr, whoAmI: boardtypeStr };
    }
    const patternChoice = args.PATTERN;
    this.addonNotConnectedAlert(boardtypeObj.name);
    if (patternChoice === "off") {
      console.log(`led/${boardtypeObj.name}/off`);
      mv2Interface.send_REST(`led/${boardtypeObj.name}/off`);
      return new Promise((resolve) => setTimeout(resolve, resolveTime));
    }
    console.log(`led/${boardtypeObj.name}/pattern/${patternChoice}`);
    mv2Interface.send_REST(`led/${boardtypeObj.name}/pattern/${patternChoice}`);
    return new Promise((resolve) => setTimeout(resolve, resolveTime));
  }

  discoChangeBackColour(args, util) {
    let colour = this.colourToHex(args.COLOR);
    colour = colour.replace("#", "");
    const hexColour = Scratch3Mv2Blocks.hexToRgb(colour);
    mv2Interface.send_REST(
      `indicator/set?pixIdx=1;blinkType=on;r=${hexColour.r};g=${hexColour.g};b=${hexColour.b};rateMs=1000`
    );
  }

  discoSetBreatheBackColour(args, util) {
    const ms = +args.MILLISECONDS || 100;
    let colour = this.colourToHex(args.COLOR);
    colour = colour.replace("#", "");
    const hexColour = Scratch3Mv2Blocks.hexToRgb(colour);
    mv2Interface.send_REST(
      `indicator/set?pixIdx=1;blinkType=breathe;r=${hexColour.r};g=${hexColour.g};b=${hexColour.b};rateMs=${ms}`
    );
  }

  discoTurnOffBackColour(args, util) {
    mv2Interface.send_REST(
      `indicator/set?pixIdx=1;blinkType=off;r=0;g=0;b=0;rateMs=1000`
    );
  }

  discoChangeRegionColour(args, util) {
    const resolveTime = 200;
    let colour = this.colourToHex(args.COLOR);
    colour = colour.replace("#", "");
    const boardtypeStr = args.BOARDTYPE;
    let boardtypeObj;
    try {
      boardtypeObj = JSON.parse(boardtypeStr);
    } catch (e) {
      boardtypeObj = { name: boardtypeStr, whoAmI: boardtypeStr };
    }
    const regionChoice = args.REGION;
    this.addonNotConnectedAlert(boardtypeObj.name);

    mv2Interface.send_REST(
      `led/${boardtypeObj.name}/region/${regionChoice}/${colour}`
    );
    return new Promise((resolve) => setTimeout(resolve, resolveTime));
  }

  turnAllLEDsOff(args, util) {
    const resolveTime = 100;
    const cmdEyes = "led/LEDeye/off";
    const cmdFoot = "led/LEDfoot/off";
    const cmdArm = "led/LEDarm/off";

    mv2Interface.send_REST(cmdEyes);
    mv2Interface.send_REST(cmdFoot);
    mv2Interface.send_REST(cmdArm);
    return new Promise((resolve) => setTimeout(resolve, resolveTime));
  }

  walk_fw(args, util) {
    const moveTime = 1500;
    let steps = parseInt(args.STEPS);
    if (steps === 0 || steps < 0 || steps > 20) {
      mv2Interface.send_REST(
        "notification/warn-message/Input must be a positive integer between 1 and 20!"
      );
      return Promise.resolve();
    }
    const stepLength = 25;
    console.log(
      `traj/step/${steps}/?moveTime=${moveTime}&stepLength=${stepLength}`
    );
    mv2Interface.send_REST(
      `traj/step/${steps}/?moveTime=${moveTime}&stepLength=${stepLength}`
    );
    return new Promise((resolve) => setTimeout(resolve, moveTime * steps));
  }

  walk_bw(args, util) {
    const moveTime = 1500;
    let steps = parseInt(args.STEPS);
    if (steps === 0 || steps < 0 || steps > 20) {
      mv2Interface.send_REST(
        "notification/warn-message/Input must be a positive integer between 1 and 20!"
      );
      return Promise.resolve();
    }
    const stepLength = -25;
    console.log(
      `traj/step/${steps}/?moveTime=${moveTime}&stepLength=${stepLength}`
    );
    mv2Interface.send_REST(
      `traj/step/${steps}/?moveTime=${moveTime}&stepLength=${stepLength}`
    );
    return new Promise((resolve) => setTimeout(resolve, moveTime * steps));
  }

  walk(args, util) {
    let moveTime = parseFloat(args.MOVETIME) * 1000;
    moveTime = Math.min(Math.max(moveTime, 1), 10000);
    let stepLength = parseInt(args.STEPLEN);
    stepLength = Math.min(Math.max(stepLength, -50), 50);
    let steps = parseInt(args.STEPS);
    if (steps === 0 || steps < 0 || steps > 20) {
      mv2Interface.send_REST(
        "notification/warn-message/Input must be a positive integer between 1 and 20!"
      );
      return Promise.resolve();
    }
    let turn = parseInt(args.TURN);
    turn = Math.min(Math.max(turn, -25), 25);
    console.log(
      `traj/step/${steps}/?stepLength=${stepLength}&moveTime=${moveTime}&turn=${turn}`
    );
    mv2Interface.send_REST(
      `traj/step/${steps}/?stepLength=${stepLength}&moveTime=${moveTime}&turn=${turn}`
    );
    return new Promise((resolve) => setTimeout(resolve, moveTime * steps));
  }

  turn(args, util) {
    const moveTime = 1500;
    let steps = parseInt(args.STEPS);
    if (steps === 0 || steps < 0 || steps > 20) {
      mv2Interface.send_REST(
        "notification/warn-message/Input must be a positive integer between 1 and 20!"
      );
      return Promise.resolve();
    }
    let turn = 20;
    const side = args.SIDE;
    if (side === "1") {
      turn *= -1;
    }
    console.log(
      `traj/step/${steps}/?moveTime=${moveTime}&turn=${turn}&stepLength=1`
    );
    mv2Interface.send_REST(
      `traj/step/${steps}/?moveTime=${moveTime}&turn=${turn}&stepLength=1`
    );
    return new Promise((resolve) => setTimeout(resolve, moveTime * steps));
  }

  stop(args, util) {
    const stopType = args.STOP_TYPE; // stop, stopAfterMove
    const moveTime = 500;
    const command = `robot/${stopType}`;
    console.log(command);
    mv2Interface.send_REST(command);
    return new Promise((resolve) => setTimeout(resolve, moveTime));
  }

  resume(args, util) {
    const moveTime = 500;
    const command = "robot/resume";
    console.log(command);
    mv2Interface.send_REST(command);
    return new Promise((resolve) => setTimeout(resolve, moveTime));
  }

  pause(args, util) {
    const moveTime = 500;
    const command = "robot/pause";
    console.log(command);
    mv2Interface.send_REST(command);
    return new Promise((resolve) => setTimeout(resolve, moveTime));
  }

  wiggle(args, util) {
    const moveTime = 4000;
    console.log(`traj/wiggle/1/?moveTime=${moveTime}`);
    mv2Interface.send_REST(`traj/wiggle/1/?moveTime=${moveTime}`);
    return new Promise((resolve) => setTimeout(resolve, moveTime));
  }

  circle(args, util) {
    let moveTime = parseFloat(args.MOVETIME) * 1000;
    moveTime = Math.min(Math.max(moveTime, 1), 10000);
    const side = args.SIDE;
    console.log(`traj/circle/1/?moveTime=${moveTime}&side=${side}`);
    mv2Interface.send_REST(`traj/circle/1/?moveTime=${moveTime}&side=${side}`);
    return new Promise((resolve) => setTimeout(resolve, moveTime));
  }

  kick(args, util) {
    const moveTime = 3000;
    const side = args.SIDE;
    console.log(`traj/kick/1/?moveTime=${moveTime}&side=${side}`);
    mv2Interface.send_REST(`traj/kick/1/?moveTime=${moveTime}&side=${side}`);
    return new Promise((resolve) => setTimeout(resolve, moveTime));
  }

  lean(args, util) {
    let moveTime = parseFloat(args.MOVETIME) * 1000;
    moveTime = Math.min(Math.max(moveTime, 1), 10000);
    const side = args.SIDE;
    console.log(`traj/lean/1/?moveTime=${moveTime}&side=${side}`);
    mv2Interface.send_REST(`traj/lean/1/?moveTime=${moveTime}&side=${side}`);
    return new Promise((resolve) => setTimeout(resolve, moveTime));
  }

  slide(args, util) {
    const moveTime = 1000;
    let steps = parseInt(args.STEPS);
    if (steps === 0 || steps < 0 || steps > 20) {
      mv2Interface.send_REST(
        "notification/warn-message/Input must be a positive integer between 1 and 20!"
      );
      return Promise.resolve();
    }
    const side = args.SIDE;
    console.log(`traj/sidestep/${steps}/?side= ${side}&moveTime=${moveTime}`);
    mv2Interface.send_REST(
      `traj/sidestep/${steps}/?side=${side}&moveTime=${moveTime}`
    );
    return new Promise((resolve) => setTimeout(resolve, moveTime * steps));
  }

  slideMsLength(args, util) {
    const steps = parseInt(args.STEPS);
    const moveTimeInS = parseFloat(args.MOVETIME);
    const moveTime = moveTimeInS * 1000;
    const stepLength = parseInt(args.STEPLEN);

    if (moveTimeInS < 0.1 || moveTimeInS > 10) {
      mv2Interface.send_REST(
        "notification/warn-message/Input must be a positive number between 0.1 and 10!"
      );
      return Promise.resolve();
    }

    if (stepLength < 1 || stepLength > 100) {
      mv2Interface.send_REST(
        "notification/warn-message/Input must be a positive integer between 1 and 100!"
      );
      return Promise.resolve();
    }

    if (steps === 0 || steps < 0 || steps > 20) {
      mv2Interface.send_REST(
        "notification/warn-message/Input must be a positive integer between 1 and 20!"
      );
      return Promise.resolve();
    }
    const side = args.SIDE;
    const cmd = `traj/sidestep/${steps}/?side=${side}&moveTime=${moveTime}&stepLength=${stepLength}`;
    console.log(cmd);
    mv2Interface.send_REST(cmd);
    return new Promise((resolve) => setTimeout(resolve, moveTime * steps));
  }

  eyes(args, util) {
    const eyeCommand = args.COMMAND;
    console.log(`traj/${eyeCommand}`);
    mv2Interface.send_REST(`traj/${eyeCommand}`);
    let moveTime = 1000;
    if (eyeCommand === "wiggleEyes") {
      moveTime = 2000;
    }
    return new Promise((resolve) => setTimeout(resolve, moveTime));
  }

  moveLeg(args, util) {
    const moveTime = 1000;
    const side = args.SIDE;
    const direction = args.DIRECTION;
    console.log(
      `traj/joint/1/?jointID=${side}&angle=${direction}&moveTime=${moveTime}`
    );
    mv2Interface.send_REST(
      `traj/joint/1/?jointID=${side}&angle=${direction}&moveTime=${moveTime}`
    );
    return new Promise((resolve) => setTimeout(resolve, moveTime));
  }

  liftFoot(args, util) {
    const side = args.SIDE;
    console.log(`traj/liftFoot/1/?side=${side}`);
    mv2Interface.send_REST(`traj/liftFoot/1/?side=${side}`);
    return new Promise((resolve) => setTimeout(resolve, 1000));
  }

  lowerFoot(args, util) {
    const side = args.SIDE;
    console.log(`traj/lowerFoot/1/?side=${side}`);
    mv2Interface.send_REST(`traj/lowerFoot/1/?side=${side}`);
    return new Promise((resolve) => setTimeout(resolve, 1000));
  }

  moveJoint(args, util) {
    let moveTime = parseFloat(args.MOVETIME) * 1000;
    moveTime = Math.min(Math.max(moveTime, 1), 10000);
    const jointID = args.SERVOCHOICE;
    const angle = args.ANGLE;
    console.log(
      `traj/joint/1/?jointID=${jointID}&angle=${angle}&moveTime=${moveTime}`
    );
    mv2Interface.send_REST(
      `traj/joint/1/?jointID=${jointID}&angle=${angle}&moveTime=${moveTime}`
    );
    return new Promise((resolve) => setTimeout(resolve, moveTime));
  }

  wave(args, util) {
    const side = args.SIDE;
    console.log(`traj/wave/1/?side=${side}`);
    mv2Interface.send_REST(`traj/wave/1/?side=${side}`);
    return new Promise((resolve) => setTimeout(resolve, 2500));
  }

  /* waggleEyes (args, util) {
        console.log(`traj/waggleEyes`);
        mv2Interface.send_REST(`traj/waggleEyes`);
        return new Promise(resolve =>
            setTimeout(resolve));
    } */

  dance(args, util) {
    console.log("Let's dance!");
    const moveTime = 3000;
    let marty_cmd = `traj/dance/1?moveTime=${moveTime}`;
    mv2Interface.send_REST(marty_cmd);
    console.log(marty_cmd);

    return new Promise((resolve) => setTimeout(resolve, moveTime));
  }

  standStraight(args, util) {
    const moveTime = parseFloat(args.MOVETIME) * 1000;
    // minimum?
    console.log(`traj/standStraight/?moveTime=${moveTime}`);
    mv2Interface.send_REST(`traj/standStraight/?moveTime=${moveTime}`);
    return new Promise((resolve) => setTimeout(resolve, moveTime));
  }

  hold(args, util) {
    const moveTime = parseFloat(args.MOVETIME) * 1000;
    console.log(`traj/hold/?moveTime=${moveTime}`);
    mv2Interface.send_REST(`traj/hold/?moveTime=${moveTime}`);
    return new Promise((resolve) => setTimeout(resolve, moveTime));
  }

  gripperArmMove(keypoints, name = null, enable = true) {
    // keypoints should be array of [angle, time]
    // angle in degrees, time in ms
    if (!name) {
      name = this.addonNameByWhoAmI(RIC_WHOAMI_TYPE_CODE_ADDON_GRIPSERVO);
      if (!name)
        return mv2Interface.send_REST(
          "notification/warn-message/Gripper arm not found! Please attach a gripper arm to use this block."
        );
    }
    const numKeypoints = keypoints.length;
    if (!numKeypoints) return false;
    // servo opcode 00 is move, overwriting current movequeue. number of keypoints is given in second byte
    var cmdStr = "00" + this.hexstr(numKeypoints, 2);
    for (i in keypoints) {
      // servo expects 0.1 degree resolution, as an int16. So x10 and floor.
      cmdStr += this.hexstr(parseInt(keypoints[i][0] * 10), 4);
      // movement time, in ms as uint16
      cmdStr += this.hexstr(keypoints[i][1], 4);
    }

    if (enable) {
      // enable motor
      mv2Interface.send_REST(`elem/${name}/json?cmd=raw&hexWr=2001`);
    }

    // send movement command
    mv2Interface.send_REST(`elem/${name}/json?cmd=raw&hexWr=${cmdStr}`);
    return true;
  }

  gripperArmBasic(args, util) {
    //default time is set to 1 second
    const moveTime = 1 * 1000;
    //This block sets hand to open or closed
    const handPosition = args.HAND_POSITION;

    var keypoints = null;
    if (handPosition == 1) {
      //closed
      // close hand and hold for 30s. 90 degree angle
      keypoints = [
        [90, moveTime],
        [90, 30000],
      ];
    } else {
      //open
      keypoints = [[0, moveTime]];
    }

    if (!this.gripperArmMove(keypoints)) return false;

    return new Promise((resolve) => setTimeout(resolve, moveTime));
  }

  gripperArmTimed(args, util) {
    const addons = JSON.parse(mv2Interface.addons).addons;
    var moveTime = parseFloat(args.MOVETIME) * 1000;
    //set upper threshold 65.5s as ffff is 65535
    if (moveTime > 65500) {
      moveTime = 65500;
    }
    //Open or closed
    const handPosition = args.HAND_POSITION;

    let keypoints = null;
    if (handPosition == 1) {
      // close and and hold for 30s
      keypoints = [
        [90, moveTime],
        [90, 30000],
      ];
    } else {
      //open
      keypoints = [[0, moveTime]];
    }

    if (!this.gripperArmMove(keypoints)) return false;

    return new Promise((resolve) => setTimeout(resolve, moveTime));
  }

  // SENSORS

  position(args, util) {
    //console.log("Report a servo's current!");
    let servoChoice = parseInt(args.SERVOCHOICE);
    if (Number.isNaN(servoChoice) || servoChoice < 0 || servoChoice > 8) {
      servoChoice = 0;
    }
    const servoObj = JSON.parse(mv2Interface.servos);
    return servoObj.smartServos[servoChoice].pos;
  }

  current(args, util) {
    //console.log("Report a servo's current!");
    let servoChoice = parseInt(args.SERVOCHOICE);
    if (Number.isNaN(servoChoice) || servoChoice < 0 || servoChoice > 8) {
      servoChoice = 0;
    }
    const servoObj = JSON.parse(mv2Interface.servos);
    if (!servoObj || !servoObj.smartServos || !servoObj.smartServos[servoChoice]) return 0;
    return servoObj.smartServos[servoChoice].current || 0;
  }

  accelerometerX(args, util) {
    //console.log('Report accelerometer reading!');
    const accelObj = JSON.parse(mv2Interface.accel);
    if (!accelObj || !accelObj.accel || !accelObj.accel.x) return 0;
    const xAccel = accelObj.accel.x;
    return xAccel;
  }

  accelerometerY(args, util) {
    //console.log('Report accelerometer reading!');
    const accelObj = JSON.parse(mv2Interface.accel);
    if (!accelObj || !accelObj.accel || !accelObj.accel.y) return 0;
    const yAccel = accelObj.accel.y;
    return yAccel;
  }

  accelerometerZ(args, util) {
    //console.log('Report accelerometer reading!');
    const accelObj = JSON.parse(mv2Interface.accel);
    if (!accelObj || !accelObj.accel || !accelObj.accel.z) return 0;
    const zAccel = accelObj.accel.z;
    return zAccel;
  }

  magnetometerX(args, util) {
    //console.log('Report magnetometer reading!');
    const magObj = JSON.parse(mv2Interface.magneto);
    if ((!magObj || !magObj.magneto || !magObj.magneto.x)) {
      if (!hasMagnetometerNotificationBeenShown) {
        mv2Interface.send_REST("notification/warn-message/Magnetometer Unavailable! This feature is supported only by newer Marty models equipped with this sensor.");
        hasMagnetometerNotificationBeenShown = true;
      }
      return 0;
    }
    const xMag = magObj.magneto.x;
    return xMag;
  }

  magnetometerY(args, util) {
    //console.log('Report magnetometer reading!');
    const magObj = JSON.parse(mv2Interface.magneto);
    if ((!magObj || !magObj.magneto || !magObj.magneto.y)) {
      if (!hasMagnetometerNotificationBeenShown) {
        mv2Interface.send_REST("notification/warn-message/Magnetometer Unavailable! This feature is supported only by newer Marty models equipped with this sensor.");
        hasMagnetometerNotificationBeenShown = true;
      }
      return 0;
    }
    const yMag = magObj.magneto.y;
    return yMag;
  }

  magnetometerZ(args, util) {
    //console.log('Report magnetometer reading!');
    const magObj = JSON.parse(mv2Interface.magneto);
    if ((!magObj || !magObj.magneto || !magObj.magneto.z)) {
      if (!hasMagnetometerNotificationBeenShown) {
        mv2Interface.send_REST("notification/warn-message/Magnetometer Unavailable! This feature is supported only by newer Marty models equipped with this sensor.");
        hasMagnetometerNotificationBeenShown = true;
      }
      return 0;
    }
    const zMag = magObj.magneto.z;
    return zMag;
  }

  proximity(args, util) {
    //console.log('Report proximity!');
    // TODO: Do we have a proximity sensor yet?
    return;
  }

  batteryLevel(args, util) {
    //console.log('Report the battery percentage!');
    return Math.round(mv2Interface.battRemainCapacityPercent);
  }

  getObstacle(addon) {
    for (const addonValKey in addon.vals) {
      const addonVal = addon.vals[addonValKey];
      if (addonValKey.includes("Touch")) {
        return addonVal;
      }
    }
    return false;
  }

  obstacleSense(args, util) {
    const addons = JSON.parse(mv2Interface.addons).addons;
    const sensorChoice = args.SENSORCHOICE;

    for (const addon of addons) {
      if (addon.name === sensorChoice) {
        return this.getObstacle(addon);
      }
    }
    for (const addon of addons) {
      if (addon.whoAmI === RIC_WHOAMI_TYPE_CODE_ADDON_IRFOOT) {
        return this.getObstacle(addon);
      }
    }
    for (const addon of addons) {
      if (addon.whoAmI === RIC_WHOAMI_TYPE_CODE_ADDON_COLOUR) {
        return this.getObstacle(addon);
      }
    }
    return false;
  }

  getGround(addon) {
    for (const addonValKey in addon.vals) {
      const addonVal = addon.vals[addonValKey];
      if (addonValKey.includes("Air")) {
        return !addonVal;
      }
    }
    return false;
  }

  groundSense(args, util) {
    const addons = JSON.parse(mv2Interface.addons).addons;
    const sensorChoice = args.SENSORCHOICE;

    for (const addon of addons) {
      if (addon.name === sensorChoice) {
        return this.getGround(addon);
      }
    }
    for (const addon of addons) {
      if (addon.whoAmI === RIC_WHOAMI_TYPE_CODE_ADDON_IRFOOT) {
        return this.getGround(addon);
      }
    }
    for (const addon of addons) {
      if (addon.whoAmI === RIC_WHOAMI_TYPE_CODE_ADDON_COLOUR) {
        return this.getGround(addon);
      }
    }

    return false;
  }

  getHueChroma(r, g, b) {
    const maxVal = Math.max(r, g, b);
    const minVal = Math.min(r, g, b);
    const chroma = maxVal - minVal;
    let hue = 0;
    if (r > g && r > b) {
      hue = (((g - b) / chroma) % 6) * 60;
    } else if (g > b) {
      hue = ((b - r) / chroma + 2) * 60;
    } else {
      hue = ((r - g) / chroma + 4) * 60;
    }
    if (hue < 0) hue += 360;
    return [hue, chroma];
  }

  getColour(addon) {
    // helper function to get the colour of a colour sensor
    let red, green, blue, clear, isOnAir;
    for (const addonValKey in addon.vals) {
      const addonVal = addon.vals[addonValKey];
      if (addonValKey.includes("Red")) red = addonVal;
      if (addonValKey.includes("Green")) green = addonVal;
      if (addonValKey.includes("Blue")) blue = addonVal;
      if (addonValKey.includes("Clear")) clear = addonVal;
      if (addonValKey.includes("Air")) isOnAir = addonVal;
    }
    if (isOnAir) return "air";
    else {
      const colours = [
        { hue: [0, 10], chroma: [50, 200], clear: [40, 150], name: "red" },
        {
          hue: [20, 50],
          chroma: [40, 300],
          clear: [100, 255],
          name: "yellow",
        },
        {
          hue: [85, 160],
          chroma: [5, 100],
          clear: [25, 150],
          name: "green",
        },
        {
          hue: [180, 220],
          chroma: [40, 230],
          clear: [55, 255],
          name: "blue",
        },
        {
          hue: [200, 320],
          chroma: [0, 40],
          clear: [25, 150],
          name: "purple",
        },
        {
          hue: [345, 361],
          chroma: [50, 200],
          clear: [40, 150],
          name: "red",
        },
      ];

      const [hue, chroma] = this.getHueChroma(red, green, blue);
      for (let colour of colours) {
        if (
          colour.hue[0] <= hue &&
          hue <= colour.hue[1] &&
          colour.chroma[0] <= chroma &&
          chroma <= colour.chroma[1] &&
          colour.clear[0] <= clear &&
          clear <= colour.clear[1]
        ) {
          return colour.name;
        }
      }

      return "unclear";
    }
  }

  colourToHex(colour) {
    // we need to convert the string colour to a hex colour
    // to cover the case where the user is using the result
    // of the colour sensor block as a colour input.
    // The colour input only accepts hex colours.
    // If the colour is not one of the colours we have defined,
    // that means the user is using a color picker or some other
    // hex colour, so we can just return the colour.
    const colourMap = {
      red: "#ff0000",
      yellow: "#ffff00",
      green: "#00ff00",
      blue: "#0000ff",
      purple: "#ff00ff",
      unclear: "#000000",
      air: "#000000",
    };
    if (colour in colourMap) return colourMap[colour];
    else return colour;
  }

  colourSense(args, util) {
    const addons = JSON.parse(mv2Interface.addons).addons;
    // If the user has specified a sensor, use that
    for (const addon of addons) {
      if (addon.name === args.SENSORCHOICE) {
        return this.getColour(addon);
      }
    }
    // Otherwise, use the first colour sensor
    // this fixes the issue where: when the user saves a project with an addon name
    // and then changes the name of the addon/someone else loads the project with a different addon name
    // the project will still work (if they have an addon with the same whoAmI connected)
    for (const addon of addons) {
      if (addon.whoAmI === RIC_WHOAMI_TYPE_CODE_ADDON_COLOUR) {
        return this.getColour(addon);
      }
    }
    return null;
  }

  getHEXColourFromAddon(addon) {
    // helper function to get the colour of a colour sensor
    let red, green, blue;
    for (const addonValKey in addon.vals) {
      const addonVal = addon.vals[addonValKey];
      if (addonValKey.includes("Red")) red = Math.round(addonVal);
      if (addonValKey.includes("Green")) green = Math.round(addonVal);
      if (addonValKey.includes("Blue")) blue = Math.round(addonVal);
    }
    return Scratch3Mv2Blocks.rgbToHex(red, green, blue);
  }

  colourSenseHEX(args, util) {
    const addons = JSON.parse(mv2Interface.addons).addons;
    // If the user has specified a sensor, use that
    for (const addon of addons) {
      if (addon.name === args.SENSORCHOICE) {
        return this.getHEXColourFromAddon(addon);
      }
    }
    // Otherwise, use the first colour sensor
    // this fixes the issue where: when the user saves a project with an addon name
    // and then changes the name of the addon/someone else loads the project with a different addon name
    // the project will still work (if they have an addon with the same whoAmI connected)
    for (const addon of addons) {
      if (addon.whoAmI === RIC_WHOAMI_TYPE_CODE_ADDON_COLOUR) {
        return this.getHEXColourFromAddon(addon);
      }
    }
    return null;
  }

  getColourRaw(addon, args) {
    // helper function to get the RAW colour of a colour sensor
    for (const addonValKey in addon.vals) {
      const addonVal = addon.vals[addonValKey];
      if (addonValKey.includes(args.SENSORCHANNEL)) {
        return addonVal;
      }
    }
    return null;
  }

  colourSenseRaw(args, util) {
    const addons = JSON.parse(mv2Interface.addons).addons;
    const sensorChoice = args.SENSORCHOICE;
    for (const addon of addons) {
      if (addon.name === sensorChoice) {
        return this.getColourRaw(addon, args);
      }
    }
    for (const addon of addons) {
      if (addon.whoAmI === RIC_WHOAMI_TYPE_CODE_ADDON_COLOUR) {
        return this.getColourRaw(addon, args);
      }
    }
    return null;
  }

  distanceSense(args, util) {
    const addons = JSON.parse(mv2Interface.addons).addons;
    let dsVal = null;
    for (let addon of addons) {
      if ("DistanceSensorReading" in addon.vals) {
        return addon.vals["DistanceSensorReading"];
      }
      if (addon.whoAmI == RIC_WHOAMI_TYPE_CODE_ADDON_DISTANCE) {
        for (const val in addon.vals) {
          if (val.includes("Reading")) dsVal = addon.vals[val];
        }
      }
    }
    if (dsVal !== null) return dsVal;
    return false;
  }

  getLight(addon, args) {
    // helper function to get the light of a light sensor
    for (const addonValKey in addon.vals) {
      const addonVal = addon.vals[addonValKey];
      if (addonValKey.includes(args.SENSORCHANNEL)) {
        return addonVal;
      }
    }
    return null;
  }

  lightSense(args, util) {
    const addons = JSON.parse(mv2Interface.addons).addons;
    const sensorChoice = args.SENSORCHOICE;

    for (const addon of addons) {
      if (addon.name === sensorChoice) {
        return this.getLight(addon, args);
      }
    }
    for (const addon of addons) {
      if (addon.whoAmI === RIC_WHOAMI_TYPE_CODE_ADDON_LIGHT) {
        return this.getLight(addon, args);
      }
    }
    return null;
  }

  getNoise(addon) {
    // helper function to get the noise of a noise sensor
    for (const addonValKey in addon.vals) {
      const addonVal = addon.vals[addonValKey];
      if (addonValKey.includes("HighestSinceLastReading")) {
        return addonVal;
      }
    }
    return null;
  }

  noiseSense(args, util) {
    const addons = JSON.parse(mv2Interface.addons).addons;
    for (let addon of addons) {
      if (addon.name === args.SENSORCHOICE) {
        return this.getNoise(addon);
      }
    }
    for (let addon of addons) {
      if (addon.whoAmI === RIC_WHOAMI_TYPE_CODE_ADDON_NOISE) {
        return this.getNoise(addon);
      }
    }
    return null;
  }

  // SOUND
  // This is for playing sounds installed into marty
  // playSound (args, util) {
  //     const filename = args.SOUND;
  //     console.log(`filerun/spiffs/${filename}`);
  //     mv2Interface.send_REST(`filerun/spiffs/${filename}`);
  //     return new Promise(resolve =>
  //         setTimeout(resolve));
  // }

  playNote(args, util) {
    if (
      !isVersionGreater(mv2Interface.getMartyFwVersion(), LED_EYES_FW_VERSION)
    ) {
      return mv2Interface.send_REST("notification/fw-needs-update");
    }
    const soundItem = JSON.parse(args.NOTES_MENU);
    const md5ext = soundItem.md5ext;
    const idParts = md5ext.split(".");
    const md5 = idParts[0];
    return window.vm.runtime.storage
      .load(vm.runtime.storage.AssetType.Sound, md5)
      .then((soundAsset) => {
        const sound = {
          md5: md5ext,
          name: soundItem.name,
          format: soundItem.format,
          data: soundAsset.data,
        };
        return window.vm.runtime.audioEngine.decodeSoundPlayer(sound);
      })
      .then((soundPlayer) => {
        const mp3SoundBuffers = Scratch3Mv2Blocks.convertSoundToMP3(
          soundPlayer.buffer
        );
        const mp3SoundData = Scratch3Mv2Blocks.convertMp3BufferToData(
          mp3SoundBuffers
        );
        mv2Interface.streamAudio(
          mp3SoundData,
          soundPlayer.buffer.duration * 1000
        );
        soundPlayer.setPlaybackRate(1);

        return new Promise((resolve) => {
          const timeout = setTimeout(() => {
            clearTimeout(timeout);
            resolve();
          }, soundPlayer.buffer.duration * 1000 + 800);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  stopSounds(args, util) {
    if (
      !isVersionGreater(mv2Interface.getMartyFwVersion(), LED_EYES_FW_VERSION)
    ) {
      return mv2Interface.send_REST("notification/fw-needs-update");
    }
    mv2Interface.streamAudio([0], 0, true);
  }

  playTone(args, util) {
    if (
      !isVersionGreater(mv2Interface.getMartyFwVersion(), LED_EYES_FW_VERSION)
    ) {
      return mv2Interface.send_REST("notification/fw-needs-update");
    }
    const hz1 = args["HZ1"];
    const hz2 = args["HZ2"];
    const seconds = args["SECONDS"];

    let context;
    if (window.OfflineAudioContext) {
      context = new window.OfflineAudioContext(1, 44100 * seconds, 44100);
    } else {
      context = new window.webkitOfflineAudioContext(1, 44100 * seconds, 44100);
    }
    var osc = context.createOscillator();
    // Sine is the default type. Also available: square, sawtooth and triangle waveforms.
    osc.type = "sine";
    var now = context.currentTime;
    // Frequency in Hz.
    // Set initial value. (you can use .value=freq if you want)
    osc.frequency.setValueAtTime(hz1, now);
    // set a ramp to hz2 over the next SECONDS seconds.
    osc.frequency.linearRampToValueAtTime(hz2, now + seconds);
    osc.connect(context.destination);
    osc.start(now);
    osc.stop(now + seconds);
    context.startRendering();
    context.oncomplete = ({ renderedBuffer }) => {
      const mp3SoundBuffers = Scratch3Mv2Blocks.convertSoundToMP3(
        renderedBuffer
      );
      const mp3SoundData = Scratch3Mv2Blocks.convertMp3BufferToData(
        mp3SoundBuffers
      );
      mv2Interface.streamAudio(mp3SoundData, renderedBuffer.duration * 1000);
    };
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000 + 800));
  }

  playSoundUntilDone(args, util) {
    // if marty is not connected, play sound from device
    if (!mv2Interface.isConnected) {
      return window.vm.runtime._primitives.sound_playuntildone(args, util);
    }
    if (
      !isVersionGreater(mv2Interface.getMartyFwVersion(), LED_EYES_FW_VERSION)
    ) {
      return mv2Interface.send_REST("notification/fw-needs-update");
    }
    // get the duration of the sound
    // add a constant representing the time it'll get
    // marty to start streaming
    const index = this._getSoundIndex(args.SOUND_MENU, util);
    if (index >= 0) {
      const { target } = util;
      const { sprite } = target;
      const { soundId } = sprite.sounds[index];
      if (sprite.soundBank) {
        const effects = sprite.soundBank.getSoundEffects(soundId);
        const player = sprite.soundBank.getSoundPlayer(soundId);
        sprite.soundBank.playerTargets.set(soundId, target);
        effects.addSoundPlayer(player);
        effects.setEffectsFromTarget(target);
        player.connect(effects);
        const sampleCount = Scratch3Mv2Blocks._addPitchEffect(
          effects.pitch.ratio,
          player
        );
        const STREAM_TIME = 800;
        const soundDuration = sampleCount / player.buffer.sampleRate;
        this.playSound(args, util);
        return new Promise((resolve) =>
          setTimeout(resolve, soundDuration * 1000 + STREAM_TIME)
        );
      }
    }
  }

  playSound(args, util) {
    // if marty is not connected, play sound from device
    if (!mv2Interface.isConnected) {
      return window.vm.runtime._primitives.sound_play(args, util);
    }
    if (
      !isVersionGreater(mv2Interface.getMartyFwVersion(), LED_EYES_FW_VERSION)
    ) {
      return mv2Interface.send_REST("notification/fw-needs-update");
    }
    const index = this._getSoundIndex(args.SOUND_MENU, util);
    if (index >= 0) {
      const { target } = util;
      const { sprite } = target;
      const { soundId } = sprite.sounds[index];
      if (sprite.soundBank) {
        const effects = sprite.soundBank.getSoundEffects(soundId);
        const player = sprite.soundBank.getSoundPlayer(soundId);
        sprite.soundBank.playerTargets.set(soundId, target);
        effects.addSoundPlayer(player);
        effects.setEffectsFromTarget(target);
        player.connect(effects);
        const sampleCount = Scratch3Mv2Blocks._addPitchEffect(
          effects.pitch.ratio,
          player
        );
        let audioContext;
        if (window.OfflineAudioContext) {
          audioContext = new window.OfflineAudioContext(
            1,
            sampleCount,
            player.buffer.sampleRate
          );
        } else {
          // Need to use webkitOfflineAudioContext, which doesn't support all sample rates.
          // Resample by adjusting sample count to make room and set offline context to desired sample rate.
          const sampleScale = 44100 / player.buffer.sampleRate;
          audioContext = new window.webkitOfflineAudioContext(
            1,
            sampleScale * sampleCount,
            44100
          );
        }
        audioContext.startRendering();
        audioContext.oncomplete = ({ renderedBuffer }) => {
          console.log(`SOUND ${soundId} len ${player.buffer.length}`);
          const mp3SoundBuffers = Scratch3Mv2Blocks.convertSoundToMP3(
            renderedBuffer
          );
          const mp3SoundData = Scratch3Mv2Blocks.convertMp3BufferToData(
            mp3SoundBuffers
          );
          mv2Interface.streamAudio(
            mp3SoundData,
            renderedBuffer.duration * 1000,
            true
          );
          // play the mp3 data on the browser
          // Scratch3Mv2Blocks._testMp3SoundLocally(mp3SoundData);
        };
        const audioEngine = new player.audioEngine.constructor(audioContext);
        const playerNew = new player.constructor(audioEngine, {
          id: player.id,
          buffer: player.buffer,
        });
        Scratch3Mv2Blocks._prepareNewPlayer(playerNew, effects.pitch.ratio);
        Scratch3Mv2Blocks._addVolumeEffect(
          audioContext,
          playerNew,
          (target.volume * .6) / 100 // decrease volume by 40% to make it sound similar to the text-to-speech volume
        );
      } else {
        mv2Interface.send_REST("notification/warn-message/Something went wrong. Please try again.");
      }
      return new Promise((resolve) => {
        async function checkIfStreamingStartFinished() {
          // 'busy wait' to not overload the app
          await new Promise((rslv) => setTimeout(rslv, 50));
          // as long as isStreamStarting() returns true, we keep checking
          // when it's false, we know stream onset has finished and so we resolve
          if (mv2Interface.isStreamStarting)
            return checkIfStreamingStartFinished();
          return resolve();
        }
        checkIfStreamingStartFinished();
      });
    } else {
      mv2Interface.send_REST("notification/warn-message/Something went wrong. Please try again.");
    }
  }

  static _addVolumeEffect(audioContext, playerNew, volume) {
    if (!volume) volume = 0.00001;
    const { input, output } = new VolumeEffect(
      audioContext,
      volume,
      0,
      playerNew.buffer.duration
    );

    if (input && output) {
      playerNew.outputNode.connect(input);
      output.connect(audioContext.destination);
    } else {
      // No effects nodes are needed, wire directly to the output
      playerNew.outputNode.connect(audioContext.destination);
    }
  }

  static _prepareNewPlayer(playerNew, playbackRate) {
    playerNew.target = null;
    playerNew.playbackRate = playbackRate;
    playerNew.initialized = true;
    playerNew._createSource();
    playerNew.outputNode.start();
    playerNew.isPlaying = true;
  }

  static _addPitchEffect(pitchRatio, player) {
    const playbackRate = pitchRatio;
    const affectedSampleCount = Math.floor(
      player.buffer.duration * player.buffer.sampleRate
    );
    const unaffectedSampleCount = player.buffer.length - affectedSampleCount;
    const adjustedAffectedSampleCount = Math.floor(
      affectedSampleCount / playbackRate
    );
    const sampleCount = unaffectedSampleCount + adjustedAffectedSampleCount;
    return Math.round(sampleCount * 1.2) // adjusting because when recording the sample count is smaller
  }

  static convertMp3BufferToData(mp3SoundBuffers) {
    let mp3Len = 0;
    for (let mp3Buf of mp3SoundBuffers) {
      mp3Len += mp3Buf.length;
    }
    const mp3SoundData = new Int8Array(mp3Len);
    let curPos = 0;
    for (let mp3Buf of mp3SoundBuffers) {
      mp3SoundData.set(mp3Buf, curPos);
      curPos += mp3Buf.length;
    }
    console.log(`encoded to MP3 len ${mp3SoundData.length}`);
    return mp3SoundData;
  }

  static _testMp3SoundLocally(mp3SoundData) {
    // Test code to play locally
    console.log("mp3SoundData", mp3SoundData)
    const uint8Array = new Uint8Array(mp3SoundData.buffer);

    // Convert Uint8Array to Blob
    const blob = new Blob([uint8Array], { type: 'audio/mpeg' });

    var url = window.URL.createObjectURL(blob);

    // Create an audio element and set the source
    const audio = new Audio(url);

    // Play the audio
    audio.play().then(() => {
      console.log("Audio is playing!");
    }).catch(err => {
      console.error("Error in playing audio:", err);
    });

    // Optional: Revoke the object URL when the audio is finished to release memory
    audio.onended = () => {
      URL.revokeObjectURL(url);
    };
  }

  static convertSoundToMP3(audioBuffer) {
    const sampleRate = mv2Interface.mp3EncodingSampleRate || 44100;
    const sampleRatio = audioBuffer.sampleRate / sampleRate;
    const finalLen = Math.floor(audioBuffer.length / sampleRatio);
    const rawSoundData = new Int16Array(finalLen);
    const inSoundData = audioBuffer.getChannelData(0);
    for (let i = 0; i < finalLen; i++) {
      // Nominal range of AudioBuffer data is -1.0 to +1.0 (each sample is a 32 bit float)
      rawSoundData[i] = inSoundData[Math.floor(i * sampleRatio)] * 32767;
    }

    //can be anything but make it a multiple of 576 to make encoders life easier
    const sampleBlockSize = 1152;
    // const bitRate = mv2Interface.mp3EncodingBitRate || 16;

    const bitRate = mv2Interface.mp3EncodingBitRate || 64;
    console.log(
      `CONVERTING TO ${bitRate} kbps MP3 WITH ${sampleRate} SAMPLE RATE`
    );
    const avgFlag = !!!mv2Interface.mp3EncodingAvgFlag;
    const mp3encoder = new lamejs.Mp3Encoder(1, sampleRate, bitRate, avgFlag);
    const mp3Data = [];
    for (var i = 0; i < rawSoundData.length; i += sampleBlockSize) {
      const sampleChunk = rawSoundData.subarray(i, i + sampleBlockSize);
      var mp3buf = mp3encoder.encodeBuffer(sampleChunk);
      if (mp3buf.length > 0) {
        mp3Data.push(mp3buf);
      }
    }
    var mp3buf = mp3encoder.flush(); //finish writing mp3
    if (mp3buf.length > 0) {
      mp3Data.push(mp3buf);
    }
    return mp3Data;
  }

  _convertSoundToRICRAW(audioBuffer) {
    const sampleRatio = audioBuffer.buffer.sampleRate / 11025;
    const finalLen = Math.floor(audioBuffer.buffer.length / sampleRatio);
    const outSoundData = new Int8Array(finalLen);
    const inSoundData = audioBuffer.buffer.getChannelData(0);
    for (let i = 0; i < finalLen; i++) {
      // Nominal range of AudioBuffer data is -1.0 to +1.0 (each sample is a 32 bit float)
      outSoundData[i] = inSoundData[Math.floor(i * sampleRatio)] * 127;
    }
    return outSoundData;
  }

  _getSoundIndex(soundName, util) {
    // if the sprite has no sounds, return -1
    const len = util.target.sprite.sounds.length;
    if (len === 0) {
      return -1;
    }

    // look up by name first
    const index = this.getSoundIndexByName(soundName, util);
    if (index !== -1) {
      return index;
    }

    // then try using the sound name as a 1-indexed index
    const oneIndexedIndex = parseInt(soundName, 10);
    if (!isNaN(oneIndexedIndex)) {
      return MathUtil.wrapClamp(oneIndexedIndex - 1, 0, len - 1);
    }

    // could not be found as a name or converted to index, return -1
    return -1;
  }

  getSoundIndexByName(soundName, util) {
    const sounds = util.target.sprite.sounds;
    for (let i = 0; i < sounds.length; i++) {
      if (sounds[i].name === soundName) {
        return i;
      }
    }
    // if there is no sound by that name, return -1
    return -1;
  }

  // MISC/PROPOSED/DEPRECATED

  /* stepLeft (args, util) {
        const moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        let stepLength = parseInt(args.STEPLENGTH);
        stepLength = Math.min(Math.max(stepLength, -100), 100);
        let turn = parseInt(args.TURN);
        turn = Math.min(Math.max(turn, -100), 100);
        console.log(`traj/stepLeft/?moveTime=${moveTime};stepLength=${stepLength};turn=${turn}`);
        mv2Interface.send_REST(`traj/stepLeft/?moveTime=${moveTime};stepLength=${stepLength};turn=${turn}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }

    stepRight (args, util) {
        const moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        let stepLength = parseInt(args.STEPLENGTH);
        stepLength = Math.min(Math.max(stepLength, -100), 100);
        let turn = parseInt(args.TURN);
        turn = Math.min(Math.max(turn, -100), 100);
        console.log(`traj/stepRight/?moveTime=${moveTime};stepLength=${stepLength};turn=${turn}`);
        mv2Interface.send_REST(`traj/stepRight/?moveTime=${moveTime};stepLength=${stepLength};turn=${turn}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }*/

  /* kickLeft (args, util) {
        const moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        let turn = parseInt(args.TURN);
        turn = Math.min(Math.max(turn, -100), 100);
        console.log(`traj/kickLeft/?moveTime=${moveTime};turn=${turn}`);
        mv2Interface.send_REST(`traj/kickLeft/?moveTime=${moveTime};turn=${turn}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }

    kickRight (args, util) {
        const moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        let turn = parseInt(args.TURN);
        turn = Math.min(Math.max(turn, -100), 100);
        console.log(`traj/kickRight/?moveTime=${moveTime};turn=${turn}`);
        mv2Interface.send_REST(`traj/kickRight/?moveTime=${moveTime};turn=${turn}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    } */

  /* sidestepLeft (args, util) {
        const moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        let stepLength = parseInt(args.STEPLENGTH);
        stepLength = Math.min(Math.max(stepLength, -100), 100);
        console.log(`traj/sidestepLeft/?moveTime=${moveTime};stepLength=${stepLength}`);
        mv2Interface.send_REST(`traj/sidestepLeft/?moveTime=${moveTime};stepLength=${stepLength}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }

    sidestepRight (args, util) {
        const moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        let stepLength = parseInt(args.STEPLENGTH);
        stepLength = Math.min(Math.max(stepLength, -100), 100);
        console.log(`traj/sidestepRight/?moveTime=${moveTime};stepLength=${stepLength}`);
        mv2Interface.send_REST(`traj/sidestepRight/?moveTime=${moveTime};stepLength=${stepLength}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }

    circleLeft (args, util) {
        const moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        console.log(`traj/circleLeft/?moveTime=${moveTime}`);
        mv2Interface.send_REST(`traj/circleLeft/?moveTime=${moveTime}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }

    circleRight (args, util) {
        const moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        console.log(`traj/circleRight/?moveTime=${moveTime}`);
        mv2Interface.send_REST(`traj/circleRight/?moveTime=${moveTime}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }

    waveLeft (args, util) {
        const moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        console.log(`traj/waveLeft/?moveTime=${moveTime}`);
        mv2Interface.send_REST(`traj/waveLeft/?moveTime=${moveTime}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }

    waveRight (args, util) {
        const moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        console.log(`traj/waveRight/?moveTime=${moveTime}`);
        mv2Interface.send_REST(`traj/waveRight/?moveTime=${moveTime}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }*/

  /* sidefall (args, util) {
        const moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        let stepLength = parseInt(args.STEPLEN);
        stepLength = Math.min(Math.max(stepLength, -100), 100);
        let side = args.SIDE;
        if (side === 'left') {
            side = 0;
        } else {
            side = 1;
        }
        console.log(`traj/sidefall/?moveTime${moveTime};stepLength=${stepLength};side=${side}`);
        mv2Interface.send_REST(`traj/sidefall/?moveTime${moveTime};stepLength=${stepLength};side=${side}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }*/

  /* stop (args, util) {
        console.log('Freeze!');
        return;
    }*/

  demo_sensor(args, util) {
    return mv2Interface.demo_sensor;
  }

  set_demo_sensor(args, util) {
    const sensorval = parseFloat(args.SENSORVAL);
    mv2Interface.demo_sensor = sensorval;
  }

  set_ip(args, util) {
    mv2Interface.set_ip(args.IP);
  }

  /**
   * Cast any Scratch argument to an RGB color array to be used for the renderer.
   * @param {*} value Value to convert to RGB color array.
   * @return {Array.<number>} [r,g,b], values between 0-255.
   */
  static toRgbColorList(value) {
    const color = Cast.toRgbColorObject(value);
    return [color.r, color.g, color.b];
  }

  static increaseVolume(audioBuffer, gain) {
    let channels = audioBuffer.numberOfChannels;
    let samples = audioBuffer.length;

    for (let c = 0; c < channels; c++) {
      let channelData = audioBuffer.getChannelData(c);

      for (let s = 0; s < samples; s++) {
        channelData[s] *= gain;
      }
    }
  }

  /**
   * @DEPRECATED
   */
  // static async speech2TextLocally(voice, words, target, isMarty) {
  //   // voice: "ALTO f" | "KITTEN f" | "SQUEAK f" | "TENOR m" | "GIANT m"
  //   let variant;
  //   if (voice === "ALTO") {
  //     variant = "whisperf";
  //   } else if (voice === "KITTEN") {
  //     variant = "f5";
  //   } else if (voice === "SQUEAK") {
  //     variant = "f2";
  //   } else if (voice === "TENOR") {
  //     variant = "m1";
  //   } else if (voice === "GIANT") {
  //     variant = "m7";
  //   } else {
  //     variant = "f1";
  //   }

  //   meSpeak.loadVoice(require("./util/mespeak/voices/en/en-us.json"));
  //   if (!meSpeak.isConfigLoaded()) {
  //     meSpeak.loadConfig(require("./util/mespeak/src/mespeak_config.json"));
  //   }
  //   if (isMarty) {
  //     const uint8Array = meSpeak.speak(words, {
  //       rawdata: "buffer",
  //       variant: variant,
  //       wordgap: 7,
  //     });
  //     const audioContext = new (window.AudioContext ||
  //       window.webkitAudioContext)();

  //     const audioBuffer = await audioContext.decodeAudioData(uint8Array.buffer);

  //     Scratch3Mv2Blocks.increaseVolume(audioBuffer, target.volume / 30);
  //     console.log("here");

  //     const mp3SoundBuffers = Scratch3Mv2Blocks.convertSoundToMP3(audioBuffer);
  //     const mp3SoundData = Scratch3Mv2Blocks.convertMp3BufferToData(
  //       mp3SoundBuffers
  //     );
  //     mv2Interface.streamAudio(mp3SoundData, audioBuffer.duration * 1000);
  //     return new Promise((resolve) => {
  //       const timeout = setTimeout(() => {
  //         clearTimeout(timeout);
  //         resolve();
  //       }, audioBuffer.duration * 1000 + 800);
  //     });
  //   } else {
  //     let isFinished;
  //     meSpeak.speak(words, {
  //       variant: variant,
  //       wordgap: 7,
  //       callback: function () {
  //         isFinished = true;
  //       },
  //     });
  //     return new Promise((resolve) => {
  //       // iteratively check if the speech is finished
  //       const interval = setInterval(() => {
  //         if (isFinished) {
  //           clearInterval(interval);
  //           resolve();
  //         }
  //       }, 100);
  //     });
  //   }
  // }
}

class VolumeEffect {
  constructor(audioContext, volume, startSeconds, endSeconds) {
    this.audioContext = audioContext;

    this.input = this.audioContext.createGain();
    this.output = this.audioContext.createGain();

    this.gain = this.audioContext.createGain();

    // Smoothly ramp the gain up before the start time, and down after the end time.
    this.rampLength = 0.01;
    this.gain.gain.setValueAtTime(
      1.0,
      Math.max(0, startSeconds - this.rampLength)
    );
    this.gain.gain.exponentialRampToValueAtTime(volume, startSeconds);
    this.gain.gain.setValueAtTime(volume, endSeconds);
    this.gain.gain.exponentialRampToValueAtTime(
      1.0,
      endSeconds + this.rampLength
    );

    this.input.connect(this.gain);
    this.gain.connect(this.output);
  }
}

module.exports = Scratch3Mv2Blocks;
