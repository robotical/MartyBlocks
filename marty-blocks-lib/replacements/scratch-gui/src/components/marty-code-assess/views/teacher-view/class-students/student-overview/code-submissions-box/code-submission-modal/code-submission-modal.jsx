import React from 'react';
import styles from "./code-submission-modal.css";
import Spinner from '../../../../../../../spinner/spinner.jsx';
import spinnerStyles from '../../../../../../../spinner/spinner.css';
import bindAll from "lodash.bindall";

export default class CodeSubmissionModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            submissionCode: null
        }

        bindAll(this, [
            "onIframeLoad",
            "setIframeRef",
        ]);

        this.iframeRef = null;
    }

    componentDidMount() {
    }

    setIframeRef(iframeRef) {
        this.iframeRef = iframeRef;
    }

    async onIframeLoad() {
        // TODO: get data from code url and load them
        /*
        const projectBase64String = await res.json();
        if (!projectBase64String || !projectBase64String.data) {
            throw new Error("Invalid project id");
        }
        const blob = await fetch(projectBase64String.data);
        const arrayBuffer = await blob.arrayBuffer();
        */
        const submissionCode = await new Promise((resolve) => setTimeout(resolve, 1000));

        console.log("iframe loaded, sending message")
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
        // wait a few more seconds to make sure the UI is loaded
        await new Promise(resolve => setTimeout(resolve, 5000))
        this.setState({ isLoading: false });
        this.iframeRef.contentWindow.postMessage({ codeSubmissionData: arrayBuffer }, 'https://code-assess-playground.web.app/');
    }


    render() {
        const { codeSubmission } = this.props;

        return <div className={styles.codeSubmissionModalContainer}>
            <div className={styles.codeArea}>
                {this.state.isLoading && <Spinner className={[spinnerStyles.spinner, styles.spinner].join(" ")} />}
                <iframe
                    ref={this.setIframeRef}
                    src='https://code-assess-playground.web.app'
                    onLoad={this.onIframeLoad}
                    style={{ visibility: this.state.isLoading ? "hidden" : "visible" }}
                    className={styles.iframe}
                />
            </div>
            <div className={styles.explanationArea}>
                <span className={styles.explanationTitle}>{codeSubmission.title}</span>
                <div className={styles.explanationText}>{codeSubmission.explanation} - Explanation</div>
            </div>
        </div>
    }
}