const CogVmEvents = require("./CogEventEnum");
const { isVersionGreater_errorCatching } = require("../versionChecker");
const { raftPubSubscriptionHelper } = require("../util/raft-subscription-helpers");


class PublishedDataAnalyser {

    constructor(cog) {
        this.cog = cog;
        this.cogState = {
            tilt: false,
            movementType: false,
            rotation: false,
            buttonClick: false,
            objectSense: false,
            lightSense: false,
            irMessage: false
        };
        this.pubSub = null;
        this.subscribeToPublishedData();
    }

    subscribeToPublishedData() {
        this.pubSub = raftPubSubscriptionHelper(this.cog);
        this.pubSub.subscribe((data) => {
            this.analyse(data.stateInfo);
        });
    }

    unsubscribeFromPublishedData() {
        this.pubSub.unsubscribe();
    }

    analyse(data) {
        const isMoving = this.detectMovement(data);
        this.detectTilt(data, isMoving);
        this.detectRotation(data, isMoving);
        this.detectButtonClick(data);
        this.detectObjectSense(data);
        this.detectLightSense(data);
        this.detectIRMessage(data);
    }

    detectTilt(data, isMoving) {
        tiltDetection.detectTilt(data, isMoving, this.cogState, this.cog.getRaftVersion())
    }

    detectMovement(data) {
        return shakeDetector.detectShake(data.LSM6DS.ax, data.LSM6DS.ay, data.LSM6DS.az, Date.now(), this.cogState);
    }

    detectRotation(data, isMoving) {
        rotationDetection.detectRotation(data, isMoving, this.cogState);
    }

    detectButtonClick(data) {
        buttonClickDetection.detectButtonClick(data.Light.irVals[2], this.cogState, this.cog.getRaftVersion())
    }

    detectObjectSense(data) {
        const objectSenseValueArray = data.Light.irVals;
        objectSenseDetection.detectObjectSense(objectSenseValueArray, this.cogState);
    }

    detectLightSense(data) {
        const lightSenseValue = data.Light.ambientVals[0];
        lightSenseDetection.detectLightSense(lightSenseValue, this.cogState);
    }

    detectIRMessage(data) {
        const irMessageData = data;
        irMessageDetection.detectIRMessage(irMessageData, this.cogState);
    }
}

class TiltDetection {
    distance(a, b) { return Math.sqrt((Math.pow(a, 2) + Math.pow(b, 2))) }

    static rotateAccelData(x, y, z, degrees) {
        // Convert degrees to radians
        const radians = degrees * (Math.PI / 180);

        // First rotate by 180 degrees about y axis
        let rotatedX = 0 - x;
        let rotatedY = y;
        let rotatedZ = 0 - z;

        const initialRotatedX = rotatedX;

        // Calculate cosine and sine of the rotation angle
        const cosTheta = Math.cos(radians);
        const sinTheta = Math.sin(radians);

        // Rotate around the z-axis
        rotatedX = initialRotatedX * cosTheta - rotatedY * sinTheta;
        rotatedY = initialRotatedX * sinTheta + rotatedY * cosTheta;
        rotatedZ = rotatedZ;  // z remains unchanged as the rotation is around the z-axis

        return { x: rotatedX, y: rotatedY, z: rotatedZ };
    }

    detectTilt(data, isMoving = false, cogState, cogVersion) {
        if (isMoving) return;


        const tiltCorrectionForOlderCog = 30;
        const tiltCorrectionForNewerCog = -90;
        const correctionCutOffVersion = "1.2.0";
        let tiltCorrection = tiltCorrectionForOlderCog;

        if (isVersionGreater_errorCatching(cogVersion, correctionCutOffVersion)) {
            tiltCorrection = tiltCorrectionForNewerCog;
        }

        const { x, y, z } = TiltDetection.rotateAccelData(data.LSM6DS.ax, data.LSM6DS.ay, data.LSM6DS.az, window.tilt_rotate_z_deg || tiltCorrection);
        const pitch = Math.atan2(x, this.distance(y, z));
        const roll = Math.atan2(y, this.distance(x, z));
        const yaw = Math.atan2(z, this.distance(x, y));
        // no tilt example values: pitch: 0.00, roll: 0.00, yaw: 1.50
        // tilt left example values: pitch: 0.00, roll: -1.00, yaw: 0.50
        // tilt right example values: pitch: 0.00, roll: 1.00, yaw: 0.50
        // tilt forward example values: pitch: -1.00, roll: 0.00, yaw: 0.50
        // tilt backward example values: pitch: 1.00, roll: 0.00, yaw: 0.50

        const forwardBackwardThreshold = window.tilt_fw_bw || 20 * (Math.PI / 180); // threshold for forward and backward tilt
        const leftRightThreshold = window.tilt_left_right || 20 * (Math.PI / 180); // threshold for left and right tilt
        const upDownThreshold = window.tilt_up_down || 0.5; // threshold for up and down tilt

        let tiltDirection = false;
        if (pitch < -forwardBackwardThreshold) {// && Math.abs(yaw) < upDownThreshold) {
            tiltDirection = "forward";
        }
        if (pitch > forwardBackwardThreshold) {// && Math.abs(yaw) < upDownThreshold) {
            tiltDirection = "backward";
        }
        if (roll < -leftRightThreshold) {// && Math.abs(yaw) < upDownThreshold) {
            tiltDirection = "left";
        }
        if (roll > leftRightThreshold) {// && Math.abs(yaw) < upDownThreshold) {
            tiltDirection = "right";
        }
        cogState.tilt = tiltDirection;
    }
}

