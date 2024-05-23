import React from "react";
import styles from "./student-overview.css";
import bindAll from 'lodash.bindall';
import { defineMessages, injectIntl } from "react-intl";
import { activateDeck } from "../../../../../../reducers/cards.js";
import { connect } from "react-redux";
import Spinner from '../../../../../spinner/spinner.jsx';
import spinnerStyles from '../../../../../spinner/spinner.css';
import ClassAverageSpider from "../../../../plots/class-average-spider/class-average-spider.jsx";
import ClassAverageOverTime from "../../../../plots/class-average-over-time/class-average-over-time.jsx";
import StudentBadges from "../../../../student-badges/student-badges.jsx";
import CodeSubmissionBox from "./code-submissions-box/code-submission-box.jsx";

const codeAssessClientFacade = window.codeAssess.codeAssessLib.default.getInstance();
const DataTransformations = window.codeAssess.codeAssessLib.DataTransformations;

const messages = defineMessages({
    tutorials: {
        defaultMessage: "adf",
        description: "sf",
        id: "gui.martyCodeAssess.teacherView.classOverview.",
    }
});

class ClassOverview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            codeSubmissions: []
        };
        bindAll(this, [
        ]);
    }

    componentDidMount() {
        const { isSpecificSession, selectedStudentId } = this.props;
        // fetch code submissions of selected student
        const asyncFunc = async () => {
            const updatedClassroom = await codeAssessClientFacade.fetchStudentCodeSubmissions(selectedStudentId);
            const selectedStudent = updatedClassroom.students.find(s => s.id === selectedStudentId);
            if (!selectedStudent) return;
            this.setState({ codeSubmissions: selectedStudent.studentCodeSubmissions })
        }

        asyncFunc();
    }

    componentWillUnmount() { }

    componentDidUpdate(prevProps, prevState) { }


    render() {
        const { intl, studentSessionsArr, isSpecificSession, selectedStudentId, selectedStudentName, selectedClassroom } = this.props;

        if (!selectedStudentId) {
            return null;
        }

        const allStudentSessionDataEmpty = areAllStudentSessionDataEmpty(studentSessionsArr);

        return (
            <div className={styles.overviewContainer}>
                <h3 className={styles.studentName}>{selectedStudentName}</h3>
                {this.state.isLoading ? <Spinner level='warn' large className={[spinnerStyles.primary, styles.spinner].join(" ")} /> : (
                    <>
                        <div className={styles.spiderGraphContainer}>
                            {!allStudentSessionDataEmpty && <ClassAverageSpider
                                data={DataTransformations.convertSessionsToSpiderGraphData(studentSessionsArr, true)}
                                rawSessionData={studentSessionsArr}
                                isMinimised={true}
                                modalContentLabel={`Competency levels for ${selectedStudentName}`}
                            />}
                        </div>
                        <div className={styles.supportChampionsContainer}>
                            <StudentBadges
                                classId={selectedClassroom.id}
                                studentId={selectedStudentId}
                                studentName={selectedStudentName}
                            />
                        </div>
                        <div className={styles.separator}></div>
                        <div className={styles.progressOverTimeContainer}>
                            {!allStudentSessionDataEmpty && <ClassAverageOverTime
                                data={DataTransformations.convertSessionsToLineGraphData(studentSessionsArr, isSpecificSession)}
                                rawSessionData={studentSessionsArr}
                                isSpecificSession={isSpecificSession}
                                modalContentLabel={`Progress over time for ${selectedStudentName}`}
                            />}
                        </div>
                        <div className={styles.notesContainer}>
                            <CodeSubmissionBox
                                title="Code Submissions"
                                items={this.state.codeSubmissions}
                                studentName={selectedStudentName}
                            />
                        </div>
                    </>
                )}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    showTutorialCard: (tutorialTitle) => {
        const hasThisTutorialBeenShown = localStorage.getItem("mb-tutorials-" + tutorialTitle);
        if (!hasThisTutorialBeenShown) {
            localStorage.setItem("mb-tutorials-" + tutorialTitle, true);
            dispatch(activateDeck(tutorialTitle));
        }
    }
});

export default injectIntl(connect(null, mapDispatchToProps)(ClassOverview));

const areAllStudentSessionDataEmpty = (sessions) => {
    if (!sessions) return true;
    if (!Array.isArray(sessions)) return true;
    if (sessions.length === 0) return true;
    let allEmpty = true;
    sessions.forEach(session => {
        if (session.studentSessionData && session.studentSessionData.length > 0) {
            allEmpty = false;
        }
    });
    return allEmpty;
}