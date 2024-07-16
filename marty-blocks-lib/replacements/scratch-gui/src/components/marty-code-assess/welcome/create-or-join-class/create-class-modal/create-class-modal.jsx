import React from "react";
import styles from "./create-class-modal.css";
import Spinner from '../../../../spinner/spinner.jsx';
import spinnerStyles from '../../../../spinner/spinner.css';

const codeAssessClientFacade = window.codeAssess.codeAssessLib.default.getInstance();

class CreateClassModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            className: "",
            classSection: "",
            shouldEnableCreateButton: false,
            content: 'createClass' // 'createClass', 'classCreated'
        }
        this.onCreateClass = this.onCreateClass.bind(this);
        this.onClassNameChange = this.onClassNameChange.bind(this);
        this.onClassSectionChange = this.onClassSectionChange.bind(this);
        this.checkIfCreateButtonShouldBeEnabled = this.checkIfCreateButtonShouldBeEnabled.bind(this);
        this.onClickOk = this.onClickOk.bind(this);
    }

    onClassNameChange(e) {
        this.setState({ className: e.target.value }, () => this.checkIfCreateButtonShouldBeEnabled());
        this.checkIfCreateButtonShouldBeEnabled();
    }

    onClassSectionChange(e) {
        this.setState({ classSection: e.target.value }, () => this.checkIfCreateButtonShouldBeEnabled());
        this.checkIfCreateButtonShouldBeEnabled();
    }

    checkIfCreateButtonShouldBeEnabled() {
        this.setState({ shouldEnableCreateButton: this.state.className.length > 0 && this.state.classSection.length > 0 });
    }

    async onCreateClass(e) {
        e.preventDefault();
        this.setState({ isLoading: true });
        const response = await codeAssessClientFacade.createClass(this.state.className, this.state.classSection);
        if (response !== false) {
            // create class code invite
            const classCodeInvite = await codeAssessClientFacade.createClassCodeInvite(response.id);
            if (classCodeInvite !== null) {
                console.log("classCodeInvite", classCodeInvite)
                this.setState({ content: 'classCreated', classCode: classCodeInvite.code });
            } else {
                console.error("Error creating class code invite");
            }
        }
        this.setState({ isLoading: false });
    }

    async onClickOk() {
        this.setState({ isLoading: true });
        await codeAssessClientFacade.getUserProfClasses();
        this.props.onCloseModal();
        this.setState({ isLoading: false });
    }

    render() {
        return (
            <div className={styles.createClassModal}>
                {this.state.content === 'createClass' && <form onSubmit={this.onCreateClass} className={styles.form}>
                    <input
                        placeholder="Class name"
                        className={styles.input}
                        type="text"
                        name="name"
                        value={this.state.className}
                        onChange={this.onClassNameChange}
                    />
                    <input
                        placeholder="Section"
                        className={styles.input}
                        type="text"
                        name="section"
                        value={this.state.classSection}
                        onChange={this.onClassSectionChange}
                    />
                    <div className={styles.outerButtonContainer}>
                        {this.state.isLoading ? <Spinner level='warn' large className={spinnerStyles.primary} /> :
                            <div className={styles.buttonContainer}>
                                <button className={styles.cancelButton} onClick={this.props.onCloseModal}>Cancel</button>
                                <button
                                    disabled={!this.state.shouldEnableCreateButton}
                                    className={[styles.createButton, this.state.shouldEnableCreateButton ? styles.createButtonEnabled : styles.createButtonDisabled].join(" ")}
                                    type="submit"
                                >
                                    Create
                                </button>
                            </div>
                        }
                    </div>
                </form>}
                {this.state.content === 'classCreated' && <div className={styles.classCreatedSection}>
                    <p className={styles.classCreatedSuccessfully}>Class created successfully</p>
                    <p className={styles.classCodeP}>Class code: <span className={styles.classCode}>{this.state.classCode}</span> <span className={styles.classCodeDescription}>(students can join using this code; expires after 24 hours)</span></p>
                    {this.state.isLoading ? <Spinner level='warn' large className={spinnerStyles.primary} /> : <button className={styles.okButton} onClick={this.onClickOk}>OK</button>}
                </div>}
            </div>
        )
    }
}

export default CreateClassModal;
