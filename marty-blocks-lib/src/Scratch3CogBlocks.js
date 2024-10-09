const { TiltDetection } = require('./cog/PublishedDataAnalyser.js');
const { cog_blocks_definitions } = require('./CogBlocksToolbox.js');
const Cast = require("./util/cast");
const Color = require("./util/color");
const { isVersionGreater_errorCatching } = require('./versionChecker.js');

class Scratch3CogBlocks {
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

      // EVENTS
      [cog_blocks_definitions.events.cog_onTilt.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.onTilt.bind(this, args, utils)),
      [cog_blocks_definitions.events.cog_onRotate.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.onRotate.bind(this, args, utils)),
      [cog_blocks_definitions.events.cog_onMove.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.onMove.bind(this, args, utils)),
      [cog_blocks_definitions.events.cog_onButtonPush.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.onButtonPush.bind(this, args, utils)),
      [cog_blocks_definitions.events.cog_onObjectSense.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.onObjectSense.bind(this, args, utils)),
      [cog_blocks_definitions.events.cog_onLightSense.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.onLightSense.bind(this, args, utils)),
      [cog_blocks_definitions.events.cog_onIRMessageReceived.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.onIRMessageReceived.bind(this, args, utils)),
      // END OF EVENTS

      // SENSING
      [cog_blocks_definitions.sensing.cog_getAccelerometer.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.getAccelerometer.bind(this, args, utils)),
      [cog_blocks_definitions.sensing.cog_getGyroscope.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.getGyroscope.bind(this, args, utils)),
      [cog_blocks_definitions.sensing.cog_getButtonClicked.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.getButtonClicked.bind(this, args, utils)),
      [cog_blocks_definitions.sensing.cog_getObstacleSensed.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.getObstacleSensed.bind(this, args, utils)),
      [cog_blocks_definitions.sensing.cog_getLightSensed.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.getLightSensed.bind(this, args, utils)),
      [cog_blocks_definitions.sensing.cog_getIRSensorValue.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.getIRSensorValue.bind(this, args, utils)),
      [cog_blocks_definitions.sensing.cog_getAmbientLightValue.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.getAmbientLightValue.bind(this, args, utils)),
      [cog_blocks_definitions.sensing.cog_getMovementType.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.getMovementType.bind(this, args, utils)),
      [cog_blocks_definitions.sensing.cog_getTiltDirection.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.getTiltDirection.bind(this, args, utils)),
      // END OF SENSING

      // LOOKS
      [cog_blocks_definitions.looks.cog_setLEDColourPicker.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.setLEDColourPicker.bind(this, args, utils)),
      [cog_blocks_definitions.looks.cog_setAllRingLEDs.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.setAllRingLEDs.bind(this, args, utils)),
      [cog_blocks_definitions.looks.cog_setLEDToColour.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.setLEDToColour.bind(this, args, utils)),
      [cog_blocks_definitions.looks.cog_setLEDPattern.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.setLEDPattern.bind(this, args, utils)),
      [cog_blocks_definitions.looks.cog_setMiddleLED.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.setMiddleLED.bind(this, args, utils)),
      [cog_blocks_definitions.looks.cog_turnOffLEDs.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.turnOffLEDs.bind(this, args, utils)),
      // END OF LOOKS

