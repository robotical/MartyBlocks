import React from 'react';
import styles from "./code-submission-modal.css";
import Spinner from '../../../../../../../spinner/spinner.jsx';
import spinnerStyles from '../../../../../../../spinner/spinner.css';
import bindAll from "lodash.bindall";

export default class CodeSubmissionModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            submissionCode: null
        }

        bindAll(this, [
            "onIframeLoad",
            "setIframeRef",
        ]);

        this.iframeRef = null;
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

    setIframeRef(iframeRef) {
        this.iframeRef = iframeRef;
    }

    async onIframeLoad() {
        // send the project data down to iframe
        const projectIdInDB = "AdditionWithMarty";
        const dbUrl =
            "https://martyblocks-projects-default-rtdb.europe-west1.firebasedatabase.app/projects/";
        const res = await fetch(dbUrl + projectIdInDB + ".json");
        const projectBase64String = await res.json();
        if (!projectBase64String || !projectBase64String.data) {
            throw new Error("Invalid project id");
        }
        const blob = await fetch(projectBase64String.data);
        const arrayBuffer = await blob.arrayBuffer();
        this.iframeRef.contentWindow.postMessage({ data: arrayBuffer });
    }


    render() {
        const { codeSubmission } = this.props;

        return <div className={styles.codeSubmissionModalContainer}>
            <div className={styles.codeArea}>
                {
                    this.state.isLoading ?
                        <Spinner className={spinnerStyles.spinner} /> :
                        <iframe
                            ref={this.setIframeRef}
                            src='https://code-assess-playground.web.app'
                            onLoad={this.onIframeLoad}
                            className={styles.iframe}
                        />
                }
            </div>
            <div className={styles.explanationArea}>
                <span className={styles.explanationTitle}>{codeSubmission.title}</span>
                <div className={styles.explanationText}>{codeSubmission.explanation} - Explanation</div>
            </div>
        </div>
    }
}