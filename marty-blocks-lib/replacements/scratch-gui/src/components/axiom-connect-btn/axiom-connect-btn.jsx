import React from "react";
import bindAll from "lodash.bindall";
import styles from "./axiom-connect-btn.css";
import ConnectBtnSVG from "./svg-components/connect-btn.jsx";
import DisconnectBtnSVG from "./svg-components/disconnect-btn.jsx";
import Modal from '../../containers/modal.jsx';
import AxiomBatteryLevel from "./axiom-battery-level/axiom-battery-level.jsx";
import AxiomSignalStrength from "./axiom-signal-strength/axiom-signal-strength.jsx";

const AXIOM_CONNECTED_SUBSCRIPTION_ID = "AXIOM_CONNECTED_SUBSCRIPTION_ID";
const AXIOM_DISCONNECTED_SUBSCRIPTION_ID = "AXIOM_DISCONNECTED_SUBSCRIPTION_ID";

class AxiomConnectBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: axiomInterface.isConnected,
      isModalVisible: false,
      deviceName: "Axiom",
      axiomLights: null
    };

    bindAll(this, [
      "clickBtnHandler",
      "setDeviceName",
      "onYes",
      "onNo",
      "setLightsAndAwaitForUserResponse",
      "onConnectedCb",
      "onDisconnectedCb"
    ]);

    this.resolveModalPromise = null;
  }

  componentDidMount() {
    axiomInterface.subscribe(AXIOM_CONNECTED_SUBSCRIPTION_ID, axiomInterface.axiomPublishedEvents.CONNECTED, this.onConnectedCb);
    axiomInterface.subscribe(AXIOM_DISCONNECTED_SUBSCRIPTION_ID, axiomInterface.axiomPublishedEvents.DISCONNECTED, this.onDisconnectedCb);
  }

  onConnectedCb() {
    this.setState({ isConnected: true, axiomLights: null });
  }

  onDisconnectedCb() {
    this.setState({ isConnected: false, axiomLights: null });
  }

  componentWillUnmount() {
    axiomInterface.unsubscribe(AXIOM_CONNECTED_SUBSCRIPTION_ID);
    axiomInterface.unsubscribe(AXIOM_DISCONNECTED_SUBSCRIPTION_ID);
  }

  clickBtnHandler() {
    console.log("clickBtnHandler")
    if (this.state.isConnected) {
      axiomInterface.disconnect();
    } else {
      axiomInterface.connect(() => this.setState({ isModalVisible: true }), this.setDeviceName, this.setLightsAndAwaitForUserResponse);
    }
  }

  async setLightsAndAwaitForUserResponse(lights) {
    this.setState({ axiomLights: lights });
    return new Promise((resolve) => {
      this.resolveModalPromise = resolve;
    });
  }

  setDeviceName(name) {
    this.setState({ deviceName: name });
  }

  onYes() {
    this.setState({ isModalVisible: false });
    if (this.resolveModalPromise) {
      this.resolveModalPromise(true);
      this.resolveModalPromise = null;
    }
  }

  onNo() {
    this.setState({ isModalVisible: false, axiomLights: null });
    if (this.resolveModalPromise) {
      this.resolveModalPromise(false);
      this.resolveModalPromise = null;
    }
  }

  render() {
    return (
      <>
        {this.state.isModalVisible && <Modal
          className={styles.modal}
          fullScreen={false}
          contentLabel="Connect to Axiom"
          id="axiom-connect-modal"
          onRequestClose={this.onNo}
        >
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              Are the lights on {this.state.deviceName} displaying like this?
            </div>
            <div className={styles.modalContent}>
              <div className={styles.modalImageContainer}>
                {this.state.axiomLights ? <img src={`data:image/svg+xml;utf8,${encodeURIComponent(axiomSvg(this.state.axiomLights))}`} alt="Axiom LEDs" /> : "Please wait..."}
              </div>
              <div className={styles.modalBtnContainer}>
                <button className={styles.modalBtn} onClick={this.onNo}>No</button>
                <button className={styles.modalBtn} onClick={this.onYes}>Yes</button>
              </div>
            </div>
          </div>
        </Modal>}
        <div className={styles.martyConnectBtnContainer} onClick={this.clickBtnHandler}>
          {this.state.isConnected ? (
            <div className={styles.batterySignalContainer}>
              <AxiomBatteryLevel />
              <AxiomSignalStrength />
              <div className={styles.disconnectBtnContainer} >
                <DisconnectBtnSVG />
              </div>
            </div>
          ) : (
            <ConnectBtnSVG />
          )}
        </div>
      </>
    );
  }
}

export default AxiomConnectBtn;



const axiomSvg = (leds) => {

  return `<?xml version="1.0" encoding="UTF-8"?><svg id="Layer_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 97.63 139.7" width="97.63" height="139.7"><title>axiom-leds</title>
<g id="Layer_1-2">
<path d="M59.52.5h-21.4L.5,38.11v63.48l37.62,37.61h21.4l37.61-37.61v-63.48L59.52.5ZM85.57,98.78c0,6.6-5.4,12-12,12H24.06c-6.6,0-12-5.4-12-12v-21.48c0-6.6,5.4-12,12-12h49.51c6.6,0,12,5.4,12,12v21.48Z" style="fill:#fff; stroke:#231f20; stroke-miterlimit:10;"/>
<rect x="12.06" y="65.3" width="73.51" height="45.48" rx="12" ry="12" style="fill:#fff; stroke-width:0px;"/>
<rect x="12.06" y="65.3" width="73.51" height="45.48" rx="12" ry="12" style="fill:#fff; stroke:#231f20; stroke-miterlimit:10;"/>
<path d="M38.12.5L.5,38.11V12.5C.5,5.9,5.9.5,12.5.5h25.62Z" style="fill:${leds[0]}; stroke:#231f20; stroke-miterlimit:10;"/>
<path d="M97.13,12.5v25.61L59.52.5h25.61c6.6,0,12,5.4,12,12Z" style="fill:${leds[1]}; stroke:#231f20; stroke-miterlimit:10;"/>
<path d="M97.13,101.59v25.61c0,6.6-5.4,12-12,12h-25.61l37.61-37.61Z" style="fill:${leds[2]}; stroke:#231f20; stroke-miterlimit:10;"/>
<path d="M38.12,139.2H12.5c-6.6,0-12-5.4-12-12v-25.61l37.62,37.61Z" style="fill:${leds[3]}; stroke:#231f20; stroke-miterlimit:10;"/>
</g></svg>`;
}