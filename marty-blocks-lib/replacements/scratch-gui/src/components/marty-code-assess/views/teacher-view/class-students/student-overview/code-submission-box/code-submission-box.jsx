import React from "react";
import styles from "./code-submission-box.css";
import Spinner from '../../../../../../spinner/spinner.jsx';
import spinnerStyles from '../../../../../../spinner/spinner.css';

const PublishedEventsEnum = window.codeAssess.codeAssessLib.PublishedEventsEnum;
const codeAssessClientFacade = window.codeAssess.codeAssessLib.default.getInstance();


class CodeSubmissionBox extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items: [],
            itemText: "",
            isLoading: false,
        };

        this.fileInputRef = null;
    }

    componentDidMount() {
        // codeAssessClientFacade.subscribe(SESSION_ANNOUNCEMENT_ADDED_SUBSCRIPTION + this.props.title, PublishedEventsEnum.SESSION_ANNOUNCEMENT_ADDED, () => this.setState({ isLoading: false }));
    }

    componentWillUnmount() {
        // codeAssessClientFacade.unsubscribe(SESSION_ANNOUNCEMENT_ADDED_SUBSCRIPTION + this.props.title);
    }

    render() {
        const {
            intl,
            items,
            title,
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
            <div className={styles.itemsBoxContainer}>
                <div className={styles.itemsContainer}>
                    <div className={styles.itemsTitle}>{title}</div>
                    <ul className={styles.itemsContent}>
                        {reverseItems.map((item, index) => (
                            <li key={index} className={styles.itemContainer}>
                                <div className={styles.itemText}>"some item"</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }

}

export default CodeSubmissionBox;