import React from "react"
import styles from "./create-or-join-class.css"
import Modal from "../../../../containers/modal.jsx";
import bindAll from 'lodash.bindall';
import CreateClassModal from "./create-class-modal/create-class-modal.jsx";
import JoinClassModal from "./join-class-modal/join-class-modal.jsx";
// const ProvidersEnum = window.codeAssess.codeAssessLib.ProvidersEnum;

class CreateOrJoinClass extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            createClassModalVisible: false,
            joinClassModalVisible: false
        }

        bindAll(this, [
            'onCloseCreateClassModal',
            'onShowCreateClassModal',
            'onCloseJoinClassModal',
            'onShowJoinClassModal'
        ]);
    }

    componentDidMount() {
    }

    onCloseCreateClassModal() {
        this.setState({ createClassModalVisible: false });
    }

    onShowCreateClassModal() {
        this.setState({ createClassModalVisible: true });
    }

    onCloseJoinClassModal() {
        this.setState({ joinClassModalVisible: false });
    }

    onShowJoinClassModal() {
        this.setState({ joinClassModalVisible: true });
    }

    render() {


        return (
            <>
                {this.state.createClassModalVisible &&
                    <Modal
                        onRequestClose={this.onCloseCreateClassModal}
                        fullScreen={false}
                        className={styles.modal}
                        id="gui.martyCodeAssess.createClass.modal"
                        contentLabel={"Create a new class"}
                    >
                        <CreateClassModal onCloseModal={this.onCloseCreateClassModal} />
                    </Modal>
                }
                {this.state.joinClassModalVisible &&
                    <Modal
                        onRequestClose={this.onCloseJoinClassModal}
                        fullScreen={false}
                        className={styles.modal}
                        id="gui.martyCodeAssess.joinClass.modal"
                        contentLabel={"Join a class"}
                    >
                        <JoinClassModal onCloseModal={this.onCloseJoinClassModal} />
                    </Modal>
                }

                <div className={styles.welcomeContainer}>
                    <p className={styles.subtitle}>Add a class to get started</p>
                    <div className={styles.createOrJoinClassButtonsContainer}>
                        <button className={[styles.createOrJoinClassButton, styles.joinClassBtn].join(" ")} onClick={this.onShowJoinClassModal}>Join a class</button>
                        <button className={[styles.createOrJoinClassButton, styles.createClassBtn].join(" ")} onClick={this.onShowCreateClassModal}>Create a class</button>
                    </div>
                </div>
            </>
        )
    }
}

export default CreateOrJoinClass;