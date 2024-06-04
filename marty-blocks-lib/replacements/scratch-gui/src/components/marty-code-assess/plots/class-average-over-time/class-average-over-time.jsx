import React from "react";
import styles from "./class-average-over-time.css";
import bindAll from 'lodash.bindall';
import { injectIntl } from "react-intl";
import Plotly from "plotly.js"
import PlusIcon from "../../icon--plus.svg";
import Modal from "../../../../containers/modal.jsx";
import ClassAverageOverTimeExpanded from "./class-average-over-time-expanded/class-average-over-time-expanded.jsx";
import MoreInfoButton from "../../../more-info-button-v2/more-info-button.jsx";
import { disableMouseEventsRecursive } from "../class-average-spider/class-average-spider.jsx";

const DataTransformations = window.codeAssess.codeAssessLib.DataTransformations;

class ClassAverageOverTime extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        };
        bindAll(this, [
            "setPlotRef",
            "onCloseModal",
            "expandModal"
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
            title: this.props.plotTitle || "",
            xaxis: {
                ...currentLayout.xaxis,
                // title: 'Session',
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

        // disable mouse events on the plot
        disableMouseEventsRecursive(this.plotRef);
    }

    onCloseModal() {
        this.setState({ modalVisible: false });
    }

    expandModal(e) {
        e.stopPropagation();
        this.setState({ modalVisible: true });
    }


    render() {
        const { modalContentLabel } = this.props;

        let expandedPlots = [];
        if (this.state.modalVisible) {
            const linegraphData = DataTransformations.convertSessionsToLineGraphData(this.props.rawSessionData, this.props.isSpecificSession, true);
            for (let i = 0; i < linegraphData.length; i += 4) {
                expandedPlots.push(
                    <ClassAverageOverTimeExpanded
                        key={i}
                        data={linegraphData.slice(i, i + 4)}
                        plotTitle={linegraphData[i].name}
                    />
                );
            }
        }


        if (areAllTracesZero(this.props.data)) {
            // return <div className={styles.noData}>No data yet!</div>;
        }

        console.log("class average over time data", this.props.data)

        return (
            <div className={styles.outerContainer}>
                {this.state.modalVisible &&
                    <Modal
                        onRequestClose={this.onCloseModal}
                        fullScreen={false}
                        className={styles.modal}
                        id="classAverageOverTimeModal"
                        contentLabel={modalContentLabel || "Class Progress over time"}
                    >
                        <div className={styles.modalContent}>
                            {expandedPlots}
                        </div>
                    </Modal>
                }
                <h3 style={{ margin: "2px" }}>Progress Over Time<MoreInfoButton modalTitle="Progress Over Time">
                    This graph shows the average score over time. The y-axis represents the average score.
                    If 'All Sessions' is selected, the x-axis represents the sessions. If a specific session is selected, the x-axis represents the time intervals in that session.
                </MoreInfoButton></h3>
                {areAllTracesZero(this.props.data) && <div className={styles.notEnoughData}>Not enough data yet!<MoreInfoButton modalTitle="Not enough data">
                    It looks like there isn’t enough data to display the graph properly. The graph needs more than one session.
                </MoreInfoButton></div>}
                <div className={styles.container}>
                    <div ref={this.setPlotRef} className={styles.plotDiv} style={{
                        width: "100%",
                        height: "100%",
                    }} />
                    <div className={styles.showAllButtonContainer} onClick={this.expandModal}>
                        <img src={PlusIcon} className={styles.showAllButtonIcon} alt="show all" />
                    </div>
                </div>
            </div>
        );
    }

}

export default injectIntl(ClassAverageOverTime);

const areAllTracesZero = (data) => {
    if (!data) return true;
    if (!Array.isArray(data)) return true;
    if (data.length === 0) return true;
    let allZero = true;
    data.forEach(trace => {
        if (trace && trace.type === "scatter" && trace.legendgroup === "Composite" && trace.y && trace.y.length > 0) {
            const allYZero = trace.y.every(val => val === 0);
            if (!allYZero) {
                allZero = false;
            }
        }
    });
    return allZero;
}