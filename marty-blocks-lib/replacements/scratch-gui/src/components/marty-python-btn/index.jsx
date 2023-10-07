import React from "react";

import styles from "./styles.css";
import pythonLogo from "./python-logo.png";
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
                this.setState({ code: re });
                this.setState({ modalVisible: true });
                console.log(re);
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
