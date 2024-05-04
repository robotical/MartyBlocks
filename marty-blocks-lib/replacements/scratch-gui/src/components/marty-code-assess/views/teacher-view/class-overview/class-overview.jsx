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

const codeAssessClientFacade = window.codeAssess.codeAssessLib.default.getInstance();

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
            isLoading: false
        };
        bindAll(this, [
            "handleSessionSelect",
            "handleAddNewSessionNote",
            "handleAddNewSessionAnnouncement"
        ]);
    }

    componentDidMount() { }

    componentWillUnmount() { }

    componentDidUpdate(prevProps, prevState) { }

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
                notes: allNotes,
                announcements: allAnnouncements,
                questions: allQuestions,
                students: allStudents,
                studentSessionData: allStudentSessionData
            };
            this.setState({ selectedSession: allSession, isLoading: false });
            return;
        }
        const updatedClassroom = await codeAssessClientFacade.fetchSessionData(session.id);
        const fetchedSession = updatedClassroom.sessions.find(s => s.id === session.id);
        this.setState({ selectedSession: fetchedSession, isLoading: false });
    }

    async handleAddNewSessionNote(note, noteFile) {
        if (!note || !selectedSession?.id) {
            return;
        }
        return await codeAssessClientFacade.addSessionNote(note, noteFile, selectedSession.id);
    }

    async handleAddNewSessionAnnouncement(announcement, announcementFile) {
        if (!announcement, !selectedSession?.id) {
            return;
        }
        codeAssessClientFacade.addSessionAnnouncement(announcement, announcementFile, selectedSession.id);
    }

    render() {
        const { intl, selectedClassroom } = this.props;

        if (!selectedClassroom.students) {
            return null;
        }
        const sessions = selectedClassroom.sessions;

        return (
            <div className={styles.overviewContainer}>
                <div className={styles.sessionTimelineContainer}>
                    <TimelineSessions sessions={sessions} onSessionSelect={this.handleSessionSelect} selectedSession={this.state.selectedSession} />
                </div>
                {this.state.isLoading ? <Spinner level='warn' large className={spinnerStyles.primary} /> : (
                    <>
                        <div className={styles.spiderGraphContainer}>
                        </div>
                        <div className={styles.supportChampionsContainer}></div>
                        <div className={styles.separator}></div>
                        <div className={styles.progressOverTimeContainer}></div>
                        <div className={styles.notesContainer}>
                            <NotesAnnouncementsBox
                                title="Session Notes"
                                items={this.state.selectedSession?.notes || []}
                                onAddNewItem={(note, noteFile) => this.handleAddNewSessionNote(note, noteFile)}
                                disabled={!this.state.selectedSession?.id}
                            />
                        </div>
                        <div className={styles.announcementsContainer}>
                            <NotesAnnouncementsBox
                                title="Session Announcements"
                                items={this.state.selectedSession?.announcements || []}
                                onAddNewItem={(announcement, announcementFile) => this.handleAddNewSessionAnnouncement(announcement, announcementFile)}
                                disabled={!this.state.selectedSession?.id}
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

export default injectIntl(connect(null, mapDispatchToProps)(ClassOverview))