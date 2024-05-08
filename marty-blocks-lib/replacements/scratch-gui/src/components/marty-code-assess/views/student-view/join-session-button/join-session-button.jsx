import React from "react";
import styles from "./join-session-button.css";

const codeAssessClientFacade = window.codeAssess.codeAssessLib.default.getInstance();
const StudentStatusEnum = window.codeAssess.codeAssessLib.StudentStatusEnum;

class JoinSessionButton extends React.Component {
    constructor() {
        super();
    }

    onJoinSession() {
        codeAssessClientFacade.joinSession();
    }

    onLeaveSession() {
        codeAssessClientFacade.exitSession();
    }

    render() {
        const { selectedClassroom, student: thisStudent } = this.props;
        const activeSession = selectedClassroom.activeSession;
        const isThereActiveSession = !!activeSession;
        const haveIJoinedSession = activeSession?.joinedStudents.find(student => student.id === thisStudent.id
            && (student.activityStatus === StudentStatusEnum.INACTIVE
                || student.activityStatus === StudentStatusEnum.ACTIVE));

        let buttonJSX = null;
        if (isThereActiveSession && !haveIJoinedSession) {
            buttonJSX = (
                <button
                    className={styles.joinSessionButton}
                    onClick={this.onJoinSession}
                >
                    Join Session
                </button>
            );
        } else if (isThereActiveSession && haveIJoinedSession) {
            buttonJSX = (
                <button
                    className={styles.joinSessionButton}
                    onClick={this.onLeaveSession}
                >
                    Leave Session
                </button>
            );
        } else {
            // No active session
            buttonJSX = (
                <button
                    className={styles.joinSessionButton}
                    disabled
                >
                    No Active Session
                </button>
            );
        }

        return (
            <div className={styles.joinSessionButton}>
                {buttonJSX}
            </div>
        );
    }

}

export default JoinSessionButton;
