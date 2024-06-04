import React from "react";
import styles from "./class-average-spider-enlarged.css";
import bindAll from 'lodash.bindall';
import { injectIntl } from "react-intl";
import Plotly from "plotly.js"
import Spinner from '../../../../spinner/spinner.jsx';
import spinnerStyles from '../../../../spinner/spinner.css';

const traceColorMap = {
    "Algorithms": "#9c27b0",
    "Generalisation and Abstraction": "#ff9800",
    "Analysis": "#4caf50",
    "Decomposition": "#f44336",
    "Pattern Recognition and Data Representation": "#2196f3",
};

class ClassAverageSpiderEnlarged extends React.Component {
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

        const config = {
            displayModeBar: false,
            displaylogo: false,
            responsive: false,
            showLink: false,
            showlegend: false,
            // staticPlot: true,
        };

        // change the color of the traces
        dataAsArray.forEach((trace, i) => {
            if (!trace) return;
            trace.marker = {
                color: traceColorMap[trace.name],
            };
        });

        // convert the data from 0-1 to 0-100
        dataAsArray.forEach(trace => {
            if (!trace) return;
            if (trace.type === "scatterpolar") {
                trace.r = trace.r.map(val => Math.round(val * 100));
            }
        });

        // Use Plotly.react to update the plot data and layout
        Plotly.react(this.plotRef, dataAsArray, {
            ...currentLayout,
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            margin: {
                ...currentLayout.margin,
                l: 80,
                r: 80,
                b: 80,
                t: 80,
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
                    // visible: true,
                    // showticklabels: true,
                    range: [0, 115],
                    tickvals: [0, 20, 40, 60, 80, 100],
                },
                angularaxis: {
                    ...currentLayout.polar?.angularaxis,
                    // visible: true,
                    showticklabels: true,
                    ticks: "outside",
                    tickfont: {
                        size: 12,
                        color: "black",
                    },
                    // linecolor: this.props.colour || "black",
                    // linewidth: 5,
                    // gridcolor: "#35abc7",
                },
            },
        }, config);

        // disable mouse events on the plot
        disableMouseEventsRecursive(this.plotRef);
    }

    render() {
        let hasData = !!this.props.data;
        console.log("data", this.props.data)
        if (Array.isArray(this.props.data)) {
            hasData = this.props.data.length > 0;
        }

        return (
            <>
                {!hasData && <Spinner level='warn' large className={spinnerStyles.primary} />}
                <div className={styles.plotContainer}>
                    <div className={styles.legend}>
                        <ul className={styles.legendList}>
                            <li className={[styles.legendItem, styles.legendAlg].join(" ")}>Algorithms</li>
                            <li className={[styles.legendItem, styles.legendGen].join(" ")}>Generalisation and Abstraction</li>
                            <li className={[styles.legendItem, styles.legendAna].join(" ")}>Analysis</li>
                            <li className={[styles.legendItem, styles.legendDec].join(" ")}>Decomposition</li>
                            <li className={[styles.legendItem, styles.legendPat].join(" ")}>Pattern Recognition and Data Representation</li>
                        </ul>
                    </div>
                    {this.props.plotTitle && <h3 className={styles.plotTitle}>{this.props.plotTitle}</h3>}
                    <div ref={this.setPlotRef} className={styles.ClassAverageSpiderEnlarged} style={{
                        width: "100%",
                        height: "100%",
                        display: !hasData ? "none" : "block",
                    }} />
                </div>
            </>
        );
    }

}

export default injectIntl(ClassAverageSpiderEnlarged);

const disableMouseEventsRecursive = (element) => {
    if (!element) return;
    // element.style.pointerEvents = "none";
    element.onmousedown = (e) => { };
    element.onmouseup = (e) => { };
    element.style.cursor = "pointer";
    if (element.children && element.children.length) {
        for (let i = 0; i < element.children.length; i++) {
            disableMouseEventsRecursive(element.children[i]);
        }
    }
}
