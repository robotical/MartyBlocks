import React from 'react';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import Spinner from '../../spinner/spinner.jsx';
import spinnerStyles from '../../spinner/spinner.css';
import styles from "./TfVisChart.css";

class TfVisChart extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'setChartRef'
        ]);
        this.state = {
            data: null
        };
        this.chartRef = null;
    }

    setChartRef(ref) {
        this.chartRef = ref;
    }

    componentDidMount() {
        this.props.model.addStatusCallback("TfVisChart", (status) => {
            this.setState({ data: status });
        });
    }

    componentWillUnmount() {
        this.props.model.removeStatusCallback("TfVisChart");
    }

    componentDidUpdate() {
        if (this.chartRef !== null &&
            this.state.data &&
            this.state.data.lossValues.length > 0) {
            martyMachine.tfvis.render.linechart(
                this.chartRef,
                { values: this.state.data.lossValues, series: ['train'] },
                {
                    xLabel: this.props.xLabel,
                    yLabel: this.props.yLabel,
                    width: this.props.width,
                    height: this.props.height
                }
            );
        }
    }

    render() {
        return (
            this.state.data ?
                <div className={styles.container} id={this.props.id} ref={this.setChartRef}></div> :
                <div className={`${styles.container} ${styles.modern_sharp}`}>
                    <Spinner level='warn' large className={spinnerStyles.primary}/>
                    <div className={styles.loading_title}>Loading Loss Plot</div>
                    <div className={styles.loading_subtitle}>This might take a while, please wait...</div>
                </div>
        );
    }
}

TfVisChart.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    xLabel: PropTypes.string.isRequired,
    yLabel: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    model: PropTypes.object.isRequired,
};

export default TfVisChart;
