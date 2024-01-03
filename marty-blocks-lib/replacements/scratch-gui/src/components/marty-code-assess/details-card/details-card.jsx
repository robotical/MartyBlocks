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
    let firstParagraphJSX;
    if (this.props.totalScore <= 10) {
      firstParagraphJSX = (
        <p className={styles.paragraphTitle}>
          Guess what level your project is at...
        </p>
      );
      detailsParagraphJSX = (
        <div className={styles.detailsParagraphContainer}>
          <p className={styles.paragraphIntense}>BEGINNER BUDDY!</p>
          <p className={styles.paragraph}>
            You've just started an awesome journey. You're doing great, keep exploring!
          </p>
        </div>
      );
    } else if (this.props.totalScore > 10 && this.props.totalScore < 24) {
      firstParagraphJSX = (
        <p className={styles.paragraphTitle}>
          Ready to find out your project level?
        </p>
      );
      detailsParagraphJSX = (
        <div className={styles.detailsParagraphContainer}>
          <p className={styles.paragraphIntense}>SUPER EXPLORER!</p>
          <p className={styles.paragraph}>Fantastic job, you're really getting the hang of this. Keep up the fun work!</p>
        </div>
      );
    } else if (this.props.totalScore >= 24) {
      firstParagraphJSX = (
        <p className={styles.paragraphTitle}>
          Let's see how far you've come in your project...
        </p>
      );
      detailsParagraphJSX = (
        <div className={styles.detailsParagraphContainer}>
          <p className={styles.paragraphIntense}>MASTER INVENTOR!</p>
          <p className={styles.paragraph}>Wow, you're soaring high! Keep shining bright at the top!</p>
        </div>
      );
    }

    return (
      <div className={styles.outerContainer}>
        <div className={styles.titleRow}>
          <div className={styles.martyImgContainer}>
            <img className={styles.martyImg} src={martyImg} alt="marty-img" />
          </div>
          {/* <p>Score: {this.props.totalScore} / 29</p> */}
          {firstParagraphJSX}
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