import React from "react";
import styles from "./live-stream-tab.css";
import bindAll from 'lodash.bindall';
import { defineMessages, intlShape, injectIntl } from "react-intl";
import educationIconGreen from "../../../../lib/assets/icon--education-green.svg";
import educationIconRed from "../../../../lib/assets/icon--education-red.svg";
import PropTypes from 'prop-types';
import Modal from "../../../../containers/modal.jsx";
import StudentDataModal from "../../student-data-modal/student-data-modal.jsx";
import AssessmentOverTimeLineGraph from "../../plots/assessment-over-time-line-graph/assessment-over-time-line-graph.jsx";

const messages = defineMessages({
    tutorials: {
        defaultMessage: "adf",
        description: "sf",
        id: "gui.martyCodeAssess.teacherView.LiveStreamTab.",
    }
});

const HEART_BEAT_CHECK_INTERVAL = 5000;
let heartBeatInterval = null;

class LiveStreamTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fetchedStudentData: null,
        };
        bindAll(this, [
            "fetchStudentData",
        ]);
    }

    componentDidMount() {
        // comment this out for development so we don't make too many requests to the db
        // heartBeatInterval = setInterval(this.fetchStudentData.bind(this), HEART_BEAT_CHECK_INTERVAL);
        this.fetchStudentData();
    }

    componentWillUnmount() {
        if (heartBeatInterval) clearInterval(heartBeatInterval);
    }

     async fetchStudentData() {
        const fetchedStudentData = await this.props.selectedClass.getStudentDataForAllStudents();
        this.setState({ fetchedStudentData });
    }

    render() {
        const { intl } = this.props;
        // this.state.fetchedStudentData can either be an array of student data or a single student data object
        let rawData = this.state.fetchedStudentData;
        if (Array.isArray(rawData)) {
            rawData = rawData.map(studentData => studentData.scoresOverTime);
        } else {
            rawData = rawData?.scoresOverTime;
        }

        if (!rawData) {
            return <div>No student data yet!</div>;
        }

        const dataTraces = codeAssess.dataTransformationUtils.studentAssessmentScoresOverTimeToLineGraphData(rawData);
        const abstractionDataTrace = dataTraces.find(trace => trace.name === "Abstraction");
        // const dataRepresentationDataTrace = dataTraces.find(trace => trace.name === "DataRepresentation");
        // const flowControlDataTrace = dataTraces.find(trace => trace.name === "FlowControl");
        // const interactivityDataTrace = dataTraces.find(trace => trace.name === "Interactivity");
        // const logicDataTrace = dataTraces.find(trace => trace.name === "Logic");
        // const parallelismDataTrace = dataTraces.find(trace => trace.name === "Parallelism");
        // const synchronisation = dataTraces.find(trace => trace.name === "Synchronisation");
        console.log("in live abstractionDataTrace", abstractionDataTrace)
        return (
            <div className={styles.liveStreamPlotsContainer}>
                {abstractionDataTrace && <AssessmentOverTimeLineGraph data={abstractionDataTrace} plotTitle="Abstraction" />}
                {/* <AssessmentOverTimeLineGraph data={dataRepresentationDataTrace} plotTitle="Data Representation" />
                <AssessmentOverTimeLineGraph data={flowControlDataTrace} plotTitle="Flow Control" />
                <AssessmentOverTimeLineGraph data={interactivityDataTrace} plotTitle="Interactivity" />
                <AssessmentOverTimeLineGraph data={logicDataTrace} plotTitle="Logic" />
                <AssessmentOverTimeLineGraph data={parallelismDataTrace} plotTitle="Parallelism" />
                <AssessmentOverTimeLineGraph data={synchronisation} plotTitle="Synchronisation" /> */}
            </div>
        );
    }

}

LiveStreamTab.propTypes = {
    selectedClass: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
};

export default injectIntl(LiveStreamTab);