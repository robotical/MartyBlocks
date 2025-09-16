const { cog_blocks_definitions } = require('./CogBlocksToolbox.js');
const Cast = require("./util/cast");
const Color = require("./util/color");
const { isVersionGreater_errorCatching } = require('./versionChecker.js');
const { noteFrequencies } = require("./util/note-frequencies");
const CogLEDCommandAggregator = require("./util/CogLEDCommandAggregator.js")
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
      [cog_blocks_definitions.events.cog_onShake.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.onShake.bind(this, args, utils)),
      [cog_blocks_definitions.events.cog_onButtonPush.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.onButtonPush.bind(this, args, utils)),
      [cog_blocks_definitions.events.cog_onObjectSense.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.onObjectSense.bind(this, args, utils)),
      [cog_blocks_definitions.events.cog_onLightSense.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.onLightSense.bind(this, args, utils)),
      // [cog_blocks_definitions.events.cog_onIRMessageReceived.type]: (args, utils) =>
      //   this._cogIsConnectedWrapper(args, utils, this.onIRMessageReceived.bind(this, args, utils)),
      // END OF EVENTS

      // SENSING
      [cog_blocks_definitions.sensing.cog_getAccelerometer.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.getAccelerometer.bind(this, args, utils)),
      // [cog_blocks_definitions.sensing.cog_getGyroscope.type]: (args, utils) =>
      //   this._cogIsConnectedWrapper(args, utils, this.getGyroscope.bind(this, args, utils)),
      [cog_blocks_definitions.sensing.cog_getButtonClicked.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.getButtonClicked.bind(this, args, utils)),
      [cog_blocks_definitions.sensing.cog_getButtonForceValue.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.getButtonForceValue.bind(this, args, utils)),
      [cog_blocks_definitions.sensing.cog_getButtonForceValuePercentage.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.getButtonForceValuePercentage.bind(this, args, utils)),
      [cog_blocks_definitions.sensing.cog_getObstacleSensed.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.getObstacleSensed.bind(this, args, utils)),
      [cog_blocks_definitions.sensing.cog_getLightSensed.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.getLightSensed.bind(this, args, utils)),
      [cog_blocks_definitions.sensing.cog_getIRSensorValue.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.getIRSensorValue.bind(this, args, utils)),
      [cog_blocks_definitions.sensing.cog_getAmbientLightValue.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.getAmbientLightValue.bind(this, args, utils)),
      [cog_blocks_definitions.sensing.cog_getShakeSensed.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.getShakeSensed.bind(this, args, utils)),
      [cog_blocks_definitions.sensing.cog_getTiltDirection.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.getTiltDirection.bind(this, args, utils)),
      // END OF SENSING

      // LOOKS
      [cog_blocks_definitions.looks.cog_setLEDColourPicker.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.setLEDColourPicker.bind(this, args, utils)),
      [cog_blocks_definitions.looks.cog_setLEDs.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.setLEDs.bind(this, args, utils)),
      [cog_blocks_definitions.looks.cog_setLEDToColour.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.setLEDToColour.bind(this, args, utils)),
      [cog_blocks_definitions.looks.cog_setLEDPattern.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.setLEDPattern.bind(this, args, utils)),
      [cog_blocks_definitions.looks.cog_turnOffLEDs.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.turnOffLEDs.bind(this, args, utils)),
      // END OF LOOKS

      // SOUND
      [cog_blocks_definitions.sound.cog_composeTune.type]: (args) =>
        this.composeTune(args),
      [cog_blocks_definitions.sound.cog_playCustomTune.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.playCustomTune.bind(this, args, utils)),
      [cog_blocks_definitions.sound.cog_tuneFromText.type]: (args) =>
        this.tuneFromText(args),
      [cog_blocks_definitions.sound.cog_tuneGetProperty.type]: (args) =>
        this.getTuneProperty(args),
      [cog_blocks_definitions.sound.cog_playRtttlTune.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.playRtttlTune.bind(this, args, utils)),
      [cog_blocks_definitions.sound.cog_playNoteForTime.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.playNoteForTime.bind(this, args, utils)),
      [cog_blocks_definitions.sound.cog_playTone.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.playTone.bind(this, args, utils)),
      [cog_blocks_definitions.sound.cog_startNote.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.startNote.bind(this, args, utils)),
      [cog_blocks_definitions.sound.cog_stopAllSounds.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.stopAllSounds.bind(this, args, utils)),
      [cog_blocks_definitions.sound.cog_setVolumeToPercentage.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.setVolumeToPercentage.bind(this, args, utils)),
      [cog_blocks_definitions.sound.cog_playSoundAtFrequency.type]: (args, utils) =>
        this._cogIsConnectedWrapper(args, utils, this.playSoundAtFrequency.bind(this, args, utils)),
      // END OF SOUND
    };
  }

  getHats() {
    return {
      [cog_blocks_definitions.events.cog_onTilt.type]: {
        restartExistingThreads: false,
        edgeActivated: true
      },
      [cog_blocks_definitions.events.cog_onShake.type]: {
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
      // [cog_blocks_definitions.events.cog_onIRMessageReceived.type]: {
      //   restartExistingThreads: false,
      //   edgeActivated: true
      // },
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
    const connectedRaft = getRaftUsingTargetId(utils.target.id);
    if (!connectedRaft) return false;
    const publishedDataAnalyser = connectedRaft.publishedDataAnalyser;
    if (!publishedDataAnalyser) return false;
    return publishedDataAnalyser.cogState.tilt === args[cog_blocks_definitions.events.cog_onTilt.values.DIRECTION.name];
  }
  onShake(args, utils) {
    const connectedRaft = getRaftUsingTargetId(utils.target.id);
    if (!connectedRaft) return false;
    const publishedDataAnalyser = connectedRaft.publishedDataAnalyser;
    if (!publishedDataAnalyser) return false;
    return publishedDataAnalyser.cogState.movementType === "shake";
  }
  onButtonPush(args, utils) {
    const connectedRaft = getRaftUsingTargetId(utils.target.id);
    if (!connectedRaft) return false;
    const publishedDataAnalyser = connectedRaft.publishedDataAnalyser;
    if (!publishedDataAnalyser) return false;
    return publishedDataAnalyser.cogState.buttonClick === 'click'
  }
  onObjectSense(args, utils) {
    const connectedRaft = getRaftUsingTargetId(utils.target.id);
    if (!connectedRaft) return false;
    const publishedDataAnalyser = connectedRaft.publishedDataAnalyser;
    if (!publishedDataAnalyser) return false;
    if (publishedDataAnalyser.cogState.objectSense === "both") return true;
    return publishedDataAnalyser.cogState.objectSense === args[cog_blocks_definitions.events.cog_onObjectSense.values.SIDE.name];
  }
  onLightSense(args, utils) {
    const connectedRaft = getRaftUsingTargetId(utils.target.id);
    if (!connectedRaft) return false;
    const publishedDataAnalyser = connectedRaft.publishedDataAnalyser;
    if (!publishedDataAnalyser) return false;
    return publishedDataAnalyser.cogState.lightSense === "high"
  }
  onIRMessageReceived(args, utils) {
    const connectedRaft = getRaftUsingTargetId(utils.target.id);
    if (!connectedRaft) return false;
    const publishedDataAnalyser = connectedRaft.publishedDataAnalyser;
    if (!publishedDataAnalyser) return false;
    return publishedDataAnalyser.cogState.irMessage === args[cog_blocks_definitions.events.cog_onIRMessageReceived.values.SIDE.name];
  }
  /* END OF EVENT BLOCKS */

  /* SENSING BLOCKS */
  getAccelerometer(args, utils) {
    const connectedRaft = getRaftUsingTargetId(utils.target.id);
    if (!connectedRaft) return 0;
    const data = connectedRaft.raftStateInfo.accelerometer;
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

      const publishedDataAnalyser = connectedRaft.publishedDataAnalyser;
      const { x, y, z } = publishedDataAnalyser.TiltDetection.rotateAccelData(xRaw, yRaw, zRaw, window.tilt_rotate_z_deg || tiltCorrection);
      const axis = args[cog_blocks_definitions.sensing.cog_getAccelerometer.values.AXIS.name];
      if (axis === 'ax') return x;
      if (axis === 'ay') return y;
      if (axis === 'az') return z;
    } catch (error) {
      return -1;
    }
  }
  // getGyroscope(args, utils) {
  //   const connectedRaft = getRaftUsingTargetId(utils.target.id);
  //   if (!connectedRaft) return 0;
  //   const data = connectedRaft.raftStateInfo.gyroscope;
  //   if (!data) return 0;
  //   const axis = args[cog_blocks_definitions.sensing.cog_getGyroscope.values.AXIS.name];
  //   const value = data[axis];
  //   return value;
  // }
  getButtonClicked(args, utils) {
    return this.onButtonPush(args, utils).toString();
  }
  getButtonForceValue(args, utils) {
    const connectedRaft = getRaftUsingTargetId(utils.target.id);
    if (!connectedRaft) return 0;
    const data = connectedRaft.raftStateInfo.light;
    if (!data) return 0;
    return data.ir2;
  }
  getButtonForceValuePercentage(args, utils) {
    const connectedRaft = getRaftUsingTargetId(utils.target.id);
    if (!connectedRaft) return 0;
    const data = connectedRaft.raftStateInfo.light;
    if (!data) return 0;
    const irMin = connectedRaft.publishedDataAnalyser.buttonClickDetection.irMin;
    const irMax = connectedRaft.publishedDataAnalyser.buttonClickDetection.irMax;
    if (irMin && irMax) {
      const irValue = data.ir2;
      const raw = ((irValue - irMin) / (irMax - irMin)) * 100;
      // return +raw.toFixed(2);
      // Shift and rescale from [10, 80] → [0, 100]
      const minRaw = 10;
      const maxRaw = 80;
      const adjusted = ((raw - minRaw) / (maxRaw - minRaw)) * 100;

      // Clamp to [0, 100]
      return +Math.max(0, Math.min(100, adjusted)).toFixed(2);
    }
    return data.ir2;
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
    const data = connectedRaft.raftStateInfo.light;
    const side = args[cog_blocks_definitions.sensing.cog_getIRSensorValue.values.SIDE.name];
    if (side === 'left') return data.ir0;
    if (side === 'right') return data.ir1;
    return 0;
  }
  getAmbientLightValue(args, utils) {
    const connectedRaft = getRaftUsingTargetId(utils.target.id);
    if (!connectedRaft) return 0;
    const data = connectedRaft.raftStateInfo.light;
    if (!data) return 0;
    return data.amb0;
  }
  getShakeSensed(args, utils) {
    const connectedRaft = getRaftUsingTargetId(utils.target.id);
    if (!connectedRaft) return false;
    const publishedDataAnalyser = connectedRaft.publishedDataAnalyser;
    if (!publishedDataAnalyser) return false;
    return publishedDataAnalyser.cogState.movementType.toString() === "shake";
  }
  getTiltDirection(args, utils) {
    const connectedRaft = getRaftUsingTargetId(utils.target.id);
    if (!connectedRaft) return false;
    const publishedDataAnalyser = connectedRaft.publishedDataAnalyser;
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
  setLEDs(args, utils) {
    const connectedRaft = getRaftUsingTargetId(utils.target.id);
    if (!connectedRaft) return 0;
    const colour = _getColourFromOperator(args[cog_blocks_definitions.looks.cog_setLEDs.values.COLOR.name]);
    connectedRaft.currentColour = colour;
    const LEDType = args[cog_blocks_definitions.looks.cog_setLEDs.values.LED_TYPE.name]; // all, ring, button, ind
    if (LEDType === "all") {
      const ringCommand = `led/ring/color/${colour}`
      const buttonCommand = `led/button/color/${colour}`
      connectedRaft.sendRestMessage(ringCommand);
      connectedRaft.sendRestMessage(buttonCommand);
    } else {
      const command = `led/${LEDType}/color/${colour}`;
      connectedRaft.sendRestMessage(command);
    }
    return new Promise(resolve => setTimeout(resolve, 20));
  }
  setLEDToColour(args, utils) {
    const connectedRaft = getRaftUsingTargetId(utils.target.id);
    if (!connectedRaft) return 0;
    const ledId = args[cog_blocks_definitions.looks.cog_setLEDToColour.values.LED_ID.name];
    const color = _getColourFromOperator(args[cog_blocks_definitions.looks.cog_setLEDToColour.values.COLOR.name]);
    const cogVersion = connectedRaft.getRaftVersion();
    // CogLEDCommandAggregator is compatible only with versions greater than 1.9.4
    if (isVersionGreater_errorCatching(cogVersion, "1.9.4")) {
      CogLEDCommandAggregator.sendFunction = connectedRaft.sendRestMessage.bind(connectedRaft);
      CogLEDCommandAggregator.setLED(ledId, color);
      return;
    } else {
      // For older versions, send the LED command directly
      const command = `led/ring/setled/${ledId}/${color}`;
      console.log("Sending command:", command);
      connectedRaft.sendRestMessage(command);
      // Adding a slight delay to ensure we do not overload Cog with older version
      return new Promise(resolve => setTimeout(resolve, 100));
    }
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
    const isThereMod = !isNaN(mod);
    const LEDType = args[cog_blocks_definitions.looks.cog_setLEDs.values.LED_TYPE.name]; // all, ring, button
    let colour = connectedRaft.currentColour || "#00FF00";
    colour = colour.replace("#", "");
    if (LEDType === "all") {
      const ringCommand = `led/ring/pattern/${patternName}?c=${colour}${isThereMod ? `&mod=${mod}` : ""}`;
      const buttonCommand = `led/button/pattern/${patternName}?c=${colour}${isThereMod ? `&mod=${mod}` : ""}`;
      connectedRaft.sendRestMessage(ringCommand);
      connectedRaft.sendRestMessage(buttonCommand);
    } else {
      const command = `led/${LEDType}/pattern/${patternName}?c=${colour}${isThereMod ? `&mod=${mod}` : ""}`;
      connectedRaft.sendRestMessage(command);
    }
  }
  turnOffLEDs(args, utils) {
    const connectedRaft = getRaftUsingTargetId(utils.target.id);
    if (!connectedRaft) return 0;
    const command1 = `led/ring/color/000000`;
    const command2 = `led/button/color/000000`;
    console.log("command1", command1);
    console.log("command2", command2);
    connectedRaft.currentColour = null;
    connectedRaft.sendRestMessage(command1);
    connectedRaft.sendRestMessage(command2);
    return new Promise(resolve => setTimeout(resolve, 100));
  }
  /* END OF LOOKS BLOCKS */

  /* SOUND BLOCKS */
  composeTune(args) {
    const rawTune = args && Object.prototype.hasOwnProperty.call(args, 'TUNE') ? args.TUNE : '';
    const bundle = ensureTuneBundle(rawTune);
    return JSON.stringify(bundle);
  }

  async playCustomTune(args, utils) {
    const connectedRaft = getRaftUsingTargetId(utils.target.id);
    if (!connectedRaft) return 0;

    const rawTune = args && Object.prototype.hasOwnProperty.call(args, 'TUNE') ? args.TUNE : '';
    const bundle = ensureTuneBundle(rawTune);
    const command = `audio/rtttl/${bundle.rtttl}`;
    connectedRaft.sendRestMessage(command);
    const waitMs = estimateTuneDurationMs(bundle);
    if (waitMs > 0) {
      await new Promise(resolve => setTimeout(resolve, waitMs));
    }
  }

  tuneFromText(args) {
    const text = args && Object.prototype.hasOwnProperty.call(args, 'TEXT') ? args.TEXT : '';
    const bundle = parseTuneFromText(text);
    return JSON.stringify(bundle);
  }

  getTuneProperty(args) {
    const property = args && Object.prototype.hasOwnProperty.call(args, 'PROPERTY') ? args.PROPERTY : '';
    const rawTune = args && Object.prototype.hasOwnProperty.call(args, 'TUNE') ? args.TUNE : '';
    const bundle = ensureTuneBundle(rawTune);
    switch (property) {
      case 'title':
        return bundle.title;
      case 'bpm':
        return bundle.bpm;
      case 'defaultDuration':
        return bundle.defaultDuration;
      case 'defaultOctave':
        return bundle.defaultOctave;
      case 'length':
        return bundle.notes.length;
      case 'rtttl':
        return bundle.rtttl;
      default:
        return '';
    }
  }

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
    // COMMENT IN THE FOLLOWING CODE ONCE THE AUDIO/NOTE API IS FIXED
    for (const noteObj of noteFrequencies) {
      if (noteObj.note === note) {
        const freq = noteObj.freq;
        const durationInMs = duration * 1000;
        const command = `audio/note/${freq}/${durationInMs}`;
        connectedRaft.sendRestMessage(command);
        console.log("command", command);
        return new Promise(resolve => setTimeout(resolve, durationInMs));
      }
    }
    console.warn(`Note ${note} not found in noteFrequencies`);
    const { durationInMs, command } = getNoteForTimeCommand(note, duration);
    console.log("command", command);
    connectedRaft.sendRestMessage(command);
    return new Promise(resolve => setTimeout(resolve, durationInMs));
  }
  playTone(args, utils) {
    const connectedRaft = getRaftUsingTargetId(utils.target.id);
    if (!connectedRaft) return 0;
    const freq1 = args[cog_blocks_definitions.sound.cog_playTone.values.HZ1.name];
    const freq2 = args[cog_blocks_definitions.sound.cog_playTone.values.HZ2.name];
    const duration = args[cog_blocks_definitions.sound.cog_playTone.values.SECONDS.name];
    const durationInMs = duration * 1000;
    const command = `audio/sweep/${freq1}/${freq2}/${durationInMs}`;
    console.log("command", command);
    connectedRaft.sendRestMessage(command);
    return new Promise(resolve => setTimeout(resolve, durationInMs));
  }
  startNote(args, utils) {
    const connectedRaft = getRaftUsingTargetId(utils.target.id);
    if (!connectedRaft) return 0;
    const note = args[cog_blocks_definitions.sound.cog_startNote.values.NOTE.name];
    for (const noteObj of noteFrequencies) {
      if (noteObj.note === note) {
        const freq = noteObj.freq;
        const command = `audio/note/${freq}/1000`;
        connectedRaft.sendRestMessage(command);
        console.log("command", command);
        return;
      }
    }
    console.warn(`Note ${note} not found in noteFrequencies`);
  }
  stopAllSounds(args, utils) {
    const connectedRaft = getRaftUsingTargetId(utils.target.id);
    if (!connectedRaft) return;
    const command = `audio/stop`;
    console.log("command", command);
    connectedRaft.sendRestMessage(command);
  }
  setVolumeToPercentage(args, utils) {
    const connectedRaft = getRaftUsingTargetId(utils.target.id);
    if (!connectedRaft) return;
    const volume = Cast.toNumber(args[cog_blocks_definitions.sound.cog_setVolumeToPercentage.values.PERCENTAGE.name]);
    const volumeTransformed = volume / 10;
    const command = `audio/vol/${volumeTransformed}`;
    console.log("command", command);
    connectedRaft.sendRestMessage(command);
  }
  playSoundAtFrequency(args, utils) {
    const connectedRaft = getRaftUsingTargetId(utils.target.id);
    if (!connectedRaft) return 0;
    const frequency = args[cog_blocks_definitions.sound.cog_playSoundAtFrequency.values.FREQUENCY.name];
    const command = `audio/note/${frequency}/5000`;
    connectedRaft.sendRestMessage(command);
  }
  /* END OF SOUND BLOCKS */
}
module.exports = Scratch3CogBlocks;

