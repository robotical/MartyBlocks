import React from "react";
import styles from "./student-data-modal.css";
import bindAll from 'lodash.bindall';
import { defineMessages, intlShape, injectIntl } from "react-intl";
import PropTypes from 'prop-types';
import AssessmentOverTimeLineGraph from "../plots/assessment-over-time-line-graph/assessment-over-time-line-graph.jsx";
import AssessmentSpiderGraph from "../plots/assessment-spider-graph/assessment-spider-graph.jsx";

const messages = defineMessages({
    tutorials: {
        defaultMessage: "adf",
        description: "sf",
        id: "gui.martyCodeAssess.StudentDataModal.",
    }
});

class StudentDataModal extends React.Component {
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
        console.log("re-rendering StudentDataModal")
        const { intl } = this.props;
        const student = this.props.student;
        const studentData = this.props.studentData;
        if (!studentData || !studentData.scoresOverTime) {
            return <div>No student data yet!</div>;
        }
        console.log("studentData.scoresOverTime.length", Object.keys(studentData.scoresOverTime).length)
        const lineGraphDataTraces = codeAssess.dataTransformationUtils.transformDataForStackedAreaChart(studentData.scoresOverTime);
        const abstractionDataTrace = lineGraphDataTraces.find(trace => trace.name === "Abstraction");
        const dataRepresentationDataTrace = lineGraphDataTraces.find(trace => trace.name === "DataRepresentation");
        const flowControlDataTrace = lineGraphDataTraces.find(trace => trace.name === "FlowControl");
        const interactivityDataTrace = lineGraphDataTraces.find(trace => trace.name === "Interactivity");
        const logicDataTrace = lineGraphDataTraces.find(trace => trace.name === "Logic");
        const parallelismDataTrace = lineGraphDataTraces.find(trace => trace.name === "Parallelism");
        const synchronisation = lineGraphDataTraces.find(trace => trace.name === "Synchronisation");

        const spiderChartData = codeAssess.dataTransformationUtils.transformDataForSpiderChart(studentData.scoresOverTime);

        return (
            <div className={styles.studentDataModal}>
                <div className={styles.studentDataModalContent}>
                    {/* <AssessmentOverTimeLineGraph data={dataTraces} plotTitle="Abstraction"/> */}
                    <AssessmentSpiderGraph data={spiderChartData} plotTitle="Spider"/>
                    <AssessmentOverTimeLineGraph data={abstractionDataTrace} plotTitle="Abstraction" />
                    <AssessmentOverTimeLineGraph data={dataRepresentationDataTrace} plotTitle="Data Representation" />
                    <AssessmentOverTimeLineGraph data={flowControlDataTrace} plotTitle="Flow Control" />
                    <AssessmentOverTimeLineGraph data={interactivityDataTrace} plotTitle="Interactivity" />
                    <AssessmentOverTimeLineGraph data={logicDataTrace} plotTitle="Logic" />
                    <AssessmentOverTimeLineGraph data={parallelismDataTrace} plotTitle="Parallelism" />
                    <AssessmentOverTimeLineGraph data={synchronisation} plotTitle="Synchronisation" />
                </div>
            </div>
        );
    }
}



StudentDataModal.propTypes = {
    intl: intlShape.isRequired,
    studentData: PropTypes.object,
    onClose: PropTypes.func.isRequired,
    student: PropTypes.object.isRequired,
};


export default injectIntl(StudentDataModal);