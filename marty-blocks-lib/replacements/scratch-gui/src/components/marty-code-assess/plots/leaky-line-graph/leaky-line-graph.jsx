import React from "react";
import PropTypes from 'prop-types';
import styles from "./leaky-line-graph.css";
import bindAll from 'lodash.bindall';
import { intlShape, injectIntl } from "react-intl";
import Plotly from "plotly.js"

class LeakyLineGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        bindAll(this, [
            "setPlotRef",
        ]);
        this.plotRef = null;
    }

    componentDidMount() {
        // Initial plot rendering
        this.renderPlot();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.renderPlot();
        }
    }

    componentWillUnmount() {}

    setPlotRef(plotRef) {
        this.plotRef = plotRef;
    }

    
    renderPlot() {
        if (!this.plotRef) return;
        const currentLayout = this.plotRef.layout || {};

        let dataAsArray = this.props.data;
        if (!Array.isArray(dataAsArray)) {
            dataAsArray = [dataAsArray];
        }

        // changing scores from 0 - 1 to 0 - 100
        dataAsArray.forEach(trace => {
            if (!trace) return;
            if (!trace.y) return;
            trace.y = trace.y.map(score => Math.round(score * 100));
        });

        // Use Plotly.react to update the plot data and layout
        Plotly.react(this.plotRef, dataAsArray, {
            ...currentLayout,
            title: this.props.plotTitle,
            xaxis: {
                ...currentLayout.xaxis, // Maintain current xaxis settings
                // type: 'date',
                // title: 'Session',
                // rangeselector: {
                //     buttons: [
                //         {
                //             count: 10,
                //             label: '10m',
                //             step: 'minute',
                //             stepmode: 'backward'
                //         },
                //         {
                //             count: 20,
                //             label: '20m',
                //             step: 'minute',
                //             stepmode: 'backward'
                //         },
                //         {
                //             count: 30,
                //             label: '30m',
                //             step: 'minute',
                //             stepmode: 'backward'
                //         },
                //         { step: 'all' }
                //     ]
                // },
                rangeslider: {},
            },
            yaxis: {
                ...currentLayout.yaxis, // Maintain current yaxis settings
                title: "Score",
                autorange: true,
                type: 'linear'
            }
        });
    }

    render() {
        return (
            <div ref={this.setPlotRef} className={styles.LeakyLineGraph} />
        );
    }

}

LeakyLineGraph.propTypes = {
    intl: intlShape.isRequired,
    data: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.object),
        PropTypes.object,
    ]).isRequired,
    plotTitle: PropTypes.string.isRequired,
};

export default injectIntl(LeakyLineGraph);
