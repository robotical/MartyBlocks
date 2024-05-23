import React from 'react';
import { injectIntl } from 'react-intl';
import errorBoundaryHOC from '../lib/error-boundary-hoc.jsx';
import MartyCodeAssess from '../components/marty-code-assess/marty-code-assess.jsx';

const codeAssessClientFacade = window.codeAssess.codeAssessLib.default.getInstance();
const PublishedEventsEnum = window.codeAssess.codeAssessLib.PublishedEventsEnum;

const USER_LOGGED_IN_SUBSCRIPTION = "USER_LOGGED_IN_SUBSCRIPTION";
const CLASS_LIST_RECEIVED_SUBSCRIPTION = "CLASS_LIST_RECEIVED_SUBSCRIPTION";
const CLASS_SELECTED_SUBSCRIPTION = "CLASS_SELECTED_SUBSCRIPTION";
const CLASS_UPDATED_SUBSCRIPTION = "CLASS_UPDATED_SUBSCRIPTION";
const STUDENT_OR_TEACHER_CHANGED_SUBSCRIPTION = "STUDENT_OR_TEACHER_CHANGED_SUBSCRIPTION";
const SESSION_CREATED_SUBSCRIPTION = "SESSION_CREATED_SUBSCRIPTION";
const SESSION_STOPPED_SUBSCRIPTION = "SESSION_STOPPED_SUBSCRIPTION";
const STUDENT_JOINED_SESSION_SUBSCRIPTION = "STUDENT_JOINED_SESSION_SUBSCRIPTION";
const STUDENT_ACTIVATED_SUBSCRIPTION = "STUDENT_ACTIVATED_SUBSCRIPTION";
const STUDENT_DEACTIVATED_SUBSCRIPTION = "STUDENT_DEACTIVATED_SUBSCRIPTION";
const STUDENT_EXITED_SESSION_SUBSCRIPTION = "STUDENT_EXITED_SESSION_SUBSCRIPTION";
const CLASS_ANNOUNCEMENT_ADDED_SUBSCRIPTION = "CLASS_ANNOUNCEMENT_ADDED_SUBSCRIPTION";
const SESSION_ANNOUNCEMENT_ADDED_SUBSCRIPTION = "SESSION_ANNOUNCEMENT_ADDED_SUBSCRIPTION";
const QUESTION_ADDED_SUBSCRIPTION = "QUESTION_ADDED_SUBSCRIPTION";
const ANSWER_CREATED_SUBSCRIPTION = "ANSWER_CREATED_SUBSCRIPTION";
const ANSWER_UPDATED_SUBSCRIPTION = "ANSWER_UPDATED_SUBSCRIPTION";
const CLASS_ANNOUNCEMENT_SEEN_SUBSCRIPTION = "CLASS_ANNOUNCEMENT_SEEN";
const SESSION_ANNOUNCEMENT_SEEN_SUBSCRIPTION = "SESSION_ANNOUNCEMENT_SEEN";
const CODE_SUBMISSION_CREATED_SUBSCRIPTION = "CODE_SUBMISSION_CREATED";
const CODE_SUBMISSION_UPDATED_SUBSCRIPTION = "CODE_SUBMISSION_UPDATED";
const CODE_SUBMISSION_REMOVED_SUBSCRIPTION = "CODE_SUBMISSION_REMOVED";
const SESSION_ANNOUNCEMENT_REMOVED_SUBSCRIPTION = "SESSION_ANNOUNCEMENT_REMOVED_SUBSCRIPTION";
const CLASS_ANNOUNCEMENT_REMOVED_SUBSCRIPTION = "CLASS_ANNOUNCEMENT_REMOVED_SUBSCRIPTION";
const SESSION_TITLE_UPDATED_SUBSCRIPTION = "SESSION_TITLE_UPDATED_SUBSCRIPTION";
const STUDENT_SESSION_DATA_UPDATED_SUBSCRIPTION = "STUDENT_SESSION_DATA_UPDATED_SUBSCRIPTION";

