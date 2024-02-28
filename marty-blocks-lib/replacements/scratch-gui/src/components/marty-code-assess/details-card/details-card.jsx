import React from "react";
import PropTypes from "prop-types";
import styles from "./details-card.css";

class DetailsCard extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {

    let lisJSX = <><li className={styles.contentListItem}>
      <b>Algorithms</b> are essential programming instructions designed to solve specific problems. You can step-up your algorithm game by <b>using different conditional statements, operators, and synchronisation and messaging methods</b>.
    </li>
      <li className={styles.contentListItem}>
        <b>Analysis</b> measures your understanding of both the problem and the solution. You can improve your analysis skills by <b>using helpful names for variables and functions, and by using comments and debugging tools</b>.
      </li>
      <li className={styles.contentListItem}>
        <b>Decomposition</b> involves segmenting a problem into more manageable sub-problems. You can enhance your decomposition skills by <b>breaking down your project into smaller parts, using events that facilitate code parallelism and sequencing</b>.
      </li>
      <li className={styles.contentListItem}>
        <b>Generalisation & Abstraction:</b> generalisation refers to formulating broad solutions applicatble to various scenarios, while abstraction focuses on distilling complex concepts to their essential elements. You can improve your generalisation and abstraction skills by <b>using variables, and functions</b>.
      </li>
      <li className={styles.contentListItem}>
        <b>Pattern Recogniction & Data Representation:</b> pattern recognition entials identifying similarities and differences between different data sets, while data representation involves presenting data in a meaningful way. You can enhance your pattern recognition and data representation skills by <b>using diverse data types, use of loops and variable operations</b>.
      </li></>;

    if (this.props.scoresOrBadges === "badges") {
      lisJSX = <>
        <li className={styles.contentListItem}>
          <b>Conditionals</b> use of conditional statements and operators.
        </li>
        <li className={styles.contentListItem}>
          <b>Loops</b> use of all kinds of loops.
        </li>
        <li className={styles.contentListItem}>
          <b>Functions</b> use of functions with and without parameters.
        </li>
        <li className={styles.contentListItem}>
          <b>Operators</b> use of all kinds of operators.
        </li>
        <li className={styles.contentListItem}>
          <b>Data Types</b> use of all kinds of data types.
        </li>
        <li className={styles.contentListItem}>
          <b>Parallel Code</b> use of parallel code blocks and events.
        </li>
        <li className={styles.contentListItem}>
          <b>Variables & Lists</b> use of variables and lists, as well as their operations.
        </li>
      </>;
    }
    return (
      <div className={styles.outerContainer}>
        <div className={styles.titleRow}>
          Tips & Tricks
        </div>
        <div className={styles.contentRow}>
          <ul className={styles.contentList}>
            {lisJSX}
          </ul>
        </div>
      </div>
    );
  }
}

DetailsCard.propTypes = {
  totalScore: PropTypes.number,
  scoresOrBadges: PropTypes.string.isRequired,
};

export default DetailsCard;