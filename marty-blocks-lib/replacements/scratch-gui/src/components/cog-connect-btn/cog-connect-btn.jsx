import React from "react";
import bindAll from "lodash.bindall";
import styles from "./cog-connect-btn.css";
import ConnectBtnSVG from "./svg-components/connect-btn.jsx";
import DisconnectBtnSVG from "./svg-components/disconnect-btn.jsx";
import Modal from '../../containers/modal.jsx';
import CogBatteryLevel from "./cog-battery-level/cog-battery-level.jsx";
import CogSignalStrength from "./cog-signal-strength/cog-signal-strength.jsx";

const COG_CONNECTED_SUBSCRIPTION_ID = "COG_CONNECTED_SUBSCRIPTION_ID";
const COG_DISCONNECTED_SUBSCRIPTION_ID = "COG_DISCONNECTED_SUBSCRIPTION_ID";

class CogConnectBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: cogInterface.isConnected,
      isModalVisible: false,
      deviceName: "Cog",
      cogLights: null
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
    cogInterface.subscribe(COG_CONNECTED_SUBSCRIPTION_ID, cogInterface.cogPublishedEvents.CONNECTED, this.onConnectedCb);
    cogInterface.subscribe(COG_DISCONNECTED_SUBSCRIPTION_ID, cogInterface.cogPublishedEvents.DISCONNECTED, this.onDisconnectedCb);
  }

  onConnectedCb() {
    this.setState({ isConnected: true, cogLights: null });
  }

  onDisconnectedCb() {
    this.setState({ isConnected: false, cogLights: null });
  }

  componentWillUnmount() {
    cogInterface.unsubscribe(COG_CONNECTED_SUBSCRIPTION_ID);
    cogInterface.unsubscribe(COG_DISCONNECTED_SUBSCRIPTION_ID);
  }

  clickBtnHandler() {
    console.log("clickBtnHandler")
    if (this.state.isConnected) {
      cogInterface.disconnect();
    } else {
      cogInterface.connect(() => this.setState({ isModalVisible: true }), this.setDeviceName, this.setLightsAndAwaitForUserResponse);
    }
  }

  async setLightsAndAwaitForUserResponse(lights) {
    this.setState({ cogLights: lights });
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
    this.setState({ isModalVisible: false, cogLights: null });
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
          contentLabel="Connect to Cog"
          id="cog-connect-modal"
          onRequestClose={this.onNo}
        >
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              Are the lights on {this.state.deviceName} displaying like this?
            </div>
            <div className={styles.modalContent}>
              <div className={styles.modalImageContainer}>
                {/* {this.state.cogLights ? cogSvg(this.state.cogLights) : "Please wait..."} */}
                <div
                  dangerouslySetInnerHTML={{ __html: this.state.cogLights ? cogSvg(this.state.cogLights) : "Please wait..." }}
                />
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
              <CogBatteryLevel />
              <CogSignalStrength />
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

export default CogConnectBtn;



const cogSvg = (lights) => {
  // pushing the index by 5 for all of them, to align the lights with the correct orientation of p3
  // pushing the index by 5 for all of them, to align the lights with the correct orientation of p3
  const correctedIdxFactorForOlderP3 = 5;
  const correctedIdxFactorForNewerP3 = 12;
  const LEDAndAccelerometerVersionCutOff = "1.2.0";
  let correctedIdxFactor = correctedIdxFactorForOlderP3;

  if (window.isVersionGreater_errorCatching(window.cogInterface.sysInfo.SystemVersion, LEDAndAccelerometerVersionCutOff)) {
    correctedIdxFactor = correctedIdxFactorForNewerP3;
  }

  const lightsReIndexed = lights.map((light, index) => lights[(index + (window.correctedIdxFactor || correctedIdxFactor)) % 12]);

  return `
<?xml version="1.0" encoding="UTF-8"?>
<svg id="Layer_2" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 76 66">
  <defs>
    <style>
      .cls-cog-svg-1 {
        fill: #040406;
      }

      .cls-cog-svg-1, .cls-cog-svg-2, .cls-cog-svg-3, .cls-cog-svg-4, .cls-cog-svg-5, .cls-cog-svg-6 {
        stroke-width: 0px;
      }

      .cls-cog-svg-2 {

      }

      .cls-cog-svg-3 {
        fill: #ab55a1;
      }

      .cls-cog-svg-4 {
        fill: #fff;
      }

      .cls-cog-svg-5 {
        fill: #969692;
      }

      .cls-cog-svg-6 {
        fill: #fcee21;
      }
    </style>
  </defs>
  <path class="cls-cog-svg-3" d="M22.1,42.18l15.9,9.18,15.9-9.18v-18.36l-15.9-9.18-15.9,9.18v18.36ZM38,49.56l-14.34-8.28v-16.56l14.34-8.28,14.34,8.28v16.56l-14.34,8.28ZM25.66,40.13l12.34,7.12,12.34-7.12v-14.25l-12.34-7.13-12.34,7.13v14.25Z"/>
  <polygon class="cls-cog-svg-3" points="55.9 22.67 55.9 43.34 38 53.67 20.1 43.34 20.1 22.67 38 12.33 55.9 22.67"/>
  <g>
    <polygon class="cls-cog-svg-4" points="53.12 41.73 53.12 24.27 38 15.54 22.88 24.27 22.88 41.73 38 50.46 53.12 41.73"/>
    <polygon class="cls-cog-svg-4" points="54.62 23.41 54.62 42.6 38 52.2 21.38 42.6 21.38 23.41 38 13.81 54.62 23.41"/>
  </g>
  <g>
    <g>
      <circle id="circle--1" class="cls-cog-svg-2" cx="38.1" cy="33.1" r="4.27"/>
      <path class="cls-cog-svg-5" d="M34.72,36.47c-1.86-1.86-1.86-4.89,0-6.75s4.89-1.86,6.75,0,1.86,4.89,0,6.75-4.89,1.86-6.75,0ZM40.77,30.43c-1.47-1.47-3.86-1.47-5.34,0s-1.47,3.86,0,5.33,3.86,1.47,5.33,0,1.47-3.86,0-5.33Z"/>
    </g>
    <g>
      <circle id="circle--2" class="cls-cog-svg-2" cx="47.83" cy="27.44" r="2.48" fill="${lightsReIndexed[2]}"/>
      <path class="cls-cog-svg-1" d="M45.98,29.28c-1.02-1.02-1.02-2.67,0-3.69s2.67-1.02,3.69,0,1.02,2.67,0,3.69-2.67,1.02-3.69,0ZM49.49,25.77c-.92-.92-2.41-.92-3.33,0s-.92,2.41,0,3.33,2.41.92,3.33,0,.92-2.41,0-3.33Z"/>
    </g>
    <g>
      <circle id="circle--3" class="cls-cog-svg-2" cx="28.37" cy="38.75" r="2.48" fill="${lightsReIndexed[8]}"/>
      <path class="cls-cog-svg-1" d="M26.53,40.6c-1.02-1.02-1.02-2.67,0-3.69s2.67-1.02,3.69,0,1.02,2.67,0,3.69-2.67,1.02-3.69,0ZM30.04,37.09c-.92-.92-2.41-.92-3.33,0s-.92,2.41,0,3.33,2.41.92,3.33,0,.92-2.41,0-3.33Z"/>
    </g>
    <g>
      <circle id="circle--4" class="cls-cog-svg-2" cx="32.44" cy="23.37" r="2.48" fill="${lightsReIndexed[11]}"/>
      <path class="cls-cog-svg-1" d="M30.6,25.21c-1.02-1.02-1.02-2.67,0-3.69s2.67-1.02,3.69,0,1.02,2.67,0,3.69-2.67,1.02-3.69,0ZM34.11,21.7c-.92-.92-2.41-.92-3.33,0s-.92,2.41,0,3.33,2.41.92,3.33,0,.92-2.41,0-3.33Z"/>
    </g>
    <g>
      <circle id="circle--5" class="cls-cog-svg-2" cx="43.75" cy="42.82" r="2.48" fill="${lightsReIndexed[5]}"/>
      <path class="cls-cog-svg-1" d="M41.91,44.67c-1.02-1.02-1.02-2.67,0-3.69s2.67-1.02,3.69,0,1.02,2.67,0,3.69-2.67,1.02-3.69,0ZM45.42,41.16c-.92-.92-2.41-.92-3.33,0s-.92,2.41,0,3.33,2.41.92,3.33,0,.92-2.41,0-3.33Z"/>
    </g>
    <g>
      <circle id="circle--6" class="cls-cog-svg-2" cx="28.46" cy="27.46" r="2.48" fill="${lightsReIndexed[10]}"/>
      <path class="cls-cog-svg-1" d="M26.62,29.3c-1.02-1.02-1.02-2.67,0-3.69s2.67-1.02,3.69,0,1.02,2.67,0,3.69-2.67,1.02-3.69,0ZM30.13,25.79c-.92-.92-2.41-.92-3.33,0s-.92,2.41,0,3.33,2.41.92,3.33,0,.92-2.41,0-3.33Z"/>
    </g>
    <g>
      <circle id="circle--7" class="cls-cog-svg-2" cx="26.99" cy="33.14" r="2.48" fill="${lightsReIndexed[9]}"/>
      <path class="cls-cog-svg-1" d="M25.15,34.98c-1.02-1.02-1.02-2.67,0-3.69s2.67-1.02,3.69,0,1.02,2.67,0,3.69-2.67,1.02-3.69,0ZM28.66,31.47c-.92-.92-2.41-.92-3.33,0s-.92,2.41,0,3.33,2.41.92,3.33,0,.92-2.41,0-3.33Z"/>
    </g>
    <g>
      <circle id="circle--8" class="cls-cog-svg-2" cx="37.89" cy="21.81" r="2.48" fill="${lightsReIndexed[0]}"/>
      <path class="cls-cog-svg-1" d="M36.05,23.66c-1.02-1.02-1.02-2.67,0-3.69s2.67-1.02,3.69,0,1.02,2.67,0,3.69-2.67,1.02-3.69,0ZM39.56,20.15c-.92-.92-2.41-.92-3.33,0s-.92,2.41,0,3.33,2.41.92,3.33,0,.92-2.41,0-3.33Z"/>
    </g>
    <g>
      <circle id="circle--13" class="cls-cog-svg-2" cx="43.85" cy="23.34" r="2.48" fill="${lightsReIndexed[1]}"/>
      <path class="cls-cog-svg-1" d="M42,25.18c-1.02-1.02-1.02-2.67,0-3.69s2.67-1.02,3.69,0,1.02,2.67,0,3.69-2.67,1.02-3.69,0ZM45.51,21.67c-.92-.92-2.41-.92-3.33,0s-.92,2.41,0,3.33,2.41.92,3.33,0,.92-2.41,0-3.33Z"/>
    </g>
    <g>
      <circle id="circle--9" class="cls-cog-svg-2" cx="47.77" cy="38.8" r="2.48" fill="${lightsReIndexed[4]}"/>
      <path class="cls-cog-svg-1" d="M45.93,40.64c-1.02-1.02-1.02-2.67,0-3.69s2.67-1.02,3.69,0,1.02,2.67,0,3.69-2.67,1.02-3.69,0ZM49.44,37.13c-.92-.92-2.41-.92-3.33,0s-.92,2.41,0,3.33,2.41.92,3.33,0,.92-2.41,0-3.33Z"/>
    </g>
    <g>
      <circle id="circle--10" class="cls-cog-svg-2" cx="49.23" cy="33.21" r="2.48" fill="${lightsReIndexed[3]}"/>
      <path class="cls-cog-svg-1" d="M47.39,35.05c-1.02-1.02-1.02-2.67,0-3.69s2.67-1.02,3.69,0,1.02,2.67,0,3.69-2.67,1.02-3.69,0ZM50.9,31.54c-.92-.92-2.41-.92-3.33,0s-.92,2.41,0,3.33,2.41.92,3.33,0,.92-2.41,0-3.33Z"/>
    </g>
    <g>
      <circle id="circle--11" class="cls-cog-svg-2" cx="32.51" cy="42.93" r="2.48" fill="${lightsReIndexed[7]}"/>
      <path class="cls-cog-svg-1" d="M30.66,44.77c-1.02-1.02-1.02-2.67,0-3.69s2.67-1.02,3.69,0,1.02,2.67,0,3.69-2.67,1.02-3.69,0ZM34.17,41.26c-.92-.92-2.41-.92-3.33,0s-.92,2.41,0,3.33,2.41.92,3.33,0,.92-2.41,0-3.33Z"/>
    </g>
    <g>
      <circle id="circle--12" class="cls-cog-svg-2" cx="38.27" cy="44.32" r="2.48" fill="${lightsReIndexed[6]}"/>
      <path class="cls-cog-svg-1" d="M36.43,46.17c-1.02-1.02-1.02-2.67,0-3.69s2.67-1.02,3.69,0,1.02,2.67,0,3.69-2.67,1.02-3.69,0ZM39.93,42.66c-.92-.92-2.41-.92-3.33,0s-.92,2.41,0,3.33,2.41.92,3.33,0,.92-2.41,0-3.33Z"/>
    </g>
  </g>
  <polygon class="cls-cog-svg-6" points="29.44 18.75 46.56 18.75 38 13.81 29.44 18.75"/>
  <path class="cls-cog-svg-3" d="M47.53,19h-19.07c-.14,0-.25-.11-.25-.25s.11-.25.25-.25h19.07c.14,0,.25.11.25.25s-.11.25-.25.25Z"/>
</svg>
`;
}