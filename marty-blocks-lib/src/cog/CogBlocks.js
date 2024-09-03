
const Cog_EVENT_SUBSCRIPTIONS = {
    TILT_BACKWARD: 'tiltbackward_sub',
    TILT_FORWARD: 'tiltforward_sub',
    TILT_RIGHT: 'tiltright_sub',
    TILT_LEFT: 'tiltleft_sub',
    NO_TILT: 'notilt_sub',

    ON_MOVE: 'onmove_sub',
    ON_SHAKE: 'onshake_sub',
    NO_MOVE: 'nomove_sub',

    ON_ROTATE_CLOCKWISE: 'onrotateclockwise_sub',
    ON_ROTATE_COUNTER_CLOCKWISE: 'onrotatecounterclockwise_sub',
    NO_ROTATE: 'norotate_sub',

    ON_BUTTON_CLICK: 'onbuttonclick_sub',
    NO_BUTTON_CLICK: 'nobuttonclick_sub',

    OBJECT_SENSE_0: 'objectsense0_sub',
    OBJECT_SENSE_1: 'objectsense1_sub',
    OBJECT_SENSE_2: 'objectsense2_sub',
    NO_OBJECT_SENSE: 'noobjectsense_sub',

    LIGHT_SENSE: 'lightsense_sub',
    NO_LIGHT_SENSE: 'nolightsense_sub',

    IR_MESSAGE_0: 'irmessage0_sub',
    IR_MESSAGE_1: 'irmessage1_sub',
    NO_IR_MESSAGE: 'noirmessage_sub'
}

const OBJECT_SENSE = {
    OBJECT_SENSE_0: 'object-sense-0',
    OBJECT_SENSE_1: 'object-sense-1',
    OBJECT_SENSE_2: 'object-sense-2',
    NO_OBJECT_SENSE: 'no-object-sense'
}

const LIGHT_SENSE = {
    LIGHT_SENSE: 'light-sense',
    NO_LIGHT_SENSE: 'no-light-sense'
}

const IR_MESSAGE = {
    IR_MESSAGE_0: 'ir-message-0',
    IR_MESSAGE_1: 'ir-message-1',
}

const TILT_DIRECTIONS = {
    FORWARD: 'forward',
    BACKWARD: 'backward',
    LEFT: 'left',
    RIGHT: 'right',
    NO_TILT: 'no_tilt'
}

const ROTATE_DIRECTIONS = {
    CLOCKWISE: 'clockwise',
    COUNTER_CLOCKWISE: 'counter_clockwise'
}

const MOVE_TYPES = {
    MOVE: 'move',
    SHAKE: 'shake'
}
class CogBlocks {

