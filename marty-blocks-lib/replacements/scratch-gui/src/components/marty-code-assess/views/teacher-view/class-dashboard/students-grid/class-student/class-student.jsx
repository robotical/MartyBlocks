import React from "react";
import styles from "./class-student.css";
import bindAll from 'lodash.bindall';
import { defineMessages, intlShape, injectIntl } from "react-intl";
import PropTypes from 'prop-types';
import Modal from "../../../../../../containers/modal.jsx";
import StudentDataModal from "../../../../student-data-modal/student-data-modal.jsx";
import AssessmentSpiderGraph from "../../../../plots/assessment-spider-graph/assessment-spider-graph.jsx";
import educationIconGreen from "../../../../../../lib/assets/icon--education-green.svg";
import educationIconRed from "../../../../../../lib/assets/icon--education-red.svg";

const messages = defineMessages({
    tutorials: {
        defaultMessage: "adf",
        description: "sf",
        id: "gui.martyCodeAssess.teacherView.classStudents.classStudent",
    }
});

const HEART_BEAT_CHECK_INTERVAL = 5000;

const SESSION_STATUS_SUBSCRIPTION_ID = "class-dashboard-class-student-session-status";

const STUDENT_ACTIVITY_STATUS_TO_COLOUR_MAP = {
    "offline": "#FF0000",
    "active": "#00FF00",
    "inactive": "#ffa200"
};

class ClassStudent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            studentActivityStatus: "offline",// offline, active, inactive
            fetchedStudentData: null,
            studentDataModalVisible: false
        };
        bindAll(this, [
            "fetchStudentData",
            "modalToggle",
        ]);
        this.heartBeatInterval = null;
    }

    componentDidMount() {

        codeAssess.subscribe(
            SESSION_STATUS_SUBSCRIPTION_ID,
            codeAssess.TypesOfPublishedEvents.SESSION_STATUS_CHANGED,
            this.handleSessionStatusChange
        );

        // comment this out for development so we don't make too many requests to the db
        this.heartBeatInterval = setInterval(() => {
            if (this.props.isAnyStudentDataModalVisible) return; // we only want to fetch data if the modal is not open -- the only real-time data is in the students section
            this.fetchStudentData();
        }, HEART_BEAT_CHECK_INTERVAL);
        this.fetchStudentData();
    }

    componentWillUnmount() {
        codeAssess.unsubscribe(SESSION_STATUS_SUBSCRIPTION_ID);

        if (this.heartBeatInterval) {
            console.log("CLEARING INTERVAL");
            clearInterval(this.heartBeatInterval);
            this.heartBeatInterval = null;
        }
    }

    handleSessionStatusChange = ({ status, classId }) => {
        this.forceUpdate();
    }

    async fetchStudentData() {
        const fetchedStudentData = await this.props.student.fetchStudentData(this.props.classId);
        if (fetchedStudentData) {
            const studentActivityStatus = this.props.student.getActivityStatus(fetchedStudentData);
            this.setState({ studentActivityStatus, fetchedStudentData });
        }
    }

    modalToggle() {
        this.setState({ studentDataModalVisible: !this.state.studentDataModalVisible });
        this.props.setIsAnyStudentDataModalVisible(!this.state.studentDataModalVisible);
    }

    render() {
        const { intl } = this.props;
        const student = this.props.student;

        const preprocessor = new codeAssess.Preprocessor(this.state.fetchedStudentData?.scoresOverTime || {});
        const transformedData =
            preprocessor
                .sortData()
                .calculateAverageGivenTimeWindow(10, 5, "minutes")
                .normaliseScores()
                .exportToSpiderGraphData([
                    "Algorithms Composite Score",
                    "Generalisation and Abstraction Composite Score",
                    "Analysis Composite Score",
                    "Decomposition Composite Score",
                    "Pattern Recognition and Data Representation Composite Score",

                    // "Comments",
                    // "Conditionals",
                    // "Data Types",
                    // "Debugging",
                    // "Function Reuse",
                    // "Functions",
                    // "Functions with Arguments",
                    // "Loops",
                    // "Naming",
                    // "Operators",
                    // "Parallelism",
                    // "Sequencing",
                    // "Synchronization and Messages",
                    // "Variables Instead of Literals",
                    // "Variables and Data Structures"
                ]);

        let studentJsx = null;
        // if the student has data then show the spider chart
        // if the student doesn't have data
        // if the student is active then show the green education icon
        // if the student is not active then show the red education icon
        if (transformedData) {
            const colour = this.props.class.sessionStatus === "started" ? STUDENT_ACTIVITY_STATUS_TO_COLOUR_MAP[this.state.studentActivityStatus] : "#6d6d6d";
            studentJsx = <AssessmentSpiderGraph
                data={transformedData}
                plotTitle={student.name}
                isStudentPreview={true}
                colour={colour}
            />;
        } else {
            studentJsx = <img className={styles.classStudentImg} src={this.state.studentActivityStatus === "active" ? educationIconGreen : educationIconRed} />;
        }

        return (
            <>
                {this.state.studentDataModalVisible &&
                    <Modal
                        onRequestClose={this.modalToggle}
                        fullScreen
                        id="studentDataModal"
                        contentLabel={`${student.name} Progress`}
                    >
                        <StudentDataModal
                            onClose={this.modalToggle}
                            studentData={this.state.fetchedStudentData}
                            student={student}
                            classId={this.props.classId}
                        />
                    </Modal>
                }
                <div className={styles.classStudent} onClick={this.modalToggle}>
                    <div className={styles.classStudentPltContainer}>
                        {studentJsx}
                    </div>
                </div>
            </>
        );
    }

}

ClassStudent.propTypes = {
    student: PropTypes.object.isRequired,
    classId: PropTypes.string.isRequired,
    class: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    isAnyStudentDataModalVisible: PropTypes.bool.isRequired,
    setIsAnyStudentDataModalVisible: PropTypes.func.isRequired
};

export default injectIntl(ClassStudent);