import React from "react";
import PropTypes from 'prop-types';
import styles from "./assessment-over-time-line-graph.css";
import bindAll from 'lodash.bindall';
import { defineMessages, intlShape, injectIntl } from "react-intl";
import Plot from 'react-plotly.js';
import Plotly from "plotly.js"

class AssessmentOverTimeLineGraph extends React.Component {
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

    componentWillUnmount() {
    }

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

        // Use Plotly.react to update the plot data and layout
        Plotly.react(this.plotRef, dataAsArray, {
            ...currentLayout,
            title: this.props.plotTitle,
            xaxis: {
                ...currentLayout.xaxis, // Maintain current xaxis settings
                type: 'date',
                title: 'Date',
                rangeselector: {
                    buttons: [
                        {
                            count: 10,
                            label: '10m',
                            step: 'minute',
                            stepmode: 'backward'
                        },
                        {
                            count: 20,
                            label: '20m',
                            step: 'minute',
                            stepmode: 'backward'
                        },
                        {
                            count: 30,
                            label: '30m',
                            step: 'minute',
                            stepmode: 'backward'
                        },
                        { step: 'all' }
                    ]
                },
                rangeslider: {},
                type: 'date'
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
            <div ref={this.setPlotRef} className={styles.assessmentOverTimeLineGraph} />
        );
    }

}

AssessmentOverTimeLineGraph.propTypes = {
    intl: intlShape.isRequired,
    data: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.object),
        PropTypes.object,
    ]).isRequired,
    plotTitle: PropTypes.string.isRequired,
};

export default injectIntl(AssessmentOverTimeLineGraph);
