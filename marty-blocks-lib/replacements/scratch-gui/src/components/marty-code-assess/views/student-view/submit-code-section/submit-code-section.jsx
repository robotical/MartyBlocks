import React from "react";
import styles from "./submit-code-section.css";
import Spinner from '../../../../spinner/spinner.jsx';
import spinnerStyles from '../../../../spinner/spinner.css';
import bindAll from "lodash.bindall";
import { blobToBase64 } from '../../../../../lib/save-load-utils.js';
import ExplanationArea from "./explanation-area/explanation-area.jsx";

export default class SubmitCodeSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            projectDataContents: null,
        }

        bindAll(this, [
            "onIframeLoad",
            "setIframeRef",
        ]);

    }

    componentDidMount() {
    }

    setIframeRef(iframeRef) {
        this.iframeRef = iframeRef;
    }

    async onIframeLoad() {
        console.log("iframe loaded, sending message")
        const sb3Content = await vm.saveProjectSb3();
        const dataContents = await blobToBase64(sb3Content);
        const data = { contents: dataContents }
        // const data = await mv2Interface.loadScratchFile("__autosave");
        if (data && data.contents) {
            this.setState({ projectDataContents: data.contents });
            const blob = await fetch(data.contents);
            const arrayBuffer = await blob.arrayBuffer();
            // wait a few more seconds to make sure the UI is loaded
            await new Promise(resolve => setTimeout(resolve, 8000))
            this.iframeRef.contentWindow.postMessage({ codeSubmissionData: arrayBuffer }, 'https://code-assess-playground.web.app/');
            this.setState({ isLoading: false });
        } else {
            this.setState({ isLoading: false });
        }
    }

    render() {
        const { selectedClassroom, student } = this.props;

        return <div className={styles.submitCodeSectionContainer}>
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
                <ExplanationArea
                    selectedClassroom={selectedClassroom}
                    student={student}
                    projectDataContents={this.state.projectDataContents}
                />
            </div>
        </div>
    }
}