class RotationDetection {
    constructor() {
        this.dataBuffer = [];
        this.bufferSize = 20; // buffer size for rotation detection
        this.DELAY_FOR_ROTATION = 500; // delay between rotation detection
        this.ROTATION_THRESHOLD = 8; // threshold for rotation detection
        this.rotationDetected = false;
        this.lastRotationDetectionTime = 0;
        this.rotationTimer = null;
    }

    addToBuffer(data) {
        this.dataBuffer.push(data);
        if (this.dataBuffer.length > this.bufferSize) {
            this.dataBuffer.shift();
        }
    }

    detectRotation(
        data,
        isMoving = false,
        cogState,
    ) {
        this.bufferSize = window.rotation_buffer_size || this.bufferSize;
        this.DELAY_FOR_ROTATION = window.rotation_delay || this.DELAY_FOR_ROTATION;
        this.ROTATION_THRESHOLD = window.rotation_thr || this.ROTATION_THRESHOLD;
        const currentTime = Date.now();

        this.addToBuffer(data.LSM6DS.gz);
        if (this.dataBuffer.length < this.bufferSize) {
            return;  // Wait until buffer is full
        }

        if (currentTime - this.lastRotationDetectionTime < this.DELAY_FOR_ROTATION || isMoving) {
            // Ensure there is a minimum time between detections
            return;
        }

        const metric = this.calculateMetric();
        // Check if the magnitude of the rate of change is above the threshold
        if (metric > this.ROTATION_THRESHOLD || metric < -this.ROTATION_THRESHOLD) {
            this.lastRotationDetectionTime = currentTime;
            this.dataBuffer = [];
            if (metric > this.ROTATION_THRESHOLD) {
                // console.log("Clockwise rotation detected:", metric);
                cogState.rotation = "clockwise";
            } else if (metric < -this.ROTATION_THRESHOLD) {
                // console.log("Counter-clockwise rotation detected:", metric);
                cogState.rotation = "counter-clockwise";
            }
        } else {
            cogState.rotation = false;
        }
    }

    calculateMetric() {
        //let gzArray = [];
        let sum = 0;
        for (let i = 0; i < this.dataBuffer.length; i++) {
            //sum += this.dataBuffer[i].LSM6DS.gz;
            sum += this.dataBuffer[i];
            //gzArray.push(this.dataBuffer[i]);
        }
        //console.log("gz buffer (" + gzArray.length + " elements avg. " + (sum / this.dataBuffer.length) + "): " + gzArray);
        //console.log(this.dataBuffer);
        return sum / this.dataBuffer.length;
    }
}

class ShakeDetector {
    constructor() {
        this.thresholdAccelerationMove = 0.3;
        this.thresholdAcceleration = 1; // how much acceleration is needed to consider shaking
        this.thresholdShakeNumber = 1; // how many shakes are needed
        this.interval = 400; // how much time between shakes
        this.maxShakeDuration = 1500; // Maximum duration between first and last shakes in a sequence
        this.coolOffPeriod = 1500; // how much time to wait before detecting another shake
        this.lastTime = 0;
        this.lastTimeShakeDetected = 0;
        this.sensorBundles = [];
        this.gravityVector = [0, 0, 0];
        this.lastVector = [0, 0, 0];
        this.shakeInProgress = false;
        this.moveInProgress = false;
    }

