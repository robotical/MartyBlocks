const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const MathUtil = require('../../util/math-util');
const log = require('../../util/log');
const formatMessage = require('format-message');
const blockIconURI =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAAAAAAAAQCEeRdzAAACx0lEQVR4nK2Ua0iTURjHF12hDxH0NUrpS30qutAiSjcv04JctZqWJpXhnLZ0zTkvOa9kbM4pKWFpuKLNbbq9l03zmhVCYWWJJFFEUBmbGoRFfvDfeRcIwva6Lh8OnJf3nN/5Ped5niOgKErwP0dYi1wMS4aHzOl/BNK0wE0zgiG7JW24/baKDnzzQ0P+4Da6WI/gxXV9qU8Zg+mcGDw35jd6WDZwyB8BuQ1uEuaYudDoz4qGP1MEX1YMKmK3gy5R3O2iqeWhTIPCuFBfmzTNfmUUfAoR/AQ2QyzHz0bhafp+vK/Nc3AHLgnkTqXdrpVvDSrbT90hTBbKMKkUEzvxAvSrIho+7TEMD/Sa3UGStDibxO5NbZ5zvkCCZ8XpKFGrMa6Rwa8klgQWGAQ+o5Piocc9EOwuF9kN9XQ1zpbL4U0XY+vmjVi9bj0unJDhg0aKL8TUT+y+qyV4mXsEtMPmpBgeIGd339I88rGtBlUZyVghECAiIhJpmSrUZp/H9KVYfKrMwBPNSeiTDoJx2osoPkOalEh9dTnVV5aNCdaKzOidKLtmRv2NVvRrTuFbZSpGbDeRKxGiIuXwmJem1lBBMr0wYT0eQUOdyViVsBvvGnR43FKHyzkX0aaQYU6XiGm9HP05UjQfFc4xLU0HKNbDn2Wa3Iej3bZJHb9vplUehYk+Cr2lCkzlxWHuihQPzolAy4XoMRTrKW9XeIXNkoUNReqSrF2ReKRNxWx5Mn5oEzGqjIN8zzZ05J4eZLgwedpv0QfNdYjLtUp/PO5VtZQUse0WRu42QSvZi4IE4VS3zbIlVKghO4WzbDMb4rVJ4vlOjxeD/b1oTRGBMVef4QuVt5cZ8gAY81UWg6GG1JsV3VcL7tCBmvvL54vb7HTYN5hMxs9Oe/so5epcy3dvSwIDlgRqtd6TODs6dtA8z1XYwN9JWrBaFi7wFxxichQfWWJ7AAAAAElFTkSuQmCC";

const dynamicBlocks = {
    dummyBlock: {
    opcode: 'dummy',
        text: 'dummy',
        colour: "#5ba591",
        colourSecondary: "#5ba591",
    }
};

