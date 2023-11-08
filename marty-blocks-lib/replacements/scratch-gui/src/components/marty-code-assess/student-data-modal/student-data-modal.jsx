import React from "react";
import styles from "./student-data-modal.css";
import bindAll from 'lodash.bindall';
import { defineMessages, intlShape, injectIntl } from "react-intl";
import PropTypes from 'prop-types';
import AssessmentOverTimeLineGraph from "../plots/assessment-over-time-line-graph/assessment-over-time-line-graph.jsx";

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

        return (
            <div className={styles.studentDataModal}>
                <div className={styles.studentDataModalContent}>
                    <AssessmentOverTimeLineGraph data={studentData.scoresOverTime}/>
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