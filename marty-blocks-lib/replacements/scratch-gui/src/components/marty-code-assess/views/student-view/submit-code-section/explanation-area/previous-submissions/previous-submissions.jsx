import React from 'react';
import styles from "./previous-submissions.css";
import FilePlusIcon from "../../../../../icon--file-remove.svg";
import bindAll from 'lodash.bindall';
import Spinner from '../../../../../../spinner/spinner.jsx';
import spinnerStyles from '../../../../../../spinner/spinner.css';

const codeAssessClientFacade = window.codeAssess.codeAssessLib.default.getInstance();
const PublishedEventsEnum = window.codeAssess.codeAssessLib.PublishedEventsEnum;

const CODE_SUBMISSION_REMOVED_SUBSCRIPTION = "CODE_SUBMISSION_REMOVED_previous_submissions";

export default class PreviousSubmissions extends React.Component {

    constructor(props) {
        super(props);
        bindAll(this, [
            "handleRemoveSubmission",
            "previousSubmissionRemoved"
        ]);

        this.state = {
            isLoading: false
        }
    }

    componentDidMount() {
        codeAssessClientFacade.subscribe(CODE_SUBMISSION_REMOVED_SUBSCRIPTION, PublishedEventsEnum.CODE_SUBMISSION_REMOVED, this.previousSubmissionRemoved);
    }

    componentWillUnmount() {
        codeAssessClientFacade.unsubscribe(CODE_SUBMISSION_REMOVED_SUBSCRIPTION);
    }

    async previousSubmissionRemoved() {
        await this.props.fetchPreviousSubmissions();
        this.setState({ isLoading: false });
    }

    async handleRemoveSubmission(submissionId) {
        this.setState({ isLoading: true });
        await codeAssessClientFacade.removeCodeSubmission(submissionId);
    }

    render() {
        return this.state.isLoading ?
            <Spinner className={[spinnerStyles.spinner, styles.spinner].join(" ")} /> :
            <div className={styles.submissionsList}>
                {this.props.previousSubmissions.map((submission) => {
                    return <div key={submission.id} className={styles.submission}>
                        <img src={FilePlusIcon} className={styles.fileIcon} onClick={() => this.handleRemoveSubmission(submission.id)} />
                        <div className={styles.submissionName}>{submission.title}</div>
                    </div>
                })}
            </div>
    }
}