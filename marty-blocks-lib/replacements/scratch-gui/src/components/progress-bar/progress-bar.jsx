import React from "react";
import styles from "./progress-bar.css";

const ProgressBar = (props) => {
  const { completed } = props;
  const backgroundColours = ["white", "red", "orange", "green"];

  return (
    <div className={styles.container}>
      <div className={styles.filler} style={{width: completed/3*100+"%", backgroundColor: backgroundColours[completed]}}>
        <span className={styles.label}>{completed}/3</span>
      </div>
    </div>
  );
};

export default ProgressBar;