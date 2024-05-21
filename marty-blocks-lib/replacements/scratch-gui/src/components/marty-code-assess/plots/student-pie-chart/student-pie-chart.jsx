import React from "react";
import PropTypes from 'prop-types';
import styles from "./student-pie-chart.css";
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
    "Pattern Recognition and Data Representation": "patternRecAndDataRepCompoScore",

    "algorithmsCompoScore": "Algorithms",
    "analysisCompoScore": "Analysis",
    "decompositionCompoScore": "Decomposition",
    "generalisationAndAbstrCompoScore": "Generalisation and Abstraction",
    "patternRecAndDataRepCompoScore": "Pattern Recognition and Data Representation",
};

const sizesMap = {
    small: {
        margin: {
            l: 20,
            r: 20,
            b: 20,
            t: 0,
        },
        plot: {
            width: "110px",
            height: "110px",
            title: {
                fontSize: "10px"
            },
            textfont: {
                size: 10
            },
            hoverlabel: {
                font: {
                    size: 8
                },
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
        plot: {
            width: "160px",
            height: "160px",
            title: {
                fontSize: "14px"
            },
            textfont: {
                size: 14
            },
            hoverlabel: {
                font: {
                    size: 10
                },
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
        plot: {
            width: "100%",
            height: "100%",
            title: {
                fontSize: "16px"
            },
            textfont: {
                size: 16
            },
            hoverlabel: {
                font: {
                    size: 14
                },
            }
        }
    }
}

class StudentPieChart extends React.Component {
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
        if (prevProps.colors !== this.props.colors) {
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

        const dataAsArray = [
            {
                type: "pie",
                marker: {
                    colors: Object.values(this.props.colors),
                },
                values: [1, 1, 1, 1, 1],
                labels: Object.keys(this.props.colors).map(color => colorsToLabelsMap[color]).filter(label => !!label),
                text: Object.keys(this.props.colors).map(color => colorsToLabelsMap[color]).filter(label => !!label),
                textinfo: "label",
                hoverinfo: "text",
                textfont: {
                    size: sizesMap[this.props.size].plot.textfont.size,
                },
                hoverlabel: {
                    font: {
                        size: sizesMap[this.props.size].plot.hoverlabel.font.size,
                    },
                },
            }
        ]
        const size = this.props.size;

        const config = {
            displayModeBar: false,
            displaylogo: false,
            responsive: false,
            showLink: false,
            // showlegend: false,
            // staticPlot: true,
        };

        // if this is a small or medium size, abbreviate the labels
        if (size === "small" || size === "medium") {
            dataAsArray.forEach(trace => {
                if (!trace) return;
                if (trace.labels) {
                    trace.labels = trace.labels.map(label => labelsAbbrMap[label]);
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
        }, config);
    }

    render() {
        const hasData = !!this.props.colors;

        return (
            <>
                {!hasData && <Spinner level='warn' large className={spinnerStyles.primary} />}
                <div className={styles.plotContainer}>
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

StudentPieChart.propTypes = {
    intl: intlShape.isRequired,
    plotTitle: PropTypes.string.isRequired,
    colors: PropTypes.object.isRequired,
};

export default injectIntl(StudentPieChart);