class CodeAssessTab extends React.Component {
    constructor(props) {
        super(props);
        this.loginHandler = this.loginHandler.bind(this);
        this.handleRefreshToken = this.handleRefreshToken.bind(this);
        this.onUserLoggedIn = this.onUserLoggedIn.bind(this);
        this.onClassListReceived = this.onClassListReceived.bind(this);
        this.handleClassSelect = this.handleClassSelect.bind(this);
        this.onClassUpdated = this.onClassUpdated.bind(this);
        this.classSelected = this.classSelected.bind(this);
        this.studentOrTeacherChanged = this.studentOrTeacherChanged.bind(this);
        this.onSessionCreated = this.onSessionCreated.bind(this);
        this.onSessionStopped = this.onSessionStopped.bind(this);
        this.onStudentJoinedSession = this.onStudentJoinedSession.bind(this);
        this.onStudentActivated = this.onStudentActivated.bind(this);
        this.onStudentDeactivated = this.onStudentDeactivated.bind(this);
        this.onStudentExitedSession = this.onStudentExitedSession.bind(this);
        this.onClassAnnouncementAdded = this.onClassAnnouncementAdded.bind(this);
        this.onSessionAnnouncementAdded = this.onSessionAnnouncementAdded.bind(this);
        this.onQuestionAdded = this.onQuestionAdded.bind(this);
        this.onAnswerCreated = this.onAnswerCreated.bind(this);
        this.onAnswerUpdated = this.onAnswerUpdated.bind(this);
        this.onClassAnnouncementSeen = this.onClassAnnouncementSeen.bind(this);
        this.onSessionAnnouncementSeen = this.onSessionAnnouncementSeen.bind(this);
        this.onCodeSubmissionCreated = this.onCodeSubmissionCreated.bind(this);
        this.onCodeSubmissionUpdated = this.onCodeSubmissionUpdated.bind(this);
        this.onCodeSubmissionRemoved = this.onCodeSubmissionRemoved.bind(this);
        this.onClassAnnouncementRemoved = this.onClassAnnouncementRemoved.bind(this);
        this.onSessionAnnouncementRemoved = this.onSessionAnnouncementRemoved.bind(this);
        this.onSessionTitleUpdated = this.onSessionTitleUpdated.bind(this);
        this.onStudentSessionDataUpdated = this.onStudentSessionDataUpdated.bind(this);

        this.state = {
            userProfile: codeAssessClientFacade.userProfile || null,
            classes: codeAssessClientFacade.classes || [],
            selectedClassroom: codeAssessClientFacade.selectedClassroom || null,
            studentOrTeacher: codeAssessClientFacade.studentOrTeacher || null,
            selectedClassroomIdx: getSelectedClassroomIdx(codeAssessClientFacade.classes, codeAssessClientFacade.selectedClassroom),
        };
    }

