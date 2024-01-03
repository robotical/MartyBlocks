import React from "react";
import styles from "./student-view.css";
import bindAll from 'lodash.bindall';
import { defineMessages, intlShape, injectIntl } from "react-intl";
import StudentAssessment from "./student-assessment/student-assessment.jsx";
import {
    openStudentAnnouncement,
} from '../../../reducers/modals.js';
import { connect } from 'react-redux';
import errorBoundaryHOC from '../../../lib/error-boundary-hoc.jsx';
import Spinner from '../../spinner/spinner.jsx';
import spinnerStyles from '../../spinner/spinner.css';
import Modal from "../../../containers/modal.jsx";
import PropTypes from "prop-types";
import StudentBadges from "../student-data-modal/student-badges/student-badges.jsx";

const messages = defineMessages({
    placeholder: {
        defaultMessage: "Tutorials",
        description: "Button to open the tutorials page",
        id: "gui.martyCodeAssess.studentView.tutorials",
    }
});

class StudentView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedClassStudents: [],
            selectedTab: "Overview",
            isLoading: false,
            exitConfirmationModalVisible: false,
        };
        bindAll(this, [
            'onSelectTab',
            'onJoinClass',
            'onExitClass',
            'onNewClassAnnouncement',
            'exitClassHandler'
        ]);
    }

    componentDidMount() {
        const asyncFunc = async () => {
            this.setState({ isLoading: true });
            await codeAssess.createStudentIfDoesntExist(codeAssess.student.id, codeAssess.student.name);
            const fetchedStudentData = await codeAssess.student.fetchStudentData(this.props.selectedClass?.id);


            this.setState({ isLoading: false });
        }
        asyncFunc();
    }

    onSelectTab(tab) {
        this.setState({ selectedTab: tab });
    }

    async onJoinClass() {
        this.setState({ isLoading: true });
        const classId = this.props.selectedClass?.id;
        const didJoin = await codeAssess.student.joinClass(classId);
        if (didJoin) {
            codeAssess.subscribe(
                codeAssess.TypesOfPublishedEvents.NEW_CLASS_ANNOUNCEMENT,
                codeAssess.TypesOfPublishedEvents.NEW_CLASS_ANNOUNCEMENT,
                this.onNewClassAnnouncement.bind(this)
            );
        }
        this.setState({ isLoading: false });
    }

    async onNewClassAnnouncement(announcement) {
        // have I answered already to this announcement?
        let haveIAnswered = false;
        announcement.responses.forEach((response) => {
            if (response.studentId === codeAssess.student.id) haveIAnswered = true;
        });
        if (announcement.classId === this.props.selectedClass?.id && !haveIAnswered) {
            this.props.showStudentAnnouncementModal(announcement);
        }
    }

    async onExitClass() {
        this.setState({ exitConfirmationModalVisible: true });
    }

    async exitClassHandler() {
        this.setState({ isLoading: true });
        const didExit = await codeAssess.student.exitClass();
        if (didExit) {
            codeAssess.unsubscribe(codeAssess.TypesOfPublishedEvents.NEW_CLASS_ANNOUNCEMENT);
        }
        this.setState({ isLoading: false, exitConfirmationModalVisible: false });
    }

    render() {
        const { intl } = this.props;

        return (
            <>
                {this.state.exitConfirmationModalVisible && <Modal
                    onRequestClose={() => this.setState({ exitConfirmationModalVisible: false })}
                    id="exitConfirmationModal"
                    contentLabel="Are you sure you want to exit this class?"
                    className={styles.exitConfirmationModal}
                >
                    <div className={styles.exitConfirmationModalContainer}>
                        <div className={styles.exitConfirmationModalTitle}>Are you sure you want to exit this class?</div>
                        <div className={styles.exitConfirmationModalButtonsContainer}>
                            <button className={[styles.button].join(" ")} onClick={() => this.setState({ exitConfirmationModalVisible: false })}>Cancel</button>
                            <button className={[styles.button].join(" ")} onClick={this.exitClassHandler}>Yes</button>
                        </div>
                    </div>
                </Modal>}
                <div className={styles.outerContainer} >
                    <div className={styles.header}>
                        <div onClick={() => this.onSelectTab("Overview")} className={[styles.tab, (this.state.selectedTab === "Overview" ? styles.selectedTab : "")].join(" ")}>Overview</div>
                        <div onClick={() => this.onSelectTab("My Progress")} className={[styles.tab, (this.state.selectedTab === "My Progress" ? styles.selectedTab : "")].join(" ")}>My Progress</div>
                        <div onClick={() => this.onSelectTab("My Accomplishments")} className={[styles.tab, (this.state.selectedTab === "My Accomplishments" ? styles.selectedTab : "")].join(" ")}>My Accomplishments</div>
                    </div>
                    <div className={styles.selectedTabContentContainer}>
                        {this.state.isLoading ? <Spinner level='warn' large className={spinnerStyles.primary} /> : (
                            <>
                                {this.state.selectedTab === "Overview" && <div className={styles.overviewContainer}>
                                    <div className={styles.overviewClassName}>Name: {this.props.selectedClass?.name}</div>
                                    <div className={styles.overviewClassSection}>{this.props.selectedClass?.section}</div>
                                    <div className={styles.overviewClassSubject}>{this.props.selectedClass?.subject}</div>
                                    <div className={styles.overviewClassRoom}>{this.props.selectedClass?.room}</div>
                                    <div className={styles.overviewHasJoined}>
                                        {!!(codeAssess?.student?.joinedClass?.id === this.props.selectedClass?.id) ?
                                            <button onClick={this.onExitClass} className={[styles.button, styles.exit_btn].join(" ")}>Exit Class</button> :
                                            <button onClick={this.onJoinClass} className={[styles.button, styles.join_btn].join(" ")}>Join</button>
                                        }
                                    </div>
                                </div>
                                }
                                {this.state.selectedTab === "My Progress" && <div className={styles.myAssessmentContainer}>
                                    <StudentAssessment classId={this.props.selectedClass?.id} />
                                </div>
                                }
                                {this.state.selectedTab === "My Accomplishments" && <div className={styles.myAccomplishmentsContainer}>
                                    <StudentBadges classId={this.props.selectedClass?.id} />
                                </div>
                                }
                            </>
                        )}
                    </div>
                </div>
            </>
        );
    }
}

StudentView.propTypes = {
    intl: intlShape.isRequired,
    selectedClass: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
    showStudentAnnouncementModal: (announcement) => dispatch(openStudentAnnouncement({ announcement })),
});


export default errorBoundaryHOC('StudentView')(
    injectIntl(connect(
        null,
        mapDispatchToProps
    )(StudentView))
);

