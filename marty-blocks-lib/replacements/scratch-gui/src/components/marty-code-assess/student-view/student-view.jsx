import React from "react";
import styles from "./student-view.css";
import bindAll from 'lodash.bindall';
import AssetPanel from "../../asset-panel/asset-panel.jsx";
import { defineMessages, intlShape, injectIntl } from "react-intl";
import classroomIcon from "../../../lib/assets/icon--classroom.svg";
import helpIcon from "../../../lib/assets/icon--tutorials.svg";
import StudentAssessment from "./student-assessment/student-assessment.jsx";
import {
    openStudentAnnouncement,
} from '../../../reducers/modals.js';
import { connect } from 'react-redux';
import errorBoundaryHOC from '../../../lib/error-boundary-hoc.jsx';
import Spinner from '../../spinner/spinner.jsx';
import spinnerStyles from '../../spinner/spinner.css';
import Modal from "../../../containers/modal.jsx";

const messages = defineMessages({
    tutorials: {
        defaultMessage: "Tutorials",
        description: "Button to open the tutorials page",
        id: "gui.martyCodeAssess.studentView.tutorials",
    }
});

class StudentView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            studentClassess: [],
            selectedClassIdx: 0,
            selectedClassStudents: [],
            selectedTab: "Overview",
            isLoading: false,
            exitConfirmationModalVisible: false,
        };
        bindAll(this, [
            'handleClassChange',
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
            codeAssess.student.getListOfClassess().then((classess) => {
                this.setState({ studentClassess: classess });
            });
            this.setState({ isLoading: false });
        }
        asyncFunc();
    }

    // when the component state is changed
    async componentDidUpdate(prevProps, prevState) {
        // when the selectedClass changes
        if (prevState.selectedClassIdx !== this.state.selectedClassIdx) {
            this.setState({ isLoading: true });
            const selectedClass = this.state.studentClassess[this.state.selectedClassIdx];
            await codeAssess.createClassIfDoesntExist(selectedClass.id, selectedClass.name, codeAssess.student.id);
            this.setState({ isLoading: false });
        }
        if (prevState.studentClassess !== this.state.studentClassess) {
            this.setState({ isLoading: true });
            const selectedClass = this.state.studentClassess[this.state.selectedClassIdx];
            await codeAssess.createClassIfDoesntExist(selectedClass.id, selectedClass.name, selectedClass.teacherId);
            this.setState({ isLoading: false });
        }
    }

    handleClassChange(classIdx) {
        this.setState({ selectedClassIdx: classIdx });
    }

    onSelectTab(tab) {
        this.setState({ selectedTab: tab });
    }

    async onJoinClass() {
        this.setState({ isLoading: true });
        const classId = this.state.studentClassess[this.state.selectedClassIdx]?.id;
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
        console.log(announcement);
        if (announcement.classId === this.state.studentClassess[this.state.selectedClassIdx]?.id && !haveIAnswered) {
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
        const studentClassessAssets = this.state.studentClassess?.map((cls) => {
            return ({
                url: classroomIcon,
                name: cls.name,
                details: cls.section || "",
            })
        }) || [];


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
                <AssetPanel
                    buttons={[
                        {
                            title: intl.formatMessage(messages.tutorials),
                            img: helpIcon,
                            onClick: () => this.props.showTutorialCard(), // TODO: implement
                        },
                    ]}
                    items={studentClassessAssets}
                    selectedItemIndex={this.state.selectedClassIdx}
                    onItemClick={this.handleClassChange}
                    onDrop={() => { }}
                    externalStylesClass={styles.assetPanel}
                >
                    <div className={styles.outerContainer} >
                        <div className={styles.header}>
                            <div onClick={() => this.onSelectTab("Overview")} className={[styles.tab, (this.state.selectedTab === "Overview" ? styles.selectedTab : "")].join(" ")}>Overview</div>
                            <div onClick={() => this.onSelectTab("My Assessment")} className={[styles.tab, (this.state.selectedTab === "My Assessment" ? styles.selectedTab : "")].join(" ")}>My Assessment</div>
                        </div>
                        <div className={styles.selectedTabContentContainer}>
                            {this.state.isLoading ? <Spinner level='warn' large className={spinnerStyles.primary} /> : (
                                <>
                                    {this.state.selectedTab === "Overview" && <div className={styles.overviewContainer}>
                                        <div className={styles.overviewClassName}>Name: {this.state.studentClassess[this.state.selectedClassIdx]?.name}</div>
                                        <div className={styles.overviewClassSection}>{this.state.studentClassess[this.state.selectedClassIdx]?.section}</div>
                                        <div className={styles.overviewClassSubject}>{this.state.studentClassess[this.state.selectedClassIdx]?.subject}</div>
                                        <div className={styles.overviewClassRoom}>{this.state.studentClassess[this.state.selectedClassIdx]?.room}</div>
                                        <div className={styles.overviewHasJoined}>
                                            {!!(codeAssess?.student?.joinedClass?.id === this.state.studentClassess[this.state.selectedClassIdx]?.id) ?
                                                <button onClick={this.onExitClass} className={[styles.button, styles.exit_btn].join(" ")}>Exit Class</button> :
                                                <button onClick={this.onJoinClass} className={[styles.button, styles.join_btn].join(" ")}>Join</button>
                                            }
                                        </div>
                                    </div>
                                    }
                                    {this.state.selectedTab === "My Assessment" && <div className={styles.myAssessmentContainer}>
                                        <StudentAssessment classId={this.state.studentClassess[this.state.selectedClassIdx]?.id} />
                                    </div>
                                    }
                                </>
                            )}
                        </div>
                    </div>
                </AssetPanel>
            </>
        );
    }
}

StudentView.propTypes = {
    intl: intlShape.isRequired,
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

