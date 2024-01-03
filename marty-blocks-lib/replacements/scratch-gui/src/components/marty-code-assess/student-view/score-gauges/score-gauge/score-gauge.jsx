import React from "react";
import styles from "./score-gauge.css";
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';

class ScoreGauge extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        bindAll(this, [
        ]);
    }

    componentDidMount() {
    }

    render() {

        return (
            <div className={styles.outerContainer}>
                <div className={styles.gauge}>
                    <div className={styles.topArc}></div>
                    <div className={styles.backgroundSquare}></div>
                    <div className={styles.innerArc}></div>
                    <div className={styles.bottomArc}></div>
                    <div className={styles.leftSlash}></div>
                    <div className={styles.rightSlash}></div>
                    <div className={styles.pointer} style={{
                        transform: `translateX(-50%) rotate(${rescaleScore(this.props.score)}deg)`,
                        height: "70px",
                        top: "19px"
                    }}></div>
                    <div className={styles.innerArcArrow}></div>
                </div>
                <div className={styles.title}>{this.props.title}</div>
            </div>
        );
    }
}

function rescaleScore(x) {
    // rescaling score to be between -40 and 40 (for the gauge pointer degree)
    if (x < 0 || x > 1) {
        throw new Error('Input must be between 0 and 1');
    }
    const lowerBound = -40;
    const upperBound = 40;
    return x * (upperBound - lowerBound) + lowerBound;
}

ScoreGauge.propTypes = {
    title: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
};

export default ScoreGauge;