/**
 * Helpers
 */
function setAllLEDsToColours_colourPicker(colours, cog) {
  const command = _LEDColourPickerApiCommandBuilder(colours);
  cog.sendRestMessage(command);
}

function _LEDColourPickerApiCommandBuilder(colorsArray) {
  let commandStr = "led/ring/setleds/";
  const numPixels = colorsArray.length;
  const idOffset = 9;
  for (let i = 0; i < numPixels; i++) {
    let color = colorsArray[(i + idOffset) % numPixels].replace("#", "");
    if (color === "9966FF") color = "000000"; // that's our "off" colour
    commandStr += color;
  }
  return commandStr;
}

function _getColourFromOperator(argumentValue) {
  if (typeof argumentValue === 'function') {
    return argumentValue();
  }
  return argumentValue;
}

function getRaftUsingTargetId(targetId) {
  if (!window.raftManager || !window.applicationManager || !window.applicationManager.connectedRafts) {
    return null;
  }
  const raftId = window.raftManager.raftIdAndDeviceIdMap[targetId];
  const raft = window.applicationManager.connectedRafts[raftId];
  return raft;
}

const TUNE_MAX_EVENTS = 256;
const TUNE_NOTE_PITCHES = ['c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#', 'a', 'a#', 'b'];
const TUNE_NOTE_LENGTHS = [1, 2, 4, 8, 16, 32];
const TUNE_OCTAVES = [3, 4, 5, 6, 7];
const DEFAULT_TUNE_BUNDLE = {
  schemaVersion: 1,
  title: 'MyTune',
  bpm: 120,
  defaultDuration: 4,
  defaultOctave: 5,
  notes: [],
  rtttl: 'MyTune:d=4,o=5,b=120:'
};

