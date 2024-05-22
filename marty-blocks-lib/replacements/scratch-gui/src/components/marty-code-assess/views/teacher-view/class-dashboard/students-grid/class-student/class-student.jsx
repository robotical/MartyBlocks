import React from "react";
import styles from "./class-student.css";
import bindAll from 'lodash.bindall';
import { defineMessages, injectIntl } from "react-intl";
import SpiderGraph from "../../../../../plots/spider-graph/spider-graph.jsx";
import educationIconGreen from "../../../../../../../lib/assets/icon--education-green.svg";
import educationIconRed from "../../../../../../../lib/assets/icon--education-red.svg";

const Preprocessor = window.codeAssess.codeAssessLib.Preprocessor;
const StudentStatusEnum = window.codeAssess.codeAssessLib.StudentStatusEnum;

const messages = defineMessages({
    tutorials: {
        defaultMessage: "adf",
        description: "sf",
        id: "gui.martyCodeAssess.teacherView.classStudents.classStudent",
    }
});

const STUDENT_ACTIVITY_STATUS_TO_COLOUR_MAP = {
    [StudentStatusEnum.OFFLINE]: "#FF0000",
    [StudentStatusEnum.ACTIVE]: "#00FF00",
    [StudentStatusEnum.INACTIVE]: "#ffa200"
};

class ClassStudent extends React.Component {
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
        const { intl, student, selectedClassroom } = this.props;
        const isThereAnActiveSession = !!selectedClassroom.activeSession;
        const studentActivityStatus = student.activityStatus;
        const studentSessionData = student.studentSessionData.filter(sessionData => sessionData.sessionId === selectedClassroom.activeSession?.id) || [];
        let sessionsArr = [{}];
        if (selectedClassroom.activeSession) {
            sessionsArr = [{
                ...selectedClassroom.activeSession,
                studentSessionData: studentSessionData,
            }];
        }

        const preprocessor = new Preprocessor(sessionsArr);
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
            const colour = isThereAnActiveSession ? STUDENT_ACTIVITY_STATUS_TO_COLOUR_MAP[studentActivityStatus] : "#6d6d6d";
            studentJsx = <SpiderGraph
                data={transformedData}
                plotTitle={student.firstName + " " + student.lastName}
                size="medium"
                colors={{ "averageCompositeScore": colour }}
            />;
        } else {
            studentJsx = <img className={styles.classStudentImg} src={studentActivityStatus === StudentStatusEnum.ACTIVE ? educationIconGreen : educationIconRed} />;
        }

        return (
            <>
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