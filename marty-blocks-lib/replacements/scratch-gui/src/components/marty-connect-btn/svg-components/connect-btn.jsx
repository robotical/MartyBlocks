import React from "react";
import styles from "./styles.css";
import ConnectBtnIcon from "./icon--connect-btn.svg";

class ConnectBtnSVG extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className={styles.martyConnectBtnContainer}>
        <div className={styles.iconContainer}>
          <img src={ConnectBtnIcon} className={styles.icon} />
        </div>
      </div>
    );
  }
}

export default ConnectBtnSVG;
