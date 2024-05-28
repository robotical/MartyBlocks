import React from "react";
import PropTypes from 'prop-types';
import styles from "./spider-graph.css";
import bindAll from 'lodash.bindall';
import { intlShape, injectIntl } from "react-intl";
import Plotly from "plotly.js"
import Spinner from '../../../spinner/spinner.jsx';
import spinnerStyles from '../../../spinner/spinner.css';

const labelsAbbrMap = {
    "Algorithms": "Alg",
    "Generalisation and Abstraction": "GA",
    "Analysis": "Ana",
    "Decomposition": "Dec",
    "Pattern Recognition and Data Representation": "PR",
    "Algorithms Composite Score": "Alg",
    "Generalisation and Abstraction Composite Score": "GA",
    "Analysis Composite Score": "Ana",
    "Decomposition Composite Score": "Dec",
    "Pattern Recognition and Data Representation Composite Score": "PR",
};

const colorsToLabelsMap = {
    // averageCompositeScore: "Average",
    "Algorithms": "algorithmsCompoScore",
    "Analysis": "analysisCompoScore",
    "Decomposition": "decompositionCompoScore",
    "Generalisation and Abstraction": "generalisationAndAbstrCompoScore",
    "Pattern Recognition and Data Representation": "patternRecAndDataRepCompoScore"
};

const sizesMap = {
    small: {
        margin: {
            l: 20,
            r: 20,
            b: 20,
            t: 0,
        },
        angularaxis: {
            ticks: "",
            tickfont: {
                size: 6,
            },
        },
        radialaxis: {
            visible: false,
        },
        plot: {
            width: "110px",
            height: "110px",
            title: {
                fontSize: "10px"
            }
        }
    },
    medium: {
        margin: {
            l: 30,
            r: 30,
            b: 30,
            t: 0,
        },
        angularaxis: {
            ticks: "",
            tickfont: {
                size: 8,
            },
        },
        radialaxis: {
            visible: false,
        },
        plot: {
            width: "160px",
            height: "160px",
            title: {
                fontSize: "14px"
            }
        }
    },
    large: {
        margin: {
            l: 80,
            r: 80,
            b: 80,
            t: 80,
        },
        angularaxis: {
            ticks: "outside",
            tickfont: {
                size: 12,
            },
        },
        radialaxis: {
            visible: true,
        },
        plot: {
            width: "100%",
            height: "100%",
            title: {
                fontSize: "16px"
            }
        }
    }
}

class SpiderGraph extends React.Component {
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
        const size = this.props.size;

        // if there is a colors given, change the colors of the trace
        if (this.props.colors) {
            dataAsArray.forEach(trace => {
                if (!trace) return;
                if (!trace.line) {
                    trace.line = {};
                }
                if (this.props.colors[colorsToLabelsMap[trace.name]]) {
                    trace.line.color = this.props.colors[colorsToLabelsMap[trace.name]];
                }
            });
        }

        const config = {
            staticPlot: false, // ensure this is false or not set
            displayModeBar: false, // hide the modebar
            scrollZoom: false, // prevent zooming
            doubleClick: false, // prevent zoom reset on double click
            dragMode: false, // prevent panning or any drag interaction
            editable: false, // prevent editing
            showLink: false, // remove the link to edit on plotly
            displaylogo: false, // remove the plotly logo,
            responsive: false, // prevent resizing
        };

        // convert the data from 0-1 to 0-100
        dataAsArray.forEach(trace => {
            if (!trace) return;
            if (trace.type === "scatterpolar") {
                trace.r = trace.r.map(val => Math.round(val * 100));
            }
        });

        // if this is a small or medium size, abbreviate the labels
        if (size === "small" || size === "medium") {
            dataAsArray.forEach(trace => {
                if (!trace) return;
                if (trace.type === "scatterpolar") {
                    trace.text = [...trace.theta.map(label => label.replace("Composite Score", ""))];
                    trace.theta = trace.theta.map(label => {
                        return labelsAbbrMap[label] || label;
                    });
                }
            });
        }

        // Use Plotly.react to update the plot data and layout
        Plotly.react(this.plotRef, dataAsArray, {
            ...currentLayout,
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            margin: {
                ...currentLayout.margin,
                ...sizesMap[size].margin,
            },
            // title: this.props.plotTitle,
            titlefont: {
                color: this.props.colors["averageCompositeScore"] || "black"
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
                    visible: sizesMap[size].radialaxis.visible,
                    range: [0, 100],
                },
                angularaxis: {
                    ...currentLayout.polar?.angularaxis,
                    visible: true,
                    ticks: sizesMap[size].angularaxis.ticks,
                    tickfont: {
                        size: sizesMap[size].angularaxis.tickfont.size,
                        color: "black",
                    },
                    linecolor: this.props.colors["averageCompositeScore"] || "black",
                    linewidth: 5,
                    gridcolor: "#35abc7",
                },
            },
        }, config);
    }

    render() {
        let hasData = !!this.props.data;
        if (Array.isArray(this.props.data)) {
            hasData = this.props.data.length > 0;
        }
        return (
            <>
                {!hasData && <Spinner level='warn' large className={spinnerStyles.primary} />}
                <div className={styles.plotContainer} onClick={(e) => e.stopPropagation()}>
                    <h3 className={styles.plotTitle}
                        style={{
                            fontSize: sizesMap[this.props.size].plot.title.fontSize,
                        }}
                    >{this.props.plotTitle}</h3>
                    <div ref={this.setPlotRef} className={styles.SpiderGraph} style={{
                        width: sizesMap[this.props.size].plot.width,
                        height: sizesMap[this.props.size].plot.height,
                        display: !hasData ? "none" : "block",
                    }} />
                </div>
            </>
        );
    }
}

SpiderGraph.propTypes = {
    intl: intlShape.isRequired,
    data: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.object),
        PropTypes.object,
    ]).isRequired,
    plotTitle: PropTypes.string.isRequired,
    colors: PropTypes.object.isRequired,
};

export default injectIntl(SpiderGraph);