    detectShake(xAcc, yAcc, zAcc, timestamp, cogState) {
        this.thresholdAcceleration = window.shake_thr_acc || this.thresholdAcceleration;
        this.thresholdAccelerationMove = window.move_thr_acc || this.thresholdAccelerationMove;
        this.thresholdShakeNumber = window.shake_thr_num || this.thresholdShakeNumber;
        this.interval = window.shake_interval || this.interval;
        this.maxShakeDuration = window.shake_max_duration || this.maxShakeDuration;
        this.coolOffPeriod = window.shake_cool_off || this.coolOffPeriod;

        const magAcc = Math.sqrt(xAcc * xAcc + yAcc * yAcc + zAcc * zAcc);
        if (magAcc > 0.9 && magAcc < 1.1) {
            // device is stationary-ish, log direction of acc values to get a rough reading on where down is
            this.gravityVector = [xAcc, yAcc, zAcc];
            if (this.moveInProgress) {
                // console.log("move detected");
                cogState.movementType = "move";
            } else {
                // console.log("no move detected");
                cogState.movementType = false;
            }
            this.moveInProgress = false;
            this.shakeInProgress = false;
            this.sensorBundles = [];
        } else {
            //console.log("move in progrss. prev state: ", this.moveInProgress);
            // potentially threshold this with thresholeAccelerationMove if we want it to be less trigger happy
            this.moveInProgress = true;

            // this assumes that the orientation of the device doesn't change during the movement, so it's not ideal
            const x = xAcc - this.gravityVector[0];
            const y = yAcc - this.gravityVector[1];
            const z = zAcc - this.gravityVector[2];
            const mag = Math.sqrt(x * x + y * y + z * z);

            if (mag > this.thresholdAcceleration || this.shakeInProgress) {
                this.shakeInProgress = true;
                const diffThresh = this.thresholdAcceleration;
                if (mag > this.thresholdAcceleration) {
                    // console.log('large magnitude movement ', x, y, z, this.gravityVector);
                    // check if the acc vector is significantly changed from the previous large value
                    if (!this.sensorBundles.length || Math.sqrt(Math.pow(this.lastVector[0] - x, 2) + Math.pow(this.lastVector[1] - y, 2) + Math.pow(this.lastVector[2] - z, 2)) > this.thresholdAcceleration) {
                        this.sensorBundles.push({ x, y, z, timestamp });
                        //console.log(this.sensorBundles);
                        this.lastVector = [x, y, z];
                        // todo - call performCheck() to do a more detailed analysis of the readings? Might need some tweaks
                        if (this.sensorBundles.length > this.thresholdShakeNumber) {
                            // console.log("Shake detected!");
                            this.sensorBundles = [];
                            this.shakeInProgress = false;
                            cogState.movementType = "shake";
                        }
                    }
                    // this.noMoveCallback();
                } else {
                    if (!this.sensorBundles.length || (timestamp - this.sensorBundles[this.sensorBundles.length - 1].timestamp) > this.interval) {
                        this.shakeInProgress = false;
                        this.sensorBundles = [];
                        // console.log("resetting shake detector. Move detected");
                        // fire move detector
                        cogState.movementType = "move";
                    }
                }
            }

            return this.moveInProgress;
            /*
            if (this.sensorBundles.length === 0 || timestamp - this.lastTime > this.interval) {
                // Check if we should reset based on time since last recorded shake
                if (this.sensorBundles.length > 0 && (timestamp - this.sensorBundles[0].timestamp) > this.maxShakeDuration) {
                    this.sensorBundles = []; // Reset the sensor data if the shakes are too far apart
                }
                this.sensorBundles.push({ xAcc, yAcc, zAcc, timestamp });
                this.lastTime = timestamp;
                this.performCheck();
            }
            */
        }
    }

