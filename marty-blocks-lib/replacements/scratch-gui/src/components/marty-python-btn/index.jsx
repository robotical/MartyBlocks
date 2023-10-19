import React from "react";

import styles from "./styles.css";
import pythonLogo from "./icon--show-code.svg";
import PythonCodeModal from "../python-code-modal/index.jsx";

export default class MartyPythonButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            code: "",
        };
        this.clickHandler = this.clickHandler.bind(this);
    }

    componentDidMount() {
        pythonTranspiler.setModal = (code) => {
            this.setState({ code: code });
            this.setState({ modalVisible: true });
        }
    }

    clickHandler() {
        pythonTranspiler
            .fromSb3JSON(JSON.parse(vm.toJSON()), { getAsset: () => {} })
            .then((r) => r.toPython())
            .then((re) => {
                if (re.trim() === "") {
                    re = `
# Uh-oh! We can't find any Marty Blocks.
# To see what your project would look like in code, don't forget to add some Marty Blocks!
`;
                }
                this.setState({ code: re });
                this.setState({ modalVisible: true });
            });
    }

    render = () => (
        <>
            {this.state.modalVisible && (
                <PythonCodeModal
                    onCancel={() => this.setState({ modalVisible: false })}
                    code={this.state.code}
                />
            )}
            <img
                className={styles.icon}
                src={pythonLogo}
                alt="Python Logo"
                onClick={this.clickHandler}
            />
        </>
    );
}
