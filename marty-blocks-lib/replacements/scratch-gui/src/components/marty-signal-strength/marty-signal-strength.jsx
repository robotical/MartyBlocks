import React from "react";
import styles from "./marty-signal-strength.css";

class MartySignalStrength extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rssi: -200 };
    this.onRSSIChange = this.onRSSIChange.bind(this);
    // eslint-disable-next-line no-undef
    mv2Interface.addEventListener("onRSSIChange", this.onRSSIChange);
  }

  componentWillUnmount() {
    // eslint-disable-next-line no-undef
    mv2Interface.removeEventListener("onRSSIChange", this.onRSSIChange);
  }

  onRSSIChange(event) {
    this.setState({ rssi: event.rssi });
  }

  render() {
    const { rssi } = this.state;
    const flash = rssi == 0 ? styles.signalFlash : "";
    return (
      <div className={`${flash} ${styles.signalStrengthContainer}`}>
        <div
          className={styles.signalBar}
          style={{
            backgroundColor:
              rssi <= -100
                ? "white"
                : rssi <= -60
                ? "rgb(250, 217, 5)"
                : "rgb(3, 125, 60)",
            height: "20%",
          }}
        />
        <div
          className={styles.signalBar}
          style={{
            backgroundColor: rssi <= -80 ? "white" : rssi <= -60
            ? "rgb(250, 217, 5)"
            : "rgb(3, 125, 60)",
            height: "40%",
          }}
        />
        <div
          className={styles.signalBar}
          style={{
            backgroundColor: rssi <= -70 ? "white" : rssi <= -60
            ? "rgb(250, 217, 5)"
            : "rgb(3, 125, 60)",
            height: "60%",
          }}
        />
        <div
          className={styles.signalBar}
          style={{
            backgroundColor: rssi <= -60 ? "white" : "rgb(3, 125, 60)",
            height: "80%",
          }}
        />
        <div
          className={styles.signalBar}
          style={{
            backgroundColor: rssi <= -50 ? "white" : "rgb(3, 125, 60)",
            height: "100%",
          }}
        />
      </div>
    );
  }
}

export default MartySignalStrength;
