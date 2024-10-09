import React from 'react';
import ConnectButton from "./connect-button.jsx";
import styles from "./styles.css";
import { FormattedMessage } from "react-intl";
import DisonnectButton from './disconnect-button.jsx';


export default class ConnectionButton extends React.Component {

    constructor(props) {
        super(props);

        this.onConnect = this.onConnect.bind(this);
        this.onDisconnect = this.onDisconnect.bind(this);

        this.state = {
            isConnected: false,
        };
    }

    componentDidMount() {
        console.log("MOUNTING CONNECTION BUTTON", this.props.deviceId);
        // checking if we are already connected to a device with the same deviceId
        window.raftManager.addConnectionButtonState(this.props.deviceId, this);

        console.log("raftIdAndDeviceIdMap", window.raftManager.raftIdAndDeviceIdMap);
        // check if this button is already connected to a device
        // const checkIfConnected = () => {
        //     // first of all check that this button is not already connected to a device
        //     if (this.state.isConnected) {
        //         console.log("This button already linked to a device");
        //         return;
        //     }
        //     const connectedRafts = window.applicationManager.connectedRafts;
        //     for (const raftId in connectedRafts) {
        //         const deviceIdOfConnectedRaft = window.raftManager.raftIdAndDeviceIdMap[raftId];
        //         const isSameDevice = deviceIdOfConnectedRaft === this.props.deviceId;
        //         if (isSameDevice) {
        //             this.setState({
        //                 isConnected: true
        //             });

        //             // also set subscription to disconnect event
        //             const raft = connectedRafts[raftId];
        //             console.log("SETTING UP DISCONNECT SUBSCRIPTION IN CONNECTION BUTTON", this.props.deviceId);
        //             window.raftManager.setupDisconnectSubscription(raft, (raft_) => {
        //                 console.log("Disconnected in connection button component did mount");
        //                 this.setState({
        //                     isConnected: false
        //                 });
        //                 try {
        //                     this.props.onChangeDeviceName(raft.type);
        //                 } catch (e) {
        //                     console.warn("Device was removed before name could be changed");
        //                 }
        //             });
        //             break;
        //         }
        //     }
        // };
        // // check if we are already to a device with the same deviceId
        // setTimeout(checkIfConnected, 1000);
        // checkIfConnected();
    }

    componentWillUnmount() {
        console.log("UNMOUNTING CONNECTION BUTTON", this.props.deviceId);
        window.raftManager.removeSubscriptionsOfDevice(this.props.deviceId);
    }

    onConnect() {
        const disconnectCallback = (raft) => {
            console.log("Disconnected in connection button disconnect callback");
            this.setState({
                isConnected: false
            });
            try {
                this.props.onChangeDeviceName(raft.type);
            } catch (e) {
                console.warn("Device was removed before name could be changed");
            }
        };
        const connectCallback = (raft) => {
            this.setState({
                isConnected: true
            });
            const raftName = raft.getFriendlyName();
            this.props.onChangeDeviceName(raftName || "Name unknown");
        };

        window.raftManager.connect(connectCallback.bind(this), disconnectCallback.bind(this), this.props.deviceId);
    };

    onDisconnect() {
        window.raftManager.disconnect(this.props.deviceId);
    }

    render() {
        if (!this.props.isItemSelected) {
            return null;
        }
        return this.state.isConnected ? <DisonnectButton onClick={this.onDisconnect} /> : <ConnectButton onClick={this.onConnect} />;
    }

}