import React from "react";

import styles from "./styles.css";
import sensorsDashboardIcon from "./icon--sensors-dashboard.svg";

const SensorsDashboardBtn = () => {
  const clickHandler = () => {
    mv2Interface.toggleSensorsDashboard();
  };

  if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
    return null;
  }

  return (
    <img
      className={styles.icon}
      src={sensorsDashboardIcon}
      alt="Sensors Dashboard BTN"
      onClick={clickHandler}
    />
  );
};

export default SensorsDashboardBtn;
