
const Axiom_EVENT_SUBSCRIPTIONS = {
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

    OBJECT_SENSE_1: 'objectsense1_sub',
    OBJECT_SENSE_2: 'objectsense2_sub',
    NO_OBJECT_SENSE: 'noobjectsense_sub',
}

const OBJECT_SENSE = {
    OBJECT_SENSE_1: 'object-sense-1',
    OBJECT_SENSE_2: 'object-sense-2',
    NO_OBJECT_SENSE: 'no-object-sense'
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
class AxiomBlocks {

    constructor(axiomInterface) {
        this.axiomInterface = axiomInterface;
        this.axiomInterface.subscribe(Axiom_EVENT_SUBSCRIPTIONS.TILT_FORWARD, this.axiomInterface.axiomPublishedEvents.TILT_FORWARD, this.onTiltForward.bind(this));
        this.axiomInterface.subscribe(Axiom_EVENT_SUBSCRIPTIONS.TILT_BACKWARD, this.axiomInterface.axiomPublishedEvents.TILT_BACKWARD, this.onTiltBackward.bind(this));
        this.axiomInterface.subscribe(Axiom_EVENT_SUBSCRIPTIONS.TILT_LEFT, this.axiomInterface.axiomPublishedEvents.TILT_LEFT, this.onTiltLeft.bind(this));
        this.axiomInterface.subscribe(Axiom_EVENT_SUBSCRIPTIONS.TILT_RIGHT, this.axiomInterface.axiomPublishedEvents.TILT_RIGHT, this.onTiltRight.bind(this));
        this.axiomInterface.subscribe(Axiom_EVENT_SUBSCRIPTIONS.NO_TILT, this.axiomInterface.axiomPublishedEvents.NO_TILT, this.onNoTilt.bind(this));
        this.axiomInterface.subscribe(Axiom_EVENT_SUBSCRIPTIONS.ON_ROTATE_CLOCKWISE, this.axiomInterface.axiomPublishedEvents.ROTATE_CLOCKWISE, this.onRotateClockwise.bind(this));
        this.axiomInterface.subscribe(Axiom_EVENT_SUBSCRIPTIONS.ON_ROTATE_COUNTER_CLOCKWISE, this.axiomInterface.axiomPublishedEvents.ROTATE_COUNTER_CLOCKWISE, this.onRotateCounterClockwise.bind(this));
        this.axiomInterface.subscribe(Axiom_EVENT_SUBSCRIPTIONS.NO_ROTATE, this.axiomInterface.axiomPublishedEvents.NO_ROTATE, this.onNoRotate.bind(this));
        this.axiomInterface.subscribe(Axiom_EVENT_SUBSCRIPTIONS.ON_MOVE, this.axiomInterface.axiomPublishedEvents.MOVE, this.onMove.bind(this));
        this.axiomInterface.subscribe(Axiom_EVENT_SUBSCRIPTIONS.ON_SHAKE, this.axiomInterface.axiomPublishedEvents.SHAKE, this.onShake.bind(this));
        this.axiomInterface.subscribe(Axiom_EVENT_SUBSCRIPTIONS.NO_MOVE, this.axiomInterface.axiomPublishedEvents.NO_MOVE, this.onNoMove.bind(this));
        this.axiomInterface.subscribe(Axiom_EVENT_SUBSCRIPTIONS.ON_BUTTON_CLICK, this.axiomInterface.axiomPublishedEvents.BUTTON_CLICK, this.onButtonClick.bind(this));
        this.axiomInterface.subscribe(Axiom_EVENT_SUBSCRIPTIONS.NO_BUTTON_CLICK, this.axiomInterface.axiomPublishedEvents.NO_BUTTON_CLICK, this.onNoButtonClick.bind(this));
        this.axiomInterface.subscribe(Axiom_EVENT_SUBSCRIPTIONS.OBJECT_SENSE_1, this.axiomInterface.axiomPublishedEvents.OBJECT_SENSE_1, this.onObjectSense1.bind(this));
        this.axiomInterface.subscribe(Axiom_EVENT_SUBSCRIPTIONS.OBJECT_SENSE_2, this.axiomInterface.axiomPublishedEvents.OBJECT_SENSE_2, this.onObjectSense2.bind(this));
        this.axiomInterface.subscribe(Axiom_EVENT_SUBSCRIPTIONS.NO_OBJECT_SENSE, this.axiomInterface.axiomPublishedEvents.NO_OBJECT_SENSE, this.onNoObjectSense.bind(this));
        
        this.objectSense = OBJECT_SENSE;
        this.tiltDirections = TILT_DIRECTIONS;
        this.rotateDirections = ROTATE_DIRECTIONS;
        this.moveTypes = MOVE_TYPES;
        this.p2State = {};
        this.p2State.tiltDirection = ''; 
        this.p2State.rotateDirection = ''; 
        this.p2State.moveType = ''; 
        this.p2State.isButtonPushed = false;
        this.p2State.objectSense = '';
    }

    dance() {
        this.axiomInterface.sendRICRESTMsg('traj/dance')
    }

    // Axiom Event Handlers
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

    onObjectSense1() {
        this.p2State.objectSense = OBJECT_SENSE.OBJECT_SENSE_1;
    }

    onObjectSense2() {
        this.p2State.objectSense = OBJECT_SENSE.OBJECT_SENSE_2;
    }

    onNoObjectSense() {
        this.p2State.objectSense = OBJECT_SENSE.NO_OBJECT_SENSE;
    }

    // Sensor Blocks
    getAccelerometer(axis) {
        const stateInfo = this.axiomInterface.getStateInfo();
        const accelData = stateInfo.imuData.accel;
        return accelData[axis];
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
        this.axiomInterface.sendRICRESTMsg(command);
    }

}

module.exports = AxiomBlocks;