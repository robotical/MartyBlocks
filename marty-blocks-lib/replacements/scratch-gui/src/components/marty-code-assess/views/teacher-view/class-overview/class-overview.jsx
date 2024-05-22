import React from "react";
import styles from "./class-overview.css";
import bindAll from 'lodash.bindall';
import { defineMessages, injectIntl } from "react-intl";
import { activateDeck } from "../../../../../reducers/cards.js";
import { connect } from "react-redux";
import NotesAnnouncementsBox from "../../../notes-announcements-box/notes-announcements-box.jsx";
import TimelineSessions from "./timeline-sessions/timeline-sessions.jsx";
import Spinner from '../../../../spinner/spinner.jsx';
import spinnerStyles from '../../../../spinner/spinner.css';
import StudentSupportOverview from "../student-support-overview/student-support-overview.jsx";
import ClassAverageSpider from "../../../plots/class-average-spider/class-average-spider.jsx";
import ClassAverageOverTime from "../../../plots/class-average-over-time/class-average-over-time.jsx";

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
            selectedSession: null,
            sessionsArr: [],
            isLoading: false,
        };
        bindAll(this, [
            "handleSessionSelect",
            "handleAddNewSessionNote",
            "handleAddNewSessionAnnouncement",
            "reselectSession",
            "onShowAllSupportChampionsClick"
        ]);
    }

    componentDidMount() {
        this.handleSessionSelect({ title: "All__Time" });
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
            if (selectedSession) {
                this.setState({ selectedSession, sessionsArr: [selectedSession] });
            }
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
            this.setState({ sessionsArr: allSessions, selectedSession: allSession, isLoading: false });
        } else { // specific session
            const updatedClassroom = await codeAssessClientFacade.fetchSessionData(session.id);
            const fetchedSession = updatedClassroom.sessions.find(s => s.id === session.id);
            this.setState({ sessionsArr: [fetchedSession], selectedSession: fetchedSession, isLoading: false });
        }
    }

    async handleAddNewSessionNote(note, noteFile) {
        if (!note || !this.state.selectedSession?.id) {
            return;
        }
        return codeAssessClientFacade.addSessionNote(note, noteFile, this.state.selectedSession.id);
    }

    async handleAddNewSessionAnnouncement(announcement, announcementFile) {
        if (!announcement, !this.state.selectedSession?.id) {
            return;
        }
        codeAssessClientFacade.addSessionAnnouncement(announcement, announcementFile, this.state.selectedSession.id);
    }

    onShowAllSupportChampionsClick() {
        this.props.handleGoToStudentsTab(this.state.selectedSession, this.state.sessionsArr);
    }

    render() {
        const { intl, selectedClassroom } = this.props;

        if (!selectedClassroom.students) {
            return null;
        }

        const sessions = selectedClassroom.sessions;
        const allStudentSessionDataEmpty = areAllStudentSessionDataEmpty(this.state.sessionsArr);

        let overviewContainerStylesForNoData = {};
        if (allStudentSessionDataEmpty) {
            overviewContainerStylesForNoData = {
                gridTemplateAreas: '"sessionsTimeline sessionsTimeline" "nodata nodata" "notes announcements"',
                gridTemplateColumns: "1fr 1fr",
                gridTemplateRows: "1fr 1fr",
            };
        }
        return (
            <div className={styles.overviewContainer} style={overviewContainerStylesForNoData}>
                <div className={styles.sessionTimelineContainer}>
                    <TimelineSessions sessions={sessions} onSessionSelect={this.handleSessionSelect} selectedSession={this.state.selectedSession} />
                </div>
                {this.state.isLoading ? <Spinner level='warn' large className={spinnerStyles.primary} /> : (
                    <>
                        {allStudentSessionDataEmpty && <div className={styles.noData}>
                            <p className={styles.noDataTitle}>No data yet!</p>
                            <p className={styles.noDataSubtitle}>Either this session has no data, or the students have not started coding yet.</p>
                        </div>
                        }
                        {!allStudentSessionDataEmpty && <div className={styles.spiderGraphContainer}>
                            <ClassAverageSpider
                                data={DataTransformations.convertSessionsToSpiderGraphData(this.state.sessionsArr, true)}
                                rawSessionData={this.state.sessionsArr}
                                isMinimised={true}
                            />
                        </div>}
                        {!allStudentSessionDataEmpty && <div className={styles.supportChampionsContainer}>
                            <StudentSupportOverview
                                allSessions={this.state.sessionsArr}
                                students={selectedClassroom.students}
                                onShowAllClick={this.onShowAllSupportChampionsClick}
                            />
                        </div>}
                        <div className={styles.separator}></div>
                        {!allStudentSessionDataEmpty && <div className={styles.progressOverTimeContainer}>
                            <ClassAverageOverTime
                                data={DataTransformations.convertSessionsToLineGraphData(this.state.sessionsArr, this.state.selectedSession?.title !== "All__Time")}
                                rawSessionData={this.state.sessionsArr}
                                isSpecificSession={this.state.selectedSession?.title !== "All__Time"}
                            />
                        </div>}
                        <div className={styles.notesContainer}>
                            <NotesAnnouncementsBox
                                title="Session Notes"
                                items={this.state.selectedSession?.notes || []}
                                onAddNewItem={(note, noteFile) => this.handleAddNewSessionNote(note, noteFile)}
                                disabled={this.state.selectedSession?.title === "All__Time" || !this.state.selectedSession}
                            />
                        </div>
                        <div className={styles.announcementsContainer}>
                            <NotesAnnouncementsBox
                                title="Session Announcements"
                                items={this.state.selectedSession?.announcements || []}
                                onAddNewItem={(announcement, announcementFile) => this.handleAddNewSessionAnnouncement(announcement, announcementFile)}
                                disabled={this.state.selectedSession?.title === "All__Time" || !this.state.selectedSession}
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