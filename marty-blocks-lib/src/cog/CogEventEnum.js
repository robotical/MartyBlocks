
 const CogInterfaceEvents = {
    CONNECTED: "cog-connected",
    DISCONNECTED: "cog-disconnected",

    TILT_RIGHT: 'tilt-right',
    TILT_LEFT: 'tilt-left',
    TILT_BACKWARD: 'tilt-backward',
    TILT_FORWARD: 'tilt-forward',
    NO_TILT: 'no-tilt',
    MOVE: 'move',
    NO_MOVE: 'no-move',
    SHAKE: 'shake',
    ROTATE_CLOCKWISE: 'rotate-clockwise',
    ROTATE_COUNTER_CLOCKWISE: 'rotate-counter-clockwise',
    NO_ROTATE: 'no-rotate',
    BUTTON_CLICK: 'button-click',
    NO_BUTTON_CLICK: 'no-button-click',

    OBJECT_SENSE_0: 'object-sense-0',
    OBJECT_SENSE_1: 'object-sense-1',
    OBJECT_SENSE_2: 'object-sense-2',
    NO_OBJECT_SENSE: 'no-object-sense',

    LIGHT_SENSE: 'light-sense',
    NO_LIGHT_SENSE: 'no-light-sense',

    IR_MESSAGE_0: 'ir-message-0',
    IR_MESSAGE_1: 'ir-message-1',
    NO_IR_MESSAGE: 'no-ir-message'
}

module.exports = CogInterfaceEvents;
