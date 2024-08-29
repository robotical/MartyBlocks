import React from "react";
import styles from "./cog-battery-level.css";


const roundBatteryPerc = (battLevel) => {
  let roundedBattery = battLevel;
  if (battLevel <= 90 && battLevel >= 71) roundedBattery = 80;
  if (battLevel <= 70 && battLevel >= 51) roundedBattery = 60;
  if (battLevel <= 50 && battLevel >= 31) roundedBattery = 40;
  if (battLevel <= 30 && battLevel >= 11) roundedBattery = 20;
  return roundedBattery;
};

class CogBatteryLevel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { batteryPercent: 99 };
    this.onBatteryPerecentChange = this.onBatteryPerecentChange.bind(this);
    // eslint-disable-next-line no-undef
    mv2Interface.addEventListener(
      "onBattRemainCapacityPercentChange",
      this.onBatteryPerecentChange
    );
  }

  componentWillUnmount() {
    // eslint-disable-next-line no-undef
    mv2Interface.removeEventListener(
      "onBattRemainCapacityPercentChange",
      this.onBatteryPerecentChange
    );
  }

  onBatteryPerecentChange(event) {
    this.setState({ batteryPercent: event.battRemainCapacityPercent });
  }

  getBorderColor(batteryPercent) {
    if (batteryPercent >= 70) {
      return "black";
    }
    if (batteryPercent >= 30) {
      return "black";
    }
    return "rgb(255,69,0)";
  }

  getFillColor(batteryPercent) {
    const roundedBatt = roundBatteryPerc(batteryPercent);
    let colour = "rgb(3, 125, 60)"; // green
    if (roundedBatt <= 10) {
      colour = "rgb(91, 20, 19)"; // red
    } else if (roundedBatt > 10 && roundedBatt <= 30) {
      colour = "rgb(250, 217, 5)"; // yellow
    }
    return colour;
  }

  render() {
    const { batteryPercent } = this.state;
    const borderColor = "black"; //this.getBorderColor(batteryPercent);
    const fillColor = this.getFillColor(batteryPercent);
    const flash = false; // batteryPercent < 20 ? styles.batteryFlash : '';
    return (
      <div className={styles.container}>
        <div className={`${flash} ${styles.batteryContainer}`}>
          <div
            className={styles.batteryCap}
            style={{ backgroundColor: borderColor }}
          />
          <div
            className={styles.batteryCylinder}
            style={{ borderColor: borderColor }}
          >
            <div
              style={{
                backgroundColor: fillColor,
                width: "100%",
                height: `${Math.round(batteryPercent)}%`,
              }}
            />
          </div>
        </div>
        <p className={styles.batteryPercent}>{Math.round(batteryPercent)}%</p>
      </div>
    );
  }
}

export default CogBatteryLevel;
