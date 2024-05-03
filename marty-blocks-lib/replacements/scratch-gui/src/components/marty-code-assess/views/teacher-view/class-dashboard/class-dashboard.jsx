import React from "react";
import styles from "./class-dashboard.css";
import bindAll from 'lodash.bindall';
import { defineMessages, intlShape, injectIntl } from "react-intl";
import PropTypes from 'prop-types';
import { activateDeck } from "../../../../../reducers/cards.js";
import { connect } from "react-redux";
import iconPlay from "../../../icon--play.svg";
import iconStop from "../../../icon--stop.svg";
import StudentsGrid from "./students-grid/students-grid.jsx";
import SortByStudents from "../../../sort-by's/sortby-students/sortby-students.jsx";
import NotesAnnouncementsBox from "../../../notes-announcements-box/notes-announcements-box.jsx";

const codeAssessClientFacade = window.codeAssess.codeAssessLib.default.getInstance();

const messages = defineMessages({
    tutorials: {
        defaultMessage: "adf",
        description: "sf",
        id: "gui.martyCodeAssess.teacherView.classDashboard.",
    }
});

class ClassDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.handleSessionTitleUpdate = this.handleSessionTitleUpdate.bind(this);

        this.state = {
            sessionStarted: false,
            sessionTitle: codeAssessClientFacade.activeSession?.title || ""
        };
        bindAll(this, [
        ]);
    }

    componentDidMount() {
    }


    componentWillUnmount() {
    }

    componentDidUpdate(prevProps, prevState) {

    }

    async onToggleSession() {
    }

    async handleAddNewSessionNote(note, noteFile) {
        if (!note) {
            return;
        }
        return await codeAssessClientFacade.addSessionNote(note, noteFile);
    }

    async handleAddNewSessionAnnouncement(announcement, announcementFile) {
        if (!announcement) {
            return;
        }
        codeAssessClientFacade.addSessionAnnouncement(announcement, announcementFile);
    }

    handleSessionTitleUpdate(e) {
        e.preventDefault();
        if (!this.state.sessionTitle) {
            return;
        }
        codeAssessClientFacade.updateSessionTitle(this.state.sessionTitle);
        alert("Session title updated!");
    }

    render() {
        const { intl, activeSession, selectedClassroom } = this.props;
        if (!selectedClassroom.students) {
            return null;
        }
        const isThereAnActiveSession = !!activeSession;

        return (
            <div className={styles.dashboardContainer}>
                <div className={styles.header}>
                    <div className={styles.className}>{selectedClassroom?.title}</div>
                    <div className={styles.classSection}>{selectedClassroom?.section}</div>
                    <div className={styles.classSessionName} style={{ visibility: isThereAnActiveSession ? "visible" : "hidden" }}>
                        {isThereAnActiveSession &&
                            <form onSubmit={this.handleSessionTitleUpdate}>
                                <input type="text" placeholder='"Session Name"' value={this.state.sessionTitle} onChange={(e) => this.setState({ sessionTitle: e.target.value })} />
                            </form>
                        }
                    </div>
                    <div className={styles.classEnrolledStudents}>Enrolled Students: {selectedClassroom.students.length}</div>
                    <div className={styles.sortByContainer}><SortByStudents /></div>
                </div>
                <div className={styles.studentsContainer}>
                    <StudentsGrid selectedClassroom={selectedClassroom} />
                </div>
                <div className={styles.notesContainer}>
                    <NotesAnnouncementsBox
                        title="Session Notes"
                        items={activeSession?.notes || []}
                        onAddNewItem={(note, noteFile) => this.handleAddNewSessionNote(note, noteFile)}
                        disabled={!isThereAnActiveSession}
                    />
                </div>
                <div className={styles.announcementsContainer}>
                    <NotesAnnouncementsBox
                        title="Session Announcements"
                        items={activeSession?.announcements || []}
                        onAddNewItem={(announcement, announcementFile) => this.handleAddNewSessionAnnouncement(announcement, announcementFile)}
                        disabled={!isThereAnActiveSession}
                    />
                </div>
            </div>
        )
    }
}

ClassDashboard.propTypes = {
    class: PropTypes.object,
    students: PropTypes.arrayOf(PropTypes.object),
    classId: PropTypes.string,
    intl: intlShape.isRequired,
    showTutorialCard: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
    showTutorialCard: (tutorialTitle) => {
        const hasThisTutorialBeenShown = localStorage.getItem("mb-tutorials-" + tutorialTitle);
        if (!hasThisTutorialBeenShown) {
            localStorage.setItem("mb-tutorials-" + tutorialTitle, true);
            dispatch(activateDeck(tutorialTitle));
        }
    }
});

export default injectIntl(connect(null, mapDispatchToProps)(ClassDashboard))