    constructor(cogInterface) {
        this.cogInterface = cogInterface;
        this.cogInterface.subscribe(Cog_EVENT_SUBSCRIPTIONS.TILT_FORWARD, this.cogInterface.cogPublishedEvents.TILT_FORWARD, this.onTiltForward.bind(this));
        this.cogInterface.subscribe(Cog_EVENT_SUBSCRIPTIONS.TILT_BACKWARD, this.cogInterface.cogPublishedEvents.TILT_BACKWARD, this.onTiltBackward.bind(this));
        this.cogInterface.subscribe(Cog_EVENT_SUBSCRIPTIONS.TILT_LEFT, this.cogInterface.cogPublishedEvents.TILT_LEFT, this.onTiltLeft.bind(this));
        this.cogInterface.subscribe(Cog_EVENT_SUBSCRIPTIONS.TILT_RIGHT, this.cogInterface.cogPublishedEvents.TILT_RIGHT, this.onTiltRight.bind(this));
        this.cogInterface.subscribe(Cog_EVENT_SUBSCRIPTIONS.NO_TILT, this.cogInterface.cogPublishedEvents.NO_TILT, this.onNoTilt.bind(this));
        this.cogInterface.subscribe(Cog_EVENT_SUBSCRIPTIONS.ON_ROTATE_CLOCKWISE, this.cogInterface.cogPublishedEvents.ROTATE_CLOCKWISE, this.onRotateClockwise.bind(this));
        this.cogInterface.subscribe(Cog_EVENT_SUBSCRIPTIONS.ON_ROTATE_COUNTER_CLOCKWISE, this.cogInterface.cogPublishedEvents.ROTATE_COUNTER_CLOCKWISE, this.onRotateCounterClockwise.bind(this));
        this.cogInterface.subscribe(Cog_EVENT_SUBSCRIPTIONS.NO_ROTATE, this.cogInterface.cogPublishedEvents.NO_ROTATE, this.onNoRotate.bind(this));
        this.cogInterface.subscribe(Cog_EVENT_SUBSCRIPTIONS.ON_MOVE, this.cogInterface.cogPublishedEvents.MOVE, this.onMove.bind(this));
        this.cogInterface.subscribe(Cog_EVENT_SUBSCRIPTIONS.ON_SHAKE, this.cogInterface.cogPublishedEvents.SHAKE, this.onShake.bind(this));
        this.cogInterface.subscribe(Cog_EVENT_SUBSCRIPTIONS.NO_MOVE, this.cogInterface.cogPublishedEvents.NO_MOVE, this.onNoMove.bind(this));
        this.cogInterface.subscribe(Cog_EVENT_SUBSCRIPTIONS.ON_BUTTON_CLICK, this.cogInterface.cogPublishedEvents.BUTTON_CLICK, this.onButtonClick.bind(this));
        this.cogInterface.subscribe(Cog_EVENT_SUBSCRIPTIONS.NO_BUTTON_CLICK, this.cogInterface.cogPublishedEvents.NO_BUTTON_CLICK, this.onNoButtonClick.bind(this));
        this.cogInterface.subscribe(Cog_EVENT_SUBSCRIPTIONS.OBJECT_SENSE_0, this.cogInterface.cogPublishedEvents.OBJECT_SENSE_0, this.onObjectSense0.bind(this));
        this.cogInterface.subscribe(Cog_EVENT_SUBSCRIPTIONS.OBJECT_SENSE_1, this.cogInterface.cogPublishedEvents.OBJECT_SENSE_1, this.onObjectSense1.bind(this));
        this.cogInterface.subscribe(Cog_EVENT_SUBSCRIPTIONS.OBJECT_SENSE_2, this.cogInterface.cogPublishedEvents.OBJECT_SENSE_2, this.onObjectSense2.bind(this));
        this.cogInterface.subscribe(Cog_EVENT_SUBSCRIPTIONS.NO_OBJECT_SENSE, this.cogInterface.cogPublishedEvents.NO_OBJECT_SENSE, this.onNoObjectSense.bind(this));
        this.cogInterface.subscribe(Cog_EVENT_SUBSCRIPTIONS.LIGHT_SENSE, this.cogInterface.cogPublishedEvents.LIGHT_SENSE, this.onLightSense.bind(this));
        this.cogInterface.subscribe(Cog_EVENT_SUBSCRIPTIONS.NO_LIGHT_SENSE, this.cogInterface.cogPublishedEvents.NO_LIGHT_SENSE, this.onNoLightSense.bind(this));
        this.cogInterface.subscribe(Cog_EVENT_SUBSCRIPTIONS.IR_MESSAGE_0, this.cogInterface.cogPublishedEvents.IR_MESSAGE_0, this.onIRMessage0.bind(this));
        this.cogInterface.subscribe(Cog_EVENT_SUBSCRIPTIONS.IR_MESSAGE_1, this.cogInterface.cogPublishedEvents.IR_MESSAGE_1, this.onIRMessage1.bind(this));

        this.objectSense = OBJECT_SENSE;
        this.tiltDirections = TILT_DIRECTIONS;
        this.rotateDirections = ROTATE_DIRECTIONS;
        this.moveTypes = MOVE_TYPES;
        this.IRMessage = IR_MESSAGE;
        this.p2State = {};
        this.p2State.tiltDirection = '';
        this.p2State.rotateDirection = '';
        this.p2State.moveType = '';
        this.p2State.isButtonPushed = false;
        this.p2State.objectSense = '';
        this.p2State.lightSensed = '';
    }

    dance() {
        this.cogInterface.sendRICRESTMsg('traj/dance')
    }

    // Cog Event Handlers
    onTiltForward() {
        this.p2State.tiltDirection = TILT_DIRECTIONS.FORWARD;
    }

    onTiltBackward() {
        this.p2State.tiltDirection = TILT_DIRECTIONS.BACKWARD;
    }

    onTiltLeft() {
        this.p2State.tiltDirection = TILT_DIRECTIONS.LEFT;
    }

    onTiltRight() {
        this.p2State.tiltDirection = TILT_DIRECTIONS.RIGHT;
    }

