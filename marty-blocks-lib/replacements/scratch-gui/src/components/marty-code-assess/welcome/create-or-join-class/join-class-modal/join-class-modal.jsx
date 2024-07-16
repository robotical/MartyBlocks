import React from "react";
import styles from "./join-class-modal.css";
import Spinner from '../../../../spinner/spinner.jsx';
import spinnerStyles from '../../../../spinner/spinner.css';

const codeAssessClientFacade = window.codeAssess.codeAssessLib.default.getInstance();

class JoinClassModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            classCode: "",
            shouldEnableJoinButton: false,
            errorMessage: ''
        }
        this.onJoinClass = this.onJoinClass.bind(this);
        this.onClassCodeChange = this.onClassCodeChange.bind(this);
        this.checkIfJoinButtonShouldBeEnabled = this.checkIfJoinButtonShouldBeEnabled.bind(this);
    }

    onClassCodeChange(e) {
        this.setState({ classCode: e.target.value }, () => this.checkIfJoinButtonShouldBeEnabled());
        this.checkIfJoinButtonShouldBeEnabled();
    }

    checkIfJoinButtonShouldBeEnabled() {
        const areThere5Digits = this.state.classCode.length === 5;
        const areAllNumbers = /^\d+$/.test(this.state.classCode);
        this.setState({ shouldEnableJoinButton: areThere5Digits && areAllNumbers });
    }

    async onJoinClass(e) {
        e.preventDefault();
        this.setState({ isLoading: true });
        try {

            const wasClassJoined = await codeAssessClientFacade.joinClassUsingInviteCode(this.state.classCode);
            if (wasClassJoined) {
                await codeAssessClientFacade.getUserProfClasses();
                this.props.onCloseModal();
            } else {
                console.warn("Error joining class");
                this.setState({ errorMessage: "Error joining class. Probably wrong or expired class code." });
            }
        } catch(e) {
            const message = e.response?.data?.message || e.message;
            console.log(message);
            this.setState({ errorMessage: message });
        } finally {
            this.setState({ isLoading: false });
        }
    }


    render() {
        return (
            <div className={styles.joinClassModal}>
                <p>Enter the 5-digit class code to join a class</p>
                <form onSubmit={this.onJoinClass} className={styles.form}>
                    <input
                        placeholder="Class code"
                        className={styles.input}
                        type="text"
                        name="code"
                        value={this.state.classCode}
                        onChange={this.onClassCodeChange}
                    />
                    <div className={styles.outerButtonContainer}>
                        {this.state.isLoading ? <Spinner level='warn' large className={spinnerStyles.primary} /> :
                            <div className={styles.buttonContainer}>
                                <button className={styles.cancelButton} onClick={this.props.onCloseModal}>Cancel</button>
                                <button
                                    disabled={!this.state.shouldEnableJoinButton}
                                    className={[styles.joinButton, this.state.shouldEnableJoinButton ? styles.joinButtonEnabled : styles.joinButtonDisabled].join(" ")}
                                    type="submit"
                                >
                                    Join
                                </button>
                            </div>
                        }
                    </div>
                    {this.state.errorMessage && <p className={styles.errorMessage}>{this.state.errorMessage}</p>}
                </form>
            </div>
        )
    }
}

export default JoinClassModal;
