import React from 'react';
import bindAll from 'lodash.bindall';
import PropTypes from 'prop-types';
import styles from './predictions.css';


class MartyMachineModelPredictions extends React.Component {

    constructor(props) {
        super(props);
        bindAll(this, [
        ]);
        this.state = {
            predictions: [],
            isLoading: true,
        };

    }

    componentDidMount() {
        this.props.model.setPredictionCallback = (predictions) => {
            const predictionIdx = predictions.predictionIdx;
            if (predictionIdx >= 0) {
                const actualPredictions = predictions.output;
                this.setState({ predictions: actualPredictions, isLoading: false });
            }
        };
    }

    componentWillUnmount() {
        this.props.model.setPredictionCallback = undefined;
    }

    render() {

        return <div className={styles.predictions}>
            <div className={styles.predictionsTitle}>Predictions</div>
            {this.state.isLoading && <div className={styles.predictionsLoading}>Loading...</div>}
            <div className={styles.predictionsContainer}>
                {this.state.predictions.map((prediction, predictionIndex) => {
                    return <div key={predictionIndex} className={styles.predictionsRow}>
                        <div className={styles.predictionsLabel}>{prediction.label}</div>
                        <div className={styles.predictionsValue}
                            style={{
                                '--dynamic-width': `calc(${prediction.confidence} * 100%)`,
                                '--dynamic-content': `"${Math.round(prediction.confidence * 100)}%"`
                            }}
                        >.</div>
                    </div>
                })}
            </div>
        </div>
    }
}

MartyMachineModelPredictions.propTypes = {
    model: PropTypes.object,
};

export default MartyMachineModelPredictions;