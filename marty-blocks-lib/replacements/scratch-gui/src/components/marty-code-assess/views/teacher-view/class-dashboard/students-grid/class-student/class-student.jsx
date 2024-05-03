import React from "react";
import styles from "./class-student.css";
import bindAll from 'lodash.bindall';
import { defineMessages, injectIntl } from "react-intl";
import Modal from "../../../../../../../containers/modal.jsx";
// import StudentDataModal from "../../../../student-data-modal/student-data-modal.jsx";
import AssessmentSpiderGraph from "../../../../../plots/assessment-spider-graph/assessment-spider-graph.jsx";
import educationIconGreen from "../../../../../../../lib/assets/icon--education-green.svg";
import educationIconRed from "../../../../../../../lib/assets/icon--education-red.svg";

const Preprocessor = window.codeAssess.codeAssessLib.Preprocessor;

const messages = defineMessages({
    tutorials: {
        defaultMessage: "adf",
        description: "sf",
        id: "gui.martyCodeAssess.teacherView.classStudents.classStudent",
    }
});


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
            "modalToggle",
        ]);
        this.heartBeatInterval = null;
    }

    componentDidMount() {

    }

    componentWillUnmount() {
    }

    handleSessionStatusChange = ({ status, classId }) => {
        this.forceUpdate();
    }

    modalToggle() {
        this.setState({ studentDataModalVisible: !this.state.studentDataModalVisible });
        this.props.setIsAnyStudentDataModalVisible(!this.state.studentDataModalVisible);
    }

    render() {
        const { intl, student, selectedClassroom } = this.props;
        const isThereAnActiveSession = !!selectedClassroom.activeSession;

        const preprocessor = new Preprocessor({});
        const transformedData = preprocessor
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
        if (transformedData) {
            const colour = isThereAnActiveSession ? STUDENT_ACTIVITY_STATUS_TO_COLOUR_MAP[this.state.studentActivityStatus] : "#6d6d6d";
            studentJsx = <AssessmentSpiderGraph
                data={transformedData}
                plotTitle={student.firstName + " " + student.lastName}
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
                        {/* <StudentDataModal
                            onClose={this.modalToggle}
                            studentData={this.state.fetchedStudentData}
                            student={student}
                            classId={this.props.classId}
                        /> */}
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


export default injectIntl(ClassStudent);