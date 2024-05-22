import React from 'react';
import styles from "./class-students.css";
import bindAll from 'lodash.bindall';
import StudentsGrid from './students-grid/students-grid.jsx';
import StudentsColorCoding from './students-color-coding/students-color-coding.jsx';
import TimelineSessions from '../class-overview/timeline-sessions/timeline-sessions.jsx';
import Spinner from '../../../../spinner/spinner.jsx';
import spinnerStyles from '../../../../spinner/spinner.css';
import StudentOverview from './student-overview/student-overview.jsx';

const codeAssessClientFacade = window.codeAssess.codeAssessLib.default.getInstance();
const DataTransformations = window.codeAssess.codeAssessLib.DataTransformations;

export default class ClassStudents extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sortedStudents: this.props.selectedClassroom?.students || [],
            selectedSession: this.props.selectedSession || null,
            sessionsArr: this.props.sessionsArr || [],
            studentSessionsArr: [],
            isLoading: false,
            currentContent: "grid", // "grid" || "studentProfile"
            selectedStudentId: null,
            selectedStudentName: null
        }

        bindAll(this, [
            "handleSessionSelect",
            "reselectSession",
            "onStudentClick",
        ]);
    }


    componentDidMount() {
        if (!this.props.selectedSession) {
            this.handleSessionSelect({ title: "All__Time" });
        }
    }

    componentWillUnmount() { }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.selectedClassroom !== this.props.selectedClassroom) {
            this.reselectSession();
        }
    }

    reselectSession() {
        /**
         * After updating the notes/announcements, we need to reselect the session because the state.session doesn't have the updated
         * data of the props.classrooms.sessions. We call this function when componentDidUpdate and the classroom has been updated
         */
        if (this.state.selectedSession && this.state.selectedSession.id && this.props.selectedClassroom) {
            const selectedSession = this.props.selectedClassroom.sessions.find(s => s.id === this.state.selectedSession.id);
            this.setState({ selectedSession, sessionsArr: [selectedSession] });
        }
    }

    async handleSessionSelect(session) {
        this.setState({ isLoading: true });
        if (session.title === "All__Time") {
            const updatedClassroom = await codeAssessClientFacade.fetchAllSessionData();
            // merge all sessions data
            const allSessions = updatedClassroom.sessions;
            const allNotes = allSessions.map(s => s.notes).flat();
            const allAnnouncements = allSessions.map(s => s.announcements).flat();
            const allQuestions = allSessions.map(s => s.questions).flat();
            const allStudents = allSessions.map(s => s.students).flat();
            const allStudentSessionData = allSessions.map(s => s.studentSessionData).flat();
            const allSession = {
                id: "All__Time",
                title: "All__Time",
                createdAt: "All__Time",
                notes: allNotes,
                announcements: allAnnouncements,
                questions: allQuestions,
                students: allStudents,
                studentSessionData: allStudentSessionData
            };
            if (this.state.selectedStudentId) {
                const groupedDataByStudent = DataTransformations.groupSessionsByStudents(allSessions);
                const studentData = groupedDataByStudent[this.state.selectedStudentId];
                this.setState({ studentSessionsArr: studentData || [], sessionsArr: allSessions, selectedSession: allSession, isLoading: false });
            } else {
                this.setState({ sessionsArr: allSessions, selectedSession: allSession, isLoading: false });
            }
        } else { // specific session
            const updatedClassroom = await codeAssessClientFacade.fetchSessionData(session.id);
            const fetchedSession = updatedClassroom.sessions.find(s => s.id === session.id);
            if (this.state.selectedStudentId) {
                const groupedDataByStudent = DataTransformations.groupSessionsByStudents([fetchedSession]);
                const studentData = groupedDataByStudent[this.state.selectedStudentId];
                this.setState({ studentSessionsArr: studentData || [], sessionsArr: [fetchedSession], selectedSession: fetchedSession, isLoading: false });
            } else {
                this.setState({ sessionsArr: [fetchedSession], selectedSession: fetchedSession, isLoading: false });
            }
        }
    }

    onStudentClick(studentId) {
        const groupedDataByStudent = DataTransformations.groupSessionsByStudents(this.state.sessionsArr);
        const studentData = groupedDataByStudent[studentId];
        const student = this.state.sortedStudents.find(s => s.id === studentId)
        let studentName = "Student";
        if (student) {
            studentName = student?.firstName + " " + student?.lastName;
        }
        this.setState({
            currentContent: "studentProfile",
            studentSessionsArr: studentData || [],
            selectedStudentId: studentId,
            selectedStudentName: studentName
        });
    }

    render() {
        const { selectedClassroom } = this.props;

        if (!selectedClassroom.students) {
            return null;
        }

        const sessions = selectedClassroom.sessions;

        return <div className={styles.classStudentsContainer}>
            {this.state.currentContent === "studentProfile" && <button
                className={styles.backToGridButton}
                onClick={() => this.setState({ currentContent: "grid" })}>
                All Students {">"}
            </button>}
            <div className={styles.sessionTimelineContainer}>
                <TimelineSessions
                    sessions={sessions}
                    onSessionSelect={this.handleSessionSelect}
                    selectedSession={this.state.selectedSession}
                />
            </div>
            {this.state.currentContent === "grid" ?
                <div className={styles.studentsGridContainer}>
                    <h3 className={styles.studentsGridTitle}>Student Competency Levels</h3>
                    <StudentsColorCoding />
                    {this.state.isLoading ? <Spinner level='warn' large className={[spinnerStyles.primary, styles.spinner].join(" ")} /> :
                        <StudentsGrid
                            sessionsArr={this.state.sessionsArr}
                            students={this.state.sortedStudents}
                            onStudentClick={this.onStudentClick}
                        />
                    }
                </div> : <div className={styles.studentProfileContainer}>
                    {this.state.isLoading ? <Spinner level='warn' large className={[spinnerStyles.primary, styles.spinner].join(" ")} /> :
                        <StudentOverview
                            studentSessionsArr={this.state.studentSessionsArr}
                            isSpecificSession={this.state.selectedSession?.title !== "All__Time"}
                            selectedClassroom={selectedClassroom}
                            selectedStudentId={this.state.selectedStudentId}
                            selectedStudentName={this.state.selectedStudentName}
                        />
                    }
                </div>}
        </div>
    }
}