      // SOUND
      [cog_blocks_definitions.sound.cog_playRtttlTune.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.playRtttlTune.bind(this, args, utils)),
      [cog_blocks_definitions.sound.cog_playNoteForTime.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.playNoteForTime.bind(this, args, utils)),
      [cog_blocks_definitions.sound.cog_setPitch.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.setPitch.bind(this, args, utils)),
      [cog_blocks_definitions.sound.cog_setVolume.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.setVolume.bind(this, args, utils)),
      [cog_blocks_definitions.sound.cog_stopSounds.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.stopSounds.bind(this, args, utils)),
      // END OF SOUND
    };
  }

  getHats() {
    return {
      [cog_blocks_definitions.events.cog_onTilt.type]: {
        restartExistingThreads: false,
        edgeActivated: true
      },
      [cog_blocks_definitions.events.cog_onRotate.type]: {
        restartExistingThreads: false,
        edgeActivated: true
      },
      [cog_blocks_definitions.events.cog_onMove.type]: {
        restartExistingThreads: false,
        edgeActivated: true
      },
      [cog_blocks_definitions.events.cog_onButtonPush.type]: {
        restartExistingThreads: false,
        edgeActivated: true
      },
      [cog_blocks_definitions.events.cog_onObjectSense.type]: {
        restartExistingThreads: false,
        edgeActivated: true
      },
      [cog_blocks_definitions.events.cog_onLightSense.type]: {
        restartExistingThreads: false,
        edgeActivated: true
      },
      [cog_blocks_definitions.events.cog_onIRMessageReceived.type]: {
        restartExistingThreads: false,
        edgeActivated: true
      },
    }
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

  _cogIsConnectedWrapper(args, utils, block) {
    return this.errorHandler(block);
    const connectedRaft = getRaftUsingTargetId(utils.target.id);
    if (!connectedRaft) {
      window.vm.runtime.stopAll();
      return connectedRaft.sendRestMessage('notification/warn-message/You are not currently connected to a Cog. Please connect.');
    }
    return this.errorHandler(block);
  }

  /* EVENT BLOCKS */
  onTilt(args, utils) {
    const publishedDataAnalyser = window.raftManager.raftIdToPublishedDataAnalyserMap[window.raftManager.raftIdAndDeviceIdMap[utils.target.id]];
    if (!publishedDataAnalyser) return false;
    return publishedDataAnalyser.cogState.tilt === args[cog_blocks_definitions.events.cog_onTilt.values.DIRECTION.name];
  }
  onRotate(args, utils) {
    const publishedDataAnalyser = window.raftManager.raftIdToPublishedDataAnalyserMap[window.raftManager.raftIdAndDeviceIdMap[utils.target.id]];
    if (!publishedDataAnalyser) return false;
    return publishedDataAnalyser.cogState.rotation === args[cog_blocks_definitions.events.cog_onRotate.values.DIRECTION.name];
  }
  onMove(args, utils) {
    const publishedDataAnalyser = window.raftManager.raftIdToPublishedDataAnalyserMap[window.raftManager.raftIdAndDeviceIdMap[utils.target.id]];
    if (!publishedDataAnalyser) return false;
    return publishedDataAnalyser.cogState.movementType === args[cog_blocks_definitions.events.cog_onMove.values.MOVE_TYPE.name];
  }
  onButtonPush(args, utils) {
    const publishedDataAnalyser = window.raftManager.raftIdToPublishedDataAnalyserMap[window.raftManager.raftIdAndDeviceIdMap[utils.target.id]];
    if (!publishedDataAnalyser) return false;
    return publishedDataAnalyser.cogState.buttonClick;
  }
  onObjectSense(args, utils) {
    const publishedDataAnalyser = window.raftManager.raftIdToPublishedDataAnalyserMap[window.raftManager.raftIdAndDeviceIdMap[utils.target.id]];
    if (!publishedDataAnalyser) return false;
    return publishedDataAnalyser.cogState.objectSense === args[cog_blocks_definitions.events.cog_onObjectSense.values.SIDE.name];
  }
  onLightSense(args, utils) {
    const publishedDataAnalyser = window.raftManager.raftIdToPublishedDataAnalyserMap[window.raftManager.raftIdAndDeviceIdMap[utils.target.id]];
    if (!publishedDataAnalyser) return false;
    return publishedDataAnalyser.cogState.lightSense;
  }
  onIRMessageReceived(args, utils) {
    const publishedDataAnalyser = window.raftManager.raftIdToPublishedDataAnalyserMap[window.raftManager.raftIdAndDeviceIdMap[utils.target.id]];
    if (!publishedDataAnalyser) return false;
    return publishedDataAnalyser.cogState.irMessage === args[cog_blocks_definitions.events.cog_onIRMessageReceived.values.SIDE.name];
  }
  /* END OF EVENT BLOCKS */

  /* SENSING BLOCKS */
  getAccelerometer(args, utils) {
    const connectedRaft = getRaftUsingTargetId(utils.target.id);
    if (!connectedRaft) return 0;
    const data = connectedRaft.raftStateInfo.LSM6DS;
    if (!data) return 0;

    try {
      const xRaw = data.ax;
      const yRaw = data.ay;
      const zRaw = data.az;

      const tiltCorrectionForOlderCog = 30;
      const tiltCorrectionForNewerCog = -90;
      const correctionCutOffVersion = "1.2.0";
      let tiltCorrection = tiltCorrectionForOlderCog;

      const raftVersion = connectedRaft.getRaftVersion();

      if (isVersionGreater_errorCatching(raftVersion, correctionCutOffVersion)) {
        tiltCorrection = tiltCorrectionForNewerCog;
      }

      const { x, y, z } = TiltDetection.rotateAccelData(xRaw, yRaw, zRaw, window.tilt_rotate_z_deg || tiltCorrection);
      const axis = args[cog_blocks_definitions.sensing.cog_getAccelerometer.values.AXIS.name];
      if (axis === 'ax') return x;
      if (axis === 'ay') return y;
      if (axis === 'az') return z;
    } catch (error) {
      return -1;
    }
  }
  getGyroscope(args, utils) {
    const connectedRaft = getRaftUsingTargetId(utils.target.id);
    if (!connectedRaft) return 0;
    const data = connectedRaft.raftStateInfo.LSM6DS;
    if (!data) return 0;
    const axis = args[cog_blocks_definitions.sensing.cog_getGyroscope.values.AXIS.name];
    const value = data[axis];
    return value;
  }
  getButtonClicked(args, utils) {
    return this.onButtonPush(args, utils).toString();
  }
  getObstacleSensed(args, utils) {
    return this.onObjectSense(args, utils).toString();
  }
  getLightSensed(args, utils) {
    return this.onLightSense(args, utils).toString();
  }
  getIRSensorValue(args, utils) {
    const connectedRaft = getRaftUsingTargetId(utils.target.id);
    if (!connectedRaft) return 0;
    const data = connectedRaft.raftStateInfo.Light.irVals;
    const side = args[cog_blocks_definitions.sensing.cog_getIRSensorValue.values.SIDE.name];
    if (side === 'right') return data[0];
    if (side === 'left') return data[1];
    return 0;
  }
  getAmbientLightValue(args, utils) {
    const connectedRaft = getRaftUsingTargetId(utils.target.id);
    if (!connectedRaft) return 0;
    const data = connectedRaft.raftStateInfo.Light.ambientVals[0];
    return data;
  }
  getMovementType(args, utils) {
    const publishedDataAnalyser = window.raftManager.raftIdToPublishedDataAnalyserMap[window.raftManager.raftIdAndDeviceIdMap[utils.target.id]];
    if (!publishedDataAnalyser) return false;
    return publishedDataAnalyser.cogState.movementType.toString();
  }
  getTiltDirection(args, utils) {
    const publishedDataAnalyser = window.raftManager.raftIdToPublishedDataAnalyserMap[window.raftManager.raftIdAndDeviceIdMap[utils.target.id]];
    if (!publishedDataAnalyser) return false;
    return publishedDataAnalyser.cogState.tilt.toString();
  }
  /* END OF SENSING BLOCKS */

  /* LOOKS BLOCKS */
  setLEDColourPicker(args, utils) {
    const connectedRaft = getRaftUsingTargetId(utils.target.id);
    if (!connectedRaft) return 0;
    let colours = args[cog_blocks_definitions.looks.cog_setLEDColourPicker.values.COLOR.name];
    if (!Array.isArray(colours)) {
      const colour = colours;
      colours = [colour, colour, colour, colour, colour, colour, colour, colour, colour, colour, colour, colour];
    }
    return setAllLEDsToColours_colourPicker(colours, connectedRaft);
  }
  setAllRingLEDs(args, utils) {
    const connectedRaft = getRaftUsingTargetId(utils.target.id);
    if (!connectedRaft) return 0;
    const colour = _getColourFromOperator(args[cog_blocks_definitions.looks.cog_setAllRingLEDs.values.COLOR.name]);
    connectedRaft.currentColour = colour;
    const command = `led//color/${colour}`
    console.log("command", command);
    connectedRaft.sendRestMessage(command);
  }
  setLEDToColour(args, utils) {
    const connectedRaft = getRaftUsingTargetId(utils.target.id);
    if (!connectedRaft) return 0;
    const idxOffset = window.idxOffset || 4;
    const ledIdArgValue = args[cog_blocks_definitions.looks.cog_setLEDToColour.values.LED_ID.name];
    let ledId = (+ledIdArgValue + idxOffset) % 12;
    if (ledIdArgValue === '13') {
      ledId = 12;
    }
    const color = _getColourFromOperator(args[cog_blocks_definitions.looks.cog_setLEDToColour.values.COLOR.name]);
    const command = `led//setled/${ledId}/${color}`;
    console.log("command", command);
    connectedRaft.sendRestMessage(command);
  }
  setLEDPattern(args, utils) {
    const connectedRaft = getRaftUsingTargetId(utils.target.id);
    if (!connectedRaft) return 0;
    let patternName = args[cog_blocks_definitions.looks.cog_setLEDPattern.values.PATTERN.name];
    const lastChar = patternName.charAt(patternName.length - 1);
    if (!isNaN(lastChar)) {
      patternName = patternName.slice(0, -1);
    }
    const mod = parseInt(lastChar, 10);
    // cogBlocks.setLEDPattern(patternName, mod);

    let colour = connectedRaft.currentColour || "#00FF00";
    colour = colour.replace("#", "");
    const command = `led//pattern/${patternName}?c=${colour}${mod ? `&mod=${mod}` : ''}`;
    console.log("command", command);
    connectedRaft.sendRestMessage(command);
  }
  setMiddleLED(args, utils) {
    const connectedRaft = getRaftUsingTargetId(utils.target.id);
    if (!connectedRaft) return 0;
    const color = _getColourFromOperator(args[cog_blocks_definitions.looks.cog_setMiddleLED.values.COLOR.name]);
    const ledId = 12;
    const command = `led//setled/${ledId}/${color}`;
    console.log("command", command);
    connectedRaft.sendRestMessage(command);
  }
  turnOffLEDs(args, utils) {
    const connectedRaft = getRaftUsingTargetId(utils.target.id);
    if (!connectedRaft) return 0;
    const command = `led//off`;
    console.log("command", command);
    connectedRaft.currentColour = null;
    connectedRaft.sendRestMessage(command);
  }
  /* END OF LOOKS BLOCKS */

  /* SOUND BLOCKS */
  async playRtttlTune(args, utils) {
    const connectedRaft = getRaftUsingTargetId(utils.target.id);
    if (!connectedRaft) return 0;

    const tune = args[cog_blocks_definitions.sound.cog_playRtttlTune.values.TUNE.name];
    const { durationInMs, command } = _getRtttlTuneCommand(tune);
    connectedRaft.sendRestMessage(command);
    await new Promise(resolve => setTimeout(resolve, durationInMs));
  }
  playNoteForTime(args, utils) {
    const connectedRaft = getRaftUsingTargetId(utils.target.id);
    if (!connectedRaft) return 0;
    const note = args[cog_blocks_definitions.sound.cog_playNoteForTime.values.NOTE.name];
    const duration = args[cog_blocks_definitions.sound.cog_playNoteForTime.values.TIME.name];
    const { durationInMs, command } = getNoteForTimeCommand(note, duration);
    connectedRaft.sendRestMessage(command);
    return new Promise(resolve => setTimeout(resolve, durationInMs));
  }
  setPitch(args, utils) {
    // SOUND API NOT IMPLEMENTED IN COG YET
    alert("Set Pitch not implemented yet");
    return 0;
  }
  setVolume(args, utils) {
    // SOUND API NOT IMPLEMENTED IN COG YET
    alert("Set Volume not implemented yet");
    return 0;
  }
  stopSounds(args, utils) {
    // SOUND API NOT IMPLEMENTED IN COG YET
    alert("Stop Sounds not implemented yet");
    return 0;
  }
  /* END OF SOUND BLOCKS */
}
module.exports = Scratch3CogBlocks;


