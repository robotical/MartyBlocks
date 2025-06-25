import React from "react";

import styles from "./styles.css";
import sensorsDashboardIcon from "./icon--sensors-dashboard.svg";
import { FormattedMessage } from 'react-intl';

const SensorsDashboardBtn = () => {
  const clickHandler = () => {
    mv2Interface.toggleSensorsDashboard();
  };


  return (
    <div className={styles.button} onClick={clickHandler}>
      <img
        className={styles.icon}
        src={sensorsDashboardIcon}
        alt="Sensors Dashboard BTN"
      />
      <div className={styles.buttonTitle}>
        <FormattedMessage
          defaultMessage="Sensors Dashboard"
          description="Sensors Dashboard"
          id="gui.menuBar.sensorsDashboard"
        >
          {(nodes) => {
            return <span>{nodes}</span>;
          }}
        </FormattedMessage>
      </div>
    </div>
  );
};

export default SensorsDashboardBtn;
