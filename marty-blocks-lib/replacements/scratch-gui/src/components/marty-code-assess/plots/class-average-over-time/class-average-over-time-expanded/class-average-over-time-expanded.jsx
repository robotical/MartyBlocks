import React from "react";
import styles from "./class-average-over-time-expanded.css";
import bindAll from 'lodash.bindall';
import { injectIntl } from "react-intl";
import Plotly from "plotly.js"

class ClassAverageOverTime extends React.Component {
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

    componentWillUnmount() { }

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

        // decrease bins size of the barchart traces
        dataAsArray.forEach(trace => {
            if (!trace) return;
            if (!trace.type) return;
            if (trace.type !== "bar") return;
            trace.width = 0.3;
        });

        const config = {
            displayModeBar: false,
            displaylogo: false,
            responsive: false,
            showLink: false,
            // staticPlot: true,
        };

        Plotly.react(this.plotRef, dataAsArray, {
            ...currentLayout,
            margin: {
                ...currentLayout.margin,
                l: 40,
                r: 20,
                b: 40,
                t: 20,
                pad: 1
            },
            xaxis: {
                ...currentLayout.xaxis,
                showgrid: false,
                tickfont: {
                    size: 10
                }
            },
            yaxis: {
                ...currentLayout.yaxis,
                title: "Score",
                autorange: true,
                type: 'linear',
                showgrid: false,
                tickfont: {
                    size: 10
                }
            },
            showlegend: false,
        }, config);
    }

    render() {
        const { intl, plotTitle } = this.props;
        return (
            <>
                <h3 style={{
                    margin: 0,
                    marginTop: "10px",
                    fontSize: "14px"
                }}>{plotTitle.replace("Composite Score", "")}</h3>
                <div className={styles.outerContainer}>
                    <div ref={this.setPlotRef} className={styles.plotDiv} style={{
                        width: "100%",
                        height: "200px",
                    }} />
                </div>
            </>
        );
    }

}

export default injectIntl(ClassAverageOverTime);