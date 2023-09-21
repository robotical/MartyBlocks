import React from 'react';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';

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
        this.props.model.setStatusCallback = (status) => {
            this.setState({ data: status });
        };
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
        return this.state.data ? <div id={this.props.id} ref={this.setChartRef}></div> : <div>Loss Plot loading...</div>;
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
