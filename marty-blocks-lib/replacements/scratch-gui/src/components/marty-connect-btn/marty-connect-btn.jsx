import React from "react";
import bindAll from "lodash.bindall";
import styles from "./marty-connect-btn.css";
import ConnectBtnSVG from "./svg-components/connect-btn.jsx";
import DisconnectBtnSVG from "./svg-components/disconnect-btn.jsx";
import MartyBatteryLevel from "../marty-battery-level/marty-battery-level.jsx";
import MartySignalStrength from "../marty-signal-strength/marty-signal-strength.jsx";

class ConnectBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: mv2Interface.isConnected,
    };
    bindAll(this, ["clickBtnHandler"]);
    this.onIsConnectedChange = this.onIsConnectedChange.bind(this);
    mv2Interface.addEventListener("onIsConnectedChange", this.onIsConnectedChange);
  }

  componentWillUnmount() {
    // eslint-disable-next-line no-undef
    mv2Interface.removeEventListener("onIsConnectedChange", this.onIsConnectedChange);
  }

  onIsConnectedChange(event) {
    this.setState({ isConnected: event.isConnected });
  }

  clickBtnHandler() {
    const message = mv2Interface.isConnected ? "disconnect" : "connect";
    mv2Interface.send_REST(message);
  }

  render() {
    return (
      <div className={styles.martyConnectBtnContainer} onClick={this.clickBtnHandler}>
        {this.state.isConnected ? (
          <div className={styles.batterySignalContainer}>
            <MartyBatteryLevel />
            <MartySignalStrength />
            <div className={styles.disconnectBtnContainer} >
              <DisconnectBtnSVG />
            </div>
          </div>
        ) : (
          <ConnectBtnSVG />
        )}
      </div>
    );
  }
}

export default ConnectBtn;
