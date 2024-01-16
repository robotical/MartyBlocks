import PropTypes from 'prop-types';
import React from 'react';
import Box from '../../box/box.jsx';
import Modal from '../../../containers/modal.jsx';
import styles from './student-announcement-modal.css';
import { connect } from 'react-redux';
import {
    closeStudentAnnouncement,
} from '../../../reducers/modals.js';
import bindAll from 'lodash.bindall';
import StudentEmojiFeedbackModal from './student-emoji-feedback-modal/student-emoji-feedback-modal.jsx';


class StudentAnnouncementModal extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'onCloseModal'
        ]);
        this.state = {
        };
    }

    onCloseModal() {
        if (this.props.externalProps.announcement.type === "emoji-feedback") {
        } else {
            this.props.onCancel();
        }
    }

    render() {
        let modalContentJSX = null;
        if (this.props.externalProps.announcement.type === "text") {
            modalContentJSX = (
                <Box className={styles.body}>
                    <Box className={styles.announcementText}>
                        {this.props.externalProps.announcement.text}
                    </Box>
                </Box>
            );
        } else if (this.props.externalProps.announcement.type === "emoji-feedback") {
            modalContentJSX = <StudentEmojiFeedbackModal onCancel={this.props.onCancel} announcementId={this.props.externalProps.announcement.id} />;
        }

        return (
            <Modal
                className={styles.modalContent}
                contentLabel={this.props.externalProps.announcement.type === "text" ? "Your teacher is talking to you!" : "How are you feeling?"}
                headerClassName={styles.header}
                // headerImage={}
                id="studentAnnouncementModal"
                // onHelp={props.onHelp}
                onRequestClose={this.onCloseModal}
            >
                {modalContentJSX}
            </Modal>
        );
    }
}


StudentAnnouncementModal.propTypes = {
    onCancel: PropTypes.func.isRequired,
    externalProps: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    externalProps: state.scratchGui.modals.modalProps
});

const mapDispatchToProps = dispatch => ({
    onCancel: () => dispatch(closeStudentAnnouncement()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StudentAnnouncementModal);