    onNoTilt() {
        this.p2State.tiltDirection = TILT_DIRECTIONS.NO_TILT;
    }

    onRotateClockwise() {
        this.p2State.rotateDirection = ROTATE_DIRECTIONS.CLOCKWISE;
    }

    onRotateCounterClockwise() {
        this.p2State.rotateDirection = ROTATE_DIRECTIONS.COUNTER_CLOCKWISE;
    }

    onNoRotate() {
        this.p2State.rotateDirection = '';
    }

    onMove() {
        this.p2State.moveType = MOVE_TYPES.MOVE;
    }

    onShake() {
        this.p2State.moveType = MOVE_TYPES.SHAKE;
    }

    onNoMove() {
        this.p2State.moveType = '';
    }

    onButtonClick() {
        this.p2State.isButtonPushed = true;
    }

    onNoButtonClick() {
        this.p2State.isButtonPushed = false;
    }

    onObjectSense0() {
        this.p2State.objectSense = OBJECT_SENSE.OBJECT_SENSE_0;
    }

    onObjectSense1() {
        this.p2State.objectSense = OBJECT_SENSE.OBJECT_SENSE_1;
    }

    onObjectSense2() {
        this.p2State.objectSense = OBJECT_SENSE.OBJECT_SENSE_2;
    }

    onLightSense() {
        this.p2State.lightSensed = LIGHT_SENSE.LIGHT_SENSE;
    }

    onNoLightSense() {
        this.p2State.lightSensed = LIGHT_SENSE.NO_LIGHT_SENSE;
    }

    onIRMessage0() {
        this.p2State.IRMessage = IR_MESSAGE.IR_MESSAGE_0;
    }

    onIRMessage1() {
        this.p2State.IRMessage = IR_MESSAGE.IR_MESSAGE_1;
    }

    onNoObjectSense() {
        this.p2State.objectSense = OBJECT_SENSE.NO_OBJECT_SENSE;
    }

    // Sensor Blocks
    getAccelerometer(axis) {
        try {
            const stateInfo = this.cogInterface.getStateInfo();
            const accelData = stateInfo.LSM6DS;
            return accelData['a' + axis];
        } catch (error) {
            return -1;
        }
    }

    getGyroscope(axis) {
        try {
            const stateInfo = this.cogInterface.getStateInfo();
            const gyroData = stateInfo.LSM6DS;
            return gyroData['g' + axis];
        } catch (error) {
            return -1;
        }
    }

    getIRSensor(sensorId) {
        try {
            const stateInfo = this.cogInterface.getStateInfo();
            const irData = stateInfo.Light;
            return irData.irVals[sensorId];
        } catch (error) {
            return -1;
        }
    }

    getAmbientLightValue() {
        try {
            const stateInfo = this.cogInterface.getStateInfo();
            const ambientData = stateInfo.Light.ambientVals;
            return ambientData[0];
        } catch (error) {
            return -1;
        }
    }

    getButtonState() {
        return this.p2State.isButtonPushed;
    }

    getObstacleSensed(side) {
        if (side === 'right') {
            return this.p2State.objectSense === OBJECT_SENSE.OBJECT_SENSE_0;
        } else if (side === 'left') {
            return this.p2State.objectSense === OBJECT_SENSE.OBJECT_SENSE_1;
        } else {
            return this.p2State.objectSense === OBJECT_SENSE.OBJECT_SENSE_2;
        }
    }

    getLightSensed() {
        return this.p2State.lightSensed === LIGHT_SENSE.LIGHT_SENSE;
    }

    getIsMoving() {
        return this.p2State.moveType === MOVE_TYPES.MOVE;
    }

    getIsShaking() {
        return this.p2State.moveType === MOVE_TYPES.SHAKE;
    }

    getTiltDirection() {
        return this.p2State.tiltDirection;
    }


