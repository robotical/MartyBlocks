import React from "react";
import styles from "./class-average-spider.css";
import bindAll from 'lodash.bindall';
import { injectIntl } from "react-intl";
import Plotly from "plotly.js"
import Spinner from '../../../../spinner/spinner.jsx';
import spinnerStyles from '../../../../spinner/spinner.css';

const labelsAbbrMap = {
    "Algorithms": "Alg",
    "Generalisation and Abstraction": "GA",
    "Analysis": "Ana",
    "Decomposition": "Dec",
    "Pattern Recognition and Data Representation": "PR",
};

class ClassAverageSpider extends React.Component {
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
        const isMinimised = this.props.isMinimised;

        const config = {
            displayModeBar: false,
            displaylogo: false,
            responsive: false,
            showLink: false,
            showlegend: false,
            // staticPlot: true,
        };

        // convert the data from 0-1 to 0-100
        dataAsArray.forEach(trace => {
            if (!trace) return;
            if (trace.type === "scatterpolar") {
                trace.r = trace.r.map(val => Math.round(val * 100));
            }
        });

        // if this is a studentPreview, hide the labels
        // if (isMinimised) {
        //     dataAsArray.forEach(trace => {
        //         if (!trace) return;
        //         if (trace.type === "scatterpolar") {
        //             trace.text = [...trace.theta];
        //             trace.theta = trace.theta.map(label => {
        //                 return labelsAbbrMap[label] || label;
        //             });
        //         }
        //     });
        // }

        // Use Plotly.react to update the plot data and layout
        Plotly.react(this.plotRef, dataAsArray, {
            ...currentLayout,
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            margin: {
                ...currentLayout.margin,
                l: isMinimised ? 0 : 80,
                r: isMinimised ? 0 : 80,
                b: isMinimised ? 0 : 80,
                t: isMinimised ? 0 : 80,
            },
            // title: this.props.plotTitle,
            titlefont: {
                color: this.props.colour || "black"
            },
            xaxis: {
                ...currentLayout.xaxis,
            },
            yaxis: {
                ...currentLayout.yaxis,
            },
            showlegend: false,
            polar: {
                bgcolor: 'rgba(0,0,0,0)',
                radialaxis: {
                    ...currentLayout.polar?.radialaxis,
                    // visible: !isMinimised,
                    // showticklabels: !isMinimised,
                    range: [0, 100],
                },
                angularaxis: {
                    ...currentLayout.polar?.angularaxis,
                    // visible: !isMinimised,
                    showticklabels: !isMinimised,
                    ticks: isMinimised ? "" : "outside",
                    tickfont: {
                        size: isMinimised ? 0 : 12,
                        color: "black",
                    },
                    // linecolor: this.props.colour || "black",
                    // linewidth: 5,
                    // gridcolor: "#35abc7",
                },
            },
        }, config);
    }

    render() {
        const isMinimised = this.props.isMinimised;
        let hasData = !!this.props.data;
        if (Array.isArray(this.props.data)) {
            hasData = this.props.data.length > 0;
        }
        return (
            <>
                {!hasData && <Spinner level='warn' large className={spinnerStyles.primary} />}
                <div className={styles.plotContainer}>
                    <h3 className={styles.plotTitle}>{this.props.plotTitle}</h3>
                    <div ref={this.setPlotRef} className={styles.ClassAverageSpider} style={{
                        width: isMinimised ? "250px" : "100%",
                        height: isMinimised ? "250px" : "100%",
                        display: !hasData ? "none" : "block",
                    }} />
                </div>
            </>
        );
    }

}

export default injectIntl(ClassAverageSpider);