function cloneTuneBundle(bundle) {
  return JSON.parse(JSON.stringify(bundle));
}

function sanitiseTuneTitle(title) {
  if (title === null || title === undefined) {
    return DEFAULT_TUNE_BUNDLE.title;
  }
  const cleaned = String(title)
    .trim()
    .replace(/[^A-Za-z0-9_-]+/g, '_');
  return cleaned.length ? cleaned : DEFAULT_TUNE_BUNDLE.title;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function normaliseTuneBpm(bpm) {
  const numeric = Number(bpm);
  if (!numeric && numeric !== 0) {
    return DEFAULT_TUNE_BUNDLE.bpm;
  }
  return clamp(Math.round(numeric), 25, 900);
}

function normaliseTuneDuration(duration) {
  const numeric = Number(duration);
  if (TUNE_NOTE_LENGTHS.indexOf(numeric) !== -1) {
    return numeric;
  }
  return DEFAULT_TUNE_BUNDLE.defaultDuration;
}

function normaliseTuneOctave(octave) {
  const numeric = Number(octave);
  if (TUNE_OCTAVES.indexOf(numeric) !== -1) {
    return numeric;
  }
  return DEFAULT_TUNE_BUNDLE.defaultOctave;
}

function sanitiseTuneNotes(notes) {
  if (!Array.isArray(notes)) {
    return [];
  }
  const cleaned = [];
  for (let i = 0; i < notes.length && cleaned.length < TUNE_MAX_EVENTS; i++) {
    const event = notes[i];
    if (!event || typeof event !== 'object') {
      continue;
    }
    const kind = event.kind === 'rest' ? 'rest' : 'note';
    const entry = {
      kind: kind,
      dotted: Boolean(event.dotted)
    };
    if (event.length !== undefined) {
      entry.length = normaliseTuneDuration(event.length);
    }
    if (kind === 'note') {
      let pitch = typeof event.pitch === 'string' ? event.pitch.toLowerCase() : 'c';
      if (TUNE_NOTE_PITCHES.indexOf(pitch) === -1) {
        pitch = 'c';
      }
      entry.pitch = pitch;
      if (event.octave !== undefined && event.octave !== null) {
        entry.octave = normaliseTuneOctave(event.octave);
      }
    }
    cleaned.push(entry);
  }
  return cleaned;
}

function ensureTuneBundle(raw) {
  let parsed = raw;
  if (typeof raw === 'string') {
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      parsed = null;
    }
  }
  const base = parsed && typeof parsed === 'object' ? parsed : {};
  const bundle = {
    schemaVersion: 1,
    title: sanitiseTuneTitle(base.title),
    bpm: normaliseTuneBpm(base.bpm !== undefined ? base.bpm : DEFAULT_TUNE_BUNDLE.bpm),
    defaultDuration: normaliseTuneDuration(base.defaultDuration !== undefined ? base.defaultDuration : DEFAULT_TUNE_BUNDLE.defaultDuration),
    defaultOctave: normaliseTuneOctave(base.defaultOctave !== undefined ? base.defaultOctave : DEFAULT_TUNE_BUNDLE.defaultOctave),
    notes: sanitiseTuneNotes(base.notes || [])
  };
  const rtttlBuild = buildTuneRtttl(bundle);
  bundle.notes = sanitiseTuneNotes(bundle.notes);
  bundle.rtttl = rtttlBuild.rtttl;
  return bundle;
}