    componentDidMount() {
        mv2Interface.startCodeAssesSession();

        codeAssessClientFacade.subscribe(USER_LOGGED_IN_SUBSCRIPTION, PublishedEventsEnum.USER_LOGGED_IN, this.onUserLoggedIn);
        codeAssessClientFacade.subscribe(CLASS_LIST_RECEIVED_SUBSCRIPTION, PublishedEventsEnum.CLASS_LIST_RECEIVED, this.onClassListReceived);
        codeAssessClientFacade.subscribe(CLASS_SELECTED_SUBSCRIPTION, PublishedEventsEnum.CLASS_SELECTED, this.classSelected);
        codeAssessClientFacade.subscribe(CLASS_UPDATED_SUBSCRIPTION, PublishedEventsEnum.CLASS_UPDATED, this.onClassUpdated);
        codeAssessClientFacade.subscribe(STUDENT_OR_TEACHER_CHANGED_SUBSCRIPTION, PublishedEventsEnum.STUDENT_OR_TEACHER_CHANGED, this.studentOrTeacherChanged);
        codeAssessClientFacade.subscribe(SESSION_CREATED_SUBSCRIPTION, PublishedEventsEnum.SESSION_CREATED, this.onSessionCreated);
        codeAssessClientFacade.subscribe(SESSION_STOPPED_SUBSCRIPTION, PublishedEventsEnum.SESSION_STOPPED, this.onSessionStopped);
        codeAssessClientFacade.subscribe(STUDENT_JOINED_SESSION_SUBSCRIPTION, PublishedEventsEnum.STUDENT_JOINED_SESSION, this.onStudentJoinedSession);
        codeAssessClientFacade.subscribe(STUDENT_ACTIVATED_SUBSCRIPTION, PublishedEventsEnum.STUDENT_ACTIVATED, this.onStudentActivated);
        codeAssessClientFacade.subscribe(STUDENT_DEACTIVATED_SUBSCRIPTION, PublishedEventsEnum.STUDENT_DEACTIVATED, this.onStudentDeactivated);
        codeAssessClientFacade.subscribe(STUDENT_EXITED_SESSION_SUBSCRIPTION, PublishedEventsEnum.STUDENT_EXITED_SESSION, this.onStudentExitedSession);
        codeAssessClientFacade.subscribe(CLASS_ANNOUNCEMENT_ADDED_SUBSCRIPTION, PublishedEventsEnum.CLASS_ANNOUNCEMENT_ADDED, this.onClassAnnouncementAdded);
        codeAssessClientFacade.subscribe(SESSION_ANNOUNCEMENT_ADDED_SUBSCRIPTION, PublishedEventsEnum.SESSION_ANNOUNCEMENT_ADDED, this.onSessionAnnouncementAdded);
        codeAssessClientFacade.subscribe(QUESTION_ADDED_SUBSCRIPTION, PublishedEventsEnum.QUESTION_ADDED, this.onQuestionAdded);
        codeAssessClientFacade.subscribe(ANSWER_CREATED_SUBSCRIPTION, PublishedEventsEnum.ANSWER_CREATED, this.onAnswerCreated);
        codeAssessClientFacade.subscribe(ANSWER_UPDATED_SUBSCRIPTION, PublishedEventsEnum.ANSWER_UPDATED, this.onAnswerUpdated);
        codeAssessClientFacade.subscribe(CLASS_ANNOUNCEMENT_SEEN_SUBSCRIPTION, PublishedEventsEnum.CLASS_ANNOUNCEMENT_SEEN, this.onClassAnnouncementSeen);
        codeAssessClientFacade.subscribe(SESSION_ANNOUNCEMENT_SEEN_SUBSCRIPTION, PublishedEventsEnum.SESSION_ANNOUNCEMENT_SEEN, this.onSessionAnnouncementSeen);
        codeAssessClientFacade.subscribe(CODE_SUBMISSION_CREATED_SUBSCRIPTION, PublishedEventsEnum.CODE_SUBMISSION_CREATED, this.onCodeSubmissionCreated);
        codeAssessClientFacade.subscribe(CODE_SUBMISSION_UPDATED_SUBSCRIPTION, PublishedEventsEnum.CODE_SUBMISSION_UPDATED, this.onCodeSubmissionUpdated);
        codeAssessClientFacade.subscribe(CODE_SUBMISSION_REMOVED_SUBSCRIPTION, PublishedEventsEnum.CODE_SUBMISSION_REMOVED, this.onCodeSubmissionRemoved);
        codeAssessClientFacade.subscribe(CLASS_ANNOUNCEMENT_REMOVED_SUBSCRIPTION, PublishedEventsEnum.CLASS_ANNOUNCEMENT_REMOVED, this.onClassAnnouncementRemoved);
        codeAssessClientFacade.subscribe(SESSION_ANNOUNCEMENT_REMOVED_SUBSCRIPTION, PublishedEventsEnum.SESSION_ANNOUNCEMENT_REMOVED, this.onSessionAnnouncementRemoved);
        codeAssessClientFacade.subscribe(SESSION_TITLE_UPDATED_SUBSCRIPTION, PublishedEventsEnum.SESSION_TITLE_UPDATED, this.onSessionTitleUpdated);
        codeAssessClientFacade.subscribe(STUDENT_SESSION_DATA_UPDATED_SUBSCRIPTION, PublishedEventsEnum.STUDENT_SESSION_DATA_UPDATED, this.onStudentSessionDataUpdated);
    }