    performCheck(cogState) {
        const matrix = [
            [0, 0], // X axis positive and negative
            [0, 0], // Y axis positive and negative
            [0, 0]  // Z axis positive and negative
        ];

        for (const bundle of this.sensorBundles) {
            this.updateAxis(0, bundle.xAcc, matrix);
            this.updateAxis(1, bundle.yAcc, matrix);
            this.updateAxis(2, bundle.zAcc, matrix, -1);
        }

        // check if any of the negatives and the positives are greater than the threshold
        const negativesTotal = matrix.reduce((acc, axis) => acc + axis[1], 0);
        const positivesTotal = matrix.reduce((acc, axis) => acc + axis[0], 0);

        if (matrix.some(axis => axis[0] >= this.thresholdShakeNumber && axis[1] >= this.thresholdShakeNumber)) {
            // if (positivesTotal >= this.thresholdShakeNumber && negativesTotal >= this.thresholdShakeNumber) {

            if (Date.now() - this.lastTimeShakeDetected < this.coolOffPeriod) {
                return;
            }
            this.lastTimeShakeDetected = Date.now();

            // console.log("Shake detected!", JSON.stringify(matrix));
            cogState.movementType = "shake";
            this.sensorBundles = [];
        }
    }

    updateAxis(index, acceleration, matrix, adjustment = 0) {
        const accelerationAdjusted = acceleration + adjustment;
        if (accelerationAdjusted > this.thresholdAcceleration) {
            matrix[index][0]++;
            // console.log(JSON.stringify(matrix));
        } else if (accelerationAdjusted < -this.thresholdAcceleration) {
            matrix[index][1]++;
            // console.log(JSON.stringify(matrix));
        }
    }
}

class ButtonClickDetection {
    /* 
    When the threshold is exceeded, the button is clicked, but we want to send the event when the button is released 
    so that the event is triggered only once. 
    */
    constructor() {
        this.clickThreshold = 1600;
        this.releaseThreshold = 1590;
        this.lastTime = 0;
        this.buttonClicked = false;
    }

    detectButtonClick(buttonValue, cogState, cogVersion) {
        const correctionCutOffVersion = "1.2.0";
        let clickThreshold = 1600;
        if (isVersionGreater_errorCatching(cogVersion, correctionCutOffVersion)) {
            clickThreshold = 2300;
        }
        let releaseThreshold = 1590;
        if (isVersionGreater_errorCatching(cogVersion, correctionCutOffVersion)) {
            releaseThreshold = 2290;
        }
        this.clickThreshold = window.button_click_threshold || clickThreshold;
        this.releaseThreshold = window.button_release_threshold || releaseThreshold;

        const currentTime = Date.now();
        if (buttonValue > this.clickThreshold && !this.buttonClicked) {
            // console.log("Button clicked", buttonValue);
            this.buttonClicked = true;
            this.lastTime = currentTime;
            cogState.buttonClick = true;
        } else if (buttonValue < this.releaseThreshold && this.buttonClicked) {
            // console.log("Button released", buttonValue);
            this.buttonClicked = false;
            cogState.buttonClick = false;
        }
        // } else {
        //     this.buttonClicked = false;
        //     this.buttonReleaseCallback();
        // }
    }

}
class ObjectSenseDetection {
    constructor() {
        this.objectSensed0Threshold = 1150; // right of the arrow
        this.objectSensed1Threshold = 1450; // left of the arrow
        this.objectSensed2Threshold = 1500; // button
    }

    detectObjectSense(objectSenseValue, cogState) {

        if (objectSenseValue[0] > this.objectSensed0Threshold) {
            cogState.objectSense = "right";
        } else if (objectSenseValue[1] > this.objectSensed1Threshold) {
            cogState.objectSense = "left";
        } else {
            cogState.objectSense = false;
        }
    }
}

class LightSenseDetection {
    constructor() {
        this.lightSenseThreshold = 450;
    }

    detectLightSense(lightSenseValue, cogState) {
        if (lightSenseValue > this.lightSenseThreshold) {
            cogState.lightSense = true;
        } else {
            cogState.lightSense = false;
        }
    }
}

class IRMessageDetection {
    constructor() {
        this.irMessage0Threshold = 0;
        this.irMessage1Threshold = 0;
    }

    detectIRMessage(irMessageValue, cogState) {
        // placeholder for now
        if (irMessageValue[0] > this.irMessage0Threshold) {
            cogState.irMessage = "left"
        } else if (irMessageValue[1] > this.irMessage1Threshold) {
            cogState.irMessage = "right"
        } else {
            cogState.irMessage = false;
        }
    }
}


const rotationDetection = new RotationDetection();
const shakeDetector = new ShakeDetector();
const buttonClickDetection = new ButtonClickDetection();
const tiltDetection = new TiltDetection();
const objectSenseDetection = new ObjectSenseDetection();
const lightSenseDetection = new LightSenseDetection();
const irMessageDetection = new IRMessageDetection();

module.exports = {
    default: PublishedDataAnalyser,
    TiltDetection,
};
