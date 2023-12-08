import React from "react";
import styles from "./make-new-announcement-modal.css";
import bindAll from 'lodash.bindall';
import { defineMessages, intlShape, injectIntl } from "react-intl";
import PropTypes from 'prop-types';
import Spinner from '../../../../spinner/spinner.jsx';
import spinnerStyles from '../../../../spinner/spinner.css';

const messages = defineMessages({
    tutorials: {
        defaultMessage: "adf",
        description: "sf",
        id: "gui.martyCodeAssess.MakeNewAnnouncementModal.",
    }
});

class MakeNewAnnouncementModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newAnnouncementText: '',
            isLoading: false,
        };
        bindAll(this, [
            'handleNewAnnouncementChange',
            'submitNewAnnouncement',
            'askForFeedback'
        ]);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    handleNewAnnouncementChange(event) {
        this.setState({ newAnnouncementText: event.target.value });
    }

    async submitNewAnnouncement() {
        this.setState({ isLoading: true });
        await codeAssess.teacher.makeAnnouncementForClass(this.props.selectedClass.id, this.state.newAnnouncementText, "text");
        this.props.onClose();
        this.setState({ isLoading: false });
    }

    async askForFeedback() {
        this.setState({ isLoading: true });
        const selectedClass = this.props.selectedClass;
        await codeAssess.teacher.askForEmojiFeedback(selectedClass.id, "Do you like this class?");
        this.props.onClose();
        this.setState({ isLoading: false });
    }

    render() {
        const { intl } = this.props;
        if (!this.props.selectedClass) {
            return <div>No class selected</div>;
        }

        return (
            <div className={styles.makeNewAnnouncementModal}>
                {this.state.isLoading ? <Spinner level='warn' large className={spinnerStyles.primary} /> : (
                    <>
                        <section>
                            <h3>Text Announcement</h3>
                            <textarea
                                value={this.state.newAnnouncementText}
                                onChange={this.handleNewAnnouncementChange}
                                placeholder="Type your announcement here"
                            />
                            <button onClick={this.submitNewAnnouncement}>Submit Text Announcement</button>
                        </section>

                        <section>
                            <h3>Other Announcements</h3>
                            <button onClick={this.askForFeedback}>Ask for Emoji Feedback</button>
                        </section>
                    </>
                )}
            </div>
        );
    }
}



MakeNewAnnouncementModal.propTypes = {
    intl: intlShape.isRequired,
    selectedClass: PropTypes.object,
    onClose: PropTypes.func.isRequired,
};


export default injectIntl(MakeNewAnnouncementModal);