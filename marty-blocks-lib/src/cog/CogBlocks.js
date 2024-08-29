
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

    getButtonState() {
        return this.p2State.isButtonPushed;
    }

    getObstacleSensed(side)  {
        if (side === 'left') {
            return this.p2State.objectSense === OBJECT_SENSE.OBJECT_SENSE_0;
        } else if (side === 'right') {
            return this.p2State.objectSense === OBJECT_SENSE.OBJECT_SENSE_1;
        } else {
            return this.p2State.objectSense === OBJECT_SENSE.OBJECT_SENSE_2;
        }
    }

    getIsMoving() {
        return this.p2State.moveType === MOVE_TYPES.MOVE;   
    }

    getIsShaking() {
        return this.p2State.moveType === MOVE_TYPES.SHAKE;
    }


    // Sound Blocks
    setVolume(volume) {
        // set volume
        console.log("volume", volume)
    }

    // Looks blocks
    setLEDToColour(ledId, colour) {
        console.log("ledId", ledId, "colour", colour);
        const command = `led//setled/${ledId}/${colour}`;
        this.cogInterface.sendRICRESTMsg(command);
    }

}

module.exports = CogBlocks;