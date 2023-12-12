import React from "react";

import styles from "./styles.css";
import sensorsDashboardIcon from "./icon--sensors-dashboard.svg";

const SensorsDashboardBtn = () => {
  const clickHandler = () => {
    mv2Interface.toggleSensorsDashboard();
  };


  return (
    <div className={styles.iconContainer}>
      <img
        className={styles.icon}
        src={sensorsDashboardIcon}
        alt="Sensors Dashboard BTN"
        onClick={clickHandler}
      />
    </div>
  );
};

export default SensorsDashboardBtn;
