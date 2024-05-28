import React from "react";
import styles from "./class-dashboard.css";
import bindAll from 'lodash.bindall';
import { defineMessages, injectIntl } from "react-intl";
import { activateDeck } from "../../../../../reducers/cards.js";
import { connect } from "react-redux";
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
            sessionTitle: this.props.selectedClassroom.activeSession?.title || "",
            sortedStudents: this.props.selectedClassroom.students || []
        };
        bindAll(this, [
            "onStudentsSorted",
            "handleAddNewSessionNote",
            "handleAddNewSessionAnnouncement",
            "handleSessionNameChange",
            "handleSessionTitleUpdate"
        ]);
        this.sessionNameChangeTimeoutId = null;
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    componentDidUpdate(prevProps, prevState) {
        // update session title if it has changed
        if (prevProps.selectedClassroom.activeSession && prevProps.selectedClassroom.activeSession.title !== this.props.selectedClassroom.activeSession?.title) {
            this.setState({ sessionTitle: this.props.selectedClassroom.activeSession?.title || "" });
        }
    }

    onStudentsSorted(sortedStudents) {
        this.setState({ sortedStudents: [...sortedStudents] });
    }

    async handleAddNewSessionNote(note, noteFile, onUploadProgress) {
        if (!note) {
            return;
        }
        return await codeAssessClientFacade.addSessionNote(note, noteFile, undefined, onUploadProgress);
    }

    async handleAddNewSessionAnnouncement(announcement, announcementFile, onUploadProgress) {
        if (!announcement) {
            return;
        }
        codeAssessClientFacade.addSessionAnnouncement(announcement, announcementFile, undefined, onUploadProgress);
    }

    handleSessionTitleUpdate(e) {
        e && e.preventDefault();
        if (!this.state.sessionTitle) {
            return;
        }
        codeAssessClientFacade.updateSessionTitle(this.state.sessionTitle);
        alert("Session title updated!");
    }

    handleSessionNameChange(e) {
        this.setState({ sessionTitle: e.target.value }, () => {
            if (this.sessionNameChangeTimeoutId) {
                clearTimeout(this.sessionNameChangeTimeoutId);
            }
            this.sessionNameChangeTimeoutId = setTimeout(() => {
                this.handleSessionTitleUpdate();
            }, 1000);
        });
    }

    render() {
        const { intl, selectedClassroom } = this.props;

        if (!selectedClassroom.students) {
            return null;
        }
        const isThereAnActiveSession = !!selectedClassroom.activeSession;

        return (
            <div className={styles.dashboardContainer}>
                <div className={styles.header}>
                    <div className={styles.className}>{selectedClassroom?.title}</div>
                    <div className={styles.classSection}>{selectedClassroom?.section}</div>
                    <div className={styles.classSessionName} style={{ visibility: isThereAnActiveSession ? "visible" : "hidden" }}>
                        {isThereAnActiveSession &&
                            <form onSubmit={this.handleSessionTitleUpdate}>
                                <input
                                    type="text"
                                    placeholder='"Session Name"'
                                    value={this.state.sessionTitle}
                                    onChange={(e) => this.handleSessionNameChange(e)}
                                />
                            </form>
                        }
                    </div>
                    <div className={styles.classEnrolledStudents}>Enrolled Students: {selectedClassroom.students.length}</div>
                    <div className={styles.sortByContainer}>
                        <SortByStudents
                            students={selectedClassroom.students}
                            onStudentsSorted={this.onStudentsSorted}
                            selectedClassroom={selectedClassroom}
                        />
                    </div>
                </div>
                <div className={styles.studentsContainer}>
                    <StudentsGrid
                        selectedClassroom={selectedClassroom}
                        students={this.state.sortedStudents}
                    />
                </div>
                <div className={styles.notesContainer}>
                    <NotesAnnouncementsBox
                        title="Session Notes"
                        items={selectedClassroom.activeSession?.notes || []}
                        onAddNewItem={(note, noteFile, onUploadProgress) => this.handleAddNewSessionNote(note, noteFile, onUploadProgress)}
                        disabled={!isThereAnActiveSession}
                    />
                </div>
                <div className={styles.announcementsContainer}>
                    <NotesAnnouncementsBox
                        title="Session Announcements"
                        items={selectedClassroom.activeSession?.announcements || []}
                        onAddNewItem={(announcement, announcementFile, onUploadProgress) => this.handleAddNewSessionAnnouncement(announcement, announcementFile, onUploadProgress)}
                        disabled={!isThereAnActiveSession}
                    />
                </div>
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

export default injectIntl(connect(null, mapDispatchToProps)(ClassDashboard))