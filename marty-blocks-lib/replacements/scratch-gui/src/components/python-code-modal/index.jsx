import Prism from "prismjs";
import "prismjs/components/prism-python";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/themes/prism-okaidia.css";

import { defineMessages, FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import React from "react";

import Box from "../box/box.jsx";
import Modal from "../../containers/modal.jsx";

import styles from "./styles.css";

class PythonCodeModal extends React.Component {
    constructor(props) {
        super(props);
        this.ref = null;
        this.setRef = (element) => {
            this.ref = element;
            this.highlight();
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

    render() {
        return (
            <Modal
                id={styles.modalContent}
                className={styles.modalContent}
                contentLabel={"Python Code"}
                onRequestClose={this.props.onCancel}
            >
                <Box className={styles.body}>
                    <Box>
                        <pre style={{"userSelect": "text"}}>
                            <code ref={this.setRef} className="language-python" style={{"userSelect": "text"}}>
                                {this.props.code.trim()}
                            </code>
                        </pre>
                    </Box>

                    <Box className={styles["button-row"]}>
                        <button
                            className={styles["ok-button"]}
                            onClick={this.onCopyToClipboard}
                        >
                            <FormattedMessage
                                defaultMessage="Copy"
                                description="Button in modal to copy code to clipboard"
                                id="gui.prompt.copy"
                            />
                        </button>
                    </Box>
                </Box>
            </Modal>
        );
    }
}

PythonCodeModal.propTypes = {};

export default PythonCodeModal;
