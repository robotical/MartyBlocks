import React from "react";
import styles from "./code-submission-box.css";
import Spinner from '../../../../../../spinner/spinner.jsx';
import spinnerStyles from '../../../../../../spinner/spinner.css';
import Modal from "../../../../../../../containers/modal.jsx";
import bindAll from 'lodash.bindall';
import CodeSubmissionModal from "./code-submission-modal/code-submission-modal.jsx";

const PublishedEventsEnum = window.codeAssess.codeAssessLib.PublishedEventsEnum;
const codeAssessClientFacade = window.codeAssess.codeAssessLib.default.getInstance();

class CodeSubmissionBox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items: [],
            itemText: "",
            isLoading: false,
            modalVisible: false,
            selectedCodeSubmission: null
        };

        bindAll(this, [
            "onCloseModal",
            "onShowModal",
        ]);

        this.fileInputRef = null;
    }

    componentDidMount() {
        // codeAssessClientFacade.subscribe(SESSION_ANNOUNCEMENT_ADDED_SUBSCRIPTION + this.props.title, PublishedEventsEnum.SESSION_ANNOUNCEMENT_ADDED, () => this.setState({ isLoading: false }));
    }

    componentWillUnmount() {
        // codeAssessClientFacade.unsubscribe(SESSION_ANNOUNCEMENT_ADDED_SUBSCRIPTION + this.props.title);
    }

    onCloseModal() {
        this.setState({ modalVisible: false });
    }

    onShowModal(codeSubmission) {
        this.setState({ modalVisible: true, selectedCodeSubmission: codeSubmission });
    }

    render() {
        const {
            intl,
            items,
            title,
            studentName
        } = this.props;

        const reverseItems = [...items].reverse();

        if (this.state.isLoading) {
            return <div className={styles.itemsBoxContainer}>
                <div className={styles.itemsContainer}>
                    <div className={styles.itemsTitle}>{title}</div>
                    <Spinner level='warn' large className={spinnerStyles.primary} />
                </div>
            </div>
        }

        return (
            <>
                {this.state.modalVisible &&
                    <Modal
                        onRequestClose={this.onCloseModal}
                        fullScreen={false}
                        className={styles.modal}
                        id="classAverageOverTimeModal"
                        contentLabel={`${studentName} - ${this.state.selectedCodeSubmission?.title || "Code Submission"}`}
                    >
                        <div className={styles.modalContent}>
                            <CodeSubmissionModal
                                codeSubmission={this.state.selectedCodeSubmission}
                            />
                        </div>
                    </Modal>
                }

                <div className={styles.itemsBoxContainer}>
                    <div className={styles.itemsContainer}>
                        <div className={styles.itemsTitle}>{title}</div>
                        <ul className={styles.itemsContent}>
                            {reverseItems.map((item, index) => (
                                <li key={index} className={styles.itemContainer}>
                                    <div className={styles.itemDiv} onClick={() => this.onShowModal(item)}>{item.title}</div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </>
        )
    }

}

export default CodeSubmissionBox;