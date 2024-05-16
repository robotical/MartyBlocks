import React from 'react';
import styles from "./code-submission-modal.css";
import Spinner from '../../../../../../../spinner/spinner.jsx';
import spinnerStyles from '../../../../../../../spinner/spinner.css';

export default class CodeSubmissionModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            submissionCode: null
        }
    }

    componentDidMount() {
        const { codeSubmission } = this.props;

        const asyncFunc = async () => {
            this.setState({ isLoading: true });
            const submissionCode = await new Promise((resolve) => setTimeout(resolve, 1000));
            this.setState({ submissionCode, isLoading: false });
        };


        asyncFunc();
    }



    render() {
        const { codeSubmission } = this.props;

        return <div className={styles.codeSubmissionModalContainer}>
            <div className={styles.codeArea}>

            </div>
            <div className={styles.explanationArea}>
                <span className={styles.explanationTitle}>{codeSubmission.title}</span>
                <div className={styles.explanationText}>{codeSubmission.explanation} - Explanation</div>
            </div>
        </div>
    }
}