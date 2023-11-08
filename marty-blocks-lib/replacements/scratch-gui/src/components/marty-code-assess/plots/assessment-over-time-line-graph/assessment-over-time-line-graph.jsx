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
        const dataTraces = codeAssess.dataTransformationUtils.studentAssessmentScoresOverTimeToLineGraphData(this.props.data);
        const currentLayout = this.plotRef.layout || {};

        // Use Plotly.react to update the plot data and layout
        Plotly.react(this.plotRef, dataTraces, {
            ...currentLayout,
            title: 'Student Assessment Scores Over Time',
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
        console.log("re-rendering AssessmentOverTimeLineGraph")
        return (
            <div ref={this.setPlotRef} className={styles.assessmentOverTimeLineGraph} />
        );
    }

}

AssessmentOverTimeLineGraph.propTypes = {
    intl: intlShape.isRequired,
    data: PropTypes.object.isRequired,
};

export default injectIntl(AssessmentOverTimeLineGraph);
