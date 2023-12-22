import React from "react";
import styles from "./class-student.css";
import bindAll from 'lodash.bindall';
import { defineMessages, intlShape, injectIntl } from "react-intl";
import PropTypes from 'prop-types';
import Modal from "../../../../../containers/modal.jsx";
import StudentDataModal from "../../../student-data-modal/student-data-modal.jsx";
import AssessmentSpiderGraph from "../../../plots/assessment-spider-graph/assessment-spider-graph.jsx";
import educationIconGreen from "../../../../../lib/assets/icon--education-green.svg";
import educationIconRed from "../../../../../lib/assets/icon--education-red.svg";

const messages = defineMessages({
    tutorials: {
        defaultMessage: "adf",
        description: "sf",
        id: "gui.martyCodeAssess.teacherView.classStudents.classStudent",
    }
});

const HEART_BEAT_CHECK_INTERVAL = 5000;
let heartBeatInterval = null;

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
            "onStudentClick"
        ]);
    }

    componentDidMount() {
        // comment this out for development so we don't make too many requests to the db
        heartBeatInterval = setInterval(this.fetchStudentData.bind(this), HEART_BEAT_CHECK_INTERVAL);
        this.fetchStudentData();
    }

    componentWillUnmount() {
        if (heartBeatInterval) clearInterval(heartBeatInterval);
    }

    async fetchStudentData() {
        const fetchedStudentData = await this.props.student.fetchStudentData(this.props.classId);
        if (fetchedStudentData) {
            const studentActivityStatus = this.props.student.getActivityStatus(fetchedStudentData);
            this.setState({ studentActivityStatus, fetchedStudentData });
        }
    }

    onStudentClick() {
        this.setState({ studentDataModalVisible: true });
    }
    render() {
        const { intl } = this.props;
        const student = this.props.student;
        console.log("re-rendering ClassStudent")

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
            studentJsx = <AssessmentSpiderGraph
                data={transformedData}
                plotTitle={student.name}
                isStudentPreview={true}
                colour={STUDENT_ACTIVITY_STATUS_TO_COLOUR_MAP[this.state.studentActivityStatus]}
            />;
        } else {
            studentJsx = <img className={styles.classStudentImg} src={this.state.studentActivityStatus === "active" ? educationIconGreen : educationIconRed} />;
        }

        return (
            <>
                {this.state.studentDataModalVisible &&
                    <Modal
                        onRequestClose={() => this.setState({ studentDataModalVisible: false })}
                        fullScreen
                        id="studentDataModal"
                        contentLabel={`${student.name} Progress`}
                    >
                        <StudentDataModal
                            onClose={() => this.setState({ studentDataModalVisible: false })}
                            studentData={this.state.fetchedStudentData}
                            student={student}
                        />
                    </Modal>
                }
                <div className={styles.classStudent} onClick={this.onStudentClick}>
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
    intl: intlShape.isRequired,
};

export default injectIntl(ClassStudent);