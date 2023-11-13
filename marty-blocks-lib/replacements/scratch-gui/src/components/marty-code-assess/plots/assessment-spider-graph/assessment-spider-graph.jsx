import React from "react";
import PropTypes from 'prop-types';
import styles from "./assessment-spider-graph.css";
import bindAll from 'lodash.bindall';
import { defineMessages, intlShape, injectIntl } from "react-intl";
import Plot from 'react-plotly.js';
import Plotly from "plotly.js"

class AssessmentSpiderGraph extends React.Component {
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
                ...currentLayout.xaxis,
            },
            yaxis: {
                ...currentLayout.yaxis,
            },
            polar: {
                radialaxis: {
                    ...currentLayout.polar?.radialaxis,
                    visible: true,
                    range: [0, 3],
                },
                angularaxis: {
                    ...currentLayout.polar?.angularaxis,
                    visible: true,
                },
                showLegend: false
            },
        });
    }

    render() {
        return (
            <div ref={this.setPlotRef} className={styles.assessmentSpiderGraph} />
        );
    }

}

AssessmentSpiderGraph.propTypes = {
    intl: intlShape.isRequired,
    data: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.object),
        PropTypes.object,
    ]).isRequired,
    plotTitle: PropTypes.string.isRequired,
};

export default injectIntl(AssessmentSpiderGraph);
