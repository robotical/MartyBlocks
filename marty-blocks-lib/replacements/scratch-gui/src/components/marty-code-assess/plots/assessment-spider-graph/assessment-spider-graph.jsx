import React from "react";
import PropTypes from 'prop-types';
import styles from "./assessment-spider-graph.css";
import bindAll from 'lodash.bindall';
import { intlShape, injectIntl } from "react-intl";
import Plotly from "plotly.js"
import Spinner from '../../../spinner/spinner.jsx';
import spinnerStyles from '../../../spinner/spinner.css';

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
        const isStudentPreview = this.props.isStudentPreview;
        // if there is a colour given, change the colour of the trace
        if (this.props.colour) {
            dataAsArray.forEach(trace => {
                if (!trace) return;
                if (!trace.line) {
                    trace.line = {};
                }
                trace.line.color = this.props.colour;
            });
        }
        // Use Plotly.react to update the plot data and layout
        Plotly.react(this.plotRef, dataAsArray, {
            ...currentLayout,
            margin: {
                ...currentLayout.margin,
                l: isStudentPreview ? 50 : 80,
                r: isStudentPreview ? 50 : 80,
                b: isStudentPreview ? 50 : 80,
                t: isStudentPreview ? 50 : 80,
            },
            title: this.props.plotTitle,
            titlefont: {
                color: this.props.colour || "black"
            },
            xaxis: {
                ...currentLayout.xaxis,
            },
            yaxis: {
                ...currentLayout.yaxis,
            },
            polar: {
                radialaxis: {
                    ...currentLayout.polar?.radialaxis,
                    visible: !isStudentPreview,
                    range: [0, 1],
                },
                angularaxis: {
                    ...currentLayout.polar?.angularaxis,
                    visible: true,
                    // showticklabels: !isStudentPreview,
                    ticks: isStudentPreview ? "inside" : "outside",
                    tickcolor: this.props.colour || "black",
                    tickfont: {
                        size: isStudentPreview ? 8 : 12,
                        color: this.props.colour || "black",
                    },
                },
                showLegend: false
            },
        });
    }

    render() {
        const isStudentPreview = this.props.isStudentPreview;
        let hasData = !!this.props.data;
        if (Array.isArray(this.props.data)) {
            hasData = this.props.data.length > 0;
        }
        return (
            <>
            {!hasData && <Spinner level='warn' large className={spinnerStyles.primary} />}
                <div ref={this.setPlotRef} className={styles.assessmentSpiderGraph} style={{
                    width: isStudentPreview ? "200px" : "100%",
                    height: isStudentPreview ? "200px" : "100%",
                    display: !hasData ? "none" : "block",
                }} />
            </>
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
    isStudentPreview: PropTypes.bool, // when true, the plot is rendered smaller and without labels (studen preview is used in the class view with all students in the class)
    colour: PropTypes.string, // the colour of the plot. usefull for displaying the student's status in the class view (red for not logged in, green for logged in, orange for logged in but inactive)
};

export default injectIntl(AssessmentSpiderGraph);