function buildTuneRtttl(tune) {
  const issues = [];
  const title = sanitiseTuneTitle(tune.title);
  const bpm = normaliseTuneBpm(tune.bpm);
  const defaultDuration = normaliseTuneDuration(tune.defaultDuration);
  const defaultOctave = normaliseTuneOctave(tune.defaultOctave);
  const events = Array.isArray(tune.notes) ? tune.notes : [];

  if (events.length > TUNE_MAX_EVENTS) {
    issues.push('too_many_notes');
  }

  const body = [];
  for (let i = 0; i < events.length && i < TUNE_MAX_EVENTS; i++) {
    const event = events[i];
    if (!event || typeof event !== 'object') {
      continue;
    }
    const kind = event.kind === 'rest' ? 'rest' : 'note';
    const pieces = [];
    const duration = normaliseTuneDuration(event.length !== undefined ? event.length : defaultDuration);
    if (duration !== defaultDuration) {
      pieces.push(String(duration));
    }
    if (kind === 'rest') {
      pieces.push('p');
    } else {
      let pitch = typeof event.pitch === 'string' ? event.pitch.toLowerCase() : 'c';
      if (TUNE_NOTE_PITCHES.indexOf(pitch) === -1) {
        pitch = 'c';
      }
      pieces.push(pitch);
      const octave = event.octave !== undefined && event.octave !== null ? normaliseTuneOctave(event.octave) : defaultOctave;
      if (octave !== defaultOctave) {
        pieces.push(String(octave));
      }
    }
    if (event.dotted) {
      pieces.push('.');
    }
    body.push(pieces.join(''));
  }

  const header = `${title}:d=${defaultDuration},o=${defaultOctave},b=${bpm}`;
  return {
    rtttl: `${header}:${body.join(',')}`,
    issues: issues
  };
}

