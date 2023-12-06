import React from "react";
import styles from "./progress-bar.css";

const ProgressBar = (props) => {
  const { completed } = props;
  const backgroundColours = ["white", "red", "orange", "green"];
  const completedNum = completed || 0;

  return (
    <div className={styles.container}>
      <div className={styles.filler} style={{width: completedNum/3*100+"%", backgroundColor: backgroundColours[completedNum]}}>
        <span className={styles.label}>{completedNum}/3</span>
      </div>
    </div>
  );
};

export default ProgressBar;