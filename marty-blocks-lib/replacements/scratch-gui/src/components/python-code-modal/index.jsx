import Prism from "prismjs";
import "prismjs/components/prism-python";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/themes/prism-okaidia.css";
import IconCopy from "./icon--copy.svg";

import React from "react";

import Box from "../box/box.jsx";

import styles from "./styles.css";

class PythonCodeModal extends React.Component {
    constructor(props) {
        super(props);
        this.ref = null;
        this.setRef = (element) => {
            this.ref = element;
            this.highlight();
        };
        this.state = {
            isCopied: false
        };
    }

    componentDidMount() {
        this.highlight();
    }
    componentDidUpdate(prevProps, prevState) {
        this.highlight();
        if (this.state.isCopied !== prevState.isCopied) {
            setTimeout(() => {
                this.setState({ isCopied: false });
            }, 2000);
        }
    }

    highlight = () => {
        if (this.ref) {
            Prism.highlightElement(this.ref);
        }
    }
    onCopyToClipboard = () => {
        navigator.clipboard.writeText(this.props.code);
        this.setState({ isCopied: true });
    }

    render() {
        return (
            <>
                <Box className={styles.body}>
                    <Box className={styles.header}>
                        <button className={styles.cpToClipboardBtn} onClick={this.onCopyToClipboard}> {this.state.isCopied ? "Copied!" : "Copy to clipboard"} <img
                            className={styles.cpToClipboardBtnIcon}
                            draggable={false}
                            src={IconCopy}
                        /></button>
                    </Box>
                    <Box style={{ height: "100%" }}>
                        <pre style={{ "userSelect": "text" }}>
                            <code ref={this.setRef} className="language-python" style={{ "userSelect": "text" }}>
                                {this.props.code.trim()}
                            </code>
                        </pre>
                    </Box>
                </Box>
            </>
        );
    }
}

PythonCodeModal.propTypes = {};

export default PythonCodeModal;
