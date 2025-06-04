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
    }

    componentWillUnmount() {
        console.log("UNMOUNTING CONNECTION BUTTON", this.props.deviceId);
        window.raftManager.removeSubscriptionsOfDevice(this.props.deviceId);
        window.raftManager.removeConnectionButtonState(this.props.deviceId);
        window.raftManager.removeDeviceIdRaftIdMapGivenOnlyDeviceId(this.props.deviceId);
    }

    onConnect() {
        const disconnectCallback = (raft) => {
            console.log("Disconnected in connection button disconnect callback");
            this.setState({
                isConnected: false
            });
            try {
                this.props.onChangeDeviceName(raft.type, this.props.deviceId);
            } catch (e) {
                console.warn("Device was removed before name could be changed");
            }
        };
        const connectCallback = (raft) => {
            this.setState({
                isConnected: true
            });
            const raftName = raft.getFriendlyName();
            this.props.onChangeDeviceName(raftName || "Name unknown", this.props.deviceId);
        };
        // get rafttype of the device
        const raftType = window.vm.editingTarget.raftType;
        window.raftManager.connect(connectCallback.bind(this), disconnectCallback.bind(this), this.props.deviceId, raftType);
    };

    onDisconnect() {
        window.raftManager.disconnect(this.props.deviceId);
    }

    render() {
        if (!this.props.isItemSelected) {
            return null;
        }
        return (this.state.isConnected || window.isDeviceConnected) ? <DisonnectButton onClick={this.onDisconnect} id={`${this.props.deviceId}-${window.vm.editingTarget.raftType}-disconnect`} /> : <ConnectButton onClick={this.onConnect} id={`${this.props.deviceId}-${window.vm.editingTarget.raftType}-connect`} />;
    }

}