    componentWillUnmount() {
        codeAssessClientFacade.unsubscribe(USER_LOGGED_IN_SUBSCRIPTION);
        codeAssessClientFacade.unsubscribe(CLASS_LIST_RECEIVED_SUBSCRIPTION);
        codeAssessClientFacade.unsubscribe(CLASS_SELECTED_SUBSCRIPTION);
        codeAssessClientFacade.unsubscribe(CLASS_UPDATED_SUBSCRIPTION);
        codeAssessClientFacade.unsubscribe(STUDENT_OR_TEACHER_CHANGED_SUBSCRIPTION);
        codeAssessClientFacade.unsubscribe(SESSION_CREATED_SUBSCRIPTION);
        codeAssessClientFacade.unsubscribe(SESSION_STOPPED_SUBSCRIPTION);
        codeAssessClientFacade.unsubscribe(STUDENT_JOINED_SESSION_SUBSCRIPTION);
        codeAssessClientFacade.unsubscribe(STUDENT_ACTIVATED_SUBSCRIPTION);
        codeAssessClientFacade.unsubscribe(STUDENT_DEACTIVATED_SUBSCRIPTION);
        codeAssessClientFacade.unsubscribe(STUDENT_EXITED_SESSION_SUBSCRIPTION);
        codeAssessClientFacade.unsubscribe(CLASS_ANNOUNCEMENT_ADDED_SUBSCRIPTION);
        codeAssessClientFacade.unsubscribe(SESSION_ANNOUNCEMENT_ADDED_SUBSCRIPTION);
        codeAssessClientFacade.unsubscribe(QUESTION_ADDED_SUBSCRIPTION);
        codeAssessClientFacade.unsubscribe(ANSWER_CREATED_SUBSCRIPTION);
        codeAssessClientFacade.unsubscribe(ANSWER_UPDATED_SUBSCRIPTION);
        codeAssessClientFacade.unsubscribe(CLASS_ANNOUNCEMENT_SEEN_SUBSCRIPTION);
        codeAssessClientFacade.unsubscribe(SESSION_ANNOUNCEMENT_SEEN_SUBSCRIPTION);
        codeAssessClientFacade.unsubscribe(CODE_SUBMISSION_CREATED_SUBSCRIPTION);
        codeAssessClientFacade.unsubscribe(CODE_SUBMISSION_UPDATED_SUBSCRIPTION);
        codeAssessClientFacade.unsubscribe(CODE_SUBMISSION_REMOVED_SUBSCRIPTION);
        codeAssessClientFacade.unsubscribe(CLASS_ANNOUNCEMENT_REMOVED_SUBSCRIPTION);
        codeAssessClientFacade.unsubscribe(SESSION_ANNOUNCEMENT_REMOVED_SUBSCRIPTION);
        codeAssessClientFacade.unsubscribe(SESSION_TITLE_UPDATED_SUBSCRIPTION);
        codeAssessClientFacade.unsubscribe(STUDENT_SESSION_DATA_UPDATED_SUBSCRIPTION);
    }

    onStudentSessionDataUpdated(updatedClass) {
        this.setState({ selectedClassroom: updatedClass });
    }
    
    onClassUpdated(updatedClass) {
        this.setState({ selectedClassroom: updatedClass });
    }

    onClassAnnouncementRemoved(updatedClass) {
        this.setState({ selectedClassroom: updatedClass });
    }

    onSessionAnnouncementRemoved(updatedClass) {
        this.setState({ selectedClassroom: updatedClass });
    }

    onCodeSubmissionRemoved(updatedClass) {
        this.setState({ selectedClassroom: updatedClass });
    }

