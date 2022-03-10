import React from "react";
import bindAll from "lodash.bindall";
import styles from './marty-connect-btn.css';

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
      <div>
        <button onClick={this.clickBtnHandler} className={styles.btn}>
          {this.state.isConnected ? "Disconnect" : "Connect to Marty!"}
        </button>
      </div>
    );
  }
}

export default ConnectBtn;
