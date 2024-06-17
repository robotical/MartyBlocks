const { RaftConnEvent, RaftPublishEvent, RaftLog } = require("@robdobsn/raftjs");
// import UIConnectAxiom from "../editor/ui/ConnectAxiom";
const { Observable } = require("../util/Observable");
const { ConnManager } = require("@robotical/roboticaljs");
const publishedDataAnalyser = require("./PublishedDataAnalyser");
const AxiomInterfaceEvents = require("./AxiomEventEnum.js");

const ledLcdColours = [
    { led: "#202000", lcd: "#FFFF00" },
    { led: "#880000", lcd: "#FF0000" },
    { led: "#000040", lcd: "#0080FF" },
    { led: "#004000", lcd: "#00FF00" },
];

class AxiomInterface extends Observable {

    constructor() {
        super();
        console.log("setting the log level")
        RaftLog.setLogLevel(0);
        RaftLog.error("this is an error");
        RaftLog.warn("this is a warning");
        RaftLog.info("this is an info");
        RaftLog.debug("this is a debug");
        RaftLog.verbose("this is a trace");

        this.isAxiomConnected = false;
        this.axiomPublishedEvents = AxiomInterfaceEvents;
    }

    setConnected(connected) {
        this.isAxiomConnected = connected;
        if (connected) {
            this.publish(AxiomInterfaceEvents.CONNECTED);
        } else {
            this.publish(AxiomInterfaceEvents.DISCONNECTED);
        }
    }

    async onConnectedCallback(setDeviceNameOnUi) {
        const connManager = ConnManager.getInstance();

        // get name of the device
        console.log("setting the ui with the name")
        const sysInfo = await connManager.getConnector().getRaftSystemUtils().getSystemInfo();
        setDeviceNameOnUi(sysInfo.Friendly || 'axiom');
        // UIConnectAxiom.init(sysInfo.Friendly);

        // send command to start the verification process (set the lights)
        const msgHandler = connManager.getConnector().getRaftSystemUtils().getMsgHandler();
        const onConnEvent = connManager.getConnector().onConnEvent.bind(connManager.getConnector());
        const isConnectedFn = connManager.isConnected.bind(connManager);

        const didVerificationStart = await connManager.getConnector()._systemType.getLEDPatternChecker().checkCorrectRICStart(
            ledLcdColours,
            msgHandler,
            onConnEvent,
            isConnectedFn
        );

        if (!didVerificationStart) {
            console.error("AxiomInterface.connect", "verification failed");
            return;
        }

        // // set the lights in the modal and wait for confirmation or cancel
        // const modalResults = await UIConnectAxiom.setLights(lights);

        // // if cancel, stop the connection process and return
        // if (!modalResults) {
        //     console.log("AxiomInterface.connect", "not connected");
        //     return;
        // }

        // // if confirm, connect to the device
        // console.log("AxiomInterface.connect", "connected");
        // this.setConnected(true);
    }

    async onVerifyingCallback(lights, setLightsAndAwaitForUserResponse) {
        const connManager = ConnManager.getInstance();
        const cogLEDs = connManager.getConnector()._systemType.getLEDPatternChecker();
        // set the lights in the modal and wait for confirmation or cancel
        const modalResults = await setLightsAndAwaitForUserResponse(lights);

        // if cancel, stop the verification and connection processes and return
        if (!modalResults) {
            await cogLEDs.checkCorrectRICStop(false);
            return;
        }

        await cogLEDs.checkCorrectRICStop(true);
    }

    async onVerifiedCorrectCallback() {
        this.setConnected(true);
    }

    async onDisconnectedCallback() {
        this.setConnected(false);
        const connManager = ConnManager.getInstance();
        const connector = connManager.getConnector();
        connector.setEventListener(null);
    }

    async onRejectedCallback() {
        this.setConnected(false);
        const connManager = ConnManager.getInstance();
        connManager.disconnect();
    }

    async onPublishDataCallback(data) {

        // decide data analyser
        publishedDataAnalyser.analyse(data, this);
    }

    getStateInfo() {
        const connManager = ConnManager.getInstance();
        const systemType = connManager.getConnector().getSystemType();
        if (systemType) {
            if (systemType.getStateInfo) {
                return systemType.getStateInfo();
            } else if (systemType.getRICStateInfo) {
                return systemType.getRICStateInfo();
            }
        }
        return {};
    }

    async connect(showModal, setDeviceNameOnUi, setLightsAndAwaitForUserResponse) {
        const connManager = ConnManager.getInstance();
        const listener = async (
            eventType,
            eventEnum,
            eventName,
            data
        ) => {
            if (eventType === "conn") {
                console.log("in connection event", eventType, eventEnum, eventName, data);
                if (eventEnum === RaftConnEvent.CONN_CONNECTED) {
                    await this.onConnectedCallback(setDeviceNameOnUi,);
                }
                if (eventEnum === RaftConnEvent.CONN_DISCONNECTED) {
                    this.onDisconnectedCallback();
                }
                if (eventEnum === RaftConnEvent.CONN_VERIFYING_CORRECT) {
                    // verification process started. show the lights in the modal
                    this.onVerifyingCallback(data, setLightsAndAwaitForUserResponse);
                }
                if (eventEnum === RaftConnEvent.CONN_VERIFIED_CORRECT) {
                    this.onVerifiedCorrectCallback();
                }
                if (eventEnum === RaftConnEvent.CONN_REJECTED) {
                    this.onRejectedCallback();
                }
            } else if (eventType === "pub") {
                if (eventEnum === RaftPublishEvent.PUBLISH_EVENT_DATA) {
                    const systemType = connManager.getConnector().getSystemType();
                    if (systemType) {
                        if (this.isAxiomConnected) {
                            // const newState = systemType.getStateInfo();
                            const accelData = systemType.getRICStateInfo().imuData.accel;
                            const newState = {
                                "Light": {
                                    "irVals": [1103, 341, randomNumber(0, 1400)],
                                },
                                "LSM6DS": {
                                    "gx": randomNumber(-1, 1),
                                    "gy": randomNumber(-1, 1),
                                    "gz": randomNumber(-1, 1),
                                    "ax": accelData.x,
                                    "ay": accelData.y,
                                    "az": accelData.z,
                                    "tsMs": 19848
                                }, "_deviceLastTs": { "LSM6DS": { "lastMs": 19848, "offsetMs": 0 } }
                            }
                            this.onPublishDataCallback(newState);
                        }
                    }
                }
            }
        };

        // Set the listener function 
        connManager.setConnectionEventListener(listener);

        const wasConnected = await connManager.connect("WebBLE");
        if (!wasConnected) {
            console.error("AxiomInterface.connect", "not connected");
            return;
        }
        showModal();
    }

    async disconnect() {
        const connManager = ConnManager.getInstance();
        await connManager.disconnect();
        this.setConnected(false);
    }

    async sendRICRESTMsg(commandName, params = {}, bridgeID = undefined) {
        const connManager = ConnManager.getInstance();
        const results = await connManager.getConnector().sendRICRESTMsg(commandName, params, bridgeID);
        return results;
    }




    // dummy method that can be called from dev's console to show a dummy block
    showDummyBlock() {
        this.shouldShowDummyBlock = true;
        vm.extensionManager.refreshBlocks();
    }
}


// utils
const randomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
}

module.exports = AxiomInterface;