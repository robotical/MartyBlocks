import React from "react";
import styles from "./join-session-button.css";
import Spinner from '../../../../spinner/spinner.jsx';
import spinnerStyles from '../../../../spinner/spinner.css';
import bindAll from 'lodash.bindall';

const codeAssessClientFacade = window.codeAssess.codeAssessLib.default.getInstance();
const StudentStatusEnum = window.codeAssess.codeAssessLib.StudentStatusEnum;
const PublishedEventsEnum = window.codeAssess.codeAssessLib.PublishedEventsEnum;

const STUDENT_JOINED_SESSION_SUBSCRIPTION = "STUDENT_JOINED_SESSION_SUBSCRIPTION_JOIN_BUTTON";
const STUDENT_EXITED_SESSION_SUBSCRIPTION = "STUDENT_EXITED_SESSION_SUBSCRIPTION_JOIN_BUTTON";


class JoinSessionButton extends React.Component {
    constructor() {
        super();

        this.state = {
            isLoading: false,
        }

        bindAll(this, [
            "onJoinSession",
            "onLeaveSession",
            "onStudentJoinedSession",
            "onStudentExitedSession"
        ]);
    }

    componentDidMount() {
        codeAssessClientFacade.subscribe(STUDENT_JOINED_SESSION_SUBSCRIPTION, PublishedEventsEnum.STUDENT_JOINED_SESSION, this.onStudentJoinedSession);
        codeAssessClientFacade.subscribe(STUDENT_EXITED_SESSION_SUBSCRIPTION, PublishedEventsEnum.STUDENT_EXITED_SESSION, this.onStudentExitedSession);
    }

    onJoinSession() {
        this.setState({ isLoading: true });
        codeAssessClientFacade.joinSession();
    }

    onLeaveSession() {
        this.setState({ isLoading: true });
        codeAssessClientFacade.exitSession();
    }

    onStudentJoinedSession() {
        this.setState({ isLoading: false });
    }

    onStudentExitedSession() {
        this.setState({ isLoading: false });
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
                    className={[styles.joinSessionButton, styles.active].join(" ")}
                    onClick={this.onJoinSession}
                >
                    Join Session
                </button>
            );
        } else if (isThereActiveSession && haveIJoinedSession) {
            buttonJSX = (
                <button
                    className={[styles.joinSessionButton, styles.leaveSessionButton].join(" ")}
                    onClick={this.onLeaveSession}
                >
                    Leave Session
                </button>
            );
        } else {
            // No active session
            buttonJSX = (
                <button
                    className={[styles.joinSessionButton, styles.disabled].join(" ")}
                    disabled
                >
                    No Active Session
                </button>
            );
        }

        return <div className={styles.joinSessionButtonContainer} >
            {this.state.isLoading ? <Spinner className={[spinnerStyles.spinner, styles.spinner].join(" ")} /> : buttonJSX}
        </div>
    }

}

export default JoinSessionButton;
