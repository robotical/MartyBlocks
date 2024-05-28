import React from 'react';
import styles from "./explanation-area.css";
import bindAll from 'lodash.bindall';
import FilePlusIcon from "../../../../icon--file-plus.svg";
import Spinner from '../../../../../spinner/spinner.jsx';
import spinnerStyles from '../../../../../spinner/spinner.css';
import { blobToBase64 } from '../../../../../../lib/save-load-utils.js';
import PreviousSubmissions from './previous-submissions/previous-submissions.jsx';

const codeAssessClientFacade = window.codeAssess.codeAssessLib.default.getInstance();
const PublishedEventsEnum = window.codeAssess.codeAssessLib.PublishedEventsEnum;

const CODE_SUBMISSION_CREATED_SUBSCRIPTION = "CODE_SUBMISSION_CREATED_explanation_area";

export default class ExplanationArea extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            submissionName: "",
            previousSubmissions: [],
            codeExplanation: "",
            isLoading: false,
            uploadProgress: 0,
        }

        bindAll(this, [
            "handleSubmissionNameChange",
            "handleCodeExplanationChange",
            "handleSaveCode",
            "fetchPreviousSubmissions",
            "onCodeSubmissionCreated",
            "onUploadProgress"
        ]);
    }

    componentDidMount() {
        codeAssessClientFacade.subscribe(CODE_SUBMISSION_CREATED_SUBSCRIPTION, PublishedEventsEnum.CODE_SUBMISSION_CREATED, this.onCodeSubmissionCreated);
        this.fetchPreviousSubmissions();
    }

    componentWillUnmount() {
        codeAssessClientFacade.unsubscribe(CODE_SUBMISSION_CREATED_SUBSCRIPTION);
    }

    onCodeSubmissionCreated() {
        this.setState({ isLoading: false });
        this.fetchPreviousSubmissions();
    }

    onUploadProgress(progressEvent) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        this.setState({ uploadProgress: progress });
    }


    async fetchPreviousSubmissions() {
        console.log("fetching previous submissions");
        const updatedClassroom = await codeAssessClientFacade.fetchStudentCodeSubmissions(this.props.student.id);
        console.log("updatedClassroom", updatedClassroom)
        const selectedStudent = updatedClassroom.students.find(s => s.id === this.props.student.id);
        if (!selectedStudent) return;
        const thisSessionCodeSubmissions = selectedStudent.studentCodeSubmissions.filter(submission => submission.sessionId === updatedClassroom.activeSession?.id);
        console.log("thisSessionCodeSubmissions", thisSessionCodeSubmissions);
        this.setState({ previousSubmissions: thisSessionCodeSubmissions })
    }


    handleSubmissionNameChange(event) {
        this.setState({ submissionName: event.target.value });
    }

    handleCodeExplanationChange(event) {
        this.setState({ codeExplanation: event.target.value });
    }

    async handleSaveCode() {
        if (!this.props.selectedClassroom.activeSession || !this.props.projectDataContents) return;
        this.setState({ isLoading: true });
        try {

            const sb3Content = await vm.saveProjectSb3();
            const dataContents = await blobToBase64(sb3Content);
            if (dataContents) {
                console.log("submitting code")
                await codeAssessClientFacade.submitCode(this.state.submissionName, dataContents, this.state.codeExplanation, this.onUploadProgress);
            } else {
                alert("There's no code in the editor. Please add some code before submitting!");
                this.setState({ isLoading: false });
            }
        } catch (error) {
            console.error("Error saving code", error);
            alert("There was an error saving your code. Please try again.");
            this.setState({ isLoading: false });
        }
    }

    render() {
        const { selectedClassroom } = this.props;

        const canSubmitCode = selectedClassroom.activeSession && this.state.submissionName && this.state.codeExplanation && this.props.projectDataContents;

        return this.state.isLoading ? <>
            <Spinner className={[spinnerStyles.spinner, styles.spinner].join(" ")} />
            {this.state.uploadProgress > 0 && <div className={styles.uploadProgress}>{this.state.uploadProgress}%</div>}
        </> :
            <div className={styles.explanationAreaContainer}>
                <div className={styles.submissionNameInputContainer}>
                    <input
                        className={styles.submissionNameInput}
                        placeholder='"Submission Name"'
                        value={this.state.submissionName}
                        onChange={this.handleSubmissionNameChange}
                    />
                </div>
                <div className={styles.sep}></div>
                <div className={styles.previousSubmissionsContainer}>
                    <PreviousSubmissions
                        previousSubmissions={this.state.previousSubmissions}
                        fetchPreviousSubmissions={this.fetchPreviousSubmissions}
                    />
                </div>
                <div className={styles.codeExplanationTitleContainer}>
                    Code explanation:
                </div>
                <div className={styles.explanationContainer}>
                    <textarea
                        className={styles.explanationInput}
                        placeholder="Explain your code here"
                        value={this.state.codeExplanation}
                        onChange={this.handleCodeExplanationChange}
                    />
                </div>
                <div
                    onClick={this.handleSaveCode}
                    className={[styles.saveCodeContainer, canSubmitCode ? "" : styles.saveCodeContainerDisabled].join(" ")}
                >
                    <img src={FilePlusIcon} className={styles.saveCodeIcon} />
                    <span className={styles.saveCodeText}>Save Code</span>
                </div>
            </div>
    }
}