/**
 * Helpers
 */
function setAllLEDsToColours_colourPicker(colours, cog) {
  const command = _LEDColourPickerApiCommandBuilder(colours);
  console.log("command", command);
  cog.sendRestMessage(command);
}

function _LEDColourPickerApiCommandBuilder(colorsArray) {
  let command = `indicator/set?`;
  for (let i = 0; i < colorsArray.length; i++) {
    let color = colorsArray[i].replace("#", "");
    if (color === "9966FF") color = "000000"; // that's our "off" colour
    const idxOffset = 8;
    const ledIdMapped = (i + idxOffset) % colorsArray.length;
    let end = "&";
    if (i === colorsArray.length) end = "";
    command += `c${ledIdMapped}=${color}${end}`;
  }
  return command;
}

function _getColourFromOperator(argumentValue) {
  if (typeof argumentValue === 'function') {
    return argumentValue();
  }
  return argumentValue;
}

function getRaftUsingTargetId(targetId) {
  const raftId = window.raftManager.raftIdAndDeviceIdMap[targetId];
  const raft = window.applicationManager.connectedRafts[raftId];
  return raft;
}

function calculateBPM(seconds, d = 4) {
  // Calculate the BPM based on the fixed d value and the given duration in seconds
  let bpm = 240 / (seconds * d);

  // Round BPM to a whole number (since BPM is typically an integer)
  bpm = Math.round(bpm);

  return bpm;
}

