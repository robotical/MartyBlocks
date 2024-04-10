import React from "react";
import styles from "./class-dashboard.css";
import bindAll from 'lodash.bindall';
import { defineMessages, intlShape, injectIntl } from "react-intl";
import PropTypes from 'prop-types';
import { activateDeck } from "../../../../reducers/cards.js";
import { connect } from "react-redux";
import iconPlay from "../../icon--play.svg";
import iconStop from "../../icon--stop.svg";
import StudentsGrid from "./students-grid/students-grid.jsx";

const messages = defineMessages({
    tutorials: {
        defaultMessage: "adf",
        description: "sf",
        id: "gui.martyCodeAssess.teacherView.classDashboard.",
    }
});

const SESSION_STATUS_SUBSCRIPTION_ID = "class-dashboard-session-status";

class ClassDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessionStarted: false,
        };
        bindAll(this, [
            "onToggleSession",
            "handleSessionStatusChange"
        ]);
    }

    componentDidMount() {
        // TODO: create tutorial for dashboard
        // this.props.showTutorialCard("code-assess-teacher-dashboard-tab");

        codeAssess.subscribe(
            SESSION_STATUS_SUBSCRIPTION_ID,
            codeAssess.TypesOfPublishedEvents.SESSION_STATUS_CHANGED,
            this.handleSessionStatusChange
        );
    }

    handleSessionStatusChange = ({status, classId}) => {
        this.forceUpdate();
    }

    componentWillUnmount() {
        codeAssess.unsubscribe(SESSION_STATUS_SUBSCRIPTION_ID);
    }

    componentDidUpdate(prevProps, prevState) {

    }

    async onToggleSession() {
        if (this.props.class.sessionStatus === "stopped") {
            await codeAssess.startSessionForClass(this.props.class);
        } else if (this.props.class.sessionStatus === "started") {
            await codeAssess.stopSessionForClass(this.props.class);
        }
    }

    render() {
        if (!this.props.students) {
            return null;
        }
        const sessionStatus = this.props.class.sessionStatus;

        return (
            <div className={styles.dashboardContainer}>
                <div className={styles.header}>
                    <div className={styles.startStopSessionContainer}>
                        <div className={[styles.startStopSessionButtonContainer, sessionStatus === "started" ? styles.stopSessionButtonContainer : styles.startSessionButtonContainer].join(" ")} onClick={this.onToggleSession} >
                            <img src={sessionStatus === "started" ? iconStop : iconPlay} className={[styles.startStopSessionImg].join(" ")} />
                        </div>
                        <div className={styles.startStopSessionText}>{sessionStatus === "started" ? "Stop Session" : "Start Session"}</div>
                    </div>
                    <div className={styles.className}>{this.props.class?.name}</div>
                    <div className={styles.classSection}>{this.props.class?.section}</div>
                    {/* <div className={styles.classSubject}>{this.props.class?.subject}</div> */}
                    <div className={styles.classSessionName} style={{visibility: sessionStatus === "started" ? "visible" : "hidden"}}>
                        {sessionStatus === "started" && <input type="text" placeholder="Session Name" />}
                    </div>
                    <div className={styles.classEnrolledStudents}>Enrolled Students: {this.props.students.length}</div>
                    <div className={styles.sortByContainer}>Sort by</div>
                </div>
                <div className={styles.studentsContainer}>
                    <StudentsGrid class={this.props.class} students={this.props.students} classId={this.props.classId} />
                </div>
                <div className={styles.notesContainer}></div>
                <div className={styles.announcementsContainer}></div>
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