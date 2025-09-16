export const cog_blocks_definitions = {
    /* Event Blocks */
    events: {
        cog_onTilt: {
            type: 'cog_onTilt',
            values: {
                DIRECTION: {
                    name: 'DIRECTION',
                    field: {
                        name: 'DIRECTION',
                        value: ''
                    }
                }
            }
        },
        cog_onShake: {
            type: 'cog_onShake',
            values: {
                MOVE_TYPE: {
                    name: 'MOVE_TYPE',
                    field: {
                        name: 'MOVE_TYPE',
                        value: ''
                    }
                }
            }
        },
        cog_onButtonPush: {
            type: 'cog_onButtonPush',
        },
        cog_onObjectSense: {
            type: 'cog_onObjectSense',
            values: {
                SIDE: {
                    name: 'SIDE',
                    field: {
                        name: 'SIDE',
                        value: ''
                    }
                }
            }
        },
        cog_onLightSense: {
            type: 'cog_onLightSense',
        },
        // cog_onIRMessageReceived: {
        //     type: 'cog_onIRMessageReceived',
        //     values: {
        //         SIDE: {
        //             name: 'SIDE',
        //             field: {
        //                 name: 'SIDE',
        //                 value: ''
        //             }
        //         }
        //     }
        // },
    },
    /* End of Event Blocks */
    /* Sensor Blocks */
    sensing: {
        cog_getAccelerometer: {
            type: 'cog_getAccelerometerX',
            values: {
                AXIS: {
                    name: 'AXIS',
                    field: {
                        name: 'AXIS',
                        value: ''
                    }
                }
            }
        },
        // cog_getGyroscope: {
        //     type: 'cog_getGyroscopeX',
        //     values: {
        //         AXIS: {
        //             name: 'AXIS',
        //             field: {
        //                 name: 'AXIS',
        //                 value: ''
        //             }
        //         }
        //     }
        // },
        cog_getButtonClicked: {
            type: 'cog_getButtonClicked',
        },
        cog_getButtonForceValue: {
            type: 'cog_getButtonForceValue',
        },
        cog_getButtonForceValuePercentage: {
            type: 'cog_getButtonForceValuePercentage',
        },
        cog_getObstacleSensed: {
            type: 'cog_getObstacleSensed',
            values: {
                SIDE: {
                    name: 'SIDE',
                    field: {
                        name: 'SIDE',
                        value: ''
                    }
                }
            }
        },
        cog_getLightSensed: {
            type: 'cog_getLightSensed',
        },
        cog_getIRSensorValue: {
            type: 'cog_getIRSensorValue',
            values: {
                SIDE: {
                    name: 'SIDE',
                    field: {
                        name: 'SIDE',
                        value: ''
                    }
                }
            }
        },
        cog_getAmbientLightValue: {
            type: 'cog_getAmbientLightValue',
        },
        cog_getShakeSensed: {
            type: 'cog_getShakeSensed',
        },
        cog_getTiltDirection: {
            type: 'cog_getTiltDirection',
        },
    },
    /* End of Sensor Blocks */
    /* Sound Blocks */
    sound: {
        cog_composeTune: {
            type: 'cog_composeTune',
        },
        cog_playCustomTune: {
            type: 'cog_playCustomTune',
            values: {
                TUNE: {
                    name: 'TUNE',
                }
            }
        },
        cog_tuneFromText: {
            type: 'cog_tuneFromText',
            values: {
                TEXT: {
                    name: 'TEXT',
                    shadow: {
                        type: 'text',
                        field: {
                            name: 'TEXT',
                            value: 'MyTune:d=4,o=5,b=120:c',
                        }
                    }
                }
            }
        },
        cog_tuneGetProperty: {
            type: 'cog_tuneGetProperty',
            values: {
                TUNE: {
                    name: 'TUNE',
                }
            }
        },
        cog_playRtttlTune: {
            type: 'cog_playRtttlTune',
            values: {
                TUNE: {
                    name: 'TUNE',
                    field: {
                        name: 'TUNE',
                        value: ''
                    }
                }
            }
        },
        cog_playNoteForTime: {
            type: 'cog_playNoteForTime',
            values: {
                NOTE: {
                    name: 'NOTE',
                    shadow: {
                        type: 'notesmenu',
                        field: {
                            name: 'NOTE',
                            value: 'notec4',
                        }
                    }
                },
                TIME: {
                    name: 'TIME',
                    shadow: {
                        type: 'math_number',
                        field: {
                            name: 'NUM',
                            value: 1,
                        },
                    }
                }
            }
        },
        cog_playTone: {
            type: 'cog_playTone',
            values: {
                HZ1: {
                    name: 'HZ1',
                    shadow: {
                        type: 'math_number',
                        field: {
                            name: 'NUM',
                            value: 200,
                        },
                    }
                },
                HZ2: {
                    name: 'HZ2',
                    shadow: {
                        type: 'math_number',
                        field: {
                            name: 'NUM',
                            value: 300,
                        },
                    }
                },
                SECONDS: {
                    name: 'SECONDS',
                    shadow: {
                        type: 'math_number',
                        field: {
                            name: 'NUM',
                            value: 3,
                        },
                    }
                }
            }
        },
        cog_startNote: {
            type: 'cog_startNote',
            values: {
                NOTE: {
                    name: 'NOTE',
                    shadow: {
                        type: 'notesmenu',
                        field: {
                            name: 'NOTE',
                            value: 'notec4',
                        }
                    }
                }
            }
        },
        cog_stopAllSounds: {
            type: 'cog_stopAllSounds',
        },
        cog_setVolumeToPercentage: {
            type: 'cog_setVolumeToPercentage',
            values: {
                PERCENTAGE: {
                    name: 'PERCENTAGE',
                    shadow: {
                        type: 'math_number',
                        field: {
                            name: 'NUM',
                            value: 100,
                        },
                    },
                },
            },
        },
        cog_playSoundAtFrequency: {
            type: 'cog_playSoundAtFrequency',
            values: {
                FREQUENCY: {
                    name: 'FREQUENCY',
                    shadow: {
                        type: 'math_number',
                        field: {
                            name: 'NUM',
                            value: 440,
                        },
                    },
                },
            },
        },
    },
    /* End of Sound Blocks */
    /* Looks Blocks */
    looks: {
        cog_setLEDColourPicker: {
            type: 'cog_setLEDColourPicker',
            values: {
                COLOR: {
                    name: 'COLOR',
                    shadow: {
                        type: 'colour_picker_LED_eyes'
                    },
                }
            }
        },
        cog_setLEDs: {
            type: 'cog_setLEDs',
            values: {
                LED_TYPE: {
                    name: 'LED_TYPE',
                    field: {
                        name: 'LED_TYPE',
                        value: ''
                    }
                },
                COLOR: {
                    name: 'COLOR',
                    shadow: {
                        type: 'colour_picker'
                    },
                }
            }
        },
        cog_setLEDToColour: {
            type: 'cog_setLEDToColour',
            values: {
                LED_ID: {
                    name: 'LED_ID',
                    shadow: {
                        type: 'math_number',
                        field: {
                            name: 'NUM',
                            value: 1,
                        },
                    }
                },
                COLOR: {
                    name: 'COLOR',
                    shadow: {
                        type: 'colour_picker'
                    },
                }
            }
        },
        cog_setLEDPattern: {
            type: 'cog_setLEDPattern',
            values: {
                LED_TYPE: {
                    name: 'LED_TYPE',
                    field: {
                        name: 'LED_TYPE',
                        value: ''
                    }
                },
                PATTERN: {
                    name: 'PATTERN',
                    field: {
                        name: 'PATTERN',
                        value: ''
                    }
                }
            }
        },
        cog_turnOffLEDs: {
            type: 'cog_turnOffLEDs',
        },
    },
    /* End of Looks Blocks */
}

