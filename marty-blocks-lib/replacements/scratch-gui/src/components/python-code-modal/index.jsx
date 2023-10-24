import Prism from "prismjs";
import "prismjs/components/prism-python";
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/themes/prism-okaidia.css";

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
            <>
                <Box className={styles.body}>
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
