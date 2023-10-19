import Prism from "prismjs";
import "prismjs/components/prism-python";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/themes/prism-okaidia.css";

import React from "react";

import Box from "../box/box.jsx";
import Modal from "../../containers/modal.jsx";

import styles from "./styles.css";
import bindAll from "lodash.bindall";

class PythonCodeModal extends React.Component {
    constructor(props) {
        super(props);
        this.ref = null;
        this.setRef = (element) => {
            this.ref = element;
            this.highlight();
        };
        bindAll(this, [
            "onHelp"
        ]);

        this.state = {
            helpModalVisible: false
        };
    }
    componentDidMount() {
        this.highlight();
    }
    componentDidUpdate() {
        this.highlight();
    }
    highlight = () => {
        if (this.ref) {
            Prism.highlightElement(this.ref);
        }
    }
    onCopyToClipboard = () => {
        navigator.clipboard.writeText(this.props.code);
    }

    onHelp = () => {
        this.setState({ helpModalVisible: true });
    }

    render() {
        return (
            <Modal
                id={styles.modalContent}
                className={styles.modalContent}
                headerClassName={styles.header}
                contentLabel={"Python (βeta -- May contain bugs!)"}
                onRequestClose={this.props.onCancel}
                onHelp={this.onHelp}
                fullScreen
                textOnTopRightCornerFullScreen="Copy to Clipboard"
                onTopRightCornerClick={this.onCopyToClipboard}
            >
                {
                    this.state.helpModalVisible && <Modal
                        id={styles.helpModalContent}
                        className={styles.helpModalContent}
                        headerClassName={styles.header}
                        contentLabel={"How to run the Python code"}
                        onRequestClose={() => this.setState({ helpModalVisible: false })}
                    >
                        <Box className={styles.body}>
                            <div className={styles.container}>
                                <div className={styles.step}>
                                    <div className={styles.circle}>1</div>
                                    <div className={styles.description}>Install Python & martypy</div>
                                </div>
                                <div className={styles.step}>
                                    <div className={styles.circle}>2</div>
                                    <div className={styles.description}>Connect your marty to wifi or USB</div>
                                </div>
                                <div className={styles.step}>
                                    <div className={styles.circle}>3</div>
                                    <div className={styles.description}>Copy & paste the code into a file</div>
                                </div>
                                <div className={styles.step}>
                                    <div className={styles.circle}>4</div>
                                    <div className={styles.description}>Run the code!</div>
                                </div>
                                <a href="https://userguides.robotical.io/martyv2/userguides/python/setting_up_python_on_your_computer"
                                    target="_blank" rel="noopener noreferrer"
                                    className={styles.help_button}>Show me how!</a>
                            </div>
                        </Box>
                    </Modal>
                }
                <Box className={styles.body}>
                    <Box style={{ height: "100%" }}>
                        <pre style={{ "userSelect": "text" }}>
                            <code ref={this.setRef} className="language-python" style={{ "userSelect": "text" }}>
                                {this.props.code.trim()}
                            </code>
                        </pre>
                    </Box>
                </Box>
            </Modal>
        );
    }
}

PythonCodeModal.propTypes = {};

export default PythonCodeModal;
