import React from "react";
import { connect } from 'react-redux';

import styles from "./styles.css";
import pythonLogo from "./icon--show-code.svg";
import PythonCodeModal from "../python-code-modal/index.jsx";
import { activateDraggableModal } from "../../reducers/draggable-modal";
import ModalComponent from "../modal/modal.jsx";
import Box from "../box/box.jsx";

class MartyPythonButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            helpModalVisible: false,
            code: "",
        };
        this.clickHandler = this.clickHandler.bind(this);
    }

    componentDidMount() {
        pythonTranspiler.setModal = (code) => {
            this.setState({ code: code });
            this.props.onOpenPythonModal(<PythonCodeModal
                code={this.state.code}
            />, "Python (βeta -- May contain bugs!)", () => this.setState({ helpModalVisible: true }));
            
        }
    }

    clickHandler() {
        pythonTranspiler
            .fromSb3JSON(JSON.parse(vm.toJSON()), { getAsset: () => { } })
            .then((r) => r.toPython())
            .then((re) => {
                if (re.trim() === "") {
                    re = `
# Uh-oh! We can't find any Marty Blocks.
# To see what your project would look like in code, 
# don't forget to add some Marty Blocks!
`;
                }
                this.setState({ code: re });
                // this.setState({ modalVisible: true });
                this.props.onOpenPythonModal(<PythonCodeModal
                    code={this.state.code}
                />, "Python (βeta -- May contain bugs!)", () => this.setState({ helpModalVisible: true }));
            });
    }

    render = () => (
        <>
            {
                this.state.helpModalVisible && <ModalComponent
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
                </ModalComponent>
            }
            <img
                className={styles.icon}
                src={pythonLogo}
                alt="Python Logo"
                onClick={this.clickHandler}
            />
        </>
    );
}


const mapDispatchToProps = dispatch => ({
    onOpenPythonModal: (content, title, onHelp) => dispatch(activateDraggableModal(content, title, onHelp)),
});

export default connect(
    null,
    mapDispatchToProps
)(MartyPythonButton);