    // Sound Blocks
    async playNoteForTime(note, time) {
        let bpm, d, command;
        d = 4;
        switch (note) {
            case "notec":
                bpm = calculateBPM(time);
                command = `audio/rtttl/NoteC:d=${d},o=5,b=${bpm}:c`;
                break;
            case "notecsharp":
                bpm = calculateBPM(time);
                command = `audio/rtttl/NoteCSharp:d=${d},o=5,b=${bpm}:c#`;
                break;
            case "noted":
                bpm = calculateBPM(time);
                command = `audio/rtttl/NoteD:d=${d},o=5,b=${bpm}:d`;
                break;
            case "notedsharp":
                bpm = calculateBPM(time);
                command = `audio/rtttl/NoteDSharp:d=${d},o=5,b=${bpm}:d#`;
                break;
            case "notee":
                bpm = calculateBPM(time);
                command = `audio/rtttl/NoteE:d=${d},o=5,b=${bpm}:e`;
                break;
            case "notef":
                bpm = calculateBPM(time);
                command = `audio/rtttl/NoteF:d=${d},o=5,b=${bpm}:f`;
                break;
            case "notefsharp":
                bpm = calculateBPM(time);
                command = `audio/rtttl/NoteFSharp:d=${d},o=5,b=${bpm}:f#`;
                break;
            case "noteg":
                bpm = calculateBPM(time);
                command = `audio/rtttl/NoteG:d=${d},o=5,b=${bpm}:g`;
                break;
            case "notegsharp":
                bpm = calculateBPM(time);
                command = `audio/rtttl/NoteGSharp:d=${d},o=5,b=${bpm}:g#`;
                break;
            case "notea":
                bpm = calculateBPM(time);
                command = `audio/rtttl/NoteA:d=${d},o=5,b=${bpm}:a`;
                break;
            case "noteasharp":
                bpm = calculateBPM(time);
                command = `audio/rtttl/NoteASharp:d=${d},o=5,b=${bpm}:a#`;
                break;
            case "noteb":
                bpm = calculateBPM(time);
                command = `audio/rtttl/NoteB:d=${d},o=5,b=${bpm}:b`;
                break;
            default:
                break;
        }
        console.log("command", command);
        this.cogInterface.sendRICRESTMsg(command);
        await new Promise(resolve => setTimeout(resolve, time * 1000));
    }

    async playRtttlTune(tune) {
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
        console.log("command", command);
        this.cogInterface.sendRICRESTMsg(command);
        await new Promise(resolve => setTimeout(resolve, durationInMs));
    }
    setVolume(volume) {
        // set volume
        console.log("volume", volume)
    }

    setPitch(pitch) {
        // set pitch
        console.log("pitch", pitch)
    }

    stopSounds() {
        // stop sounds
        console.log("stop sounds")
    }

    // Looks blocks
    setLEDToColour(ledId, colour) {
        const command = `led//setled/${ledId}/${colour}`;
        console.log("command", command);
        this.cogInterface.sendRICRESTMsg(command);
    }

    _LEDColourPickerApiCommandBuilder(colorsArray) {
        let command = `indicator/set?`;
        for (let i = 0; i < colorsArray.length; i++) {
            let color = colorsArray[i].replace("#", "");
            if (color === "5ba591") color = "000000"; // that's our "off" colour
            const idxOffset = 8;
            const ledIdMapped = (i + idxOffset) % colorsArray.length;
            let end = "&";
            if (i === colorsArray.length) end = "";
            command += `c${ledIdMapped}=${color}${end}`;
        }
        return command;
    }

    setAllLEDsToColours_colourPicker(colours) {
        const command = this._LEDColourPickerApiCommandBuilder(colours);
        console.log("command", command);
        this.cogInterface.sendRICRESTMsg(command);
    }

    setAllLEDsToColour(colour) {
        this.currentColour = colour;
        const command = `led//color/${colour}`
        console.log("command", command);
        this.cogInterface.sendRICRESTMsg(command);
    }

    setLEDPattern(patternName, mod) {
        let colour = this.currentColour || "#00FF00";
        colour = colour.replace("#", "");
        const patternCommand = `led//pattern/${patternName}?c=${colour}${mod ? `&mod=${mod}` : ''}`;
        console.log("patternCommand", patternCommand);
        this.cogInterface.sendRICRESTMsg(patternCommand);
    }

    turnOffLEDs() {
        const command = `led//off`
        console.log("command", command);
        this.currentColour = "#000000";
        this.cogInterface.sendRICRESTMsg(command);
    }

}

module.exports = CogBlocks;

function calculateBPM(seconds, d = 4) {
    // Calculate the BPM based on the fixed d value and the given duration in seconds
    let bpm = 240 / (seconds * d);

    // Round BPM to a whole number (since BPM is typically an integer)
    bpm = Math.round(bpm);

    return bpm;
}