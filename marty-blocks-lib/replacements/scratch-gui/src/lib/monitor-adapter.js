import OpcodeLabels from './opcode-labels.js';
const martyblockslib = require('marty-blocks-lib');

const isUndefined = a => typeof a === 'undefined';

/**
 * Convert monitors from VM format to what the GUI needs to render.
 * - Convert opcode to a label and a category
 * @param {string} block.id - The id of the monitor block
 * @param {string} block.spriteName - Present only if the monitor applies only to the sprite
 *     with given target ID. The name of the target sprite when the monitor was created
 * @param {string} block.opcode - The opcode of the monitor
 * @param {object} block.params - Extra params to the monitor block
 * @param {string|number|Array} block.value - The monitor value
 * @param {VirtualMachine} block.vm - the VM instance which owns the block
 * @return {object} The adapted monitor with label and category
 */
export default function ({ id, spriteName, opcode, params, value, vm }) {
    // Extension monitors get their labels from the Runtime through `getLabelForOpcode`.
    // Other monitors' labels are hard-coded in `OpcodeLabels`.
    let { label, category, labelFn } = (vm && vm.runtime.getLabelForOpcode(opcode)) || OpcodeLabels.getLabel(opcode);
    if (monitorLabelToSensorWhoAmIMAP[label]) {
        label = monitorLabelToSensorWhoAmIMAP[label](params) || label;
    }

    // Use labelFn if provided for dynamic labelling (e.g. variables)
    if (!isUndefined(labelFn)) label = labelFn(params);

    // Append sprite name for sprite-specific monitors
    if (spriteName) {
        label = `${spriteName}: ${label}`;
    }

    // If value is a number, round it to six decimal places
    if (typeof value === 'number') {
        value = Number(value.toFixed(6));
    }

    // Turn the value to a string, for handle boolean values
    if (typeof value === 'boolean') {
        value = value.toString();
    }

    // Lists can contain booleans, which should also be turned to strings
    if (Array.isArray(value)) {
        value = value.map(item => item.toString());
    }

    return { id, label, category, value };
}

const monitorLabelToSensorWhoAmIMAP = {
    // marty blocks
    XAxisMovement: (params) => 'X Axis Movement',
    YAxisMovement: (params) => 'Y Axis Movement',
    ZAxisMovement: (params) => 'Z Axis Movement',
    XAxisMagnetometer: (params) => 'X Axis Magnetometer',
    YAxisMagnetometer: (params) => 'Y Axis Magnetometer',
    ZAxisMagnetometer: (params) => 'Z Axis Magnetometer',
    BatteryPercentage: (params) => 'Battery Percentage',
    ServoCurrent: (params) => 'Current at: ' + servoIdToHumanReadable(params.SERVOCHOICE),
    ServoPosition: (params) => 'Position of: ' + servoIdToHumanReadable(params.SERVOCHOICE),
    mv2_obstaclesense: (params) => 'Obstacle: ' + params.SENSORCHOICE,
    mv2_groundsense: (params) => 'Ground: ' + params.SENSORCHOICE,
    mv2_coloursense: (params) => 'Color: ' + params.SENSORCHOICE,
    mv2_coloursense_hex: (params) => 'Color (Hex): ' + params.SENSORCHOICE,
    mv2_distancesense: (params) => 'Distance Sensor',
    mv2_lightsense: (params) => 'Light: ' + params.SENSORCHOICE + ', channel: ' + params.SENSORCHANNEL,
    mv2_noisesense: (params) => 'Noise: ' + params.SENSORCHOICE,
    mv2_coloursenseraw: (params) => 'Color (Raw): ' + params.SENSORCHOICE + ', channel: ' + params.SENSORCHANNEL,

    // cog blocks
    [martyblockslib.cog_blocks_definitions.sensing.cog_getAccelerometer.type]: (params) => 'Accelerometer' + (params.AXIS ? ' ' + params.AXIS : ''),
    // [martyblockslib.cog_blocks_definitions.sensing.cog_getGyroscope.type]: (params) => 'Gyroscope' + (params.AXIS ? ' ' + params.AXIS : ''),
    [martyblockslib.cog_blocks_definitions.sensing.cog_getButtonClicked.type]: (params) => 'Button Clicked?',
    [martyblockslib.cog_blocks_definitions.sensing.cog_getButtonForceValue.type]: (params) => 'Button Force Value',
    [martyblockslib.cog_blocks_definitions.sensing.cog_getButtonForceValuePercentage.type]: (params) => 'Button Force %',
    [martyblockslib.cog_blocks_definitions.sensing.cog_getObstacleSensed.type]: (params) => 'Obstacle Sensed ' + params.SIDE + '?',
    [martyblockslib.cog_blocks_definitions.sensing.cog_getLightSensed.type]: (params) => 'Light Sensed?',
    [martyblockslib.cog_blocks_definitions.sensing.cog_getIRSensorValue.type]: (params) => 'IR Sensor Value ' + params.SIDE,
    [martyblockslib.cog_blocks_definitions.sensing.cog_getAmbientLightValue.type]: (params) => 'Ambient Light Value',
    [martyblockslib.cog_blocks_definitions.sensing.cog_getShakeSensed.type]: (params) => 'Shake Sensed?',
    [martyblockslib.cog_blocks_definitions.sensing.cog_getTiltDirection.type]: (params) => 'Tilt Direction',
}

const servoChoiceMap = [
    'Left Hip',
    'Left Twist',
    'Left Knee',
    'Right Hip',
    'Right Twist',
    'Right Knee',
    'Left Arm',
    'Right Arm',
    'Eyes'
];

const servoIdToHumanReadable = (servoId) => {
    // check if servo Id is a number
    if (!isNaN(servoId)) {
        return servoChoiceMap[servoId] || servoId;
    }
    try {
        return servoChoiceMap[+servoId] || servoId;
    } catch (e) {
        return servoId;
    }
}