import React from "react";
import styles from "./class-student.css";
import bindAll from 'lodash.bindall';
import { defineMessages, injectIntl } from "react-intl";
import AssessmentSpiderGraph from "../../../../../plots/assessment-spider-graph/assessment-spider-graph.jsx";

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
            studentActivityStatus: StudentStatusEnum.OFFLINE,
            fetchedStudentData: null,
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
        const studentSessionData = student.studentSessionData.filter(sessionData => sessionData.sessionId === selectedClassroom.activeSession?.id)[0] || {};
        let sessionsArr = [{}];
        if (selectedClassroom.activeSession) {
            sessionsArr = [{ // this is how the Processor expects the data input
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
            ]);

        let studentJsx = null;
        if (transformedData) {
            const colour = isThereAnActiveSession ? STUDENT_ACTIVITY_STATUS_TO_COLOUR_MAP[studentActivityStatus] : "#6d6d6d";
            studentJsx = <AssessmentSpiderGraph
                data={transformedData}
                plotTitle={student.firstName + " " + student.lastName}
                isStudentPreview={true}
                colour={colour}
            />;
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