function estimateTuneDurationMs(tune) {
  const bundle = ensureTuneBundle(tune);
  const beatMs = 60000 / bundle.bpm;
  let totalMs = 0;
  const defaultDuration = bundle.defaultDuration;
  for (let i = 0; i < bundle.notes.length; i++) {
    const event = bundle.notes[i];
    const duration = normaliseTuneDuration(event.length !== undefined ? event.length : defaultDuration);
    let ms = beatMs * (4 / duration);
    if (event.dotted) {
      ms *= 1.5;
    }
    totalMs += ms;
  }
  totalMs = clamp(totalMs, 0, 60000 * 10);
  return Math.round(totalMs) + 100;
}

function parseTuneFromText(text) {
  if (typeof text !== 'string') {
    return ensureTuneBundle(DEFAULT_TUNE_BUNDLE);
  }
  const trimmed = text.trim();
  if (!trimmed.length) {
    return ensureTuneBundle(DEFAULT_TUNE_BUNDLE);
  }

  const sections = trimmed.split(':');
  if (sections.length < 3) {
    return ensureTuneBundle(DEFAULT_TUNE_BUNDLE);
  }
  const title = sections[0];
  const header = sections[1];
  const body = sections.slice(2).join(':');

  const headerParts = header.split(',');
  let defaultDuration = DEFAULT_TUNE_BUNDLE.defaultDuration;
  let defaultOctave = DEFAULT_TUNE_BUNDLE.defaultOctave;
  let bpm = DEFAULT_TUNE_BUNDLE.bpm;
  headerParts.forEach(part => {
    const [key, value] = part.split('=');
    if (!key || !value) return;
    switch (key.trim()) {
      case 'd':
        defaultDuration = normaliseTuneDuration(value);
        break;
      case 'o':
        defaultOctave = normaliseTuneOctave(value);
        break;
      case 'b':
        bpm = normaliseTuneBpm(value);
        break;
      default:
        break;
    }
  });

  const rawEvents = body.split(',');
  const events = [];
  rawEvents.forEach(token => {
    let noteStr = token.trim();
    if (!noteStr) return;
    let dotted = false;
    if (noteStr.endsWith('.')) {
      dotted = true;
      noteStr = noteStr.slice(0, -1);
    }
    const lengthMatch = noteStr.match(/^(\d+)/);
    let length = null;
    if (lengthMatch) {
      length = Number(lengthMatch[1]);
      noteStr = noteStr.slice(lengthMatch[1].length);
    }
    if (!noteStr.length) {
      return;
    }
    const kindChar = noteStr.charAt(0).toLowerCase();
    if (kindChar === 'p') {
      const restEvent = {
        kind: 'rest',
        dotted: dotted
      };
      if (length !== null) {
        restEvent.length = length;
      }
      events.push(restEvent);
      return;
    }
    let pitch = kindChar;
    let remainder = noteStr.slice(1);
    if (remainder.startsWith('#')) {
      pitch += '#';
      remainder = remainder.slice(1);
    }
    const octaveMatch = remainder.match(/^(\d+)/);
    let octave = null;
    if (octaveMatch) {
      octave = Number(octaveMatch[1]);
    }
    const noteEvent = {
      kind: 'note',
      pitch: pitch,
      dotted: dotted
    };
    if (length !== null) {
      noteEvent.length = length;
    }
    if (octave !== null) {
      noteEvent.octave = octave;
    }
    events.push(noteEvent);
  });

  return ensureTuneBundle({
    schemaVersion: 1,
    title: title,
    bpm: bpm,
    defaultDuration: defaultDuration,
    defaultOctave: defaultOctave,
    notes: events
  });
}

function parseNotesValue(value) {
  if (Array.isArray(value)) {
    return value;
  }
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      if (parsed && typeof parsed === 'object' && Array.isArray(parsed.notes)) {
        return parsed.notes;
      }
    } catch (e) {
      return [];
    }
  }
  if (value && typeof value === 'object' && Array.isArray(value.notes)) {
    return value.notes;
  }
  return [];
}

function calculateBPM(seconds, d = 4) {
  // Calculate the BPM based on the fixed d value and the given duration in seconds
  let bpm = 240 / (seconds * d);

  // Round BPM to a whole number (since BPM is typically an integer)
  bpm = Math.round(bpm);

  return bpm;
}

function _getRtttlTuneCommand(tune) {
  if (typeof tune === 'string' && tune.indexOf(':') !== -1) {
    const bundle = parseTuneFromText(tune);
    return {
      durationInMs: estimateTuneDurationMs(bundle),
      command: `audio/rtttl/${bundle.rtttl}`
    };
  }
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
