import React from "react";
import PropTypes from "prop-types";
import styles from "./details-card.css";
import martyImg from "../static/marty.png";

class DetailsCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let detailsParagraphJSX;
    if (this.props.totalScore <= 10) {
      detailsParagraphJSX = (
        <div className={styles.detailsParagraphContainer}>
          <p className={styles.paragraphTitle}>
            The level of your project is....
          </p>
          <p className={styles.paragraphIntense}>BASIC!</p>
          <p className={styles.paragraph}>
            You're at the beginning of a great adventure . . . Keep it up!
          </p>
        </div>
      );
    } else if (this.props.totalScore > 10 && this.props.totalScore < 20) {
      detailsParagraphJSX = (
        <div className={styles.detailsParagraphContainer}>
          <p className={styles.paragraphTitle}>
            The level of your project is....
          </p>
          <p className={styles.paragraphIntense}>INTERMEDIATE!</p>
          <p className={styles.paragraph}>Excellent work . . . Keep it up!</p>
        </div>
      );
    } else if (this.props.totalScore >= 20) {
      detailsParagraphJSX = (
        <div className={styles.detailsParagraphContainer}>
          <p className={styles.paragraphTitle}>
            The level of your project is....
          </p>
          <p className={styles.paragraphIntense}>ADVANCED!</p>
          <p className={styles.paragraph}>You are at the top!</p>
        </div>
      );
    }

    return (
      <div className={styles.outerContainer}>
        <div className={styles.titleRow}>
          <div className={styles.martyImgContainer}>
            <img className={styles.martyImg} src={martyImg} alt="marty-img" />
          </div>
          <p>Score: {this.props.totalScore} / 21</p>
        </div>
        <div className={styles.contentRow}>{detailsParagraphJSX}</div>
      </div>
    );
  }
}

DetailsCard.propTypes = {
  totalScore: PropTypes.number,
};

export default DetailsCard;