function _getRtttlTuneCommand(tune) {
  let durationInMs, command;
  switch (tune) {
    case "disbelief":
      durationInMs = 6000;
      command = 'audio/rtttl/Disbelief:d=4,o=5,b=120:g,8d#,8e,8f,8f#,8g,8a,8b,8c6,8p,8c6,8b,8a,8g,8f#,8e,8f,8d#,8p,8g';
      break;
    case "confusion":
      durationInMs = 10000;
      command = 'audio/rtttl/Confused:d=4,o=5,b=120:c,e,g,c6,e6,g6,c,e,g,c6,e6,g6,c,e,g,a,a,b,b,c6';
      break;
    case "excitement":
      durationInMs = 5000;
      command = 'audio/rtttl/Excitement:d=4,o=5,b=180:c,e,g,8c6,16p,8c6,16p,8c6,16p,c,e,g,8c6,16p,8c6,16p,8c6,16p,c,e,g,8c6';
      break;
    case "noway":
      durationInMs = 6000;
      command = 'audio/rtttl/NoWay:d=4,o=5,b=120:p,8g,8p,8c6,8p,8g,8p,8a,8p,8f,8p,8e,8p,8d,8p,8c,8p,8g,8p,8c6,8p,8g';
      break;
    case "no":
      durationInMs = 3000;
      command = 'audio/rtttl/No:d=4,o=5,b=100:p,8c,8p,8c,8p,8c,8p,8c';
      break;
    case "whistle":
      durationInMs = 3000;
      command = 'audio/rtttl/Whistle:d=4,o=6,b=140:16b5,16p,16b5,16p,16b5,16p,16g,16p,16e,16p,16g,16p,16c7,16p,16c7,16p,16c7,16p,16a,16p,16f,16p,16a,16p,16d7';
      break;
    default:
      break;
  }
  return { durationInMs, command };
}

