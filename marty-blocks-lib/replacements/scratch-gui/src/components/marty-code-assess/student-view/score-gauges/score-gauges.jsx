import React from "react";
import styles from "./score-gauges.css";
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import ScoreGauge from "../score-gauge/score-gauge.jsx";

class ScoreGauges extends React.Component {
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
                {this.props.scores && Object.keys(this.props.scores).map((key) => {
                    return <ScoreGauge key={key} title={key} score={this.props.scores[key]} />;
                })}
            </div>
        );
    }
}

ScoreGauges.propTypes = {
    scores: PropTypes.object.isRequired,
};

export default ScoreGauges;
