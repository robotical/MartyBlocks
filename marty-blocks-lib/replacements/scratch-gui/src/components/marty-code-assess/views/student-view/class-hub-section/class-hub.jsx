import React from 'react';
import styles from "./class-hub.css";
import bindAll from 'lodash.bindall';
import NotesAnnouncementsBox from '../../../notes-announcements-box/notes-announcements-box.jsx';
import StudentBadges from '../../../student-badges/student-badges.jsx';
// const codeAssessClientFacade = window.codeAssess.codeAssessLib.default.getInstance();

export default class ClassHub extends React.Component {
    constructor(props) {
        super(props);

        bindAll(this, [
        ]);
    }

    render() {
        const { selectedClassroom, studentId, studentName } = this.props;

        return <div className={styles.classHubContainer}>
            <div className={styles.studentBadgesContainer}>
                <StudentBadges
                    classId={selectedClassroom.id}
                    studentId={studentId}
                    studentName={studentName}
                />
            </div>
            <div className={styles.separator}></div>
            <div className={styles.announcementsContainer}>
                <NotesAnnouncementsBox
                    title="Session Announcements"
                    items={selectedClassroom.activeSession?.announcements || []}
                    onAddNewItem={() => {}} // student cannot add announcements
                    disabled={true}
                />
            </div>
        </div>
    }
}