function getNoteForTimeCommand(note, duration) {
  let bpm, d, command;
  d = 4;
  switch (note) {
    case "notec4":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteC:d=${d},o=4,b=${bpm}:c`;
      break;
    case "notecsharp4":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteCSharp:d=${d},o=4,b=${bpm}:c#`;
      break;
    case "noted4":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteD:d=${d},o=4,b=${bpm}:d`;
      break;
    case "notedsharp4":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteDSharp:d=${d},o=4,b=${bpm}:d#`;
      break;
    case "notee4":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteE:d=${d},o=4,b=${bpm}:e`;
      break;
    case "notef4":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteF:d=${d},o=4,b=${bpm}:f`;
      break;
    case "notefsharp4":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteFSharp:d=${d},o=4,b=${bpm}:f#`;
      break;
    case "noteg4":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteG:d=${d},o=4,b=${bpm}:g`;
      break;
    case "notegsharp4":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteGSharp:d=${d},o=4,b=${bpm}:g#`;
      break;
    case "notea4":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteA:d=${d},o=4,b=${bpm}:a`;
      break;
    case "noteasharp4":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteASharp:d=${d},o=4,b=${bpm}:a#`;
      break;
    case "noteb4":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteB:d=${d},o=4,b=${bpm}:b`;
      break;

    case "notec5":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteC:d=${d},o=5,b=${bpm}:c`;
      break;
    case "notecsharp5":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteCSharp:d=${d},o=5,b=${bpm}:c#`;
      break;
    case "noted5":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteD:d=${d},o=5,b=${bpm}:d`;
      break;
    case "notedsharp5":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteDSharp:d=${d},o=5,b=${bpm}:d#`;
      break;
    case "notee5":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteE:d=${d},o=5,b=${bpm}:e`;
      break;
    case "notef5":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteF:d=${d},o=5,b=${bpm}:f`;
      break;
    case "notefsharp5":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteFSharp:d=${d},o=5,b=${bpm}:f#`;
      break;
    case "noteg5":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteG:d=${d},o=5,b=${bpm}:g`;
      break;
    case "notegsharp5":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteGSharp:d=${d},o=5,b=${bpm}:g#`;
      break;
    case "notea5":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteA:d=${d},o=5,b=${bpm}:a`;
      break;
    case "noteasharp5":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteASharp:d=${d},o=5,b=${bpm}:a#`;
      break;
    case "noteb5":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteB:d=${d},o=5,b=${bpm}:b`;
      break;

    case "notec6":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteC:d=${d},o=6,b=${bpm}:c`;
      break;
    case "notecsharp6":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteCSharp:d=${d},o=6,b=${bpm}:c#`;
      break;
    case "noted6":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteD:d=${d},o=6,b=${bpm}:d`;
      break;
    case "notedsharp6":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteDSharp:d=${d},o=6,b=${bpm}:d#`;
      break;
    case "notee6":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteE:d=${d},o=6,b=${bpm}:e`;
      break;
    case "notef6":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteF:d=${d},o=6,b=${bpm}:f`;
      break;
    case "notefsharp6":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteFSharp:d=${d},o=6,b=${bpm}:f#`;
      break;
    case "noteg6":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteG:d=${d},o=6,b=${bpm}:g`;
      break;
    case "notegsharp6":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteGSharp:d=${d},o=6,b=${bpm}:g#`;
      break;
    case "notea6":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteA:d=${d},o=6,b=${bpm}:a`;
      break;
    case "noteasharp6":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteASharp:d=${d},o=6,b=${bpm}:a#`;
      break;
    case "noteb6":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteB:d=${d},o=6,b=${bpm}:b`;
      break;

    case "notec7":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteC:d=${d},o=7,b=${bpm}:c`;
      break;
    case "notecsharp7":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteCSharp:d=${d},o=7,b=${bpm}:c#`;
      break;
    case "noted7":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteD:d=${d},o=7,b=${bpm}:d`;
      break;
    case "notedsharp7":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteDSharp:d=${d},o=7,b=${bpm}:d#`;
      break;
    case "notee7":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteE:d=${d},o=7,b=${bpm}:e`;
      break;
    case "notef7":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteF:d=${d},o=7,b=${bpm}:f`;
      break;
    case "notefsharp7":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteFSharp:d=${d},o=7,b=${bpm}:f#`;
      break;
    case "noteg7":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteG:d=${d},o=7,b=${bpm}:g`;
      break;
    case "notegsharp7":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteGSharp:d=${d},o=7,b=${bpm}:g#`;
      break;
    case "notea7":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteA:d=${d},o=7,b=${bpm}:a`;
      break;
    case "noteasharp7":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteASharp:d=${d},o=7,b=${bpm}:a#`;
      break;
    case "noteb7":
      bpm = calculateBPM(duration);
      command = `audio/rtttl/NoteB:d=${d},o=7,b=${bpm}:b`;
      break;
    default:
      break;
  }
  const durationInMs = duration * 1000;
  return { durationInMs, command };
}