    onCodeSubmissionCreated(updatedClass) {
        this.setState({ selectedClassroom: updatedClass });
    }

    onCodeSubmissionUpdated(updatedClass) {
        this.setState({ selectedClassroom: updatedClass });
    }

    onClassAnnouncementSeen(updatedClass) {
        this.setState({ selectedClassroom: updatedClass });
    }

    onSessionAnnouncementSeen(updatedClass) {
        this.setState({ selectedClassroom: updatedClass });
    }

    async onAnswerUpdated(updatedClass) {
        this.setState({ selectedClassroom: updatedClass });
    }

    async onAnswerCreated(updatedClass) {
        this.setState({ selectedClassroom: updatedClass });
    }

    async loginAsTeacher(teacherNumber) {
        await codeAssessTesting.loginAsTeacher(teacherNumber);
    }

    async loginAsStudent(studentNumber) {
        await codeAssessTesting.loginAsStudent(studentNumber);
    }


    onQuestionAdded(updatedClass) {
        this.setState({ selectedClassroom: updatedClass });
    }

    onSessionAnnouncementAdded(updatedClass) {
        // if this user is a student, show the announcement
        if (this.state.studentOrTeacher === StudentOrTeacherEnum.STUDENT) {
            
        }
        this.setState({ selectedClassroom: updatedClass });
    }

    onClassAnnouncementAdded(updatedClass) {
        this.setState({ selectedClassroom: updatedClass });
    }

    onStudentExitedSession(updatedClass) {
        this.setState({ selectedClassroom: updatedClass });
    }

    onStudentDeactivated(updatedClass) {
        this.setState({ selectedClassroom: updatedClass });
    }

    onStudentActivated(updatedClass) {
        this.setState({ selectedClassroom: updatedClass });
    }

    onStudentJoinedSession(updatedClass) {
        this.setState({ selectedClassroom: updatedClass });
    }

    onSessionStopped(updatedClass) {
        this.setState({ selectedClassroom: updatedClass });
    }

    onSessionCreated(updatedClass) {
        this.setState({ selectedClassroom: updatedClass });
    }

    studentOrTeacherChanged(studentOrTeacher) {
        this.setState({ studentOrTeacher });
    }

    classSelected(selectedClassroom) {
        this.setState({ selectedClassroom });
    }

    onUserLoggedIn(userProfile) {
        this.setState({ userProfile });
    }

    onClassListReceived(classes) {
        this.setState({ classes });
    }

    onSessionTitleUpdated(updatedClass) {
        this.setState({ selectedClassroom: updatedClass });
    }

    async loginHandler() {
        await codeAssessClientFacade.logUserIn(ProvidersEnum.GOOGLE);
    }

    async handleRefreshToken() {
        await codeAssessClientFacade.refreshAccessToken();
    }

    async handleClassSelect(classId, classroomIdx) {
        this.setState({ selectedClassroomIdx: classroomIdx });
        await codeAssessClientFacade.selectClass(classId);
    }

    async handleTestingClassSelect(classId) {
        await codeAssessTesting.selectClass(classId);
    }

    render() {

        return (
            <MartyCodeAssess
                vm={this.props.vm}
                userProfile={this.state.userProfile}
                classes={this.state.classes}
                selectedClassroom={this.state.selectedClassroom}
                onClassSelect={this.handleClassSelect}
                studentOrTeacher={this.state.studentOrTeacher}
                codeAssessClientFacade={codeAssessClientFacade}
                selectedClassroomIdx={this.state.selectedClassroomIdx}
            />
        );
    }
}

CodeAssessTab.propTypes = {
};

export default errorBoundaryHOC('CodeAssess')(
    injectIntl(CodeAssessTab)
);


const getSelectedClassroomIdx = (classes, selectedClassroom) => {
    if (!selectedClassroom || !classes || classes.length === 0) {
        return null;
    }
    const foundIdx = classes.findIndex((cls) => cls.id === selectedClassroom.id);
    if (foundIdx === -1) {
        return null;
    }
    return foundIdx;
}