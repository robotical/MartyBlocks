import React from "react";
import styles from "./live-stream-tab.css";
import bindAll from 'lodash.bindall';
import { defineMessages, intlShape, injectIntl } from "react-intl";
import PropTypes from 'prop-types';
import AssessmentOverTimeLineGraph from "../../plots/assessment-over-time-line-graph/assessment-over-time-line-graph.jsx";

const messages = defineMessages({
    tutorials: {
        defaultMessage: "adf",
        description: "sf",
        id: "gui.martyCodeAssess.StudentDataModal.liveStreamTab",
    }
});

const LAST_MINUTES_TO_GET_DATA = 60;

class LiveStreamTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        bindAll(this, [
        ]);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        const { intl } = this.props;
        const studentData = this.props.studentData;
        // studentData can either be an array of student data or a single student data object
        let rawData = studentData;
        if (Array.isArray(rawData)) {
            rawData = rawData.map(studentData => studentData.scoresOverTime);
        } else {
            rawData = rawData?.scoresOverTime;
        }

        if (!rawData) {
            return <div>No student data yet!</div>;
        }


        const lineGraphDataTraces = codeAssess.dataTransformationUtils.transformDataForStackedAreaChartForTheLastMinutes(rawData, LAST_MINUTES_TO_GET_DATA);
        const abstractionDataTrace = lineGraphDataTraces.find(trace => trace.name === "Abstraction");
        const dataRepresentationDataTrace = lineGraphDataTraces.find(trace => trace.name === "DataRepresentation");
        const flowControlDataTrace = lineGraphDataTraces.find(trace => trace.name === "FlowControl");
        const interactivityDataTrace = lineGraphDataTraces.find(trace => trace.name === "Interactivity");
        const logicDataTrace = lineGraphDataTraces.find(trace => trace.name === "Logic");
        const parallelismDataTrace = lineGraphDataTraces.find(trace => trace.name === "Parallelism");
        const synchronisation = lineGraphDataTraces.find(trace => trace.name === "Synchronisation");

        return (
            <div className={styles.liveStreamContainer}>
                {abstractionDataTrace && <AssessmentOverTimeLineGraph data={abstractionDataTrace} plotTitle="Abstraction" />}
                {dataRepresentationDataTrace && <AssessmentOverTimeLineGraph data={dataRepresentationDataTrace} plotTitle="Data Representation" />}
                {flowControlDataTrace && <AssessmentOverTimeLineGraph data={flowControlDataTrace} plotTitle="Flow Control" />}
                {interactivityDataTrace && <AssessmentOverTimeLineGraph data={interactivityDataTrace} plotTitle="Interactivity" />}
                {logicDataTrace && <AssessmentOverTimeLineGraph data={logicDataTrace} plotTitle="Logic" />}
                {parallelismDataTrace && <AssessmentOverTimeLineGraph data={parallelismDataTrace} plotTitle="Parallelism" />}
                {synchronisation && <AssessmentOverTimeLineGraph data={synchronisation} plotTitle="Synchronisation" />}
            </div>
        );
    }
}



LiveStreamTab.propTypes = {
    intl: intlShape.isRequired,
    studentData: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.object),
        PropTypes.object,
    ]).isRequired,
};


export default injectIntl(LiveStreamTab);