export function CogBlocksToolbox_motion() {
    return `<label text="Cog can't move!!" web-class="scratchTextSmall"></label>`;
}

export function CogBlocksToolbox_events() {
    const xml = buildXML([
        ...Object.values(cog_blocks_definitions.events)
    ]);
    return xml;
}

export function CogBlocksToolbox_looks() {
    const xml = buildXML([
        ...Object.values(cog_blocks_definitions.looks)
    ]);
    return xml;
}

export function CogBlocksToolbox_sound(soundName) {
    const xml = buildXML([
        ...Object.values(cog_blocks_definitions.sound),
    ]);
    return xml;
}

export function CogBlocksToolbox_sensing() {
    const xml = buildXML([
        ...Object.values(cog_blocks_definitions.sensing)
    ]);
    return xml;
}

class CogBlocks {
    constructor(runtime) {
        this.runtime = runtime;
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo() {

        return {
            id: 'cog',
            name: 'Cog',
            blockIconURI: blockIconURI,
            blocks: [
                // only showin the dummy block if the flag is set
                // cogInterface.shouldShowDummyBlock ? {
                //     ...dynamicBlocks.dummyBlock,
                //     blockType: BlockType.HAT,
                // } : {
                //     ...dynamicBlocks.dummyBlock,
                //     blockType: BlockType.HIDDEN,
                // },
                {
                    opcode: 'onTilt',
                    text: 'on tilt [TILT_DIRECTION]',
                    blockType: BlockType.HAT,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                    arguments: {
                        TILT_DIRECTION: {
                            type: ArgumentType.STRING,
                            menu: 'tilt_direction_menu',
                            defaultValue: cogBlocks.tiltDirections.FORWARD
                        }
                    }
                },
                {
                    opcode: 'onShake',
                    text: 'on shake',
                    blockType: BlockType.HAT,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                },
                {
                    opcode: 'onButtonPush',
                    text: 'on button push',
                    blockType: BlockType.HAT,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                },
                {
                    opcode: 'onObjectSense',
                    text: 'on obstacle sensed [OBJECT_SENSE]',
                    blockType: BlockType.HAT,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                    arguments: {
                        OBJECT_SENSE: {
                            type: ArgumentType.STRING,
                            menu: 'object_sense_menu',
                            defaultValue: cogBlocks.objectSense.OBJECT_SENSE_1
                        }
                    }
                },
                // {
                //     opcode: 'onIRMessageReceived',
                //     text: 'on IR message received [IR_MESSAGE]',
                //     blockType: BlockType.HAT,
                //     colour: "#5ba591",
                //     colourSecondary: "#5ba591",
                //     arguments: {
                //         IR_MESSAGE: {
                //             type: ArgumentType.STRING,
                //             menu: 'IR_message_menu',
                //             defaultValue: cogBlocks.IRMessage.IR_MESSAGE_0
                //         }
                //     }
                // },
                '---',
                {
                    opcode: 'getAccelerometerX',
                    text: 'accelerometer x',
                    blockType: BlockType.REPORTER,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                },
                {
                    opcode: 'getAccelerometerY',
                    text: 'accelerometer y',
                    blockType: BlockType.REPORTER,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                },
                {
                    opcode: 'getAccelerometerZ',
                    text: 'accelerometer z',
                    blockType: BlockType.REPORTER,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                },
                {
                    opcode: 'getGyroscopeX',
                    text: 'gyroscope x',
                    blockType: BlockType.REPORTER,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                },
                {
                    opcode: 'getGyroscopeY',
                    text: 'gyroscope y',
                    blockType: BlockType.REPORTER,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                },
                {
                    opcode: 'getGyroscopeZ',
                    text: 'gyroscope z',
                    blockType: BlockType.REPORTER,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                },
                {
                    opcode: 'getIsButtonPressed',
                    text: 'is button pressed',
                    blockType: BlockType.REPORTER,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                },
                {
                    opcode: 'getIsObstacleSensedRight',
                    text: 'is obstacle sensed right',
                    blockType: BlockType.REPORTER,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                },
                {
                    opcode: 'getIsObstacleSensedLeft',
                    text: 'is obstacle sensed left',
                    blockType: BlockType.REPORTER,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                },
                {
                    opcode: 'getIsLightSensed',
                    text: 'is light sensed',
                    blockType: BlockType.REPORTER,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                },
                {
                    opcode: 'getIRSensor0',
                    text: 'IR sensor right',
                    blockType: BlockType.REPORTER,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                },
                {
                    opcode: 'getIRSensor1',
                    text: 'IR sensor left',
                    blockType: BlockType.REPORTER,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                },
                {
                    opcode: 'getIRSensor2',
                    text: 'button force',
                    blockType: BlockType.REPORTER,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                },
                {
                    opcode: 'getIsMoving',
                    text: 'is moving',
                    blockType: BlockType.REPORTER,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                },
                {
                    opcode: 'getIsShaking',
                    text: 'is shaking',
                    blockType: BlockType.REPORTER,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                },
                {
                    opcode: 'getTiltDirection',
                    text: 'tilt direction',
                    blockType: BlockType.REPORTER,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                },
                {
                    opcode: 'getAmbientLightValue',
                    text: 'ambient light value',
                    blockType: BlockType.REPORTER,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                },
                '---',
                {
                    opcode: 'setLEDColourPicker',
                    text: 'set LEDs using colour picker [COG_COLOR]',
                    blockType: BlockType.COMMAND,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                    arguments: {
                        COG_COLOR: {
                            type: ArgumentType.COG_COLOR,
                            defaultValue: '#ff0000',
                        }
                    }
                },
                {
                    opcode: 'setAllRingLEDs',
                    text: 'set all ring LEDs to [COLOR]',
                    blockType: BlockType.COMMAND,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                    arguments: {
                        COLOR: {
                            type: ArgumentType.COLOR,
                            defaultValue: '#ff0000'
                        }
                    }
                },
                {
                    opcode: 'setLEDToColour',
                    text: 'set LED [LED_ID] to [COLOR]',
                    blockType: BlockType.COMMAND,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                    arguments: {
                        LED_ID: {
                            type: ArgumentType.STRING,
                            menu: 'led_menu',
                            defaultValue: '1'
                        },
                        COLOR: {
                            type: ArgumentType.COLOR,
                            defaultValue: '#ff0000'
                        }
                    }
                },
                {
                    opcode: 'setLEDPattern',
                    text: 'set LED pattern [PATTERN]',
                    blockType: BlockType.COMMAND,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                    arguments: {
                        PATTERN: {
                            type: ArgumentType.STRING,
                            menu: 'led_pattern_menu',
                            defaultValue: 'Flash'
                        },
                    }
                },
                {
                    opcode: 'setMiddleLED',
                    text: 'set middle LED to [COLOR]',
                    blockType: BlockType.COMMAND,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                    arguments: {
                        COLOR: {
                            type: ArgumentType.COLOR,
                            defaultValue: '#ff0000'
                        }
                    }
                },
                {
                    opcode: 'turnOffLEDs',
                    text: 'turn off LEDs',
                    blockType: BlockType.COMMAND,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                },
                '---',
                {
                    opcode: 'playRtttlTune',
                    text: 'play tune [TUNE]',
                    blockType: BlockType.COMMAND,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                    arguments: {
                        TUNE: {
                            type: ArgumentType.STRING,
                            menu: 'rtttl_menu',
                            defaultValue: 'disbelief'
                        }
                    }
                },
                {
                    opcode: 'playNoteForTime',
                    text: 'play note [NOTE] for [TIME] seconds',
                    blockType: BlockType.COMMAND,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                    arguments: {
                        NOTE: {
                            type: ArgumentType.STRING,
                            menu: 'notes_menu',
                            defaultValue: 'notec4'
                        },
                        TIME: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0.5
                        }
                    }
                },
                {
                    opcode: 'setPitch',
                    text: 'set pitch to [PITCH]',
                    blockType: BlockType.COMMAND,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                    arguments: {
                        PITCH: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 440,
                            minValue: 0,
                            maxValue: 2000
                        }
                    }
                },
                {
                    opcode: 'setVolume',
                    text: 'set volume to [VOLUME]',
                    blockType: BlockType.COMMAND,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                    arguments: {
                        VOLUME: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0.9,
                            minValue: 0,
                            maxValue: 1
                        }
                    }
                },
                {
                    opcode: 'stopSounds',
                    text: 'stop sounds',
                    blockType: BlockType.COMMAND,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                },
            ],
            menus: {
                tilt_direction_menu: {
                    acceptReporters: true,
                    items: [
                        {
                            text: 'forward',
                            value: cogBlocks.tiltDirections.FORWARD
                        },
                        {
                            text: 'backward',
                            value: cogBlocks.tiltDirections.BACKWARD
                        },
                        {
                            text: 'left',
                            value: cogBlocks.tiltDirections.LEFT
                        },
                        {
                            text: 'right',
                            value: cogBlocks.tiltDirections.RIGHT
                        },
                    ]
                },
                move_type_menu: {
                    acceptReporters: true,
                    items: [
                        {
                            text: 'move',
                            value: cogBlocks.moveTypes.MOVE
                        },
                        {
                            text: 'shake',
                            value: cogBlocks.moveTypes.SHAKE
                        }
                    ]
                },
                object_sense_menu: {
                    acceptReporters: true,
                    items: [
                        {
                            text: 'left',
                            value: cogBlocks.objectSense.OBJECT_SENSE_0
                        },
                        {
                            text: 'right',
                            value: cogBlocks.objectSense.OBJECT_SENSE_1
                        }
                    ]
                },
                IR_message_menu: {
                    acceptReporters: true,
                    items: [
                        {
                            text: 'left',
                            value: cogBlocks.IRMessage.IR_MESSAGE_0
                        },
                        {
                            text: 'right',
                            value: cogBlocks.IRMessage.IR_MESSAGE_1
                        },
                        {
                            text: 'either',
                            value: cogBlocks.IRMessage.IR_MESSAGE
                        }
                    ]
                },
                accelerometer_axis_menu: {
                    acceptReporters: true,
                    items: [
                        {
                            text: 'x',
                            value: 'x'
                        },
                        {
                            text: 'y',
                            value: 'y'
                        },
                        {
                            text: 'z',
                            value: 'z'
                        }
                    ]
                },
                gyroscope_axis_menu: {
                    acceptReporters: true,
                    items: [
                        {
                            text: 'x',
                            value: 'x'
                        },
                        {
                            text: 'y',
                            value: 'y'
                        },
                        {
                            text: 'z',
                            value: 'z'
                        }
                    ]
                },
                ir_sensors_menu: {
                    acceptReporters: true,
                    items: [
                        {
                            text: '1',
                            value: '1'
                        },
                        {
                            text: '2',
                            value: '2'
                        },
                    ]
                },
                sound_menu: {
                    acceptReporters: true,
                    items: '_getSoundsMenu'
                },
                rtttl_menu: {
                    acceptReporters: true,
                    items: ["disbelief", "confusion", "excitement", "noway", "no", "whistle"].map(tune => ({
                        text: tune,
                        value: tune
                    }))
                },
                notes_menu: {
                    acceptReporters: true,
                    items: [
                        "notec4",
                        "notecsharp4",
                        "noted4",
                        "notedsharp4",
                        "notee4",
                        "notef4",
                        "notefsharp4",
                        "noteg4",
                        "notegsharp4",
                        "notea4",
                        "noteasharp4",
                        "noteb4",
                        "notec5",
                        "notecsharp5",
                        "noted5",
                        "notedsharp5",
                        "notee5",
                        "notef5",
                        "notefsharp5",
                        "noteg5",
                        "notegsharp5",
                        "notea5",
                        "noteasharp5",
                        "noteb5",
                        "notec6",
                        "notecsharp6",
                        "noted6",
                        "notedsharp6",
                        "notee6",
                        "notef6",
                        "notefsharp6",
                        "noteg6",
                        "notegsharp6",
                        "notea6",
                        "noteasharp6",
                        "noteb6",
                        "notec7",
                        "notecsharp7",
                        "noted7",
                        "notedsharp7",
                        "notee7",
                        "notef7",
                        "notefsharp7",
                        "noteg7",
                        "notegsharp7",
                        "notea7",
                        "noteasharp7",
                        "noteb7"].map(note => ({
                            text: note.replace('note', '').toUpperCase(),
                            value: note
                        }))
                },
                led_menu: {
                    acceptReporters: true,
                    items: Array.from({ length: 13 }, (_, i) => ({
                        text: (i + 1).toString(),
                        value: (i + 1).toString()
                    }))
                },
                led_pattern_menu: {
                    acceptReporters: true,
                    items: [
                        {
                            text: 'Flash',
                            value: 'Flash'
                        },
                        {
                            text: 'Rainbow',
                            value: 'RainbowSnake'
                        },
                        ...Array.from({ length: 8 }, (_, i) => ({
                            text: "Spin" + (i + 1).toString(),
                            value: "Spin" + (i + 1).toString()
                        }))
                    ]
                },
            },
        };
    }

    /**
        Dummy callback for the dynamic block
     */
    dummy(args, util) {
        // pass
    }

    /**
        Event Blocks
        These methods, when the corresponding block is on the stage, will be executed every few ms
    */
    onTilt(args) {
        return cogBlocks.p2State.tiltDirection === args.TILT_DIRECTION;
    }

    onShake(args) {
        return cogBlocks.p2State.moveType === args.MOVE_TYPE;
    }

    onButtonPush(args) {
        return cogBlocks.p2State.isButtonPushed;
    }

    onObjectSense(args) {
        if (cogBlocks.p2State.objectSense === "both") return true;
        return cogBlocks.p2State.objectSense === args.OBJECT_SENSE;
    }

    // onIRMessageReceived(args) {
    //     if (args.IR_MESSAGE === "either") {
    //         return cogBlocks.p2State.IRMessage === cogBlocks.IRMessage.IR_MESSAGE_0 || cogBlocks.p2State.IRMessage === cogBlocks.IRMessage.IR_MESSAGE_1;
    //     }
    //     return cogBlocks.p2State.IRMessage === args.IR_MESSAGE;
    // }

    on_light_sense(args) {
        return cogBlocks.p2State.lightSense;
    }

    /**
        Sensor Blocks
        Monitors of the sensors 
        (
            extension block monitors can't take arguments, meaning that we have to have one monitor for each sensor.
            for example, accelerometer needs to have 3 monitors one for each axis, as opposed to 1 monitor that has an argument for the axis
        )
     */
    getAccelerometerX() {
        return cogBlocks.getAccelerometer('x');
    }

    getAccelerometerY() {
        return cogBlocks.getAccelerometer('y');
    }

    getAccelerometerZ() {
        return cogBlocks.getAccelerometer('z');
    }

    getGyroscopeX() {
        return cogBlocks.getGyroscope('x');
    }

    getGyroscopeY() {
        return cogBlocks.getGyroscope('y');
    }

    getGyroscopeZ() {
        return cogBlocks.getGyroscope('z');
    }

    getIsButtonPressed() {
        return cogBlocks.getButtonState().toString();
    }

    getIsObstacleSensedRight() {
        return cogBlocks.getObstacleSensed('right').toString();
    }

    getIsObstacleSensedLeft() {
        return cogBlocks.getObstacleSensed('left').toString();
    }

    getIsLightSensed() {
        return cogBlocks.getLightSensed().toString();
    }

    getIRSensor0() {
        return cogBlocks.getIRSensor('0');
    }

    getIRSensor1() {
        return cogBlocks.getIRSensor('1');
    }

    getIRSensor2() {
        return cogBlocks.getIRSensor('2');
    }

    getAmbientLightValue() {
        return cogBlocks.getAmbientLightValue();
    }

    getIsMoving() {
        return cogBlocks.getIsMoving().toString();
    }

    getIsShaking() {
        return cogBlocks.getIsShaking().toString();
    }

    getTiltDirection() {
        return cogBlocks.getTiltDirection();
    }

    /**
     * Need to implement the sound conversion logic used in Scratch2MV2Blocks.js
     * The speak block resides in the text2speech extension 
     */
    // playSound(args, util) {
    //     const soundIndex = this._getSoundIndex(args.SOUNDS, util);
    //     if (soundIndex === -1) {
    //         return;
    //     }
    //     const sound = util.target.sprite.sounds[soundIndex];
    //     console.log("playSound", sound);
    // }

    /**
        Looks blocks
     */
    setLEDToColour(args, util) {
        const idxOffset = window.idxOffset || 4;
        let ledId = (+args.LED_ID + idxOffset) % 12;
        if (args.LED_ID === '13') {
            ledId = 12;
        }
        const color = this._getColourFromOperator(args.COLOR);
        cogBlocks.setLEDToColour(ledId, color);
    }

    setLEDColourPicker(args, util) {
        let colours = args.COG_COLOR;
        if (!Array.isArray(colours)) {
            const colour = colours;
            colours = [colour, colour, colour, colour, colour, colour, colour, colour, colour, colour, colour, colour];
        }
        cogBlocks.setAllLEDsToColours_colourPicker(colours);
    }

    setAllRingLEDs(args, util) {
        console.log("setAllRingLEDs", args);
        const colour = this._getColourFromOperator(args.COLOR);
        cogBlocks.setAllLEDsToColour(colour);
    }

    _getColourFromOperator(argumentValue) {
        if (typeof argumentValue === 'function') {
            return argumentValue();
        }
        return argumentValue;
    }

    setLEDPattern(args, util) {
        let patternName = args.PATTERN;
        const lastChar = patternName.charAt(patternName.length - 1);
        if (!isNaN(lastChar)) {
            patternName = patternName.slice(0, -1);
        }
        const mod = parseInt(lastChar, 10);
        cogBlocks.setLEDPattern(patternName, mod);
    }

    setMiddleLED(args, util) {
        const color = this._getColourFromOperator(args.COLOR);
        cogBlocks.setLEDToColour(12, color);
    }

    turnOffLEDs(args, util) {
        cogBlocks.turnOffLEDs();
    }


    /**
     * Sound Blocks
     */

    playRtttlTune(args, util) {
        const tune = args.TUNE;
        return cogBlocks.playRtttlTune(tune);
    }

    setVolume(args, util) {
        const volume = Cast.toNumber(args.VOLUME);
        cogBlocks.setVolume(volume);
    }

    async playNoteForTime(args, util) {
        const note = args.NOTE;
        const time = args.TIME;
        await cogBlocks.playNoteForTime(note, time);
    }

    setPitch(args, util) {
        const pitch = args.PITCH;
        cogBlocks.setPitch(pitch);
    }

    stopSounds(args, util) {
        cogBlocks.stopSounds();
    }

    /**
     * Block Helpers
     */
    _getSoundsMenu() {
        try {
            return this.runtime.getEditingTarget().sprite.sounds.map(sound => sound.name);
        } catch {
            return [''];
        }
    }

    _getSoundIndex(soundName, util) {
        // if the sprite has no sounds, return -1
        const len = util.target.sprite.sounds.length;
        if (len === 0) {
            return -1;
        }

        // look up by name first
        const index = this._getSoundIndexByName(soundName, util);
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

    _getSoundIndexByName(soundName, util) {
        const sounds = util.target.sprite.sounds;
        for (let i = 0; i < sounds.length; i++) {
            if (sounds[i].name === soundName) {
                return i;
            }
        }
        // if there is no sound by that name, return -1
        return -1;
    }
}


export default CogBlocks;

function buildXML(blocks) {
    let xml = '';
    blocks.forEach(block => {
        xml += `\n<block type="${block.type}"${block.isSelfClosing ? ' />' : '>'}\n`;

        if (block.values) {
            for (const [valueName, valueContent] of Object.entries(block.values)) {
                xml += `    <value${valueName ? ` name="${valueName}"` : ''}>\n`;

                if (valueContent.shadow) {
                    xml += `        <shadow type="${valueContent.shadow.type}">\n`;
                    if (valueContent.shadow.field) {
                        xml += `            <field name="${valueContent.shadow.field.name}">${valueContent.shadow.field.value}</field>\n`;
                    }
                    xml += `        </shadow>\n`;
                }

                if (valueContent.field) {
                    xml += `        <field${valueContent.field.name ? ` name="${valueContent.field.name}"` : ''}>${valueContent.field.value}</field>\n`;
                }

                xml += `    </value>\n`;
            }
        }

        if (!block.isSelfClosing) {
            xml += `</block>\n`;
        }
    });
    return xml;
}

window.buildXML = buildXML;