class AxiomBlocks {
    constructor(runtime) {
        this.runtime = runtime;
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo() {

        return {
            id: 'axiom',
            name: 'Axiom',
            blockIconURI: blockIconURI,
            blocks: [
                // only showin the dummy block if the flag is set
                axiomInterface.shouldShowDummyBlock ? {
                    ...dynamicBlocks.dummyBlock,
                    blockType: BlockType.HAT,
                } : {
                    ...dynamicBlocks.dummyBlock,
                    blockType: BlockType.HIDDEN,
                },
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
                            defaultValue: axiomBlocks.tiltDirections.FORWARD
                        }
                    }
                },
                {
                    opcode: 'onRotate',
                    text: 'on rotate [ROTATE_DIRECTION]',
                    blockType: BlockType.HAT,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                    arguments: {
                        ROTATE_DIRECTION: {
                            type: ArgumentType.STRING,
                            menu: 'rotate_direction_menu',
                            defaultValue: axiomBlocks.rotateDirections.CLOCKWISE
                        }
                    }
                },
                {
                    opcode: 'onMove',
                    text: 'on [MOVE_TYPE]',
                    blockType: BlockType.HAT,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                    arguments: {
                        MOVE_TYPE: {
                            type: ArgumentType.STRING,
                            menu: 'move_type_menu',
                            defaultValue: axiomBlocks.moveTypes.MOVE
                        }
                    }
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
                    text: 'on [OBJECT_SENSE]',
                    blockType: BlockType.HAT,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                    arguments: {
                        OBJECT_SENSE: {
                            type: ArgumentType.STRING,
                            menu: 'object_sense_menu',
                            defaultValue: axiomBlocks.objectSense.OBJECT_SENSE_1
                        }
                    }
                },
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
                    opcode: 'getIRSensor1',
                    text: 'IR sensor 1',
                    blockType: BlockType.REPORTER,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                },
                {
                    opcode: 'getIRSensor2',
                    text: 'IR sensor 2',
                    blockType: BlockType.REPORTER,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                },
                '---',
                {
                    opcode: 'playSound',
                    text: 'play sound [SOUNDS]',
                    blockType: BlockType.COMMAND,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                    arguments: {
                        SOUNDS: {
                            type: ArgumentType.STRING,
                            menu: 'sound_menu',
                            defaultValue: ''
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
                    opcode: 'setLEDToColour',
                    text: 'set LED [LED_ID] to [COLOUR]',
                    blockType: BlockType.COMMAND,
                    colour: "#5ba591",
                    colourSecondary: "#5ba591",
                    arguments: {
                        LED_ID: {
                            type: ArgumentType.STRING,
                            menu: 'led_menu',
                            defaultValue: '1'
                        },
                        COLOUR: {
                            type: ArgumentType.COLOR,
                            defaultValue: '#ff0000'
                        }
                    }
                }
            ],
            menus: {
                tilt_direction_menu: {
                    acceptReporters: true,
                    items: [
                        {
                            text: 'forward',
                            value: axiomBlocks.tiltDirections.FORWARD
                        },
                        {
                            text: 'backward',
                            value: axiomBlocks.tiltDirections.BACKWARD
                        },
                        {
                            text: 'left',
                            value: axiomBlocks.tiltDirections.LEFT
                        },
                        {
                            text: 'right',
                            value: axiomBlocks.tiltDirections.RIGHT
                        },
                    ]
                },
                rotate_direction_menu: {
                    acceptReporters: true,
                    items: [
                        {
                            text: 'clockwise',
                            value: axiomBlocks.rotateDirections.CLOCKWISE
                        },
                        {
                            text: 'counter clockwise',
                            value: axiomBlocks.rotateDirections.COUNTER_CLOCKWISE
                        }
                    ]
                },
                move_type_menu: {
                    acceptReporters: true,
                    items: [
                        {
                            text: 'move',
                            value: axiomBlocks.moveTypes.MOVE
                        },
                        {
                            text: 'shake',
                            value: axiomBlocks.moveTypes.SHAKE
                        }
                    ]
                },
                object_sense_menu: {
                    acceptReporters: true,
                    items: [
                        {
                            text: 'object-sense-1',
                            value: axiomBlocks.objectSense.OBJECT_SENSE_1
                        },
                        {
                            text: 'object-sense-2',
                            value: axiomBlocks.objectSense.OBJECT_SENSE_2
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
                led_menu: {
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
                        {
                            text: '3',
                            value: '3'
                        },
                        {
                            text: '4',
                            value: '4'
                        }
                    ]
                }
            }
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
        return axiomBlocks.p2State.tiltDirection === args.TILT_DIRECTION;
    }

    onRotate(args) {
        return axiomBlocks.p2State.rotateDirection === args.ROTATE_DIRECTION;
    }

    onMove(args) {
        return axiomBlocks.p2State.moveType === args.MOVE_TYPE;
    }

    onButtonPush(args) {
        return axiomBlocks.p2State.isButtonPushed;
    }

    onObjectSense(args) {
        return axiomBlocks.p2State.objectSense === args.OBJECT_SENSE;
    }

    on_light_sense(args) {
        return axiomBlocks.p2State.lightSense;
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
        return axiomBlocks.getAccelerometer('x');
    }

    getAccelerometerY() {
        return axiomBlocks.getAccelerometer('y');
    }

    getAccelerometerZ() {
        return axiomBlocks.getAccelerometer('z');
    }

    getGyroscopeX() {
        return axiomBlocks.getGyroscope('x');
    }

    getGyroscopeY() {
        return axiomBlocks.getGyroscope('y');
    }

    getGyroscopeZ() {
        return axiomBlocks.getGyroscope('z');
    }

    getIsButtonPressed() {
        return axiomBlocks.p2State.isButtonPushed;
    }

    getIRSensor1() {
        return axiomBlocks.getIRSensor('1');
    }

    getIRSensor2() {
        return axiomBlocks.getIRSensor('2');
    }

    /**
     * Need to implement the sound conversion logic used in Scratch2MV2Blocks.js
     * The speak block resides in the text2speech extension 
     */
    playSound(args, util) {
        const soundIndex = this._getSoundIndex(args.SOUNDS, util);
        if (soundIndex === -1) {
            return;
        }
        const sound = util.target.sprite.sounds[soundIndex];
        console.log("playSound", sound);
    }

    setVolume(args, util) {
        const volume = Cast.toNumber(args.VOLUME);
        axiomBlocks.setVolume(volume);
    }

    /**
        Looks blocks
     */
    setLEDToColour(args, util) {
        const ledId = args.LED_ID;
        const colour = args.COLOUR;
        axiomBlocks.setLEDToColour(ledId, colour);
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


module.exports = AxiomBlocks;