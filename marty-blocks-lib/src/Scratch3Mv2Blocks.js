const Mv2Interface = require('./Mv2Interface');
const lamejs = require("./lame-all");

mv2Interface = new Mv2Interface();

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

            mv2_getReady: this.getReady,
            mv2_discoChangeBlockColour: this.discoChangeBlockColour,
            mv2_discoChangeBlockPattern: this.discoChangeBlockPattern,
            mv2_discoChangeRegionColour: this.discoChangeRegionColour,
            mv2_walk_fw: this.walk_fw,
            mv2_walk_bw: this.walk_bw,
            mv2_walk: this.walk,
            mv2_turn: this.turn,
            mv2_wiggle: this.wiggle,
            mv2_circle: this.circle,
            mv2_kick: this.kick,
            mv2_lean: this.lean,
            mv2_slide: this.slide,
            mv2_eyes: this.eyes,
            mv2_moveLeg: this.moveLeg,
            mv2_liftFoot: this.liftFoot,
            mv2_lowerFoot: this.lowerFoot,
            mv2_moveJoint: this.moveJoint,
            mv2_wave: this.wave,
            mv2_dance: this.dance,
            mv2_standStraight: this.standStraight,
            mv2_hold: this.hold,
            mv2_gripperArmBasic: this.gripperArmBasic,
            mv2_gripperArmTimed: this.gripperArmTimed,


            // sensors

            ServoPosition: this.position,
            ServoCurrent: this.current,
            XAxisMovement: this.accelerometerX,
            YAxisMovement: this.accelerometerY,
            ZAxisMovement: this.accelerometerZ,
            ObstacleProximity: this.proximity,
            BatteryPercentage: this.batteryLevel,
            mv2_obstaclesense: this.obstacleSense,
            mv2_groundsense: this.groundSense,
            mv2_coloursense: this.colourSense,
            mv2_coloursenseraw: this.colourSenseRaw,
            mv2_distancesense: this.distanceSense,
            mv2_lightsense: this.lightSense,
            mv2_noisesense: this.noiseSense,

            // sound commands

            mv2_playSound: this.playSound,
            mv2_playSound_stream: this.playSound_stream,

            // misc/debugging commands (including proposed/deprecated blocks)

            mv2_demo_sensor: this.demo_sensor,
            mv2_set_demo_sensor: this.set_demo_sensor,
            mv2_set_ip: this.set_ip

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

    // DISCO Utils

    getColourHexString(colourChoiceStr) {
        let colour;
        let colourChoice = parseInt(colourChoiceStr);

        switch (colourChoice) {
            case 0:
                //RED
                colour = 'ff0000';
                break;
            case 1:
                //GREEN
                colour = '00ff00';
                break;
            case 2:
                //BLUE
                colour = '0000ff';
                break;
            case 3:
                //PINK
                colour = 'ff00d9';
                break;
            case 4:
                //YELLOW
                colour = 'fcec00';
                break;
            case 5:
                //WHITE
                colour = 'ffffff';
                break;
            case 6:
                //OFF
                colour = '000000';
                break;

            default:
                //set default to mode 01 (OFF)
                colour = '000000';
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
                boardDeviceType = 'all';
                //console.log("case 3: " + boardDeviceType);
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
        return this.hexstr(parseInt(color[0] / divisor), 2) + this.hexstr(parseInt(color[1] / divisor), 2) + this.hexstr(parseInt(color[2] / 20), 2);
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
        return val.toString(16).padStart(length, '0');
    }

    // return name of first addon found with a specific whoAmI value
    addonNameByWhoAmI(whoAmI){
        const addons = JSON.parse(mv2.addons).addons;
        for (let addon of addons){
            if (addon.whoAmI == whoAmI){
                return addon.name;
            }
        }
        return null;
    }

    // MOTION

    getReady(args, util) {
        const moveTime = 3000;
        console.log('Ready, set, go!');
        mv2Interface.send_REST(`traj/getReady/?moveTime=${moveTime}`);
        return new Promise(resolve => setTimeout(resolve, moveTime));
    }

    getAllDiscoBoards(addons) {
        var addressList = [];

        for (let addon of addons){
            if (addon.whoAmI == RIC_WHOAMI_TYPE_CODE_ADDON_LEDEYE
                || addon.whoAmI == RIC_WHOAMI_TYPE_CODE_ADDON_LEDARM
                || addon.whoAmI == RIC_WHOAMI_TYPE_CODE_ADDON_LEDFOOT)
                {
                    addressList.push(addon.name);
            }
        }
        return addressList;
    }

    getFilteredDiscoBoards(addons, filterBoardType) {
        var addressList = [];

        for (let addon of addons){
            if (addon.whoAmI == filterBoardType){
                addressList.push(addon.name);
            }
        }

        return addressList;
    }


    discoChangeBlockPattern(args, util) {
        const addons = JSON.parse(mv2Interface.addons).addons;
        //so if it's set in a forever loop give 0.2s break between each update 
        const resolveTime = 200;
        const boardChoice = args.BOARDTYPE;
        let filterBoardType = this.getDiscoBoardType(boardChoice);
        const patternChoice = args.PATTERN;
        let patternProgram;

        if (patternChoice == '0') {
            patternProgram = '10';
        } else if (patternChoice == '1') {
            patternProgram = '11';

        } else if (patternChoice == '2') {
            patternProgram = '01';

        } else {
            //default to off
            patternProgram = '01';
        }

        // select all LED addons found
        let addressList = [];

        if (filterBoardType == 'all') {
            addressList = this.getAllDiscoBoards(addons);
        } else {
            addressList = this.getFilteredDiscoBoards(addons, filterBoardType)
        }

        let numberOfLEDAddons = addressList.length;

        for (var i = 0; i < numberOfLEDAddons; i++) {
            let ledDeviceName = addressList.pop();
            // console.log(`elem/${ledDeviceName}/json?cmd=raw&hexWr=${patternProgram}`);
            mv2Interface.send_REST(`elem/${ledDeviceName}/json?cmd=raw&hexWr=${patternProgram}`);
            // console.log(addressList.length);
        }
        return new Promise(resolve =>
            setTimeout(resolve, resolveTime));
    }


    discoChangeBlockColour(args, util) {
        const addons = JSON.parse(mv2Interface.addons).addons;
        const resolveTime = 200;
        const color = this.toRgbColorList(args.COLOR);
        const boardChoice = args.BOARDTYPE;

        const colorStr = this.colorToLEDAddonStr(color);
        let filterBoardType = this.getDiscoBoardType(boardChoice);

        // select all LED addons found that match the board type
        let addressList = [];

        if (filterBoardType == 'all') {
            addressList = this.getAllDiscoBoards(addons);
        } else {
            addressList = this.getFilteredDiscoBoards(addons, filterBoardType)
        }

        let numberOfLEDAddons = addressList.length;
        for (var i = 0; i < numberOfLEDAddons; i++) {
            let ledDeviceName = addressList.pop();
            mv2Interface.send_REST(`elem/${ledDeviceName}/json?cmd=raw&hexWr=02${colorStr}`);
        }
        return new Promise(resolve =>
            setTimeout(resolve, resolveTime));
    }

    discoChangeRegionColour(args, util) {
        const addons = JSON.parse(mv2Interface.addons).addons;
        const resolveTime = 200;
        const color = this.toRgbColorList(args.COLOR);
        const boardChoice = args.BOARDTYPE;
        const regionChoice = args.REGION;

        let filterBoardType = this.getDiscoBoardType(boardChoice);
        const colorStr = this.colorToLEDAddonStr(color);
        // select all LED addons found that match the board type
        let addressList = [];

        if (filterBoardType == 'all') {
            addressList = this.getAllDiscoBoards(addons);
        } else {
            addressList = this.getFilteredDiscoBoards(addons, filterBoardType)
        }

        let numberOfLEDAddons = addressList.length;

        for (var i = 0; i < numberOfLEDAddons; i++) {
            let ledDeviceName = addressList.pop();
            mv2Interface.send_REST(`elem/${ledDeviceName}/json?cmd=raw&hexWr=040${regionChoice}${colorStr}`);
        }
        return new Promise(resolve =>
            setTimeout(resolve, resolveTime));
    }

    walk_fw(args, util) {
        const moveTime = 1500;
        let steps = parseInt(args.STEPS);
        steps = Math.min(Math.max(steps, 1), 20);
        const stepLength = 25;
        console.log(`traj/step/${steps}/?moveTime=${moveTime}&stepLength=${stepLength}`);
        mv2Interface.send_REST(`traj/step/${steps}/?moveTime=${moveTime}&stepLength=${stepLength}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime * steps));
    }

    walk_bw(args, util) {
        const moveTime = 1500;
        let steps = parseInt(args.STEPS);
        steps = Math.min(Math.max(steps, 1), 20);
        const stepLength = -25;
        console.log(`traj/step/${steps}/?moveTime=${moveTime}&stepLength=${stepLength}`);
        mv2Interface.send_REST(`traj/step/${steps}/?moveTime=${moveTime}&stepLength=${stepLength}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime * steps));
    }

    walk(args, util) {
        let moveTime = parseFloat(args.MOVETIME) * 1000;
        moveTime = Math.min(Math.max(moveTime, 1), 10000);
        let stepLength = parseInt(args.STEPLEN);
        stepLength = Math.min(Math.max(stepLength, -50), 50);
        let steps = parseInt(args.STEPS);
        steps = Math.min(Math.max(steps, 1), 20);
        let turn = parseInt(args.TURN);
        turn = Math.min(Math.max(turn, -25), 25);
        console.log(`traj/step/${steps}/?stepLength=${stepLength}&moveTime=${moveTime}&turn=${turn}`);
        mv2Interface.send_REST(`traj/step/${steps}/?stepLength=${stepLength}&moveTime=${moveTime}&turn=${turn}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime * steps));
    }

    turn(args, util) {
        const moveTime = 1500;
        let steps = parseInt(args.STEPS);
        steps = Math.min(Math.max(steps, 1), 20);
        let turn = 20;
        const side = args.SIDE;
        if (side === '1') {
            turn *= -1;
        }
        console.log(`traj/step/${steps}/?moveTime=${moveTime}&turn=${turn}&stepLength=1`);
        mv2Interface.send_REST(`traj/step/${steps}/?moveTime=${moveTime}&turn=${turn}&stepLength=1`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime * steps));
    }

    wiggle(args, util) {
        const moveTime = 4000;
        console.log(`traj/wiggle/1/?moveTime=${moveTime}`);
        mv2Interface.send_REST(`traj/wiggle/1/?moveTime=${moveTime}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }

    circle(args, util) {
        let moveTime = parseFloat(args.MOVETIME) * 1000;
        moveTime = Math.min(Math.max(moveTime, 1), 10000);
        const side = args.SIDE;
        console.log(`traj/circle/1/?moveTime=${moveTime}&side=${side}`);
        mv2Interface.send_REST(`traj/circle/1/?moveTime=${moveTime}&side=${side}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }

    kick(args, util) {
        const moveTime = 3000;
        const side = args.SIDE;
        console.log(`traj/kick/1/?moveTime=${moveTime}&side=${side}`);
        mv2Interface.send_REST(`traj/kick/1/?moveTime=${moveTime}&side=${side}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }

    lean(args, util) {
        let moveTime = parseFloat(args.MOVETIME) * 1000;
        moveTime = Math.min(Math.max(moveTime, 1), 10000);
        const side = args.SIDE;
        console.log(`traj/lean/1/?moveTime=${moveTime}&side=${side}`);
        mv2Interface.send_REST(`traj/lean/1/?moveTime=${moveTime}&side=${side}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }

    slide(args, util) {
        const moveTime = 1000;
        let steps = parseInt(args.STEPS);
        steps = Math.min(Math.max(steps, 1), 20);
        const side = args.SIDE;
        console.log(`traj/sidestep/${steps}/?side= ${side}&moveTime=${moveTime}`);
        mv2Interface.send_REST(`traj/sidestep/${steps}/?side=${side}&moveTime=${moveTime}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime * steps));
    }

    eyes(args, util) {
        const eyeCommand = args.COMMAND;
        console.log(`traj/${eyeCommand}`);
        mv2Interface.send_REST(`traj/${eyeCommand}`);
        let moveTime = 1000;
        if (eyeCommand === 'wiggleEyes') {
            moveTime = 2000;
        }
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }

    moveLeg(args, util) {
        const moveTime = 1000;
        const side = args.SIDE;
        const direction = args.DIRECTION;
        console.log(`traj/joint/1/?jointID=${side}&angle=${direction}&moveTime=${moveTime}`);
        mv2Interface.send_REST(`traj/joint/1/?jointID=${side}&angle=${direction}&moveTime=${moveTime}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }

    liftFoot(args, util) {
        const side = args.SIDE;
        console.log(`traj/liftFoot/1/?side=${side}`);
        mv2Interface.send_REST(`traj/liftFoot/1/?side=${side}`);
        return new Promise(resolve =>
            setTimeout(resolve, 1000));
    }

    lowerFoot(args, util) {
        const side = args.SIDE;
        console.log(`traj/lowerFoot/1/?side=${side}`);
        mv2Interface.send_REST(`traj/lowerFoot/1/?side=${side}`);
        return new Promise(resolve =>
            setTimeout(resolve, 1000));
    }

    moveJoint(args, util) {
        let moveTime = parseFloat(args.MOVETIME) * 1000;
        moveTime = Math.min(Math.max(moveTime, 1), 10000);
        const jointID = args.SERVOCHOICE;
        const angle = args.ANGLE;
        console.log(`traj/joint/1/?jointID=${jointID}&angle=${angle}&moveTime=${moveTime}`);
        mv2Interface.send_REST(`traj/joint/1/?jointID=${jointID}&angle=${angle}&moveTime=${moveTime}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }

    wave(args, util) {
        const side = args.SIDE;
        console.log(`traj/wave/1/?side=${side}`);
        mv2Interface.send_REST(`traj/wave/1/?side=${side}`);
        return new Promise(resolve =>
            setTimeout(resolve, 2500));
    }

    /* waggleEyes (args, util) {
        console.log(`traj/waggleEyes`);
        mv2Interface.send_REST(`traj/waggleEyes`);
        return new Promise(resolve =>
            setTimeout(resolve));
    } */

    dance(args, util) {
        console.log('Let\'s dance!');
        const moveTime = 3000;
        let marty_cmd = `traj/dance/1?moveTime=${moveTime}`;
        mv2Interface.send_REST(marty_cmd);
        console.log(marty_cmd);

        return new Promise(resolve =>
            setTimeout(resolve, moveTime));


    }

    standStraight(args, util) {
        const moveTime = parseFloat(args.MOVETIME) * 1000;
        // minimum?
        console.log(`traj/standStraight/?moveTime=${moveTime}`);
        mv2Interface.send_REST(`traj/standStraight/?moveTime=${moveTime}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }

    hold(args, util) {
        const moveTime = parseFloat(args.MOVETIME) * 1000;
        console.log(`traj/hold/?moveTime=${moveTime}`);
        mv2Interface.send_REST(`traj/hold/?moveTime=${moveTime}`);
        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }

    gripperArmMove(keypoints, name = null, enable = true) {
        // keypoints should be array of [angle, time]
        // angle in degrees, time in ms
        if (!name) {
            name = this.addonNameByWhoAmI(RIC_WHOAMI_TYPE_CODE_ADDON_GRIPSERVO);
            if (!name) return false;
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
        if (handPosition == 1) { //closed
            // close hand and hold for 30s. 90 degree angle
            keypoints = [[90, moveTime], [90, 30000]];
        } else { //open
            keypoints = [[0, moveTime]];
        }

        if (!this.gripperArmMove(keypoints)) return false;

        return new Promise(resolve =>
            setTimeout(resolve, moveTime));

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
            keypoints = [[90, moveTime], [90, 30000]];
        } else {
            //open
            keypoints= [[0, moveTime]];
        }

        if (!this.gripperArmMove(keypoints)) return false;

        return new Promise(resolve =>
            setTimeout(resolve, moveTime));
    }

    // SENSORS

    position(args, util) {
        //console.log("Report a servo's position!");
        let servoChoice = parseInt(args.SERVOCHOICE);
        if (servoChoice < 0 || servoChoice > 8) {
            servoChoice = 0;
        }
        const servoObj = JSON.parse(mv2Interface.servos);
        let servo;
        switch (servoChoice) {
            case 0:
                servo = 'Left Hip: ';
                break;
            case 1:
                servo = 'Left Twist: ';
                break;
            case 2:
                servo = 'Left Knee: ';
                break;
            case 3:
                servo = 'Right Hip: ';
                break;
            case 4:
                servo = 'Right Twist';
                break;
            case 5:
                servo = 'Right Knee: ';
                break;
            case 6:
                servo = 'Left Arm: ';
                break;
            case 7:
                servo = 'Right Arm: ';
                break;
            case 8:
                servo = 'Eyes: ';
                break;
            default:
                break;
        }
        //return servo + servoObj.smartServos[servoChoice].pos;
        return servoObj.smartServos[servoChoice].pos;
    }

    current(args, util) {
        //console.log("Report a servo's current!");
        let servoChoice = parseInt(args.SERVOCHOICE);
        if (servoChoice < 0 || servoChoice > 8) {
            servoChoice = 0;
        }
        const servoObj = JSON.parse(mv2Interface.servos);
        let servo;
        switch (servoChoice) {
            case 0:
                servo = 'Left Hip: ';
                break;
            case 1:
                servo = 'Left Twist: ';
                break;
            case 2:
                servo = 'Left Knee: ';
                break;
            case 3:
                servo = 'Right Hip: ';
                break;
            case 4:
                servo = 'Right Twist';
                break;
            case 5:
                servo = 'Right Knee: ';
                break;
            case 6:
                servo = 'Left Arm: ';
                break;
            case 7:
                servo = 'Right Arm: ';
                break;
            case 8:
                servo = 'Eyes: ';
                break;
            default:
                break;
        }
        //return servo + servoObj.smartServos[servoChoice].current;
        return servoObj.smartServos[servoChoice].current;
    }

    accelerometerX(args, util) {
        //console.log('Report accelerometer reading!');
        const accelObj = JSON.parse(mv2Interface.accel);
        const xAccel = accelObj.accel.x;
        return xAccel;
    }

    accelerometerY(args, util) {
        //console.log('Report accelerometer reading!');
        const accelObj = JSON.parse(mv2Interface.accel);
        const yAccel = accelObj.accel.y;
        return yAccel;
    }

    accelerometerZ(args, util) {
        //console.log('Report accelerometer reading!');
        const accelObj = JSON.parse(mv2Interface.accel);
        const zAccel = accelObj.accel.z;
        return zAccel;
    }

    proximity(args, util) {
        //console.log('Report proximity!');
        // TODO: Do we have a proximity sensor yet?
        return;
    }

    batteryLevel(args, util) {
        //console.log('Report the battery percentage!');
        return mv2Interface.battRemainCapacityPercent;
    }

    // TODO: redo the obsctacle sense (and other sensor blocks) to use names of actual connected addons from dynamically populated list
    obstacleSense(args, util) {
        const addons = JSON.parse(mv2Interface.addons).addons;

        // if ir sensor not found we will check for colour sensor with the same side in its name
        const side = args.SENSORCHOICE.includes("Right") ? "Right" : "Left";

        let colourSensorVal = null;
        for (let addon of addons){
            if (args.SENSORCHOICE in addon.vals){
                //mv2.send_REST('return val: ' + addon.vals[args.SENSORCHOICE]);
                return addon.vals[args.SENSORCHOICE];
            }
            if (addon.whoAmI == RIC_WHOAMI_TYPE_CODE_ADDON_COLOUR && addon.name.includes(side)){
                colourSensorVal = addon.vals[addon.name + 'Touch']
            }
        }
        if (colourSensorVal !== null) return colourSensorVal;
        return false;
    }

    groundSense(args, util) {
        const addons = JSON.parse(mv2Interface.addons).addons;
        // if ir sensor not found we will check for colour sensor with the same side in its name
        const side = args.SENSORCHOICE.includes("Right") ? "Right" : "Left";

        let colourSensorVal = null;
        for (let addon of addons){
            if (args.SENSORCHOICE in addon.vals){
                // sensor tells you if the foot is in the air
                return !addon.vals[args.SENSORCHOICE];
            }
            if (addon.whoAmI == RIC_WHOAMI_TYPE_CODE_ADDON_COLOUR && addon.name.includes(side)){
                colourSensorVal = !addon.vals[addon.name + 'Air']
            }
        }
        if (colourSensorVal !== null) return colourSensorVal;

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
            hue = (((b - r) / chroma) + 2) * 60;
        } else {
            hue = (((r - g) / chroma) + 4) * 60;
        }
        if (hue < 0) hue += 360;
        return [hue, chroma];
    }

    colourSense(args, util) {
        const addons = JSON.parse(mv2Interface.addons).addons;
        let csID = -1, selectedID = -1;
        for (var i = 0; i < addons.length; i++) {
            if ((args.SENSORCHOICE + "Red") in addons[i].vals) {
                selectedID = i;
            }
            if (addons[i].whoAmI == RIC_WHOAMI_TYPE_CODE_ADDON_COLOUR){
                csID = i;
            }
        }

        let sensorname = args.SENSORCHOICE;
        // check if we found the specified sensor. If not, fall back to the last correctly typed sensor
        if (selectedID < 0) {
            if (csID < 0) return null;
            selectedID = csID;
            sensorname = addons[selectedID].name;
        }

        if (addons[selectedID].vals[sensorname + "Air"]) {
            return "air";
        } else {
            //mv2Interface.send_REST('return val: ' + addons[i].vals[args.SENSORCHOICE]);
            const red = addons[selectedID].vals[sensorname + "Red"];
            const green = addons[selectedID].vals[sensorname + "Green"];
            const blue = addons[selectedID].vals[sensorname + "Blue"];
            const clear = addons[selectedID].vals[sensorname + "Clear"];

            const colours = [
                {hue: [0, 10],    chroma: [75, 200], clear: [40, 150],  name: "red"},
                {hue: [20, 50],   chroma: [100, 300], clear: [100, 255], name: "yellow"},
                {hue: [100, 160], chroma: [10, 100],  clear: [40, 150],  name: "green"},
                { hue: [190, 220], chroma: [95, 230], clear: [90, 255], name: "blue" },
                {hue: [240, 320], chroma: [10, 70],   clear: [40, 150],  name: "purple"},
                {hue: [345, 361], chroma: [75, 200], clear: [40, 150],  name: "red"}
            ];

            const [hue, chroma] = this.getHueChroma(red, green, blue);
            //mv2Interface.send_REST(`hue: ${hue}, chroma: ${chroma}, clear: ${clear} | RGB: ${red} ${green} ${blue}`);
            for (let colour of colours){
                if ((colour.hue[0] <= hue && hue <= colour.hue[1]) &&
                    (colour.chroma[0] <= chroma && chroma <= colour.chroma[1]) &&
                    (colour.clear[0] <= clear && clear <= colour.clear[1])){
                        return colour.name;
                }
            }

            return "unclear";
        }
    }

    colourSenseRaw(args, util) {
        const addons = JSON.parse(mv2Interface.addons).addons;
        let csVal = null;
        for (let addon of addons){
            if ((args.SENSORCHOICE + args.SENSORCHANNEL) in addon.vals){
                return addon.vals[args.SENSORCHOICE + args.SENSORCHANNEL];
            }
            // in case we don't find the specific sensor, we'll return the last correctly device typed value
            if (addon.whoAmI == RIC_WHOAMI_TYPE_CODE_ADDON_COLOUR){
                // device is a colour sensor. iterate through channels to find correct one
                for (const val in addon.vals){
                    if (val.includes(args.SENSORCHANNEL))
                        csVal = addon.vals[val];
                }
            }
        }
        if (csVal !== null) return csVal;
        return null;
    }

    distanceSense(args, util) {
        const addons = JSON.parse(mv2Interface.addons).addons;
        let dsVal = null;
        for (let addon of addons){
            if ("DistanceSensorReading" in addon.vals){
                //mv2.send_REST('return val: ' + addon.vals[args.SENSORCHOICE]);
                return addon.vals["DistanceSensorReading"];
            }
            if (addon.whoAmI == RIC_WHOAMI_TYPE_CODE_ADDON_DISTANCE){
                for (const val in addon.vals){
                    if (val.includes("Reading"))
                        dsVal = addon.vals[val];
                }
            }
        }
        if (dsVal !== null) return dsVal;
        return false;
    }

    lightSense(args, util) {
        const addons = JSON.parse(mv2Interface.addons).addons;
        let sensorVal = null;
        for (let addon of addons){
            if ((args.SENSORCHOICE + args.SENSORCHANNEL) in addon.vals){
                return addon.vals[args.SENSORCHOICE + args.SENSORCHANNEL];
            }
            // in case we don't find the specific sensor, we'll return the last correctly device typed value
            if (addon.whoAmI == RIC_WHOAMI_TYPE_CODE_ADDON_LIGHT){
                // device is a light sensor. iterate through channels to find correct one
                for (const val in addon.vals){
                    if (val.includes(args.SENSORCHANNEL))
                        sensorVal = addon.vals[val];
                }
            }
        }
        if (sensorVal !== null) return sensorVal;
        return null;
    }

    noiseSense(args, util) {
        const addons = JSON.parse(mv2Interface.addons).addons;
        let sensorVal = null;
        for (let addon of addons){
            if ((args.SENSORCHOICE + "HighestSinceLastReading") in addon.vals){
                return addon.vals[args.SENSORCHOICE + "HighestSinceLastReading"];
            }
            // in case we don't find the specific sensor, we'll return the last correctly device typed value
            if (addon.whoAmI == RIC_WHOAMI_TYPE_CODE_ADDON_NOISE){
                // device is a light sensor. iterate through channels to find correct one
                for (const val in addon.vals){
                    if (val.includes("HighestSinceLastReading"))
                        sensorVal = addon.vals[val];
                }
            }
        }
        if (sensorVal !== null) return sensorVal;
        return null;
    }

    // SOUND

    playSound (args, util) {
        const filename = args.SOUND;
        console.log(`filerun/spiffs/${filename}`);
        mv2Interface.send_REST(`filerun/spiffs/${filename}`);
        return new Promise(resolve =>
            setTimeout(resolve));
    }

    playSound_stream(args, util) {
        const index = this._getSoundIndex(args.SOUND_MENU, util);
        if (index >= 0) {
            const { target } = util;
            const { sprite } = target;
            const { soundId } = sprite.sounds[index];
            if (sprite.soundBank) {
                console.log(`SOUND ${soundId} len ${sprite.soundBank.soundPlayers[soundId].buffer.length}`);
                // const rawSoundData = this._convertSoundToRICRAW(sprite.soundBank.soundPlayers[soundId]);
                // console.log(`CONVERTED len ${rawSoundData.length}`);
                // mv2.playRawSound(rawSoundData);
                // audioEncoder(sprite.soundBank.soundPlayers[soundId], 32, null, function onComplete(blob) {
                //     console.log(`Audio MP3 ready len ${blob.length}`)
                // });
                const mp3SoundBuffers = this._convertSoundToMP3(sprite.soundBank.soundPlayers[soundId]);
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

                mv2Interface.streamAudio(mp3SoundData);

                // // Test code to play locally
                // var blob = new Blob(mp3SoundData, {type: 'audio/mp3'});
                // var url = window.URL.createObjectURL(blob);
                // console.log('MP3 URl: ', url);
                // const context = new AudioContext();
                // window.fetch(url)
                //     .then(response => response.arrayBuffer())
                //     .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
                //     .then(audioBuffer => {
                //         const source = context.createBufferSource();
                //         source.buffer = audioBuffer;
                //         source.connect(context.destination);
                //         source.start();
                //     });
            }
        }
    }

    _convertSoundToMP3(audioBuffer) {
        const sampleRatio = audioBuffer.buffer.sampleRate / 11025;
        const finalLen = Math.floor(audioBuffer.buffer.length / sampleRatio);
        const rawSoundData = new Int16Array(finalLen);
        const inSoundData = audioBuffer.buffer.getChannelData(0);
        for (let i = 0; i < finalLen; i++) {
            // Nominal range of AudioBuffer data is -1.0 to +1.0 (each sample is a 32 bit float)
            rawSoundData[i] = inSoundData[Math.floor(i * sampleRatio)] * 32767;
        }

        //can be anything but make it a multiple of 576 to make encoders life easier
        const sampleBlockSize = 1152;
        const mp3encoder = new lamejs.Mp3Encoder(1, 11025, 32);
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

        // //can be anything but make it a multiple of 576 to make encoders life easier
        // const mp3encoder = new lamejs.Mp3Encoder(1, 11025, 32);
        // const mp3samples = mp3encoder.encodeBuffer(rawSoundData);
        // const mp3final = mp3encoder.flush();   //finish writing mp3
        // if ((mp3samples.length > 0) && (mp3final.length > 0)) {
        //     const mp3Data = new Int8Array(mp3samples.length + mp3final.length);
        //     mp3Data.set(mp3samples, 0);
        //     mp3Data.set(mp3final, mp3samples.length);
        //     // const blob = new Blob(mp3Data, {type: 'audio/mp3'});
        //     // const file = new File([blob], "testMP3.mp3");
        //     return mp3Data;
        // }
        // return null;
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
    static toRgbColorList (value) {
        const color = Cast.toRgbColorObject(value);
        return [color.r, color.g, color.b];
    }

}

module.exports = Scratch3Mv2Blocks;